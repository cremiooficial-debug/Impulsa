'use client';

import React from 'react';
import AppIcon from './AppIcon';
import AppImage from './AppImage';

interface LoginLogoProps {
  src?: string; // Image source (optional)
  text?: string; // Logo text (optional)
  iconName?: string; // Icon name when no image
  size?: number; // Size for icon/image
  className?: string; // Additional classes
  onClick?: () => void; // Click handler
}

export default function LoginLogo({
  src = '/assets/images/impulsalogo1.png',
  text,
  iconName = 'SparklesIcon',
  size = 120,
  className = '',
  onClick,
}: LoginLogoProps) {
  return (
    <div
      className={`flex items-center justify-center ${onClick ? 'cursor-pointer hover:opacity-80' : ''} ${className}`}
      onClick={onClick}
    >
      {/* Show image if src provided, otherwise show icon */}
      {src ? (
        <AppImage 
          src={src} 
          alt="Impulsa UCV Logo" 
          width={size} 
          height={size} 
          // Ancho responsivo: abarca aprox 1/3 del modal en móviles (w-28) y crece sutilmente en PC (sm:w-36)
          className="w-28 sm:w-36 h-auto object-contain flex-shrink-0" 
        />
      ) : (
        <AppIcon name={iconName} size={size} className="flex-shrink-0" />
      )}

      {/* Show text if provided */}
      {text && <span className="text-xl font-bold">{text}</span>}
    </div>
  );
}