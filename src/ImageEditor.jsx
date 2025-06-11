import React, { useState, useEffect } from "react";

const ImageEditor = ({ imageData, onProcess }) => {
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [aspectRatio, setAspectRatio] = useState(null);
  const [format, setFormat] = useState("webp");
  const [quality, setQuality] = useState(0.8);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setAspectRatio(img.width / img.height);
      setWidth(img.width);
      setHeight(img.height);
    };
    img.src = imageData.dataUrl;
  }, [imageData]);

  const handleWidthChange = (val) => {
    const w = parseInt(val);
    setWidth(w);
    if (aspectRatio) setHeight(Math.round(w / aspectRatio));
  };

  const handleHeightChange = (val) => {
    const h = parseInt(val);
    setHeight(h);
    if (aspectRatio) setWidth(Math.round(h * aspectRatio));
  };

  const handleConvert = () => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);
      const mime = format === "jpeg" ? "image/jpeg" : "image/webp";
      const result = canvas.toDataURL(mime, quality);
      onProcess(result);
    };
    img.src = imageData.dataUrl;
  };

  return (
    <div className="card bg-base-100 shadow p-4 mt-6 space-y-4">
      <div className="flex gap-4">
        <input
          type="number"
          placeholder="Larghezza"
          value={width}
          onChange={(e) => handleWidthChange(e.target.value)}
          className="input input-bordered w-24"
        />
        <input
          type="number"
          placeholder="Altezza"
          value={height}
          onChange={(e) => handleHeightChange(e.target.value)}
          className="input input-bordered w-24"
        />
      </div>

      <div className="flex gap-4 items-center">
        <select
          className="select select-bordered"
          value={format}
          onChange={(e) => setFormat(e.target.value)}
        >
          <option value="webp">WEBP</option>
          <option value="jpeg">JPEG</option>
        </select>

        <div>
          <label className="label">Compressione</label>
          <input
            type="range"
            min="0.1"
            max="1"
            step="0.1"
            value={quality}
            onChange={(e) => setQuality(parseFloat(e.target.value))}
            className="range range-primary"
          />
          <div className="text-sm mt-1">{quality}</div>
        </div>
      </div>

      <button onClick={handleConvert} className="btn btn-success">
        Converti immagine
      </button>
    </div>
  );
};

export default ImageEditor;
