import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { sendMail } from '@/services/mailService';
import { Mail } from '@/types';
import logo from "@/pictures/צילום מסך 2024-11-24 141224 (1).png";
import Image from "next/image";
import styles from './ContactForm.module.css';

const contactSchema = z.object({
    name: z.string().min(1, 'שדה חובה'),
    email: z.string().email('כתובת מייל לא תקינה').min(1, 'שדה חובה'),
    message: z.string().min(1, 'שדה חובה'),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const ContactForm: React.FC = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ContactFormValues>({
        resolver: zodResolver(contactSchema),
    });

    const onSubmit = async (data: ContactFormValues) => {
        try {
            const mail: Mail = {
                name: data.name,
                email: data.email,
                message: data.message,
            };


            const response = await sendMail(mail);

            reset();


            alert('המייל נשלח בהצלחה!');
        } catch (error) {

            console.error('Error sending email:', error);
            alert('הייתה שגיאה בשליחת המייל, נסה שוב מאוחר יותר.');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <h2 className={styles.heading}>ליצירת קשר:</h2>
            <div className={styles.fieldsContainer}>
                <Image
                    src={logo}
                    alt="logo"
                    className={styles.logo}
                />
                <div className={styles.field}>
                    <input
                        {...register('name')}
                        placeholder="שם מלא"
                        className={styles.input}
                        disabled={isSubmitting}
                    />
                    {errors.name && <p className={styles.error}>{errors.name.message}</p>}
                </div>
                <div className={styles.field}>
                    <input
                        {...register('email')}
                        placeholder="מייל"
                        className={styles.input}
                        disabled={isSubmitting}
                    />
                    {errors.email && <p className={styles.error}>{errors.email.message}</p>}
                </div>
                <div className={styles.field}>
                    <input
                        {...register('message')}
                        placeholder="תוכן הפנייה"
                        className={styles.input}
                        disabled={isSubmitting}
                    />
                    {errors.message && <p className={styles.error}>{errors.message.message}</p>}
                </div>
            </div>
            <button type="submit" className={styles.button} disabled={isSubmitting}>
                {isSubmitting ? 'שליחה...' : 'שלח'}
            </button>
        </form>
    );
};

export default ContactForm;
