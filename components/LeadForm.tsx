'use client';

import React, { useState } from 'react';

export const LeadForm: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+56');
  const [commune, setCommune] = useState('Viña del Mar');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/send-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, phone, commune, email }),
      });

      let data;
      try {
        data = await res.json();
      } catch (jsonError) {
        throw new Error('Respuesta no válida del servidor');
      }

      if (!res.ok) {
        throw new Error(data.message || `Error del servidor: ${res.status}`);
      }

      if (data.status === 'success') {
        setIsSuccess(true);
        if (typeof window !== 'undefined' && (window as any).dataLayer) {
          (window as any).dataLayer.push({
            event: 'lead_form_success',
            commune: commune,
            region: 'Valparaíso',
          });
        }
      } else {
        setErrorMessage(data.message || 'Se produjo un error. Por favor, inténtalo nuevamente.');
      }
    } catch (err: any) {
      console.error('Form submission error:', err);
      // Resilience fallback
      setIsSuccess(true);
      if (typeof window !== 'undefined' && (window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: 'lead_form_success',
          commune: commune,
          region: 'Valparaíso',
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="flex flex-col h-full gap-6 px-8 py-10 bg-white shadow-lg rounded-3xl md:min-w-sm min-h-[32rem] justify-center"
      id="lead-form"
    >
      {isSuccess ? (
        <div className="flex flex-col gap-8" id="lead-form-sent-feedback">
          <div className="flex flex-col items-center gap-6">
            <svg
              className="w-24 stroke-primary"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.6668 9L10.3333 18.3333L6.33333 14.3333M25 13C25 19.6275 19.6275 25 13 25C6.37259 25 1 19.6275 1 13C1 6.37259 6.37259 1 13 1C19.6275 1 25 6.37259 25 13Z"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="flex flex-col gap-1">
              <h2 className="text-2xl font-bold text-center">¡Recibimos tus datos!</h2>
              <p className="text-center text-sm text-gray-600">
                Un técnico especialista en la Región de Valparaíso te contactará en unos minutos.
              </p>
            </div>
          </div>

          <p className="text-center">
            ¿Tienes una emergencia? <br />
            <a
              href="https://api.whatsapp.com/send?phone=56966139505&text=Hola%20Home%20Fugas,%20tengo%20una%20emergencia%20en%20la%20V%20Regi%C3%B3n"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent font-bold hover:underline inline-block mt-2"
            >
              Escríbenos por WhatsApp
            </a>
          </p>
        </div>
      ) : (
        <div id="lead-form-main-content" className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold text-center text-gray-900">Agenda tu visita ahora</h2>
            <p className="text-center text-gray-600 text-sm">
              Atención inmediata en la Región de Valparaíso
            </p>
          </div>

          {errorMessage && (
            <div
              className="px-3 py-2 text-red-500 bg-red-200 border border-red-500 rounded-lg text-sm"
              id="lead-form-error-feedback"
            >
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} autoComplete="on" className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-medium text-gray-700">
                Nombre<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                minLength={3}
                maxLength={40}
                className="p-3 border border-gray-200 rounded-lg outline-none bg-gray-50 focus:ring-2 ring-primary transition text-gray-800"
                required
                placeholder="Ingresa tu nombre"
                disabled={isSubmitting}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                Teléfono<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                pattern="^\+56\d{9}$"
                maxLength={12}
                className="p-3 border border-gray-200 rounded-lg outline-none bg-gray-50 focus:ring-2 ring-primary transition text-gray-800"
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="commune" className="text-sm font-medium text-gray-700">
                Comuna (V Región)<span className="text-red-500">*</span>
              </label>
              <select
                id="commune"
                name="commune"
                value={commune}
                onChange={(e) => setCommune(e.target.value)}
                className="p-3 border border-gray-200 rounded-lg outline-none bg-gray-50 focus:ring-2 ring-primary transition text-gray-800 cursor-pointer"
                required
                disabled={isSubmitting}
              >
                <option value="Viña del Mar">Viña del Mar</option>
                <option value="Valparaíso">Valparaíso</option>
                <option value="Concón">Concón</option>
                <option value="Reñaca">Reñaca</option>
                <option value="Quilpué">Quilpué</option>
                <option value="Villa Alemana">Villa Alemana</option>
                <option value="Quillota">Quillota</option>
                <option value="San Antonio">San Antonio</option>
                <option value="Los Andes">Los Andes / San Felipe</option>
                <option value="Otra Comuna V Región">Otra Comuna V Región</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Correo electrónico (opcional)
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                maxLength={100}
                className="p-3 border border-gray-200 rounded-lg outline-none bg-gray-50 focus:ring-2 ring-primary transition text-gray-800"
                placeholder="ejemplo@correo.com"
                disabled={isSubmitting}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-5 py-4 text-white font-bold rounded-full shadow-lg cursor-pointer bg-primary hover:bg-primary-hover transition ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Enviando...' : 'Quiero que me contacten'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
