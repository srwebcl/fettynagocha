'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ThermometerSun, Calendar, ShieldCheck, Zap } from 'lucide-react';
import AnimatedEmoji from '@/components/ui/AnimatedEmoji';
import CinematicTitle from '@/components/ui/CinematicTitle';

export default function HeatPumpSection() {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden bg-brand-dark">
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#011e38] via-brand-dark to-[#000a12] z-0"></div>
      
      {/* Orange Glow Effect */}
      <div className="absolute -top-[200px] -right-[200px] w-[600px] h-[600px] bg-orange-500/20 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute -bottom-[200px] -left-[200px] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none z-0"></div>

      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Text Content */}
          <div className="lg:w-1/2">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 text-orange-400 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest mb-6"
            >
              <ThermometerSun className="w-4 h-4" />
              Upgrade Exclusivo
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6 tracking-tight">
                Lleva el Verano a <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">Todo el Año</span>
              </h2>
              <p className="text-xl text-brand-gray-300 mb-8 leading-relaxed font-light">
                No dejes que tu piscina se use solo un par de meses. Nuestras bombas de calor de alta eficiencia mantienen el agua a la temperatura perfecta, prolongando tu temporada de piscina desde la primavera hasta el otoño.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-6 mb-10">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm"
              >
                <Calendar className="w-8 h-8 text-orange-400 mb-3" />
                <h4 className="text-white font-bold text-lg mb-1">Más Meses de Uso</h4>
                <p className="text-sm text-brand-gray-400 leading-relaxed">Duplica o triplica los días en que puedes disfrutar de tu inversión cómodamente.</p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm"
              >
                <Zap className="w-8 h-8 text-amber-400 mb-3" />
                <h4 className="text-white font-bold text-lg mb-1">Alta Eficiencia</h4>
                <p className="text-sm text-brand-gray-400 leading-relaxed">Tecnología Inverter que calienta el agua consumiendo mucha menos energía eléctrica.</p>
              </motion.div>
            </div>

            <motion.a 
              href="#modelos"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="inline-block bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-lg px-8 py-4 rounded-full shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all transform hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(245,158,11,0.6)]"
            >
              Cotiza tu Piscina Temperada
            </motion.a>
          </div>

          {/* Image Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring" }}
            className="lg:w-1/2 relative"
          >
            <div className="relative w-full aspect-square max-w-[500px] mx-auto rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              <Image 
                src="/images/hero/Couple_relaxing_on_pool_steps_202607041912 (1).jpeg"
                alt="Piscina Temperada Fettyna Gocha"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl">
                <div>
                  <p className="text-white/70 text-xs font-bold uppercase tracking-widest mb-1">Temperatura Ideal</p>
                  <p className="text-white font-black text-2xl">28°C - 30°C</p>
                </div>
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.6)]">
                  <ThermometerSun className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
            
            {/* Floating badge */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 md:top-10 md:-right-10 bg-white p-4 rounded-2xl shadow-2xl z-20 border border-brand-gray-100 hidden sm:flex items-center gap-4"
            >
              <div className="bg-emerald-100 p-3 rounded-full">
                <ShieldCheck className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-brand-dark font-black text-sm">Instalación Certificada</p>
                <p className="text-brand-gray-500 text-xs">Equipo Inverter Silencioso</p>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
