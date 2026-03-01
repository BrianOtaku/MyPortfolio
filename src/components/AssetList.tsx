"use client";

import { useEffect, useState } from "react";
import AssetModal from "./AssetModal";

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

export default function AssetList() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

  useEffect(() => {
    fetch("/api/assets")
      .then((res) => res.json())
      .then(setAssets);
  }, []);

  return (
    <>
      <div className="grid md:grid-cols-3 gap-6">
        {assets.map((asset) => (
          <div
            key={asset._id}
            onClick={() => setSelectedAsset(asset)}
            className="border p-4 rounded cursor-pointer hover:shadow-lg transition"
          >
            <h3 className="font-bold">{asset.title}</h3>
            <p className="text-sm text-gray-500">{asset.description}</p>
          </div>
        ))}
      </div>

      {selectedAsset && (
        <AssetModal
          asset={selectedAsset}
          onClose={() => setSelectedAsset(null)}
        />
      )}
    </>
  );
}
