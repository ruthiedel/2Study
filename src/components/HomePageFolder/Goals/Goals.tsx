'use client'

import { useState, useEffect } from 'react';
import styles from './Goals.module.css';  // ייבוא הקובץ

const GoalSetting = () => {
    const [goal, setGoal] = useState('');
    const [goals, setGoals] = useState<string[]>([]);

    useEffect(() => {
        const storedGoals = JSON.parse(localStorage.getItem('userGoals') || '[]');
        if (storedGoals) {
            setGoals(storedGoals);
        }
    }, []);

    const handleGoalSubmit = () => {
        if (goal) {
            const updatedGoals: string[] = [...goals, goal];
            localStorage.setItem('userGoals', JSON.stringify(updatedGoals));
            setGoals(updatedGoals);
            setGoal('');
        }
    };

    const handleGoalDelete = (index: number) => {
        const updatedGoals = goals.filter((_, i) => i !== index);
        localStorage.setItem('userGoals', JSON.stringify(updatedGoals));
        setGoals(updatedGoals);
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>הגדר מטרות לימודיות</h2>
            <input
                type="text"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="הזן מטרה חדשה"
                className={styles.inputField}
            />
            <button onClick={handleGoalSubmit} className={styles.button}>שמור מטרה</button>
            {goals.length > 0 ?
                <div>
                    <h3 className={styles.subTitle}>המטרות שלך:</h3>
                    <ul className={styles.goalList}>
                        {goals.map((goal, index) => (
                            <li key={index} className={styles.goalItem}>
                                {goal}
                                <button onClick={() => handleGoalDelete(index)} className={styles.deleteButton}>מחק</button>
                            </li>
                        ))}
                    </ul>
                </div> : <h1>אין לך עדיין מטרות.</h1>}
        </div>
    );
};

export default GoalSetting;
