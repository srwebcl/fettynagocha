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
  otherCommune?: string;
  projectType?: string;
  modelId?: string;
  poolColor?: string;
  message: string;
  visitDate?: string;
  visitTime?: 'mañana' | 'tarde' | '';
}
