export default function Button({
  text,
  onClick,
  selected = false,
  cta = false,
  className = '',
}) {
  let variantClass = 'btn-default'

  if (cta) {
    variantClass = 'btn-cta'
  } else if (selected) {
    variantClass = 'btn-selected'
  }

  return (
    <button
      onClick={onClick}
      className={`btn ${variantClass} ${className}`}
    >
      {text}
    </button>
  )
}
