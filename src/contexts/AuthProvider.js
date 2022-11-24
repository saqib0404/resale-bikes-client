import React, { createContext, useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import app from '../firebase/firebase.config';

export const AuthContext = createContext();
const auth = getAuth(app)

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const provider = new GoogleAuthProvider();

    // Create User
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // Update User
    const updateUser = (userInfo) => {
        return updateProfile(auth.currentUser, userInfo);
    }

    // Login user
    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    // Login with google
    const googleLogin = () => {
        return signInWithPopup(auth, provider)
    }

    //  log out user
    const logOut = () => {
        setLoading(true);
        localStorage.removeItem('accessToken');
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [])

    const authInfo = {
        user,
        loading,
        setLoading,
        createUser,
        updateUser,
        loginUser,
        googleLogin,
        logOut
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;