
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export const getDataFromToken = async (request) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    const decodedData = jwt.verify(token, process.env.JWT_KEY);
    return decodedData;
  } catch (error) {
    return NextResponse.json({
        message:'Error while getting token',
        err:error.message
    },{status:500})
  }
};
