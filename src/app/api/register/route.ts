import { checkAndAddUser, findUserByEmail } from "@/services/mongo/userMongo";
import { UserWithPassword } from "@/types";
import { NextResponse } from "next/server";

async function registerUser(user: UserWithPassword) {
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