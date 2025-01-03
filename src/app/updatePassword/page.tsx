"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import styles from "./reset-password.module.css";
import RequireAuth from "../../layout/RequireAuth";
import useUserStore from "../../services/zustand/userZustand/userStor";
import { updatePassword } from "@/services/userService";
import { updatePasswordAlert, errorPasswordAlert } from "../../lib/clientHelpers/sweet-alerts";
import { passwordSchema } from "../../lib/clientHelpers/zodSchema";
import { useRouter } from "next/navigation";

type FormData = z.infer<typeof passwordSchema>;

const ResetPassword = () => {
    const router = useRouter();
    const user = useUserStore((state) => state.user);
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(passwordSchema),
    });

    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data: FormData) => {
        const { password } = data;
        setIsLoading(true); 
        try {
            await updatePassword({ email: user?.email!, newPassword: password });
            updatePasswordAlert();
            router.push(`/userDashboard`);
        } catch (error) {
            errorPasswordAlert();
        } finally {
            setIsLoading(false); 
        }
    };

    return (
        <RequireAuth>
            <div className={styles.container}>
                <h2 className={styles.title}>היי {user?.name}</h2>
                <h2 className={styles.title}>כאן תוכל\י לשנות סיסמא</h2>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                    <div className={styles.inputContainer}>
                        <input
                            {...register("password")}
                            type={showPassword ? "text" : "password"}
                            className={styles.input}
                            placeholder="סיסמא חדשה"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className={styles.eyeButton}
                        >
                            {showPassword ? "הסתר" : "הראה"}
                        </button>
                        {errors.password && <p className={styles.error}>{errors.password.message}</p>}
                    </div>

                    <div className={styles.inputContainer}>
                        <input
                            {...register("confirmPassword")}
                            type={showPassword ? "text" : "password"}
                            className={styles.input}
                            placeholder="אשר סיסמא"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className={styles.eyeButton}
                        >
                            {showPassword ? "הסתר" : "הראה"}
                        </button>
                        {errors.confirmPassword && <p className={styles.error}>{errors.confirmPassword.message}</p>}
                    </div>

                    <button
                        type="submit"
                        className={`${styles.submitButton} ${isLoading ? styles.disabledButton : ""}`}
                        disabled={isLoading}
                    >
                        {isLoading ? "שולח..." : "עדכן סיסמא"}
                    </button>
                </form>
            </div>
        </RequireAuth>
    );
};

export default ResetPassword;
