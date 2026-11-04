import { useMemo, useState } from 'react'
import { motion, MotionConfig } from 'framer-motion'
import MatrixRain from './components/MatrixRain.jsx'
import Glitch from './components/Glitch.jsx'
import Typing from './components/Typing.jsx'
import TerminalWindow from './components/TerminalWindow.jsx'
import InteractiveTerminal from './components/InteractiveTerminal.jsx'
import { links, projects, experience, skills, t } from './data.js'
import { getPerfProfile } from './perf.js'

const EXT = { target: '_blank', rel: 'noopener noreferrer' }
const IDS = ['about', 'projects', 'experience', 'certs', 'skills', 'contact']

function Section({ id, title, children }) {
  return (
    <section id={id} className="section">
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, x: -24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
      >
        <span className="hash">#</span> <Glitch text={title} />
      </motion.h2>
      {children}
    </section>
  )
}

export default function App() {
  const [lang, setLang] = useState('en')
  const [typed, setTyped] = useState(false)
  const perf = useMemo(() => getPerfProfile(), [])
  const L = t[lang]

  return (
    <MotionConfig reducedMotion="user" transition={perf.low ? { duration: 0.3 } : undefined}>
      <div className={`app ${perf.low ? 'low' : ''}`}>
        <MatrixRain />
        <div className="scanlines" aria-hidden="true" />

        <header className="nav">
          <a href="#top" className="brand">&gt;_ selim</a>
          <nav aria-label="sections">
            {IDS.map((id, i) => <a key={id} href={`#${id}`}>{L.nav[i]}</a>)}
          </nav>
          <button className="lang" onClick={() => setLang(lang === 'en' ? 'tr' : 'en')} aria-label="toggle language">
            <span className={lang === 'en' ? 'on' : ''}>EN</span>/<span className={lang === 'tr' ? 'on' : ''}>TR</span>
          </button>
        </header>

        <main id="top">
          {/* HERO */}
          <section className="hero">
            <TerminalWindow title="selim@kali: ~" className="hero-term" hover={false}>
              <Typing
                instant={perf.reduced}
                onDone={() => setTyped(true)}
                lines={['$ whoami', 'selim_yaglioglu', '$ cat role.txt', 'cybersecurity + software engineer', '$ ./launch_portfolio.sh']}
              />
            </TerminalWindow>
            <motion.div
              className="hero-text"
              initial={{ opacity: 0, y: 20 }}
              animate={typed ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <Glitch as="h1" className="name" text="Selim YAĞLIOĞLU" />
              <p className="role">{L.role}</p>
              <p className="tagline">{L.tagline}</p>
              <div className="cta">
                <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="btn" href="#projects">{L.ctaProjects}</motion.a>
                <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="btn ghost" href="#contact">{L.ctaContact}</motion.a>
              </div>
              <div className="hero-links">
                <a href={links.github} {...EXT}>github</a>
                <a href={links.linkedin} {...EXT}>linkedin</a>
                <a href={`mailto:${links.email}`}>email</a>
              </div>
            </motion.div>
          </section>

          {/* ABOUT */}
          <Section id="about" title={L.aboutTitle}>
            <div className="grid-2">
              <TerminalWindow title="about.md">
                {L.aboutBody.map((p, i) => <p key={i}><span className="g">&gt;</span> {p}</p>)}
              </TerminalWindow>
              <TerminalWindow title="education.log" delay={0.1}>
                <p className="muted">// {L.edu}</p>
                <p className="hl">{L.eduDeg}</p>
                <p>{L.eduUni}</p>
                <p className="muted">2021 – 2025 · {L.gpa}</p>
              </TerminalWindow>
            </div>
          </Section>

          {/* PROJECTS */}
          <Section id="projects" title={L.projectsTitle}>
            <div className="grid-3">
              {projects.map((p, i) => (
                <TerminalWindow key={p.name} title={`~/projects/${String(i + 1).padStart(2, '0')}`} delay={(i % 3) * 0.08} className="project">
                  <h3 className="p-name">{p.name}</h3>
                  <p className="p-desc">{p[lang]}</p>
                  <div className="tags">{p.tech.map((x) => <span key={x} className="tag">{x}</span>)}</div>
                  <a className="repo" href={p.url} {...EXT}>$ git clone → {L.viewRepo}</a>
                </TerminalWindow>
              ))}
            </div>
          </Section>

          {/* EXPERIENCE */}
          <Section id="experience" title={L.expTitle}>
            <div className="timeline">
              {experience.map((e, i) => (
                <TerminalWindow key={e.company} title={`${e.company.toLowerCase()}.log`} delay={i * 0.1}>
                  <div className="exp-head">
                    <h3>{e.role[lang]} <span className="at">@ {e.company}</span></h3>
                    <span className="muted">{e.date} · {e.place}</span>
                  </div>
                  <ul>{e[lang].map((b, j) => <li key={j}>{b}</li>)}</ul>
                  <div className="tags">{e.tags.map((x) => <span key={x} className="tag">{x}</span>)}</div>
                </TerminalWindow>
              ))}
            </div>
          </Section>

          {/* CERTIFICATIONS */}
          <Section id="certs" title={L.certTitle}>
            <div className="grid-2">
              <TerminalWindow title="tryhackme.cert" className="cert">
                <p className="muted">// {L.certKind}</p>
                <h3 className="hl">{L.certName}</h3>
                <p>TryHackMe · {L.certDate}</p>
                <p className="note">{L.certNote}</p>
                <a className="btn small" href={links.thm} {...EXT}>{L.verify} ↗</a>
              </TerminalWindow>
              <TerminalWindow title="events.log" delay={0.1}>
                <p className="muted">// {L.eventsTitle}</p>
                <p className="hl">{L.event}</p>
              </TerminalWindow>
            </div>
          </Section>

          {/* SKILLS */}
          <Section id="skills" title={L.skillsTitle}>
            <div className="grid-3">
              {skills.map((s, i) => (
                <TerminalWindow key={s.key} title={`${s.key}.conf`} delay={(i % 3) * 0.08}>
                  <h3 className="hl">{s[lang]}</h3>
                  <ul className="skill-list">{s.items[lang].map((x) => <li key={x}>{x}</li>)}</ul>
                </TerminalWindow>
              ))}
            </div>
          </Section>

          {/* CONTACT */}
          <Section id="contact" title={L.contactTitle}>
            <div className="grid-2">
              <TerminalWindow title="contact.sh">
                <p>{L.contactBody}</p>
                <div className="contact-links">
                  <a href={`mailto:${links.email}`}><span className="g">email</span> {links.email}</a>
                  <a href={links.linkedin} {...EXT}><span className="g">linkedin</span> /in/selimyaglioglu</a>
                  <a href={links.github} {...EXT}><span className="g">github</span> Stesla48</a>
                </div>
              </TerminalWindow>
              <TerminalWindow title="guest@selim: ~ (interactive)" delay={0.1} hover={false}>
                <InteractiveTerminal lang={lang} hint={L.termHint} />
              </TerminalWindow>
            </div>
          </Section>
        </main>

        <footer className="footer">
          <span>© {new Date().getFullYear()} Selim YAĞLIOĞLU</span>
          <span className="muted">{L.footer}</span>
        </footer>
      </div>
    </MotionConfig>
  )
}
