"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav
      className="sticky top-0 z-50 flex items-center justify-between 
      px-6 py-3 
      bg-pink-500/10 backdrop-blur-xl 
      border-b border-pink-400/30 
      shadow-lg"
    >
      {/* Logo */}
      <Link href="/" className="text-2xl font-bold text-pink-400 drop-shadow-lg">
        📚 Bookify
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-6 text-gray-200 font-medium">
        <Link href="/" className="hover:text-pink-400 transition">
          Home
        </Link>
        <Link href="/search" className="hover:text-pink-400 transition">
          Search
        </Link>
        <Link href="/library" className="hover:text-pink-400 transition">
          Library
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button className="md:hidden text-pink-400" onClick={() => setOpen(!open)}>
        {open ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Dropdown */}
      {open && (
        <div
          className="absolute top-full right-0 w-1/2 
          bg-pink-500/10 backdrop-blur-xl
          p-4 flex flex-col gap-4 
          border-l border-pink-400/30 
          shadow-xl md:hidden"
        >
          <Link
            href="/"
            className="hover:text-pink-400 transition"
            onClick={() => setOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/search"
            className="hover:text-pink-400 transition"
            onClick={() => setOpen(false)}
          >
            Search
          </Link>
          <Link
            href="/library"
            className="hover:text-pink-400 transition"
            onClick={() => setOpen(false)}
          >
            Library
          </Link>
        </div>
      )}
    </nav>
  );
}
