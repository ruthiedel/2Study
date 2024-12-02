import { NextRequest, NextResponse } from "next/server";
import { addUserBook } from '../../../../services/mongo/userMongo'

export async function PATCH(req: NextRequest){
    try {
        const body = await req.json();
        const { bookId, bookName } = body;

        const urlParts = req.nextUrl.pathname.split('/');
        const userId = urlParts[urlParts.length - 1];
        
        const result = await addUserBook(userId, bookId, bookName);
        return NextResponse.json(result, { status: result.status });

    } catch (err) {
        return NextResponse.json(err);
    }
}