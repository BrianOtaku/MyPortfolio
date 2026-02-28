"use client";

import { useEffect, useState } from "react";

interface Asset {
  _id: string;
  title: string;
  description: string;
  fileUrl: string;
}

export default function AssetList() {
  const [assets, setAssets] = useState<Asset[]>([]);

  useEffect(() => {
    fetch("/api/assets")
      .then((res) => res.json())
      .then(setAssets);
  }, []);

  return (
    <div className="grid grid-cols-3 gap-6">
      {assets.map((asset: Asset) => (
        <div key={asset._id} className="border p-4 rounded">
          <h3 className="font-bold">{asset.title}</h3>
          <p className="text-sm text-gray-500">
            {asset.description}
          </p>
          <a
            href={asset.fileUrl}
            download
            target="_blank"
            className="text-blue-500 mt-2 inline-block"
          >
            Download
          </a>
        </div>
      ))}
    </div>
  );
}