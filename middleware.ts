import {NextRequest, NextResponse} from "next/server"

export function middleware(request: NextRequest) {
    // console.log(request.cookies)
    // console.log(request.headers)
    // return NextResponse.redirect(new URL('/lists', request.url))
return NextResponse.next()
}

export const config = {
    matcher: '/:path',
}