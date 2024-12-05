'use client';
import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, CircularProgress, IconButton } from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material'; // אייקונים למשולש
import { getBooks } from '@/hooks/booksDetails';
import { Book } from '../../types';
import numberToGematria from '../../lib/clientHelpers/gematriaFunc';
import styles from './ChapterSideBar.module.css';

interface SidebarProps {
    selectedBookId: string;
    onSectionSelect: (chapterIndex: number, sectionIndex: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ selectedBookId, onSectionSelect }) => {
    const { data: books, isLoading, error } = getBooks();
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [expandedChapter, setExpandedChapter] = useState<number | null>(null);

    useEffect(() => {
        if (books && books.length > 0 && selectedBookId) {
            const book = books.find((book) => book._id === selectedBookId);
            setSelectedBook(book || null);
        }
    }, [books, selectedBookId]);

    if (isLoading) {
        return (
            <div className={styles.container}>
                <CircularProgress />
            </div>
        );
    }

    if (error || !selectedBook || !selectedBook.paragraphsCountPerChapter) {
        return (
            <div className={styles.container}>
                <p>Error loading book or no book selected.</p>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <h2>2study</h2>
            <List>
                {selectedBook.paragraphsCountPerChapter.map((sectionCount, chapterIndex) => (
                    <React.Fragment key={chapterIndex}>
                        <ListItem
                            className={`${styles.listItem} ${expandedChapter === chapterIndex ? styles.selected : ''
                                } `}
                            onClick={() => setExpandedChapter(expandedChapter === chapterIndex ? null : chapterIndex)}
                        >
                            <ListItemText
                                primary={`פרק ${numberToGematria(chapterIndex + 1)}`}
                                sx={{ fontFamily: '2StudyFont, sans-serif' }}
                            />
                            <IconButton edge="end">
                                {expandedChapter === chapterIndex ? <ExpandLess /> : <ExpandMore />}
                            </IconButton>
                        </ListItem>
                        {expandedChapter === chapterIndex && (
                            <List className={styles.nestedList}>
                                {[...Array(sectionCount)].map((_, sectionIndex) => (
                                    <ListItem
                                        key={sectionIndex}
                                        className={styles.innerListItem}
                                        onClick={() => onSectionSelect(chapterIndex + 1, sectionIndex + 1)}
                                    >
                                        <ListItemText
                                            primary={`סעיף ${numberToGematria(sectionIndex + 1)}`}
                                            sx={{ fontFamily: '2StudyFont, sans-serif' }}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        )}
                    </React.Fragment>
                ))}
            </List>
        </div>
    );
};

export default Sidebar;
