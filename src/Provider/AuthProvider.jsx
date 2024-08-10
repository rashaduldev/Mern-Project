/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import { 
    GoogleAuthProvider, 
    createUserWithEmailAndPassword, 
    getAuth, 
    signInWithEmailAndPassword, 
    signInWithPopup, 
    signOut, 
    updateProfile, 
    onAuthStateChanged 
} from "firebase/auth";
import app from "../firebase/firebase.config";

export const AuthContext = createContext(null);

const auth = getAuth(app);

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();

    // Monitor auth state change
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    // Log in with Google
    const googleSignin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
            .then((result) => {
                setUser(result.user);
            })
            .finally(() => setLoading(false));
    };

    // User creation
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                setUser(result.user);
            })
            .finally(() => setLoading(false));
    };

    // User sign-in
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
            .then((result) => {
                setUser(result.user);
            })
            .finally(() => setLoading(false));
    };

    // Update user profile
    const updateUserProfile = (name, photo) => {
        if (auth.currentUser) {
            return updateProfile(auth.currentUser, {
                displayName: name,
                photoURL: photo
            }).then(() => {
                setUser({ ...auth.currentUser });
            });
        }
    };

    // User sign-out
    const logOut = () => {
        setLoading(true);
        return signOut(auth)
            .then(() => {
                setUser(null);
            })
            .finally(() => setLoading(false));
    };

    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        updateUserProfile,
        logOut,
        googleSignin,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;