import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import WhatsAppButton from "@/components/WhatsAppButton";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://fettynagocha.cl'),
  title: 'Piscinas Fettyna Gocha | Fabricación e Instalación en Coquimbo',
  description: 'Líderes en fabricación e instalación de piscinas de fibra de vidrio en la región de Coquimbo. +10 modelos disponibles. Cotiza gratis hoy.',
  keywords: ['piscinas coquimbo', 'piscinas fibra de vidrio', 'instalacion piscinas la serena', 'fabrica piscinas coquimbo', 'fettyna gocha'],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    url: 'https://fettynagocha.cl',
    siteName: 'Piscinas Fettyna Gocha',
    title: 'Piscinas Fettyna Gocha | Coquimbo',
    description: 'Fabricación e instalación de piscinas de fibra de vidrio en la región de Coquimbo. +10 años de experiencia.',
    images: [
      {
        url: 'https://fettynagocha.cl/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Piscinas Fettyna Gocha',
      }
    ],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Piscinas Fettyna Gocha",
  "description": "Empresa dedicada a la fabricación e instalación de piscinas de fibra de vidrio en la región de Coquimbo, Chile.",
  "url": "https://fettynagocha.cl",
  "telephone": "+56968787511",
  "email": "contacto@fettynagocha.cl",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Ruta 5 Norte Km. 465",
    "addressLocality": "Coquimbo",
    "addressRegion": "Región de Coquimbo",
    "addressCountry": "CL"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": -29.9533,
    "longitude": -71.3395
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
      "opens": "09:00",
      "closes": "18:00"
    }
  ],
  "sameAs": [
    "https://web.facebook.com/fettynagochapiscinas",
    "https://www.instagram.com/piscinasfettynagocha/"
  ],
  "priceRange": "$$",
  "areaServed": [
    {"@type": "State", "name": "Región de Coquimbo"},
    {"@type": "State", "name": "Región de Atacama"}
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} h-full scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
