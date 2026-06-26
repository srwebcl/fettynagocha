import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Piscinas Fettyna Gocha',
    short_name: 'Fettyna Gocha',
    description: 'Fabricación e instalación de piscinas de fibra de vidrio en Coquimbo.',
    start_url: '/',
    display: 'standalone',
    background_color: '#006FAD',
    theme_color: '#006FAD',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
