import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/Firebase";
import { BookCard } from "./BookCard";

export const Home = () => {
  const firebase = useFirebase();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    firebase.listAllBooks().then((querySnapShot) => {
      const bookData = querySnapShot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBooks(bookData);
      setLoading(false);
      // console.log(querySnapShot)
    });
  }, []);

  return loading ? (
    <div className="flex justify-center items-center h-screen">
      <div className="spinner-border animate-spin inline-block w-16 h-16 border-4 border-solid border-gray-200 border-t-blue-600 rounded-full"></div>
    </div>
  ) : (
    <>
      <BookCard bookData={books} />
    </>
  );
};
