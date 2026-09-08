import React from 'react';
import { Hero } from '@/components/Hero';
import { Dolors } from '@/components/Dolors';
import { Solution } from '@/components/Solution';
import { Testimonies } from '@/components/Testimonies';
import { CallToAction } from '@/components/CallToAction';
import { FAQ } from '@/components/FAQ';
import { Footer } from '@/components/Footer';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Dolors />
      <Solution />
      <Testimonies />
      <CallToAction />
      <FAQ />
      <Footer />
    </main>
  );
}
