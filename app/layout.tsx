import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  title: 'Home Fugas - Detección Y Reparación de Fugas de Agua en Valparaíso y Viña del Mar',
  description:
    'Detectamos fugas de agua no visibles en casas, piscinas, calefacción y tuberías sin romper. Atención inmediata de emergencias en Viña del Mar, Valparaíso, Concón, Reñaca, Quilpué y toda la Región de Valparaíso.',
  keywords: [
    'detección de fugas valparaíso',
    'detección de fugas viña del mar',
    'fugas de agua concón',
    'gas trazador valparaíso',
    'ultrasonido fugas de agua',
    'reparación de fugas sin romper',
    'filtraciones de agua reñaca',
    'gasfitería especializada quilpué',
  ],
  icons: {
    icon: '/assets/images/favicon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-TX895956');`,
          }}
        />
      </head>
      <body className="text-gray-700 bg-gray-100 antialiased">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TX895956"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
