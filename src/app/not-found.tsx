import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='notFoundContainer'>
      <h2>העמוד שחיפשת לא קיים</h2>
      <Link href="/" className='homeLink'>חזרה לדף הבית</Link>
    </div>
  )
}