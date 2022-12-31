// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAvmgb1mo5guaMgM2ZvzCPZwXl1GKENf-Q",
  authDomain: "dreamhome-app.firebaseapp.com",
  projectId: "dreamhome-app",
  storageBucket: "dreamhome-app.appspot.com",
  messagingSenderId: "207527078793",
  appId: "1:207527078793:web:8bc5dba13c3e8e999f8f58"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()