import { useEffect, useRef } from 'react'
import { getPerfProfile } from '../perf.js'

const KATAKANA = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン'
const CHARS = (KATAKANA + '0123456789' + '01010101<>/{}$#').split('')

function palette(light, bursting) {
  if (bursting) {
    return light
      ? { bg: '#fdecef', fade: 'rgba(253, 236, 239, 0.28)', glyphs: ['#8e1834', '#9a2f55', '#7a3412'], alpha: 0.62 }
      : { bg: '#1a0508', fade: 'rgba(26, 5, 8, 0.16)', glyphs: ['#ff3355', '#ff5a7a', '#ff2fd0'], alpha: 0.9 }
  }
  return light
    ? { bg: '#e7f6ee', fade: 'rgba(231, 246, 238, 0.36)', glyphs: ['#0c6840', '#0e5c72'], alpha: 0.7 }
    : { bg: '#020805', fade: 'rgba(2, 8, 5, 0.12)', glyphs: null, alpha: 0 }
}

export default function MatrixRain({ theme = 'dark', burst = 0 }) {
  const ref = useRef(null)
  const burstUntil = useRef(0)

  useEffect(() => {
    if (!burst) return
    burstUntil.current = performance.now() + 2400
  }, [burst])

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d', { alpha: false })
    const { low, reduced } = getPerfProfile()
    const light = theme === 'light'

    const FPS = low ? 20 : 30
    const DPR = Math.min(window.devicePixelRatio || 1, low ? 1 : 1.5)
    const FONT = low ? 13 : 16
    const SPACING = low ? 1.6 : 1.15

    let w = 0, h = 0, cols = 0, drops = [], speeds = []
    let raf = 0, last = 0, running = true

    const setup = () => {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = Math.floor(w * DPR)
      canvas.height = Math.floor(h * DPR)
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
      cols = Math.ceil(w / (FONT * SPACING))
      drops = Array.from({ length: cols }, () => Math.random() * -(h / FONT))
      speeds = Array.from({ length: cols }, () => 0.6 + Math.random() * 0.7)
      const base = palette(light, false)
      ctx.fillStyle = base.bg
      ctx.fillRect(0, 0, w, h)
      ctx.font = `${FONT}px ui-monospace, "Cascadia Code", "Fira Code", Menlo, Consolas, monospace`
      ctx.textBaseline = 'top'
    }

    const drawFrame = () => {
      const bursting = performance.now() < burstUntil.current
      const c = palette(light, bursting)
      ctx.fillStyle = c.fade
      ctx.fillRect(0, 0, w, h)
      for (let i = 0; i < cols; i++) {
        const x = i * FONT * SPACING
        const y = drops[i] * FONT
        const ch = CHARS[(Math.random() * CHARS.length) | 0]
        if (c.glyphs) {
          ctx.fillStyle = c.glyphs[(Math.random() * c.glyphs.length) | 0]
          ctx.globalAlpha = c.alpha
        } else {
          const r = Math.random()
          ctx.fillStyle = r > 0.985 ? '#b9fff6' : r > 0.93 ? '#33e1ff' : '#00ff9c'
          ctx.globalAlpha = 0.55 + Math.random() * 0.45
        }
        ctx.fillText(ch, x, y)
        if (bursting && !low) {
          ctx.fillText(CHARS[(Math.random() * CHARS.length) | 0], x, y - FONT)
        }
        ctx.globalAlpha = 1
        const resetAt = bursting ? 0.88 : 0.975
        if (y > h && Math.random() > resetAt) drops[i] = bursting ? 0 : Math.random() * -20
        drops[i] += speeds[i] * (bursting ? 2.5 : 1)
      }
    }

    const loop = (ts) => {
      if (!running) return
      raf = requestAnimationFrame(loop)
      if (ts - last < 1000 / FPS) return
      last = ts
      drawFrame()
    }

    const start = () => {
      if (reduced && performance.now() >= burstUntil.current) {
        for (let k = 0; k < 40; k++) drawFrame()
        return
      }
      running = true
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(loop)
    }
    const stop = () => { running = false; cancelAnimationFrame(raf) }

    const onVis = () => (document.hidden ? stop() : start())
    let resizeT = 0
    const onResize = () => {
      clearTimeout(resizeT)
      resizeT = setTimeout(() => { setup(); if (reduced) start() }, 150)
    }

    setup()
    start()
    document.addEventListener('visibilitychange', onVis)
    window.addEventListener('resize', onResize)

    let burstWatch = 0
    if (reduced) {
      burstWatch = window.setInterval(() => {
        if (performance.now() < burstUntil.current) {
          drawFrame()
        }
      }, 80)
    }

    return () => {
      stop()
      clearTimeout(resizeT)
      clearInterval(burstWatch)
      document.removeEventListener('visibilitychange', onVis)
      window.removeEventListener('resize', onResize)
    }
  }, [theme])

  return <canvas ref={ref} className="matrix" aria-hidden="true" />
}
