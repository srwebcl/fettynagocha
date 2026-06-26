'use client';

import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import CinematicTitle from '@/components/ui/CinematicTitle';
import AnimatedEmoji from '@/components/ui/AnimatedEmoji';
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

export default function ContactoSection() {
  const contactMethods = [
    {
      icon: Phone,
      title: 'WhatsApp / Teléfono',
      content: '+56 9 6878 7511',
      link: 'https://wa.me/56968787511',
      color: 'text-green-400',
      bgHover: 'hover:bg-green-400/10',
      borderHover: 'hover:border-green-400/30'
    },
    {
      icon: Mail,
      title: 'Correo Electrónico',
      content: 'contacto@fettynagocha.cl',
      link: 'mailto:contacto@fettynagocha.cl',
      color: 'text-blue-400',
      bgHover: 'hover:bg-blue-400/10',
      borderHover: 'hover:border-blue-400/30'
    },
    {
      icon: MapPin,
      title: 'Sucursal',
      content: 'Vega Sur - Parcela, Ruta 5 128, Coquimbo',
      link: 'https://www.google.com/maps/search/?api=1&query=Vega+Sur+-+Parcela,+Ruta+5+128,+1780000+Coquimbo',
      color: 'text-red-400',
      bgHover: 'hover:bg-red-400/10',
      borderHover: 'hover:border-red-400/30'
    }
  ];

  return (
    <section id="contacto" className="py-24 relative overflow-hidden bg-brand-gray-50 flex flex-col items-center">
      {/* Elementos de fondo */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.05)_0%,transparent_70%)] z-0 pointer-events-none"></div>

      <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
        
        {/* Cabecera */}
        <div className="mb-16 text-center">
          <div className="flex justify-center items-center gap-4 mb-2">
            <AnimatedEmoji symbol="👋" delay={0} className="text-3xl" />
            <CinematicTitle lightText="Ponte en" boldText="Contacto" theme="light" />
            <AnimatedEmoji symbol="💬" delay={0} className="text-3xl" />
          </div>
          <p className="text-xl text-brand-gray-600 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-sm">
            Estamos aquí para resolver tus dudas y ayudarte a dar el primer paso hacia la piscina de tus sueños.
          </p>
        </div>

        {/* Tarjetas de Contacto */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            const CardWrapper = method.link ? motion.a : motion.div;
            
            return (
              <CardWrapper
                key={method.title}
                href={method.link || undefined}
                target={method.link?.startsWith('http') ? '_blank' : undefined}
                rel={method.link?.startsWith('http') ? 'noreferrer' : undefined}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={method.link ? { scale: 1.03 } : {}}
                whileTap={method.link ? { scale: 0.98 } : {}}
                className={`bg-white border border-brand-gray-200 shadow-md rounded-2xl p-8 flex flex-col items-center text-center transition-all cursor-${method.link ? 'pointer' : 'default'} ${method.bgHover} ${method.borderHover}`}
              >
                <div className={`p-4 rounded-full bg-brand-gray-50 mb-6 ${method.color}`}>
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-brand-dark mb-2">{method.title}</h3>
                <p className="text-brand-gray-500 font-medium">{method.content}</p>
              </CardWrapper>
            );
          })}
        </div>

        {/* Redes Sociales Secundarias */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 flex flex-col items-center justify-center gap-4"
        >
          <span className="text-brand-gray-400 text-sm font-semibold uppercase tracking-widest">Síguenos en nuestras redes</span>
          <div className="flex gap-4">
            <a 
              href="https://www.instagram.com/piscinasfettynagocha/" 
              target="_blank" 
              rel="noreferrer"
              aria-label="Perfil de Instagram"
              className="w-12 h-12 rounded-full border border-brand-gray-200 bg-white shadow-sm flex items-center justify-center text-brand-gray-500 hover:text-cyan-600 hover:border-cyan-600 hover:shadow-md hover:scale-110 transition-all"
            >
              <InstagramIcon className="w-5 h-5" />
            </a>
            <a 
              href="https://facebook.com/fettynagocha.cl" 
              target="_blank" 
              rel="noreferrer"
              aria-label="Página de Facebook"
              className="w-12 h-12 rounded-full border border-brand-gray-200 bg-white shadow-sm flex items-center justify-center text-brand-gray-500 hover:text-cyan-600 hover:border-cyan-600 hover:shadow-md hover:scale-110 transition-all"
            >
              <FacebookIcon className="w-5 h-5" />
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
