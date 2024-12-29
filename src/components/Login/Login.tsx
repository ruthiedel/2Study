"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import image from "../../../public/pictures/unnamed.png";
import googleImage from "../../../public/pictures/google.jpg";
import styles from "./login.module.css";
import { LoginCredentials, UserWithPassword } from "../../types";
import { logInUser, logInWithGoogle, registerUser } from "../../services/userService";
import useUserStore from "../../services/zustand/userZustand/userStor";
import { IconButton } from "@mui/material";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { forgetPassword } from "@/services/mailService";
import { Loading, Regulations } from '../index';
import { errorRegisterAlert, successAlert } from '../../lib/clientHelpers/sweet-alerts'

import { loginSchema, registerSchema } from '../../lib/clientHelpers/zodSchema'
import Swal from "sweetalert2";

interface LoginProp {
  onClickDialog: () => void;
}

function Login({ onClickDialog }: LoginProp) {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const setUser = useUserStore((state) => state.setUser);
  const [loading, setLoading] = useState<boolean>(false);
  const schema = !isLogin ? registerSchema : loginSchema;
  const { register, handleSubmit, formState: { errors }, watch, } = useForm({ resolver: zodResolver(schema), });
  const email = watch("email");

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      let response;
      if (isLogin) {
        const loginData: LoginCredentials = {
          email: data.email,
          password: data.password,
        };
        response = await logInUser(loginData);

        if (response.status === 200) { 
          successAlert("ההתחברות בוצעה בהצלחה!", `ברוך הבא, ${response.user.name}`)
          setUser(response.user);
        } else { errorRegisterAlert(response.message)}
      } else if (!isLogin ) {
        const userData: UserWithPassword = {
          name: data.username,
          email: data.email,
          password: data.password,
          books: [],
          userImagePath: "",
        };
        response = await registerUser(userData);

        if (response.status === 200 || response.status === 201) {
          successAlert("הרשמה בוצעה בהצלחה!", "ברוך הבא למערכת")
          setUser(response.user);
          setIsLogin(true);
        } else { errorRegisterAlert(response.message)}
      }
    } catch (error) {
      console.error("Error during submission:", error);
      errorRegisterAlert("אירעה שגיאה פנימית במערכת. נסה שוב מאוחר יותר.")
    } finally {
      setLoading(false);
    }
  };

  const handleLoginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });

      const result = await signInWithPopup(auth, provider);
      setLoading(true);
      const user = result.user;
      if (user != null) {
        let localUser = {
          _id: user.uid,
          email: user.email || '',
          name: user.displayName || '',
          books: [],
          userImagePath: user.photoURL || '',
          password: user.uid
        };

        const response = await logInWithGoogle(localUser);

        if (response.status === 200) {
          localUser = response.user;
        }
        setUser(localUser);
        successAlert("ההתחברות בוצעה בהצלחה!", `ברוך הבא, ${response.user.name}`)
      }
    } catch (error) {
      if (typeof error === "object" && error !== null && "code" in error 
        && (error as { code: string }).code === "auth/popup-closed-by-user") {
      } else {
        console.error("Error during Google login:", error);
        errorRegisterAlert(" ההרשמה נכשלה 😥. נסה שוב מאוחר יותר.")
      }
    } finally {
      setLoading(false);
    }
  }

  const handleForgotPassword = async () => {
    const { value: email } = await Swal.fire({
      title: "שכחת סיסמה?",
      input: "email",
      inputLabel: "הכנס את כתובת המייל שלך",
      inputPlaceholder: "your-email@example.com",
      confirmButtonText: "שלח",
      showCancelButton: true,
      cancelButtonText: "ביטול",
      inputValidator: (value) => {
        if (!value) {
          return "יש למלא את כתובת המייל!";
        }
        if (!/\S+@\S+\.\S+/.test(value)) {
          return "כתובת מייל לא חוקית!";
        }
        return null;
      },
    });
  
    if (email) {
      setLoading(true);
      try {
        await forgetPassword(email);
        await Swal.fire({
          icon: "success",
          title: "סיסמה חדשה נשלחה!",
          text: "תוכלי להתחבר למערכת עם הסיסמה החדשה שנשלחה אלייך למייל. בנוסף, תוכלי לשנות אותה באזור האישי שלך.",
          confirmButtonText: "אישור",
        });
      } catch (error) {
        errorRegisterAlert("המערכת נתקלה בבעיה בשליחת הסיסמה לתיבת המייל שלך");
      } finally {
        setLoading(false);
      }
    }
  };  

  const handleLoginGuest = async () => {
    setLoading(true);
    try {
      let localUser = {
        _id: '675ac1edaa126e5e815ab057',
        email: 'frieman@g.jct.ac.il',
        name: 'guest',
        books: [],
        userImagePath: '',
        password: 'UIZixt'
      };

      const response = await logInUser(localUser);

      if (response.status === 200) {
        localUser = response.user;
      }
      setUser(localUser);
    } catch (error) {
      console.error("Error during login:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleDialogClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div className={styles.dialog} onClick={onClickDialog}>
      <div className={styles.formContainer} onClick={handleDialogClick}>
        {loading ? <Loading /> :
          <>
            <div>
              <Image src={image} alt="login image" width={200} height={200} />
            </div>

            <p className={styles.title}>{isLogin}</p>

            <form onSubmit={handleSubmit(onSubmit)}>
              {!isLogin && ( 
                <div>
                  <input
                    className={styles.input}
                    type="text"
                    placeholder="שם משתמש"
                    {...register("username")}
                  />
                  {errors.username && (
                    <p className={styles.error}>{errors.username.message as string}</p>
                  )}
                </div>
              )}

              <div>
                <input
                  className={styles.input}
                  type="email"
                  placeholder="אימייל"
                  {...register("email")}
                />
                {errors.email && (
                  <p className={styles.error}>{errors.email.message as string}</p>
                )}
              </div>

              <div>
                <input
                  className={styles.input}
                  type="password"
                  placeholder="סיסמה"
                  {...register("password")}
                />
                {errors.password && (
                  <p className={styles.error}>{errors.password.message as string}</p>
                )}

                {!isLogin && <Regulations register={register} errors={errors} /> }

                {isLogin && (
                  <button
                    type="button"
                    className={styles.forgotPassword}
                    onClick={handleForgotPassword}
                  >
                    שכחתי סיסמה
                  </button>
                )}
              </div>

              <button className={styles.button} type="submit">
                {isLogin ? "התחברות " : "הרשמה"}
              </button>
            </form>
            <div className={styles.textWithLine}>
              <span>או התחבר עם google</span>
            </div>
            <IconButton edge="end" color="inherit" className={styles.iconButton}>
              <Image onClick={() => handleLoginWithGoogle()} className={styles.googleButtonImage} src={googleImage} alt="login image" width={30} height={30} />
            </IconButton>

            <p className={styles.switchisLogin}>
              {isLogin ? (
                <>  אין לך חשבון? <span onClick={() => setIsLogin(false)}>הרשמה</span></>
              ) : (
                <>כבר יש לך חשבון? <span onClick={() => setIsLogin(true)}>התחברות</span></>
              )}
            </p>
            <span className={styles.guest} onClick={() => handleLoginGuest()}>התחבר כאורח</span>
          </>}
      </div>
    </div>
  );
}

export default Login;