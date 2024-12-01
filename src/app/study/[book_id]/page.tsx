'use client'
import { Book, Paragraph } from '../../../types';
import React, { useEffect } from 'react';
import useUserStore from '../../../services/zustand/userZustand/userStor';
import { getSections } from '../../../services/bookService';
import { QuestionCard } from '../../../components';
import { useParams } from 'next/navigation'; const Study = () => {
    const { book_id } = useParams();
    const user = useUserStore((state) => state.user);
    const [mark, setMark] = React.useState<{ chapterId: number, paragraphId: number } | null>(null)
    const [paragraph, setParagraph] = React.useState<Paragraph[]>([])


    useEffect(() => {
        if (user) {
            if (book_id && user.books) {
                const userBook = user.books.find((book) => book.book_id === book_id);
                if (userBook) {
                    setMark({
                        chapterId: userBook.chapter_id,
                        paragraphId: userBook.section_id,
                    });
                }
            }
        }
    }, [book_id]);

    useEffect(() => {
        if (mark && book_id) {
            const validBookId = Array.isArray(book_id) ? book_id[0] : book_id;

            if (typeof validBookId === 'string') {
                getSections(validBookId, mark.chapterId, mark.paragraphId).then((response) => {
                    const sections = response.sections;
                    const relevantParagraphs = sections.filter((section: { paragraphId: number; }) => section.paragraphId === mark.paragraphId);
                    setParagraph(relevantParagraphs);
                });
            }
        }
    }, [mark, book_id]);

    return (

        <div>
            <QuestionCard p={paragraph[1]} />


        </div>
    );
};

export default Study;
