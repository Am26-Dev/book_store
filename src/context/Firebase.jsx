import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "firebase/auth";
import { getFirestore } from "firebase/firestore"

const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyBEuWH5qvE-LFNLWMvRgM2HdpjXpDAe6MA",
  authDomain: "bookstore-7edd0.firebaseapp.com",
  projectId: "bookstore-7edd0",
  storageBucket: "bookstore-7edd0.firebasestorage.app",
  messagingSenderId: "824895536626",
  appId: "1:824895536626:web:d1c58a0589affdab1cff6b"
};

export const useFirebase = () => useContext(FirebaseContext);
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const fireStore = getFirestore(firebaseApp)



export const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  const signUpUser = (email, password) => {
    return createUserWithEmailAndPassword(firebaseAuth, email, password);
  };

  const signInUser = (email, password) => {
    return signInWithEmailAndPassword(firebaseAuth, email, password);
  };

  const isLoggedIn = user ? true : false;

  const signOutUser = async () => {
    const res = await signOut(firebaseAuth)
    console.log("logged out", res)
  } 

  const createNewListing = (name, isbn, price, cover) => {
    
  }


  return (
    <FirebaseContext.Provider value={{ signUpUser, signInUser, isLoggedIn, signOutUser, createNewListing }}>
      {props.children}
    </FirebaseContext.Provider>
  );
};
