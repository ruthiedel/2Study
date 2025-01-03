import { connectDatabase } from '../../../services/mongo/mongoConection';
import { loginUser } from '../../../services/mongo/userMongo';
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password } = body;
        const client = await connectDatabase();
        const result = await loginUser(client, { email, password });

        return NextResponse.json({
            message: result.message,
            status: result.status,
            user: result.user
        });
    } catch (error: any) {
        console.error('Error processing POST request for login:', error);
        return NextResponse.json(
            { message: 'אירעה שגיאה פנימית במערכת. נסה שוב מאוחר יותר.', error: error.message },
            { status: 500 }
        );
    }
}