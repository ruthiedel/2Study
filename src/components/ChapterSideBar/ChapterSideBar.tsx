'use client';
import React, { useState, useEffect } from 'react';
import { getBooks } from '@/hooks/booksDetails';
import { Book } from '../../types';
import numberToGematria from '../../lib/clientHelpers/gematriaFunc';
import styles from './chapterSideBarCss.module.css';

interface SidebarProps {
    selectedBookId: string;
    onSectionSelect: (chapterIndex: number, sectionIndex: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ selectedBookId, onSectionSelect }) => {
    const { data: books, isLoading, error } = getBooks();
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [expandedChapter, setExpandedChapter] = useState<number | null>(null);
    const [bookName, setBookName] = useState<string | null>(null);

    useEffect(() => {
        if (books && books.length > 0 && selectedBookId) {
            const book = books.find((book) => book._id === selectedBookId);
            setSelectedBook(book || null);
            setBookName(book?.name || null);
        }
    }, [books, selectedBookId]);

    if (isLoading) {
        return (
            <div className={styles.container}>
                <p>...טוען פרקים...</p>
            </div>
        );
    }

    if (error || !selectedBook || !selectedBook.paragraphsCountPerChapter) {
        return (
            <div className={styles.container}>
                <p>שגיאה בטעינת הספר.</p>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{bookName}</h1>
            <div>
                {selectedBook.paragraphsCountPerChapter.map((sectionCount, chapterIndex) => (
                    <div key={chapterIndex}>
                        <div
                            className={`${styles.listItem} ${expandedChapter === chapterIndex ? styles.selected : ''}`}
                            onClick={() => setExpandedChapter(expandedChapter === chapterIndex ? null : chapterIndex)}
                        >
                            <span>פרק {numberToGematria(chapterIndex + 1)}</span>
                            <button className={styles.iconButton}>
                                <span className={styles.icon}>
                                    {expandedChapter === chapterIndex ? '▲' : '▼'}
                                </span>
                            </button>
                        </div>
                        {expandedChapter === chapterIndex && (
                            <div className={styles.nestedList}>
                                {[...Array(sectionCount)].map((_, sectionIndex) => (
                                    <div
                                        key={sectionIndex}
                                        className={styles.innerListItem}
                                        onClick={() => onSectionSelect(chapterIndex + 1, sectionIndex + 1)}
                                    >
                                        סעיף {numberToGematria(sectionIndex + 1)}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
