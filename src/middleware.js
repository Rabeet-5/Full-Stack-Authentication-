import { NextResponse } from "next/server";

export const middleware = async (request) => {

    const path = request.nextUrl.pathname;
    const isPublicPath = path === '/login' || path === "/signup"  || path === "/verifyemail" || 
     path === "/forgotpassword" || path === "/resetpassword" ;
    const token = request.cookies.get('token')?.value || '' ;
    if(isPublicPath && token){
        return NextResponse.redirect(new URL(`${'/profile'}${'/'}`,request.nextUrl));
    }
    if(!isPublicPath && !token){
        return NextResponse.redirect(new URL('/login',request.nextUrl));
    }

}

export const config = {
    matcher : [
        '/',
        '/profile',
        '/login',
        '/signup',
        '/verifyemail',
        '/forgotpassword',
        '/resetpassword'
    ]
}