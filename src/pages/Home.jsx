import React from "react";
import { useFirebase } from "../context/Firebase";
import { Link } from "react-router-dom"

export const Home = () => {
  const firebase = useFirebase();

  return (
    <div className="flex flex-col p-5">
      <p>This is the home page</p>
      {
        firebase.isLoggedIn ? <button
        onClick={() => firebase.signOutUser()}
        className="border border-purple-500 w-fit p-2 rounded-full"
      >
        Logout
      </button> : <Link to="/signup">
        <button className="border border-purple-500 w-fit p-2 rounded-full">Sign up</button>
      </Link>
      }
      
    </div>
  );
};
