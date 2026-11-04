import { useEffect, useRef } from 'react'

// Canvas only — no inline styles, so the production CSP (style-src 'self') still holds.
export default function Confetti({ active, low }) {
  const ref = useRef(null)

  useEffect(() => {
    if (!active) return
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, low ? 1 : 1.5)
    const resize = () => {
      canvas.width = Math.floor(window.innerWidth * dpr)
      canvas.height = Math.floor(window.innerHeight * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    const n = low ? 16 : 42
    const colors = ['#00ff9c', '#33e1ff', '#ff3355', '#ffd27a', '#ff2fd0']
    const parts = Array.from({ length: n }, () => ({
      x: Math.random() * window.innerWidth,
      y: -12 - Math.random() * window.innerHeight * 0.35,
      w: 4 + Math.random() * 5,
      h: 6 + Math.random() * 7,
      vx: -1.1 + Math.random() * 2.2,
      vy: 1.5 + Math.random() * 2.4,
      rot: Math.random() * Math.PI,
      vr: -0.12 + Math.random() * 0.24,
      color: colors[(Math.random() * colors.length) | 0],
    }))

    let raf = 0
    const start = performance.now()
    const tick = (now) => {
      const t = now - start
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      ctx.globalAlpha = Math.max(0, 1 - t / 2200)
      for (const p of parts) {
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.025
        p.rot += p.vr
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rot)
        ctx.fillStyle = p.color
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h)
        ctx.restore()
      }
      if (t < 2200) raf = requestAnimationFrame(tick)
      else ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
    }
    raf = requestAnimationFrame(tick)
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [active, low])

  if (!active) return null
  return <canvas ref={ref} className="egg-canvas" aria-hidden="true" />
}
