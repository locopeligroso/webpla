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
    <div className="w-[50vw] h-screen flex items-center justify-center">
      <div className="flex flex-col gap-16 items-center">
        <img src="./logo.svg" className="w-[34vw]" alt="Logo" />

        <div className="flex flex-row gap-16 border border-black w-fit px-4 py-2 rounded-lg items-center">
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
    </div>
  );
}
