import { useState, useEffect } from "react";
import Image from "next/image";
import CommentSection from "./CommentSection";
import { X } from "lucide-react";
import { useSession } from "next-auth/react";

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
  const { data: session } = useSession();

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-black border-4 border-cyan-400"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 border-2 border-white bg-black p-2 hover:bg-cyan-400 hover:border-cyan-400 transition-all group"
        >
          <X className="w-6 h-6 text-white group-hover:text-black transition-colors" />
        </button>

        {/* Asset Info */}
        <div className="border-b-4 border-cyan-400 p-6 bg-zinc-900">
          <h2 className="text-xl md:text-2xl text-white mb-4">{asset.title}</h2>
          <p className="text-[10px] text-white/60 leading-loose">
            {asset.description}
          </p>
        </div>

        <div className="p-6">
          {/* Showcase */}
          <div className="space-y-8">
            <div className="relative border-4 border-white">
              <div className="absolute top-0 left-0 w-3 h-3 bg-white z-10"></div>
              <div className="absolute top-0 right-0 w-3 h-3 bg-white z-10"></div>
              <div className="absolute bottom-0 left-0 w-3 h-3 bg-white z-10"></div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-white z-10"></div>
              {activeItem.type === "image" ? (
                <Image
                  src={activeItem.url}
                  alt={asset.title}
                  width={800}
                  height={600}
                  className="w-full"
                />
              ) : (
                <video src={activeItem.url} controls className="w-full" />
              )}
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2 overflow-x-auto">
              {asset.showcase.map((item, index) => (
                <Image
                  key={item.url}
                  src={item.url}
                  alt={`Preview ${index}`}
                  width={100}
                  height={100}
                  className="h-16 w-auto cursor-pointer border-2 border-white p-6 bg-zinc-900"
                  onClick={() => setActiveIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Download Button */}
        <div className="border-t-4 border-cyan-400 bg-black p-6">
          <a
            href={session ? `/api/assets/${asset._id}/download` : `/auth`}
            className="inline-block px-6 py-3 border-4 border-white bg-black text-white hover:bg-cyan-400 hover:border-cyan-400 hover:text-black transition-all"
          >
            {session ? "> Download" : "> Sign in to Download"}
          </a>
        </div>

        {/* now show comments underneath */}
        <CommentSection assetId={asset._id} />
      </div>
    </div>
  );
}
