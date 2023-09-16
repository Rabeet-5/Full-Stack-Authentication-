import User from "../../../models/userModel";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectDb } from "../../../database/database";
import { NextResponse } from "next/server";


connectDb();

export const POST = async (request) => {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log(reqBody);
    const findUser = await User.findOne({ email });

    if (!findUser) {
      return NextResponse.json(
        {
          message: "User with this e-mail does not exist ",
        },
        { status: 404 }
      );
    }

    const bodyPassword = findUser.password;
    const isValidate = await bcryptjs.compare(password, bodyPassword);
    if (!isValidate) {
      return NextResponse.json(
        { message: "Password Does not match" },
        { status: 404 }
      );
    }

    const tokenData = {
      id: findUser._id,
      email: findUser.email,
      password: findUser.password,
    };
    const KEY = process.env.JWT_KEY;
    const token = await jwt.sign(tokenData, KEY, {
      expiresIn: "1d",
    });

    const response = NextResponse.json(
      {
        message: "User Logged in successfully",
      },
      { status: 200 }
    );

    response.cookies.set("token", token, { httpOnly: true });
    return response;

  } catch (error) {
    console.log(error.message);
    return NextResponse.json({
      message: "Internal Server Error",
      error,
    });
  }
};

