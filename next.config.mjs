// Static export so the site can be hosted on GitHub Pages.
// When deployed to https://<user>.github.io/<repo>, the workflow sets
// NEXT_PUBLIC_BASE_PATH=/<repo>. Locally it stays empty.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath,
  assetPrefix: basePath || undefined,
};

export default nextConfig;
