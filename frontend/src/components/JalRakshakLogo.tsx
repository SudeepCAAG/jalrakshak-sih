'use client';

import React from 'react';

interface JalRakshakLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showText?: boolean;
  subtitle?: string;
  badgeText?: string;
  isDark?: boolean;
}

export const JalRakshakLogo: React.FC<JalRakshakLogoProps> = ({
  size = 'md',
  className = '',
  showText = true,
  subtitle = 'Flood Intelligence for a Safer Tomorrow',
  badgeText,
  isDark = false
}) => {
  const sizeMap = {
    sm: { icon: 'w-7 h-7', text: 'text-base', sub: 'text-[9px]' },
    md: { icon: 'w-9 h-9', text: 'text-lg sm:text-[19px]', sub: 'text-[10px]' },
    lg: { icon: 'w-12 h-12', text: 'text-2xl', sub: 'text-xs' },
    xl: { icon: 'w-16 h-16', text: 'text-3xl sm:text-4xl', sub: 'text-sm' },
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 select-none group ${className}`}>
      {/* Precision Modern Vector Water-Drop & Skyline Emblem */}
      <div className="relative shrink-0 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
        <svg 
          className={`${currentSize.icon} drop-shadow-xs`} 
          viewBox="0 0 512 512" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Water Droplet Gradient (Sky to Ocean Blue) */}
            <linearGradient id="dropGrad" x1="20%" y1="0%" x2="80%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="45%" stopColor="#0284C7" />
              <stop offset="100%" stopColor="#0369A1" />
            </linearGradient>

            {/* Saffron Wave Swoosh Gradient */}
            <linearGradient id="saffronWave" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF8A00" />
              <stop offset="50%" stopColor="#FF6B00" />
              <stop offset="100%" stopColor="#E65100" />
            </linearGradient>

            {/* Navy Base Water Basin Gradient */}
            <linearGradient id="navyWave" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0284C7" />
              <stop offset="50%" stopColor="#0B1E59" />
              <stop offset="100%" stopColor="#07143D" />
            </linearGradient>

            {/* Droplet Clip Path */}
            <clipPath id="dropClip">
              <path d="M256 36 C256 36 100 236 100 346 C100 432 170 476 256 476 C342 476 412 432 412 346 C412 236 256 36 256 36 Z" />
            </clipPath>
          </defs>

          {/* 1. Water Droplet Base Shell */}
          <path 
            d="M256 36 C256 36 100 236 100 346 C100 432 170 476 256 476 C342 476 412 432 412 346 C412 236 256 36 256 36 Z" 
            fill="url(#dropGrad)" 
          />

          {/* 2. Droplet Translucent Center Glow */}
          <path 
            d="M256 60 C256 60 125 240 125 340 C125 412 184 452 256 452 C328 452 387 412 387 340 C387 240 256 60 256 60 Z" 
            fill="white" 
            opacity="0.18" 
          />

          {/* 3. Urban City Skyline Silhouette (Clipped Inside Droplet) */}
          <g clipPath="url(#dropClip)">
            {/* Background Base Shadow */}
            <path d="M100 320 L412 320 L412 480 L100 480 Z" fill="#0B1E59" opacity="0.4" />

            {/* City Architecture Silhouette in Deep Navy */}
            <path 
              d="M 90 480 
                 L 90 370 L 125 370 L 125 480
                 L 132 480 L 132 340 L 165 340 L 165 480
                 L 172 480 L 172 280 L 205 280 L 205 480
                 L 212 480 L 212 315 L 238 315 L 238 480
                 L 244 480 L 244 220 L 253 220 L 253 195 L 257 195 L 257 220 L 266 220 L 266 480
                 L 272 480 L 272 260 L 302 260 L 302 480
                 L 310 480 L 310 300 L 338 300 L 338 480
                 L 345 480 L 345 350 L 375 350 L 375 480
                 L 382 480 L 382 375 L 420 375 L 420 480 Z" 
              fill="#0A1D4E"
            />

            {/* Building Windows Lit Grid */}
            <rect x="182" y="295" width="4" height="6" rx="1" fill="#7DD3FC" opacity="0.85" />
            <rect x="192" y="295" width="4" height="6" rx="1" fill="#7DD3FC" opacity="0.85" />
            <rect x="182" y="310" width="4" height="6" rx="1" fill="#7DD3FC" opacity="0.85" />
            <rect x="192" y="310" width="4" height="6" rx="1" fill="#7DD3FC" opacity="0.85" />
            
            <rect x="249" y="235" width="4" height="6" rx="1" fill="#BAE6FD" opacity="0.95" />
            <rect x="257" y="235" width="4" height="6" rx="1" fill="#BAE6FD" opacity="0.95" />
            <rect x="249" y="250" width="4" height="6" rx="1" fill="#BAE6FD" opacity="0.95" />
            <rect x="257" y="250" width="4" height="6" rx="1" fill="#BAE6FD" opacity="0.95" />
            
            <rect x="280" y="275" width="4" height="6" rx="1" fill="#7DD3FC" opacity="0.85" />
            <rect x="290" y="275" width="4" height="6" rx="1" fill="#7DD3FC" opacity="0.85" />
            <rect x="280" y="290" width="4" height="6" rx="1" fill="#7DD3FC" opacity="0.85" />
            <rect x="290" y="290" width="4" height="6" rx="1" fill="#7DD3FC" opacity="0.85" />
          </g>

          {/* 4. Droplet Specular Reflection */}
          <path 
            d="M170 135 C210 75 250 52 256 46 C240 62 198 110 158 178 C144 202 136 235 136 265 C136 245 146 175 170 135 Z" 
            fill="white" 
            opacity="0.4" 
          />

          {/* 5. Deep Navy Hydrodynamic Base Basin */}
          <path 
            d="M 96 376 C 110 440 175 486 256 486 C 337 486 402 440 416 376 C 365 418 290 435 220 420 C 160 405 120 388 96 376 Z" 
            fill="url(#navyWave)" 
          />

          {/* 6. Dynamic Saffron Wave Swoosh (Crossing Left to Right) */}
          <path 
            d="M 44 416 C 90 380 160 376 210 410 C 260 442 335 440 395 390 C 360 422 300 448 235 436 C 170 422 100 415 44 416 Z" 
            fill="url(#saffronWave)" 
          />

          {/* 7. Crisp White Water Wave Crest */}
          <path 
            d="M 68 410 C 115 382 175 380 220 412 C 265 440 330 435 380 395" 
            stroke="white" 
            strokeWidth="8" 
            strokeLinecap="round" 
            fill="none" 
            opacity="0.95"
          />
        </svg>
      </div>

      {/* Modern Brand Name & Typography */}
      {showText && (
        <div className="flex flex-col justify-center leading-none">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className={`${currentSize.text} font-black tracking-tight flex items-center`}>
              <span className={isDark ? "text-white font-black" : "text-[#0B1E59] font-black"}>
                Jal
              </span>
              <span className="text-[#FF7A00] font-black ml-0.5">
                Rakshak
              </span>
            </span>

            {badgeText && (
              <span className={`hidden sm:inline-flex text-[10px] px-2 py-0.5 rounded-full font-bold shadow-2xs ${
                isDark 
                  ? 'bg-white/10 text-orange-400 border border-orange-400/30' 
                  : 'bg-orange-50 text-[#FF7A00] border border-orange-200'
              }`}>
                {badgeText}
              </span>
            )}
          </div>

          {subtitle && (
            <p className={`hidden 2xl:flex ${currentSize.sub} font-semibold tracking-tight mt-1 ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}>
              {subtitle}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
