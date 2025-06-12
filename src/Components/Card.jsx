import Button from "./Button";
import InputRow from "./InputRow";

export default function Card({
  quality = 0.2,
  setQuality,
  format,
  setFormat,
  width,
  height,
  setWidth,
  setHeight,
  destination,
  setDestination,
  downloadAll,
}) {
  const formats = ["webp", "jpeg", "png"];

  return (
    <div className="w-[50vw] h-screen flex items-center justify-center">
      <div className="flex flex-col gap-4 items-start py-4 px-6 border border-black rounded-lg">
        {/* Formati */}
        <div className="flex gap-4 items-center">
          <p className="text-lg">files</p>
          {formats.map((f) => (
            <Button
              key={f}
              text={f}
              selected={f === format}
              onClick={() => setFormat(f)}
            />
          ))}
        </div>

        {/* Qualità */}
        <div className="inline-flex items-center gap-6">
          <div className="text-black text-lg">Qualità:</div>
          <input
            type="range"
            min="0.1"
            max="1"
            step="0.1"
            value={quality}
            onChange={(e) => setQuality(parseFloat(e.target.value))}
            className="w-48 h-2.5 bg-zinc-300 rounded-full"
          />
          <div className="text-black text-lg">{quality}</div>
        </div>

        {/* Dimensioni */}
        <InputRow
          label="Lunghezza:"
          value={width}
          onChange={(e) => {
            setWidth(e.target.value);
            setHeight("");
          }}
        />
        <InputRow
          label="Altezza:"
          value={height}
          onChange={(e) => {
            setHeight(e.target.value);
            setWidth("");
          }}
        />

        <Button text="dimensioni originali" />

        <InputRow
          label="Destinazione:"
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          inputClass="px-6 py-3 text-2xl"
        />

        <Button
          text="scarica"
          cta="cta"
          onClick={downloadAll}
          className="px-6 py-3 mt-2 bg-black text-white text-2xl font-bold rounded-xl"
        />
      </div>
    </div>
  );
}
