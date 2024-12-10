
import { useUpdateBook, getBooks } from '../../../hooks/booksDetails';
import { getBookCategoriesCount } from '../../../lib/clientHelpers/graphsFunctions'

export default function CategoryPi(){
    const { data: books } = getBooks();

    if (books ) {const results = getBookCategoriesCount(books);}

    return (
        <>
        
        </>
    )
}