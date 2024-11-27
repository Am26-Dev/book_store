import React from "react";
import { ImageCarousel } from "../components/ImageCarousel ";

export const BookCard = ({ bookData }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {bookData.map((book, index) => (
        <div
          key={index}
          className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300"
        >
          <div className="p-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Book Name: {book.name}
            </h2>
            <p className="text-sm text-gray-600">
              Listed By: {book.displayName}
            </p>
          </div>
          {book.mediaFiles && book.mediaFiles.length > 0 && (
            <ImageCarousel images={book.mediaFiles} />
          )}
        </div>
      ))}
    </div>
  );
};
