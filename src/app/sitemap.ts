import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://fettynagocha.cl',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    // Si tuvieras páginas dinámicas o rutas individuales para cada modelo, 
    // podrías mapear POOL_MODELS aquí de forma automatizada.
    // Por ahora, como es una Single Page Application (SPA) / Landing Page,
    // el dominio principal es suficiente y agrupa todo el valor SEO.
  ];
}
