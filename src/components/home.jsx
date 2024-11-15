import React from 'react';
import { useLocation } from 'react-router-dom';
import {signOut} from "firebase/auth"
import { auth } from '../firebase.config';
function Home() {
    const location = useLocation();
    const userData = location.state?.userData;

    console.log("User ID:", userData);

    const logOut = async() => {
        signOut(auth)
    }

    return (
        <div className="flex items-center justify-center w-full h-screen">
            <div className="flex flex-col w-full max-w-lg p-6 items-center">
                <p className="text-xl font-medium mb-4"> {userData?.phone}</p>
                <button className="w-full py-3 text-base text-white bg-blue-600 font-medium rounded-sm">
                    Log Out
                </button>
            </div>
        </div>
    );
}

export default Home;
