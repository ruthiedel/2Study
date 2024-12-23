

import { connectDatabase, fetchBookById } from '../../../../services/mongo/bookMongo';
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const bookId = searchParams.get('bookId');
  const chapterNumber = searchParams.get('chapterNumber');
  const sectionNumber = searchParams.get('sectionNumber');

  if (!bookId || !chapterNumber || !sectionNumber) {
    return NextResponse.json({ message: 'Missing parameters' }, { status: 400 });
  }

  try {
    const client = await connectDatabase();
    const book = await fetchBookById(client, 'books', bookId);
    
    if (!book) {
      return NextResponse.json({ message: 'Book not found' }, { status: 404 });
    }

    const chapterIndex = parseInt(chapterNumber) - 1;

    if (!Array.isArray(book.chapters) || !book.chapters[chapterIndex]) {
      return NextResponse.json({ message: 'Chapter not found' }, { status: 404 });
    }

    const chapter = book.chapters[chapterIndex];
    const totalSections = chapter.paragraphs.length;

    const sectionIndex = parseInt(sectionNumber) - 1;
    if (sectionIndex >= totalSections) {
      return NextResponse.json({ message: 'Section not found' }, { status: 404 });
    }

    const getChapterContent = (chapterIndex: number) => {
      const sections = book.chapters[chapterIndex].paragraphs.map((section: any, index: number) => ({
        section: section,
        chapterNumber: chapterIndex + 1,
        sectionNumber: index + 1
      }));
      return sections;
    };

    const allSectionsInChapter = getChapterContent(chapterIndex);

    const result = {
      sections: allSectionsInChapter,
      book: {
        coverImage: book.coverImage,
        name: book.book_name
      }
    };


    return NextResponse.json(result);
  } catch (error) {
    console.error("Error retrieving chapter:", error);
    return NextResponse.json({ message: 'Error retrieving chapter', error: error }, { status: 500 });
  }
}

