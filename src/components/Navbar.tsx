'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from '@/components/ui/Logo';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    // Check initially
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header 
        className={`fixed w-full top-0 z-50 transition-all duration-500 ease-in-out ${
          isScrolled 
            ? 'bg-brand-gray-900/85 backdrop-blur-xl border-b border-white/10 shadow-2xl py-2' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex justify-between items-center transition-all duration-500 ${isScrolled ? 'h-14 md:h-16' : 'h-20 md:h-24'}`}>
            
            {/* Logo oficial */}
            <div className="flex-shrink-0 flex items-center z-50">
              <Link href="#inicio" onClick={() => setIsOpen(false)} aria-label="Inicio" className="drop-shadow-lg">
                <Logo variant="dark" priority={true} className={`h-16 md:h-20 origin-left transition-transform duration-500 hover:scale-[1.02] ${isScrolled ? 'scale-75' : 'scale-100'}`} />
              </Link>
            </div>

            {/* Enlaces de Navegación Desktop */}
            <nav className="hidden md:flex space-x-10">
              <Link href="#inicio" className="text-white/80 hover:text-white font-medium transition-all duration-300 hover:text-shadow-glow">
                Inicio
              </Link>
              <Link href="#modelos" className="text-white/80 hover:text-white font-medium transition-all duration-300 hover:text-shadow-glow">
                Modelos
              </Link>
              <Link href="#servicios" className="text-white/80 hover:text-white font-medium transition-all duration-300 hover:text-shadow-glow">
                Servicios
              </Link>
              <Link href="#cotizar" className="text-white/80 hover:text-white font-medium transition-all duration-300 hover:text-shadow-glow">
                Cotiza tu Proyecto
              </Link>
            </nav>

            {/* Botón CTA Desktop */}
            <div className="hidden md:flex items-center">
              <Link 
                href="#contacto"
                className="bg-white/10 backdrop-blur-md border border-white/30 hover:bg-white hover:text-brand-dark text-white font-bold rounded-full px-8 py-2.5 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:-translate-y-1 transition-all duration-300 transform flex items-center gap-2"
              >
                Contáctanos 💬
              </Link>
            </div>

            {/* Botón Hamburguesa Móvil */}
            <div className="md:hidden flex items-center z-50">
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="text-white hover:text-brand-light transition-colors p-2 drop-shadow-md"
                aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
              >
                {isOpen ? <X size={32} /> : <Menu size={32} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Menú Móvil a Pantalla Completa */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-brand-gray-900/95 backdrop-blur-2xl flex flex-col items-center justify-center space-y-8 animate-fade-in duration-300">
          <Link href="#inicio" onClick={() => setIsOpen(false)} className="text-4xl font-light text-white hover:text-brand-light transition-colors drop-shadow-md">
            Inicio
          </Link>
          <Link href="#modelos" onClick={() => setIsOpen(false)} className="text-4xl font-light text-white hover:text-brand-light transition-colors drop-shadow-md">
            Modelos
          </Link>
          <Link href="#servicios" onClick={() => setIsOpen(false)} className="text-4xl font-light text-white hover:text-brand-light transition-colors drop-shadow-md">
            Servicios
          </Link>
          <Link href="#cotizar" onClick={() => setIsOpen(false)} className="text-4xl font-light text-white hover:text-brand-light transition-colors drop-shadow-md">
            Cotiza tu Proyecto
          </Link>
          <div className="pt-10">
            <Link 
              href="#contacto"
              onClick={() => setIsOpen(false)}
              className="bg-gradient-to-r from-brand-primary to-brand-light text-white font-bold rounded-full px-10 py-5 shadow-[0_0_20px_rgba(0,111,173,0.4)] hover:shadow-[0_0_30px_rgba(56,189,248,0.6)] hover:-translate-y-1 transition-all duration-300 transform flex items-center gap-2 uppercase tracking-widest text-sm"
            >
              Contáctanos 💬
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
