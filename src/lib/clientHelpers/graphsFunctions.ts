import { Book, UserBook } from "../../types";
import { getBooks } from '@/hooks/booksDetails';


export const getBookCategoriesCount = (books: Book[]): Record<string, number> => {
  const categoryCount: Record<string, number> = {};

  books.forEach((book) => {
      if (categoryCount[book.category.type]) {
        categoryCount[book.category.type]++;
      } else {
        categoryCount[book.category.type] = 1;
      }
    });


    books.forEach((book) => {
      if (categoryCount[book.category.subject]) {
        categoryCount[book.category.subject]++;
      } else {
        categoryCount[book.category.type] = 1;
      }
    });

  return categoryCount;
};


export function calculateLearningProgress(userBooks: UserBook[], books: Book[]): Record<string, number> {
  const progress: Record<string, number> = {};
if (books && Array.isArray(books)) {
  userBooks.forEach((userBook) => {
    const book = books.find((b) => b._id === userBook.book_id);

    if (!book || !book.paragraphsCountPerChapter) {
      progress[userBook.book_name] = 0;
      return;
    }
    const paragraphsPerChapter = book.paragraphsCountPerChapter;
    const completedParagraphs = paragraphsPerChapter
      .slice(0, userBook.chapter_id - 1)
      .reduce((sum: number, count: number) => sum + count, 0);
    const currentChapterParagraphs =
      userBook.section_id > 0 && userBook.chapter_id - 1 < paragraphsPerChapter.length
        ? userBook.section_id
        : 0;

    const totalLearnedParagraphs = completedParagraphs + currentChapterParagraphs;

    const total = book.paragraphs_num;
    const learningPercentage = (totalLearnedParagraphs / total) * 100;

    progress[userBook.book_name] = parseFloat(learningPercentage.toFixed(2));
  });
}
  return progress;
}


export function calculateBookRatings(
  userBooks: UserBook[],
  books: Book[]
): Record<string, { userRating: number; generalRating: number }> {
  const ratings: Record<string, { userRating: number; generalRating: number }> = {};

  userBooks.forEach((userBook) => {
    // חיפוש הספר הרלוונטי במערך הספרים הכללי
    const book = books.find((b) => b._id === userBook.book_id);

    if (book) {
      // קביעת דירוג משתמש ודירוג כללי
      const userRating = userBook.rate || 0; // אם אין דירוג משתמש, נחשב כ-0
      const generalRating = book.rating || 0; // אם אין דירוג כללי, נחשב כ-0

      // הוספת השם של הספר עם הדירוגים לתוך התוצאה
      ratings[book.name] = {
        userRating,
        generalRating,
      };
    }
  });

  return ratings;
}

