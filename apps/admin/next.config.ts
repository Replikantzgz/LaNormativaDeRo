import type { NextConfig } from "next";

// El panel se sirve bajo /admin (servicio "admin" en vercel.json).
// basePath hace que enlaces, assets (/admin/_next/...) y redirecciones lleven el prefijo.
const nextConfig: NextConfig = {
  basePath: "/admin",
};

export default nextConfig;
