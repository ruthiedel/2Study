import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { updatePassword } from '../../../services/mailService';
import styles from './SendPasswordResetButton.module.css';

interface SendPasswordResetButtonProps {
    email: string;
}

const PasswordResetButton: React.FC<SendPasswordResetButtonProps> = ({ email }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleSendPasswordReset = async () => {
        setIsLoading(true);
        try {
            await updatePassword(email);
            await Swal.fire({
                icon: 'success',
                title: 'מייל נשלח בהצלחה!',
                text: 'שלחנו אליך מייל עם קישור לעדכון הסיסמה. אנא בדוק את תיבת הדואר שלך.',
                confirmButtonText: 'אישור',
            });
        } catch (error) {
            await Swal.fire({
                icon: 'error',
                title: 'שליחת המייל נכשלה',
                text: 'אם הבעיה נמשכת, אנא פנה להנהלת האתר במייל: support@example.com',
                confirmButtonText: 'אישור',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <button
                onClick={handleSendPasswordReset}
                className={`${styles.button} ${isLoading ? styles.loading : ''}`}
                disabled={isLoading}
            >
                {isLoading ? 'שולח...' : 'לעדכון סיסמא'}
            </button>
        </div>
    );
};

export default PasswordResetButton;
