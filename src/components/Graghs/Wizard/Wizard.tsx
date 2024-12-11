import React, { useState } from "react";
import styles from "./Wizard.module.css";

interface WizardProps {
    steps: React.ReactNode[];
}

const Wizard: React.FC<WizardProps> = ({ steps }) => {
    const [currentStep, setCurrentStep] = useState(0);

    const nextStep = () => {
        setCurrentStep((prev) => (prev + 1) % steps.length); 
    };

    const prevStep = () => {
        setCurrentStep((prev) => (prev - 1 + steps.length) % steps.length); 
    };

    return (
        <div className={styles.wizard}>
            <div className={styles.container}>
                <button onClick={prevStep} className={`${styles.arrow} ${styles.leftArrow}`}>
                    ▶
                </button>

                <div className={styles.content}>{steps[currentStep]}</div>
                <button onClick={nextStep} className={`${styles.arrow} ${styles.rightArrow}`}>
                    ◀
                </button>
            </div>
            <div className={styles.dots}>
                {steps.map((_, index) => (
                    <span
                        key={index}
                        className={`${styles.dot} ${index === currentStep ? styles.activeDot : ""}`}
                    ></span>
                ))}
            </div>
        </div>
    );
};

export default Wizard;
