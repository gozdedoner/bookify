"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function QuickSearch() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 justify-center mt-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search books..."
        className="px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-pink-400"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-pink-500 hover:bg-pink-600 rounded-lg text-white font-semibold transition"
      >
        Search
      </button>
    </form>
  );
}
