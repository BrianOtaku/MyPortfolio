import { useState, useRef } from "react";
import { Trash2, Upload, X, Image as ImageIcon, Video } from "lucide-react";
import {
  uploadToCloudinary,
  validateShowcase,
  validateArchive,
} from "@/src/utils/file";

interface Showcase {
  type: "image" | "video";
  file: File | null;
}

interface AssetForm {
  title: string;
  description: string;
  assetFile: File | null;
  showcase: Showcase[];
}

export function AssetForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<AssetForm>({
    title: "",
    description: "",
    assetFile: null,
    showcase: [],
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const removeShowcaseItem = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      showcase: prev.showcase.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    try {
      if (!formData.assetFile) {
        throw new Error("Archive file is required");
      }

      // validate archive
      validateArchive(formData.assetFile);

      // validate showcase
      formData.showcase.forEach((item) => {
        if (item.file) validateShowcase(item.file);
      });

      // lấy list file showcase
      const showcaseFiles = formData.showcase
        .map((item) => item.file)
        .filter((file): file is File => file !== null);

      // bắt buộc phải có ít nhất 1 image
      const hasImage = showcaseFiles.some((file) =>
        file.type.startsWith("image/"),
      );

      if (!hasImage) {
        throw new Error("At least one preview image is required");
      }

      // upload archive
      const archiveUpload = await uploadToCloudinary(formData.assetFile);

      // upload showcase
      const showcaseUploads = await Promise.all(
        showcaseFiles.map(uploadToCloudinary),
      );

      const payload = {
        title: formData.title,
        description: formData.description,
        fileUrl: archiveUpload.secure_url,
        publicId: archiveUpload.public_id,
        showcase: showcaseUploads.map((u) => ({
          type: u.resource_type === "video" ? "video" : "image",
          url: u.secure_url,
          publicId: u.public_id,
        })),
      };

      const res = await fetch("/api/assets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to create asset");
      }

      setFormData({
        title: "",
        description: "",
        assetFile: null,
        showcase: [],
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black relative py-20">
      {/* Animated grid background */}
      <div className="retro-grid pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block border-4 border-cyan-400 p-6 bg-black mb-8 relative">
            <div className="absolute -top-2 -left-2 w-4 h-4 bg-cyan-400"></div>
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-cyan-400"></div>
            <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-cyan-400"></div>
            <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-cyan-400"></div>
            <h1 className="text-1xl md:text-4xl text-white">
              &gt; UPLOAD ASSET &lt;
            </h1>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Main Asset Info */}
          <div className="border-4 border-cyan-400 bg-black p-6 relative">
            <div className="absolute top-0 left-0 w-3 h-3 bg-cyan-400"></div>
            <div className="absolute top-0 right-0 w-3 h-3 bg-cyan-400"></div>
            <div className="absolute bottom-0 left-0 w-3 h-3 bg-cyan-400"></div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-cyan-400"></div>

            <h2 className="text-sm text-cyan-400 mb-6">&gt; ASSET INFO</h2>

            <div className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-[10px] text-white mb-2">
                  TITLE:
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="ENTER ASSET TITLE"
                  className="w-full bg-black border-4 border-white px-4 py-3 text-[10px] text-white placeholder:text-white/30 focus:border-cyan-400 focus:outline-none transition-colors"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-[10px] text-white mb-2">
                  DESCRIPTION:
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="ENTER ASSET DESCRIPTION"
                  rows={4}
                  className="w-full bg-black border-4 border-white px-4 py-3 text-[10px] text-white placeholder:text-white/30 focus:border-cyan-400 focus:outline-none transition-colors resize-none"
                  required
                />
              </div>

              {/* Asset File */}
              <div>
                <div className="block text-[10px] text-white mb-2">
                  ASSET 10MB MAX FILE &lt;ZIP/RAR&gt;:
                </div>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <label className="cursor-pointer border-4 border-white px-4 py-3 text-white text-[10px] hover:border-cyan-400 hover:bg-cyan-400 hover:text-black">
                    &gt; SELECT ARCHIVE
                    <input
                      type="file"
                      className="hidden"
                      accept=".zip, .rar"
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          assetFile: e.target.files?.[0] || null,
                        }))
                      }
                    />
                  </label>

                  <span className="text-[10px] text-white/80 truncate">
                    {formData.assetFile?.name || "NO FILE CHOSEN"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Showcase Section */}
          <div className="border-4 border-cyan-400 bg-black p-6 relative">
            <div className="absolute top-0 left-0 w-3 h-3 bg-cyan-400"></div>
            <div className="absolute top-0 right-0 w-3 h-3 bg-cyan-400"></div>
            <div className="absolute bottom-0 left-0 w-3 h-3 bg-cyan-400"></div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-cyan-400"></div>

            <h2 className="text-sm text-cyan-400 mb-6">&gt; SHOWCASE MEDIA</h2>

            {/* Add Showcase Item */}
            <div className="space-y-4">
              <div className="block text-[10px] text-white mb-2">
                IMAGE 10MB/VIDEO 100MB FILE &lt;JPEG/PNG/WEBP/MP4/WEBM&gt;:
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <label className="cursor-pointer border-4 border-white px-4 py-3 text-white text-[10px] hover:border-cyan-400 hover:bg-cyan-400 hover:text-black">
                    &gt; SELECT ARCHIVE
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      className="hidden"
                      accept="image/*,video/mp4,video/webm"
                      onChange={(e) => {
                        const files = e.target.files;
                        if (!files) return;

                        const newItems: Showcase[] = Array.from(files).map(
                          (file) => ({
                            type: file.type.startsWith("video")
                              ? "video"
                              : "image",
                            file,
                          }),
                        );

                        setFormData((prev) => ({
                          ...prev,
                          showcase: [...prev.showcase, ...newItems],
                        }));

                        e.target.value = "";
                      }}
                    />
                  </label>

                  <span className="text-[10px] text-white/80 truncate">
                    {formData.showcase.length > 0
                      ? `${formData.showcase.length} FILE(S) SELECTED`
                      : "NO FILE CHOSEN"}
                  </span>
                </div>
              </div>

              {/* Showcase Items List */}
              {formData.showcase.length > 0 && (
                <div className="space-y-2">
                  <div className="text-[10px] text-white/60 mb-2">
                    ADDED ITEMS ({formData.showcase.length}):
                  </div>
                  {formData.showcase.map((item, index) => (
                    <div
                      key={index}
                      className="border-2 border-white/30 bg-zinc-900 p-4 flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="flex-shrink-0">
                          {item.type === "image" ? (
                            <ImageIcon className="w-8 h-8 text-cyan-400" />
                          ) : (
                            <Video className="w-8 h-8 text-cyan-400" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[8px] text-cyan-400 mb-1">
                            {item.type.toUpperCase()}
                          </div>
                          <div className="text-[8px] text-white/60 truncate">
                            {item.file?.name}
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeShowcaseItem(index)}
                        className="flex-shrink-0 border-2 border-white p-2 hover:bg-red-500 hover:border-red-500 transition-all group"
                      >
                        <Trash2 className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          {error && <p className="text-red-500 mt-2">{error}</p>}
          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-3 border-4 border-cyan-400 bg-cyan-400 py-4 text-xs text-black hover:bg-black hover:text-cyan-400 transition-all"
            >
              {!loading ? (
                <>
                  <Upload className="w-5 h-5" />
                  UPLOAD ASSET
                </>
              ) : (
                "LOADING..."
              )}
            </button>
            <button
              type="button"
              onClick={() => (window.location.href = "/home")}
              className="border-4 border-white bg-black px-8 py-4 text-xs text-white hover:bg-red-500 hover:border-red-500 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
