import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCIqE1przVV5nsBiTLm5YOvqPt5S8WkK2Q",
  authDomain: "todolist-8f310.firebaseapp.com",
  projectId: "todolist-8f310",
  storageBucket: "todolist-8f310.appspot.com",
  messagingSenderId: "743142866283",
  appId: "1:743142866283:web:e621484ad952fd0c5aa02e"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };