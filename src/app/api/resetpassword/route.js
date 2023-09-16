import User from "../../../models/userModel";
import { connectDb } from "../../../database/database";
import { NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'


connectDb();

export const POST = async (request) => {
  try {
    const reqBody = await request.json();
    const { email, newPassword, confirmPassword } = reqBody;

    if (!email || !newPassword || !confirmPassword) {
      return NextResponse.json(
        {
          message: "Please Enter all required fields",
        },
        { status: 404 }
      );
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        {
          message: "User does Not exist with this e-mail",
        },
        { status: 404 }
      );
    } 
    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        {
          message: "Passwords does not match",
        },
        { status: 404 }
      );
    }

    const hashPassword =await bcryptjs.hash(newPassword,10);
    user.password = hashPassword;
    user.forgotPasswordToken = undefined
    user.forgotPasswordExpiry = undefined
    await user.save();

    return NextResponse.json(
      {
        message: " password Changed Successfully ",
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
};
