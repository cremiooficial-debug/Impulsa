import React from 'react';
import type { Metadata, Viewport } from 'next';
import { AuthProvider } from '@/contexts/AuthContext';
import '../styles/tailwind.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Impulsa UCV — Transforma tu idea en un negocio sólido',
  description: 'Programa de formación Impulsa UCV: lleva tus ideas de la mente al mercado con la metodología de evaluación de proyectos UCV.',
  icons: {
    icon: [
      { url: '/assets/images/app_logo.png', type: 'image/x-icon' }
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="overflow-x-clip">
      <body className="overflow-x-clip bg-[#030C16] text-white">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}