import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/src/lib/mongodb";
import Asset from "@/src/models/Asset";

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    await connectDB();

    const { id } = params;

    // Check ObjectId hợp lệ
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid asset id" },
        { status: 400 },
      );
    }

    const asset = await Asset.findById(id);

    if (!asset) {
      return NextResponse.json({ message: "Asset not found" }, { status: 404 });
    }

    // Kiểm tra có zipUrl không
    if (!asset.zipUrl) {
      return NextResponse.json(
        { message: "File not available" },
        { status: 400 },
      );
    }

    // Tăng lượt tải
    asset.downloads = (asset.downloads || 0) + 1;
    await asset.save();

    // Redirect sang Cloudinary
    return NextResponse.redirect(asset.zipUrl);
  } catch (error) {
    console.error("Download error:", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
