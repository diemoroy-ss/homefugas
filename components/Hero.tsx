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

            {/* Direct Call CTA with Phone Number */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3">
              <a
                href="tel:+56934075797"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full font-bold text-sm sm:text-base bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5"
                title="Llamar directamente al técnico"
              >
                <svg className="w-5 h-5 text-slate-950" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 4V3z" />
                </svg>
                <span>Llamar: +56 9 3407 5797</span>
              </a>
              <span className="text-xs text-white/90 font-medium">
                ⚡ Emergencias 24/7 en la V Región
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
