import { NextRequest, NextResponse } from "next/server";
import { connectDatabase, updateUser } from '../../../../services/mongo/userMongo'

// export async function PATCH(req: NextRequest) {
//     try {
//         const body = await req.json();
//         const { bookId, bookName } = body;

//         const urlParts = req.nextUrl.pathname.split('/');
//         const userId = urlParts[urlParts.length - 1];

//         console.log(444, userId)
//         console.log(444, bookId)
//         console.log(444, bookName)
//         const result = await addUserBook(userId, bookId, bookName);
//         return NextResponse.json(result, { status: result.status });

//     } catch (err) {
//         return NextResponse.json(err);
//     }
// }

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
    try {
      const { id } = params; 
      const updatedData = await request.json();
  
      const client = await connectDatabase();
      const user = await updateUser(client, 'books', id, updatedData);
  
      return NextResponse.json(user);
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: error }, { status: 500 });
    }
  }