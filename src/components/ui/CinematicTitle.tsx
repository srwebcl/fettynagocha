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

  // Contenedor principal coordina el efecto dominó (stagger)
  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  // Efecto 3D de entrada desde abajo y desenfoque
  const child: Variants = {
    hidden: {
      opacity: 0,
      y: 50,
      rotateX: -80,
      filter: 'blur(12px)'
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        damping: 18,
        stiffness: 90
      }
    }
  };

  const lightWords = lightText.split(' ');
  const boldWords = boldText.split(' ');

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
      className={`text-5xl md:text-6xl lg:text-7xl tracking-tighter mb-6 flex flex-wrap gap-x-[0.3em] gap-y-2 [perspective:1000px] ${alignClass} ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Texto Fino (Estructura) */}
      <span className={`font-light flex flex-wrap gap-x-[0.3em] ${lightTextClass}`}>
        {lightWords.map((word, i) => (
          <motion.span 
            key={`light-${i}`} 
            className="inline-block" 
            variants={child} 
            style={{ transformOrigin: 'bottom center', transformStyle: 'preserve-3d' }}
          >
            {word}
          </motion.span>
        ))}
      </span>
      
      {/* Texto Ultra-grueso + Degradado */}
      <span className="flex flex-wrap gap-x-[0.3em]">
        {boldWords.map((word, i) => (
          <motion.span 
            key={`bold-${i}`} 
            className={`inline-block font-black bg-gradient-to-br bg-clip-text text-transparent pb-[0.1em] pr-[0.1em] ${gradientClass}`} 
            variants={child} 
            style={{ transformOrigin: 'bottom center', transformStyle: 'preserve-3d' }}
          >
            {word}
          </motion.span>
        ))}
      </span>
    </motion.h2>
  );
}
