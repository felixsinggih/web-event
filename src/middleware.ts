import { withAuth, NextRequestWithAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
    function middleware(request: NextRequestWithAuth) {
        // console.log(request.nextUrl.pathname)
        // console.log(request.nextauth.token)

        if (request.nextUrl.pathname.startsWith("/admin")
            && request.nextauth.token?.role !== "Admin") {
            return NextResponse.rewrite(
                new URL("/dashboard", request.url)
            )
        }

        if (request.nextUrl.pathname.startsWith("/admin/user")
            && request.nextauth.token?.role !== "Participant") {
            return NextResponse.rewrite(
                new URL("/admin", request.url)
            )
        }
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token
        },
    }
)

export const config = { matcher: ["/admin/:path*", "/dashboard"] }