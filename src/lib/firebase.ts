// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWytDvHtU9_Q_kfeiZ_1olhujc074ZChw",
  authDomain: "studio-9812978072-d24a0.firebaseapp.com",
  projectId: "studio-9812978072-d24a0",
  storageBucket: "studio-9812978072-d24a0.appspot.com",
  messagingSenderId: "381619212080",
  appId: "1:381619212080:web:1acc08958f9f69034a42f5",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
