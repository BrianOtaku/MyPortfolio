import { NextResponse } from "next/server";
import { connectDB } from "@/src/lib/mongodb";
import Asset from "@/src/models/Asset";
import cloudinary from "@/src/lib/cloudinary";

interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
  resource_type: string;
}

async function uploadToCloudinary(
  buffer: Buffer,
  resourceType: "raw" | "auto",
): Promise<CloudinaryUploadResult> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ resource_type: resourceType }, (err, result) => {
        if (err) reject(err);
        if (result) resolve(result as CloudinaryUploadResult);
      })
      .end(buffer);
  });
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const formData = await req.formData();

    const zipFile = formData.get("zip") as File;
    const showcaseFiles = formData.getAll("showcase") as File[];

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    if (!zipFile) {
      return NextResponse.json(
        { error: "Zip file is required" },
        { status: 400 },
      );
    }

    // Upload ZIP (raw)
    const zipBytes = await zipFile.arrayBuffer();
    const zipBuffer = Buffer.from(zipBytes);

    const zipUpload = await uploadToCloudinary(zipBuffer, "raw");

    // Upload showcase files
    const showcaseUploads = [];

    for (const file of showcaseFiles) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const upload = await uploadToCloudinary(buffer, "auto");

      showcaseUploads.push({
        type: upload.resource_type === "video" ? "video" : "image",
        url: upload.secure_url,
        publicId: upload.public_id,
      });
    }

    // Save to MongoDB
    const asset = await Asset.create({
      title,
      description,
      zipUrl: zipUpload.secure_url,
      zipPublicId: zipUpload.public_id,
      showcase: showcaseUploads,
    });

    return NextResponse.json(asset);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

export async function GET() {
  await connectDB();
  const assets = await Asset.find().sort({ createdAt: -1 });
  return NextResponse.json(assets);
}
