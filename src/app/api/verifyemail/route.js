import User from "../../../models/userModel";
import { connectDb } from "../../../database/database";
import { NextResponse } from "next/server";

connectDb();

export const POST = async (request) => {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;
    console.log(token);

    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        {
          messsage: "Invalid Token",
        },
        { status: 409 }
      );
    }else{
        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save()
    }
    
    return NextResponse.json(
      {
        message: "User Verified Successfully",
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal server error ",
        err: error.message,
      },
      { status: 500 }
    );
  }
};
