"use client";
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Swal from 'sweetalert2';
import styles from './reset-password.module.css';
import RequireAuth from '../../layout/RequireAuth';
import useUserStore from '../../services/zustand/userZustand/userStor';
import { updatePassword } from '@/services/userService';

const passwordSchema = z.object({
    password: z
        .string()
        .min(6, { message: 'הסיסמא צריכה להכיל לפחות 6 תווים' })
        .regex(/[a-z]/, { message: 'הסיסמא צריכה לכלול אותיות קטנות' })
        .regex(/[A-Z]/, { message: 'הסיסמא צריכה לכלול אותיות גדולות' })
        .regex(/[0-9]/, { message: 'הסיסמא צריכה לכלול ספרות' }),
    confirmPassword: z.string().min(6, { message: 'הסיסמא צריכה להכיל לפחות 6 תווים' }),
}).refine(data => data.password === data.confirmPassword, {
    message: 'הסיסמאות לא תואמות',
    path: ['confirmPassword'],
});

type FormData = z.infer<typeof passwordSchema>;

const ResetPassword = () => {
    const user = useUserStore((state) => state.user);
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(passwordSchema),
    });

    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = async (data: FormData) => {
        const { password } = data;
        try {
            await updatePassword({email: user?.email!, newPassword: password});
            Swal.fire({
                title: 'הסיסמא עודכנה בהצלחה!',
                icon: 'success',
                confirmButtonText: 'סגור',
            });
        } catch (error) {
            Swal.fire({
                title: 'שגיאה',
                text: 'הייתה שגיאה בעדכון הסיסמא, אנא נסה שוב מאוחר יותר.',
                icon: 'error',
                confirmButtonText: 'סגור',
            });
        }
    };

    return (
        <RequireAuth>
            <div className={styles.container}>
                <h2 className={styles.title}>שנה סיסמא</h2>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                    <div className={styles.inputContainer}>
                        <input
                            {...register('password')}
                            type={showPassword ? 'text' : 'password'}
                            className={styles.input}
                            placeholder="סיסמא חדשה"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className={styles.eyeButton}
                        >
                            {showPassword ? 'הסתר' : 'הראה'}
                        </button>
                        {errors.password && <p className={styles.error}>{errors.password.message}</p>}
                    </div>

                    <div className={styles.inputContainer}>
                        <input
                            {...register('confirmPassword')}
                            type={showPassword ? 'text' : 'password'}
                            className={styles.input}
                            placeholder="אשר סיסמא"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className={styles.eyeButton}
                        >
                            {showPassword ? 'הסתר' : 'הראה'}
                        </button>
                        {errors.confirmPassword && <p className={styles.error}>{errors.confirmPassword.message}</p>}
                    </div>

                    <button type="submit" className={styles.submitButton}>
                        עדכן סיסמא
                    </button>
                </form>
            </div>
        </RequireAuth>
    );
};

export default ResetPassword;
