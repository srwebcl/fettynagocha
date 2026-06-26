'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

import { motion } from 'framer-motion';

const HERO_IMAGES = [
  '/images/models/piscina-rectangular-600.jpeg',
  '/images/models/piscina-redonda-150.jpeg',
  '/images/models/piscina-redonda-220.jpeg',
  '/images/models/piscina-rinon-280.jpg',
  '/images/models/piscina-rinon-420.jpeg',
  '/images/models/piscina-rectagular-700.jpeg',
  '/images/models/jacuzzi-220.jpeg',
];

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Configuraciones de Animación 3D para el Hero
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const child = {
    hidden: { opacity: 0, y: 50, rotateX: -80, filter: 'blur(12px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      rotateX: 0, 
      filter: 'blur(0px)',
      transition: { type: 'spring' as const, damping: 18, stiffness: 90 }
    }
  };

  const lightText = "Fabricamos e instalamos".split(" ");
  const boldText = "Piscinas de Fibra de Vidrio".split(" ");

  return (
    <section id="inicio" className="relative h-[100dvh] min-h-[600px] flex items-center justify-center overflow-hidden bg-brand-dark">
      {/* Carrusel de Imágenes con Efecto Ken Burns */}
      {HERO_IMAGES.map((src, index) => {
        const isActive = index === currentIndex;
        return (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out z-0 ${
              isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <Image
              src={src}
              alt="Piscina de Fibra de Vidrio Fettyna Gocha"
              fill
              priority={index === 0}
              sizes="(max-width: 768px) 100vw, 100vw"
              className={`object-cover transform transition-transform duration-[10000ms] ease-out ${
                isActive ? 'scale-110' : 'scale-100'
              }`}
            />
          </div>
        );
      })}

      {/* Overlay oscuro garantizado para contraste */}
      <div className="absolute inset-0 bg-black/60 z-10 pointer-events-none"></div>

      {/* Contenido Hero */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full px-5 py-2 text-sm font-semibold mb-8 inline-block shadow-lg tracking-wide"
        >
          ☀️ Más de 10 años de experiencia
        </motion.div>
        
        <motion.h1 
          className="text-5xl md:text-7xl tracking-tighter max-w-5xl mx-auto mb-8 flex flex-col items-center gap-y-2 [perspective:1000px]"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {/* Parte fina */}
          <span className="font-light text-white flex flex-wrap justify-center gap-x-[0.3em]">
            {lightText.map((word, i) => (
              <motion.span key={`light-${i}`} className="inline-block" variants={child} style={{ transformOrigin: 'bottom center', transformStyle: 'preserve-3d' }}>
                {word}
              </motion.span>
            ))}
          </span>
          
          {/* Parte gruesa */}
          <span className="flex flex-wrap justify-center gap-x-[0.3em]">
            {boldText.map((word, i) => (
              <motion.span 
                key={`bold-${i}`} 
                className="inline-block font-black bg-gradient-to-r from-sky-200 via-cyan-200 to-teal-200 bg-clip-text text-transparent pb-[0.1em] pr-[0.1em] drop-shadow-md" 
                variants={child} 
                style={{ transformOrigin: 'bottom center', transformStyle: 'preserve-3d' }}
              >
                {word}
              </motion.span>
            ))}
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-xl md:text-2xl text-white/90 font-light max-w-3xl mx-auto mb-12 drop-shadow-md leading-relaxed"
        >
          Diseño espectacular. Resistencia superior. Cobertura en La Serena, Coquimbo, Vallenar, y alrededores.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex justify-center items-center mt-12"
        >
          <Link 
            href="#modelos"
            className="group bg-white/10 backdrop-blur-md border border-white/30 hover:bg-white/20 text-white font-medium px-10 py-3 md:px-12 md:py-4 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-all duration-300 hover:scale-105 flex items-center gap-3 text-base md:text-lg tracking-wide"
          >
            Ver Modelos
            <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>

    </section>
  );
}
