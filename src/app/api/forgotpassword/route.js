import User from "../../../models/userModel";
import { connectDb } from "../../../database/database";
import { NextResponse } from "next/server";
import { sendEmail } from "../../../helpers/mailer";


connectDb();

export const POST = async (request) => {

  try {
    const reqBody =await request.json();
    const {email} = reqBody;
    console.log(email)
    const user = await User.findOne({email})

    if(!user){
      return NextResponse.json({
        message:'User does not exist with this e-mail'
      },{status:404})
    }else{

      await sendEmail({email,emailType:"RESET",userId:user._id})
      user.forgotPasswordExpiry = new Date(Date.now() + 360000)
      await user.save()
    } 

    return NextResponse.json({
      message:'Verify Token has been sent to your e-mail'
    },{status:200})


  } catch (error) {
    console.log(error)
    return NextResponse.json({
      message:'Internal Server Error'
    },{status:500})
  }

}