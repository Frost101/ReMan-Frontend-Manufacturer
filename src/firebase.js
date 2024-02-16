// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHmjeBZQTyfj1mLhiUH6m_gOxH2rCn-gY",
  authDomain: "reman-manufacturer.firebaseapp.com",
  projectId: "reman-manufacturer",
  storageBucket: "reman-manufacturer.appspot.com",
  messagingSenderId: "665072966814",
  appId: "1:665072966814:web:bcbe125d9dd6320fe96f8f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);