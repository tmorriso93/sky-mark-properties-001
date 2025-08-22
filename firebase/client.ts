// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { Auth, getAuth } from "firebase/auth";

import { FirebaseStorage, getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAsnxlsN_xBc5FgR7awvE-TCY5C3Jxurzc",
  authDomain: "sky-mark-properties.firebaseapp.com",
  projectId: "sky-mark-properties",
  storageBucket: "sky-mark-properties.firebasestorage.app",
  messagingSenderId: "282226472064",
  appId: "1:282226472064:web:cce011e6bf838c171e6265",
  measurementId: "G-P32DG5MDX1"
};
 
// Initialize Firebase
const currentApps = getApps();
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics();
let auth: Auth;
let storage: FirebaseStorage;

if(!currentApps.length) {
    const app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    storage = getStorage(app);
} else {
    const app = currentApps[0];
    auth = getAuth(app);
    storage = getStorage(app);
}

export {auth, storage };