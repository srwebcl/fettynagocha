# skill.md — Sistema de Diseño y Habilidades Técnicas
## Proyecto: Piscinas Fettyna Gocha

---

## 1. Sistema de Colores — "Summer Premium"

```typescript
// tailwind.config.ts — extend.colors
colors: {
  brand: {
    // Azul piscina profundo (color principal)
    primary:   '#006FAD',  // Botones CTA, links activos
    light:     '#38BDF8',  // Acentos, highlights
    dark:      '#004E7C',  // Hover states, textos oscuros

    // Dorado verano (contraste premium)
    gold:      '#F59E0B',  // Badges "Oferta", estrellas
    goldLight: '#FDE68A',  // Backgrounds de alerta suave

    // Neutros limpios
    surface:   '#F0F9FF',  // Fondo secciones alternas (azul muy tenue)
    white:     '#FFFFFF',
    gray: {
      50:  '#F8FAFC',
      100: '#F1F5F9',
      200: '#E2E8F0',
      400: '#94A3B8',
      600: '#475569',
      800: '#1E293B',
      900: '#0F172A',
    },
  },
}
```

---

## 2. Tipografía

```typescript
// next.config: usar next/font/google
fontFamily: {
  sans: ['Inter', ...defaultTheme.fontFamily.sans],
  display: ['Inter', ...defaultTheme.fontFamily.sans],  // var(--font-inter)
}

// Escala de tamaños usada en el proyecto:
// text-xs   → 12px  → Labels, captions
// text-sm   → 14px  → Texto secundario, descripciones
// text-base → 16px  → Cuerpo
// text-lg   → 18px  → Subtítulos menores
// text-xl   → 20px  → Subtítulos de sección
// text-2xl  → 24px  → Títulos de tarjeta
// text-3xl  → 30px  → Títulos de sección
// text-4xl  → 36px  → Títulos hero mobile
// text-5xl  → 48px  → Títulos hero desktop
// text-6xl  → 60px  → Headline principal
```

---

## 3. Componentes Base — Patrones de Código

### Botón CTA Principal
```tsx
<button className="bg-brand-primary hover:bg-brand-dark text-white font-semibold 
  px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 
  text-lg tracking-wide">
  Cotizar Ahora
</button>
```

### Botón Secundario (Outline)
```tsx
<button className="border-2 border-brand-primary text-brand-primary 
  hover:bg-brand-primary hover:text-white font-semibold 
  px-8 py-4 rounded-full transition-all duration-200 text-lg">
  Ver Modelos
</button>
```

### Badge de precio
```tsx
<span className="bg-brand-gold text-white text-sm font-bold px-3 py-1 rounded-full">
  Desde $2.190.000
</span>
```

### Card de modelo de piscina
```tsx
<div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow 
  duration-300 overflow-hidden group">
  {/* imagen con next/image, aspect-ratio 4/3 */}
  {/* contenido con p-6 */}
  {/* botón CTA sticky al fondo de la card */}
</div>
```

---

## 4. Layout y Espaciado

```
Contenedor principal: max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
Secciones:           py-16 md:py-24
Gap entre cards:     gap-6 md:gap-8
Border radius:       rounded-2xl (cards), rounded-full (botones, badges)
```

---

## 5. Interfaz TypeScript — Modelos de Piscina

```typescript
// src/types/index.ts

export type PoolShape = 'rectangular' | 'redonda' | 'rinon' | 'jacuzzi';

export interface PoolModel {
  id: string;                     // Único, nunca cambiar
  slug: string;                   // kebab-case, para URLs y refs
  name: string;                   // Nombre comercial
  shape: PoolShape;
  image: string;                  // Path relativo: /images/models/{slug}.webp
  priceFrom: number;              // Precio en CLP (sin formato)
  dimensions: {
    largo?: number;               // metros
    ancho?: number;               // metros
    diametro?: number;            // metros (solo redondas)
    profundidadMin: number;       // metros
    profundidadMax: number;       // metros (igual a min si es pareja)
  };
  capacity?: number;              // Personas (solo jacuzzi/spa)
  featured?: boolean;             // Aparece primero en la grilla
  badge?: string;                 // Ej: "Más vendida", "Nueva"
  description?: string;           // Descripción corta para SEO
}

export interface QuoteFormData {
  name: string;
  phone: string;
  email: string;
  commune: string;
  modelId?: string;
  message: string;
}
```

---

## 6. Datos — Modelos Oficiales Fettyna Gocha

```typescript
// src/data/models.ts
export const POOL_MODELS: PoolModel[] = [
  {
    id: 'jacuzzi-220',
    slug: 'jacuzzi-220',
    name: 'Jacuzzi',
    shape: 'jacuzzi',
    image: '/images/models/jacuzzi-220.webp',
    priceFrom: 2190000,
    dimensions: { diametro: 2.20, profundidadMin: 1.00, profundidadMax: 1.00 },
    capacity: 6,
    badge: 'Spa & Relax',
  },
  {
    id: 'redonda-150',
    slug: 'redonda-150',
    name: 'Piscina Redonda 1.50 m',
    shape: 'redonda',
    image: '/images/models/redonda-150.webp',
    priceFrom: 1090000,
    dimensions: { diametro: 1.50, profundidadMin: 0.40, profundidadMax: 0.40 },
  },
  {
    id: 'redonda-220',
    slug: 'redonda-220',
    name: 'Piscina Redonda 2.20 m',
    shape: 'redonda',
    image: '/images/models/redonda-220.webp',
    priceFrom: 1600000,
    dimensions: { diametro: 2.20, profundidadMin: 0.50, profundidadMax: 0.50 },
  },
  {
    id: 'rinon-280',
    slug: 'rinon-280',
    name: 'Piscina Riñón 2.80×1.60',
    shape: 'rinon',
    image: '/images/models/rinon-280.webp',
    priceFrom: 1790000,
    dimensions: { largo: 2.80, ancho: 1.60, profundidadMin: 0.50, profundidadMax: 0.50 },
  },
  {
    id: 'rinon-420',
    slug: 'rinon-420',
    name: 'Piscina Riñón 4.20×2.20',
    shape: 'rinon',
    image: '/images/models/rinon-420.webp',
    priceFrom: 2690000,
    dimensions: { largo: 4.20, ancho: 2.20, profundidadMin: 0.90, profundidadMax: 0.90 },
    featured: true,
  },
  {
    id: 'rect-350',
    slug: 'rect-350',
    name: 'Piscina Rectangular 3.50×2.50',
    shape: 'rectangular',
    image: '/images/models/rect-350.webp',
    priceFrom: 2200000,
    dimensions: { largo: 3.50, ancho: 2.50, profundidadMin: 0.60, profundidadMax: 0.60 },
  },
  {
    id: 'rect-300',
    slug: 'rect-300',
    name: 'Piscina Rectangular 3.00×2.00',
    shape: 'rectangular',
    image: '/images/models/rect-300.webp',
    priceFrom: 2250000,
    dimensions: { largo: 3.00, ancho: 2.00, profundidadMin: 1.10, profundidadMax: 1.20 },
  },
  {
    id: 'rect-480',
    slug: 'rect-480',
    name: 'Piscina Rectangular 4.80×2.80',
    shape: 'rectangular',
    image: '/images/models/rect-480.webp',
    priceFrom: 2790000,
    dimensions: { largo: 4.80, ancho: 2.80, profundidadMin: 1.10, profundidadMax: 1.35 },
    featured: true,
    badge: 'Más vendida',
  },
  {
    id: 'rect-600',
    slug: 'rect-600',
    name: 'Piscina Rectangular 6.00×3.00',
    shape: 'rectangular',
    image: '/images/models/rect-600.webp',
    priceFrom: 3200000,
    dimensions: { largo: 6.00, ancho: 3.00, profundidadMin: 1.00, profundidadMax: 1.50 },
  },
  {
    id: 'rect-700',
    slug: 'rect-700',
    name: 'Piscina Rectangular 7.00×3.40',
    shape: 'rectangular',
    image: '/images/models/rect-700.webp',
    priceFrom: 3790000,
    dimensions: { largo: 7.00, ancho: 3.40, profundidadMin: 1.35, profundidadMax: 1.70 },
  },
  {
    id: 'rect-900',
    slug: 'rect-900',
    name: 'Piscina Rectangular 9.00×4.00',
    shape: 'rectangular',
    image: '/images/models/rect-900.webp',
    priceFrom: 4290000,
    dimensions: { largo: 9.00, ancho: 4.00, profundidadMin: 1.00, profundidadMax: 1.80 },
    badge: 'Premium',
  },
];
```

---

## 7. Resend — Template de Email

```typescript
// src/lib/resend.ts
// El subject debe ser: 🏊 Nueva cotización — {modelName || 'General'} — {name}
// El from debe ser: "Fettyna Gocha Web" <noreply@fettynagocha.cl>
// El to debe ser: process.env.OWNER_EMAIL
```

---

## 8. SEO — Metadata Base

```typescript
// src/app/layout.tsx
export const metadata: Metadata = {
  title: 'Piscinas Fettyna Gocha | Fabricación e Instalación en Coquimbo',
  description: 'Líderes en fabricación e instalación de piscinas de fibra de vidrio en la región de Coquimbo. +10 modelos disponibles. Cotiza gratis hoy.',
  keywords: ['piscinas coquimbo', 'piscinas fibra de vidrio', 'instalacion piscinas la serena', 'fabrica piscinas coquimbo', 'fettyna gocha'],
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    url: 'https://fettynagocha.cl',
    siteName: 'Piscinas Fettyna Gocha',
  },
};
```

---

## 9. Animaciones y Transiciones

- Hover en cards: `transition-shadow duration-300`
- Botones: `transition-all duration-200`
- Aparición de secciones: Intersection Observer + `opacity-0 translate-y-4 → opacity-100 translate-y-0`
- NO usar librerías de animación externas (Framer Motion, GSAP) en v1.

---

## 10. SKILL: PageSpeed Insights 100/100 Protocol

Como experto máximo en optimización web (Core Web Vitals), aplico este protocolo estrictamente a cualquier componente o página para asegurar calificación de 100/100 en Google PageSpeed Insights (Performance, Accessibility, Best Practices, SEO).

### A. Performance (Rendimiento 100)
- **LCP (Largest Contentful Paint):**
  - La imagen del Hero (above-the-fold) SIEMPRE lleva `priority={true}` en `next/image` para precarga.
  - El texto principal (LCP) no debe depender de fuentes web externas bloqueantes. Usar `next/font/google` con `display: 'swap'` o pre-cargar la fuente.
  - No animar el elemento LCP con retrasos (delays) excesivos.
- **CLS (Cumulative Layout Shift):**
  - Todas las imágenes sin excepción deben tener proporciones definidas (`width` y `height`, o `fill` con un contenedor relativo de aspecto fijo como `aspect-video`).
  - Mostrar *Skeleton loaders* en áreas de carga dinámica para reservar el espacio antes de que el contenido se renderice.
- **INP (Interaction to Next Paint) / TBT (Total Blocking Time):**
  - Aplazar el JavaScript no crítico usando Dynamic Imports (`next/dynamic`) para componentes below-the-fold (ej. modales pesados, mapas, secciones del final).
  - Usar `useTransition` para actualizaciones de estado pesadas que no deben bloquear el hilo principal.
- **Third-Party Scripts (GTM, Meta Pixel):**
  - Inyectar con `next/script`.
  - Usar `strategy="lazyOnload"` o `strategy="afterInteractive"` para no bloquear el LCP. Para optimización extrema, usar `@next/third-parties/google` o Partytown.

### B. Accessibility (Accesibilidad 100)
- **Contrastes:** Los textos deben tener un ratio de contraste de al menos 4.5:1 (normal) o 3:1 (texto grande) respecto al fondo. Revisar cuidadosamente los textos grises o botones con gradientes.
- **Etiquetas ARIA:** Todo botón, enlace con iconos (sin texto visible) DEBE tener `aria-label="Descripción"`.
- **Navegación por teclado:** Todo elemento clickeable debe ser un `<button>` o `<a>` nativo, no un `<div>` con `onClick`. Si debe ser un `div`, necesita `role="button"` y `tabIndex={0}`.
- **Decoraciones:** Los SVGs puramente visuales deben tener `aria-hidden="true"`.

### C. Best Practices (Mejores Prácticas 100)
- Consola limpia: Cero errores o warnings en consola. Cero uso de APIs web obsoletas (deprecated).
- Imágenes modernas: Todo recurso debe servirse en formato `.webp` o `.avif`.
- Resolución adecuada: No cargar imágenes de 4000px en contenedores de 400px. Usar el atributo `sizes` de `next/image` de forma inteligente (`sizes="(max-width: 768px) 100vw, 33vw"`).

### D. SEO (100)
- **Semántica HTML:** Cada página debe tener un único `<h1>`. Jerarquía lógica: `<h1>` -> `<h2>` -> `<h3>`.
- **Metadata:** Títulos únicos y descriptivos por ruta. Atributos `meta description`.
- **Enlaces (Crawling):** Todos los componentes `<Link>` o `<a>` deben apuntar a URLs descriptivas y tener texto interno claro (no solo "Haz clic aquí").
- **Imágenes:** El atributo `alt` es obligatorio, descriptivo y no vacío para imágenes de contenido.

> **Acción del Agente:** Cada vez que el usuario solicite un componente o refactor, procesaré mentalmente esta lista antes de escribir código.
