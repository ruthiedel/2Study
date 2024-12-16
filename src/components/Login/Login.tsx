"use client";
import React from "react";
import { auth } from "../../lib/firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import useUserStore from "../../services/zustand/userZustand/userStor";
import { logInUser } from "../../services/userService";
import Image from "next/image";
import logo from '../../../public/pictures/logo1.png';
import styles from "./login.module.css";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useRouter } from "next/navigation"; 


const Login = () => {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);

  const handleLogin = async () => {
    try {
      let localUser = {
        _id: 'kWB2fSx9q1SxmMc1W7vyoWo2QQZ2',
        email: 'frieman@g.jct.ac.il',
        name: 'guest',
        books: [],
        userImagePath: '',
      };

      const response = await logInUser(localUser);

      if (response.status === 200) {
        localUser = response.user;
      }
      setUser(localUser);
    } catch (error) {
      console.error("Error during login:", error);

    }
  }

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
      console.log(localUser);
      const response = await logInUser(localUser);

      if (response.status === 200) {
        localUser = response.user;
      }
      setUser(localUser);

    } catch (error) {
      console.error("Error during Google login:", error);

    }
  };
  const handleGoHome = () => {
    router.push('/home');
  };

  return (
    <div className={styles.login_card}>
      <div className={styles.side}>
        <p className={styles.login_card_text}><strong>התחברות</strong></p>
        <button onClick={handleGoogleLogin} className={styles.login_card_button}>
          המשך עם Google
        </button>
        <button onClick={handleLogin} className={styles.login_guest}>
          התחבר כאורח
        </button>
        <button onClick={handleGoHome} className={styles.goHhomeBtn}>חזרה לעמוד הבית</button>

        <Image
          src={logo}
          alt="logo image"
          className={styles.logo}
        />
      </div>
      <div className={styles.animate}>
        <script src="https://unpkg.com/@lottiefiles/dotlottie-wc@0.3.0/dist/dotlottie-wc.js" type="module"></script>
        <DotLottieReact src="https://lottie.host/69f5d49e-2f3e-41af-a9cb-914ffbe211ce/MqFYZZanAP.lottie" autoplay loop></DotLottieReact>
      </div>
    </div>
  );
};


export default Login;
