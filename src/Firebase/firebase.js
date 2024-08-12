// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA8Zl-xBJIde_aua6N6lDQtD8IikiWr0W8",
  authDomain: "internship-extension.firebaseapp.com",
  projectId: "internship-extension",
  storageBucket: "internship-extension.appspot.com",
  messagingSenderId: "1076184885459",
  appId: "1:1076184885459:web:8bb7e9b64a8fd314474c26",
  measurementId: "G-33X6VT9B2B",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
