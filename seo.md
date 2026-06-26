# seo.md — Estrategia SEO Local
## Proyecto: Piscinas Fettyna Gocha

---

## Palabras Clave Objetivo

### Primarias (alto volumen, alta intención de compra)
| Keyword | Intención | Prioridad |
|---------|-----------|-----------|
| piscinas coquimbo | Transaccional | 🔴 Alta |
| piscinas de fibra de vidrio coquimbo | Transaccional | 🔴 Alta |
| instalacion de piscinas coquimbo | Transaccional | 🔴 Alta |
| fabrica de piscinas coquimbo | Transaccional | 🔴 Alta |
| piscinas la serena | Transaccional | 🔴 Alta |

### Secundarias (long tail, menor competencia)
| Keyword | Intención |
|---------|-----------|
| piscinas fibra de vidrio precios chile | Comercial |
| casco de piscina fibra de vidrio | Informacional |
| piscina rectangular fibra de vidrio | Comercial |
| piscina riñon fibra de vidrio | Comercial |
| revestimiento fulget piscina | Informacional |
| cuanto cuesta instalar una piscina en chile | Informacional |
| piscinas a credito coquimbo | Transaccional |

---

## Metadata por Sección

### Página Principal
```html
<title>Piscinas Fettyna Gocha | Fabricación e Instalación en Coquimbo</title>
<meta name="description" content="Líderes en fabricación e instalación de piscinas de fibra de vidrio en Coquimbo. +10 modelos desde $1.090.000. Instalación completa, revestimiento fulget y accesorios. ¡Cotiza gratis!">
<link rel="canonical" href="https://fettynagocha.cl/" />
```

### Open Graph
```html
<meta property="og:title" content="Piscinas Fettyna Gocha | Coquimbo" />
<meta property="og:description" content="Fabricación e instalación de piscinas de fibra de vidrio en la región de Coquimbo. +10 años de experiencia." />
<meta property="og:image" content="https://fettynagocha.cl/images/og-image.jpg" />
<meta property="og:url" content="https://fettynagocha.cl" />
<meta property="og:type" content="website" />
<meta property="og:locale" content="es_CL" />
```

---

## Schema.org — JSON-LD (Obligatorio)

### LocalBusiness Schema
```json
{
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
}
```

### Product Schema (por modelo — generado dinámicamente)
```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Piscina Rectangular 4.80×2.80 mts",
  "description": "Piscina de fibra de vidrio rectangular, 4.80m de largo por 2.80m de ancho, profundidad 1.10 a 1.35 mts.",
  "brand": {"@type": "Brand", "name": "Fettyna Gocha"},
  "offers": {
    "@type": "Offer",
    "priceCurrency": "CLP",
    "price": "2790000",
    "priceValidUntil": "2025-03-31",
    "availability": "https://schema.org/InStock",
    "url": "https://fettynagocha.cl/#modelos"
  }
}
```

---

## Velocidad de Carga — Factores SEO

```
✅ HTML pre-renderizado (SSG) = TTFB ~50ms desde CDN Vercel
✅ Imágenes WebP + next/image = compresión automática
✅ Fuentes con next/font = sin layout shift
✅ 0 JavaScript innecesario = bundle mínimo
✅ Core Web Vitals ≥ 90 = ranking boost Google
```

---

## SEO Local — Google My Business

Recomendaciones para el dueño (fuera del código):
1. Reclamar/verificar ficha en Google My Business con mismo NAP (Name, Address, Phone).
2. Agregar fotos de trabajos realizados mensualmente.
3. Responder a todas las reseñas (positivas y negativas).
4. Mantener horarios actualizados en temporada alta.
5. Publicar en el perfil de Google cada 2 semanas.

---

## Headings Structure (H1-H6)

```
H1: "Expertos en fabricación e instalación de Piscinas en Coquimbo"  ← Solo uno por página
H2: "Nuestros Servicios"
H2: "Modelos de Piscinas"
H3: [Nombre de cada modelo] × 11
H2: "Solicita tu Cotización Gratis"
H2: "¿Por qué elegirnos?"
```

---

## Robots.txt

```
User-agent: *
Allow: /
Disallow: /api/

Sitemap: https://fettynagocha.cl/sitemap.xml
```

## Sitemap.xml (generado por Next.js)

```typescript
// src/app/sitemap.ts
export default function sitemap() {
  return [
    {
      url: 'https://fettynagocha.cl',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}
```
