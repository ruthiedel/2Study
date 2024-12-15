"use client";
import React, { useEffect, useState } from "react";

import styles from "./userStatus.module.css";
import { Book as BookComp, Loading } from '../../components';
import BookCard from "../BookCardFolder/BookCardComp";
import RequireAuth from "../../layout/RequireAuth";
import { Book as BookType } from "@/types";
import useUserStore from "../../services/zustand/userZustand/userStor";
import { getBooks } from "../../hooks/booksDetails";
import { recommendSystem } from "../../services/recommendSystemService";

const Recommendations = () => {
  const { data: books, isLoading } = getBooks();
  const user = useUserStore((state) => state.user);
  const [recommend, setRecommend] = useState<BookType[]>([]);
  const [selectedBook, setSelectedBook] = useState<BookType | null>(null);

  useEffect(() => {
    if (user && books) {
      const fetchRecommendations = async () => {
        try {
          const booksWithoutCoverImage: Omit<BookType, 'coverImage'>[] = books.map((book) => {
            const { coverImage, ...bookWithoutCoverImage } = book;
            return bookWithoutCoverImage;
          });

          const recommendedBookIds = await recommendSystem(user._id!, booksWithoutCoverImage);
          const recommendedBooks = books.filter(book =>
            recommendedBookIds.includes(book._id)
          );
          setRecommend(recommendedBooks);
        } catch (error) {
          console.error("Error fetching recommended books:", error);
        }
      };

      fetchRecommendations();
    }
  }, [books, user]);

  const handleBookClick = (book: BookType) => {
    setSelectedBook(book); // שמירת הספר שנבחר
  };

  const handleClosePopup = () => {
    setSelectedBook(null); // סגירת הפופאפ
  };

  return (
    <div className={styles.recommendContainer}>
      {recommend.length > 0 ? (
        recommend.map((book) => {
          return (
            <div className={styles.recommendcard} key={book.name}>
              <div>
                <p>מומלץ בשבילך🌟</p>
                <p className={styles.small}>
                  מערכת ההמלצה שלנו חיפשה את הספר המתאים ביותר עבורך בהתבסס על
                  בחירות ודירוגים קודמים
                </p>
                <BookComp
                  key={book.name}
                  book={book}
                  handleClick={() => handleBookClick(book)} // הפעלת לחיצה
                />
              </div>
            </div>
          );
        })
      ) : (
        <div className={styles.loadingContainer}>
          <Loading />
        </div>
      )}

      {/* פופאפ להצגת פרטי ספר */}
      {selectedBook && (
        <>
          <RequireAuth>
            <div className={styles.overlay} onClick={handleClosePopup}></div>
            <div className={styles.popup}>
              <BookCard book={selectedBook} onClose={handleClosePopup} />
            </div>
          </RequireAuth>
        </>
      )}
    </div>
  );
};

export default Recommendations;
