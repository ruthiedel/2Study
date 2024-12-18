
import { NextResponse } from "next/server";
import {registerUser} from '../../../services/mongo/userMongo';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const result = await registerUser(body); 

        return NextResponse.json({
            message: result.message,
            status: result.status,
            user: result.user
        });
    } catch (error: any) {
        console.error('Error processing POST request for register:', error);
        return NextResponse.json(
            { message: 'אירעה שגיאה פנימית במערכת. נסה שוב מאוחר יותר.', error: error.message },
            { status: 500 }
        );
    }
}