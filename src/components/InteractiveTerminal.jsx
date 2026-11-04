import { useRef, useState } from 'react'
import { links, projects, skills, t } from '../data.js'

const MAX_LEN = 32
const MAX_ENTRIES = 10

// Whitelisted commands only. Input is treated as plain text, never evaluated or rendered as HTML.
function run(cmd, lang) {
  switch (cmd) {
    case 'help':
      return ['available: help, whoami, projects, skills, cert, contact, github, clear']
    case 'whoami':
      return ['selim_yaglioglu — cybersecurity & software engineer', 'junior pentester · software engineer · Turkey · remote-ready']
    case 'projects':
      return projects.map((p, i) => `[${i + 1}] ${p.name}`)
    case 'skills':
      return skills.map((s) => `${s[lang] || s.en}: ${(s.items[lang] || s.items.en).join(', ')}`)
    case 'cert':
      return ['TryHackMe — CompTIA Pentest+ Learning Path (completion) · 21.04.2026 · 32h 25m', links.thm]
    case 'contact':
      return [links.email, links.linkedin]
    case 'github':
      return [links.github]
    case 'matrix':
      return [t[lang]?.egg || t.en.egg]
    default:
      return [`command not found: ${cmd} — try "help"`]
  }
}

export default function InteractiveTerminal({ lang, hint, onEgg }) {
  const [value, setValue] = useState('')
  const [history, setHistory] = useState([])
  const inputRef = useRef(null)

  const submit = (e) => {
    e.preventDefault()
    const cmd = value.trim().toLowerCase().replace(/[^a-z]/g, '').slice(0, MAX_LEN)
    setValue('')
    if (!cmd) return
    if (cmd === 'clear') { setHistory([]); return }
    if (cmd === 'matrix') onEgg?.()
    setHistory((h) => [...h, { cmd, out: run(cmd, lang) }].slice(-MAX_ENTRIES))
  }

  return (
    <div className="iterm" onClick={() => inputRef.current && inputRef.current.focus()}>
      {history.map((h, i) => (
        <div key={i}>
          <div className="cmd">$ {h.cmd}</div>
          {h.out.map((o, j) => <div key={j} className="out">{o}</div>)}
        </div>
      ))}
      <form onSubmit={submit} className="iterm-line" autoComplete="off">
        <label htmlFor="term-input" className="prompt">guest@selim:~$</label>
        <input
          id="term-input"
          ref={inputRef}
          value={value}
          maxLength={MAX_LEN}
          spellCheck={false}
          autoCapitalize="off"
          autoCorrect="off"
          placeholder={hint}
          onChange={(e) => setValue(e.target.value.slice(0, MAX_LEN))}
          aria-label="terminal command"
        />
      </form>
    </div>
  )
}
