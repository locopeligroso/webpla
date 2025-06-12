import React, { useState } from "react";

const ImageEditor = ({ image }) => {
  const [format, setFormat] = useState("webp");
  const [quality, setQuality] = useState(0.8);
  const [convertedUrl, setConvertedUrl] = useState(null);

  const handleConvert = () => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      const mimeType = format === "jpeg" ? "image/jpeg" : "image/webp";
      const dataUrl = canvas.toDataURL(mimeType, quality);
      setConvertedUrl(dataUrl);
    };
    img.src = image.dataUrl;
  };

  const getDownloadName = () => {
    const baseName = image.name.split(".").slice(0, -1).join(".") || "immagine";
    return `${baseName}.${format}`;
  };

  return (
    <div>
      <div>
        <label>Formato:</label>
        <select value={format} onChange={(e) => setFormat(e.target.value)}>
          <option value="webp">WEBP</option>
          <option value="jpeg">JPEG</option>
        </select>
      </div>

      <div>
        <label>Qualità:</label>
        <input
          type="range"
          min="0.1"
          max="1"
          step="0.1"
          value={quality}
          onChange={(e) => setQuality(parseFloat(e.target.value))}
        />
        <span>{quality}</span>
      </div>

      <button onClick={handleConvert}>Converti</button>

      {convertedUrl && (
        <div>
          <p>Download:</p>
          <a href={convertedUrl} download={getDownloadName()}>
            Scarica {getDownloadName()}
          </a>
        </div>
      )}
    </div>
  );
};

export default ImageEditor;
