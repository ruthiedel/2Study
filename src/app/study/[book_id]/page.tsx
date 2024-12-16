"use client";
import React, { useEffect, useState, useMemo } from "react";
import { Box, IconButton, Button, Dialog, DialogContent } from "@mui/material";
import useUserStore from "../../../services/zustand/userZustand/userStor";
import { getSections } from "../../../services/bookService";
import { useParams } from "next/navigation";
import {
    Chat, MarkButton,
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
    const [showQuiz, setShowQuiz] = useState(false);
    const [isShowRating, setIsShowRating] = useState(false);
    const user = useUserStore((state) => state.user);
    const updateUserZustand = useUserStore((state) => state.updateUserZustand);
    useEffect(() => {
        if (!user || !books || !Array.isArray(books)) return;
    
        const userBook = user.books.find((book) => book.book_id === bookId);
        if (userBook) {
            setIndex({
                chapterId: userBook.chapter_id,
                paragraphId: userBook.section_id,
            });
        } else {
            setIndex({ chapterId: 1, paragraphId: 1 });
        }
    
        const currentBook = books.find((book) => book._id === bookId);
        setBookData(currentBook || null);
    }, [bookId, books, user]);

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
        }
    };

    useEffect(() => {
        if (!bookId || !index.chapterId || !index.paragraphId) return;
    
        const paragraphExists = paragraph.some(
            (p) =>
                p.chapterNumber === index.chapterId &&
                p.section.paragraphId === index.paragraphId
        );
    
        if (!paragraphExists) {
            fetchParagraphs(bookId, index.chapterId, index.paragraphId);
        }
    }, [bookId, index, paragraph]);
    
    const isCurrentSectionMarked = () => {
        return user?.books.some(book => book.book_id === bookId 
                    && book.chapter_id === index.chapterId 
                    && book.section_id === index.paragraphId
                );
    };

    const handleNavigation = (direction: "next" | "prev") => {

        if (!index || !bookData || !bookData.paragraphsCountPerChapter) return;
        const { chapterId, paragraphId } = index;
        let newChapterId = chapterId;
        let newParagraphId = paragraphId;

        if (direction === "next") {
            

                const isSectionMarked = user?.books.some(
                    (book) =>
                      book.book_id === bookId && book.rate < 1
                  );
              
                  if (isSectionMarked) {
                    openRating();
                  }
            
          
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
        if (user) {
            const updatedUser = {
                ...user,
                books: user!.books.map((book) =>
                  book.book_id === bookId ? { ...book, status: false } : book
                ),
              };
              updateUserZustand(user!._id!, updatedUser);     
        }
        
        toast.success("סיימת ללמוד! כל הכבוד 🎉", {
            position: "top-center",
            autoClose: 3000,
        });
        setTimeout(() => setShowConfetti(false), 5000);
    };

    const openQuiz = () => setShowQuiz(true);
    const closeQuiz = () => setShowQuiz(false); 

    const openRating = () => setIsShowRating(true);
    const closeRating = () => setIsShowRating(false); 

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
                <MarkButton bookId={bookId} chapterId={index.chapterId} paragraphId={index.paragraphId} isMarked={isCurrentSectionMarked()} />
                {paragraph.length === 0 ? (
                    <p>אין טקסט להצגה כרגע</p>
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
                <button
                    onClick={openQuiz}
                    className={Styles.quizButton}
                >
                    בחן את עצמך
                </button>
                <Dialog open={showQuiz} onClose={closeQuiz}>
                        {paragraph && index && paragraph.find(
                                    (p) =>
                                        p.chapterNumber === index?.chapterId &&
                                        p.section.paragraphId === index?.paragraphId
                                )?(
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
                        ):<Loading/>}
                </Dialog>
                <Dialog open={isShowRating} onClose={closeRating}>
                        <Rating bookId={bookId} onClose={closeRating}/>
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
