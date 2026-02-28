import { NextResponse } from "next/server";
import { connectDB } from "@/src/lib/mongodb";
import User from "@/src/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  await connectDB();

  const { name, email, password } = await req.json();

  const existing = await User.findOne({ email });

  if (existing) {
    return NextResponse.json(
      { error: "Email already exists" },
      { status: 400 },
    );
  }

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashed,
  });

  return NextResponse.json(user);
}
