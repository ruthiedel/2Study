'use client';
import React, { useEffect, useState } from "react";
import { Box, TextField, Button, IconButton, Typography, CircularProgress } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { Paragraph } from '../../types';
import { generateQuestionAndAnswer } from '../../services/questionService';
import {updateBookQuestionService } from "../../services/bookService";



interface Paragraphs {
    section: Paragraph;
    chapterNumber: number;
}

const QuestionCard = (props: { p: Paragraph, bookId: string, chapterId: number ,setParagraph: React.Dispatch<React.SetStateAction<Paragraphs[]>> }) => {
    const [isQuestionOpen, setIsQuestionOpen] = useState(true);
    const [isAnswerOpen, setIsAnswerOpen] = useState(false);
    const [idxQuestion, setIdxQuestion] = useState(0);
    const [loading, setLoading] = useState(false); 

    useEffect(() => {
        const fetchQuestionAndAnswer = async () => {
            setLoading(true); 
            console.log("questions.length", props.p.questions.length);
            if (props.p.questions.length < idxQuestion + 1) {
                console.log("No questions");
                try {
                    const { question, answer } = await generateQuestionAndAnswer(props.p.text);

                    await updateBookQuestionService({
                        bookId: props.bookId,
                        chapterId: String(props.chapterId),
                        paragraphId: String(props.p.paragraphId),
                        question,
                        answer,
                    });

                    props.setParagraph((prev) => {
                        return prev.map((paragraph) => {
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
                        });
                    });

                } catch (error) {
                    console.error("Failed to update the book with the new question and answer:", error);
                }
            } 
            setLoading(false); // סיום טעינה
        };

        fetchQuestionAndAnswer();
    }, [idxQuestion]);

    const handleChangeQuestion = () => {
        if (idxQuestion < 4) {
            setIdxQuestion((prev) => prev + 1);
            setIsAnswerOpen(false);
        }
    }

    if (!props.p || !props.p.questions) {
        return <Typography>נתונים לא זמינים</Typography>;
    }

    return (
        <>
            {props.p.questions.length > 0 && (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        backgroundColor: "black",
                        color: "white",
                        borderRadius: "10px",
                        p: 2,
                        width: "600px",
                        position: "relative",
                        opacity: loading ? 0.5 : 1,
                        filter: loading ? "blur(3px)" : "none", 
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "space-between",
                            width: "150px",
                            padding: "10px",
                        }}
                    >
                        <Box
                            component="img"
                            src="/pictures/question.jpg"
                            alt="Question Icon"
                            sx={{
                                width: "100px",
                                height: "140px",
                                borderRadius: "10px",
                                marginBottom: "20px",
                            }}
                        />
                        {idxQuestion < 4 ? (
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: "#f0a500",
                                    color: "black",
                                    "&:hover": { backgroundColor: "#ffa726" },
                                }}
                                onClick={handleChangeQuestion}
                            >
                                שנה שאלה
                            </Button>
                        ) : (
                            <Typography variant="body1" color="error" component="div">
                                לא ניתן ליצור שאלה נוספת. יש כבר 5 שאלות.
                            </Typography>
                        )}
                    </Box>

                    <Box sx={{ flex: 1, paddingLeft: "20px" }}>
                        <Box sx={{ mb: 3 }}>
                            <div
                                onClick={() => setIsQuestionOpen(!isQuestionOpen)}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    cursor: "pointer",
                                    border: "1px solid white",
                                    borderRadius: "5px",
                                    padding: "10px",
                                    backgroundColor: 'white'
                                }}
                            >
                                <IconButton sx={{ color: "black", padding: 0 }}>
                                    {isQuestionOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                                </IconButton>
                                <Typography sx={{ fontWeight: "bold", fontSize: "1rem", flex: 1, color: 'black', backgroundColor: 'white' }} component="div">
                                    שאלה לתרגול:
                                </Typography>
                            </div>
                            {isQuestionOpen && props.p.questions[idxQuestion] && (
                                <TextField
                                    fullWidth
                                    value={props.p.questions[idxQuestion].question}
                                    InputProps={{
                                        readOnly: true,
                                        style: { backgroundColor: "white", borderRadius: "5px" },
                                    }}
                                    variant="outlined"
                                    sx={{ mt: 0 }}
                                    component="div"
                                />
                            )}
                        </Box>

                        <Box>
                            <div
                                onClick={() => setIsAnswerOpen(!isAnswerOpen)}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    cursor: "pointer",
                                    border: "1px solid white",
                                    borderRadius: "5px",
                                    padding: "10px",
                                    marginTop: "10px",
                                    backgroundColor: 'white'
                                }}
                            >
                                <IconButton sx={{ color: "black", padding: 0 }}>
                                    {isAnswerOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                                </IconButton>
                                <Typography sx={{ fontWeight: "bold", fontSize: "1rem", flex: 1, color: 'black', backgroundColor: 'white' }} component="div">
                                    חשוף את התשובה:
                                </Typography>
                            </div>
                            {isAnswerOpen && props.p && props.p.questions[idxQuestion] && (
                                <TextField
                                    fullWidth
                                    value={props.p.questions[idxQuestion].answer}
                                    InputProps={{
                                        readOnly: true,
                                        style: {
                                            backgroundColor: "white",
                                            borderRadius: "5px",
                                            transition: "width 0.3s ease",
                                            width: isAnswerOpen ? "100%" : "60%",
                                        },
                                    }}
                                    variant="outlined"
                                    component="div"
                                />
                            )}
                        </Box>
                    </Box>
                </Box>
            )}
        </>
    );
};

export default QuestionCard;
