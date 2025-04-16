// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDYVeauW4s85P3K1wxXeVQImRfKgXR5uSA",
  authDomain: "amzn-c.firebaseapp.com",
  projectId: "amzn-c",
  storageBucket: "amzn-c.firebasestorage.app",
  messagingSenderId: "25365575061",
  appId: "1:25365575061:web:f065ca7ae5f572fc5a729c"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
