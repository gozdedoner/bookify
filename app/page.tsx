"use client";
import QuickSearch from "../components/QuickSearch";
import BookCard from "../components/BookCard";
import { Book } from "./types"; // Book tipini ekle

export default function HomePage() {
  const sampleBooks: Book[] = [
    {
      id: "gatsby",
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      cover: "https://covers.openlibrary.org/b/id/6519016-L.jpg",
    },
    {
      id: "1984",
      title: "1984",
      author: "George Orwell",
      cover: "https://covers.openlibrary.org/b/id/7222246-L.jpg",
    },
    {
      id: "mockingbird",
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      cover: "https://covers.openlibrary.org/b/id/9870932-L.jpg",
    },
    {
      id: "bravenewworld",
      title: "Brave New World",
      author: "Aldous Huxley",
      cover: "https://covers.openlibrary.org/b/id/12673998-L.jpg",
    },
  ];

  return (
    <div className="p-8">
      {/* Hero Section */}
      <div className="text-center mb-8">
        <h1 className="text-5xl font-extrabold text-pink-400 drop-shadow-lg">
          📚 Bookify
        </h1>
        <p className="text-gray-300 mt-3 text-lg">
          Discover, explore, and save your favorite books.
        </p>

        {/* Quick Search */}
        <QuickSearch />
      </div>

      {/* Books Grid */}
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {sampleBooks.map((book) => (
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
