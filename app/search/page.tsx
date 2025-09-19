"use client";
import { useState } from "react";
import BookCard from "../../components/BookCard";
import { Book } from "../../types";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchBooks = async (q: string) => {
    setLoading(true);
    try {
      const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${q}`);
      const data = await res.json();

      const mapped: Book[] = (data.items || []).map((item: any) => ({
        id: item.id,
        title: item.volumeInfo.title,
        author: item.volumeInfo.authors ? item.volumeInfo.authors.join(", ") : "Unknown",
        cover: item.volumeInfo.imageLinks?.thumbnail,
      }));

      setBooks(mapped);
    } catch (err) {
      console.error("API error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) fetchBooks(query);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-pink-400 mb-6">🔎 Search Books</h1>

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

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {books.map((book) => (
          <BookCard key={book.id} {...book} />
        ))}
      </div>
    </div>
  );
}
