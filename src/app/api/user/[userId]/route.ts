import { NextResponse } from "next/server";
import { updateUser } from '../../../../services/mongo/userMongo'
import { connectDatabase } from '../../../../services/mongo/mongoConection';

export async function PUT(request: Request, { params }: { params: { userId: string } }) {
    try {
      const uid = params.userId;
      const updatedData = await request.json();

      console.log('API user id: ####################', uid);
  
      const client = await connectDatabase();
      const user = await updateUser(client, 'users', uid, updatedData);

      return NextResponse.json(user);
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: error }, { status: 500 });
    }
  }