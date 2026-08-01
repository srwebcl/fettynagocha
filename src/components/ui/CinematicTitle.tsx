'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';

interface CinematicTitleProps {
  lightText: string;
  boldText: string;
  className?: string;
  align?: 'center' | 'left' | 'right';
  theme?: 'dark' | 'light';
  customGradient?: string;
}

export default function CinematicTitle({ lightText, boldText, className = '', align = 'center', theme = 'dark', customGradient }: CinematicTitleProps) {
  const alignClass = align === 'left' ? 'justify-start' : align === 'right' ? 'justify-end' : 'justify-center';

  // Animación simple de todo el bloque para máxima fluidez
  const container: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 20,
        stiffness: 100,
        duration: 0.6
      }
    }
  };

  const isDark = theme === 'dark';
  
  // Clases dependientes del tema para contraste cinemático real
  const lightTextClass = isDark ? 'text-white' : 'text-slate-800';
  const gradientClass = customGradient 
    ? customGradient 
    : isDark 
      ? 'from-cyan-400 to-blue-500' // Dark theme (fondo oscuro): Neón vibrante
      : 'from-blue-700 to-cyan-500'; // Light theme (fondo claro): Azul profundo a Cyan

  return (
    <motion.h2 
      className={`text-[32px] sm:text-4xl md:text-6xl lg:text-7xl leading-tight tracking-tighter mb-4 md:mb-6 ${alignClass} ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Texto Fino (Estructura) */}
      <span className={`font-light mr-[0.3em] ${lightTextClass}`}>
        {lightText}
      </span>
      
      {/* Texto Ultra-grueso + Degradado */}
      <span className={`font-black bg-gradient-to-br bg-clip-text text-transparent pb-[0.1em] pr-[0.1em] ${gradientClass}`}>
        {boldText}
      </span>
    </motion.h2>
  );
}
