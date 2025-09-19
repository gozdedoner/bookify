"use client";

import { useEffect, useState } from "react";
import BookCard from "../../components/BookCard";
import { Book } from "../../types"; // ✅ types.ts'ten Book tipini import ettik

export default function LibraryPage() {
  const [favorites, setFavorites] = useState<Book[]>([]); // ✅ any yerine Book[]

  // LocalStorage'dan favorileri çek
  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  // Tek tek favoriden silme
  const removeFavorite = (id: string) => {
    const updated = favorites.filter((book) => book.id !== id);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  // Tümünü temizleme
  const clearFavorites = () => {
    setFavorites([]);
    localStorage.removeItem("favorites");
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-pink-400 mb-6">📚 My Library</h1>

      {favorites.length === 0 ? (
        <p className="text-gray-400">No favorite books yet.</p>
      ) : (
        <>
          {/* Temizleme butonu */}
          <div className="flex justify-end mb-4">
            <button
              onClick={clearFavorites}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
            >
              Clear All
            </button>
          </div>

          {/* Favoriler listesi */}
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {favorites.map((book) => (
              <BookCard
                key={book.id}
                id={book.id}
                title={book.title}
                author={book.author}
                cover={book.cover}
                onRemove={() => removeFavorite(book.id)} // ✅ tek tek silme
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
