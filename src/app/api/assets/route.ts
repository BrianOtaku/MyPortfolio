import { NextResponse } from "next/server";
import { connectDB } from "@/src/lib/mongodb";
import Asset from "@/src/models/Asset";

export async function POST(req: Request) {
  await connectDB();

  const body = await req.json();

  const asset = await Asset.create({
    title: body.title,
    description: body.description,
    gitUrl: body.gitUrl,
    itchUrl: body.itchUrl,
    fileUrl: body.fileUrl,
    publicId: body.publicId,
    showcase: body.showcase,
  });

  return NextResponse.json(asset);
}

export async function GET() {
  await connectDB();
  const assets = await Asset.find().sort({ createdAt: -1 });
  return NextResponse.json(assets);
}
