import type { NextConfig } from "next";

// Set only while previewing on the GitHub Pages project URL. Unset once
// crystalwatersplumbing.com.au is cut over, since the site then serves from /.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
