import type { NextConfig } from "next";

const config: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "covers.openlibrary.org",
        pathname: "/b/id/**", // OpenLibrary için
      },
      {
        protocol: "https",
        hostname: "books.google.com",
        pathname: "/**", // Google Books için
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**", // Google CDN için
      },
    ],
  },
};

export default config;
