import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { auth } from "..";
import { setCurrentUserAction } from "../../store/actions/wiki";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  const login =(email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  }

  const logout = () => {
    return signOut(auth);
  }

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  }

  useEffect(() => {
    const dispatchAuth = () => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        setCurrentUser(user);
        setLoading(false);
      });
      return unsubscribe;
    }
    dispatch(setCurrentUserAction(currentUser));
    dispatchAuth();
  }, [currentUser]);

  const value = {
    currentUser,
    signUp,
    login,
    logout,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

