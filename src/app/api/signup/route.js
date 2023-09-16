import User from "../../../models/userModel";
import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";
import {connectDb} from "../../../database/database";
import { sendEmail } from "../../../helpers/mailer";

connectDb();

export async function POST (request) {
  try {
    const reqBody = await request.json();
    const { name, email, password } = reqBody;

    const findUser = await User.findOne({ email });
    if (findUser) {
      return NextResponse.json({  
        message: "User with this e-mail already exist",
      },{status:409});
    }

    const salt = 10;
    const hashedPass = await bcryptjs.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPass,
    });

    const saveUser = await newUser.save();
    console.log(saveUser);

    await sendEmail({email,emailType:'VERIFY',userId:saveUser._id})

    return NextResponse.json({
      message: "User created Successfully",
      success: true,
      saveUser,
    },{status:200});
    
  } catch (error) {
        console.log(error)
    return NextResponse.json(
      {
        message: "Internal Server Error ",
        error:error.message
      },
      { status: 500 }
    );
  }
};

