import {  findUserByEmailAndPassword } from '../../../services/mongo/userMongo';
import { NextResponse } from 'next/server';
import { LoginCredentials } from '../../../types';


async function loginUser(credentials: LoginCredentials) {
    const user = await findUserByEmailAndPassword(credentials.email, credentials.password);
    if (!user) {
        return { message: 'המייל או הסיסמה שגויים. נסה שוב.', status: 401 };
    }

    return { message: 'ההתחברות בוצעה בהצלחה!', status: 200, user };
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password } = body;
        const result = await loginUser({ email, password });

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