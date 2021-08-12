import firebase from "firebase/app";

import "firebase/analytics";

import "firebase/auth";
import "firebase/firestore";

import isClientSide from "../utils/isClientSide";
import { useEffect } from "react";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_AUTH_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
};

const useFirebase = () => {
  useEffect(() => {
    if (isClientSide() && !firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }, []);

  return firebase;
};

export default useFirebase;
