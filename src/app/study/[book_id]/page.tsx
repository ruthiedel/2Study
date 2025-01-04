"use client";
import React, { useEffect, useState, useMemo } from "react";
import { Box, IconButton, Dialog } from "@mui/material";
import useUserStore from "../../../services/zustand/userZustand/userStor";
import { getSections } from "../../../services/bookService";
import { useParams } from "next/navigation";
import { Chat, MarkButton, ChapterSidebar, ShowParagraph, Loading, Rating, QuestionCard, NoBookFound } from "../../../components";
import { Book, Paragraph, UserBook } from "../../../types";
import numberToGematria from "../../../lib/clientHelpers/gematriaFunc";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { getBooks } from "../../../hooks/booksDetails";
import Styles from "./Study.module.css";
import Confetti from "react-confetti";
import RequireAuth from "../../../layout/RequireAuth";
import "sweetalert2/src/sweetalert2.scss";
import { infoAlert, finishAlert } from '../../../lib/clientHelpers/sweet-alerts'
import { getCurrentUserBook, handleNavigation, handleStartAgain } from "../../../lib/studyFunctions";

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
    const [index, setIndex] = useState<Index>({ chapterId: -1, paragraphId: -1 });
    const [paragraph, setParagraph] = useState<Paragraphs[]>([]);
    const [bookData, setBookData] = useState<Book | null>(null);
    const [showConfetti, setShowConfetti] = useState(false);
    const [showQuiz, setShowQuiz] = useState(false);
    const [isShowRating, setIsShowRating] = useState(false);
    const [isBookInvalid, setIsBookInvalid] = useState(false);
    const [isEmptyBook, setIsEmptyBook] = useState(false);
    const user = useUserStore((state) => state.user);
    const updateUserZustand = useUserStore((state) => state.updateUserZustand);

    const currentUserBook: UserBook | undefined = useMemo(() => {
        return getCurrentUserBook(user, bookId);
    }, [user, bookId]);

    useEffect(() => {
        if (!user || !books || !Array.isArray(books)) return;

        if (!user.books.find((book) => book.book_id === bookId)) {
            setIsBookInvalid(true);
            return;
        }

        if (index.chapterId === -1) {
            if (currentUserBook) {
                handleChangeIndex(currentUserBook!.chapter_id, currentUserBook.section_id);
            } else {
                handleChangeIndex(1, 1);
            }
        }
        const currentBook = books.find((book) => book._id === bookId);
        setBookData(currentBook || null);
    }, [books, user]);

    const fetchParagraphs = async (chapterId: number, paragraphId: number) => {
        if (paragraph.length === 0 || chapterId !== paragraph[0].chapterNumber) {
            try {
                const paragraphs = await getSections(bookId, chapterId, paragraphId);
                if (!paragraphs || paragraphs.length === 0) {
                    infoAlert()
                }
                setParagraph(paragraphs.sections);
                if (paragraphs.length === 0) {
                    setIsEmptyBook(true)
                }
            } catch (error) {
                console.error("Error fetching paragraphs:", error);
                setIsEmptyBook(true)

            }
        }
    };

    const handleChangeIndex = (chapterId: number, paragraphId: number) => {
        if (paragraphId === 1 && chapterId !== 1) {
            if (currentUserBook && currentUserBook.rate === 0) {
                openRating();
            }
        }
        setIndex({ chapterId, paragraphId });
        fetchParagraphs(chapterId, paragraphId);
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

        if (!bookData || !user || !currentUserBook) return;

        const lastChapterId = bookData.paragraphsCountPerChapter?.length || 1;
        const lastSectionId = bookData.paragraphsCountPerChapter?.[lastChapterId - 1] || 1;
        currentUserBook.chapter_id = lastChapterId;
        currentUserBook.section_id = lastSectionId;
        currentUserBook.status = false;
        const newBooks = [...user.books];
        newBooks[newBooks.indexOf(currentUserBook)] = currentUserBook;
        updateUserZustand(user!._id!, { ...user, books: newBooks });
        finishAlert();
        setTimeout(() => setShowConfetti(false), 5000);
    };

    const openQuiz = () => setShowQuiz(true);
    const closeQuiz = () => setShowQuiz(false);

    const openRating = () => setIsShowRating(true);
    const closeRating = () => setIsShowRating(false);

    if (isBookInvalid) { return <NoBookFound /> }

    return isLoading ? (
        <Loading />
    ) : (
        <RequireAuth>
            <Box display="flex" height="100vh">
                <ChapterSidebar selectedBookId={bookId} onSectionSelect={(chapterIndex, sectionIndex) => { handleChangeIndex(chapterIndex, sectionIndex);}}/>
                <div className={Styles.container}>
                    <IconButton onClick={() => handleNavigation("prev", index, bookData, handleChangeIndex)} disabled={index?.chapterId === 1 && index?.paragraphId === 1}>
                        <ExpandLess />
                    </IconButton>
                    <MarkButton bookId={bookId} chapterId={index.chapterId} paragraphId={index.paragraphId} isMarked={currentUserBook && currentUserBook.chapter_id === index.chapterId && currentUserBook.section_id === index.paragraphId} />
                    {paragraph.length === 0 ? (
                        isEmptyBook ? (
                            <p className={Styles.defaultText}>ספר זה הוא ספר ללא תוכן שנשמר לבדיקת האתר בלבד.<br /> אנא הכנס לספר מלא כמו מסילת ישרים או קיצור שולחן ערוך וכו'</p>
                        ) : (
                            <p>אין טקסט להצגה כרגע</p>
                        )) : (
                        <ShowParagraph
                            paragraph={ paragraph.find((p) => p.chapterNumber === index?.chapterId &&  p.section.paragraphId === index?.paragraphId )?.section! }
                            chapterTitle={`פרק ${numberToGematria(index?.chapterId || 1)} סעיף ${numberToGematria(index?.paragraphId || 1)}`}
                        />
                    )}
                    <IconButton onClick={() => handleNavigation("next", index, bookData, handleChangeIndex)} disabled={isLastSection}>
                        <ExpandMore />
                    </IconButton>

                    <div className={Styles.buttonContainer}>
                        <button onClick={openQuiz} className={Styles.quizButton}>בחן את עצמך </button>
                        {isLastSection && currentUserBook?.status === false ? (
                            <button className={Styles.quizButton} onClick={() => { handleStartAgain(user, bookData, bookId, updateUserZustand, handleChangeIndex) }}>התחל את הספר מחדש</button>
                        ) : isLastSection ? (
                            <button className={Styles.quizButton} onClick={handleFinish}> סיימתי ללמוד </button>
                        ) : null}
                    </div>

                    <Dialog open={showQuiz} onClose={closeQuiz}>
                        {paragraph && index && paragraph.find((p) => p.chapterNumber === index?.chapterId && p.section.paragraphId === index?.paragraphId
                        ) ? (
                            <QuestionCard p={paragraph.find((p) => p.chapterNumber === index?.chapterId && p.section.paragraphId === index?.paragraphId)!.section} bookId={bookId} setParagraph={setParagraph} chapterId={paragraph[0].chapterNumber} />
                        ) : (
                            <Loading />
                        )}
                    </Dialog>
                    <Dialog open={isShowRating} onClose={closeRating}>
                        <Rating bookId={bookId} onClose={closeRating} />
                    </Dialog>
                </div>
                <Chat bookId={bookId} bookName={bookData?.name || ""} />
                {showConfetti && <Confetti />}
            </Box>
        </RequireAuth>
    );
};

export default Study;
