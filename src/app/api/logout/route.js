import { connectDb } from "../../../database/database";
import { NextResponse } from "next/server";

connectDb();

export  const POST = async () => {
  try {
    
    const response = NextResponse.json({
      message: "User Logged out successfully",
      success: true,
    });

    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    return response;

  } catch (error) {
    
    console.log(error.message);
    
    return NextResponse.json(
      {
        message: "Internal Server Error",
        error,
      },
      { status: 500 }
    );
  }
};

