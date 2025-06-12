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
    <div className="w-[1920px] h-[1080px] relative bg-neutral-200 overflow-hidden font-['Inter']">
      <img
        className="w-96 h-80 left-[115px] top-[123px] absolute"
        src="https://placehold.co/365x349"
        alt="bg1"
      />
      <img
        className="w-96 h-80 left-[526px] top-[52px] absolute"
        src="https://placehold.co/365x349"
        alt="bg2"
      />
      <img
        className="w-96 h-80 left-[556px] top-[635px] absolute"
        src="https://placehold.co/365x349"
        alt="bg3"
      />
      <img
        className="w-96 h-80 left-[23px] top-[706px] absolute"
        src="https://placehold.co/365x349"
        alt="bg4"
      />

      {/* Frosted glass card */}
      <div className="px-9 py-6 left-[242px] top-[321px] absolute bg-gradient-to-br from-white/40 to-white/10 rounded-xl shadow-[0px_4px_30px_-2px_rgba(78,78,78,0.20)] outline outline-1 outline-offset-[-1px] outline-white/25 backdrop-blur-xl inline-flex flex-col justify-center items-start gap-6">
        <div className="rounded-xl inline-flex justify-start items-center gap-6">
          <div className="text-black text-2xl">Formato:</div>
          <button
            onClick={() => setFormat("webp")}
            className="px-6 py-3 bg-pink-400 rounded-xl text-black text-2xl font-bold uppercase"
          >
            webp
          </button>
          <button
            onClick={() => setFormat("jpeg")}
            className="px-6 py-3 bg-white rounded-xl outline outline-1 outline-offset-[-1px] outline-pink-400 text-black text-2xl font-bold uppercase"
          >
            jpeg
          </button>
        </div>

        <div className="inline-flex justify-start items-center gap-6">
          <div className="text-black text-2xl">Qualità:</div>
          <input
            type="range"
            min="0.1"
            max="1"
            step="0.1"
            value={quality}
            onChange={(e) => setQuality(parseFloat(e.target.value))}
            className="w-48 h-2.5 bg-zinc-300 rounded-[100px]"
          />
          <div className="text-black text-2xl">{quality}</div>
        </div>

        <div className="rounded-xl inline-flex justify-start items-center gap-6">
          <div className="text-black text-2xl">Larghezza:</div>
          <input
            type="number"
            value={width}
            onChange={(e) => {
              setWidth(e.target.value);
              setHeight("");
            }}
            placeholder="Es. prodotti giugno"
            className="px-6 py-3 rounded-xl outline outline-1 outline-offset-[-1px] outline-pink-400 text-neutral-400 text-2xl"
          />
        </div>

        <div className="rounded-xl inline-flex justify-start items-center gap-6">
          <div className="text-black text-2xl">Altezza:</div>
          <input
            type="number"
            value={height}
            onChange={(e) => {
              setHeight(e.target.value);
              setWidth("");
            }}
            placeholder="Es. prodotti giugno"
            className="px-6 py-3 rounded-xl outline outline-1 outline-offset-[-1px] outline-pink-400 text-neutral-400 text-2xl"
          />
        </div>

        <div className="w-96 h-0 outline outline-1 outline-offset-[-0.5px] outline-black"></div>

        <button
          onClick={resetSizes}
          className="px-6 py-3 bg-pink-400 rounded-xl text-black text-2xl font-bold uppercase"
        >
          Dimensioni originali
        </button>

        <div className="w-96 h-0 outline outline-1 outline-offset-[-0.5px] outline-black"></div>

        <div className="rounded-xl inline-flex justify-start items-center gap-6">
          <div className="text-black text-2xl">Destinazione:</div>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Es. prodotti giugno"
            className="px-6 py-3 rounded-xl outline outline-1 outline-offset-[-1px] outline-pink-400 text-neutral-400 text-2xl"
          />
        </div>

        <button
          onClick={downloadAll}
          className="px-6 py-3 mt-2 bg-black text-white text-2xl font-bold rounded-xl"
        >
          Scarica ZIP
        </button>
      </div>

      {/* Colonna destra */}
      <div className="left-[1118px] top-[342px] absolute inline-flex flex-col justify-center items-center gap-6">
        <div className="w-24 h-36 bg-pink-400" />
        <div className="w-28 h-32 bg-pink-400" />
        <div className="w-24 h-20 bg-black" />
        <div className="w-28 h-20 bg-black" />
        <div className="w-20 h-20 bg-black" />
        <div className="w-32 h-36 bg-black" />
        <div className="px-6 py-3 rounded-md outline outline-1 outline-offset-[-1px] outline-black inline-flex justify-start items-center gap-16">
          <div className="px-6 py-3 bg-pink-400 rounded-xl text-black text-2xl font-bold uppercase">
            Scegli File
          </div>
          <div className="text-black text-2xl">{images.length} files</div>
        </div>
      </div>
    </div>
  );
}

export default App;
