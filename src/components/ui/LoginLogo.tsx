'use client';

import React from 'react';
import AppIcon from './AppIcon';
import AppImage from './AppImage';

interface LoginLogoProps {
  src?: string; 
  text?: string; 
  iconName?: string; 
  size?: number; 
  className?: string; 
  onClick?: () => void; 
}

export default function LoginLogo({
  src = '/assets/images/impulsalogo1.png',
  text,
  iconName = 'SparklesIcon',
  size = 40, // Tamaño base más compacto para móviles
  className = '',
  onClick,
}: LoginLogoProps) {
  return (
    <div
      className={`flex items-center gap-2 ${onClick ? 'cursor-pointer hover:opacity-80' : ''} ${className}`}
      onClick={onClick}
    >
      {src ? (
        <AppImage 
          src={src} 
          alt="Logo" 
          width={size} 
          height={size} 
          // Cambiamos w-full h-full por un tamaño controlado responsivo (más pequeño en móviles, normal en pantallas grandes)
          className="w-10 h-10 sm:w-12 sm:h-12 object-contain flex-shrink-0" 
        />
      ) : (
        <AppIcon name={iconName} size={size} className="flex-shrink-0" />
      )}

      {text && <span className="text-xl font-bold">{text}</span>}
    </div>
  );
}