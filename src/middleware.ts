import { NextRequest, NextResponse } from "next/server";

/**
 * @see https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
 */
export const config = {
  matcher: ["/admin/:path*"],
};

export function middleware(req: NextRequest) {
  const basicAuth = req.headers.get("Authorization");
  const ADMIN_USER = process.env.ADMIN_USER;
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

  if (basicAuth) {
    const authValue = basicAuth.split(" ")[1];
    // atob is deprecated but Buffer.from is not available in Next.js edge.
    const [user, password] = atob(authValue).split(":");
    if (user === ADMIN_USER && password === ADMIN_PASSWORD) {
      return NextResponse.next();
    }

    return NextResponse.json(
      { error: "Invalid credentials" },
      {
        headers: { "WWW-Authenticate": 'Basic realm="Secure Area"' },
        status: 401,
      }
    );
  } else {
    return NextResponse.json(
      { error: "Please enter credentials" },
      {
        headers: { "WWW-Authenticate": 'Basic realm="Secure Area"' },
        status: 401,
      }
    );
  }
}
