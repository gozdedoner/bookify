"use client";
import { useEffect, useState } from "react";

export default function BookDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [book, setBook] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);

  // Kitap detayını çek
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`);
        const data = await res.json();
        setBook(data);
      } catch (err) {
        console.error("Error fetching book:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  // Favorileri yükle
  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    if (saved) {
      const favs = JSON.parse(saved);
      setFavorites(favs);
      setIsFavorite(favs.some((b: any) => b.id === id));
    }
  }, [id]);

  // Favori toggle
  const toggleFavorite = () => {
    let updated = [...favorites];
    if (isFavorite) {
      updated = updated.filter((b) => b.id !== id);
    } else {
      updated.push({
        id,
        title: book.volumeInfo.title,
        author: book.volumeInfo.authors?.join(", ") || "Unknown",
        cover: book.volumeInfo.imageLinks?.thumbnail,
      });
    }
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
    setIsFavorite(!isFavorite);
  };

  if (loading) return <p className="p-6 text-gray-400">Loading book details...</p>;
  if (!book) return <p className="p-6 text-red-400">Book not found.</p>;

  const info = book.volumeInfo;

  return (
    <div className="p-6 max-w-3xl mx-auto relative">
      {/* Favori butonu */}
      <button
        onClick={toggleFavorite}
        className="absolute top-6 right-6 text-3xl"
      >
        {isFavorite ? "❤️" : "🤍"}
      </button>

      <h1 className="text-4xl font-bold text-pink-400 mb-4">{info.title}</h1>
      <p className="text-gray-300 mb-2">
        <strong>Author:</strong> {info.authors?.join(", ") || "Unknown"}
      </p>
      <p className="text-gray-300 mb-4">
        <strong>Published:</strong> {info.publishedDate || "N/A"}
      </p>

      {info.imageLinks?.thumbnail && (
        <img
          src={info.imageLinks.thumbnail}
          alt={info.title}
          className="rounded-lg shadow-lg mb-6"
        />
      )}

      <p className="text-gray-200 leading-relaxed">
        {info.description || "No description available."}
      </p>

      {info.previewLink && (
        <a
          href={info.previewLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-6 px-4 py-2 bg-pink-500 hover:bg-pink-600 
                     rounded-lg text-white font-semibold transition"
        >
          Preview on Google Books
        </a>
      )}
    </div>
  );
}
