'use client';

import Link from 'next/link'
import styles from './not-found.module.css'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'

export default function NotFound() {
  return (
    <div className={styles.notFoundContainer}>
      <script src="https://unpkg.com/@lottiefiles/dotlottie-wc@0.3.0/dist/dotlottie-wc.js" type="module"></script>
      <DotLottieReact src="https://lottie.host/31f1cc86-b8a9-4229-b91a-a0d2eac91ab3/moTx65qnNG.lottie" autoplay loop className={styles.animate}></DotLottieReact>
      <h2 className={styles.heading}>העמוד שחיפשת לא קיים</h2>
      <p className={styles.message}>נראה כי עמוד זה הוסר או לא קיים יותר.</p>
      <Link href="/" className={styles.homeLink}>
        חזרה לדף הבית
      </Link>
    </div>
  )
}
