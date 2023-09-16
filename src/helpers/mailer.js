import { NextResponse } from "next/server";
import { connectDb } from "../database/database";
import User from "../models/userModel";
import bcryptjs from "bcryptjs";
import nodemailer from 'nodemailer'

connectDb()

export const sendEmail = async ({ email, emailType, userId }) => {
  
  try {
    
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 360000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordExpiry: Date.now() + 360000,
      });
    }
  
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "bcb9bd84824ead",
        pass: "1fe93dd52faaeb",
      },
    });
    
    const mailOptions = {
      from: "rabeetsati@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY"
          ? "Verify Your Account"
          : "Verify Your Reset Password Token",
      html: emailType === 'VERIFY' ? `<p> 
      Click on the Link Below  <a href='${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}'>
      ${
        'Verify Your Account'
      }
      </a>
      or 
      Copy and Paste the Link Below in Your Browser
      <a href='${process.env.DOMAIN}/verifyemail?token=${hashedToken}'>
      ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
      </a>;
  </p>`
  : 
  `<p> 
  Click on the Link Below  <a href='${
    process.env.DOMAIN
  }/resetpassword?token=${hashedToken}'>
  ${
    'Verify Your Reset Password Token'
  }
  </a>
  or 
  Copy and Paste the Link Below in Your Browser
  <a href='${process.env.DOMAIN}/resetpassword?token=${hashedToken}'>
      ${process.env.DOMAIN}/resetpassword?token=${hashedToken}
      </a>;
</p>`,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;

  } catch (error) {
    return NextResponse.json({
        message:'Internal Server Error',
        err: error.message
    },{status:500})
  }
  
  
};
