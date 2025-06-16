export default function InputRow({
  label,
  value,
  onChange,
  type = "number",
  placeholder,
}) {
  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="text-black text-lg uppercase font-bold">{label}</div>
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={`Es. ${placeholder}`}
          className={
            "px-4 py-2 rounded-xl outline outline-1 outline-offset-[-1px] outline-pink-400 text-neutral-400 text-sm "
          }
        />
      </div>
    </>
  );
}
