import { NextResponse } from 'next/server';
import { connectDatabase } from '../../../../services/mongo/bookMongo';
//import { getMassagesByBookId } from '../../../../services/mongo/messageMongo';

export async function GET ({ params }: { params: { book_id: string } }){
try {
    const { book_id } = params; 
    const client = await connectDatabase();
    //const message = await getMassagesByBookId(client, 'messages', book_id);
    //return NextResponse.json(message);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error });
  }
  
}