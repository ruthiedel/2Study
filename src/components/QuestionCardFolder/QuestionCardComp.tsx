'use client';
import React, { useEffect, useState } from "react";
import { Paragraph } from '../../types';
import { generateQuestionAndAnswer } from '../../services/questionService';
import { updateBookQuestionService } from "../../services/bookService";
import styles from './questionCard.module.css';
import {Loading} from '../index';

interface Paragraphs {
    section: Paragraph;
    chapterNumber: number;
}

const QuestionCardComp = (props: { p: Paragraph, bookId: string, chapterId: number, setParagraph: React.Dispatch<React.SetStateAction<Paragraphs[]>> }) => {
    const [isQuestionOpen, setIsQuestionOpen] = useState(true);
    const [isAnswerOpen, setIsAnswerOpen] = useState(false);
    const [idxQuestion, setIdxQuestion] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchQuestionAndAnswer = async () => {
            setLoading(true);

            if (props.p.questions.length < idxQuestion + 1) {
                try {
                    const { question, answer } = await generateQuestionAndAnswer(props.p.text,props.p.questions);

                    await updateBookQuestionService({
                        bookId: props.bookId,
                        chapterId: String(props.chapterId),
                        paragraphId: String(props.p.paragraphId),
                        question,
                        answer,
                    });

                    props.setParagraph((prev) =>
                        prev.map((paragraph) => {
                            if (paragraph.section._id === props.p._id) {
                                return {
                                    ...paragraph,
                                    section: {
                                        ...paragraph.section,
                                        questions: [...paragraph.section.questions, { question, answer }],
                                    },
                                };
                            }
                            return paragraph;
                        })
                    );
                } catch (error) {
                    console.error("Failed to update the book with the new question and answer:", error);
                }
            }
            setLoading(false);
        };

        fetchQuestionAndAnswer();
    }, [idxQuestion]);

    const handleChangeQuestion = () => {
        if (idxQuestion < 4) {
            setIdxQuestion((prev) => prev + 1);
            setIsAnswerOpen(false);
        }
    };

    if (!props.p || !props.p.questions) {
        return <p className={styles.error}>נתונים לא זמינים</p>;
    }

    return (
        <>
            {props.p.questions.length > 0 ? (
                <div className={`${styles.card} ${loading ? styles.loading : ""}`}>
                    <div className={styles.leftPanel}>
                        <img src="/pictures/question.jpg" alt="Question Icon" className={styles.image} />
                        {idxQuestion < 4 ? (
                            <button className={styles.changeButton} onClick={handleChangeQuestion}>
                                שנה שאלה
                            </button>
                        ) : (
                            <p className={styles.error}>לא ניתן ליצור שאלה נוספת. יש כבר 5 שאלות.</p>
                        )}
                    </div>

                    <div className={styles.rightPanel}>
                        <div
                            className={styles.toggle}
                            onClick={() => setIsQuestionOpen(!isQuestionOpen)}
                        >
                            <span className={styles.toggleText}>{isQuestionOpen? '▲':'▼'}שאלה לתרגול: </span>
                        </div>
                        {isQuestionOpen && props.p.questions[idxQuestion] && (
                            <div className={styles.text}>{props.p.questions[idxQuestion].question}</div>
                        )}

                        <div
                            className={styles.toggle}
                            onClick={() => setIsAnswerOpen(!isAnswerOpen)}
                        >
                            <span className={styles.toggleText}>{isAnswerOpen? '▲':'▼'}חשוף את התשובה: </span>
                        </div>
                        {isAnswerOpen && props.p.questions[idxQuestion] && (
                            <div className={styles.text}>{props.p.questions[idxQuestion].answer}</div>
                        )}
                    </div>
                </div>
            ) : (
                <Loading />
            )}
        </>
    );
};

export default QuestionCardComp;
