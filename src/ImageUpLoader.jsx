import React from "react";

const ImageUploader = ({ onImagesSelect }) => {
  const handleFiles = async (event) => {
    const files = Array.from(event.target.files);
    const images = await Promise.all(
      files.map(
        (file) =>
          new Promise((res, rej) => {
            const reader = new FileReader();
            reader.onload = (e) =>
              res({ name: file.name, dataUrl: e.target.result });
            reader.onerror = () => rej();
            reader.readAsDataURL(file);
          }),
      ),
    );
    onImagesSelect(images);
  };

  return (
    <div className="mb-4">
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFiles}
        className="border border-gray-300 px-3 py-2 rounded"
      />
    </div>
  );
};

export default ImageUploader;
