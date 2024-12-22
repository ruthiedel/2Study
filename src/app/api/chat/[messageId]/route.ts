import { NextResponse } from 'next/server';
import { getMassagesByBookId } from '../../../../services/mongo/massagesMongo';

export async function GET ({ params }: { params: { book_id: string } }){
try {
    const { book_id } = params; 
    const message = await getMassagesByBookId(book_id);
    return NextResponse.json(message);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error });
  }
  
}