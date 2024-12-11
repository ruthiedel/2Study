import useUserStore from "@/services/zustand/userZustand/userStor";


interface markProp {
    bookId: string;
    chapterId: number;
    paragraphId: number;}

export default function MarkButton({ bookId, chapterId, paragraphId }: markProp) {
    const user = useUserStore((state) => state.user);
    const updateUserZustand = useUserStore((state) => state.updateUserZustand);
  
  

function handleIndex(){

    try {
        if (!user ||!Array.isArray(user.books)) return;
        const bookIndex = user?.books.findIndex(book => book.book_id === bookId);
        if (bookIndex !== -1) {
            const updatedUser = {
                ...user,
                books: user.books.map((book, index) =>
                  index === bookIndex ? { ...book, chapter_id: chapterId, section_id: paragraphId } : book
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
      <button onClick={handleIndex} className="mark-button">עצרתי כאן</button>
    </div>
 
)
}