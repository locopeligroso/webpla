import React from "react";

const ImagePreview = ({ image }) => {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <img
        src={image.dataUrl}
        alt={image.name}
        style={{
          height: "100px",
          objectFit: "contain",
          border: "1px solid #ccc",
        }}
      />
      <p>{image.name}</p>
    </div>
  );
};

export default ImagePreview;
