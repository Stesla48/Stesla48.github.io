import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="4.15" fill="currentColor" />
      <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M12 1.7v2.5M12 19.8v2.5M1.7 12h2.5M19.8 12h2.5" />
        <path d="M4.4 4.4l1.8 1.8M17.8 17.8l1.8 1.8M19.6 4.4l-1.8 1.8M6.2 17.8l-1.8 1.8" />
      </g>
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
      <path fill="currentColor" d="M15.2 2.6A8.3 8.3 0 1 0 21.4 16 6.9 6.9 0 0 1 15.2 2.6z" />
    </svg>
  )
}

export default function ThemeToggle({ theme, label, onClick }) {
  const reduce = useReducedMotion()
  const toLight = theme !== 'light'
  return (
    <button
      type="button"
      className="lang theme-toggle"
      aria-pressed={theme === 'light'}
      aria-label={label}
      title={label}
      onClick={onClick}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={toLight ? 'sun' : 'moon'}
          className="theme-icon"
          initial={reduce ? false : { opacity: 0, rotate: toLight ? -35 : 35 }}
          animate={{ opacity: 1, rotate: 0 }}
          exit={reduce ? { opacity: 1, rotate: 0 } : { opacity: 0, rotate: toLight ? 35 : -35 }}
          transition={reduce ? { duration: 0 } : { duration: 0.22, ease: 'easeOut' }}
        >
          {toLight ? <SunIcon /> : <MoonIcon />}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}
