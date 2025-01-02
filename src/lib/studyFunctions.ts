import { Book, User, UserBook } from "../types";
import { errorAlert, successAlert } from "./clientHelpers/sweet-alerts";

interface Index {
    chapterId: number;
    paragraphId: number;
}


export const getCurrentUserBook = (user: User | null, bookId: string) => {
    let selectedBook: UserBook | undefined = undefined;

    for (const book of user?.books || []) {
        if (book.book_id === bookId) {
            if (book.status) {
                selectedBook = book;
                break;
            } else if (!selectedBook) { selectedBook = book; }
        }
    }
    return selectedBook;
}

export const handleNavigation = (direction: "next" | "prev", index: Index, bookData: Book | null, handleChangeIndex: (chapterId: number, paragraphId: number) => void) => {
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

export const handleStartAgain = async (user: User | null, bookData: Book | null, bookId: string, updateUserZustand: (userId: string, updatedUser: User) => void, handleChangeIndex: (chapterId: number, paragraphId: number) => void) => {
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
        updateUserZustand(user._id || "", updatedUserData);
        successAlert("מעולה!", "הספר נוסף בהצלחה לרשימת הספרים שלך 🎉")
        handleChangeIndex(1, 1);
    } catch (error) {
        console.error("שגיאה בהוספת הספר:", error);
        errorAlert("לא הצלחנו להוסיף את הספר. נסה שוב מאוחר יותר.");
    }
};
