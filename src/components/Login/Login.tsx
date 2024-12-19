"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Swal from "sweetalert2";
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
import Loading from "../LoadingFolder/Loading";

const loginSchema = z.object({
  email: z.string().email("אימייל לא חוקי"),
  password: z.string().min(6, "הסיסמה חייבת להכיל לפחות 6 תווים"),
});

const registerSchema = loginSchema.extend({
  username: z.string().min(3, "שם המשתמש חייב להכיל לפחות 3 תווים"),
});

interface LoginProp {
  onClickDialog: () => void;
}

function Login({ onClickDialog }: LoginProp) {
  const [status, setStatus] = useState<"התחברות" | "הרשמה">("התחברות");
  const setUser = useUserStore((state) => state.setUser);
  const [loading, setLoading] = useState<boolean>(false);
  const schema = status === "הרשמה" ? registerSchema : loginSchema;
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const email = watch("email");


  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      let response;
      if (status === "התחברות") {
        const loginData: LoginCredentials = {
          email: data.email,
          password: data.password,
        };
        response = await logInUser(loginData);

        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "ההתחברות בוצעה בהצלחה!",
            text: `ברוך הבא, ${response.user.name}`,
          });
          setUser(response.user);
        } else {
          Swal.fire({
            icon: "error",
            title: "שגיאה",
            text: response.message || "ההתחברות נכשלה.",
          });
        }
      } else if (status === "הרשמה") {
        const userData: UserWithPassword = {
          name: data.username,
          email: data.email,
          password: data.password,
          books: [],
          userImagePath: "",
        };
        response = await registerUser(userData);

        if (response.status === 200 || response.status === 201) {
          Swal.fire({
            icon: "success",
            title: "הרשמה בוצעה בהצלחה!",
            text: "ברוך הבא למערכת",
          });
          setUser(response.user);
          setStatus("התחברות");
        } else {
          Swal.fire({
            icon: "error",
            title: "שגיאה",
            text: response.message || "ההרשמה נכשלה.",
          });
        }
      }
    } catch (error) {
      console.error("Error during submission:", error);
      Swal.fire({
        icon: "error",
        title: "שגיאה",
        text: "אירעה שגיאה פנימית במערכת. נסה שוב מאוחר יותר.",
      });
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
        Swal.fire({
          icon: "success",
          title: "ההתחברות בוצעה בהצלחה!",
          text: `ברוך הבא, ${response.user.name}`,
        });
      }
    } catch (error) {
      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        (error as { code: string }).code === "auth/popup-closed-by-user"
      ) {
        console.log("User closed the Google login popup.");
      } else {
        console.error("Error during Google login:", error);
        Swal.fire({
          icon: "error",
          title: "שגיאה",
          text: " ההרשמה נכשלה 😥. נסה שוב מאוחר יותר.",
        });
      }
    } finally {
      setLoading(false);
    }
  }



  const handleForgotPassword = async () => {
    setLoading(true);
    if (!email) {
      Swal.fire({
        icon: "error",
        title: "שגיאה",
        text: "יש למלא את המייל",
      });
      setLoading(false);
      return;
    }

    try {
      const response = await forgetPassword(email);
      Swal.fire({
        icon: "success",
        title: "הסיסמה נשלחה בהצלחה!",
        text: "הסיסמה החדשה נשלחה למייל שלך. אנא העתק אותה מהמייל.",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "שגיאה",
        text: "המערכת נתקלה בבעיה בשליחת הסיסמה לתיבת המייל שלך",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLoginGuest = async () => {
    setLoading(true);
    try {
      let localUser = {
        _id: 'kWB2fSx9q1SxmMc1W7vyoWo2QQZ2',
        email: 'frieman@g.jct.ac.il',
        name: 'guest',
        books: [],
        userImagePath: '',
        password: 'dhvLXn'
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

            <p className={styles.title}>{status}</p>

            <form onSubmit={handleSubmit(onSubmit)}>
              {status === "הרשמה" && (
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

                {status === "התחברות" && (
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
                {status}
              </button>
            </form>
            <div className={styles.textWithLine}>
              <span>או התחבר עם google</span>
            </div>
            <IconButton
              edge="end"
              color="inherit"
              className={styles.iconButton}
            >
              <Image onClick={() => handleLoginWithGoogle()} className={styles.googleButtonImage} src={googleImage} alt="login image" width={30} height={30} />
            </IconButton>


            <p className={styles.switchStatus}>
              {status === "התחברות" ? (
                <>
                  אין לך חשבון? <span onClick={() => setStatus("הרשמה")}>הרשמה</span>
                </>
              ) : (
                <>
                  כבר יש לך חשבון? <span onClick={() => setStatus("התחברות")}>התחברות</span>
                </>
              )}
            </p>
            <span className={styles.guest} onClick={() => handleLoginGuest()}>התחבר כאורח</span>
          </>}
      </div>
    </div>
  );
}

export default Login;





// import { auth } from "../../lib/firebase";
// import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// import useUserStore from "../../services/zustand/userZustand/userStor";
// import { logInUser } from "../../services/userService";
// import Image from "next/image";
// import logo from '../../../public/pictures/logo1.png';
// import styles from "./login.module.css";
// import { DotLottieReact } from "@lottiefiles/dotlottie-react";
// import { useRouter } from "next/navigation";


// const Login = () => {
//   const router = useRouter();
//   const setUser = useUserStore((state) => state.setUser);

//   const handleLogin = async () => {
//     try {
//       let localUser = {
//         _id: 'kWB2fSx9q1SxmMc1W7vyoWo2QQZ2',
//         email: 'frieman@g.jct.ac.il',
//         name: 'guest',
//         books: [],
//         userImagePath: '',
//       };

//       const response = await logInUser(localUser);

//       if (response.status === 200) {
//         localUser = response.user;
//       }
//       setUser(localUser);
//     } catch (error) {
//       console.error("Error during login:", error);

//     }
//   }

//   const handleGoogleLogin = async () => {
//     try {
//       const provider = new GoogleAuthProvider();
//       provider.setCustomParameters({ prompt: "select_account" });

//       const result = await signInWithPopup(auth, provider);
//       const user = result.user;

//       let localUser = {
//         _id: user.uid,
//         email: user.email || '',
//         name: user.displayName || '',
//         books: [],
//         userImagePath: user.photoURL || '',
//       };

//       const response = await logInUser(localUser);

//       if (response.status === 200) {
//         localUser = response.user;
//       }
//       setUser(localUser);

//     } catch (error) {
//       console.error("Error during Google login:", error);

//     }
//   };
//   const handleGoHome = () => {
//     router.push('/Home');
//   };

//   return (
//     <div className={styles.login_card}>
//       <div className={styles.side}>
//         <p className={styles.login_card_text}><strong>התחברות</strong></p>
//         <button onClick={handleGoogleLogin} className={styles.login_card_button}>
//           המשך עם Google
//         </button>
//         <button onClick={handleLogin} className={styles.login_guest}>
//           התחבר כאורח
//         </button>
//         <button onClick={handleGoHome} className={styles.goHhomeBtn}>חזרה לעמוד הבית</button>

//         <Image
//           src={logo}
//           alt="logo image"
//           className={styles.logo}
//         />
//       </div>
//       <div className={styles.animate}>
//         <script src="https://unpkg.com/@lottiefiles/dotlottie-wc@0.3.0/dist/dotlottie-wc.js" type="module"></script>
//         <DotLottieReact src="https://lottie.host/69f5d49e-2f3e-41af-a9cb-914ffbe211ce/MqFYZZanAP.lottie" autoplay loop></DotLottieReact>
//       </div>
//     </div>
//   );
// };


// export default Login;
