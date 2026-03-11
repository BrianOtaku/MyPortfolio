import { NextResponse } from "next/server";
import { connectDB } from "@/src/lib/mongodb";
import Asset, { IShowcase } from "@/src/models/Asset";
import cloudinary from "@/src/lib/cloudinary";
import mongoose from "mongoose";
import { UploadApiResponse } from "cloudinary";
import { requireAdminAuth } from "@/src/utils/auth";
import type { NextRequest } from "next/server";

interface Params {
  params: {
    id: string;
  };
}

// DELETE /api/assets/:id
export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    // Check authorization
    const { isAuthorized, response } = await requireAdminAuth(req);
    if (!isAuthorized) return response;

    await connectDB();

    const asset = await Asset.findById(params.id);

    if (!asset) {
      return NextResponse.json({ error: "Asset not found" }, { status: 404 });
    }

    // 1. Xoá file chính trên Cloudinary
    try {
      await cloudinary.uploader.destroy(asset.publicId, {
        resource_type: "auto",
      });
    } catch (cloudErr) {
      console.warn("Cloudinary delete warning:", cloudErr);
      // Tiếp tục xoá từ MongoDB dù Cloudinary thất bại
    }

    // 2. Xoá showcase files
    if (asset.showcase && asset.showcase.length > 0) {
      await Promise.all(
        asset.showcase.map((s: IShowcase) =>
          cloudinary.uploader
            .destroy(s.publicId, { resource_type: "auto" })
            .catch((e: Error) => {
              console.warn("Failed to delete showcase:", e);
            }),
        ),
      );
    }

    // 3. Xoá từ MongoDB
    await Asset.findByIdAndDelete(params.id);

    return NextResponse.json({
      message: "Deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}

// PUT /api/assets/:id
export async function PUT(req: NextRequest, { params }: Params) {
  try {
    // Check authorization
    const { isAuthorized, response } = await requireAdminAuth(req);
    if (!isAuthorized) return response;

    await connectDB();

    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }

    const asset = await Asset.findById(id);

    if (!asset) {
      return NextResponse.json({ error: "Asset not found" }, { status: 404 });
    }

    // Nếu gửi JSON thường
    const contentType = req.headers.get("content-type");

    // ===============================
    // CASE 1: Update text only (JSON)
    // ===============================
    if (contentType?.includes("application/json")) {
      const body = await req.json();

      asset.title = body.title ?? asset.title;
      asset.description = body.description ?? asset.description;

      await asset.save();

      return NextResponse.json(asset);
    }

    // ===============================
    // CASE 2: Update có file (FormData)
    // ===============================
    if (contentType?.includes("multipart/form-data")) {
      const formData = await req.formData();

      const title = formData.get("title") as string | null;
      const description = formData.get("description") as string | null;
      const file = formData.get("file") as File | null;

      if (title) asset.title = title;
      if (description) asset.description = description;

      // Nếu có upload file zip mới
      if (file) {
        // 1️⃣ Xoá file cũ trên Cloudinary
        await cloudinary.uploader.destroy(asset.publicId, {
          resource_type: "auto",
        });

        // 2️⃣ Upload file mới
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uploadResult: UploadApiResponse = await new Promise(
          (resolve, reject) => {
            cloudinary.uploader
              .upload_stream({ resource_type: "raw" }, (err, result) => {
                if (err) reject(err);
                else resolve(result as UploadApiResponse);
              })
              .end(buffer);
          },
        );

        asset.fileUrl = uploadResult.secure_url;
        asset.publicId = uploadResult.public_id;
      }

      await asset.save();

      return NextResponse.json(asset);
    }

    return NextResponse.json(
      { error: "Unsupported content type" },
      { status: 400 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
