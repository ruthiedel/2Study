"use client";
import React, { useEffect, useState, useMemo } from "react";
import { Box, IconButton, Button, Dialog } from "@mui/material";
import useUserStore from "../../../services/zustand/userZustand/userStor";
import { getSections } from "../../../services/bookService";
import { useParams } from "next/navigation";
import {
    Chat,
    MarkButton,
    ChapterSidebar,
    ShowParagraph,
    Loading,
    Rating,
    QuestionCard,
} from "../../../components";
import { Book, Paragraph, UserBook } from "../../../types";
import numberToGematria from "../../../lib/clientHelpers/gematriaFunc";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { getBooks } from "../../../hooks/booksDetails";
import Styles from "./Study.module.css";
import Confetti from "react-confetti";
import RequireAuth from "../../../layout/RequireAuth";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import { useRouter } from "next/navigation";

interface Index {
    chapterId: number;
    paragraphId: number;
}

interface Paragraphs {
    section: Paragraph;
    chapterNumber: number;
}

const Study = () => {
    const router = useRouter();
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
    const user = useUserStore((state) => state.user);
    const updateUserZustand = useUserStore((state) => state.updateUserZustand);

    const currentUserBook: UserBook | undefined = useMemo(() => {
        let selectedBook: UserBook | undefined = undefined;

        for (const book of user?.books || []) {

            if (book.book_id === bookId) {
                if (book.status) {
                    selectedBook = book;
                    break;
                } else if (!selectedBook) {
                    selectedBook = book;
                }
            }
        }
        return selectedBook;
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
                    Swal.fire({
                        title: "שים לב",
                        text: "הפרק הבא עדיין לא נטען",
                        icon: 'info',
                        confirmButtonText: "OK",
                        timer: 3000,
                    });
                }
                setParagraph(paragraphs.sections);
            } catch (error) {
                console.error("Error fetching paragraphs:", error);
            }
        }
    };

    const isCurrentSectionMarked = () => {
        if (!currentUserBook) { return false; }

        return (
            currentUserBook.chapter_id === index.chapterId &&
            currentUserBook.section_id === index.paragraphId
        );
    };

    const handleNavigation = (direction: "next" | "prev") => {
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
        handleChangeIndex(newChapterId, newParagraphId);
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

        Swal.fire({
            title: "מעולה!",
            text: "סיימת ללמוד! כל הכבוד 🎉",
            icon: "success",
            timer: 3000,
        })
        setTimeout(() => setShowConfetti(false), 5000);
    };

    const handleStartAgain = async () => {
        try {
            if (!user || !bookData) return;

            const newUserBook: UserBook = {
                book_id: bookId,
                book_name: bookData.name,
                chapter_id: 1,
                section_id: 1,
                rate: 0,
                status: true,
            };

            const updatedUserData = {
                ...user,
                books: [...user.books, newUserBook],
            };

            await updateUserZustand(user._id || "", updatedUserData);

            Swal.fire({
                title: "מעולה!",
                text: "הספר נוסף בהצלחה לרשימת הספרים שלך 🎉",
                icon: "success",
                timer: 3000,
            });

            handleChangeIndex(1,1);
        } catch (error) {
            console.error("שגיאה בהוספת הספר:", error);
            Swal.fire({
                title: "שגיאה",
                text: "לא הצלחנו להוסיף את הספר. נסה שוב מאוחר יותר.",
                icon: "error",
            });
        }
    };


    const openQuiz = () => setShowQuiz(true);
    const closeQuiz = () => setShowQuiz(false);

    const openRating = () => setIsShowRating(true);
    const closeRating = () => setIsShowRating(false);

    if (isBookInvalid) {
        return (
            <div className={Styles.invalidBookContainer}>
                <p>הספר שבחרת לא קיים ברשימת הספרים שלך.</p>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => (router.push('/bookCatalog'))}
                >
                    חזור לקטלוג הספרים
                </Button>
            </div>
        );
    }

    return isLoading ? (
        <Loading />
    ) : (
        <RequireAuth>
            <Box display="flex" height="100vh">
                <ChapterSidebar
                    selectedBookId={bookId}
                    onSectionSelect={(chapterIndex, sectionIndex) => {
                        handleChangeIndex(chapterIndex, sectionIndex);
                    }}
                />
                <div className={Styles.container}>
                    <IconButton
                        onClick={() => handleNavigation("prev")}
                        disabled={index?.chapterId === 1 && index?.paragraphId === 1}
                    >
                        <ExpandLess />
                    </IconButton>
                    <MarkButton
                        bookId={bookId}
                        chapterId={index.chapterId}
                        paragraphId={index.paragraphId}
                        isMarked={isCurrentSectionMarked()}
                    />
                    {paragraph.length === 0 ? (
                        <p>אין טקסט להצגה כרגע</p>
                    ) : (
                        <ShowParagraph
                            paragraph={
                                paragraph.find(
                                    (p) =>
                                        p.chapterNumber === index?.chapterId &&
                                        p.section.paragraphId === index?.paragraphId
                                )?.section!
                            }
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
                    <button onClick={openQuiz} className={Styles.quizButton}>
                        בחן את עצמך
                    </button>
                    <Dialog open={showQuiz} onClose={closeQuiz}>
                        {paragraph &&
                            index &&
                            paragraph.find(
                                (p) =>
                                    p.chapterNumber === index?.chapterId &&
                                    p.section.paragraphId === index?.paragraphId
                            ) ? (
                            <QuestionCard
                                p={
                                    paragraph.find(
                                        (p) =>
                                            p.chapterNumber === index?.chapterId &&
                                            p.section.paragraphId === index?.paragraphId
                                    )!.section
                                }
                                bookId={bookId}
                                setParagraph={setParagraph}
                                chapterId={paragraph[0].chapterNumber}
                            />
                        ) : (
                            <Loading />
                        )}
                    </Dialog>
                    <Dialog open={isShowRating} onClose={closeRating}>
                        <Rating bookId={bookId} onClose={closeRating} />
                    </Dialog>
                    {isLastSection && currentUserBook?.status === false ? (
                        <Button
                            onClick={() => { handleStartAgain() }}
                            variant="contained"
                            color="secondary"
                            className={Styles.finishButton}
                        >
                            התחל את הספר מחדש
                        </Button>
                    ) : isLastSection ? (
                        <Button
                            onClick={handleFinish}
                            variant="contained"
                            color="primary"
                            className={Styles.finishButton}
                        >
                            סיימתי ללמוד
                        </Button>
                    ) : null}

                </div>
                <Chat bookId={bookId} bookName={bookData?.name || ""} />
                {showConfetti && <Confetti />}
            </Box>
        </RequireAuth>
    );
};

export default Study;

