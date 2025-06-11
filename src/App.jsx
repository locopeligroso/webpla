import React, { useState } from "react";
import ImageUploader from "./ImageUploader";
import ImageEditor from "./ImageEditor";

function App() {
  const [imageData, setImageData] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Convertitore Immagini
      </h1>

      <ImageUploader
        onImageSelect={(data) => {
          setImageData(data);
          setProcessedImage(null);
        }}
      />

      {imageData && (
        <>
          <div className="mt-4">
            <img
              src={imageData.dataUrl}
              alt="Anteprima originale"
              className="max-w-full h-auto border rounded"
            />
          </div>

          <ImageEditor imageData={imageData} onProcess={setProcessedImage} />
        </>
      )}

      {processedImage && (
        <div className="mt-6 text-center">
          <h2 className="font-semibold mb-2">Immagine convertita:</h2>
          <img
            src={processedImage}
            alt="Output"
            className="max-w-full mx-auto border rounded"
          />
          <a
            href={processedImage}
            download="converted-image"
            className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Scarica immagine
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
