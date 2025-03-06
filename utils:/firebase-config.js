// src/utils/firebase-config.js - Firebase setup for VANISH 404

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAyjqkaHOy7B3hTAE_qQcE5T-WZL4iIzdg",
  authDomain: "vanish404-e957f.firebaseapp.com",
  projectId: "vanish404-e957f",
  storageBucket: "vanish404-e957f.firebasestorage.app",
  messagingSenderId: "147220498536",
  appId: "1:147220498536:web:576c65cad3ef6623af93dd",
  measurementId: "G-4WRCC3C6LY"
};

export const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);