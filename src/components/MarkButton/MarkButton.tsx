import useUserStore from "@/services/zustand/userZustand/userStor";
import markbook from "../../../public/pictures/bookmark.svg";
import Image from "next/image";

interface markProp {
  bookId: string;
  chapterId: number;
  paragraphId: number;
  isMarked: boolean | undefined;
}

export default function MarkButton({
  bookId,
  chapterId,
  paragraphId,
  isMarked,
}: markProp) {
  const user = useUserStore((state) => state.user);
  const updateUserZustand = useUserStore((state) => state.updateUserZustand);

  function handleIndex() {
    try {
      if (!user || !Array.isArray(user.books)) return;
      const bookIndex = user?.books.findIndex(
        (book) => book.book_id === bookId
      );
      if (bookIndex !== -1) {
        const updatedUser = {
          ...user,
          books: user.books.map((book, index) =>
            index === bookIndex
              ? { ...book, chapter_id: chapterId, section_id: paragraphId }
              : book
          ),
        };
        updateUserZustand(user._id!, updatedUser);
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
      <button onClick={handleIndex} className='mark-button'>
        <Image src={markbook} alt="markbook"></Image>
        {(isMarked) ? 'עצרתי כאן' : 'עדכן סימניה'}
      </button>
    </div>
  );
}
