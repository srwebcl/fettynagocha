'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { ChevronRight, ChevronLeft, CheckCircle2, MapPin, Palette, User, Box, Droplets, Wrench, ThermometerSun, Hammer, Calendar, Clock } from 'lucide-react';
import { POOL_MODELS } from '@/data/models';
import { QuoteFormData } from '@/types';
import CinematicTitle from '@/components/ui/CinematicTitle';
import { getUpcomingAvailableDays } from '@/utils/date';
import { motion } from 'framer-motion';
import AnimatedEmoji from '@/components/ui/AnimatedEmoji';

const POOL_COLORS = [
  { id: 'azul', name: 'Azul', hex: 'linear-gradient(135deg, #60A5FA 0%, #3B82F6 100%)' },
  { id: 'celeste', name: 'Celeste', hex: 'linear-gradient(135deg, #93C5FD 0%, #7DD3FC 100%)' },
  { id: 'turquesa', name: 'Turquesa', hex: 'linear-gradient(135deg, #6EE7B7 0%, #2DD4BF 100%)' },
  { id: 'blanco', name: 'Blanco', hex: 'linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%)' },
  { id: 'verde', name: 'Verde', hex: 'linear-gradient(135deg, #6EE7B7 0%, #10B981 100%)' },
];

const COMMUNES = ['La Serena', 'Coquimbo', 'Vallenar', 'Ovalle', 'Otro'];

const PROJECT_TYPES = [
  { id: 'fibra', title: 'Piscina de Fibra', desc: 'Instalación rápida', icon: Box },
  { id: 'personalizado', title: 'Diseño a Medida', desc: 'Hormigón o formas libres', icon: Hammer },
  { id: 'fulget', title: 'Solo Fulget', desc: 'Bordes y terminaciones', icon: Droplets },
  { id: 'reparacion', title: 'Reparaciones', desc: 'Filtraciones o mejoras', icon: Wrench },
  { id: 'temperado', title: 'Temperado', desc: 'Bombas de calor', icon: ThermometerSun },
];

export default function DesignPatioSection() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [contactIntent, setContactIntent] = useState<'agendar' | 'cotizar'>('agendar');
  const [formData, setFormData] = useState<QuoteFormData>({
    name: '',
    phone: '',
    email: '',
    commune: '',
    otherCommune: '',
    projectType: '',
    modelId: '',
    poolColor: '',
    message: '',
    visitDate: '',
    visitTime: '',
  });

  const availableDays = useMemo(() => getUpcomingAvailableDays(14), []);

  // Dynamic step logic
  const steps = useMemo(() => {
    if (!formData.projectType) return ['type'];
    if (formData.projectType === 'fibra') {
      return ['type', 'model', 'color', 'location', 'contact'];
    }
    // Para todos los demás servicios (hormigón, fulget, etc.), saltamos modelo y color
    return ['type', 'location', 'contact'];
  }, [formData.projectType]);

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const currentStep = steps[currentStepIndex];

  const handleNext = () => setCurrentStepIndex(prev => Math.min(prev + 1, steps.length - 1));
  const handlePrev = () => setCurrentStepIndex(prev => Math.max(prev - 1, 0));

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

  const resetForm = () => {
    setCurrentStepIndex(0);
    setStatus('idle');
    setFormData({
      name: '',
      phone: '',
      email: '',
      commune: '',
      otherCommune: '',
      projectType: '',
      modelId: '',
      poolColor: '',
      message: '',
      visitDate: '',
      visitTime: '',
    });
  };

  // Validaciones
  const isTypeValid = !!formData.projectType;
  const isModelValid = !!formData.modelId;
  const isColorValid = !!formData.poolColor;
  const isLocationValid = !!formData.commune && (formData.commune !== 'Otro' || !!formData.otherCommune);
  const isContactValid = !!formData.name && !!formData.phone && !!formData.email && (contactIntent === 'cotizar' || (!!formData.visitDate && !!formData.visitTime));

  const getIsNextValid = () => {
    if (currentStep === 'type') return isTypeValid;
    if (currentStep === 'model') return isModelValid;
    if (currentStep === 'color') return isColorValid;
    if (currentStep === 'location') return isLocationValid;
    if (currentStep === 'contact') return isContactValid;
    return true;
  };

  // Datos para el resumen
  const selectedTypeObj = PROJECT_TYPES.find(t => t.id === formData.projectType);
  const selectedModel = POOL_MODELS.find(m => m.id === formData.modelId);
  const cleanName = selectedModel ? (selectedModel.name.search(/\d/) !== -1 ? selectedModel.name.substring(0, selectedModel.name.search(/\d/)).trim() : selectedModel.name) : '';

  return (
    <section id="cotizar" className="py-32 relative overflow-hidden flex flex-col items-center">
      {/* Fondo inmersivo más alegre y soleado */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-600 via-blue-500 to-sky-400 z-0"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.15)_0%,transparent_70%)] z-0 pointer-events-none"></div>

      <div className="w-full max-w-5xl mx-auto px-4 relative z-20">
        
        {/* Cabecera de la Sección */}
        <div className="mb-16 text-center">
          <div className="flex justify-center items-center gap-4 mb-2">
            <AnimatedEmoji symbol="🔥" delay={0} className="text-3xl" />
            <CinematicTitle 
              lightText="Diseña tu" 
              boldText="Proyecto" 
              theme="dark" 
              customGradient="from-blue-950 via-indigo-900 to-blue-800 drop-shadow-md" 
            />
            <AnimatedEmoji symbol="📐" delay={0} className="text-3xl" />
          </div>
          <p className="text-xl text-white/90 max-w-2xl mx-auto font-medium leading-relaxed drop-shadow-md flex items-center justify-center gap-2">
            Cuéntanos qué tienes en mente. Nuestro equipo evaluará tu solicitud y te entregará una propuesta a medida.
          </p>
        </div>

        {/* Contenedor del Formulario Glassmorphism */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, type: "spring", stiffness: 50 }}
          className="w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row"
        >
          
          {/* Panel Izquierdo: Resumen */}
          <div className="hidden md:flex md:w-1/3 bg-black/30 p-8 flex-col justify-between border-r border-white/10">
            <div>
              <span className="text-cyan-200 font-bold text-xs uppercase tracking-widest mb-4 block">Resumen de tu Cotización</span>
              
              {!formData.projectType ? (
                <div className="text-white/60 text-sm italic">Comienza seleccionando un servicio...</div>
              ) : (
                <div className="space-y-6">
                  {/* Tipo de Proyecto */}
                  <div className="border-b border-white/10 pb-4">
                    <span className="text-white/70 text-xs block mb-1">Servicio Solicitado</span>
                    <span className="text-white font-bold text-lg">{selectedTypeObj?.title}</span>
                  </div>

                  {/* Modelo (si aplica) */}
                  {formData.projectType === 'fibra' && formData.modelId && selectedModel && (
                    <div className="border-b border-white/10 pb-4">
                      <span className="text-white/70 text-xs block mb-1">Modelo de Piscina</span>
                      <span className="text-white font-bold text-lg">{cleanName}</span>
                      <ul className="text-white/80 text-xs mt-2 space-y-1">
                        <li>• Medidas: {selectedModel.dimensions.largo}m x {selectedModel.dimensions.ancho}m</li>
                        <li>• Profundidad: {selectedModel.dimensions.profundidadMin}m {selectedModel.dimensions.profundidadMax !== selectedModel.dimensions.profundidadMin ? `- ${selectedModel.dimensions.profundidadMax}m` : ''}</li>
                      </ul>
                    </div>
                  )}
                  
                  {/* Color */}
                  {formData.poolColor && (
                    <div className="border-b border-white/10 pb-4">
                      <span className="text-white/70 text-xs block mb-1">Color Interior</span>
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-4 h-4 rounded-full border border-white/30" 
                          style={{ background: POOL_COLORS.find(c => c.name === formData.poolColor)?.hex || 'white' }}
                        ></div>
                        <span className="text-white font-medium capitalize">{formData.poolColor}</span>
                      </div>
                    </div>
                  )}

                  {/* Comuna */}
                  {formData.commune && (
                    <div className="border-b border-white/10 pb-4">
                      <span className="text-white/70 text-xs block mb-1">Zona de Trabajo</span>
                      <span className="text-white font-medium">
                        {formData.commune === 'Otro' ? (formData.otherCommune || 'Por definir') : formData.commune}
                      </span>
                    </div>
                  )}

                  {/* Fecha de Visita */}
                  {contactIntent === 'agendar' && formData.visitDate && (
                    <div className="border-b border-white/10 pb-4">
                      <span className="text-white/70 text-xs block mb-1">Visita Técnica</span>
                      <div className="flex flex-col">
                        <span className="text-white font-medium">{
                          availableDays.find(d => d.id === formData.visitDate)
                            ? `${availableDays.find(d => d.id === formData.visitDate)?.dayName} ${availableDays.find(d => d.id === formData.visitDate)?.dayNumber} ${availableDays.find(d => d.id === formData.visitDate)?.monthName}`
                            : formData.visitDate
                        }</span>
                        {formData.visitTime && (
                          <span className="text-cyan-300 text-sm capitalize">Bloque {formData.visitTime}</span>
                        )}
                      </div>
                    </div>
                  )}
                  {contactIntent === 'cotizar' && (
                    <div className="border-b border-white/10 pb-4">
                      <span className="text-white/70 text-xs block mb-1">Visita Técnica</span>
                      <span className="text-white font-medium">Solo Presupuesto (Sin visita)</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Progreso Visual Lateral */}
            <div className="mt-8">
              <div className="flex items-center justify-between text-xs text-white/70 mb-2 font-medium">
                <span>Progreso</span>
                <span>Paso {currentStepIndex + 1} de {steps.length}</span>
              </div>
              <div className="w-full bg-black/40 rounded-full h-2">
                <div 
                  className="bg-cyan-300 h-2 rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(103,232,249,0.5)]" 
                  style={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Panel Derecho: Flujo Wizard */}
          <div className="w-full md:w-2/3 p-6 md:p-10 min-h-[500px] flex flex-col relative bg-white/5">
            
            {status === 'success' ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-emerald-400/20 rounded-full flex items-center justify-center mb-6 border border-emerald-400/50 shadow-[0_0_30px_rgba(52,211,153,0.3)]">
                  <CheckCircle2 className="w-10 h-10 text-emerald-300" />
                </div>
                <h3 className="text-3xl font-black text-white mb-4 drop-shadow-md">¡Solicitud Recibida!</h3>
                <p className="text-white/90 mb-8 text-lg max-w-md mx-auto font-medium">
                  Hemos registrado tus preferencias. Un especialista de nuestro equipo se contactará contigo para coordinar la visita a terreno.
                </p>
                <button 
                  onClick={resetForm}
                  className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold py-3 px-8 rounded-full transition-all backdrop-blur-sm"
                >
                  Nueva Solicitud
                </button>
              </div>
            ) : (
              <>
                {/* Indicador Móvil */}
                <div className="md:hidden flex items-center justify-between text-xs text-white/80 mb-6 pb-4 border-b border-white/20 font-medium">
                  <span>Paso {currentStepIndex + 1} de {steps.length}</span>
                  <span className="text-cyan-200 font-bold uppercase tracking-wide">
                    {currentStep === 'type' ? 'Servicio' : 
                     currentStep === 'model' ? 'Modelo' : 
                     currentStep === 'color' ? 'Color' : 
                     currentStep === 'location' ? 'Lugar' : 'Datos'}
                  </span>
                </div>

                <form className="flex-1 flex flex-col" onSubmit={currentStepIndex === steps.length - 1 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }}>
                  
                  {/* PASO: TIPO DE PROYECTO */}
                  {currentStep === 'type' && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-500 flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Wrench className="w-6 h-6 text-cyan-200 drop-shadow-md" />
                        <h3 className="text-2xl font-black text-white drop-shadow-sm">¿Qué servicio necesitas?</h3>
                      </div>
                      <p className="text-white/80 mb-6 text-sm font-medium">Selecciona la opción que mejor describa tu requerimiento.</p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {PROJECT_TYPES.map(type => {
                          const Icon = type.icon;
                          return (
                            <div 
                              key={type.id}
                              onClick={() => setFormData(prev => ({ ...prev, projectType: type.id, modelId: '', poolColor: '' }))}
                              className={`cursor-pointer rounded-xl border p-4 flex items-center gap-4 transition-all ${formData.projectType === type.id ? 'border-cyan-300 bg-cyan-900/40 shadow-[0_0_15px_rgba(103,232,249,0.3)]' : 'border-white/20 bg-black/20 hover:border-white/50 hover:bg-black/30'}`}
                            >
                              <div className={`p-3 rounded-full ${formData.projectType === type.id ? 'bg-cyan-500 text-brand-dark' : 'bg-white/10 text-white'}`}>
                                <Icon className="w-5 h-5" />
                              </div>
                              <div>
                                <h4 className={`font-bold ${formData.projectType === type.id ? 'text-cyan-200' : 'text-white'}`}>{type.title}</h4>
                                <p className="text-white/60 text-xs">{type.desc}</p>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  {/* PASO: MODELO */}
                  {currentStep === 'model' && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-500 flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Box className="w-6 h-6 text-cyan-200 drop-shadow-md" />
                        <h3 className="text-2xl font-black text-white drop-shadow-sm">Elige tu Casco</h3>
                      </div>
                      <p className="text-white/80 mb-6 text-sm font-medium">Contamos con +10 modelos de fibra de vidrio de alta calidad.</p>
                      
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 overflow-y-auto max-h-[350px] pr-2 custom-scrollbar">
                        {POOL_MODELS.map(model => (
                          <div 
                            key={model.id}
                            onClick={() => setFormData(prev => ({ ...prev, modelId: model.id }))}
                            className={`cursor-pointer rounded-xl overflow-hidden border-2 relative group transition-all h-36 ${formData.modelId === model.id ? 'border-cyan-300 shadow-[0_0_15px_rgba(103,232,249,0.4)]' : 'border-white/20 hover:border-white/50'}`}
                          >
                            <Image src={model.image} alt={model.name} fill className="object-cover opacity-70 group-hover:opacity-100 transition-opacity" sizes="(max-width: 768px) 50vw, 33vw" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 w-full p-2 text-center">
                              <span className={`block font-bold text-sm ${formData.modelId === model.id ? 'text-cyan-300' : 'text-white'}`}>
                                {model.name.search(/\d/) !== -1 ? model.name.substring(0, model.name.search(/\d/)).trim() : model.name}
                              </span>
                              <span className="text-white/70 text-[10px] block font-medium">
                                {model.dimensions.largo}m x {model.dimensions.ancho}m
                              </span>
                            </div>
                            
                            {formData.modelId === model.id && (
                              <div className="absolute top-2 right-2 bg-cyan-400 rounded-full p-0.5 shadow-md">
                                <CheckCircle2 className="w-4 h-4 text-brand-dark" />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* PASO: COLOR */}
                  {currentStep === 'color' && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-500 flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Palette className="w-6 h-6 text-cyan-200 drop-shadow-md" />
                        <h3 className="text-2xl font-black text-white drop-shadow-sm">Acabado Interior</h3>
                      </div>
                      <p className="text-white/80 mb-6 text-sm font-medium">El color define el tono del agua bajo el sol.</p>
                      
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {POOL_COLORS.map(color => (
                          <div 
                            key={color.id}
                            onClick={() => setFormData(prev => ({ ...prev, poolColor: color.name }))}
                            className={`cursor-pointer rounded-xl border-2 p-4 flex flex-col items-center justify-center gap-3 transition-all bg-black/20 ${formData.poolColor === color.name ? 'border-cyan-300 shadow-[0_0_15px_rgba(103,232,249,0.3)]' : 'border-white/20 hover:border-white/50 hover:bg-black/40'}`}
                          >
                            <div 
                              className="w-12 h-12 rounded-full shadow-inner border-2 border-white/20"
                              style={{ background: color.hex }}
                            />
                            <span className={`font-bold text-sm ${formData.poolColor === color.name ? 'text-cyan-200' : 'text-white/90'}`}>
                              {color.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* PASO: UBICACIÓN */}
                  {currentStep === 'location' && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-500 flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <MapPin className="w-6 h-6 text-cyan-200 drop-shadow-md" />
                        <h3 className="text-2xl font-black text-white drop-shadow-sm">Zona de Trabajo</h3>
                      </div>
                      <p className="text-white/80 mb-6 text-sm font-medium">Necesitamos saber esto para calcular la logística del equipo.</p>
                      
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        {COMMUNES.map(commune => (
                          <div 
                            key={commune}
                            onClick={() => setFormData(prev => ({ ...prev, commune }))}
                            className={`cursor-pointer rounded-xl border-2 p-4 text-center transition-all bg-black/20 ${formData.commune === commune ? 'border-cyan-300 text-cyan-200 font-bold shadow-[0_0_15px_rgba(103,232,249,0.3)]' : 'border-white/20 text-white/90 font-medium hover:border-white/50 hover:bg-black/30'}`}
                          >
                            {commune}
                          </div>
                        ))}
                      </div>

                      {/* Input Dinámico para "Otro" */}
                      {formData.commune === 'Otro' && (
                        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 mt-4">
                          <label className="block text-sm font-semibold text-white/90 mb-2">Por favor, indícanos dónde:</label>
                          <input 
                            type="text"
                            name="otherCommune"
                            value={formData.otherCommune}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-black/40 text-white rounded-xl border border-cyan-400 focus:border-cyan-300 focus:ring-1 focus:ring-cyan-300 outline-none transition-all placeholder:text-white/40 shadow-inner"
                            placeholder="Ej. Vicuña, Andacollo..."
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {/* PASO: DATOS Y VISITA */}
                  {currentStep === 'contact' && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-500 flex-1 flex flex-col">
                      <div className="flex items-center gap-3 mb-2">
                        <Calendar className="w-6 h-6 text-cyan-200 drop-shadow-md" />
                        <h3 className="text-2xl font-black text-white drop-shadow-sm">Coordinemos</h3>
                      </div>
                      <p className="text-white/80 mb-6 text-sm font-medium">Selecciona tu preferencia para que podamos avanzar con tu proyecto.</p>
                      
                      {status === 'error' && (
                        <div className="mb-4 p-3 bg-red-500/30 text-white rounded-lg text-sm border border-red-400/60 font-medium">
                          Hubo un error al procesar tu solicitud. Por favor intenta de nuevo.
                        </div>
                      )}

                      {/* INTENT TABS */}
                      <div className="flex flex-col mb-6">
                        <div className="flex p-1 bg-black/40 rounded-xl">
                          <button 
                            type="button"
                            onClick={() => setContactIntent('agendar')}
                            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${contactIntent === 'agendar' ? 'bg-cyan-500 text-brand-dark shadow-md' : 'text-white/70 hover:text-white hover:bg-white/10'}`}
                          >
                            Agendar Visita Técnica
                          </button>
                          <button 
                            type="button"
                            onClick={() => setContactIntent('cotizar')}
                            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${contactIntent === 'cotizar' ? 'bg-cyan-500 text-brand-dark shadow-md' : 'text-white/70 hover:text-white hover:bg-white/10'}`}
                          >
                            Solo Cotización
                          </button>
                        </div>
                        {contactIntent === 'agendar' && (
                          <span className="text-[10px] text-cyan-300 font-medium text-center mt-2 block">* La visita a terreno es 100% gratuita y sin compromiso.</span>
                        )}
                      </div>

                      {contactIntent === 'agendar' ? (
                        <>
                          {/* CALENDARIO - CINTA HORIZONTAL */}
                          <div className="mb-6 animate-in fade-in slide-in-from-left-2 duration-300">
                            <label className="block text-sm font-bold text-white mb-3">1. Selecciona el Día</label>
                            <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar snap-x">
                              {availableDays.map(day => (
                                <div 
                                  key={day.id}
                                  onClick={() => {
                                    setFormData(prev => ({ ...prev, visitDate: day.id, visitTime: (day.isSaturday && prev.visitTime === 'tarde') ? '' : prev.visitTime }));
                                  }}
                                  className={`snap-center flex-shrink-0 cursor-pointer w-[72px] h-24 rounded-2xl border-2 flex flex-col items-center justify-center gap-1 transition-all ${
                                    formData.visitDate === day.id 
                                      ? 'border-cyan-400 bg-cyan-900/50 shadow-[0_0_15px_rgba(34,211,238,0.4)]' 
                                      : 'border-white/20 bg-black/20 hover:border-white/50 hover:bg-black/40'
                                  }`}
                                >
                                  <span className={`text-xs font-bold uppercase tracking-wider ${formData.visitDate === day.id ? 'text-cyan-300' : 'text-white/60'}`}>{day.dayName}</span>
                                  <span className={`text-2xl font-black ${formData.visitDate === day.id ? 'text-white' : 'text-white/90'}`}>{day.dayNumber}</span>
                                  <span className={`text-[10px] font-bold ${formData.visitDate === day.id ? 'text-cyan-200' : 'text-white/50'}`}>{day.monthName}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* BLOQUES HORARIOS */}
                          {formData.visitDate && (
                            <div className="mb-6 animate-in fade-in slide-in-from-top-2 duration-300">
                              <label className="block text-sm font-bold text-white mb-3">2. Bloque Horario</label>
                              <div className="grid grid-cols-2 gap-3">
                                <div 
                                  onClick={() => setFormData(prev => ({ ...prev, visitTime: 'mañana' }))}
                                  className={`cursor-pointer rounded-xl border-2 p-3 flex items-center justify-center gap-2 transition-all ${
                                    formData.visitTime === 'mañana' ? 'border-cyan-400 bg-cyan-900/50 shadow-md' : 'border-white/20 bg-black/20 hover:bg-black/40 hover:border-white/50'
                                  }`}
                                >
                                  <ThermometerSun className={`w-5 h-5 ${formData.visitTime === 'mañana' ? 'text-cyan-300' : 'text-white/60'}`} />
                                  <div>
                                    <span className={`block font-bold text-sm ${formData.visitTime === 'mañana' ? 'text-white' : 'text-white/90'}`}>Mañana</span>
                                    <span className="block text-[10px] text-white/60">09:00 - 13:00</span>
                                  </div>
                                </div>

                                {/* Solo mostramos Tarde si no es Sábado */}
                                {!(availableDays.find(d => d.id === formData.visitDate)?.isSaturday) ? (
                                  <div 
                                    onClick={() => setFormData(prev => ({ ...prev, visitTime: 'tarde' }))}
                                    className={`cursor-pointer rounded-xl border-2 p-3 flex items-center justify-center gap-2 transition-all ${
                                      formData.visitTime === 'tarde' ? 'border-cyan-400 bg-cyan-900/50 shadow-md' : 'border-white/20 bg-black/20 hover:bg-black/40 hover:border-white/50'
                                    }`}
                                  >
                                    <Clock className={`w-5 h-5 ${formData.visitTime === 'tarde' ? 'text-cyan-300' : 'text-white/60'}`} />
                                    <div>
                                      <span className={`block font-bold text-sm ${formData.visitTime === 'tarde' ? 'text-white' : 'text-white/90'}`}>Tarde</span>
                                      <span className="block text-[10px] text-white/60">14:00 - 18:00</span>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="rounded-xl border-2 border-white/5 bg-black/10 p-3 flex items-center justify-center gap-2 opacity-50 cursor-not-allowed">
                                    <Clock className="w-5 h-5 text-white/30" />
                                    <div>
                                      <span className="block font-bold text-sm text-white/40">Tarde</span>
                                      <span className="block text-[10px] text-white/30">Cerrado</span>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="mb-6 p-4 bg-cyan-900/30 rounded-xl border border-cyan-400/20 text-sm text-white/90 leading-relaxed">
                          Perfecto. Elaboraremos un presupuesto preliminar basado en tus preferencias y te lo enviaremos por correo o WhatsApp. Podrás agendar tu evaluación presencial más adelante.
                        </div>
                      )}

                      {/* DATOS DE CONTACTO */}
                      {(contactIntent === 'cotizar' || (formData.visitDate && formData.visitTime)) && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300 border-t border-white/10 pt-6">
                          <label className="block text-sm font-bold text-white mb-2">{contactIntent === 'agendar' ? '3.' : '1.'} Tus Datos</label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input 
                              type="text" 
                              name="name" 
                              required 
                              value={formData.name}
                              onChange={handleChange}
                              className="w-full px-4 py-3 bg-black/30 text-white rounded-xl border border-white/20 focus:border-cyan-300 focus:ring-1 focus:ring-cyan-300 outline-none transition-all placeholder:text-white/50"
                              placeholder="Nombre Completo"
                            />
                            <input 
                              type="tel" 
                              name="phone" 
                              required 
                              value={formData.phone}
                              onChange={handleChange}
                              className="w-full px-4 py-3 bg-black/30 text-white rounded-xl border border-white/20 focus:border-cyan-300 focus:ring-1 focus:ring-cyan-300 outline-none transition-all placeholder:text-white/50"
                              placeholder="Teléfono (WhatsApp)"
                            />
                          </div>
                          <input 
                            type="email" 
                            name="email" 
                            required 
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-black/30 text-white rounded-xl border border-white/20 focus:border-cyan-300 focus:ring-1 focus:ring-cyan-300 outline-none transition-all placeholder:text-white/50"
                            placeholder="Correo Electrónico"
                          />
                          <textarea 
                            name="message" 
                            rows={2} 
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-black/30 text-white rounded-xl border border-white/20 focus:border-cyan-300 focus:ring-1 focus:ring-cyan-300 outline-none transition-all resize-none placeholder:text-white/40"
                            placeholder="Ej. La casa está en una esquina, timbre rojo..."
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {/* Footer Controles */}
                  <div className="mt-8 flex items-center justify-between border-t border-white/20 pt-6">
                    {currentStepIndex > 0 ? (
                      <button 
                        type="button" 
                        onClick={handlePrev}
                        className="text-white/80 hover:text-white font-bold flex items-center gap-1 transition-colors"
                      >
                        <ChevronLeft className="w-5 h-5" /> Atrás
                      </button>
                    ) : <div></div>}
                    
                    {currentStepIndex < steps.length - 1 ? (
                      <button 
                        type="button" 
                        onClick={handleNext}
                        disabled={!getIsNextValid()}
                        className="bg-cyan-100 hover:bg-white text-brand-dark font-black py-3 px-6 rounded-full flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(255,255,255,0.4)] disabled:opacity-50 disabled:shadow-none"
                      >
                        Siguiente <ChevronRight className="w-5 h-5" />
                      </button>
                    ) : (
                      <button 
                        type="submit" 
                        disabled={status === 'loading' || !getIsNextValid()}
                        className="bg-brand-dark hover:bg-black text-cyan-300 font-black py-3 px-8 rounded-full flex items-center gap-2 shadow-[0_10px_20px_rgba(0,0,0,0.3)] transition-all disabled:opacity-70 border border-cyan-500/30"
                      >
                        {status === 'loading' ? 'Enviando...' : (contactIntent === 'agendar' ? 'Coordinar Visita' : 'Solicitar Presupuesto')}
                      </button>
                    )}
                  </div>
                </form>
              </>
            )}
          </div>
        </motion.div>
      </div>
      
      {/* Scrollbar Style */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0, 0, 0, 0.2); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(103, 232, 249, 0.8); border-radius: 10px; }
      `}} />
    </section>
  );
}
