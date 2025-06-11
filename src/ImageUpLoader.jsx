import React, { useRef } from "react";

const ImageUploader = ({ onImageSelect }) => {
  const inputRef = useRef();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Seleziona un file immagine valido");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      onImageSelect({ file, dataUrl: reader.result });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="card bg-base-100 shadow p-4 items-center">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        onClick={() => inputRef.current.click()}
        className="btn btn-primary"
      >
        Carica immagine
      </button>
    </div>
  );
};

export default ImageUploader;
