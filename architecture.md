# architecture.md — Arquitectura Técnica
## Proyecto: Piscinas Fettyna Gocha

---

## Diagrama de Alto Nivel

```
┌─────────────────────────────────────────────────────────────────┐
│                         USUARIO FINAL                           │
│                  (Celular o Desktop, Chile)                     │
└────────────────────────┬────────────────────────────────────────┘
                         │ HTTPS
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                       VERCEL CDN                                │
│           Edge Network — < 0.5s tiempo de carga                │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │              NEXT.JS 15 — SSG                            │   │
│  │                                                          │   │
│  │  /          → page.tsx (HTML estático pre-generado)      │   │
│  │  /api/cotizar → route.ts (Serverless Function)           │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                         │ POST /api/cotizar
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                      RESEND API                                 │
│              Envío de email transaccional                       │
│          → contacto@fettynagocha.cl (dueño)                    │
└─────────────────────────────────────────────────────────────────┘

Flujo WhatsApp:
Usuario → Click botón → wa.me/56968787511?text=... → WhatsApp App
```

---

## Next.js 15 — Configuración SSG

```typescript
// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',           // Static Site Generation
  trailingSlash: true,        // Compatibilidad con Vercel
  images: {
    unoptimized: false,       // Vercel Image Optimization activa
  },
}

export default nextConfig
```

> **Importante:** `output: 'export'` genera HTML estático. Las API Routes
> (`/api/cotizar`) son Serverless Functions en Vercel y NO se incluyen en
> el export estático — se ejecutan en el edge de Vercel.

---

## Flujo de Cotización

```
1. Usuario completa QuoteForm (componente cliente React)
2. Submit → fetch('/api/cotizar', { method: 'POST', body: JSON })
3. API Route valida campos (Zod o validación manual)
4. API Route llama a Resend → send({ to: OWNER_EMAIL, ... })
5. Resend entrega email al dueño en segundos
6. API Route responde { success: true }
7. UI muestra mensaje de éxito + CTA WhatsApp
```

---

## Flujo WhatsApp Trackeado

```typescript
// src/components/WhatsAppButton.tsx
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER

const generateWhatsAppUrl = (modelName?: string) => {
  const message = modelName
    ? `Hola, quiero cotizar la ${modelName}`
    : 'Hola, quiero cotizar una piscina'
  
  const params = new URLSearchParams({
    utm_source: 'web',
    utm_medium: 'boton_wsp',
    utm_campaign: 'cotizacion',
  })
  
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
  // Los UTM params se agregan a la URL de la página, no al link de WA
}
```

---

## Estructura de Datos — Sin Base de Datos

```
/src/data/models.ts
  └── POOL_MODELS: PoolModel[]    ← Array estático, fuente de verdad

Al hacer build de Next.js:
  → page.tsx importa POOL_MODELS
  → Genera HTML estático con todos los modelos renderizados
  → 0 queries a base de datos en runtime
  → Carga instantánea para el usuario
```

---

## Renderizado de Secciones — page.tsx

```
page.tsx (Server Component, SSG)
├── <Navbar />                    ← Sticky, links de ancla
├── <Hero />                      ← CTA principal + imagen portada
├── <Services />                  ← 5 servicios en cards
├── <Models />                    ← Grid de ModelCard (datos de models.ts)
│   └── <ModelCard model={...} /> × 11 modelos
├── <QuoteForm />                 ← Client Component ("use client")
├── <Footer />
└── <WhatsAppButton />            ← Fixed bottom-right
```

---

## Secciones y Anchors

| Sección | ID de ancla | Descripción |
|---------|-------------|-------------|
| Hero | `#inicio` | Banner principal |
| Servicios | `#servicios` | 5 servicios de la empresa |
| Modelos | `#modelos` | Grid de piscinas con precios |
| Cotizar | `#cotizar` | Formulario de contacto |
| Footer | — | Info de contacto y legal |

---

## Dependencias npm (v1)

```json
{
  "dependencies": {
    "next": "^15.0.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "resend": "^3.0.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "@types/node": "^20.0.0",
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0",
    "tailwindcss": "^3.4.0",
    "postcss": "^8.0.0",
    "autoprefixer": "^10.0.0",
    "eslint": "^8.0.0",
    "eslint-config-next": "^15.0.0"
  }
}
```

> **Regla:** Cero dependencias de UI externas. Solo React + Tailwind.

---

## Vercel — Configuración de Deploy

```json
// vercel.json (si se necesita personalización)
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "env": {
    "RESEND_API_KEY": "@resend_api_key",
    "OWNER_EMAIL": "@owner_email"
  }
}
```

---

## Core Web Vitals — Objetivos

| Métrica | Objetivo | Estrategia |
|---------|----------|-----------|
| LCP | < 2.5s | Hero image con `priority`, WebP, CDN Vercel |
| CLS | < 0.1 | Dimensiones explícitas en `next/image` |
| FID/INP | < 100ms | Minimal JS, sin librerías pesadas |
| TTFB | < 800ms | SSG + Vercel Edge = HTML instantáneo |
| PageSpeed | ≥ 90 | Todo lo anterior |
