import { initializeApp } from "firebase/app";

import {
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";

import { getFirestore } from "firebase/firestore";

import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyAI5kVP6MWCMwEUydNzCB9-p18G2z5mKOw",
  authDomain: "drive-easy-49fc8.firebaseapp.com",
  projectId: "drive-easy-49fc8",
  storageBucket: "drive-easy-49fc8.firebasestorage.app",
  messagingSenderId: "559130503125",
  appId: "1:559130503125:web:86487d3ad139d769583f5c",
  measurementId: "G-34GNTQT03D",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);

export const storage = getStorage(app);

export default app;