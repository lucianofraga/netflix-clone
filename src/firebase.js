import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: '_________',
  authDomain: '_________',
  projectId: '_________',
  storageBucket: '_________',
  messagingSenderId: '_________',
  appId: '_________',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

const auth = getAuth();
const signUp = (email, password) => createUserWithEmailAndPassword(auth, email, password);
const signIn = (email, password) => signInWithEmailAndPassword(auth, email, password);

export { auth, signUp, signIn };
export default db;
