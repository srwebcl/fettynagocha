'use client';

import React, { useState } from 'react';
import { POOL_MODELS } from '@/data/models';
import { QuoteFormData } from '@/types';

export default function QuoteForm() {
  const [formData, setFormData] = useState<QuoteFormData>({
    name: '',
    phone: '',
    email: '',
    commune: '',
    modelId: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        setStatus('success');
        setFormData({
          name: '',
          phone: '',
          email: '',
          commune: '',
          modelId: '',
          message: '',
        });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-[#D1FAE5] border border-[#34D399] text-[#065F46] p-8 md:p-12 rounded-3xl shadow-lg text-center max-w-2xl mx-auto">
        <div className="w-16 h-16 bg-[#34D399] rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-3xl font-bold mb-4">¡Solicitud Enviada!</h3>
        <p className="text-lg mb-8">Gracias por cotizar con nosotros. Nuestro equipo evaluará tu solicitud y te contactará a la brevedad.</p>
        <button 
          onClick={() => setStatus('idle')}
          className="border-2 border-[#065F46] text-[#065F46] hover:bg-[#065F46] hover:text-white px-8 py-3 rounded-full font-semibold transition-colors duration-200"
        >
          Enviar otra cotización
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 md:p-10 rounded-3xl shadow-xl border border-brand-gray-100 max-w-2xl mx-auto text-left relative z-10">
      {status === 'error' && (
        <div className="mb-8 p-4 bg-[#FEE2E2] border border-[#F87171] text-[#991B1B] rounded-xl text-center">
          Ocurrió un error de red al enviar tu solicitud. Por favor intenta de nuevo más tarde o contáctanos por WhatsApp.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-brand-gray-800 mb-2">Nombre completo *</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            required 
            value={formData.name}
            onChange={handleChange}
            className="w-full px-5 py-4 rounded-xl border-2 border-brand-gray-100 bg-brand-gray-50 focus:bg-white focus:outline-none focus:ring-0 focus:border-brand-primary transition-all duration-200"
            placeholder="Ej. Juan Pérez"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-brand-gray-800 mb-2">Teléfono *</label>
          <input 
            type="tel" 
            id="phone" 
            name="phone" 
            required 
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-5 py-4 rounded-xl border-2 border-brand-gray-100 bg-brand-gray-50 focus:bg-white focus:outline-none focus:ring-0 focus:border-brand-primary transition-all duration-200"
            placeholder="Ej. +56 9 1234 5678"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-brand-gray-800 mb-2">Correo electrónico *</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            required 
            value={formData.email}
            onChange={handleChange}
            className="w-full px-5 py-4 rounded-xl border-2 border-brand-gray-100 bg-brand-gray-50 focus:bg-white focus:outline-none focus:ring-0 focus:border-brand-primary transition-all duration-200"
            placeholder="tu@email.com"
          />
        </div>
        <div>
          <label htmlFor="commune" className="block text-sm font-semibold text-brand-gray-800 mb-2">Comuna *</label>
          <select 
            id="commune" 
            name="commune" 
            required 
            value={formData.commune}
            onChange={handleChange}
            className="w-full px-5 py-4 rounded-xl border-2 border-brand-gray-100 bg-brand-gray-50 focus:bg-white focus:outline-none focus:ring-0 focus:border-brand-primary transition-all duration-200 appearance-none"
          >
            <option value="" disabled>Selecciona tu comuna</option>
            <option value="Coquimbo">Coquimbo</option>
            <option value="La Serena">La Serena</option>
            <option value="Vallenar">Vallenar</option>
            <option value="Ovalle">Ovalle</option>
            <option value="Otro">Otro</option>
          </select>
        </div>
      </div>

      <div className="mb-6">
        <label htmlFor="modelId" className="block text-sm font-semibold text-brand-gray-800 mb-2">Modelo de Interés (Opcional)</label>
        <select 
          id="modelId" 
          name="modelId" 
          value={formData.modelId}
          onChange={handleChange}
          className="w-full px-5 py-4 rounded-xl border-2 border-brand-gray-100 bg-brand-gray-50 focus:bg-white focus:outline-none focus:ring-0 focus:border-brand-primary transition-all duration-200 appearance-none"
        >
          <option value="">Aún no lo decido / Necesito asesoría</option>
          {POOL_MODELS.map(model => (
            <option key={model.id} value={model.name}>{model.name} (Desde ${model.priceFrom.toLocaleString('es-CL')})</option>
          ))}
        </select>
      </div>

      <div className="mb-8">
        <label htmlFor="message" className="block text-sm font-semibold text-brand-gray-800 mb-2">Mensaje o dudas adicionales</label>
        <textarea 
          id="message" 
          name="message" 
          rows={4} 
          value={formData.message}
          onChange={handleChange}
          className="w-full px-5 py-4 rounded-xl border-2 border-brand-gray-100 bg-brand-gray-50 focus:bg-white focus:outline-none focus:ring-0 focus:border-brand-primary transition-all duration-200 resize-none"
          placeholder="¿Tienes alguna pregunta sobre la instalación o accesos a tu patio?"
        />
      </div>

      <button 
        type="submit" 
        disabled={status === 'loading'}
        className={`w-full bg-gradient-to-r from-brand-primary to-brand-light text-white font-bold py-5 rounded-xl shadow-[0_0_20px_rgba(0,111,173,0.4)] hover:shadow-[0_0_30px_rgba(56,189,248,0.6)] hover:-translate-y-1 transition-all duration-300 transform text-lg tracking-wide flex items-center justify-center ${status === 'loading' ? 'opacity-80 cursor-not-allowed hover:-translate-y-0 hover:shadow-[0_0_20px_rgba(0,111,173,0.4)]' : ''}`}
      >
        {status === 'loading' ? (
          <span className="flex items-center">
            <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Procesando Solicitud...
          </span>
        ) : (
          'Solicitar Cotización Gratis'
        )}
      </button>
    </form>
  );
}
