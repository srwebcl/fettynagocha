import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Removido output: 'export' para habilitar Vercel Serverless Functions (API Routes)
  // Removido images.unoptimized para usar el optimizador nativo de Vercel
};

export default nextConfig;
