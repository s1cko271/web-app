import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBt3MAkx72RfMwqu2aI-zyH-6GFPzDHCFQ",
  authDomain: "photo-sharing-aa8ef.firebaseapp.com",
  projectId: "photo-sharing-aa8ef",
  storageBucket: "photo-sharing-aa8ef.appspot.com",
  messagingSenderId: "774667601400",
  appId: "1:774667601400:web:5a7ace92588be208e9420d",
  measurementId: "G-EV3D8WETD0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)