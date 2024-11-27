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
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
} from "firebase/firestore";
import axios from "axios";

const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIRE_API_KEY,
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
        });
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

  const signOutUser = async () => {
    const res = await signOut(firebaseAuth);
    console.log("logged out", res);
  };

  console.log(user);

  //---------this is for uploading one image only======
  // const createNewListing = async (name, isbn, price, coverPic) => {
  //   if (!coverPic) return;

  //   // Create a FormData object to hold the file data
  //   const formData = new FormData();
  //   formData.append("file", coverPic);
  //   formData.append("upload_preset", `${import.meta.env.VITE_CLOUD_PRESET}`); // cloudinary upload preset

  //   try {
  //     // Upload to Cloudinary using Axios
  //     const response = await axios.post(
  //       `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`,
  //       formData
  //     );

  //     if (response.data.secure_url) {
  //       const imageUrl = response.data.secure_url;

  //       await addDoc(collection(fireStore, "books"), {
  //         name,
  //         isbn,
  //         price,
  //         coverPic: imageUrl,
  //         userId: user.uid,
  //         userEmail: user.email,
  //         displayName: user.displayName || "no name provided",
  //       });
  //       return { success: true, message: "Listing created successfully!" };
  //       // toast.success("Listed the book successfully")
  //       // console.log("Listing created successfully");
  //     } else {
  //       return { success: false, message: "Image upload failed." };
  //       // console.error("Image upload failed:", response.data);
  //     }
  //   } catch (error) {
  //     console.error("Error uploading image:", error);
  //     return { success: false, message: "Error uploading image." };
  //   }
  // };

  const createNewListing = async (name, isbn, price, mediaFiles) => {
    // this function is for allowing user to upload multiple media , images or videos , max 7
    if (!mediaFiles || mediaFiles.length === 0)
      return { success: false, message: "No media files selected." };

    try {
      const uploadPromises = mediaFiles.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append(
          "upload_preset",
          `${import.meta.env.VITE_CLOUD_PRESET}`
        );

        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${
            import.meta.env.VITE_CLOUD_NAME
          }/upload`,
          formData
        );

        return response.data.secure_url;
      });

      const imageUrls = await Promise.all(uploadPromises);

      await addDoc(collection(fireStore, "books"), {
        name,
        isbn,
        price,
        mediaFiles: imageUrls, // storing an array of image URLs
        userId: user.uid,
        userEmail: user.email,
        displayName: user.displayName || "no name provided",
      });

      return { success: true, message: "Listing created successfully!" };
    } catch (error) {
      console.error("Error uploading media:", error);
      return { success: false, message: "Error uploading media." };
    }
  };

  const listAllBooks = async () => {
    return getDocs(collection(fireStore, "books"));
  };

  const getBookById = async (id) => {
    const docRef = doc(fireStore, "books", id);
    const result = await getDoc(docRef);
    return result;
  };

  const placeOrder = async (bookId, qty) => {
    const collectionRef = collection(fireStore, "books", bookId, "orders");
    await addDoc(collectionRef, {
      username: user.displayName,
      userId: user.uid,
      userEmail: user.email,
      qty: Number(qty),
    });
    return  { success: true, message: "Order placed successfully!" };
  };

  const isLoggedIn = user ? true : false;

  return (
    <FirebaseContext.Provider
      value={{
        signUpUser,
        signInUser,
        isLoggedIn,
        signOutUser,
        createNewListing,
        listAllBooks,
        getBookById,
        placeOrder,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
