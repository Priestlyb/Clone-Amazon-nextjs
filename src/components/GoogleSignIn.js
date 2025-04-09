// components/GoogleSignIn.js
"use client";

import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase"; // Adjust the import path as necessary
import React from "react";
import { useEffect, useState } from "react";

export default function GoogleSignIn() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("firebaseUser");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setUser(user);
      localStorage.setItem("firebaseUser", JSON.stringify(user));
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const handleSignOut = () => {
    auth.signOut();
    setUser(null);
    localStorage.removeItem("firebaseUser");
  };

  return (
    <div className="p-4">
      {user ? (
        <>
          <p>Signed in as {user.displayName}</p>
          <button onClick={handleSignOut} className="bg-red-500 px-4 py-2 text-white rounded">Sign Out</button>
        </>
      ) : (
        <button onClick={handleSignIn} className="bg-blue-500 px-4 py-2 text-white rounded">Sign in with Google</button>
      )}
    </div>
  );
}
