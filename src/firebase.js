import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "serendib-savor-db.firebaseapp.com",
  projectId: "serendib-savor-db",
  storageBucket: "serendib-savor-db.appspot.com",
  messagingSenderId: "459570707247",
  appId: "1:459570707247:web:664bef65d0321bc433ffda",
};

export const app = initializeApp(firebaseConfig);
