'use client';

import React, { useState } from 'react';
import { CheckCircle2, Send, Mail, Phone, User, MessageSquare, Wrench, ChevronDown } from 'lucide-react';
import CinematicTitle from '@/components/ui/CinematicTitle';
import AnimatedEmoji from '@/components/ui/AnimatedEmoji';
import { motion } from 'framer-motion';

export default function DesignPatioSection() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const PROJECT_OPTIONS = [
    { value: 'instalacion', label: 'Instalación de Piscinas' },
    { value: 'cascos', label: 'Cascos de Piscina' },
    { value: 'fulget', label: 'Revestimiento Fulget' },
    { value: 'bombas', label: 'Bombas y Accesorios' },
    { value: 'reparacion', label: 'Reparaciones y Revestimientos' },
    { value: 'otro', label: 'Otro Proyecto' },
  ];

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    projectType: 'instalacion',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const res = await fetch('/api/cotizar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          visitDate: 'Contacto Directo',
          visitTime: 'Contacto Directo',
          commune: 'Por Definir',
        }),
      });

      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setStatus('error');
    }
  };

  return (
    <section id="cotizar" className="py-16 md:py-32 relative overflow-hidden flex flex-col items-center">
      {/* Fondo inmersivo oscuro y elegante */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-950 via-brand-dark to-black z-0"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(6,182,212,0.15)_0%,transparent_70%)] z-0 pointer-events-none"></div>

      <div className="w-full max-w-4xl mx-auto px-4 relative z-20">
        
        {/* Cabecera de la Sección */}
        <div className="mb-12 text-center">
          <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-4 mb-2">
            <AnimatedEmoji symbol="💬" delay={0} className="text-3xl" />
            <CinematicTitle 
              lightText="Hablemos de tu" 
              boldText="Proyecto" 
              theme="dark" 
            />
          </div>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-md">
            Déjanos tus datos y un especialista se contactará contigo a la brevedad para asesorarte y enviarte una cotización personalizada.
          </p>
        </div>

        {/* Contenedor del Formulario (Solid White para máximo contraste) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="w-full bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden p-5 sm:p-6 md:p-10"
        >
          {status === 'success' ? (
            <div className="flex flex-col items-center justify-center text-center py-10">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6 shadow-sm">
                <CheckCircle2 className="w-10 h-10 text-emerald-500" />
              </div>
              <h3 className="text-3xl font-black text-brand-dark mb-4">¡Mensaje Enviado!</h3>
              <p className="text-gray-600 mb-8 text-lg max-w-md mx-auto font-medium">
                Gracias por contactarnos. Nuestro equipo revisará tu solicitud y te responderá en el menor tiempo posible.
              </p>
              <button 
                onClick={() => {
                  setStatus('idle');
                  setFormData({ name: '', phone: '', email: '', projectType: 'instalacion', message: '' });
                }}
                className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-8 rounded-full transition-all shadow-md"
              >
                Enviar Otro Mensaje
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              
              {status === 'error' && (
                <div className="p-4 bg-red-100 border border-red-300 rounded-xl text-red-700 text-sm text-center">
                  Ocurrió un error al enviar el mensaje. Por favor, intenta de nuevo.
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nombre */}
                <div className="relative">
                  <label className="text-gray-700 text-sm font-bold mb-2 block">Nombre Completo</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User className="w-5 h-5 text-gray-400" />
                    </div>
                    <input 
                      type="text" 
                      name="name" 
                      required 
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3.5 bg-gray-50 text-gray-900 rounded-xl border border-gray-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all placeholder:text-gray-400"
                      placeholder="Ej. Juan Pérez"
                    />
                  </div>
                </div>

                {/* Teléfono */}
                <div className="relative">
                  <label className="text-gray-700 text-sm font-bold mb-2 block">Teléfono (WhatsApp)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Phone className="w-5 h-5 text-gray-400" />
                    </div>
                    <input 
                      type="tel" 
                      name="phone" 
                      required 
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3.5 bg-gray-50 text-gray-900 rounded-xl border border-gray-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all placeholder:text-gray-400"
                      placeholder="+56 9 1234 5678"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Email */}
                <div className="relative">
                  <label className="text-gray-700 text-sm font-bold mb-2 block">Correo Electrónico</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="w-5 h-5 text-gray-400" />
                    </div>
                    <input 
                      type="email" 
                      name="email" 
                      required 
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3.5 bg-gray-50 text-gray-900 rounded-xl border border-gray-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all placeholder:text-gray-400"
                      placeholder="correo@ejemplo.com"
                    />
                  </div>
                </div>

                {/* Tipo de Proyecto */}
                <div className="relative">
                  <label className="text-gray-700 text-sm font-bold mb-2 block">¿Qué necesitas?</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                      <Wrench className="w-5 h-5 text-gray-400" />
                    </div>
                    
                    {/* Custom Select Button */}
                    <div 
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="w-full pl-12 pr-4 py-3.5 bg-gray-50 text-gray-900 rounded-xl border border-gray-200 hover:border-cyan-500 transition-all cursor-pointer flex items-center justify-between shadow-sm"
                    >
                      <span className="truncate font-medium">{PROJECT_OPTIONS.find(opt => opt.value === formData.projectType)?.label}</span>
                      <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </div>

                    {/* Custom Select Dropdown Options */}
                    {isDropdownOpen && (
                      <>
                        <div 
                          className="fixed inset-0 z-40" 
                          onClick={() => setIsDropdownOpen(false)}
                        ></div>
                        <motion.div 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.1)] z-50 overflow-hidden"
                        >
                          {PROJECT_OPTIONS.map(option => (
                            <div 
                              key={option.value}
                              onClick={() => {
                                setFormData(prev => ({ ...prev, projectType: option.value }));
                                setIsDropdownOpen(false);
                              }}
                              className={`px-4 py-3 cursor-pointer transition-colors ${formData.projectType === option.value ? 'bg-cyan-50 text-cyan-700 font-bold' : 'text-gray-700 hover:bg-gray-50'}`}
                            >
                              {option.label}
                            </div>
                          ))}
                        </motion.div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Mensaje */}
              <div className="relative">
                <label className="text-gray-700 text-sm font-bold mb-2 block">Cuéntanos más detalles</label>
                <div className="relative">
                  <div className="absolute top-4 left-0 pl-4 pointer-events-none">
                    <MessageSquare className="w-5 h-5 text-gray-400" />
                  </div>
                  <textarea 
                    name="message" 
                    rows={4} 
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 text-gray-900 rounded-xl border border-gray-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all resize-none placeholder:text-gray-400"
                    placeholder="Ej. Me interesa cotizar una piscina para mi casa en La Serena..."
                  />
                </div>
              </div>

              {/* Botón */}
              <div className="mt-4 text-center">
                <button 
                  type="submit" 
                  disabled={status === 'loading'}
                  className="bg-cyan-600 hover:bg-cyan-500 hover:scale-[1.02] active:scale-[0.98] text-white font-bold py-4 px-10 rounded-full inline-flex items-center justify-center gap-3 shadow-[0_10px_20px_rgba(8,145,178,0.2)] transition-all disabled:opacity-70 disabled:hover:scale-100 w-full sm:w-auto min-w-[250px]"
                >
                  {status === 'loading' ? (
                    'Enviando...'
                  ) : (
                    <>
                      Enviar Solicitud
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
                <p className="text-gray-400 text-xs mt-4">
                  Tus datos están seguros con nosotros. No enviaremos spam.
                </p>
              </div>

            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
