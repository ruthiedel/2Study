'use client'
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import useUserStore from '../../../services/zustand/userZustand/userStor';
import { getSections } from '../../../services/bookService';
import { useParams } from 'next/navigation';
import { QuestionCard, Chat, ChapterSidebar, ShowParagraph } from '../../../components';
import { Paragraph } from '../../../types';
import numberToGematria from '../../../lib/clientHelpers/gematriaFunc'


const Study = () => {
    const { book_id } = useParams() as { book_id: string | string[] };
    const bookIdString = Array.isArray(book_id) ? book_id[0] : book_id;
    const user = useUserStore((state) => state.user);
    const [mark, setMark] = React.useState<{ chapterId: number, paragraphId: number } | null>(null)
    const [paragraph, setParagraph] = React.useState<Paragraph[]>([])



    useEffect(() => {
        if (user && book_id && user.books) {
            const userBook = user.books.find((book) => book.book_id === book_id);
            if (userBook) {
                setMark({
                    chapterId: userBook.chapter_id,
                    paragraphId: userBook.section_id,
                });
            } else {
                setMark({
                    chapterId: 1,
                    paragraphId: 1,
                });
            }
        }
    }, []);


    useEffect(() => {


        if (mark) {
            const validBookId = Array.isArray(book_id) ? book_id[0] : book_id;

            if (typeof validBookId === 'string') {
                getSections(validBookId, mark.chapterId, mark.paragraphId).then((response) => {
                    setParagraph(response.sections);
                });
            }
        }
        else {
            const validBookId = Array.isArray(book_id) ? book_id[0] : book_id;

            if (typeof validBookId === 'string') {
                getSections(validBookId, 1, 1).then((response) => {
                    setParagraph([...response.sections]);

                });
            }
        }
    }, [mark]);

    return (
        <Box display="flex" height="100vh">
            <ChapterSidebar selectedBookId={bookIdString} onSectionSelect={(chapterIndex, sectionIndex) => {
                setMark({ chapterId: chapterIndex, paragraphId: sectionIndex });
            }} />
            {mark && paragraph.length > 0 && <ShowParagraph paragraph={paragraph[0]} chapterTitle={numberToGematria(mark?.chapterId!)} />}
            <Chat bookId={bookIdString} />
            {paragraph.length > 0 &&
                <QuestionCard p={paragraph[1]} />}
        </Box>
    );
};

export default Study;
