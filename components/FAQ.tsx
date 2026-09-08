'use client';

import React, { useState } from 'react';

interface FaqItem {
  question: string;
  answer: string;
}

const faqData: FaqItem[] = [
  {
    question: '¿Cómo detectan las fugas de agua sin romper?',
    answer:
      'Utilizamos equipos de ultrasonido, gas trazador y termografía que nos permiten identificar el punto exacto sin dañar muros ni pisos.',
  },
  {
    question: '¿Cuánto tiempo tarda la reparación?',
    answer: 'Depende del tipo de fuga, pero normalmente entre 1 y 3 horas.',
  },
  {
    question: '¿El servicio cubre todos los tipos de fuga?',
    answer: 'Sí, atendemos fugas en muros, pisos, techos, calefacción y estanques de agua.',
  },
  {
    question: '¿Necesito preparar algo antes de la visita?',
    answer: 'Solo asegúrate de que el área esté accesible. Nosotros llevamos todo lo necesario.',
  },
  {
    question: '¿Ofrecen garantía por el trabajo realizado?',
    answer: 'Sí, ofrecemos garantía por todas nuestras reparaciones.',
  },
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleCtaClick = () => {
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({ cta_button_source: 'faq' });
    }
  };

  return (
    <div className="container flex flex-col items-center gap-10 py-20 md:gap-14 mx-auto px-4 md:px-8">
      {/* Section title */}
      <div className="flex flex-col gap-6 md:gap-2">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900">
          ¿Tienes preguntas? <span className="text-primary">Te ayudamos</span>
        </h2>
        <p className="text-center text-gray-600 max-w-xl mx-auto">
          Resolvemos tus dudas más frecuentes para que tomes la mejor decisión con total tranquilidad.
        </p>
      </div>

      {/* Section content */}
      <div id="faq" className="flex flex-col md:max-w-xl md:w-full w-full">
        {faqData.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={index} className="border-b border-gray-300">
              <button
                type="button"
                onClick={() => toggleFaq(index)}
                className="flex items-center gap-3 px-1 py-4 cursor-pointer w-full text-left font-semibold text-gray-900 hover:text-primary transition"
              >
                <svg
                  className="transition-transform duration-200 flex-shrink-0"
                  width="13"
                  height="13"
                  viewBox="0 0 13 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {isOpen ? (
                    <path
                      d="M0.5 6.5H12.5"
                      stroke="#FFB300"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  ) : (
                    <path
                      d="M0.5 6.5H12.5M6.5 0.5V12.5"
                      stroke="#FFB300"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  )}
                </svg>
                <h3 className="text-base sm:text-lg">{item.question}</h3>
              </button>
              {isOpen && (
                <div className="px-5 pb-4 text-gray-600 text-sm leading-relaxed animate-fadeIn">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <a
        href="#lead-form"
        onClick={handleCtaClick}
        data-cta-button-source="faq"
        className="px-8 py-4 text-white font-bold rounded-full shadow-lg cursor-pointer bg-accent hover:bg-accent-hover transition text-center"
      >
        Quiero agendar una visita
      </a>
    </div>
  );
};
