import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../context/Firebase";
import { ImageCarousel } from "../components/ImageCarousel ";
import { toast } from "react-toastify";

export const BookDetails = () => {
  const firebase = useFirebase();

  const params = useParams();
  const [bookData, setBookData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(null);

  console.log(params.id);

  useEffect(() => {
    firebase.getBookById(params.id).then((value) => {
      const data = value.data();
      setBookData(data);
      setLoading(false);
    });
  }, []);

  const placeOrder = async () => {
    if (qty > 0) {
      const result = await firebase.placeOrder(params.id, qty);
      if (result.success) {
        setQty(0);
        toast.success(result.message);
      } else {
        toast.error("Failed to place order. Please try again.");
      }
    } else {
      toast.error("Select quantity");
    }
  };

  console.log(bookData);

  return loading ? (
    <div className="flex justify-center items-center h-screen">
      <div className="spinner-border animate-spin inline-block w-16 h-16 border-4 border-solid border-gray-200 border-t-blue-600 rounded-full"></div>
    </div>
  ) : (
    <>
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 max-w-sm mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          {bookData.name}
        </h2>

        <div className="text-gray-600">
          <p className="mb-2">
            <span className="font-medium">ISBN Number:</span> {bookData.isbn}
          </p>

          {bookData.mediaFiles && bookData.mediaFiles.length > 0 && (
            <ImageCarousel images={bookData.mediaFiles} />
          )}

          <p className="mt-4 text-gray-800">
            <span className="font-medium">Listed By:</span>{" "}
            {bookData.displayName}
          </p>
          <p className="text-lg font-semibold text-green-600 mt-2 mb-2">
            <span className="font-medium">Price:</span> ${bookData.price}
          </p>
          <div className="my-4">
            <label htmlFor="qty">Quantity:</label>
            <input
              onChange={(e) => setQty(e.target.value)}
              className="border ml-2 px-1 border-blue-300 w-10"
              type="number"
              placeholder="0"
              id="qty"
            />
          </div>
          <button
            onClick={placeOrder}
            className="border border-blue-400 py-4 w-full rounded-2xl text-xl font-semibold hover:bg-blue-400 hover:text-white transition-all"
          >
            Buy
          </button>
        </div>
      </div>
    </>
  );
};
