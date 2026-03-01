import { NextResponse } from "next/server";
import { connectDB } from "@/src/lib/mongodb";
import Asset from "@/src/models/Asset";
import cloudinary from "@/src/lib/cloudinary";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

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

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100 MB
const ALLOWED_ZIP_TYPES = ["application/zip", "application/x-zip-compressed"];
const ALLOWED_MEDIA_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "video/mp4",
  "video/webm",
];

export async function POST(req: NextRequest) {
  try {
    // Check authorization
    const token = await getToken({ req });
    if (!token || token.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized - admin access required" },
        { status: 401 },
      );
    }

    await connectDB();

    const formData = await req.formData();

    const zipFile = formData.get("zip") as File;
    const showcaseFiles = formData.getAll("showcase") as File[];

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    // Validate inputs
    if (!zipFile || !title || !description) {
      return NextResponse.json(
        { error: "Missing required fields: zip, title, description" },
        { status: 400 },
      );
    }

    if (zipFile.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `File size exceeds ${MAX_FILE_SIZE / (1024 * 1024)}MB limit` },
        { status: 400 },
      );
    }

    if (!ALLOWED_ZIP_TYPES.includes(zipFile.type)) {
      return NextResponse.json(
        { error: "ZIP file type not supported" },
        { status: 400 },
      );
    }

    // Upload ZIP (raw)
    const zipBytes = await zipFile.arrayBuffer();
    const zipBuffer = Buffer.from(zipBytes);

    const zipUpload = await uploadToCloudinary(zipBuffer, "raw");

    // Upload showcase files in parallel
    const showcaseUploads = await Promise.all(
      showcaseFiles.map(async (file) => {
        if (file.size > MAX_FILE_SIZE) {
          throw new Error(`File ${file.name} exceeds size limit`);
        }
        if (!ALLOWED_MEDIA_TYPES.includes(file.type)) {
          throw new Error(`File type ${file.type} not supported`);
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const upload = await uploadToCloudinary(buffer, "auto");

        return {
          type: upload.resource_type === "video" ? "video" : "image",
          url: upload.secure_url,
          publicId: upload.public_id,
        };
      }),
    );

    // Save to MongoDB
    const asset = await Asset.create({
      title,
      description,
      fileUrl: zipUpload.secure_url,
      publicId: zipUpload.public_id,
      showcase: showcaseUploads,
      downloads: 0,
    });

    return NextResponse.json(asset, { status: 201 });
  } catch (error) {
    console.error("Upload error:", error);
    const message = error instanceof Error ? error.message : "Upload failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET() {
  await connectDB();
  const assets = await Asset.find().sort({ createdAt: -1 });
  return NextResponse.json(assets);
}
