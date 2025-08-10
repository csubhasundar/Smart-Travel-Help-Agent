// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCsDFuu5uq2mv9TsU5dfF9Y3uGJRopgXXo",
  authDomain: "travelagent-1044a.firebaseapp.com",
  projectId: "travelagent-1044a",
  storageBucket: "travelagent-1044a.firebasestorage.app",
  messagingSenderId: "924250255819",
  appId: "1:924250255819:web:41343a65d51ed2c07e864e",
  measurementId: "G-QCJNS0HJ7Z",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
