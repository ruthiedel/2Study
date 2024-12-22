'use client'

import * as React from 'react';
import { StyledLink } from '../StyleComponentsFolder/StyledLink';
import styles from './userStatus.module.css'
import useUserStore from '../../services/zustand/userZustand/userStor';
import numberToGematria from '@/lib/clientHelpers/gematriaFunc';
import { UserBook } from "../../types";
import Link from "next/link";

export default function StudyComp() {
  const user = useUserStore((state) => state.user);
  const userBooks: UserBook[] = user?.books || [];
  const filterloading = userBooks.filter((book) =>
    book.status != false
  );

  const filterCompleted = userBooks.filter((book) =>
    book.status === false
  );

  return (
    <div className={styles.mystudycard}>
      <div style={{ textAlign: 'center' }} className={styles.studyContent}>
        <p>
          <strong>
            ספרים בלמידה
          </strong>
        </p>
        {(user && user.books && filterloading.length > 0 ) ? (
          filterloading.map(book => {
            return (
                <StyledLink key={book.book_name} href={`/study/${book.book_id}`}>
                  <b>{book.book_name}</b>
                  <div className='bg-black rounded-full absolute bottom-[-8px] left-[50%] w-[15px] h-[15px] z-10'></div>
                  <p>פרק: {numberToGematria(book.chapter_id)} סעיף: {numberToGematria(book.section_id)}</p>
                </StyledLink>
            );
          }
          )
        ) : (
          <p className='mt-6 mb-6'>כאן יופיעו הספרים שתבחר, כאשר תתחיל ללמוד</p>
        )}
      </div>

      <div style={{ textAlign: 'center' }} className={styles.studyContent}>
        <p>
          <strong>
            ספרים שסויימו
          </strong>
        </p>
        {(user && user.books && filterCompleted.length > 0 ) ? (
          filterCompleted.map(book => {
            return (
                <StyledLink key={book.book_name} href={`/study/${book.book_id}`}>
                  <b>{book.book_name}</b>
                  <div className='bg-black rounded-full absolute bottom-[-8px] left-[50%] w-[15px] h-[15px] z-10'></div>
                  <p>פרק: {numberToGematria(book.chapter_id)} סעיף: {numberToGematria(book.section_id)}</p>
                </StyledLink>
            );
          }
          )
        ) : (
          <p className='mt-6 mb-6'>כאן יופיעו הספרים שסיימת ללמוד, כאשר תסיים ללמוד</p>
        )}
      </div>

    </div>
  );
}