'use client';

import { MessageCircle } from 'lucide-react';
import React from 'react';

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '';

interface WhatsAppButtonProps {
  modelName?: string;
}

export default function WhatsAppButton({ modelName }: WhatsAppButtonProps) {
  const generateWhatsAppUrl = () => {
    const message = modelName
      ? `Hola, quiero cotizar la ${modelName}`
      : 'Hola, quiero cotizar una piscina';
    
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  if (!WHATSAPP_NUMBER) return null;

  return (
    <a
      href={generateWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300 group"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
      
      {/* Tooltip on hover */}
      <span className="absolute right-full mr-4 bg-white text-brand-gray-900 text-sm font-semibold px-4 py-2 rounded-xl shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
        ¡Cotiza por WhatsApp!
      </span>
    </a>
  );
}
