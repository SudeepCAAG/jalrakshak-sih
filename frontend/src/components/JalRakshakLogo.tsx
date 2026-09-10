'use client';

import React from 'react';

interface JalRakshakLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showText?: boolean;
  subtitle?: string;
  badgeText?: string;
}

export const JalRakshakLogo: React.FC<JalRakshakLogoProps> = ({
  size = 'md',
  className = '',
  showText = true,
  subtitle,
  badgeText
}) => {
  const sizeMap = {
    sm: { box: 'w-8 h-8', icon: 'w-5 h-5', text: 'text-sm', sub: 'text-[9px]' },
    md: { box: 'w-11 h-11', icon: 'w-7 h-7', text: 'text-[17px]', sub: 'text-[10px]' },
    lg: { box: 'w-14 h-14', icon: 'w-9 h-9', text: 'text-xl', sub: 'text-xs' },
    xl: { box: 'w-20 h-20', icon: 'w-13 h-13', text: 'text-3xl', sub: 'text-sm' },
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  return (
    <div className={`flex items-center gap-3 select-none group ${className}`}>
      {/* 3D Glass Shield Emblem */}
      <div className="relative flex items-center justify-center shrink-0">
        {/* Ambient Neon Pulse Glow */}
        <div className="absolute -inset-1.5 bg-gradient-to-r from-amber-500/40 via-sky-500/30 to-amber-600/40 rounded-2xl blur-xs group-hover:blur-md transition-all duration-300"></div>

        <div className={`${currentSize.box} relative rounded-2xl bg-gradient-to-b from-sky-900 via-sky-950 to-stone-950 p-1 shadow-[0_8px_24px_rgba(3,105,161,0.35)] ring-1.5 ring-amber-400/80 group-hover:scale-105 transition-transform duration-300 flex items-center justify-center overflow-hidden`}>
          {/* Glass Gloss Sheen */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-white/5 opacity-90 pointer-events-none"></div>

          {/* Precision Vector Emblem */}
          <svg className={`${currentSize.icon} drop-shadow-md`} viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="shieldRimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FBBF24" />
                <stop offset="30%" stopColor="#FDE68A" />
                <stop offset="70%" stopColor="#D97706" />
                <stop offset="100%" stopColor="#92400E" />
              </linearGradient>

              <linearGradient id="shieldCoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0284C7" />
                <stop offset="40%" stopColor="#0369A1" />
                <stop offset="100%" stopColor="#082F49" />
              </linearGradient>

              <linearGradient id="wave1Grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38BDF8" />
                <stop offset="100%" stopColor="#0284C7" />
              </linearGradient>

              <linearGradient id="wave2Grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FCD34D" />
                <stop offset="50%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#D97706" />
              </linearGradient>

              <linearGradient id="dropGradCore" x1="30%" y1="10%" x2="80%" y2="90%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="30%" stopColor="#FEF08A" />
                <stop offset="70%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#B45309" />
              </linearGradient>
            </defs>

            {/* Outer Shield Rim */}
            <path 
              d="M256 36 L436 96 C436 290 350 412 256 476 C162 412 76 290 76 96 Z" 
              fill="url(#shieldRimGrad)" 
              stroke="#FEF3C7" 
              strokeWidth="6" 
              strokeLinejoin="round"
            />

            {/* Inner Hydrodynamic Core */}
            <path 
              d="M256 52 L418 106 C418 280 340 392 256 452 C172 392 94 280 94 106 Z" 
              fill="url(#shieldCoreGrad)"
            />

            {/* Subtle Reflection */}
            <path 
              d="M256 58 L410 110 C410 230 360 340 256 438 Z" 
              fill="white" 
              opacity="0.1"
            />

            {/* Radar Telemetry Arcs */}
            <g stroke="#38BDF8" strokeWidth="6" strokeLinecap="round" opacity="0.7">
              <path d="M176 186 A105 105 0 0 1 336 186" strokeDasharray="14 14" />
              <path d="M146 226 A145 145 0 0 1 366 226" strokeDasharray="18 16" />
            </g>

            {/* Protective Wave Layers */}
            <path 
              d="M110 330 C150 280 210 270 256 310 C300 350 360 340 402 290 C406 330 380 380 256 442 C140 380 112 330 110 330 Z" 
              fill="url(#wave1Grad)" 
              opacity="0.95"
            />
            <path 
              d="M125 350 C170 300 220 305 256 335 C295 365 345 355 385 315 C370 365 330 405 256 446 C180 405 140 365 125 350 Z" 
              fill="url(#wave2Grad)"
            />
            <path 
              d="M132 344 C175 300 220 306 256 335 C295 365 345 352 385 315" 
              fill="none" 
              stroke="#FFFBEB" 
              strokeWidth="5" 
              strokeLinecap="round"
            />

            {/* Beacon Droplet */}
            <path 
              d="M256 120 C220 175 200 215 200 248 C200 278 225 304 256 304 C287 304 312 278 312 248 C312 215 292 175 256 120 Z" 
              fill="url(#dropGradCore)"
            />
            <circle cx="244" cy="226" r="10" fill="white" />
          </svg>
        </div>
      </div>

      {/* Brand Name & Typography */}
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className={`${currentSize.text} font-black tracking-tight flex items-center`}>
              <span className="bg-gradient-to-r from-sky-950 via-amber-900 to-amber-950 bg-clip-text text-transparent">
                Jal
              </span>
              <span className="bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700 bg-clip-text text-transparent ml-0.5">
                Rakshak
              </span>
            </span>

            {badgeText && (
              <span className="hidden sm:inline-flex text-[10px] px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-100 to-amber-200 text-amber-950 border border-amber-300 font-black shadow-2xs">
                {badgeText}
              </span>
            )}
          </div>

          {subtitle && (
            <p className={`hidden 2xl:flex ${currentSize.sub} text-stone-500 font-semibold tracking-wide items-center gap-1.5 leading-tight mt-0.5`}>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>{subtitle}</span>
            </p>
          )}
        </div>
      )}
    </div>
  );
};
