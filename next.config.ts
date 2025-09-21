import type { NextConfig } from "next";

const config: NextConfig = {
  output: "export", // ✅ GitHub Pages için statik export
  images: {
    unoptimized: true, // ✅ next/image hatalarını önlemek için
    remotePatterns: [
      {
        protocol: "https",
        hostname: "covers.openlibrary.org",
        port: "",
        pathname: "/b/id/**",
      },
    ],
  },
  basePath: "/bookify", // ✅ repo adını yaz (senin repo adı "bookify")
  assetPrefix: "/bookify/",
};

export default config;
