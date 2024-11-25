"use client";
import React from "react";
import { auth, provider, signInWithPopup } from "@/lib/firebase";

const Login = () => {
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("User info:", user);
      // את יכולה לשמור את המשתמש ב-DB או לנתב לדף אחר
    } catch (error) {
      console.error("Error during Google login:", error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleGoogleLogin}>Sign in with Google</button>
    </div>
  );
};

export default Login;