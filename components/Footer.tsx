import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#310060] text-white py-10 md:pt-20">
      <div className="container flex flex-col items-center gap-10 md:gap-20 mx-auto px-4 md:px-8 max-w-6xl">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between w-full">
          {/* Logo & Description */}
          <div className="flex flex-col gap-8 max-w-md">
            <div className="flex flex-col items-center gap-4 md:items-start">
              <img
                src="/assets/images/home-fugas-logo.svg"
                alt="Logo Home Fugas"
                className="w-32 h-auto"
              />
              <p className="text-center md:text-left text-white/90 text-sm leading-relaxed">
                Detectamos fugas de agua en casas, piscinas, calefacción y tuberías. Atención rápida y directa en toda la Región de Valparaíso (Viña del Mar, Valparaíso, Concón, Reñaca, Quilpué y alrededores).
              </p>
            </div>
            <div className="flex flex-col items-center gap-1 md:items-start">
              <h4 className="text-lg font-bold">Escríbenos</h4>
              <a
                href="mailto:contacto@homefugas.cl"
                className="text-accent font-semibold hover:underline"
              >
                contacto@homefugas.cl
              </a>
            </div>
          </div>

          {/* V Region Location Info */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center gap-2 md:items-start">
              <h4 className="text-lg font-bold text-accent">Región de Valparaíso</h4>
              <ul className="space-y-2 text-sm text-white/90">
                <li className="text-center md:text-left">
                  <strong className="text-white">WhatsApp &amp; Emergencias:</strong>{' '}
                  <a
                    href="https://api.whatsapp.com/send?phone=56966139505"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent font-semibold hover:underline"
                  >
                    +56 9 6613 95 05
                  </a>
                </li>

                <li className="text-center md:text-left text-xs text-white/70">
                  Cobertura directa: Viña del Mar, Valparaíso, Concón, Reñaca, Quilpué, Villa Alemana, Quillota, San Antonio, Los Andes.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center w-full gap-4 pt-6 border-t border-white/20 md:flex-row md:justify-between text-xs text-white/70">
          <p>HomeFugas.cl © 2025 - Todos los derechos reservados. Región de Valparaíso.</p>
        </div>
      </div>
    </footer>
  );
};
