// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, User } from "firebase/auth";
import { getFunctions } from "firebase/functions";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSUfoaeJDghFYMVfVF4ONbioRz7GdcBio",
  authDomain: "noble-linker-465117-i1.firebaseapp.com",
  projectId: "noble-linker-465117-i1",
  appId: "1:421656306173:web:2591f2a1168f645df07994"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export const functions = getFunctions(app);

/**
 * Signs the user in with a Google popup.
 * @returns A promise that resolves with the user's credentials.
 */
export function signInWithGoogle() {
  return signInWithPopup(auth, new GoogleAuthProvider());
}

/**
 * Signs the user out.
 * @returns A promise that resolves when the user is signed out.
 */
export function signOut() {
  return auth.signOut();
}

/**
 * Trigger a callback when user auth state changes.
 * @returns A function to unsubscribe callback.
 */
export function onAuthStateChangedHelper(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}
