import React, { useState } from "react";
import { useFirebase } from "../context/Firebase";



export const AddListing = () => {

  const firebase = useFirebase()

  const [name, setName] = useState("");
  const [isbn, setIsbn] = useState("");
  const [price, setPrice] = useState("");
  const [coverPic, setCoverPic] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault()
    await firebase.createNewListing(name, isbn, price, coverPic)
  }

  return (
    <form className="flex flex-col w-fit p-5">
      <label htmlFor="name">Book Name</label>
      <input
        onChange={(e) => setName(e.target.value)}
        value={name}
        className="border border-gray-400 mb-5"
        type="text"
        id="name"
        placeholder="Book Name"
      />
      <label htmlFor="isbn">ISBN Number</label>
      <input
        onChange={(e) => setIsbn(e.target.value)}
        value={isbn}
        className="border border-gray-400 mb-5"
        type="text"
        id="isbn"
        placeholder="ISBN Number"
      />
      <label htmlFor="price">Price</label>
      <input
        onChange={(e) => setPrice(e.target.value)}
        value={price}
        className="border border-gray-400 mb-5"
        type="number"
        id="price"
        placeholder="prize"
      />
      <label htmlFor="bookimg">Book Image</label>
      <input onChange={(e)=>setCoverPic(e.target.files[0])} value={coverPic} className='border border-gray-400 mb-5' type="file" id='bookimg' />

      <button type="submit">Create</button>
    </form>
  );
};
