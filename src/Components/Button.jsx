export default function Button({
  text,
  onClick,
  selected = false,
  cta = false,
}) {
  const base =
    'px-6 py-2 rounded-xl w-full min-w-16 font-bold text-sm uppercase  font-inter'

  let variant = ''

  if (cta) {
    variant = 'bg-black text-white'
  } else if (selected) {
    variant = 'bg-pink-500 text-white'
  } else {
    variant =
      'bg-white text-pink-500 border border-pink-500'
  }

  return (
    <button
      onClick={onClick}
      className={`${base} ${variant}`}
    >
      {text}
    </button>
  )
}
