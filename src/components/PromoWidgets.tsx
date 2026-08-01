'use client';

import React, { useState, useEffect } from 'react';
import { Flame, X, ThermometerSun } from 'lucide-react';

export default function PromoWidgets() {
  const [showToast, setShowToast] = useState(false);
  const [toastClosed, setToastClosed] = useState(false);
  const [showBubble, setShowBubble] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Mostrar widgets después de scrollear un poco
      if (window.scrollY > 300) {
        if (!toastClosed) setShowToast(true);
        setShowBubble(true);
      } else {
        setShowToast(false);
        setShowBubble(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [toastClosed]);

  const scrollToContact = () => {
    const formSection = document.getElementById('cotizar');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* 1. TOAST (Notificación Inferior Izquierda) */}
      <div 
        className={`fixed bottom-24 left-4 md:bottom-28 md:left-6 z-[90] transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          showToast ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
        }`}
      >
        <div className="relative bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] p-4 max-w-sm border border-gray-100 overflow-hidden flex items-center gap-4">
          {/* Fondo decorativo */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          
          <button 
            onClick={() => {
              setShowToast(false);
              setToastClosed(true);
            }}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Cerrar notificación"
          >
            <X size={16} />
          </button>

          <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center text-white shadow-lg animate-pulse">
            <ThermometerSun size={24} />
          </div>

          <div className="pr-4 relative z-10">
            <p className="text-[13px] text-gray-800 font-bold leading-tight mb-1">
              ¿Sabías que puedes temperar tu piscina hasta 40°C?
            </p>
            <button 
              onClick={scrollToContact}
              className="text-[11px] font-black text-orange-600 uppercase tracking-wider hover:text-orange-700 transition-colors flex items-center gap-1"
            >
              Cotizar Bomba de Calor →
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
