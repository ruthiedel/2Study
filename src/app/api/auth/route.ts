import { NextRequest, NextResponse } from "next/server";
import { connectDatabase } from "../../../services/mongo/mongoConection";
import bcrypt from "bcryptjs"; 

export async function PUT(request: NextRequest) {
  try {
    const { email, newPassword } = await request.json();

    if (!email || !newPassword) {
      return NextResponse.json(
        { success: false, message: "Email and newPassword are required" },
        { status: 400 }
      );
    }

    const client = await connectDatabase();
    const db = client.db("Books");

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const result = await db
      .collection("users")
      .findOneAndUpdate(
        { email }, 
        { $set: { password: hashedPassword } }, 
        { returnDocument: "after" } 
      );

    if (!result ) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error("Error updating password:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
