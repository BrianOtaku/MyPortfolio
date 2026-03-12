import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function proxy(req: NextRequest) {
  const token = await getToken({ req });
  const { pathname } = req.nextUrl;
  const method = req.method;

  // Protect admin routes
  if (pathname.startsWith("/admin")) {
    if (!token || token.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // Protect API write operations (POST, PUT, DELETE on assets)
  if (pathname.startsWith("/api/assets") && !pathname.includes("/comment")) {
    if (method !== "GET") {
      if (!token || token.role !== "admin") {
        return NextResponse.json(
          { error: "Unauthorized - admin access required" },
          { status: 401 },
        );
      }
    }
  }

  // Protect download route (only authenticated users can download)
  if (pathname.startsWith("/api/assets") && pathname.includes("/download")) {
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/assets/:path*"],
};
