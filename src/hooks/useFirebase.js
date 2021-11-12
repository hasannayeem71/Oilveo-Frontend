import axios from "axios";
import {
  createUserWithEmailAndPassword,
  getAuth,
  getIdToken,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useEffect, useState } from "react";
import initializeAuth from "../Firebase/firebase.init";

initializeAuth();
const useFirebase = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState("");
  const [admin, setAdmin] = useState(false);
  const [token, setToken] = useState("");
  const auth = getAuth();

  //Login with google popup
  const logInWithPopUp = (location, history) => {
    setLoading(true);
    const googleProvider = new GoogleAuthProvider();
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        saveUser(result.user.email, result.user.displayName, true);
        const redirect_uri = location?.state?.from || "/";
        history.push(redirect_uri);

        setAuthError("");
      })
      .catch((error) => {
        console.log(error);
        const errorMessage = error.message;
        setAuthError(errorMessage);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  //register user
  const registerUser = (email, password, name, history) => {
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(user);
        setAuthError("");
        const newUser = { email, displayName: name };
        setUser(newUser);
        //save user to database
        saveUser(email, name, false);
        //set user name after creation user profile
        updateProfile(auth.currentUser, {
          displayName: name,
        })
          .then(() => {})
          .catch((error) => {
            setAuthError(error.message);
          });
        history.replace("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setAuthError(errorMessage);
        console.log(errorCode, errorMessage);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  //login user
  const logIn = (email, password, location, history) => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const redirect_uri = location.state?.from || "/";
        history.push(redirect_uri);
        setAuthError("");
      })
      .catch((error) => {
        const errorMessage = error.message;
        setAuthError(errorMessage);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  //logout system
  const logOut = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        console.log(error);
        setAuthError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  //user activity observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setAuthError("");
        getIdToken(user).then((idToken) => {
          setToken(idToken);
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe;
  }, [auth]);
  //check is admin or not
  useEffect(() => {
    axios
      .get(`https://oilveo.herokuapp.com/users/${user?.email}`)
      .then((res) => {
        setAdmin(res.data.admin);
      });
  }, [user?.email]);
  //save user
  const saveUser = (email, displayName, isPopup) => {
    const user = { email: email, displayName: displayName };

    if (isPopup) {
      axios
        .put(`https://oilveo.herokuapp.com/users`, user)
        .then((res) => console.log(res));
    } else {
      axios
        .post(`https://oilveo.herokuapp.com/users`, user)
        .then((res) => console.log(res));
    }
  };
  //return necessary function and state
  return {
    user,
    registerUser,
    loading,
    setLoading,
    logOut,
    setUser,
    logIn,
    authError,
    logInWithPopUp,
    admin,
    token,
  };
};

export default useFirebase;
