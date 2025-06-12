import React, { useState } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";

import Logo from "./Components/Logo";
import Card from "./Components/Card";

export default function App() {
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

            let mime = "image/webp";
            if (format === "jpeg") mime = "image/jpeg";
            if (format === "png") mime = "image/png";

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
    <>
      <div className="flex">
        <Card
          quality={quality}
          setQuality={setQuality}
          width={width}
          setWidth={setWidth}
          height={height}
          setHeight={setHeight}
          destination={destination}
          setDestination={setDestination}
          format={format}
          setFormat={setFormat}
          downloadAll={downloadAll}
        />

        <Logo
          filesCounter={images.length}
          onSelectFiles={(files) => {
            const fileReaders = files.map((file) => {
              return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onload = () =>
                  resolve({ name: file.name, dataUrl: reader.result });
                reader.readAsDataURL(file);
              });
            });

            Promise.all(fileReaders).then((loadedImages) => {
              setImages(loadedImages);
            });
          }}
        />
      </div>
      {/* Cerchi decorativi */}
      <div className="absolute top-[10%] left-[5%] w-[300px] h-[300px] bg-main opacity-30 rounded-full blur-[100px] z-[-1]" />
      <div className="absolute bottom-[15%] right-[10%] w-[200px] h-[200px] bg-pink-300 opacity-20 rounded-full blur-[80px] z-[-1]" />
      <div className="absolute top-[50%] left-[40%] w-[150px] h-[150px] bg-cyan-400 opacity-20 rounded-full blur-[80px] z-[-1]" />
    </>
  );
}
