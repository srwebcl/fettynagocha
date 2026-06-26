'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { X, ChevronRight, ChevronLeft, CheckCircle2, MapPin, Palette, User, Calendar, Clock, ThermometerSun } from 'lucide-react';
import { POOL_MODELS } from '@/data/models';
import { QuoteFormData } from '@/types';
import { getUpcomingAvailableDays } from '@/utils/date';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  modelId: string | null;
}

const POOL_COLORS = [
  { id: 'azul', name: 'Azul', hex: 'linear-gradient(135deg, #60A5FA 0%, #3B82F6 100%)' },
  { id: 'celeste', name: 'Celeste', hex: 'linear-gradient(135deg, #93C5FD 0%, #7DD3FC 100%)' },
  { id: 'turquesa', name: 'Turquesa', hex: 'linear-gradient(135deg, #6EE7B7 0%, #2DD4BF 100%)' },
  { id: 'blanco', name: 'Blanco', hex: 'linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%)' },
  { id: 'verde', name: 'Verde', hex: 'linear-gradient(135deg, #6EE7B7 0%, #10B981 100%)' },
];

const COMMUNES = ['La Serena', 'Coquimbo', 'Vallenar', 'Ovalle', 'Otro'];

export default function QuoteModal({ isOpen, onClose, modelId }: QuoteModalProps) {
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState<QuoteFormData>({
    name: '',
    phone: '',
    email: '',
    commune: '',
    otherCommune: '',
    projectType: 'fibra',
    modelId: '',
    poolColor: '',
    message: '',
    visitDate: '',
    visitTime: '',
  });

  const [contactIntent, setContactIntent] = useState<'agendar' | 'cotizar'>('agendar');
  const availableDays = useMemo(() => getUpcomingAvailableDays(14), []);

  // Sync modelId when modal opens
  useEffect(() => {
    if (isOpen && modelId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData(prev => ({ ...prev, modelId }));
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStep(1);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStatus('idle');
    }
    
    // Lock body scroll when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, modelId]);

  if (!isOpen) return null;

  const model = POOL_MODELS.find(m => m.id === modelId) || POOL_MODELS[0];
  const firstDigitIndex = model.name.search(/\d/);
  const cleanName = firstDigitIndex !== -1 ? model.name.substring(0, firstDigitIndex).trim() : model.name;
  const sizeSuffix = firstDigitIndex !== -1 ? model.name.substring(firstDigitIndex).trim() : '';

  const handleNext = () => setStep(prev => Math.min(prev + 1, 3));
  const handlePrev = () => setStep(prev => Math.max(prev - 1, 1));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // Combine commune strings if needed
    const finalData = {
      ...formData,
      commune: formData.commune === 'Otro' ? formData.otherCommune || 'Otra Comuna' : formData.commune,
      visitDate: contactIntent === 'cotizar' ? 'Solo Presupuesto' : formData.visitDate,
      visitTime: contactIntent === 'cotizar' ? 'Solo Presupuesto' : formData.visitTime,
    };

    try {
      const res = await fetch('/api/cotizar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalData),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setStatus('error');
    }
  };

  const isStep1Valid = !!formData.poolColor;
  const isStep2Valid = !!formData.commune && (formData.commune !== 'Otro' || !!formData.otherCommune);
  const isStep3Valid = !!formData.name && !!formData.phone && !!formData.email && (contactIntent === 'cotizar' || (!!formData.visitDate && !!formData.visitTime));

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-brand-dark/60 backdrop-blur-md transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div className="relative w-full max-w-5xl h-[90vh] max-h-[800px] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row transform transition-all">
        
        {/* Botón Cerrar Global */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 z-[60] p-2 bg-white/80 backdrop-blur-md shadow-md text-brand-dark rounded-full hover:bg-brand-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Panel Izquierdo: Resumen del Modelo (Fijo en desktop, Oculto en móviles si está en pasos 2/3) */}
        <div className={`md:w-5/12 relative bg-brand-gray-900 ${step > 1 ? 'hidden md:block' : 'block h-2/5 md:h-full'}`}>
          <div className="absolute inset-0">
            <Image 
              src={model.image}
              alt={model.name}
              fill
              className="object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-gray-900 via-brand-gray-900/40 to-transparent"></div>
          </div>
          <div className="absolute inset-0 p-8 flex flex-col justify-end">
            <span className="text-cyan-400 font-bold text-xs uppercase tracking-widest mb-2">Tu Configuración</span>
            <h2 className="text-3xl md:text-4xl font-black text-white leading-tight mb-1">{cleanName}</h2>
            {sizeSuffix && <p className="text-cyan-400 font-bold mb-6 text-lg">Modelo {sizeSuffix}</p>}
            
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-brand-gray-400 text-sm">Valor Base</span>
                <span className="text-white font-bold">${model.priceFrom.toLocaleString('es-CL')}</span>
              </div>
              {formData.poolColor && (
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="text-brand-gray-400 text-sm">Color</span>
                  <span className="text-white font-medium capitalize">{formData.poolColor}</span>
                </div>
              )}
              {formData.commune && (
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="text-brand-gray-400 text-sm">Instalación en</span>
                  <span className="text-white font-medium">
                    {formData.commune === 'Otro' ? (formData.otherCommune || 'Por definir') : formData.commune}
                  </span>
                </div>
              )}
              {contactIntent === 'agendar' && formData.visitDate && (
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="text-brand-gray-400 text-sm">Visita</span>
                  <div className="text-right">
                    <span className="text-white font-medium block">
                      {availableDays.find(d => d.id === formData.visitDate)
                            ? `${availableDays.find(d => d.id === formData.visitDate)?.dayNumber} ${availableDays.find(d => d.id === formData.visitDate)?.monthName}`
                            : formData.visitDate}
                    </span>
                    {formData.visitTime && <span className="text-cyan-400 text-xs capitalize">{formData.visitTime}</span>}
                  </div>
                </div>
              )}
              {contactIntent === 'cotizar' && (
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="text-brand-gray-400 text-sm">Visita</span>
                  <span className="text-white font-medium text-right">Solo Presupuesto<br/><span className="text-xs text-brand-gray-400">(Sin visita por ahora)</span></span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Panel Derecho: Flujo (Wizard) */}
        <div className="md:w-7/12 flex flex-col h-3/5 md:h-full bg-white relative overflow-y-auto">
          
          {status === 'success' ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 md:p-16 text-center">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="w-10 h-10 text-emerald-500" />
              </div>
              <h3 className="text-3xl font-black text-brand-dark mb-4">¡Configuración Enviada!</h3>
              <p className="text-brand-gray-600 mb-8 text-lg">
                Gracias por cotizar tu {cleanName}. Nuestro equipo revisará tus preferencias y te contactará a la brevedad con un presupuesto exacto para {formData.commune}.
              </p>
              <button 
                onClick={onClose}
                className="bg-brand-primary text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all"
              >
                Volver al Catálogo
              </button>
            </div>
          ) : (
            <>
              {/* Progreso Header */}
              <div className="px-6 pt-6 pb-4 md:px-10 md:pt-8 md:pb-4 border-b border-brand-gray-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur z-10 pr-16 md:pr-16">
                <div className="flex space-x-2">
                  {[1, 2, 3].map(i => (
                    <div 
                      key={i} 
                      className={`h-1.5 w-8 md:w-12 rounded-full transition-colors duration-500 ${step >= i ? 'bg-cyan-500' : 'bg-brand-gray-200'}`}
                    />
                  ))}
                </div>
                <span className="text-xs md:text-sm font-bold text-brand-gray-400">Paso {step} de 3</span>
              </div>

              {/* Contenido de Pasos */}
              <div className="flex-1 p-6 md:p-10 overflow-y-auto">
                <form onSubmit={step === 3 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }}>
                  
                  {/* PASO 1: COLOR */}
                  {step === 1 && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                      <div className="flex items-center gap-3 mb-2">
                        <Palette className="w-6 h-6 text-cyan-500" />
                        <h3 className="text-2xl font-black text-brand-dark">Color de la Piscina</h3>
                      </div>
                      <p className="text-brand-gray-500 mb-4 text-sm md:text-base">Elige el tono que mejor combine con tu entorno.</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                        {POOL_COLORS.map(color => (
                          <div 
                            key={color.id}
                            onClick={() => setFormData(prev => ({ ...prev, poolColor: color.name }))}
                            className={`cursor-pointer rounded-2xl border-2 p-3 md:p-4 flex flex-col items-center justify-center gap-2 md:gap-3 transition-all ${formData.poolColor === color.name ? 'border-cyan-500 bg-cyan-50 shadow-md' : 'border-brand-gray-200 hover:border-cyan-300'}`}
                          >
                            <div 
                              className="w-8 h-8 md:w-12 md:h-12 rounded-full shadow-inner border border-black/10"
                              style={{ background: color.hex }}
                            />
                            <span className={`font-semibold text-xs md:text-sm ${formData.poolColor === color.name ? 'text-cyan-700' : 'text-brand-gray-700'}`}>
                              {color.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* PASO 2: UBICACIÓN */}
                  {step === 2 && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                      <div className="flex items-center gap-3 mb-2">
                        <MapPin className="w-6 h-6 text-cyan-500" />
                        <h3 className="text-2xl font-black text-brand-dark">Zona de Instalación</h3>
                      </div>
                      <p className="text-brand-gray-500 mb-8">¿En qué comuna instalaremos tu {cleanName}?</p>
                      
                      <div className="grid grid-cols-2 gap-3">
                        {COMMUNES.map(commune => (
                          <div 
                            key={commune}
                            onClick={() => setFormData(prev => ({ ...prev, commune }))}
                            className={`cursor-pointer rounded-xl border-2 p-4 text-center transition-all ${formData.commune === commune ? 'border-cyan-500 bg-cyan-50 text-cyan-700 font-bold shadow-sm' : 'border-brand-gray-200 text-brand-gray-700 font-medium hover:border-cyan-300'}`}
                          >
                            {commune}
                          </div>
                        ))}
                      </div>

                      {/* Input Dinámico para "Otro" */}
                      {formData.commune === 'Otro' && (
                        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 mt-4">
                          <label className="block text-sm font-semibold text-brand-gray-800 mb-2">Por favor, indícanos dónde:</label>
                          <input 
                            type="text"
                            name="otherCommune"
                            value={formData.otherCommune}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-xl border border-brand-gray-200 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all"
                            placeholder="Ej. Vicuña, Andacollo..."
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {/* PASO 3: DATOS Y VISITA */}
                  {step === 3 && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                      <div className="flex items-center gap-3 mb-2">
                        <Calendar className="w-6 h-6 text-cyan-500" />
                        <h3 className="text-2xl font-black text-brand-dark">Coordinemos</h3>
                      </div>
                      <p className="text-brand-gray-500 mb-8">Elige tu preferencia para que podamos avanzar con tu proyecto.</p>
                      
                      {status === 'error' && (
                        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg text-sm border border-red-200">
                          Hubo un error al procesar tu solicitud. Por favor intenta nuevamente.
                        </div>
                      )}

                      {/* INTENT TABS */}
                      <div className="flex flex-col mb-6">
                        <div className="flex p-1 bg-brand-gray-100 rounded-xl">
                          <button 
                            type="button"
                            onClick={() => setContactIntent('agendar')}
                            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${contactIntent === 'agendar' ? 'bg-white text-brand-dark shadow-sm border border-brand-gray-200' : 'text-brand-gray-500 hover:text-brand-dark'}`}
                          >
                            Agendar Visita Técnica
                          </button>
                          <button 
                            type="button"
                            onClick={() => setContactIntent('cotizar')}
                            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${contactIntent === 'cotizar' ? 'bg-white text-brand-dark shadow-sm border border-brand-gray-200' : 'text-brand-gray-500 hover:text-brand-dark'}`}
                          >
                            Solo Cotización
                          </button>
                        </div>
                        {contactIntent === 'agendar' && (
                          <span className="text-[10px] text-cyan-600 font-medium text-center mt-2 block">* La visita a terreno es 100% gratuita y sin compromiso.</span>
                        )}
                      </div>

                      {contactIntent === 'agendar' ? (
                        <>
                          {/* CINTA HORIZONTAL CALENDARIO (LIGHT THEME) */}
                          <div className="mb-6 animate-in fade-in slide-in-from-left-2 duration-300">
                            <label className="block text-sm font-semibold text-brand-gray-800 mb-3">1. Selecciona el Día</label>
                            <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar snap-x">
                              {availableDays.map(day => (
                                <div 
                                  key={day.id}
                                  onClick={() => setFormData(prev => ({ ...prev, visitDate: day.id, visitTime: (day.isSaturday && prev.visitTime === 'tarde') ? '' : prev.visitTime }))}
                                  className={`snap-center flex-shrink-0 cursor-pointer w-[72px] h-24 rounded-2xl border-2 flex flex-col items-center justify-center gap-1 transition-all ${
                                    formData.visitDate === day.id 
                                      ? 'border-cyan-500 bg-cyan-50 shadow-md' 
                                      : 'border-brand-gray-200 bg-white hover:border-cyan-300'
                                  }`}
                                >
                                  <span className={`text-xs font-bold uppercase tracking-wider ${formData.visitDate === day.id ? 'text-cyan-600' : 'text-brand-gray-400'}`}>{day.dayName}</span>
                                  <span className={`text-2xl font-black ${formData.visitDate === day.id ? 'text-brand-dark' : 'text-brand-gray-800'}`}>{day.dayNumber}</span>
                                  <span className={`text-[10px] font-bold ${formData.visitDate === day.id ? 'text-cyan-600' : 'text-brand-gray-400'}`}>{day.monthName}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* BLOQUES HORARIOS */}
                          {formData.visitDate && (
                            <div className="mb-8 animate-in fade-in slide-in-from-top-2 duration-300">
                              <label className="block text-sm font-semibold text-brand-gray-800 mb-3">2. Bloque Horario</label>
                              <div className="grid grid-cols-2 gap-3">
                                <div 
                                  onClick={() => setFormData(prev => ({ ...prev, visitTime: 'mañana' }))}
                                  className={`cursor-pointer rounded-xl border-2 p-3 flex items-center justify-center gap-2 transition-all ${
                                    formData.visitTime === 'mañana' ? 'border-cyan-500 bg-cyan-50 shadow-sm' : 'border-brand-gray-200 hover:border-cyan-300'
                                  }`}
                                >
                                  <ThermometerSun className={`w-5 h-5 ${formData.visitTime === 'mañana' ? 'text-cyan-600' : 'text-brand-gray-400'}`} />
                                  <div>
                                    <span className={`block font-bold text-sm ${formData.visitTime === 'mañana' ? 'text-cyan-700' : 'text-brand-gray-700'}`}>Mañana</span>
                                    <span className="block text-[10px] text-brand-gray-500">09:00 - 13:00</span>
                                  </div>
                                </div>

                                {!(availableDays.find(d => d.id === formData.visitDate)?.isSaturday) ? (
                                  <div 
                                    onClick={() => setFormData(prev => ({ ...prev, visitTime: 'tarde' }))}
                                    className={`cursor-pointer rounded-xl border-2 p-3 flex items-center justify-center gap-2 transition-all ${
                                      formData.visitTime === 'tarde' ? 'border-cyan-500 bg-cyan-50 shadow-sm' : 'border-brand-gray-200 hover:border-cyan-300'
                                    }`}
                                  >
                                    <Clock className={`w-5 h-5 ${formData.visitTime === 'tarde' ? 'text-cyan-600' : 'text-brand-gray-400'}`} />
                                    <div>
                                      <span className={`block font-bold text-sm ${formData.visitTime === 'tarde' ? 'text-cyan-700' : 'text-brand-gray-700'}`}>Tarde</span>
                                      <span className="block text-[10px] text-brand-gray-500">14:00 - 18:00</span>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="rounded-xl border-2 border-brand-gray-100 bg-brand-gray-50 p-3 flex items-center justify-center gap-2 opacity-60 cursor-not-allowed">
                                    <Clock className="w-5 h-5 text-brand-gray-300" />
                                    <div>
                                      <span className="block font-bold text-sm text-brand-gray-400">Tarde</span>
                                      <span className="block text-[10px] text-brand-gray-400">Cerrado</span>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="mb-6 p-4 bg-cyan-50 rounded-xl border border-cyan-100 text-sm text-cyan-800 leading-relaxed">
                          Perfecto. Elaboraremos un presupuesto preliminar basado en tu selección y te lo enviaremos a la brevedad. Siempre podrás agendar una visita técnica más adelante si decides avanzar.
                        </div>
                      )}

                      {/* DATOS DE CONTACTO */}
                      {(contactIntent === 'cotizar' || (formData.visitDate && formData.visitTime)) && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300 border-t border-brand-gray-100 pt-6">
                          <label className="block text-sm font-semibold text-brand-gray-800 mb-2">{contactIntent === 'agendar' ? '3.' : '1.'} Tus Datos</label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input 
                              type="text" 
                              name="name" 
                              required 
                              value={formData.name}
                              onChange={handleChange}
                              className="w-full px-4 py-3 rounded-xl border border-brand-gray-200 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all"
                              placeholder="Nombre Completo"
                            />
                            <input 
                              type="tel" 
                              name="phone" 
                              required 
                              value={formData.phone}
                              onChange={handleChange}
                              className="w-full px-4 py-3 rounded-xl border border-brand-gray-200 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all"
                              placeholder="Teléfono (WhatsApp)"
                            />
                          </div>
                          <input 
                            type="email" 
                            name="email" 
                            required 
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-brand-gray-200 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all"
                            placeholder="Correo Electrónico"
                          />
                          <textarea 
                            name="message" 
                            rows={2} 
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-brand-gray-200 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all resize-none"
                            placeholder="Ej. La casa está en una esquina, timbre rojo..."
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {/* Footer Botones */}
                  <div className="mt-8 flex items-center justify-between">
                    {step > 1 ? (
                      <button 
                        type="button" 
                        onClick={handlePrev}
                        className="text-brand-gray-500 font-semibold hover:text-brand-dark flex items-center gap-1 transition-colors"
                      >
                        <ChevronLeft className="w-5 h-5" /> Atrás
                      </button>
                    ) : <div></div>}
                    
                    {step < 3 ? (
                      <button 
                        type="button" 
                        onClick={handleNext}
                        disabled={(step === 1 && !isStep1Valid) || (step === 2 && !isStep2Valid)}
                        className="bg-brand-dark text-white font-bold py-2.5 px-6 rounded-full flex items-center gap-2 hover:bg-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Siguiente <ChevronRight className="w-5 h-5" />
                      </button>
                    ) : (
                      <button 
                        type="submit" 
                        disabled={status === 'loading' || !isStep3Valid}
                        className="bg-gradient-to-r from-brand-primary to-cyan-500 text-white font-bold py-2.5 px-6 rounded-full shadow-[0_0_20px_rgba(2,132,199,0.3)] flex items-center gap-2 hover:shadow-[0_0_30px_rgba(2,132,199,0.5)] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {status === 'loading' ? 'Enviando...' : (contactIntent === 'agendar' ? 'Obtener Cotización' : 'Solicitar Presupuesto')}
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
