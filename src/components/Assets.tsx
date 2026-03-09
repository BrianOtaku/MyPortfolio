import { useEffect, useState } from "react";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
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

export function Assets() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

  useEffect(() => {
    fetch("/api/assets")
      .then((res) => res.json())
      .then(setAssets);
  }, []);

  return (
    <section className="bg-zinc-900 py-20 relative">
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block border-4 border-cyan-400 p-6 bg-black mb-8 relative">
            <div className="absolute -top-2 -left-2 w-4 h-4 bg-white"></div>
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-white"></div>
            <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-white"></div>
            <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-white"></div>
            <h2 className="text-1xl md:text-5xl text-white">
              &gt; ASSET PACKS &lt;
            </h2>
          </div>
          <p className="text-xs text-white/60 max-w-2xl mx-auto leading-loose">
            A collection of my digital assets and animations. Click on any item
            to view details and download links.
          </p>
        </div>

        {/* Asset Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {assets.map((asset) => {
            const imageUrl =
              asset.showcase && asset.showcase[0]?.url
                ? asset.showcase[0].url
                : "";
            return (
              <div
                key={asset._id}
                className="group relative cursor-pointer"
                onClick={() => setSelectedAsset(asset)}
              >
                {/* Card Container */}
                <div className="border-4 border-white bg-black overflow-hidden relative group-hover:border-white group-hover:shadow-[0_0_20px_rgba(255,255,255,0.5)] transition-all duration-200">
                  {/* Corner pixels */}
                  <div className="absolute top-0 left-0 w-3 h-3 bg-white z-20"></div>
                  <div className="absolute top-0 right-0 w-3 h-3 bg-white z-20"></div>
                  <div className="absolute bottom-0 left-0 w-3 h-3 bg-white z-20"></div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-white z-20"></div>

                  {/* Image */}
                  <div className="aspect-square overflow-hidden relative bg-zinc-800">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={asset.title}
                        width={500}
                        height={500}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        style={{ imageRendering: "auto" }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        No Image
                      </div>
                    )}

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-80 transition-opacity duration-300">
                      <div className="flex items-center justify-center h-full gap-4">
                        <div className="flex items-center justify-center h-full gap-4">
                          <a
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="border-2 border-white p-3 bg-black hover:bg-white transition-colors group/btn"
                          >
                            <ExternalLink className="w-6 h-6 text-white group-hover/btn:text-black transition-colors" />
                          </a>
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="border-2 border-white p-3 bg-black hover:bg-white transition-colors group/btn"
                          >
                            <Github className="w-6 h-6 text-white group-hover/btn:text-black transition-colors" />
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Scanlines effect on hover */}
                    <div className="scanlines absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                  </div>

                  {/* Info */}
                  <div className="p-4 bg-black border-t-4 border-white">
                    <h3 className="text-sm text-white mb-2">{asset.title}</h3>
                    <p className="text-[8px] text-white/60 leading-loose">
                      {asset.description.length > 50
                        ? asset.description.slice(0, 50) + "..."
                        : asset.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Load More */}
      {/* <div className="text-center mt-12">
        <button className="border-4 border-white bg-black px-8 py-4 text-xs text-white hover:bg-white hover:text-black transition-all duration-200">
          LOAD MORE
        </button>
      </div> */}

      {/* Scanlines overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-5 scanlines"></div>

      {selectedAsset && (
        <AssetModal
          asset={selectedAsset}
          onClose={() => setSelectedAsset(null)}
        />
      )}
    </section>
  );
}
