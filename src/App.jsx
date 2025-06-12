// App.jsx
import React, { useState } from "react";
import ImageUploader from "./ImageUploader";
import JSZip from "jszip";
import { saveAs } from "file-saver";

function App() {
  const [images, setImages] = useState([]);
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [format, setFormat] = useState("webp");
  const [quality, setQuality] = useState(0.8);
  const [destination, setDestination] = useState("");
  const [originalSizes, setOriginalSizes] = useState([]);

  const resetSizes = () => {
    const sizePromises = images.map(
      (img) =>
        new Promise((resolve) => {
          const imgEl = new Image();
          imgEl.onload = () =>
            resolve({ width: imgEl.width, height: imgEl.height });
          imgEl.src = img.dataUrl;
        }),
    );

    Promise.all(sizePromises).then((sizes) => {
      setOriginalSizes(sizes);
      setWidth("");
      setHeight("");
    });
  };

  const downloadAll = async () => {
    const zip = new JSZip();

    const tasks = images.map(
      (img, i) =>
        new Promise((resolve) => {
          const imgEl = new Image();
          imgEl.onload = () => {
            const canvas = document.createElement("canvas");

            let w = width ? parseInt(width) : null;
            let h = height ? parseInt(height) : null;

            if (!w && !h && originalSizes[i]) {
              w = originalSizes[i].width;
              h = originalSizes[i].height;
            }
            if (!w && h) w = Math.round(h * (imgEl.width / imgEl.height));
            if (!h && w) h = Math.round(w * (imgEl.width / imageEl.height));
            if (!w && !h) {
              w = imgEl.width;
              h = imgEl.height;
            }

            canvas.width = w;
            canvas.height = h;
            canvas.getContext("2d").drawImage(imgEl, 0, 0, w, h);

            const mime = format === "jpeg" ? "image/jpeg" : "image/webp";
            canvas.toBlob(
              (blob) => {
                const base = img.name.replace(/\.[^.]+$/, "") || "image";
                const prefix = destination ? `${destination}-` : "";
                zip.file(`${prefix}${base}.${format}`, blob);
                resolve();
              },
              mime,
              quality,
            );
          };
          imgEl.src = img.dataUrl;
        }),
    );

    await Promise.all(tasks);

    zip.generateAsync({ type: "blob" }).then((content) => {
      saveAs(
        content,
        destination ? `${destination}.zip` : "immagini_convertite.zip",
      );
    });
  };

  return (
    <div className="h-screen flex items-center ">
      <div className=" h-full block justify-center">
        <img src="./logo.svg" className="w-[20vw]" alt="Logo" />
        <p>scegli</p>
      </div>

      <div className="flex items-center h-full">
        <img src="./logo.svg" className="w-[20vw] inline-block" alt="Logo" />
        <p>scegli</p>
      </div>
    </div>
  );
}

export default App;
