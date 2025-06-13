// App.jsx
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

            const originalW = imgEl.width;
            const originalH = imgEl.height;
            let w = width ? parseInt(width) : null;
            let h = height ? parseInt(height) : null;

            if (w && !h) {
              h = Math.round(w * (originalH / originalW));
            } else if (!w && h) {
              w = Math.round(h * (originalW / originalH));
            } else if (!w && !h) {
              w = originalW;
              h = originalH;
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
    <>
      <div className="flex flex-col-reverse md:flex-row w-full h-screen">
        <div className="flex-1 flex items-center justify-center h-1/2 md:h-full">
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
        </div>

        <div className="flex-1 flex items-center justify-center h-1/2 md:h-full">
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
      </div>
    </>
  );
}
