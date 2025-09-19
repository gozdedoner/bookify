"use client";
import { useState, useEffect } from "react";
import BookCard from "../../components/BookCard";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // İlk açılışta localStorage'dan favoriler
  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  // Favori ekle/çıkar
  const toggleFavorite = (book: any) => {
    let updated = [...favorites];
    const exists = updated.find((b) => b.id === book.id);

    if (exists) {
      updated = updated.filter((b) => b.id !== book.id);
    } else {
      updated.push(book);
    }

    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  // Kitap ara
  const fetchBooks = async (q: string) => {
    setLoading(true);
    try {
      const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${q}`);
      const data = await res.json();
      setBooks(data.items || []);
    } catch (err) {
      console.error("API error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Form submit
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      fetchBooks(query);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-pink-400 mb-6">🔎 Search Books</h1>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title or author..."
          className="flex-1 px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-pink-500 hover:bg-pink-600 rounded-lg text-white font-semibold transition"
        >
          Search
        </button>
      </form>

      {loading && <p className="text-gray-400">Loading...</p>}

      {/* Results */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {books.map((book) => {
          const info = book.volumeInfo;
          const bookData = {
            id: book.id,
            title: info.title,
            author: info.authors ? info.authors.join(", ") : "Unknown",
            cover: info.imageLinks?.thumbnail,
          };

          const isFavorite = favorites.some((b) => b.id === book.id);

          return (
            <BookCard
              key={book.id}
              {...bookData}
              isFavorite={isFavorite}
              onToggleFavorite={() => toggleFavorite(bookData)}
            />
          );
        })}
      </div>
    </div>
  );
}
