const THEME_KEY = 'theme'
const LANG_KEY = 'lang'

export function readTheme() {
  try {
    return localStorage.getItem(THEME_KEY) === 'light' ? 'light' : 'dark'
  } catch {
    return 'dark'
  }
}

export function applyTheme(theme) {
  const light = theme === 'light'
  document.documentElement.dataset.theme = light ? 'light' : 'dark'
  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) meta.setAttribute('content', light ? '#f4fbf7' : '#020805')
  try { localStorage.setItem(THEME_KEY, light ? 'light' : 'dark') } catch { /* private mode */ }
}

export function readLang() {
  try {
    const saved = localStorage.getItem(LANG_KEY)
    return saved === 'en' || saved === 'tr' ? saved : 'tr'
  } catch {
    return 'tr'
  }
}

export function applyLang(lang) {
  const next = lang === 'en' ? 'en' : 'tr'
  document.documentElement.lang = next
  try { localStorage.setItem(LANG_KEY, next) } catch { /* private mode */ }
}
