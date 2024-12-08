'use client';
import React, { useEffect, useState } from "react";
import { Box, TextField, Button, IconButton, Typography } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { Paragraph } from '../../types';
import { generateQuestionAndAnswer } from '../../services/questionService';
import {  getBookById } from '../../hooks/booksDetails';
import { updateBook, updateBookQuestionService } from "../../services/bookService";

interface Paragraphs {
    section: Paragraph;
    chapterNumber: number;
}

const QuestionCardComp = (props: { p: Paragraph, bookId: string, chapterId: number ,setParagraph: React.Dispatch<React.SetStateAction<Paragraphs[]>>
}) => {
    const [isQuestionOpen, setIsQuestionOpen] = useState(true);
    const [isAnswerOpen, setIsAnswerOpen] = useState(false);
    const [idxQuestion, setIdxQuestion] = useState(0);
    const [errorMessage, setErrorMessage] = useState(false);
    const book = getBookById(props.bookId);

    useEffect(() => {
        const fetchQuestionAndAnswer = async () => {
          if (props.p.questions.length === 0) {
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
                const updatedParagraphs = prev.map((paragraph) =>
                  paragraph.section._id === props.p._id
                    ? { ...paragraph, questions: [...paragraph.section.questions, { question, answer }] }
                    : paragraph
                );
      
                return { ...prev, paragraphs: updatedParagraphs };
              });
            } catch (error) {
              console.error("Failed to update the book with the new question and answer:", error);
            }
          }
        };
      
        fetchQuestionAndAnswer();
      }, []);
      

    useEffect(() => {
        const fetchQuestionAndAnswer = async () => {
            if (props.p.questions.length < 6) {
                const { question, answer } = await generateQuestionAndAnswer(props.p.text);
                const updatedParagraph = { ...props.p, questions: [...props.p.questions, { question, answer }] };
                props.setParagraph((prev: Paragraphs[]) => {
                    const updatedParagraphs = prev.map(paragraph =>
                        paragraph.section._id === props.p._id 
                            ? { ...paragraph, section: { ...props.p, questions: [...props.p.questions] } } 
                            : paragraph
                    );
                    return updatedParagraphs; 
                });
                
                if (book) {
                    const updatedChapters = book.chapters?.map(chapter => {
                        if (chapter.chapterId === props.chapterId) {
                            const updatedParagraphs = chapter.paragraphs.map(paragraph => 
                                paragraph._id === props.p._id ? updatedParagraph : paragraph
                            );
                            return { ...chapter, paragraphs: updatedParagraphs };
                        }
                        return chapter;
                    });

                    try {
                        await updateBook({
                            id: book._id!,
                            updatedData: {
                                chapters: updatedChapters,
                            },
                        });
                        console.log("שאלה:", question, "תשובה:", answer);
                    } catch (error) {
                        console.error("שגיאה בעדכון הפסקה:", error);
                    }
                }
            } else {
                setErrorMessage(true);
            }
        };

        fetchQuestionAndAnswer();
    }, [idxQuestion]);

    return (
        <>
            {props.p&& props.p.questions.length > 0 && (
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
                        {!errorMessage ? (
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: "#f0a500",
                                    color: "black",
                                    "&:hover": { backgroundColor: "#ffa726" },
                                }}
                                onClick={() => setIdxQuestion(idxQuestion + 1)}
                            >
                                שנה שאלה
                            </Button>
                        ) : (
                            <Typography variant="body1" color="error">
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
                                <Typography sx={{ fontWeight: "bold", fontSize: "1rem", flex: 1, color: 'black', backgroundColor: 'white' }}>
                                    שאלה לתרגול:
                                </Typography>
                            </div>
                            {isQuestionOpen && props.p && (
                                <TextField
                                    fullWidth
                                    value={props.p.questions[idxQuestion].question}
                                    InputProps={{
                                        readOnly: true,
                                        style: { backgroundColor: "white", borderRadius: "5px" },
                                    }}
                                    variant="outlined"
                                    sx={{ mt: 0 }}
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
                            {isAnswerOpen  && (
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
            )}
        </>
    );
};

export default QuestionCardComp;
