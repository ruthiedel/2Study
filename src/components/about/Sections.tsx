
import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import styles from "../../../src/app/home/homePage.module.css";

type SectionProps = {
    section: {
        title: string;
        description: string;
        animateUrl: string;
        scriptUrl: string;
    };
    isEven: boolean;
};

export const Section: React.FC<SectionProps> = ({ section, isEven }) => {
    return (
        <div className={styles.sectionContainer}>
            {isEven ? (
                <>
                    <div>
                        <script src={section.scriptUrl} type="module"></script>
                        <DotLottieReact src={section.animateUrl} autoplay loop />
                    </div>
                    <div>
                        <h1 className={styles.heroTitle}>{section.title}</h1>
                        <div className={styles.line}></div>
                        <p className={styles.heroDescription}>{section.description}</p>
                    </div>
                </>
            ) : (
                <>
                    <div>
                        <h1 className={styles.heroTitle}>{section.title}</h1>
                        <div className={styles.line}></div>
                        <p className={styles.heroDescription}>{section.description}</p>
                    </div>
                    <div>
                        <script src={section.scriptUrl} type="module"></script>
                        <DotLottieReact src={section.animateUrl} autoplay loop />
                    </div>
                </>
            )}
        </div>
    );
};

type BottomSectionProps = {
    section: {
        imageUrl: string;
        title: string;
        content: string;
    };
};

export const BottomSection: React.FC<BottomSectionProps> = ({ section }) => {
    return (
        <div className={styles.bottomFeature}>
            <div>
                <img src={section.imageUrl} alt={section.title} />
            </div>
            <h1><strong>{section.title}</strong></h1>
            <p>{section.content}</p>
        </div>
    );
};
