'use client';

import { useState, useEffect } from 'react';
import { FaTrashAlt, FaCheckSquare, FaRegSquare } from 'react-icons/fa';
import styles from './Goals.module.css';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

interface Goal {
    text: string;
    completed: boolean;
}

const GoalSetting = () => {
    const [goal, setGoal] = useState('');
    const [goals, setGoals] = useState<Goal[]>([]);

    useEffect(() => {
        const storedGoals = JSON.parse(localStorage.getItem('userGoals') || '[]');
        if (storedGoals) {
            setGoals(storedGoals);
        }
    }, []);

    const handleGoalSubmit = () => {
        if (goal.trim()) {
            const updatedGoals: Goal[] = [...goals, { text: goal, completed: false }];
            localStorage.setItem('userGoals', JSON.stringify(updatedGoals));
            setGoals(updatedGoals);
            setGoal('');
        }
    };

    const toggleGoalCompletion = (index: number) => {
        const updatedGoals = goals.map((goal, i) =>
            i === index ? { ...goal, completed: !goal.completed } : goal
        );
        localStorage.setItem('userGoals', JSON.stringify(updatedGoals));
        setGoals(updatedGoals);
    };

    const handleGoalDelete = (index: number) => {
        const updatedGoals = goals.filter((_, i) => i !== index);
        localStorage.setItem('userGoals', JSON.stringify(updatedGoals));
        setGoals(updatedGoals);
    };

    return (
        <div className={styles.columns}>
            <div className={styles.imageColumn}>
                <script src="https://unpkg.com/@lottiefiles/dotlottie-wc@0.3.0/dist/dotlottie-wc.js" type="module"></script>
                <DotLottieReact
                    src="https://lottie.host/5899d349-5930-40a3-9d61-e934282355a6/y1b9FELP0W.lottie"
                    autoplay
                    loop
                    className={styles.animate}
                ></DotLottieReact>
            </div>
            <div className={styles.contentColumn}>
                <h2 className={styles.title}>המטרות שלי:</h2>
                <div className={styles.innerColumns}>
                    <div >
                        <ul className={styles.goalList}>
                            {goals.length > 0 ? (
                                goals.map((goal, index) => (
                                    <li
                                        key={index}
                                        className={`${styles.goalItem} ${goal.completed ? styles.completed : ''}`}
                                    >
                                        <button
                                            onClick={() => handleGoalDelete(index)}
                                            className={styles.deleteButton}
                                        >
                                            <FaTrashAlt />
                                        </button>
                                        <span
                                            onClick={() => toggleGoalCompletion(index)}
                                            className={styles.checkbox}
                                        >
                                            {goal.completed ? <FaCheckSquare /> : <FaRegSquare />}
                                        </span>
                                        <span className={styles.goalText}>{goal.text}</span>

                                    </li>
                                ))
                            ) : (
                                <h3 className={styles.noGoals}>אין לך עדיין מטרות.</h3>
                            )}
                        </ul>
                    </div>
                    <div className={styles.addGoalContainer}>
                        <input
                            type="text"
                            value={goal}
                            onChange={(e) => setGoal(e.target.value)}
                            placeholder="הוסף מטרה חדשה..."
                            className={styles.inputField}
                        />
                        <button onClick={handleGoalSubmit} className={styles.button}>הוסף</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GoalSetting;

