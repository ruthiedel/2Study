'use client';

import Link from 'next/link'
import styles from './not-found.module.css'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'

export default function NotFound() {
  return (
    <div className={styles.notFoundContainer}>
         <h2 className={styles.heading}>העמוד שחיפשת לא קיים</h2>
      <p className={styles.message}>נראה כי עמוד זה הוסר או לא קיים יותר.</p>
      <Link href="/home" className={styles.homeLink}>
        חזרה לדף הבית
      </Link>
      <script src="https://unpkg.com/@lottiefiles/dotlottie-wc@0.3.0/dist/dotlottie-wc.js" type="module"></script>
      <DotLottieReact
      src="https://lottie.host/405fa504-85f4-4798-843c-5ecd89aa3da0/9RcqJopDaB.lottie"
      loop
      autoplay
      style={{
        width: '550px',
        height: '370px',
        backgroundColor: 'transparent',
      }}
    />
       
    </div>
  )
}
