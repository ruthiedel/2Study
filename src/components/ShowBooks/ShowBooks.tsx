'use client';

import React, { useState } from 'react';
import BookCard from '../bookCard/bookCard';
import BookDetail from '../book/book';
import FilterComponent from '../filterComponent/FilterComponent';
import styles from './ShowBook.module.css';
import { Book } from '../../types';
import {getBooks} from '@/hooks/booksDetails';


const ShowBooks: React.FC = () => {
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [bookName, setBookName] = useState('');
    const [authorName, setAuthorName] = useState('');
    const [categories, setCategories] = useState<string[]>([]);

    const { data: books, isLoading, error } = getBooks();

    if (isLoading) return <div>טעינה...</div>;
    if (error) return <div>התרחשה שגיאה בהורדת הספרים</div>;

    const filteredBooks = books?.filter((book: Book) => {
        const matchesCategory = categories.length === 0 || categories.includes(book.category.subject) || categories.includes(book.category.type);
        const matchesBookName = bookName === '' || book.name.toLowerCase().includes(bookName.toLowerCase());
        const matchesAuthorName = authorName === '' || book.author.toLowerCase().includes(authorName.toLowerCase());
        return matchesCategory && matchesBookName && matchesAuthorName;
    });

    const handleBookSelect = (book: Book) => {
        setSelectedBook(book);
    };

    const handleClosePopup = () => {
        setSelectedBook(null);
    };

    return (
        <div className={styles.container}>
            <div className={styles.sidebarContainer}>
                <FilterComponent
                    bookName={bookName}
                    setBookName={setBookName}
                    authorName={authorName}
                    setAuthorName={setAuthorName}
                    categories={categories}
                    setCategories={setCategories}
                />
            </div>

            <div className={styles.booksContainer}>
                <div className={styles.bookGrid}>
                    {filteredBooks && filteredBooks?.map((book, index) => (
                        <BookDetail key={index} book={book} handleClick={handleBookSelect} />
                    ))}
                    {filteredBooks && filteredBooks?.map((book, index) => (
                        <BookDetail key={index} book={book} handleClick={handleBookSelect} />
                    ))}
                    {filteredBooks && filteredBooks?.map((book, index) => (
                        <BookDetail key={index} book={book} handleClick={handleBookSelect} />
                    ))}
                    {filteredBooks && filteredBooks?.map((book, index) => (
                        <BookDetail key={index} book={book} handleClick={handleBookSelect} />
                    ))}
                </div>
                {selectedBook && (
                    <>
                        <div className={styles.overlay} onClick={handleClosePopup}></div>
                        <div className={styles.popup}>
                            <BookCard book={selectedBook} onClose={handleClosePopup} />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ShowBooks;
