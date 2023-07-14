import { NextResponse } from "next/server";

export function middleware(req: Request) {
    //console.log('middleware!')
    console.log('req middleware',req)
    NextResponse.next();

}