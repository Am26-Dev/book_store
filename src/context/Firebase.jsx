import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import axios from "axios";

const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIRE_API_KEY ,
  authDomain: import.meta.env.VITE_FIRE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_PROJECTID,
  storageBucket: import.meta.env.VITE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_MESSSENDERID,
  appId: import.meta.env.VITE_APPID,
};

export const useFirebase = () => useContext(FirebaseContext);
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const fireStore = getFirestore(firebaseApp);

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

  const signUpUser = (email, password, name) => {
    createUserWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        updateProfile(user, {
          displayName: name,
        })
          // .then(() => {
          //   console.log("user profile updated:", user);
          // })
          // .catch((e) => console.log(e));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const signInUser = (email, password) => {
    return signInWithEmailAndPassword(firebaseAuth, email, password);
  };

  const isLoggedIn = user ? true : false;

  const signOutUser = async () => {
    const res = await signOut(firebaseAuth);
    console.log("logged out", res);
  };

  console.log(user);

  const createNewListing = async (name, isbn, price, coverPic) => {
    if (!coverPic) return;

    // Create a FormData object to hold the file data
    const formData = new FormData();
    formData.append("file", coverPic);
    formData.append("upload_preset", "unsigned_presetba"); // cloudinary upload preset

    try {
      // Upload to Cloudinary using Axios
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/ddh2tu58p/image/upload`,
        formData
      );

      if (response.data.secure_url) {
        const imageUrl = response.data.secure_url;

        await addDoc(collection(fireStore, "books"), {
          name,
          isbn,
          price,
          coverPic: imageUrl,
          userId: user.uid,
          userEmail: user.email,
          displayName: user.displayName || "no name provided",
        });
        return { success: true, message: "Listing created successfully!" };
        // toast.success("Listed the book successfully")
        // console.log("Listing created successfully");
      } else {
        return { success: false, message: "Image upload failed." };
        // console.error("Image upload failed:", response.data);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      return { success: false, message: "Error uploading image." };
    }
  };

  return (
    <FirebaseContext.Provider
      value={{
        signUpUser,
        signInUser,
        isLoggedIn,
        signOutUser,
        createNewListing,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
