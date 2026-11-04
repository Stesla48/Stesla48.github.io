// Glitch effect uses CSS pseudo-elements fed by data-text (plain text, no HTML injection).
export default function Glitch({ as: Tag = 'span', text, className = '' }) {
  return (
    <Tag className={`glitch ${className}`} data-text={text}>
      {text}
    </Tag>
  )
}
