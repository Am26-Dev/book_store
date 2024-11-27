import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Navbar } from "./components/Navbar";
import { SignUp } from "./pages/SignUp";
import { SignIn } from "./pages/SignIn";
import { AddListing } from "./pages/AddListing";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BookDetails } from "./pages/BookDetails";

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/addlisting" element={<AddListing />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/book/:id" element={<BookDetails />} />
      </Routes>
    </div>
  );
};

export default App;
