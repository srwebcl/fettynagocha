import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Removido output: 'export' para habilitar Vercel Serverless Functions (API Routes)
  // Removido images.unoptimized para usar el optimizador nativo de Vercel
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [60, 70, 75, 80, 90, 100],
  },
};

export default nextConfig;
