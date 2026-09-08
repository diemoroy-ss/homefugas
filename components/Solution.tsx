import React from 'react';

export const Solution: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="container flex flex-col gap-10 py-20 md:gap-14 md:flex-row md:items-center mx-auto px-4 md:px-8">
        {/* Section title */}
        <div className="flex flex-col gap-6 md:gap-4 flex-1">
          <h2 className="text-3xl sm:text-4xl font-bold text-center md:text-left text-gray-900 leading-tight">
            Somos la <span className="text-primary">solución más efectiva</span> para detectar fugas de agua
          </h2>
          <p className="text-center md:text-left text-gray-600 leading-relaxed text-base">
            Detectamos y reparamos cualquier fuga con tecnología avanzada, protegiendo tu hogar, tu salud y tu bolsillo al instante.
          </p>
        </div>

        {/* Section content */}
        <div className="relative flex-1">
          <div className="absolute inset-0 hidden bg-accent rounded-3xl rotate-6 md:block"></div>
          <div className="relative z-10 flex flex-col px-8 py-12 shadow-xl bg-primary rounded-3xl gap-8">
            <div className="flex items-start gap-4">
              <img
                src="/assets/images/check-icon.svg"
                alt="Ícono de check"
                className="mt-1 w-6 h-6 flex-shrink-0"
              />
              <div className="flex flex-col gap-1">
                <h3 className="text-xl font-bold text-white">Sin romper paredes</h3>
                <p className="text-white/90 text-sm">
                  Localizamos la fuga con precisión sin dañar tu hogar.
                </p>
              </div>
            </div>

            <div className="w-full h-px bg-white/20"></div>

            <div className="flex items-start gap-4">
              <img
                src="/assets/images/check-icon.svg"
                alt="Ícono de check"
                className="mt-1 w-6 h-6 flex-shrink-0"
              />
              <div className="flex flex-col gap-1">
                <h3 className="text-xl font-bold text-white">Reparación inmediata</h3>
                <p className="text-white/90 text-sm">
                  Solucionamos el problema al momento para que tu vida siga normal.
                </p>
              </div>
            </div>

            <div className="w-full h-px bg-white/20"></div>

            <div className="flex items-start gap-4">
              <img
                src="/assets/images/check-icon.svg"
                alt="Ícono de check"
                className="mt-1 w-6 h-6 flex-shrink-0"
              />
              <div className="flex flex-col gap-1">
                <h3 className="text-xl font-bold text-white">Ahorra dinero</h3>
                <p className="text-white/90 text-sm">
                  Reduce tu consumo de agua y evita gastos innecesarios.
                </p>
              </div>
            </div>

            <div className="w-full h-px bg-white/20"></div>

            <div className="flex items-start gap-4">
              <img
                src="/assets/images/check-icon.svg"
                alt="Ícono de check"
                className="mt-1 w-6 h-6 flex-shrink-0"
              />
              <div className="flex flex-col gap-1">
                <h3 className="text-xl font-bold text-white">Protege tu salud</h3>
                <p className="text-white/90 text-sm">
                  Evita moho y hongos que afectan a tu familia.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
