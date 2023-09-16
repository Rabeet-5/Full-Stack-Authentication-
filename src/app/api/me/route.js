import User from '../../../models/userModel'
import {connectDb} from '../../../database/database'
import { getDataFromToken } from '../../../helpers/getDataFromToken';
import { NextResponse } from 'next/server';

connectDb();

export const GET = async (request) => {

try {
    const data =await getDataFromToken(request);
    const user = await User.findOne({_id:data.id}).select('-password');
    return NextResponse.json({
        message:'User Founded',
        user
    },{status:200})
} catch (error) {
    return NextResponse.json({
        message:"internal server error ",
        err:error.message
    },{status:500})
}

}
