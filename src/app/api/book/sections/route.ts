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
    const sectionIndex = parseInt(sectionNumber) - 1;

    if (!Array.isArray(book.chapters) || !book.chapters[chapterIndex]) {
      return NextResponse.json({ message: 'Chapter not found' }, { status: 404 });
    }

    const chapter = book.chapters[chapterIndex];
    const totalSections = chapter.paragraphs.length;

    if (sectionIndex >= totalSections) {
      return NextResponse.json({ message: 'Section not found' }, { status: 404 });
    }

    const getSections = (chapterIndex: number, sectionIndex: number, totalSections: number) => {
      const sections: string[] = [];

      if (sectionIndex > 0) {
        sections.push(chapter.paragraphs[sectionIndex - 1]);
      } else if (chapterIndex > 0) {
        const prevChapter = book.chapters[chapterIndex - 1];
        sections.push(prevChapter.paragraphs[prevChapter.paragraphs.length - 1]);
      }

      sections.push(chapter.paragraphs[sectionIndex]);

      if (sectionIndex + 1 < totalSections) {
        sections.push(chapter.paragraphs[sectionIndex + 1]);
      } else if (chapterIndex < book.chapters.length - 1 && book.chapters[chapterIndex + 1].paragraphs.length) {
        sections.push(book.chapters[chapterIndex + 1].paragraphs[0]);
      }

      if (sectionIndex + 2 < totalSections) {
        sections.push(chapter.paragraphs[sectionIndex + 2]);
      } else if (sectionIndex === totalSections - 2 && chapterIndex < book.chapters.length - 1) {
        const nextChapter = book.chapters[chapterIndex + 1];
        sections.push(nextChapter.paragraphs[0]);
      } else if (chapterIndex < book.chapters.length - 1 && book.chapters[chapterIndex + 1].paragraphs.length > 1) {
        sections.push(book.chapters[chapterIndex + 1].paragraphs[1]);
      }

      return sections;
    };

    const sections = getSections(chapterIndex, sectionIndex, totalSections);
    const result = {
      sections,
      book: {
        coverImage: book.coverImage,
        name: book.book_name
      }
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error retrieving section:", error);
    return NextResponse.json({ message: 'Error retrieving section', error: error }, { status: 500 });
  }
}
