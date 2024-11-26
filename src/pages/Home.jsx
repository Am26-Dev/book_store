import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/Firebase";

export const Home = () => {
  const firebase = useFirebase();
  const [book, setBook] = useState([]);

  useEffect(() => {
    firebase.listAllBooks().then((books) => setBook(books.docs[0].data()));
    console.log(book);
  }, [firebase]);

  return (
    <div className="flex flex-col p-5">
      <p>All listed books</p>
      <p>
        BOOK NAME:<span className="text-2xl text-purple-600">{book.name}</span>
      </p>
      <p>
        ISBN NUMBER:{" "}
        <span className="text-2xl text-purple-600">{book.isbn}</span>
      </p>
      <p>
        PRICE: <span className="text-2xl text-purple-600">{book.price}</span>
      </p>
      <p>
        LISTED BY:{" "}
        <span className="text-2xl text-purple-600">{book.displayName}</span>
      </p>
      {book.mediaFiles && book.mediaFiles.length > 0 ? (
        book.mediaFiles.map((url, index) => (
          <div key={index}>
            <img src={url} alt="" />
          </div>
        ))
      ) : (
        <p>No media files available.</p>
      )}
    </div>
  );
};
