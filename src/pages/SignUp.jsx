import React, { useState, useEffect } from "react";
import { useFirebase } from "../context/Firebase";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
  const firebase = useFirebase();
  // console.log(firebase)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()

  useEffect(()=>{
    if(firebase.isLoggedIn){
      navigate('/')
    }
  },[firebase, navigate]) 

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await firebase.signUpUser(email, password)
    console.log("Signed Up", result)
    setEmail("")
    setPassword("")
  }

  return (
    <div className="flex flex-col w-[300px] p-4">
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className="border border-gray-400 mb-5"
          type="text"
          id="email"
        />
        <label htmlFor="password">Password</label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="text"
          id="password"
          className="border border-gray-400 mb-5"
        />
        <button
          type="submit"
          className="border border-indigo-400"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};