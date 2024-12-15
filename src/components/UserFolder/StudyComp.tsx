'use client'

import * as React from 'react';
import { StyledLink } from '../StyleComponentsFolder/StyledLink';
import styles from './userStatus.module.css'
import useUserStore from '../../services/zustand/userZustand/userStor';
import numberToGematria from '@/lib/clientHelpers/gematriaFunc';

export default function StudyComp() {
  const user = useUserStore((state) => state.user);

  return (
    <div className={styles.mystudycard}>
      <div style={{ textAlign: 'center' }} className={styles.studyContent}>
        <p>
          <strong>
            ספרים בלמידה
          </strong>
        </p>
        {(user && user.books && user.books.length > 0 ) ? (
          user.books.map(book => {
            return (
              <a href={`study/${book.book_id}`}>
              <StyledLink key={book.book_name}>
                <b>{book.book_name}</b>
                <div className='bg-black rounded-full absolute bottom-[-8px] left-[50%] w-[15px] h-[15px] z-10'></div>
                <p>פרק: {numberToGematria(book.chapter_id)} סעיף: {numberToGematria(book.section_id)}</p>
              </StyledLink>
              </a>
            );
          }
          )
        ) : (
          <p className='mt-6 mb-6'>כאן יופיעו הספרים כאשר תתחיל ללמוד</p>
        )}
      </div>

    </div>
  );
}