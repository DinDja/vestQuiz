import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDngsg2NCTveN71acJ4VGDmvsSSPFuvsAM",
  authDomain: "lovebuilder-87763.firebaseapp.com",
  projectId: "lovebuilder-87763",
  storageBucket: "lovebuilder-87763.firebasestorage.app",
  messagingSenderId: "272837748642",
  appId: "1:272837748642:web:fd717fda7506c52aeeb4fb",
  measurementId: "G-5D1X2JNVHZ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);