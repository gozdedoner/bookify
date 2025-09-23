"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import BookCard from "../../components/BookCard";
import { Book, GoogleApiResponse, GoogleBookItem } from "@/app/types";

export default function SearchPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  // API'den kitapları getir
  const fetchBooks = async (q: string) => {
    setLoading(true);
    setSearched(true);
    setBooks([]);
    try {
      const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${q}`
      );
      const data: GoogleApiResponse = await res.json();

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

  // Sayfa açıldığında query varsa otomatik arama yap
  useEffect(() => {
    if (query.trim()) {
      fetchBooks(query);
    }
  }, [query]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-pink-400 mb-6">🔎 Search Books</h1>

      {loading && <p className="text-center text-gray-400">Loading...</p>}

      {!loading && searched && books.length === 0 && (
        <p className="text-center text-gray-400">
          {`No books found for "${query}".`}
        </p>
      )}

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
