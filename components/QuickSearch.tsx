"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function QuickSearch() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${query}`);
    }
  };

  return (
    <form onSubmit={handleQuickSearch} className="mt-6 flex justify-center">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Quick search..."
        className="w-1/2 px-3 py-2 rounded-lg bg-gray-800 text-white text-sm 
                   focus:outline-none focus:ring-1 focus:ring-pink-400"
      />
    </form>
  );
}
