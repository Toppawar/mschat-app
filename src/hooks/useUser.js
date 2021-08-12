import { useEffect, useState } from "react";
import useFirebase from "./useFirebase";

const useUser = () => {
  const [user, setUser] = useState();
  const firebase = useFirebase();

  const mapUserFromFirebaseAuthToUser = (user) => {
    const { displayName, email, photoURL, uid } = user;

    return {
      avatar: photoURL,
      username: displayName,
      email,
      uid,
    };
  };

  useEffect(() => {
    if (firebase) {
      firebase.auth().onAuthStateChanged((user) => {
        const normalizedUser = user
          ? mapUserFromFirebaseAuthToUser(user)
          : null;
        setUser(normalizedUser);
      });
    }
  }, []);

  const loginWithGoogle = () => {
    try {
      const googleProvider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().useDeviceLanguage();
      return firebase.auth().signInWithPopup(googleProvider);
    } catch (error) {
      console.log(error);
    }
  };

  const signOut = () => {
    return firebase.auth().signOut();
  };

  return {
    user,
    loginWithGoogle,
    signOut,
  };
};

export default useUser;
