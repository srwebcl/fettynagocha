'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Waves, Ruler, Maximize, Users, ThermometerSun, Info, LayoutGrid, List } from 'lucide-react';
import { POOL_MODELS } from '@/data/models';
import dynamic from 'next/dynamic';
import CinematicTitle from '@/components/ui/CinematicTitle';
import { motion } from 'framer-motion';
import AnimatedEmoji from '@/components/ui/AnimatedEmoji';

const QuoteModal = dynamic(() => import('@/components/QuoteModal'));

export default function CatalogSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedModelId, setSelectedModelId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'compact' | 'detailed'>('compact');

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
            <p className="text-xl text-brand-gray-600 max-w-2xl mx-auto font-medium leading-relaxed drop-shadow-sm flex items-center justify-center gap-2 mb-8">
              Explora nuestra línea de cascos de fibra de vidrio. Encuentra la forma y el tamaño ideal para tu patio.
            </p>

            {/* View Switcher (Solo Móvil) */}
            <div className="flex md:hidden justify-center mb-8">
              <div className="bg-white/80 backdrop-blur-sm p-1.5 rounded-full shadow-sm border border-brand-gray-100 flex gap-1">
                <button
                  onClick={() => setViewMode('compact')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                    viewMode === 'compact' 
                      ? 'bg-cyan-500 text-white shadow-md' 
                      : 'text-brand-gray-500 hover:text-brand-dark hover:bg-brand-gray-50'
                  }`}
                >
                  <LayoutGrid size={16} />
                  <span className="hidden sm:inline">Vista Compacta</span>
                </button>
                <button
                  onClick={() => setViewMode('detailed')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                    viewMode === 'detailed' 
                      ? 'bg-cyan-500 text-white shadow-md' 
                      : 'text-brand-gray-500 hover:text-brand-dark hover:bg-brand-gray-50'
                  }`}
                >
                  <List size={16} />
                  <span className="hidden sm:inline">Vista Detallada</span>
                </button>
              </div>
            </div>
          </div>

          <div className={`grid gap-y-8 md:gap-y-16 gap-x-3 md:gap-x-8 transition-all duration-500 md:grid-cols-2 lg:grid-cols-3 ${
            viewMode === 'compact' ? 'grid-cols-2' : 'grid-cols-1'
          }`}>
            {POOL_MODELS.map((model, index) => {
              const firstDigitIndex = model.name.search(/\d/);
              const cleanName = firstDigitIndex !== -1 ? model.name.substring(0, firstDigitIndex).trim() : model.name;
              const sizeSuffix = firstDigitIndex !== -1 ? model.name.substring(firstDigitIndex).trim() : '';

              const card = (
                <motion.div 
                  key={model.id} 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: 0.1, type: "spring", stiffness: 60 }}
                  className={`group relative w-full [perspective:2000px] cursor-pointer transition-all duration-500 ${
                    viewMode === 'compact' ? 'h-[380px] md:h-[520px]' : 'h-[520px] md:h-[520px]'
                  }`}
                  onClick={() => openQuoteModal(model.id)}
                >
                  <div className={`relative w-full h-full transition-transform duration-[1000ms] ease-out [transform-style:preserve-3d] group-hover:[transform:rotateX(6deg)_rotateY(-6deg)_scale(1.05)] overflow-hidden bg-black ${
                    viewMode === 'compact' 
                      ? 'rounded-2xl md:rounded-3xl shadow-[0_15px_30px_rgba(2,132,199,0.2)] md:shadow-[0_20px_40px_rgba(2,132,199,0.2)] group-hover:shadow-[0_40px_80px_rgba(2,132,199,0.5)]' 
                      : 'rounded-3xl shadow-[0_20px_40px_rgba(2,132,199,0.2)] group-hover:shadow-[0_40px_80px_rgba(2,132,199,0.5)]'
                  }`}>
                    
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

                    <div className={`absolute inset-0 flex flex-col justify-end [transform:translateZ(80px)] pointer-events-none ${
                      viewMode === 'compact' ? 'p-4 md:p-6' : 'p-6 md:p-8'
                    }`}>
                      
                      <div className={`transform transition-all duration-700 group-hover:-translate-y-2 md:group-hover:-translate-y-3 ${
                        viewMode === 'compact' ? 'mb-3 md:mb-5' : 'mb-5 md:mb-6'
                      }`}>
                          <div className={`flex flex-wrap mb-2 md:mb-3 ${
                            viewMode === 'compact' ? 'gap-1.5 md:gap-2' : 'gap-2 md:gap-3'
                          }`}>
                            {model.badge && (
                              <span className={`inline-block bg-white/20 backdrop-blur-md border border-white/30 text-white font-bold uppercase tracking-widest rounded-full shadow-sm ${
                                viewMode === 'compact' ? 'text-[8px] md:text-[9px] px-2 py-1 md:px-3 md:py-1.5' : 'text-[9px] md:text-[10px] px-3 py-1.5 md:px-4 md:py-2'
                              }`}>
                                {model.badge}
                              </span>
                            )}
                            <span className={`inline-flex items-center bg-gradient-to-r from-orange-500 to-amber-500 backdrop-blur-md border border-orange-400/50 text-white font-bold uppercase tracking-widest rounded-full shadow-[0_0_15px_rgba(245,158,11,0.5)] ${
                              viewMode === 'compact' ? 'gap-1 md:gap-1.5 text-[8px] md:text-[9px] px-2 py-1 md:px-3 md:py-1.5' : 'gap-1.5 md:gap-2 text-[9px] md:text-[10px] px-3 py-1.5 md:px-4 md:py-2'
                            }`}>
                              <ThermometerSun className={viewMode === 'compact' ? 'w-2.5 h-2.5 md:w-3 md:h-3' : 'w-3 h-3 md:w-4 md:h-4'} />
                              <span className={viewMode === 'compact' ? 'hidden sm:inline' : 'inline'}>Opción Temperada</span>
                              {viewMode === 'compact' && <span className="inline sm:hidden">Temperada</span>}
                            </span>
                          </div>
                        <h3 className={`font-black text-white tracking-tight drop-shadow-xl leading-none ${
                          viewMode === 'compact' ? 'text-xl sm:text-2xl md:text-3xl' : 'text-3xl sm:text-4xl md:text-3xl'
                        }`}>
                          {cleanName}
                        </h3>
                        {sizeSuffix && (
                          <p className={`text-cyan-300 font-medium mt-1 tracking-wide drop-shadow-sm ${
                            viewMode === 'compact' ? 'text-xs md:text-sm' : 'text-sm md:text-base'
                          }`}>
                            Modelo {sizeSuffix}
                          </p>
                        )}
                      </div>
                      
                      <div className="transform transition-all duration-700 opacity-80 group-hover:opacity-100 group-hover:-translate-y-1">
                        <ul className={`flex flex-col text-white font-medium pl-2 border-l-2 border-cyan-400/50 ${
                          viewMode === 'compact' ? 'gap-1.5 md:gap-2 text-[10px] md:text-xs mb-3 md:mb-6' : 'gap-2 md:gap-3 text-xs md:text-sm mb-5 md:mb-8'
                        }`}>
                          {model.dimensions.largo && model.dimensions.ancho && (
                            <li className={`flex items-center ${viewMode === 'compact' ? 'gap-2 md:gap-3' : 'gap-3 md:gap-4'}`}>
                              <Maximize className={`text-cyan-400 ${viewMode === 'compact' ? 'w-3 h-3 md:w-3.5 md:h-3.5' : 'w-4 h-4 md:w-5 md:h-5'}`} />
                              <span className="drop-shadow-sm">{model.dimensions.largo}m x {model.dimensions.ancho}m</span>
                            </li>
                          )}
                          {model.dimensions.diametro && (
                            <li className={`flex items-center ${viewMode === 'compact' ? 'gap-2 md:gap-3' : 'gap-3 md:gap-4'}`}>
                              <Ruler className={`text-cyan-400 ${viewMode === 'compact' ? 'w-3 h-3 md:w-3.5 md:h-3.5' : 'w-4 h-4 md:w-5 md:h-5'}`} />
                              <span className="drop-shadow-sm">Diámetro: {model.dimensions.diametro}m</span>
                            </li>
                          )}
                          <li className={`flex items-center ${viewMode === 'compact' ? 'gap-2 md:gap-3' : 'gap-3 md:gap-4'}`}>
                            <Waves className={`text-cyan-400 ${viewMode === 'compact' ? 'w-3 h-3 md:w-3.5 md:h-3.5' : 'w-4 h-4 md:w-5 md:h-5'}`} />
                            <span className="drop-shadow-sm">Profundidad {model.dimensions.profundidadMin}m {model.dimensions.profundidadMax !== model.dimensions.profundidadMin ? `- ${model.dimensions.profundidadMax}m` : ''}</span>
                          </li>
                          {model.capacity && (
                            <li className={`flex items-center ${viewMode === 'compact' ? 'gap-2 md:gap-3' : 'gap-3 md:gap-4'}`}>
                              <Users className={`text-cyan-400 ${viewMode === 'compact' ? 'w-3 h-3 md:w-3.5 md:h-3.5' : 'w-4 h-4 md:w-5 md:h-5'}`} />
                              <span className="drop-shadow-sm">Capacidad: {model.capacity} personas</span>
                            </li>
                          )}
                        </ul>
                        
                        <div className={`flex flex-col sm:flex-row sm:items-end justify-between border-t border-white/10 gap-2 sm:gap-0 ${
                          viewMode === 'compact' ? 'pt-3 md:pt-5' : 'pt-5 md:pt-6'
                        }`}>
                          <div className="flex flex-col">
                            <span className={`uppercase tracking-widest text-cyan-100/70 font-bold ${
                              viewMode === 'compact' ? 'text-[8px] md:text-[9px] mb-0.5 md:mb-1' : 'text-[9px] md:text-[10px] mb-1'
                            }`}>Precio Final</span>
                            <span className={`font-black text-white drop-shadow-md ${
                              viewMode === 'compact' ? 'text-lg sm:text-xl md:text-2xl' : 'text-2xl sm:text-3xl md:text-4xl'
                            }`}>
                              ${model.priceFrom.toLocaleString('es-CL')}
                            </span>
                          </div>
                          <div className="pointer-events-auto">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                openQuoteModal(model.id);
                              }}
                              className={`inline-block bg-cyan-500 hover:bg-cyan-400 text-brand-dark rounded-full font-black uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(34,211,238,0.5)] hover:shadow-[0_0_30px_rgba(34,211,238,0.8)] border border-cyan-300 w-full sm:w-auto text-center ${
                                viewMode === 'compact' ? 'px-4 py-2 md:px-6 md:py-3 text-[9px] md:text-[10px]' : 'px-6 py-3 md:px-6 md:py-3 text-[10px] md:text-[10px]'
                              }`}
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

              if (index === 2) {
                return (
                  <React.Fragment key={`card-${model.id}`}>
                    {card}
                  </React.Fragment>
                );
              }

              return card;
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
