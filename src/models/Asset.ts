import mongoose, { Document } from "mongoose";

export interface IShowcase {
  type: "image" | "video";
  url: string;
  publicId: string;
}

export interface IAsset extends Document {
  title: string;
  description: string;
  zipUrl: string;
  zipPublicId: string;
  showcase: IShowcase[];
  createdAt: Date;
  updatedAt: Date;
}

const AssetSchema = new mongoose.Schema<IAsset>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },

    zipUrl: { type: String, required: true },
    zipPublicId: { type: String, required: true },

    showcase: [
      {
        type: {
          type: String,
          enum: ["image", "video"],
          required: true,
        },
        url: { type: String, required: true },
        publicId: { type: String, required: true },
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.models.Asset ||
  mongoose.model<IAsset>("Asset", AssetSchema);
