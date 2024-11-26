import React, { useState, useRef } from "react";
import { useFirebase } from "../context/Firebase";
import { toast } from "react-toastify";

export const AddListing = () => {
    const firebase = useFirebase();

    const [name, setName] = useState("");
    const [isbn, setIsbn] = useState("");
    const [price, setPrice] = useState("");
    const [mediaFiles, setMediaFiles] = useState([]); 
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const filesArray = Array.from(e.target.files); 

        if (filesArray.length + mediaFiles.length > 7) {
            toast.error("You can upload up to 7 files only.");
            return;
        }
        setMediaFiles((prevFiles) => [...prevFiles, ...filesArray]); 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (mediaFiles.length > 0 && mediaFiles.length <= 7) {
            const uploadResults = await firebase.createNewListing(name, isbn, price, mediaFiles);

            if (uploadResults.success) {
                toast.success(uploadResults.message);
                setName("");
                setIsbn("");
                setPrice("");
                setMediaFiles([]); 
                if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                }
            } else {
                toast.error(uploadResults.message);
            }
        } else {
            toast.error("Please select between 1 and 7 media files.");
        }
    };

    return (
        <form className="flex flex-col w-fit p-5" onSubmit={handleSubmit}>
            <label htmlFor="name">Book Name</label>
            <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="border border-gray-400 mb-5 p-2"
                type="text"
                id="name"
                placeholder="Book Name"
            />
            <label htmlFor="isbn">ISBN Number</label>
            <input
                onChange={(e) => setIsbn(e.target.value)}
                value={isbn}
                className="border border-gray-400 mb-5 p-2"
                type="text"
                id="isbn"
                placeholder="ISBN Number"
            />
            <label htmlFor="price">Price</label>
            <input
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                className="border border-gray-400 mb-5 p-2"
                type="number"
                id="price"
                placeholder="Price"
            />
            <label htmlFor="mediaFiles">Book Cover Images/Videos</label>
            <input
                ref={fileInputRef}
                onChange={handleFileChange} 
                className="border border-gray-400 mb-5"
                type="file"
                id="mediaFiles"
                accept="image/*,video/*" 
                multiple
            />
            <p>Selected files: {mediaFiles.length}/7</p>

            <button type="submit" className="bg-blue-500 text-white py-2 px-4 mt-3">
                Create Listing
            </button>
        </form>
    );
};
