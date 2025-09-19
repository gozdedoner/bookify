"use client";
import Image from "next/image"; // 1. Image bileşenini import edin

type BookCardProps = {
  id: string;
  title: string;
  author: string;
  cover?: string;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  onRemove?: () => void;
};

export default function BookCard({
  title,
  author,
  cover,
  isFavorite,
  onToggleFavorite,
  onRemove,
}: BookCardProps) {
  return (
    <div className="relative bg-gray-900 p-4 rounded-lg shadow hover:shadow-lg transition">
      {cover ? (
        // 2. <img> yerine <Image> kullanın
        <Image
          src={cover}
          alt={title}
          width={400} // 3. Genişlik ve yükseklik eklemek zorunludur
          height={600} // Bunlar resmin oranını korumak içindir
          className="w-full h-60 object-cover rounded-md"
        />
      ) : (
        <div className="w-full h-60 bg-gray-700 flex items-center justify-center text-gray-400">
          No Image
        </div>
      )}

      <h3 className="mt-3 text-lg font-bold text-pink-400">{title}</h3>
      <p className="text-gray-400 text-sm">{author}</p>

      {/* ❤️ Favori butonu */}
      {onToggleFavorite && (
        <button
          onClick={onToggleFavorite}
          className="absolute top-2 right-10 text-xl"
        >
          {isFavorite ? "❤️" : "🤍"}
        </button>
      )}

      {/* ❌ Silme butonu */}
      {onRemove && (
        <button
          onClick={onRemove}
          className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xl"
        >
          ❌
        </button>
      )}
    </div>
  );
}
