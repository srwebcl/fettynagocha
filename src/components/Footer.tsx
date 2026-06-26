'use client';

import Link from 'next/link';
import React from 'react';
import Logo from '@/components/ui/Logo';
import { motion } from 'framer-motion';

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-brand-gray-900 border-t border-brand-gray-800 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Marca */}
          <div>
            <div className="mb-6">
              <Logo variant="dark" className="-ml-2" />
            </div>
            <p className="text-brand-gray-400 leading-relaxed">
              Expertos en fabricación e instalación de piscinas de fibra de vidrio en la región de Coquimbo. Llevando frescura, calidad y diversión a tu hogar por más de 10 años.
            </p>
          </div>

          {/* Enlaces Rápidos */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-3">
              <li>
                <Link href="#inicio" className="text-brand-gray-400 hover:text-brand-light transition-colors">Inicio</Link>
              </li>
              <li>
                <Link href="#modelos" className="text-brand-gray-400 hover:text-brand-light transition-colors">Modelos</Link>
              </li>
              <li>
                <Link href="#servicios" className="text-brand-gray-400 hover:text-brand-light transition-colors">Servicios</Link>
              </li>
              <li>
                <Link href="#cotizar" className="text-brand-gray-400 hover:text-brand-light transition-colors">Cotizar</Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Contacto</h4>
            <ul className="space-y-3 text-brand-gray-400">
              <li><span className="font-semibold text-brand-gray-200">Email:</span> contacto@fettynagocha.cl</li>
              <li><span className="font-semibold text-brand-gray-200">Teléfono:</span> +56 9 6878 7511</li>
              <li><span className="font-semibold text-brand-gray-200">Cobertura:</span> Coquimbo, La Serena, Vallenar</li>
            </ul>
          </div>
          
        </div>

        {/* Bottom bar */}
        <div className="border-t border-brand-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-brand-gray-500 text-sm">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            &copy; {new Date().getFullYear()} Piscinas Fettyna Gocha. Todos los derechos reservados.
          </div>
          <div>
            <span className="font-medium tracking-wide">Sitio desarrollado por <strong className="text-cyan-400 font-bold">SRweb</strong></span>
          </div>
        </div>
      </div>
    </footer>
  );
}
