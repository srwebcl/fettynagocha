import dynamic from 'next/dynamic';
import HeroSlider from '@/components/HeroSlider';

// Dynamic Imports for components below the fold
const CatalogSection = dynamic(() => import('@/components/CatalogSection'), {
  loading: () => <div className="min-h-[500px] w-full bg-brand-gray-50 flex items-center justify-center">Cargando Catálogo...</div>,
});
const ServicesSection = dynamic(() => import('@/components/ServicesSection'), {
  loading: () => <div className="min-h-[500px] w-full bg-[#001a33] flex items-center justify-center text-white/50">Cargando Servicios...</div>,
});
const DesignPatioSection = dynamic(() => import('@/components/DesignPatioSection'), {
  loading: () => <div className="min-h-[600px] w-full bg-gradient-to-br from-cyan-600 via-blue-500 to-sky-400 flex items-center justify-center text-white/50">Cargando Formulario...</div>,
});
const ContactoSection = dynamic(() => import('@/components/ContactoSection'));

export default function Home() {
  return (
    <>
      {/* Sección Hero Dinámica (Efecto Ken Burns) */}
      <HeroSlider />

      {/* Catálogo Interactivo y Modal */}
      <CatalogSection />

      {/* Sección de Servicios SEO Local */}
      <ServicesSection />

      {/* Sección Formulario Interactivo Paso a Paso */}
      <DesignPatioSection />

      {/* Sección de Contacto Directo */}
      <ContactoSection />
    </>
  );
}
