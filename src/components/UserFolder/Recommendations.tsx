"use client";
import React, { useEffect, useState} from "react";
import styles from "./userStatus.module.css";
import { Book, Loading } from '../../components';
import { Book as BookType } from "@/types";
import useUserStore from "../../services/zustand/userZustand/userStor";
import { getBooks } from "../../hooks/booksDetails";
import { recommendSystem } from "../../services/recommendSystemService";
const Recommendations = () => {
  const { data: books, isLoading } = getBooks()
  const user = useUserStore((state) => state.user);
  const [recommend,setRecommend]= useState<BookType[]>([])
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

  },[books,user])
  
  return (
    <div className={styles.container}>
      {
        recommend.length === 0 ? (
          <Loading /> 
        ) : (
          recommend.map((book) => {
            return (
              <div className={`${styles.recommendcard} fontFamily`} key={book.name}>
                <div>
                  <div className="text-sm mt-4 fontFamily">מומלץ בשבילך🌟</div>
                  <div className="text-[8px] fontFamily">
                    מערכת ההמלצה שלנו חיפשה את הספר המתאים ביותר עבורך בהתבסס על
                    בחירות ודירוגים קודמים
                  </div>
                  <Book
                    key={book.name}
                    book={book}
                    handleClick={function (book: BookType): void {
                      console.log("write me!!");
                    }}
                  />
                </div>
              </div>
            );
          })
        )
      }
    </div>
  );
}  
export default Recommendations

