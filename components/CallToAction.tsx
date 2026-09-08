'use client';

import React from 'react';

export const CallToAction: React.FC = () => {
  const handleClick = () => {
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({ cta_button_source: 'cta' });
    }
  };

  return (
    <div className="relative py-16 md:py-20 bg-radial-cta overflow-hidden">
      <div className="absolute inset-0 bg-[url('/assets/images/hero-mobile-bg.png')] bg-cover bg-center opacity-30 pointer-events-none"></div>
      <div className="container relative z-10 flex flex-col items-center gap-8 md:gap-14 md:flex-row md:justify-between mx-auto px-4 md:px-8 max-w-6xl">
        <div className="flex flex-col gap-3 md:gap-2 text-center md:text-left">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Las fugas de agua causan daño
          </h2>
          <p className="text-white/90 text-base max-w-xl">
            No esperes a que el costo de la reparación se triplique solo por no actuar a tiempo.
          </p>
        </div>
        <a
          href="#lead-form"
          onClick={handleClick}
          data-cta-button-source="cta"
          className="px-8 py-4 text-white font-bold rounded-full shadow-lg cursor-pointer bg-accent hover:bg-accent-hover transition text-center whitespace-nowrap"
        >
          Quiero reparar mi fuga
        </a>
      </div>
    </div>
  );
};
