"use client";

import { useState } from "react";
import Image from "next/image";
import CommentSection from "./CommentSection";

interface Showcase {
  type: "image" | "video";
  url: string;
}

interface Asset {
  _id: string;
  title: string;
  description: string;
  showcase: Showcase[];
}

interface Props {
  asset: Asset;
  onClose: () => void;
}

export default function AssetModal({ asset, onClose }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeItem = asset.showcase[activeIndex];

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-4xl rounded-lg p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500"
        >
          ✕
        </button>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Showcase */}
          <div>
            {activeItem.type === "image" ? (
              <Image
                src={activeItem.url}
                alt={asset.title}
                width={800}
                height={600}
                className="w-full rounded"
              />
            ) : (
              <video src={activeItem.url} controls className="w-full rounded" />
            )}

            {/* Thumbnails */}
            <div className="flex gap-2 mt-4 overflow-x-auto">
              {asset.showcase.map((item, index) => (
                <Image
                  key={item.url}
                  src={item.url}
                  alt={`Preview ${index}`}
                  width={100}
                  height={100}
                  className="h-16 w-auto rounded cursor-pointer"
                  onClick={() => setActiveIndex(index)}
                />
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <h2 className="text-2xl font-bold mb-4">{asset.title}</h2>
            <p className="text-gray-600 mb-6">{asset.description}</p>

            <a
              href={`/api/assets/${asset._id}/download`}
              className="px-6 py-3 bg-black text-white rounded inline-block"
            >
              Download
            </a>
          </div>
        </div>

        {/* now show comments underneath */}
        <CommentSection assetId={asset._id} />
      </div>
    </div>
  );
}
