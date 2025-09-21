"use client";
import { useState } from "react";
import BookCard from "../../components/BookCard";
import { Book } from "../../types";


// ✅ Google Books API için tip tanımı
type GoogleBookItem = {
  id: string;
  volumeInfo: {
    title?: string;
    authors?: string[];
    imageLinks?: {
      thumbnail?: string;
    };
  };
};

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);

  // API'den kitapları getir
  const fetchBooks = async (q: string) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${q}`
      );
      const data = await res.json();

      // ✅ any yerine GoogleBookItem kullanıyoruz
      const mappedBooks: Book[] = (data.items || []).map(
        (item: GoogleBookItem) => ({
          id: item.id,
          title: item.volumeInfo.title || "Unknown Title",
          author: item.volumeInfo.authors
            ? item.volumeInfo.authors.join(", ")
            : "Unknown Author",
          cover: item.volumeInfo.imageLinks?.thumbnail,
        })
      );

      setBooks(mappedBooks);
    } catch (err) {
      console.error("API hatası:", err);
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

      {/* Loading */}
      {loading && <p className="text-gray-400">Loading...</p>}

      {/* Results */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {books.map((book) => (
          <BookCard
            key={book.id}
            id={book.id}
            title={book.title}
            author={book.author}
            cover={book.cover}
          />
        ))}
      </div>
    </div>
  );
}
