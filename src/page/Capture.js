import React, { useState } from "react";

const Capture = () => {
  const [quadrant, setQuadrant] = useState(null);
  const [images, setImages] = useState(Array(4).fill(null));

  const handleImagePaste = async () => {
    if (quadrant === null) {
      return;
    }

    try {
      const clipboardItems = await navigator.clipboard.read();

      for (const item of clipboardItems) {
        if (
          item.types.includes("image/png") ||
          item.types.includes("image/jpeg")
        ) {
          const blob = await item.getType("image/png" || "image/jpeg");
          const reader = new FileReader();

          reader.onload = () => {
            setImages((prevImages) => {
              const newImages = [...prevImages];
              newImages[quadrant] = reader.result;
              return newImages;
            });
            setQuadrant(null);
          };

          reader.readAsDataURL(blob);
          break;
        }
      }
    } catch (error) {
      console.error("Error reading clipboard:", error);
    }
  };

  const handleAreaClick = (newQuadrant) => {
    setQuadrant(newQuadrant);
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr", // Col 1 : 1 분할
        gridTemplateRows: "1fr 1fr", // Row 1 : 1 분할
        height: "500px",
      }}
    >
      {[0, 1, 2, 3].map((area) => (
        <div
          key={area}
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            textAlign: "center",
            backgroundColor: quadrant === area ? "#e0e0e0" : "transparent",
            cursor: "pointer",
          }}
          onClick={() => handleAreaClick(area)}
          onPaste={handleImagePaste}
        >
          {images[area] && <img src={images[area]} />}
        </div>
      ))}
    </div>
  );
};

export default Capture;