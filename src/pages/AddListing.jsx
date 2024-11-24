import React, { useState, useRef } from "react";
import { useFirebase } from "../context/Firebase";
import { toast } from 'react-toastify';

export const AddListing = () => {
    const firebase = useFirebase();

    const [name, setName] = useState("");
    const [isbn, setIsbn] = useState("");
    const [price, setPrice] = useState("");
    const [coverPic, setCoverPic] = useState(null);
    const fileInputRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (coverPic) {
            const result = await firebase.createNewListing(name, isbn, price, coverPic);
            
            if (result.success) {
                toast.success(result.message); 
                setName("");
                setIsbn("");
                setPrice("");
                setCoverPic(null);
                if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                }
            } else {
                toast.error(result.message); 
            }
        } else {
            toast.error("Please select an image for the book cover.");
        }
    };

    return (
        <form className="flex flex-col w-fit p-5" onSubmit={handleSubmit}>
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
                placeholder="Price"
            />
            <label htmlFor="bookimg">Book Cover Image</label>
            <input
                ref={fileInputRef}
                onChange={(e) => setCoverPic(e.target.files[0])}
                className='border border-gray-400 mb-5'
                type="file"
                id='bookimg'
                accept="image/*" // Accept only image files
            />

            <button type="submit">Create Listing</button>
        </form>
    );
};
