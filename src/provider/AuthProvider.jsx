import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
  } from "firebase/auth";
  import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.init";


export const AuthContext = createContext(null);
  const AuthProvider = ({ children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [theme, setTheme] = useState('light');
  
    const googleProvider = new GoogleAuthProvider();
  
  
  
    useEffect(() =>{
      document.documentElement.setAttribute('data-theme', theme);
    },[theme])
    
  
     const handleGoogleLogin = () => {
          setLoading(true);
          return signInWithPopup(auth, googleProvider);
     }
  
  
    const createUser = (email, password) => {
      setLoading(true);
      return createUserWithEmailAndPassword(auth, email, password);
    };
  
    const userLogin = (email, password) => {
      setLoading(true);
      return signInWithEmailAndPassword(auth, email, password);
    };
  
    const updateUsersProfile = (updatedData) => {
      return updateProfile(auth.currentUser, updatedData);
    };
  
    const logOut = () => {
      setLoading(true);
      return signOut(auth);
    };
  
    const AuthInfo = {
      user,
      loading,
      theme,
      setTheme,
      setUser,
      createUser,
      userLogin,
      handleGoogleLogin,
      updateUsersProfile,
      logOut,
    };
  
    useEffect(() => {
      const unsub = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        setLoading(false);
      });
      return () => {
        unsub();
      };
    }, []);
  
    return (
      <div>
        <AuthContext.Provider value={AuthInfo}>{children}</AuthContext.Provider>
      </div>
    );
  };
  
  export default AuthProvider;
  