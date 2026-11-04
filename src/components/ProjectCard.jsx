import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import TerminalWindow from './TerminalWindow.jsx'

const EXT = { target: '_blank', rel: 'noopener noreferrer' }

function useFinePointer() {
  const query = '(hover: hover) and (pointer: fine)'
  const [fine, setFine] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const apply = () => setFine(mq.matches)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])
  return fine
}

export default function ProjectCard({ project: p, index, lang, viewRepo, hint, low = false }) {
  const fine = useFinePointer()
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const [hover, setHover] = useState(false)
  const [keyFocus, setKeyFocus] = useState(false)
  const [pinned, setPinned] = useState(false)
  const open = keyFocus || (fine ? hover : pinned)
  const panelId = `project-detail-${index}`

  return (
    <TerminalWindow
      title={`~/projects/${String(index + 1).padStart(2, '0')}`}
      delay={(index % 3) * 0.08}
      className="project"
    >
      <article
        ref={ref}
        className="project-hit"
        tabIndex={0}
        aria-expanded={open}
        aria-controls={panelId}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onFocus={() => {
          requestAnimationFrame(() => {
            if (ref.current?.matches(':focus-visible')) setKeyFocus(true)
          })
        }}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) setKeyFocus(false)
        }}
        onClick={(e) => {
          if (e.target.closest('a')) return
          if (!fine) setPinned((v) => !v)
        }}
        onKeyDown={(e) => {
          if (e.target !== e.currentTarget) return
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            if (!fine) setPinned((v) => !v)
          }
        }}
      >
        <h3 className="p-name">{p.name}</h3>
        {!open && <p className="project-hint muted">{hint}</p>}
        <motion.div
          id={panelId}
          className="project-detail"
          initial={false}
          animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
          transition={{ duration: reduce ? 0 : low ? 0.16 : 0.32, ease: 'easeOut' }}
        >
          <div className="project-detail-inner" inert={!open}>
            <p className="p-desc">{p[lang]}</p>
            <div className="tags">{p.tech.map((x) => <span key={x} className="tag">{x}</span>)}</div>
            <a className="repo" href={p.url} {...EXT}>$ git clone → {viewRepo}</a>
          </div>
        </motion.div>
      </article>
    </TerminalWindow>
  )
}
