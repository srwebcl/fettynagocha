'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Waves, Ruler, Maximize, Users } from 'lucide-react';
import { POOL_MODELS } from '@/data/models';
import dynamic from 'next/dynamic';
import CinematicTitle from '@/components/ui/CinematicTitle';
import { motion } from 'framer-motion';
import AnimatedEmoji from '@/components/ui/AnimatedEmoji';

const QuoteModal = dynamic(() => import('@/components/QuoteModal'));

export default function CatalogSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedModelId, setSelectedModelId] = useState<string | null>(null);

  const openQuoteModal = (modelId: string) => {
    setSelectedModelId(modelId);
    setIsModalOpen(true);
  };

  return (
    <>
      <section id="modelos" className="py-16 md:py-32 relative overflow-hidden">
        {/* Fondo Claro Abstracto */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-sky-50 to-cyan-100 z-0"></div>

        {/* Destellos de Sol */}
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-white/60 rounded-full blur-[100px] pointer-events-none z-0"></div>

        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-24 text-center">
            <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-4 mb-2">
              <AnimatedEmoji symbol="☀️" delay={0} className="text-3xl" />
              <CinematicTitle lightText="Modelos" boldText="Disponibles" theme="light" />
              <AnimatedEmoji symbol="🏊‍♂️" delay={0} className="text-3xl" />
            </div>
            <p className="text-xl text-brand-gray-600 max-w-2xl mx-auto font-medium leading-relaxed drop-shadow-sm flex items-center justify-center gap-2">
              Explora nuestra línea de cascos de fibra de vidrio. Encuentra la forma y el tamaño ideal para tu patio.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8">
            {POOL_MODELS.map((model, index) => {
              const firstDigitIndex = model.name.search(/\d/);
              const cleanName = firstDigitIndex !== -1 ? model.name.substring(0, firstDigitIndex).trim() : model.name;
              const sizeSuffix = firstDigitIndex !== -1 ? model.name.substring(firstDigitIndex).trim() : '';

              return (
                <motion.div 
                  key={model.id} 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.1, type: "spring", stiffness: 50 }}
                  className="group relative h-[520px] w-full [perspective:2000px] cursor-pointer"
                  onClick={() => openQuoteModal(model.id)}
                >
                  <div className="relative w-full h-full transition-transform duration-[1000ms] ease-out [transform-style:preserve-3d] group-hover:[transform:rotateX(6deg)_rotateY(-6deg)_scale(1.05)] rounded-3xl overflow-hidden shadow-[0_20px_40px_rgba(2,132,199,0.2)] group-hover:shadow-[0_40px_80px_rgba(2,132,199,0.5)] bg-black">
                    
                    <div className="absolute inset-0 w-full h-full">
                      <Image 
                        src={model.image} 
                        alt={`Piscina modelo ${model.name}`}
                        fill
                        quality={70}
                        loading="lazy"
                        className="object-cover transition-transform duration-[10000ms] ease-out scale-105 group-hover:scale-125"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-[#011e38]/95 via-[#011e38]/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-700 pointer-events-none"></div>

                    <div className="absolute inset-0 p-6 flex flex-col justify-end [transform:translateZ(80px)] pointer-events-none">
                      
                      <div className="mb-5 transform transition-all duration-700 group-hover:-translate-y-3">
                        {model.badge && (
                          <span className="inline-block bg-white/20 backdrop-blur-md border border-white/30 text-white font-bold text-[9px] uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm mb-3">
                            {model.badge}
                          </span>
                        )}
                        <h3 className="text-3xl font-black text-white tracking-tight drop-shadow-xl">
                          {cleanName}
                        </h3>
                        {sizeSuffix && (
                          <p className="text-cyan-300 font-medium text-sm mt-1 tracking-wide drop-shadow-sm">
                            Modelo {sizeSuffix}
                          </p>
                        )}
                      </div>
                      
                      <div className="transform transition-all duration-700 opacity-80 group-hover:opacity-100 group-hover:-translate-y-1">
                        <ul className="flex flex-col gap-2 text-xs text-white font-medium mb-6 pl-2 border-l-2 border-cyan-400/50">
                          {model.dimensions.largo && model.dimensions.ancho && (
                            <li className="flex items-center gap-3">
                              <Maximize className="w-3.5 h-3.5 text-cyan-400" />
                              <span className="drop-shadow-sm">{model.dimensions.largo}m x {model.dimensions.ancho}m</span>
                            </li>
                          )}
                          {model.dimensions.diametro && (
                            <li className="flex items-center gap-3">
                              <Ruler className="w-3.5 h-3.5 text-cyan-400" />
                              <span className="drop-shadow-sm">Diámetro: {model.dimensions.diametro}m</span>
                            </li>
                          )}
                          <li className="flex items-center gap-3">
                            <Waves className="w-3.5 h-3.5 text-cyan-400" />
                            <span className="drop-shadow-sm">Prof. {model.dimensions.profundidadMin}m {model.dimensions.profundidadMax !== model.dimensions.profundidadMin ? `- ${model.dimensions.profundidadMax}m` : ''}</span>
                          </li>
                          {model.capacity && (
                            <li className="flex items-center gap-3">
                              <Users className="w-3.5 h-3.5 text-cyan-400" />
                              <span className="drop-shadow-sm">Capacidad: {model.capacity} pers.</span>
                            </li>
                          )}
                        </ul>
                        
                        <div className="flex items-end justify-between border-t border-white/10 pt-5">
                          <div className="flex flex-col">
                            <span className="text-[9px] uppercase tracking-widest text-cyan-100/70 font-bold mb-1">Precio Final</span>
                            <span className="text-2xl font-black text-white drop-shadow-md">
                              ${model.priceFrom.toLocaleString('es-CL')}
                            </span>
                          </div>
                          <div className="pointer-events-auto">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                openQuoteModal(model.id);
                              }}
                              className="inline-block bg-cyan-500 hover:bg-cyan-400 text-brand-dark rounded-full px-6 py-3 text-[10px] font-black uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(34,211,238,0.5)] hover:shadow-[0_0_30px_rgba(34,211,238,0.8)] border border-cyan-300"
                            >
                              Cotizar
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <QuoteModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        modelId={selectedModelId} 
      />
    </>
  );
}
