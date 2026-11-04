import { useEffect, useState } from 'react'

// Types out a list of lines one character at a time (plain text only).
export default function Typing({ lines, speed = 38, onDone, instant = false }) {
  const [shown, setShown] = useState(instant ? lines : [''])
  useEffect(() => {
    if (instant) { onDone && onDone(); return }
    let li = 0, ci = 0, timer
    const out = ['']
    const tick = () => {
      const line = lines[li]
      if (ci < line.length) {
        out[li] = line.slice(0, ++ci)
        setShown([...out])
        timer = setTimeout(tick, line.startsWith('$') ? speed : speed / 3)
      } else if (li < lines.length - 1) {
        li++; ci = 0; out.push('')
        timer = setTimeout(tick, 260)
      } else onDone && onDone()
    }
    timer = setTimeout(tick, 400)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className="typing" aria-hidden="true">
      {shown.map((l, i) => (
        <div key={i} className={l.startsWith('$') ? 'cmd' : 'out'}>
          {l}{i === shown.length - 1 && <span className="cursor">█</span>}
        </div>
      ))}
    </div>
  )
}
