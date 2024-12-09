"use client";
import React from "react";
import { auth } from "../../lib/firebase"; 
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import useUserStore from "../../services/zustand/userZustand/userStor";
import { logInUser } from "../../services/userService";
import Image from "next/image";
import login1 from '../../../public/pictures/login1.png';
import login2 from '../../../public/pictures/login2.png';
import styles from "./login.module.css";

const Login = () => {
  const setUser = useUserStore((state) => state.setUser);

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });
  
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
  
      let localUser = {
        _id: user.uid,
        email: user.email || '',
        name: user.displayName || '',
        books: [],
        userImagePath: user.photoURL || '',
      };
  
      const response = await logInUser(localUser);
  
      if (response.status === 200) {
        localUser = response.user;
      }
  
      setUser(localUser);
  
    } catch (error) {
      console.error("Error during Google login:", error);
      
    }
  };
  
  return (
    <div className={styles.login_card}>
      <Image
        src={login1}
        alt="Top Icon"
        className={styles.login_card_icon_top}
      />
      <p className={styles.login_card_text}>בוא נחבר אותך:</p>
      <button onClick={handleGoogleLogin} className={styles.login_card_button}>
        המשך עם Google
      </button>
      <Image
        src={login2}
        alt="Bottom Icon"
        className={styles.login_card_icon_bottom}
      />
    </div>
  );
};


export default Login;
