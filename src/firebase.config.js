// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBg4el3VrWgaRzNqLIu11X4XnjbjUynyDE",
  authDomain: "total-x-task-9cda3.firebaseapp.com",
  projectId: "total-x-task-9cda3",
  storageBucket: "total-x-task-9cda3.firebasestorage.app",
  messagingSenderId: "980572574035",
  appId: "1:980572574035:web:9eeaaa059cc29030a051a6",
  measurementId: "G-57C8784DSL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// const analytics = getAnalytics(app);
export const auth =  getAuth(app)

export const db = getFirestore(app);
export default app;