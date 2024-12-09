"use client";
import React, { useEffect, useState, useMemo } from "react";
import { Box, IconButton, Button, Dialog, DialogContent } from "@mui/material";
import useUserStore from "../../../services/zustand/userZustand/userStor";
import { getSections } from "../../../services/bookService";
import { useParams } from "next/navigation";
import {
    Chat,
    ChapterSidebar,
    ShowParagraph,
    Loading,
    Rating,
    QuestionCard,
} from "../../../components";
import { Book, Paragraph } from "../../../types";
import numberToGematria from "../../../lib/clientHelpers/gematriaFunc";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { getBooks } from "../../../hooks/booksDetails";
import Styles from "./Study.module.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Confetti from "react-confetti";

interface Index {
    chapterId: number;
    paragraphId: number;
}

interface Paragraphs {
    section: Paragraph;
    chapterNumber: number;
}

const Study = () => {
    const { book_id } = useParams() as { book_id: string | string[] };
    const bookId = Array.isArray(book_id) ? book_id[0] : book_id;
    const { data: books, isLoading } = getBooks();
    const [index, setIndex] = useState<Index>({ chapterId: 1, paragraphId: 1 });
    const [paragraph, setParagraph] = useState<Paragraphs[]>([]);
    const [bookData, setBookData] = useState<Book | null>(null);
    const [showConfetti, setShowConfetti] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showQuiz, setShowQuiz] = useState(false); // מצב הפופאפ

    const user = useUserStore((state) => state.user);

    useEffect(() => {
        const fetchData = () => {
            if (user && bookId && Array.isArray(books)) {
                const userBook = user.books.find((book) => book.book_id === bookId);
                setIndex(
                    userBook
                        ? {
                              chapterId: userBook.chapter_id,
                              paragraphId: userBook.section_id,
                          }
                        : { chapterId: 1, paragraphId: 1 }
                );
            }
            if (books && Array.isArray(books)) {
                setBookData(books.find((book) => book._id === bookId) || null);
            }
        };
        fetchData();
    }, [bookId,books]);

    const fetchParagraphs = async (
        bookId: string,
        chapterId: number,
        paragraphId: number
    ) => {
        try {
            const paragraphs = await getSections(bookId, chapterId, paragraphId);
            if (!paragraphs || paragraphs.length === 0) {
                throw new Error("No paragraphs found");
            }
            setParagraph(paragraphs.sections);
        } catch (error) {
            console.error("Error fetching paragraphs:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!bookId) return;
        const { chapterId, paragraphId } = index;
        const paragraphExists = paragraph.some(
            (p) =>
                p.chapterNumber === chapterId && p.section.paragraphId === paragraphId
        );
        if (paragraphExists) return;

        fetchParagraphs(bookId, chapterId, paragraphId);
        
    }, [index]);

    const handleNavigation = (direction: "next" | "prev") => {
        console.log("index",index)
        console.log("bookData",bookData)
        if (!index || !bookData || !bookData.paragraphsCountPerChapter) return;
        const { chapterId, paragraphId } = index;

        let newChapterId = chapterId;
        let newParagraphId = paragraphId;

        if (direction === "next") {
            if (paragraphId < bookData.paragraphsCountPerChapter[chapterId - 1]) {
                newParagraphId = paragraphId + 1;
            } else if (chapterId < bookData.chapters_num) {
                newChapterId = chapterId + 1;
                newParagraphId = 1;
            }
        } else if (direction === "prev") {
            if (paragraphId > 1) {
                newParagraphId = paragraphId - 1;
            } else if (chapterId > 1) {
                newChapterId = chapterId - 1;
                newParagraphId =
                    bookData.paragraphsCountPerChapter[newChapterId - 1] || 1;
            }
        }

        setIndex({ chapterId: newChapterId, paragraphId: newParagraphId });
    };

    const isLastSection = useMemo(() => {
        return (
            index?.chapterId === bookData?.chapters_num &&
            index?.paragraphId ===
                bookData?.paragraphsCountPerChapter?.[bookData.chapters_num - 1]
        );
    }, [index, bookData]);

    const handleFinish = () => {
        setShowConfetti(true);
        toast.success("סיימת ללמוד! כל הכבוד 🎉", {
            position: "top-center",
            autoClose: 3000,
        });
        setTimeout(() => setShowConfetti(false), 5000);
    };

    const openQuiz = () => setShowQuiz(true); // פתיחת פופאפ
    const closeQuiz = () => setShowQuiz(false); // סגירת פופאפ

    return isLoading ? (
        <Loading />
    ) : (
        <Box display="flex" height="100vh">
            <ChapterSidebar
                selectedBookId={bookId}
                onSectionSelect={(chapterIndex, sectionIndex) =>
                    setIndex({ chapterId: chapterIndex, paragraphId: sectionIndex })
                }
            />
            <div className={Styles.container}>
                <IconButton
                    onClick={() => handleNavigation("prev")}
                    disabled={index?.chapterId === 1 && index?.paragraphId === 1}
                >
                    <ExpandLess />
                </IconButton>
                {paragraph.length === 0 ? (
                    <p>loading...</p>
                ) : (
                    <ShowParagraph
                        paragraph={paragraph.find(
                            (p) =>
                                p.chapterNumber === index?.chapterId &&
                                p.section.paragraphId === index?.paragraphId
                        )?.section!}
                        chapterTitle={`פרק ${numberToGematria(
                            index?.chapterId || 1
                        )} סעיף ${numberToGematria(index?.paragraphId || 1)}`}
                    />
                )}
                <IconButton
                    onClick={() => handleNavigation("next")}
                    disabled={isLastSection}
                >
                    <ExpandMore />
                </IconButton>
                <Button
                    onClick={openQuiz}
                    variant="contained"
                    color="primary"
                    className={Styles.quizButton}
                >
                    בחן את עצמך
                </Button>
                <Dialog open={showQuiz} onClose={closeQuiz}>
                    <DialogContent>
                        {paragraph && index && paragraph.find(
                                    (p) =>
                                        p.chapterNumber === index?.chapterId &&
                                        p.section.paragraphId === index?.paragraphId
                                )&&(
                            <QuestionCard
                                p={paragraph.find(
                                    (p) =>
                                        p.chapterNumber === index?.chapterId &&
                                        p.section.paragraphId === index?.paragraphId
                                )!.section}
                                bookId={bookId}
                                setParagraph={setParagraph}
                                chapterId={paragraph[0].chapterNumber}
                            />
                        )}
                    </DialogContent>
                </Dialog>
                {isLastSection && (
                    <Button
                        onClick={handleFinish}
                        variant="contained"
                        color="primary"
                        className={Styles.finishButton}
                    >
                        סיימתי ללמוד
                    </Button>
                )}
            </div>
            <Chat bookId={bookId} />
            <ToastContainer />
            {showConfetti && <Confetti />}
        </Box>
    );
};

export default Study;
