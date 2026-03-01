// Authentication utilities
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function requireAdminAuth(req: NextRequest) {
  const token = await getToken({ req });

  if (!token || token.role !== "admin") {
    return {
      isAuthorized: false,
      response: NextResponse.json(
        { error: "Unauthorized - admin access required" },
        { status: 401 },
      ),
    };
  }

  return { isAuthorized: true };
}

export async function requireAuth(req: NextRequest) {
  const token = await getToken({ req });

  if (!token) {
    return {
      isAuthorized: false,
      response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }

  return { isAuthorized: true, token };
}
