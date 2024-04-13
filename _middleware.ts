// import type { NextRequest } from 'next/server'
//
// export function _middleware(request: NextRequest) {
//     const token = request.cookies.get('access_token')?.value
//     console.log( request.cookies.get('access_token'));
//
//     if (token && !request.nextUrl.pathname.startsWith('/')) {
//         return Response.redirect(new URL('/', request.url))
//     }
//
//     if (!token && !request.nextUrl.pathname.startsWith('/auth')) {
//         return Response.redirect(new URL('/auth', request.url))
//     }
// }
//
// export const config = {
//     matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
// }