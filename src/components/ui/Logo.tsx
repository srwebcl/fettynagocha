import Image from 'next/image';
import React from 'react';

interface LogoProps {
  variant?: 'dark' | 'light';
  priority?: boolean;
  className?: string;
}

export default function Logo({ variant = 'dark', className = '', priority = false }: LogoProps) {
  // Se usa dark por defecto para fondos claros, y light para fondos oscuros
  const logoSrc = variant === 'dark' 
    ? '/images/brand/logo-fettyna-fondo-oscuro.png' 
    : '/images/brand/logo-fettyna-fondo-claro.png';

  return (
    <Image
      src={logoSrc}
      alt="Fettyna Gocha"
      width={280}
      height={80}
      priority={priority}
      className={`w-auto object-contain transition-all duration-500 ${className}`}
      style={{ width: 'auto', height: 'auto' }}
    />
  );
}
