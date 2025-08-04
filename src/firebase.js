// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAgVke-shCpIwKP5avgbwFe5l3eUaYjYlY",
  authDomain: "login-73574.firebaseapp.com",
  projectId: "login-73574",
  storageBucket: "login-73574.appspot.com",
  messagingSenderId: "79439080088",
  appId: "1:79439080088:web:f7e4bd88c31923c5e0feed",
  measurementId: "G-CQ4DC029KF"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };