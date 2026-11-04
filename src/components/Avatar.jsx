import { useState } from 'react'
import { profilePhoto } from '../data.js'

function resolvePhoto(path) {
  if (!path) return ''
  if (/^(https?:)?\/\//.test(path)) return path
  const base = import.meta.env.BASE_URL || '/'
  const clean = String(path).replace(/^\//, '')
  return base.endsWith('/') ? `${base}${clean}` : `${base}/${clean}`
}

export default function Avatar({ alt }) {
  const src = resolvePhoto(profilePhoto)
  const [phase, setPhase] = useState(src ? 'loading' : 'error')
  const showPhoto = phase === 'ok'

  return (
    <div className="avatar" role={showPhoto ? undefined : 'img'} aria-label={showPhoto ? undefined : alt}>
      <div className="avatar-frame">
        {src && phase !== 'error' && (
          <img
            className={showPhoto ? 'avatar-img' : 'avatar-img is-loading'}
            src={src}
            alt={alt}
            width="150"
            height="150"
            onLoad={() => setPhase('ok')}
            onError={() => setPhase('error')}
          />
        )}
        {!showPhoto && <span className="avatar-initials" aria-hidden="true">SY</span>}
        <span className="avatar-scan" aria-hidden="true" />
      </div>
    </div>
  )
}
