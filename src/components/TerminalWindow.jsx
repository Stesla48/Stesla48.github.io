import { motion, useReducedMotion } from 'framer-motion'

export default function TerminalWindow({ title, children, className = '', delay = 0, hover = true }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={`term ${className}`}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      whileHover={hover && !reduce ? { y: -4 } : undefined}
    >
      <div className="term-bar">
        <span className="dot r" /><span className="dot y" /><span className="dot g" />
        <span className="term-title">{title}</span>
      </div>
      <div className="term-body">{children}</div>
    </motion.div>
  )
}
