import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/src/lib/mongodb";
import Asset from "@/src/models/Asset";
import { requireAuth } from "@/src/utils/auth";
import type { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    // require login
    const { isAuthorized, response } = await requireAuth(req);
    if (!isAuthorized) return response;

    await connectDB();

    const { id } = await params;

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

    // Kiểm tra có fileUrl không
    if (!asset.fileUrl) {
      return NextResponse.json(
        { message: "File not available" },
        { status: 400 },
      );
    }

    // Tăng lượt tải async (không chặn response)
    asset.downloads = (asset.downloads || 0) + 1;
    asset
      .save()
      .catch((err: Error) => console.error("Failed to update downloads:", err));

    // Redirect sang Cloudinary
    return NextResponse.redirect(asset.fileUrl);
  } catch (error) {
    console.error("Download error:", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
