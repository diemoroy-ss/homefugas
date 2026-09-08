'use client';

import React from 'react';

export const Header: React.FC = () => {
  const handleWhatsAppClick = () => {
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({ cta_button_source: 'whatsapp_button' });
      (window as any).dataLayer.push({ event: 'lead_whatsapp_button_click' });
    }
  };

  return (
    <header className="flex justify-between items-center">
      <a href="/" className="inline-block" title="Home Fugas">
        <img
          src="/assets/images/home-fugas-logo.svg"
          alt="Logo Home Fugas"
          className="h-10 md:h-12 w-auto"
        />
      </a>
      <a
        id="whatsApp-button"
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleWhatsAppClick}
        className="px-6 py-4 rounded-full cursor-pointer bg-green-500 hover:bg-green-600 border border-green-900 transition flex items-center justify-center"
        href="https://api.whatsapp.com/send?phone=56966139505"
      >
        <img
          className="w-24 h-auto"
          src="/assets/images/whatsapp-logo.svg"
          alt="WhatsApp Logo"
        />
      </a>
    </header>
  );
};
