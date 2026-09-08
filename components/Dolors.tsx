import React from 'react';

export const Dolors: React.FC = () => {
  return (
    <div className="container flex flex-col gap-10 py-20 md:gap-14 mx-auto px-4 md:px-8">
      {/* Section title */}
      <div className="flex flex-col gap-6 md:gap-2">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900">
          Cada día que pasa, <span className="text-primary">el problema crece</span>
        </h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto">
          No dejes que una fuga se convierta en un daño costoso. Actúa antes de que el problema empeore.
        </p>
      </div>

      {/* Section content */}
      <div className="flex flex-col gap-8 md:flex-row">
        <div className="flex flex-col items-center gap-6 px-6 py-10 bg-white shadow-md rounded-2xl flex-1">
          <img
            src="/assets/images/confused-man.png"
            alt="Persona preocupada por la humedad de la pared"
            className="w-32 h-32 rounded-full object-cover shadow"
          />
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-bold text-center text-gray-900">1. Humedad y Hongos</h3>
            <p className="text-center text-gray-600 text-sm leading-relaxed">
              La humedad mancha paredes y genera mal olor. Es el primer indicio. El moho puede afectar la salud de tu familia.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-6 px-6 py-10 bg-white shadow-md rounded-2xl flex-1">
          <img
            src="/assets/images/person-looking-at-water-leak.png"
            alt="Persona preocupada por la filtración de agua"
            className="w-32 h-32 rounded-full object-cover shadow"
          />
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-bold text-center text-gray-900">2. Daños por corrosión</h3>
            <p className="text-center text-gray-600 text-sm leading-relaxed">
              Las fugas dañan cañerías y conexiones, provocando reparaciones costosas si no se detectan a tiempo.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-6 px-6 py-10 bg-white shadow-md rounded-2xl flex-1">
          <img
            src="/assets/images/person-looking-at-water-bill.png"
            alt="Persona preocupada por cuenta del agua"
            className="w-32 h-32 rounded-full object-cover shadow"
          />
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-bold text-center text-gray-900">3. Más gasto en agua</h3>
            <p className="text-center text-gray-600 text-sm leading-relaxed">
              Además del gasto por reparación tardía, el agua que se pierde aumenta tu boleta del agua sin que lo notes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
