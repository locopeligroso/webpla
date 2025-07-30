export default function InputRow({
  label,
  value,
  onChange,
  type = 'number',
  placeholder,
  disabled = false,
}) {
  return (
    <div className="input-row">
      {label && <label>{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={`Es. ${placeholder}`}
        className="input-field"
        disabled={disabled}
      />
    </div>
  )
}
