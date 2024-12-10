import { Book, UserBook } from "../../types";

export const getBookCategoriesCount = (books: Book[]): Record<string, number> => {
  return books.reduce((acc, book) => {
    const { type } = book.category;
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
};


export const getBooksProgress = (books: UserBook[], totalChaptersPerBook: Record<string, number>): Record<string, number> => {
  const progress = {
    completed: 0,
    inProgress: 0,
    notStarted: 0,
  };

  books.forEach((userBook) => {
    const totalChapters = totalChaptersPerBook[userBook.book_id] || 0;

    if (userBook.chapter_id) {
      const currentChapterIndex = totalChapters
        ? totalChaptersPerBook[userBook.book_id] - 1
        : 0;
      if (currentChapterIndex === totalChapters - 1) {
        progress.completed++;
      } else {
        progress.inProgress++;
      }
    } else {
      progress.notStarted++;
    }
  });

  return progress;
};
