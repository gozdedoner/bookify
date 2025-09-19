"use client";
import { useState, useEffect } from "react";
import BookCard from "../../components/BookCard";
import { Book } from "../../types";

export default function LibraryPage() {
  const [favorites, setFavorites] = useState<Book[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  const removeBook = (id: string) => {
    const updated = favorites.filter((book) => book.id !== id);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-pink-400 mb-6">📚 My Library</h1>

      {favorites.length === 0 ? (
        <p className="text-gray-400">No favorite books yet.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {favorites.map((book) => (
            <BookCard
              key={book.id}
              {...book}
              onRemove={() => removeBook(book.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
