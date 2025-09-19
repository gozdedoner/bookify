"use client";
import QuickSearch from "../components/QuickSearch";
import BookCard from "../components/BookCard";

export default function HomePage() {
  const sampleBooks = [
    {
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      cover: "https://covers.openlibrary.org/b/id/6519016-L.jpg",
    },
    {
      title: "1984",
      author: "George Orwell",
      cover: "https://covers.openlibrary.org/b/id/7222246-L.jpg",
    },
    {
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      cover: "https://covers.openlibrary.org/b/id/9870932-L.jpg",
    },
    {
      title: "Brave New World", // Değiştirildi
      author: "Aldous Huxley", // Değiştirildi
      cover: "https://covers.openlibrary.org/b/id/12673998-L.jpg", // ✅ Yeni ve farklı bir URL
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

        {/* Quick Search (Client Component) */}
        <QuickSearch />
      </div>

      {/* Books Grid */}
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {sampleBooks.map((book, i) => (
          <BookCard key={i} {...book} />
        ))}
      </div>
    </div>
  );
}
