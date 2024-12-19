import useUserStore from "@/services/zustand/userZustand/userStor";
import markbook from "../../../public/pictures/bookmark.svg";
import emptyMarkbook from "../../../public/pictures/empty-bookmark1.svg";
import Image from "next/image";
import Swal from "sweetalert2";

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
        
        Swal.fire({
          title: "מעולה!",
          text: "הסימניה שלך עודכנה למיקום החדש בהצלחה.",
          icon: "success",
          confirmButtonText: "נהדר",
          timer: 3000,
        });
      }
    } catch (e) {
      Swal.fire({
        title: "שגיאה!",
        text: "משהו השתבש, הסימניה לא עודכנה. נסה שוב מאוחר יותר.",
        icon: "error",
        confirmButtonText: "סגור",
      });
    }
  }

  return (
    <div>
      <button onClick={handleIndex} className='mark-button'>
        <Image src={(isMarked) ? markbook : emptyMarkbook} alt="markbook"></Image>
        {(isMarked) ? 'עצרתי כאן' : 'עדכן סימניה'}
      </button>
    </div>
  );
}
