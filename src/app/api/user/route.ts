import { checkAndAddUser, findUserByEmailAndPassword, findUserByEmail } from '../../../services/mongo/userMongo';
import { NextResponse } from 'next/server';
import { User } from '../../../types';

async function registerUser(user: { email: string; password: string }) {
    const existingUser = await findUserByEmail(user.email);
    if (existingUser) {
        return { message: 'המייל הזה כבר קיים במערכת. אנא בחר מייל אחר.', status: 400 };
    }

    const result = await checkAndAddUser(user);
    return {
        message: result.message || 'ההרשמה בוצעה בהצלחה! ברוכה הבאה!',
        status: result.status || 200,
        user: result.user
    };
}

async function loginUser(email: string, password: string) {
    const user = await findUserByEmailAndPassword(email, password);
    if (!user) {
        return { message: 'המייל או הסיסמה שגויים. נסה שוב.', status: 401 };
    }

    return { message: 'ההתחברות בוצעה בהצלחה!', status: 200, user };
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password, isRegister } = body;

        let result;

        if (isRegister) {
            result = await registerUser({ email, password });
        } else {
            result = await loginUser(email, password);
        }

        return NextResponse.json({
            message: result.message,
            status: result.status,
            user: result.user
        });
    } catch (error: any) {
        console.error('Error processing POST request:', error);
        return NextResponse.json(
            { message: 'אירעה שגיאה פנימית במערכת. נסה שוב מאוחר יותר.', error: error.message },
            { status: 500 }
        );
    }
}
