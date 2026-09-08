'use client';

import React from 'react';
import { Header } from './Header';
import { LeadForm } from './LeadForm';

export const Hero: React.FC = () => {
  return (
    <div className="relative py-8 bg-radial-hero overflow-hidden">
      <div
        className="absolute inset-0 bg-[url('/assets/images/hero-mobile-bg.png')] md:bg-[url('/assets/images/hero-desktop-bg.png')] bg-cover bg-center opacity-40 mix-blend-overlay pointer-events-none"
      ></div>
      <div className="container relative z-10 flex flex-col gap-24 md:pt-5 md:pb-20 md:gap-16 mx-auto px-4 md:px-8">
        <Header />
        <main className="flex flex-col gap-12 md:flex-row md:items-center md:justify-between md:gap-20">
          {/* Hero content */}
          <div className="flex flex-col gap-6 text-white max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold text-amber-300 w-fit">
              📍 Exclusivo Región de Valparaíso &amp; Costa
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-center md:text-left leading-tight">
              Detección y Reparación de Fugas de Agua Sin Romper
            </h1>
            <p className="text-lg text-center md:text-left text-white/90 leading-relaxed">
              Detectamos fugas invisibles en casas, piscinas, calefacción y tuberías. Atención inmediata en <strong className="text-amber-300 font-semibold">Viña del Mar, Valparaíso, Concón, Reñaca, Quilpué, Villa Alemana, Quillota y San Antonio</strong>.
            </p>
            <div className="flex flex-wrap justify-center gap-2 md:justify-start">
              <span className="px-3 py-1 text-sm font-semibold border border-white/80 rounded-full backdrop-blur-sm">
                Ultrasonido
              </span>
              <span className="px-3 py-1 text-sm font-semibold border border-white/80 rounded-full backdrop-blur-sm">
                Gas Trazador
              </span>
              <span className="px-3 py-1 text-sm font-semibold border border-white/80 rounded-full backdrop-blur-sm">
                Cámara Termográfica
              </span>
            </div>
          </div>

          {/* Lead form */}
          <LeadForm />
        </main>
      </div>
    </div>
  );
};
