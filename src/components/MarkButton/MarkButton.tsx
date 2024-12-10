
// import { updateBook } from '../../services/bookService'
import { useUpdateBook } from '../../hooks/booksDetails';

interface markProp {
    bookId: string;
    chapterId: number;
    paragraphId: number;}

export default function MarkButton({ bookId, chapterId, paragraphId }: markProp) {


function handleIndex(){

    try {
        
    } catch (e) {}

}

return (
    <div>
      <button onClick={handleIndex}>עצרתי כאן</button>
    </div>
 
)
}