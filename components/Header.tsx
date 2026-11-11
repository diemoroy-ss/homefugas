'use client';

import React from 'react';

export const Header: React.FC = () => {
  const handleWhatsAppClick = () => {
    if (typeof window !== 'undefined') {
      if ((window as any).dataLayer) {
        (window as any).dataLayer.push({ cta_button_source: 'whatsapp_button' });
        (window as any).dataLayer.push({ event: 'lead_whatsapp_button_click' });
      }
      if ((window as any).gtag) {
        (window as any).gtag('event', 'contact', {
          event_category: 'whatsapp',
          event_label: 'header_whatsapp_button',
          send_to: 'AW-18438707677',
        });
      }
    }
  };

  return (
    <header className="flex justify-between items-center flex-wrap gap-4">
      <a href="/" className="inline-block" title="Home Fugas">
        <img
          src="/assets/images/home-fugas-logo.svg"
          alt="Logo Home Fugas"
          className="h-10 md:h-12 w-auto"
        />
      </a>
      <div className="flex items-center gap-2 sm:gap-3">
        <a
          href="tel:+56934075797"
          className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 rounded-full font-bold text-xs sm:text-sm bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-sm transition"
          title="Llamar directamente"
        >
          <svg className="w-4 h-4 text-amber-300" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 4V3z" />
          </svg>
          <span className="font-semibold">+56 9 3407 5797</span>
        </a>
        <a
          id="whatsApp-button"
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleWhatsAppClick}
          className="px-4 sm:px-6 py-2 sm:py-3.5 rounded-full cursor-pointer bg-green-500 hover:bg-green-600 border border-green-900 transition flex items-center justify-center"
          href="https://api.whatsapp.com/send?phone=56934075797"
        >
          <img
            className="w-20 sm:w-24 h-auto"
            src="/assets/images/whatsapp-logo.svg"
            alt="WhatsApp Logo"
          />
        </a>
      </div>
    </header>
  );
};
