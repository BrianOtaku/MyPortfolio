import mongoose, { Document } from "mongoose";

export interface IShowcase {
  type: "image" | "video";
  url: string;
  publicId: string;
}

export interface IAsset extends Document {
  title: string;
  description: string;
  gitUrl: string;
  itchUrl: string;
  fileUrl: string;
  publicId: string;
  showcase: IShowcase[];
  downloads: number;
  createdAt: Date;
  updatedAt: Date;
}

const AssetSchema = new mongoose.Schema<IAsset>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },

    gitUrl: { type: String, required: true },
    itchUrl: { type: String, required: true },
    fileUrl: { type: String, required: true },
    publicId: { type: String, required: true },

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

    downloads: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export default mongoose.models.Asset ||
  mongoose.model<IAsset>("Asset", AssetSchema);
