// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBn05heTKZ6FQzXAP78OzITLhOZZTPnB_I",
  authDomain: "accountapp-1f68f.firebaseapp.com",
  projectId: "accountapp-1f68f",
  storageBucket: "accountapp-1f68f.appspot.com",
  messagingSenderId: "378676626438",
  appId: "1:378676626438:web:73f17f447dabf43415ef87"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app); 