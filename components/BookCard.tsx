"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Book } from "../app/types";

type BookCardProps = Book & {
  onRemove?: () => void;
};

export default function BookCard({
  id,
  title,
  author,
  cover,
  onRemove,
}: BookCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    if (saved) {
      const favorites: Book[] = JSON.parse(saved);
      setIsFavorite(favorites.some((book) => book.id === id));
    }
  }, [id]);

  const toggleFavorite = () => {
    const saved = localStorage.getItem("favorites");
    let favorites: Book[] = saved ? JSON.parse(saved) : [];

    if (isFavorite) {
      favorites = favorites.filter((book) => book.id !== id);
    } else {
      favorites.push({ id, title, author, cover });
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="bg-gray-900 p-4 rounded-lg shadow-lg relative">
      <Image
        src={!cover || imgError ? "/placeholder.png" : cover}
        alt={title}
        width={200}
        height={300}
        className="w-full h-60 object-cover rounded"
        onError={() => setImgError(true)} // 🚨 hata olursa placeholder göster
      />

      <h3 className="text-lg font-bold text-pink-400 mt-3">{title}</h3>
      <p className="text-gray-400">{author}</p>

      {onRemove ? (
        <button
          onClick={onRemove}
          className="absolute top-2 right-2 text-red-500 hover:text-red-700"
        >
          ❌
        </button>
      ) : (
        <button
          onClick={toggleFavorite}
          className="absolute top-2 right-2 text-xl"
        >
          {isFavorite ? "❤️" : "🤍"}
        </button>
      )}
    </div>
  );
}
