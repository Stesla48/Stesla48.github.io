import { useEffect, useRef } from 'react'
import { getPerfProfile } from '../perf.js'

const KATAKANA = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン'
const CHARS = (KATAKANA + '0123456789' + '01010101<>/{}$#').split('')

export default function MatrixRain() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d', { alpha: false })
    const { low, reduced } = getPerfProfile()

    // Lighter settings on small / low-power devices
    const FPS = low ? 20 : 30
    const DPR = Math.min(window.devicePixelRatio || 1, low ? 1 : 1.5)
    const FONT = low ? 13 : 16
    const SPACING = low ? 1.6 : 1.15 // wider spacing => fewer columns

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
      ctx.fillStyle = '#020805'
      ctx.fillRect(0, 0, w, h)
      ctx.font = `${FONT}px ui-monospace, "Cascadia Code", "Fira Code", Menlo, Consolas, monospace`
      ctx.textBaseline = 'top'
    }

    const drawFrame = () => {
      ctx.fillStyle = 'rgba(2, 8, 5, 0.12)'
      ctx.fillRect(0, 0, w, h)
      for (let i = 0; i < cols; i++) {
        const x = i * FONT * SPACING
        const y = drops[i] * FONT
        const ch = CHARS[(Math.random() * CHARS.length) | 0]
        // bright head, occasional cyan glint
        const r = Math.random()
        ctx.fillStyle = r > 0.985 ? '#b9fff6' : r > 0.93 ? '#33e1ff' : '#00ff9c'
        ctx.globalAlpha = 0.55 + Math.random() * 0.45
        ctx.fillText(ch, x, y)
        ctx.globalAlpha = 1
        if (y > h && Math.random() > 0.975) drops[i] = Math.random() * -20
        drops[i] += speeds[i]
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
      if (reduced) {
        // static, dim frame — no animation
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
    return () => {
      stop()
      clearTimeout(resizeT)
      document.removeEventListener('visibilitychange', onVis)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return <canvas ref={ref} className="matrix" aria-hidden="true" />
}
