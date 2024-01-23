// MyContext.js
import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { Slide, toast } from 'react-toastify';


const toastMessage = ({ message }) => {
    toast(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
    });
}

export const AppContext = createContext();

export const AppProvider = ({ children }) => {

    const [userData, setUserData] = useState(null);

    const [bankData, setUserFinances] = useState()

    const [transactions, setTransactions] = useState(0)


    useEffect(() => {
        const storedUserData = sessionStorage.getItem('userData');
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
        }
    }, []);

    useEffect(() => {
        if (!userData) {
            sessionStorage.removeItem('userData');
        }

        sessionStorage.setItem('userData', JSON.stringify(userData))

    }, [userData]);


    useEffect(() => {
        const handleBeforeUnload = () => {
            if (userData) {
                sessionStorage.setItem('userData', JSON.stringify(userData));
            }
        };
        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [userData]);


    async function signup(email, password) {
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            // Handle user creation
            toast("User Account created successfully")

            let user = response.user
            const token = await user.getIdToken();
            console.log("JWT:", token)
            await createUserDocument(user.uid, { email, bankAccount: { accountNumber: "default", balance: 0.0 } });
            setUserData(user.uid);

            return response.user;
        } catch (error) {
            // Handle errors
            console.error("Signup failed: ", error);
            toastMessage('Sign Up failed')
            throw error;
        }
    }

    async function login(email, password) {
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            // Handle successful login
            let user = response.user
            const token = await user.getIdToken();
            console.log("JWT:", token)

            setUserData(user.uid);

            const userDocument = await getUserDocument(user.uid);
            console.log("User Data:", userDocument);

            setUserFinances(userDocument)
            // console.log(response.user)

            return response.user;
        } catch (error) {
            // Handle errors
            console.error("Login failed: ", error);
            throw error;
        }
    }

    async function createUserDocument(uid, data) {
        try {
            await setDoc(doc(db, "users", uid), data, { merge: true });
        } catch (error) {
            console.error("Error creating user document: ", error);
            throw error;
        }
    }

    // Function to get user document from the database
    async function getUserDocument(uid) {
        try {
            const docRef = doc(db, "users", uid);
            const docSnap = await getDoc(docRef);
            return docSnap.exists() ? docSnap.data() : null;
        } catch (error) {
            console.error("Error getting user document: ", error);
            throw error;
        }
    }


    const updateBank = async (newBalance) => {
        try {
            const userId = userData;
            const docRef = doc(db, "users", userId);

            await updateDoc(docRef, {
                'bankAccount.balance': newBalance,
            });

            setUserFinances((prevData) => ({
                ...prevData,
                bankAccount: {
                    ...prevData.bankAccount,
                    balance: newBalance,
                },
            }));


        } catch (error) {
            console.error('Error updating bank balance:', error);
            toast('Error updating bank balance')

        }
    };


    const updateEmail = async (newEmail) => {
        try {
            await updateEmail(auth.currentUser, newEmail);

            toast('Email updated successfully');
        } catch (error) {
            console.error('Error updating email:', error);
            toast('Error updating email');

        }
    };

    const updatePassword = async (newPassword) => {

        console.log(auth.currentUser)
        try {
            await updatePassword(auth.currentUser, newPassword);
    
            toast('Password updated successfully');
        } catch (error) {
            console.error('Error updating password:', error);
            toast('Error updating password');
        }
    };


    const logout = () => {
        auth.signOut()
        setUserData(null)
        setIsAuthenticated(false)
        sessionStorage.removeItem('userData');
        window.location.href = '/';
    }

    const contextValue = {
        userData,
        login,
        signup,
        logout,
        toastMessage,
        bankData,
        updateBank,
        transactions,
        setTransactions,
        updateEmail,
        updatePassword
    };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};
