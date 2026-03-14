const MAX_ARCHIVE_SIZE = 10 * 1024 * 1024; // 10 MB
const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_VIDEO_SIZE = 100 * 1024 * 1024; // 100MB
const ALLOWED_ARCHIVE_TYPES = [
  "application/zip",
  "application/x-zip-compressed",
  "application/vnd.rar",
  "application/x-rar-compressed",
];
const ALLOWED_MEDIA_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "video/mp4",
  "video/webm",
];

export function validateFile(
  file: File,
  maxSize: number,
  allowedTypes: string[],
  fieldName: string,
) {
  if (file.size > maxSize) {
    const maxMB = maxSize / (1024 * 1024);

    throw new Error(`${fieldName} "${file.name}" exceeds the ${maxMB}MB limit`);
  }

  if (!allowedTypes.includes(file.type)) {
    throw new Error(
      `${fieldName} "${file.name}" has unsupported type "${file.type}". Allowed types: ${allowedTypes.join(", ")}`,
    );
  }
}

export function validateArchive(file: File | null) {
  validateFile(file!, MAX_ARCHIVE_SIZE, ALLOWED_ARCHIVE_TYPES, "Archive File");
}

export function validateShowcase(file: File) {
  if (file.type.startsWith("image/")) {
    validateFile(file, MAX_IMAGE_SIZE, ALLOWED_MEDIA_TYPES, "Showcase Image");
  } else if (file.type.startsWith("video/")) {
    validateFile(file, MAX_VIDEO_SIZE, ALLOWED_MEDIA_TYPES, "Showcase Video");
  } else {
    throw new Error(`Showcase file "${file.name}" must be an image or video`);
  }
}

export async function uploadToCloudinary(file: File) {
  const formData = new FormData();

  formData.append("file", file);
  formData.append(
    "upload_preset",
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!,
  );

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/" +
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME +
      "/auto/upload",
    {
      method: "POST",
      body: formData,
    },
  );

  return res.json();
}
