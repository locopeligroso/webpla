export default function Button({ text, onClick, selected, cta }) {
  const base =
    "px-4 py-2 rounded-xl inline-flex items-center font-bold text-lg font-inter uppercase transition";

  const variant = cta
    ? "bg-black text-white"
    : selected
      ? "bg-main text-white"
      : "bg-white text-main border border-main";

  return (
    <button onClick={onClick} className={`${base} ${variant}`}>
      {text}
    </button>
  );
}
