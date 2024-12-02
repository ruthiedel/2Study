"use client";
import React from "react";
import { Box, Button, Typography } from "@mui/material";
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
      provider.setCustomParameters({
        prompt: "select_account",  
      });
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const localUser = {
        _id: user.uid,
        email: user.email || '',
        name: user.displayName || '',
        books: [],
        userImagePath: user.photoURL as string,
      }
      setUser(localUser);
      logInUser(localUser);
    } catch (error) {
      console.error("Error during Google login:", error);
    }
  };

  return (
    <Box className={styles.login_card}>
      <Image
        src={login1}
        alt="Top Icon"
        className={styles.login_card_icon_top}
      />
      <Typography className={styles.login_card_text}>בוא נחבר אותך:</Typography>
      <Button onClick={handleGoogleLogin} variant="contained" className={styles.login_card_button}>
        המשך עם Google
      </Button>
      <Image
        src={login2}
        alt="Bottom Icon"
        className={styles.login_card_icon_bottom}
      />
    </Box>
  );
};

export default Login;
