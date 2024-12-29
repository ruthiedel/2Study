import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { sendMail } from '@/services/mailService';
import logo from '../../../public/pictures/logo1.png';
import { Mail } from '../../types';
import Image from 'next/image';
import styles from './footer.module.css';
import Swal from "sweetalert2";
import Link from 'next/link';

const contactSchema = z.object({
    name: z.string().min(1, '*שדה חובה'),
    email: z.string().nonempty('*שדה חובה').email('*כתובת מייל לא תקינה'),
    message: z.string().min(1, '*שדה חובה'),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const Footer: React.FC = () => {
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
            await sendMail(mail);
            reset();
            Swal.fire({
                title: "תודה על פנייתך! 🙏",
                text: " נשמח לעזור ונחזור אליך בהקדם. 😊",
                icon: "success",
                timer: 3000,
                confirmButtonText: "נהדר",
            })
        } catch (error) {
            console.error('Error sending email:', error);
            Swal.fire({
                title: "הייתה שגיאה בשליחת המייל 😥",
                text: "אנא נסה שוב מאוחר יותר. ⚠️",
                icon: "error",
                timer: 3000,
                confirmButtonText: "סגור",
            })
        }
    };

    return (
        <div className={styles.footerContainer}>
            <div className={styles.column1}>
                <Image src={logo} alt="logo" className={styles.logo} />
            </div>
            <div className={styles.links}>
                <Link href="/home">דף הבית</Link>
                <Link href="/BooksLearning">ספרים בלמידה</Link>
                <Link href="/bookCatalog">קטלוג ספרים</Link>
                <Link href="/userDashboard">איזור אישי</Link>
            </div>
            <div className={styles.divider}></div>
            <div className={styles.column2}>
                <p>📧  מייל: 054racheli@gmail.com</p>
                <p>🌟 נשמח לשמוע מכם</p>
                <p>
                    🖋️השימוש באתר בכפוף ל
                    <a href="/termsOfService" target="_blank" rel="noopener noreferrer" style={{ color: "#007bff", textDecoration: "underline" }}>
                        תקנון
                    </a>
                </p>
                <p>© כל הזכויות שמורות</p>
            </div>
            <div className={styles.divider}></div>
            <form onSubmit={handleSubmit(onSubmit)} className={`${styles.column3} ${styles.form}`}>
                <h2 className={styles.heading}>נשמור על קשר</h2>
                <div className={styles.field}>
                    <input
                        {...register('name')}
                        placeholder="שם מלא "
                        className={styles.input}
                        disabled={isSubmitting}
                    />
                    {errors.name ? <p className={styles.error}>{errors.name.message}</p> : <p style={{ height: "20px" }}></p>}
                </div>
                <div className={styles.field}>
                    <input
                        {...register('email')}
                        placeholder="מייל"
                        className={styles.input}
                        disabled={isSubmitting}
                    />
                    {errors.email ? <p className={styles.error}>{errors.email.message}</p> : <p style={{ height: "20px" }}></p>}
                </div>
                <div className={styles.field}>
                    <input
                        {...register('message')}
                        placeholder="תוכן הפנייה"
                        className={styles.input}
                        disabled={isSubmitting}
                    />
                    {errors.message ? <p className={styles.error}>{errors.message.message}</p> : <p style={{ height: "20px" }}></p>}
                </div>
                <div className={styles.buttonContainer}>
                    <button type="submit" className={styles.button} disabled={isSubmitting}>
                        {isSubmitting ? 'שליחה...' : 'שלח'}
                    </button>
                </div>
            </form>
        </div>

    );
};

export default Footer;
