'use client';
import React, { useEffect, useState } from "react";
import { Box, TextField, Button, IconButton, Typography } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { Paragraph } from '../../types';
import { generateQuestionAndAnswer } from '../../services/questionService';
const QuestionCard = (props:{p:Paragraph}) => {
    const [isQuestionOpen, setIsQuestionOpen] = useState(true); 
    const [isAnswerOpen, setIsAnswerOpen] = useState(false); 
    const [idxQuestion,setIdxQuestion] = useState(0);
   

    useEffect(() => {
        const fetchQuestionAndAnswer = async () => {
            if (props.p.questions.length === 0) {
                const { question, answer } = await generateQuestionAndAnswer(props.p.text);
                // עדכון הסטייט או הטיפול בנתונים
                console.log("שאלה:", question, "תשובה:", answer);
            }
        };
    
        fetchQuestionAndAnswer();
    }, []);
    useEffect(() => {
        const fetchQuestionAndAnswer = async () => {
            if (props.p.questions.length <idxQuestion) {
                const { question, answer } = await generateQuestionAndAnswer(props.p.text);
                // עדכון הסטייט או הטיפול בנתונים
                console.log("שאלה:", question, "תשובה:", answer);
            }
        };
    
        fetchQuestionAndAnswer();
    }, [idxQuestion]);
    return (
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

                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: "#f0a500",
                        color: "black",
                        "&:hover": { backgroundColor: "#ffa726" },
                    }}
                    onClick={()=>{setIdxQuestion(idxQuestion+1)}}
                >
                    שנה שאלה
                </Button>
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
                        <Typography sx={{ fontWeight: "bold", fontSize: "1rem", flex: 1, color: 'black', backgroundColor: 'white' }}>
                            שאלה לתרגול:
                        </Typography>
                    </div>
                    {isQuestionOpen && (
                        <TextField
                            fullWidth
                            value={props.p.questions[idxQuestion].question}
                            InputProps={{
                                readOnly: true,
                                style: { backgroundColor: "white", borderRadius: "5px" },
                            }}
                            variant="outlined"
                            sx={{ mt: 0}}
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
                        <Typography sx={{ fontWeight: "bold", fontSize: "1rem", flex: 1, color: 'black', backgroundColor: 'white' }}>
                            חשוף את התשובה:
                        </Typography>
                    </div>
                    {isAnswerOpen && (
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
                        />
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default QuestionCard;
