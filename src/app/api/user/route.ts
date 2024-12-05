import { checkAndAddUser } from '../../../services/mongo/userMongo';
import { NextResponse } from 'next/server';
import { User } from '../../../types';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        
        const { _id, ...userWithoutId } = body; 
        const user = {
            ...userWithoutId,  
        };
        
        const result = await checkAndAddUser(user);
        return NextResponse.json(
            { message: result.message },
            { status: result.status }
        );
    } catch (error: any) {
        console.error('Error processing POST request:', error);
        return NextResponse.json(
            { message: 'Internal server error', error: error.message },
            { status: 500 }
        );
    }
}
