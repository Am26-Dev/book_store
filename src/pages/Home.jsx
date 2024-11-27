import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/Firebase";
import { BookCard } from "./BookCard";

export const Home = () => {
  const firebase = useFirebase();
  const [books, setBooks] = useState([]);
  // const [bookData, setBookdata] = useState([]);

  useEffect(() => {
    firebase.listAllBooks().then((querySnapShot) => {
      const bookData = querySnapShot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBooks(bookData);
      // console.log(querySnapShot)
    });
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {books.map((book, index) => (
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
          {book.mediaFiles &&
            book.mediaFiles.map((url, i) => (
              <div key={i} className="relative w-full">
                <img
                  src={url}
                  alt="Media"
                  className="w-full h-40 object-cover border-t border-gray-200"
                />
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};
