import React, { useState } from "react";

export const ImageCarousel = ({ images }) => {
  const [currIndex, setCurrIndex] = useState(0);

  const handlePrev = () => {
    setCurrIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full h-60 overflow-hidden">
      <div
        className="w-full h-full flex transition-transform duration-500"
        style={{ transform: `translateX(-${currIndex * 100}%)` }}
      >
        {images.map((url, i) => (
          <img
            key={i}
            src={url}
            alt={`Slide ${i + 1}`}
            className="w-full h-full object-cover flex-shrink-0"
          />
        ))}
      </div>

      {/* Navigation Buttons */}
      {images.length > 1 ? (
        <>
          <button
            onClick={handlePrev}
            className="absolute top-1/2 -left-1 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full hover:bg-gray-800"
          >
            &lt;
          </button>
          <button
            onClick={handleNext}
            className="absolute top-1/2 -right-1 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full hover:bg-gray-800"
          >
            &gt;
          </button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};
