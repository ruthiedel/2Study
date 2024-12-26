'use client';

import React, { useMemo, useState } from 'react';
import {BookCard, BookDetail, FilterComponent} from '../index';
import RequireAuth from '../../layout/RequireAuth';
import styles from './showBookCss.module.css';
import { Book } from '../../types';
import { getBooks } from '@/hooks/booksDetails';

const ShowBooks: React.FC = () => {
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [bookName, setBookName] = useState('');
    const [authorName, setAuthorName] = useState('');
    const [categories, setCategories] = useState<string[]>([]);

    const { data: books, isLoading, error } = getBooks();

    const filteredBooks = useMemo(() => {
        if (!books || error) return [];

        if (Array.isArray(books)){
            return books.filter((book: Book) => {
                const matchesCategory = categories.length === 0 || categories.some(cat =>
                    book.category.subject.includes(cat) ||
                    book.category.type.includes(cat)
                );
                const matchesBookName = bookName === '' || book.name.toLowerCase().includes(bookName.toLowerCase());
                const matchesAuthorName = authorName === '' || book.author.toLowerCase().includes(authorName.toLowerCase());
                return matchesCategory && matchesBookName && matchesAuthorName;
            })
        }
        else{
            return []
        }
    }, [books, categories, bookName, authorName]);

    const handleBookSelect = (book: Book) => {
        setSelectedBook(book);
    };

    const handleClosePopup = () => {
        setSelectedBook(null);
    };

    function getUniqueCategoryStrings(books: Book[]): string[] {
        const uniqueCategories: string[] = [];   
        if( books && Array.isArray(books)) {
            books.forEach(book => {
                const localType = book.category.type;
                const localSubject = book.category.subject;
                if(!uniqueCategories.includes(localType)) {uniqueCategories.push(localType);}
                if(!uniqueCategories.includes(localSubject)) {uniqueCategories.push(localSubject);}
            });
        }  
        return uniqueCategories;
    }

    const uniqueCategories = useMemo(() => {
        if( books && Array.isArray(books)) {
        return  books.length > 0 ? getUniqueCategoryStrings(books) : ['הלכה'];
        } else {
            return ['הלכה'];
        }
      }, [books]);



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
                    dropDownCategories={uniqueCategories}
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
                        <RequireAuth>

                            <div className={styles.overlay} onClick={handleClosePopup}></div>
                            <div className={styles.popup}>
                                <BookCard book={selectedBook} onClose={handleClosePopup} />
                            </div>
                        </RequireAuth>

                    </>
                )}
            </div>
        </div >
    );
};

export default ShowBooks;