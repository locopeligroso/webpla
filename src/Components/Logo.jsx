import Button from "./Button";
import { useRef } from "react";

export default function Logo({ filesCounter, onSelectFiles }) {
  const inputRef = useRef(null);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      onSelectFiles(files);
    }
  };

  const triggerFileInput = () => {
    inputRef.current?.click();
  };

  return (
    <div className="flex flex-col gap-16 items-center">
      <img src="./logo.svg" className="w-[34vw]" alt="Logo" />

      <div className="flex flex-col gap-2   items-center">
        <Button text="scegli files" cta="cta" onClick={triggerFileInput} />

        <input
          ref={inputRef}
          id="file-upload"
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />

        <p className="inline text-lg">{filesCounter} files</p>
      </div>
    </div>
  );
}
