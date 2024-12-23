import { connectDatabase, recommend } from "../../../services/mongo/reccomendMongo";
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, books } = body;

    if (!userId || !books) {
      return NextResponse.json({ message: "Missing userId or books in request body" }, { status: 400 });
    }

    const recommends = await recommend(userId, books);

    return NextResponse.json(recommends);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "An error occurred", error }, { status: 500 });
  }
}
