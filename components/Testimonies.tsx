import React from 'react';

const FiveStars: React.FC = () => (
  <div className="flex gap-1">
    {[...Array(5)].map((_, i) => (
      <svg
        key={i}
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15.966 5.78729C15.8747 5.50777 15.6159 5.31953 15.3213 5.31953H10.221L8.64552 0.4687C8.55328 0.189167 8.29446 0 7.99987 0C7.70623 0 7.44645 0.188233 7.35516 0.468708L5.77869 5.31953H0.678458C0.383875 5.31953 0.125042 5.50777 0.03375 5.78729C-0.0575417 6.06682 0.0403333 6.37177 0.2794 6.54588L4.40646 9.54447L2.82998 14.3962C2.73869 14.6767 2.8394 14.9817 3.07846 15.1539C3.19704 15.2395 3.33634 15.2829 3.47563 15.2829C3.61493 15.2829 3.75423 15.2395 3.87375 15.1529L7.99987 12.1553L12.125 15.1529C12.3632 15.3261 12.6841 15.3261 12.9222 15.1539C13.1613 14.9817 13.261 14.6767 13.1698 14.3953L11.5933 9.54447L15.7213 6.54588C15.9594 6.37177 16.0582 6.06682 15.966 5.78729Z"
          fill="#FFB300"
        />
      </svg>
    ))}
  </div>
);

export const Testimonies: React.FC = () => {
  return (
    <div className="container flex flex-col gap-10 py-20 md:gap-14 mx-auto px-4 md:px-8">
      {/* Section title */}
      <div className="flex flex-col gap-6 md:gap-2">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900">
          Nos recomiendan <span className="text-primary">quienes ya confiaron</span>
        </h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto">
          La mayoría de nuestros nuevos clientes llegan por recomendación. Estas son algunas de sus experiencias.
        </p>
      </div>

      {/* Testimonies Grid */}
      <div className="flex flex-col gap-8 md:flex-row">
        {/* Testimony 1 */}
        <div className="flex flex-col flex-1 gap-4 px-6 py-10 bg-white shadow-md rounded-2xl border border-gray-100">
          <div className="flex items-center gap-3">
            <img
              src="/assets/images/marcela-puebla-testimony-photo.png"
              alt="Cliente Marcela Puebla"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-bold text-gray-900">Marcela Puebla</h3>
              <FiveStars />
            </div>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">
            Conforme con el trabajo realizado en mi departamento, tenía una fuga importante, detectable sólo con instrumentos especiales.
          </p>
        </div>

        {/* Testimony 2 */}
        <div className="flex flex-col flex-1 gap-4 px-6 py-10 bg-white shadow-md rounded-2xl border border-gray-100">
          <div className="flex items-center gap-3">
            <img
              src="/assets/images/fernando-urrutia-testimony-photo.png"
              alt="Cliente Fernando Urrutia"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-bold text-gray-900">Fernando Urrutia</h3>
              <FiveStars />
            </div>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">
            Vinieron a mi casa maestros responsables que cumplieron lo que dijeron en los dos días que me tuvieron que visitar.
          </p>
        </div>

        {/* Testimony 3 */}
        <div className="flex flex-col flex-1 gap-4 px-6 py-10 bg-white shadow-md rounded-2xl border border-gray-100">
          <div className="flex items-center gap-3">
            <img
              src="/assets/images/antonia-soto-testimony-photo.png"
              alt="Cliente Antonia Soto"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-bold text-gray-900">Antonia Soto</h3>
              <FiveStars />
            </div>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">
            ¡Super! Llamamos por una primera fuga, que detectaron y repararon sin problemas.
          </p>
        </div>
      </div>

      {/* Secure payment */}
      <div className="flex flex-col items-center gap-4 pt-6">
        <p className="text-center text-gray-700">
          Paga nuestros servicios de{' '}
          <strong className="text-gray-900 font-bold">manera segura y en cuotas</strong> en:
        </p>
        <img
          src="/assets/images/webpay-icon.svg"
          alt="Ícono de WebPay"
          className="w-36 h-auto"
        />
      </div>
    </div>
  );
};
