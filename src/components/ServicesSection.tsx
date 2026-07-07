'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CinematicTitle from '@/components/ui/CinematicTitle';
import AnimatedEmoji from '@/components/ui/AnimatedEmoji';

const SERVICES = [
  {
    title: 'Instalación de Piscinas',
    description: 'Realizamos la instalación completa de tu piscina de fibra de vidrio. Nuestro equipo experto se encarga de todo el proceso para que solo te preocupes de disfrutar.',
    image: '/images/instalacion de tamaño grande.jpeg',
  },
  {
    title: 'Cascos de Piscina',
    description: 'Más de 10 modelos de cascos de alta calidad. Encuentra el tamaño y forma ideal para el proyecto de tu familia.',
    image: '/images/models/piscina-rectangular-900.jpeg',
  },
  {
    title: 'Revestimiento Fulget',
    description: 'Terminaciones de lujo antideslizantes para el borde perimetral de tu piscina.',
    image: '/images/revestimiento_fulget.jpeg',
  },
  {
    title: 'Bombas y Accesorios',
    description: 'Equipamiento completo, filtros y bombas de alta durabilidad para mantener el agua cristalina.',
    image: '/images/equipment/bomba-piscina.jpeg',
  },
  {
    title: 'Reparaciones y Revestimientos',
    description: 'Reparamos tu vieja piscina de hormigón con revestimiento de Fibra de Vidrio.',
    image: '/images/reparaciones.jpeg',
  },
];

export default function ServicesSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5; // Slow motion cinematográfico
    }
  }, []);

  const length = SERVICES.length;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + length) % length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Función matemática para calcular la posición relativa de cada tarjeta respecto al centro (-2, -1, 0, 1, 2)
  const getRelativePosition = (index: number) => {
    let relative = index - currentIndex;
    if (relative > 2) relative -= length;
    if (relative < -2) relative += length;
    return relative;
  };

  return (
    <section id="servicios" className="py-16 md:py-32 relative overflow-hidden flex flex-col items-center">
      {/* Fondo Acuático Cinematográfico Animado */}
      <div className="absolute inset-0 bg-[#001a33] z-0"></div>
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay z-0"
      >
        <source src="/images/background-piscinas.mp4" type="video/mp4" />
      </video>
      {/* Viñeta para enfocar la luz en el centro */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.85)_100%)] z-0 pointer-events-none"></div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, type: "spring", stiffness: 40 }}
          className="mb-16 text-center max-w-3xl mx-auto"
        >
          <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-4 mb-2">
            <AnimatedEmoji symbol="🏄‍♂️" delay={0} className="text-3xl" />
            <CinematicTitle lightText="Servicios" boldText="Integrales" theme="dark" />
            <AnimatedEmoji symbol="💦" delay={0} className="text-3xl" />
          </div>
          <p className="text-xl text-white/80 leading-relaxed font-light drop-shadow-md mt-4">
            Venta e instalación de piscinas de fibra de vidrio en la Región de Coquimbo. Desde la compra del casco hasta el mantenimiento.
          </p>
        </motion.div>
      </div>

      {/* Contenedor del Carrusel */}
      <div className="relative w-full max-w-[1400px] mx-auto h-[550px] md:h-[650px] flex items-center justify-center overflow-visible z-10 px-4">
        
        {SERVICES.map((service, index) => {
          const position = getRelativePosition(index);
          const isCenter = position === 0;

          // Definir estados de animación según la posición relativa
          let animateState = {};
          if (position === 0) {
            animateState = { x: '0%', scale: 1, zIndex: 30, opacity: 1, filter: 'blur(0px)' };
          } else if (position === -1) {
            animateState = { x: '-105%', scale: 0.85, zIndex: 20, opacity: 0.4, filter: 'blur(5px)' };
          } else if (position === 1) {
            animateState = { x: '105%', scale: 0.85, zIndex: 20, opacity: 0.4, filter: 'blur(5px)' };
          } else if (position < -1) {
            animateState = { x: '-200%', scale: 0.6, zIndex: 10, opacity: 0, filter: 'blur(10px)' };
          } else if (position > 1) {
            animateState = { x: '200%', scale: 0.6, zIndex: 10, opacity: 0, filter: 'blur(10px)' };
          }

          return (
            <motion.div
              key={index}
              initial={false}
              animate={animateState}
              transition={{ type: 'spring', damping: 22, stiffness: 90 }}
              onClick={() => !isCenter && goToSlide(index)}
              className={`absolute top-0 bottom-0 my-auto w-full max-w-[340px] md:max-w-[480px] h-[500px] md:h-[600px] rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 group ${
                isCenter ? 'cursor-default' : 'cursor-pointer'
              }`}
            >
              <Image 
                src={service.image} 
                alt={service.title} 
                fill 
                quality={70}
                loading="lazy"
                sizes="(max-width: 768px) 340px, 480px"
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
              />
              
              {/* Degradado para asegurar lectura del texto */}
              <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none transition-opacity duration-500 ${isCenter ? 'opacity-90' : 'opacity-100'}`}></div>
              
              {/* Contenido (Textos) */}
              <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col justify-end h-full z-10">
                <h3 className={`text-2xl md:text-3xl font-black text-white mb-2 tracking-tight transition-transform duration-500 ${isCenter ? 'transform translate-y-0' : 'transform translate-y-4'}`}>
                  {service.title}
                </h3>
                
                {/* Descripción animada (Solo visible cuando está en el centro) */}
                <div className="overflow-hidden">
                  <p 
                    className={`text-white/80 font-light leading-relaxed transition-all duration-500 ${
                      isCenter 
                        ? 'max-h-[120px] opacity-100 transform translate-y-0' 
                        : 'max-h-0 opacity-0 transform translate-y-4'
                    }`}
                  >
                    {service.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* Controles Glassmorphism */}
        <button 
          onClick={prevSlide}
          className="absolute left-4 md:left-[15%] top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-xl hover:bg-white/20 hover:scale-110 transition-all duration-300"
          aria-label="Anterior servicio"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
        
        <button 
          onClick={nextSlide}
          className="absolute right-4 md:right-[15%] top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-xl hover:bg-white/20 hover:scale-110 transition-all duration-300"
          aria-label="Siguiente servicio"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      </div>
      
      {/* Indicadores de posición (Dots) */}
      <div className="relative z-20 flex justify-center items-center gap-3 mt-8">
        {SERVICES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className={`transition-all duration-300 rounded-full ${
              idx === currentIndex 
                ? 'w-10 h-2 bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]' 
                : 'w-2 h-2 bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Ir al servicio ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
