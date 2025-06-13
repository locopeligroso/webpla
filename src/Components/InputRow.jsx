export default function InputRow({
  label,
  value,
  onChange,
  type = "number",
  placeholder,
}) {
  return (
    <>
      <div className="inline-flex items-center gap-6">
        <div className="text-black text-lg">{label}</div>
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={`Es. ${placeholder}`}
          className={
            "px-4 py-2 rounded-xl outline outline-1 outline-offset-[-1px] outline-pink-400 text-neutral-400 text-lg "
          }
        />
      </div>
    </>
  );
}
