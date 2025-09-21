"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Book } from "../../types";
export default function BookDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null); // ✅ Book veya null
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) return;

    const fetchBook = async () => {
      try {
        const res = await fetch(
          `https://www.googleapis.com/books/v1/volumes/${id}`
        );
        const data = await res.json();

        const mappedBook: Book = {
          id: data.id,
          title: data.volumeInfo.title || "Unknown Title",
          author: data.volumeInfo.authors
            ? data.volumeInfo.authors.join(", ")
            : "Unknown Author",
          cover: data.volumeInfo.imageLinks?.thumbnail,
        };

        setBook(mappedBook);
      } catch (err) {
        console.error("Book fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) return <p className="text-gray-400">Loading...</p>;
  if (!book) return <p className="text-gray-400">Book not found.</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-pink-400 mb-4">{book.title}</h1>
      <p className="text-gray-300 mb-6">By {book.author}</p>

      {book.cover ? (
        <Image
          src={book.cover}
          alt={book.title}
          width={300}
          height={450}
          className="rounded-lg shadow-lg"
        />
      ) : (
        <div className="w-[300px] h-[450px] bg-gray-700 flex items-center justify-center text-gray-400 rounded-lg">
          No Image
        </div>
      )}
    </div>
  );
}
