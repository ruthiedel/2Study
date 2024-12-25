import { NextResponse } from 'next/server';
import { updateBookQuestion } from '../../../../../../services/mongo/bookMongo';
import { connectDatabase } from '../../../../../../services/mongo/mongoConection';

export async function PATCH(
    request: Request,
    { params }: { params: { id: string; chapter_id: string; paragraphId: string } }
  ) {
    try {
      const { id, chapter_id, paragraphId } = params;
      
      const updatedData = await request.json(); 
  
      if (!updatedData.question || !updatedData.answer) {
        return NextResponse.json(
          { message: "Missing question or answer in request body" },
          { status: 400 }
        );
      }
  
      const client = await connectDatabase();
      
      const updatedBook = await updateBookQuestion(
        client,
        "books",
        id,
        parseInt(chapter_id), 
        parseInt(paragraphId),
        { question: updatedData.question, answer: updatedData.answer }
      );
      return NextResponse.json(updatedBook);
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { message: "Cannot update book", error:"error" },
        { status: 500 }
      );
    }
  }
  

  