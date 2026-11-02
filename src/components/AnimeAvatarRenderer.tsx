import React from 'react';
import { AnimeAvatarConfig } from '../types';

export const DEFAULT_ANIME_AVATAR: AnimeAvatarConfig = {
  genderStyle: 'cyber-neutral',
  skinTone: '#8d5524',
  hairStyle: 'afro-puff',
  hairColor: '#0f172a',
  eyeExpression: 'sparkle',
  eyeColor: '#4f46e5',
  clothing: 'school-blazer',
  clothingColor: '#1e3a8a',
  accessory: 'hacker-headphones',
  auraEffect: 'azure-cyber',
};

interface AnimeAvatarRendererProps {
  config?: AnimeAvatarConfig;
  avatar?: AnimeAvatarConfig;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  isAnimated?: boolean;
}

export const AnimeAvatarRenderer: React.FC<AnimeAvatarRendererProps> = ({
  config,
  avatar,
  size = 'md',
  className = '',
  isAnimated = true,
}) => {
  const pixelSizes = {
    xs: 32,
    sm: 40,
    md: 56,
    lg: 96,
    xl: 180,
  };
  const px = pixelSizes[size] || 56;
  const c = avatar || config || DEFAULT_ANIME_AVATAR;

  const skin = c.skinTone || '#8d5524';
  const hair = c.hairColor || '#0f172a';
  const hairStyle = c.hairStyle || 'afro-puff';
  const eyes = c.eyeExpression || 'sparkle';
  const eyeColor = c.eyeColor || '#4f46e5';
  const clothing = c.clothing || 'school-blazer';
  const clothingColor = c.clothingColor || '#1e3a8a';
  const accessory = c.accessory || 'hacker-headphones';
  const aura = c.auraEffect || 'azure-cyber';

  // Aura colors
  const auraGradients: Record<string, { start: string; end: string }> = {
    none: { start: 'transparent', end: 'transparent' },
    'azure-cyber': { start: '#0284c7', end: '#38bdf8' },
    'matrix-green': { start: '#059669', end: '#34d399' },
    'solar-gold': { start: '#d97706', end: '#fbbf24' },
    'neon-violet': { start: '#7c3aed', end: '#c084fc' },
  };
  const auraConfig = auraGradients[aura] || auraGradients['azure-cyber'];

  return (
    <div
      className={`relative rounded-2xl overflow-hidden select-none shrink-0 flex items-center justify-center ${className}`}
      style={{ width: px, height: px }}
    >
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full"
        style={{ filter: aura !== 'none' ? 'drop-shadow(0 0 10px rgba(99,102,241,0.25))' : undefined }}
      >
        <defs>
          {/* Aura Linear Gradient */}
          <linearGradient id={`aura-grad-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={auraConfig.start} stopOpacity="0.4" />
            <stop offset="100%" stopColor={auraConfig.end} stopOpacity="0.1" />
          </linearGradient>

          {/* Skin Shading Linear Gradient */}
          <linearGradient id={`skin-grad-${size}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={skin} />
            <stop offset="100%" stopColor={skin} stopOpacity="0.85" />
          </linearGradient>

          {/* Hair Gradient */}
          <linearGradient id={`hair-grad-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={hair} />
            <stop offset="100%" stopColor={hair} stopOpacity="0.8" />
          </linearGradient>

          {/* Anime Eye Sparkle Keyframes */}
          <style>{`
            @keyframes animeBlink {
              0%, 90%, 100% { transform: scaleY(1); }
              95% { transform: scaleY(0.1); }
            }
            @keyframes auraPulse {
              0%, 100% { opacity: 0.3; transform: scale(0.98); }
              50% { opacity: 0.7; transform: scale(1.02); }
            }
            @keyframes floatingData {
              0% { transform: translateY(0px) rotate(0deg); opacity: 0.6; }
              50% { transform: translateY(-4px) rotate(3deg); opacity: 0.9; }
              100% { transform: translateY(0px) rotate(0deg); opacity: 0.6; }
            }
            .anime-eye-blink {
              transform-origin: 100px 96px;
              animation: ${isAnimated ? 'animeBlink 4s infinite ease-in-out' : 'none'};
            }
            .anime-aura-glow {
              transform-origin: center;
              animation: ${isAnimated && aura !== 'none' ? 'auraPulse 3s infinite ease-in-out' : 'none'};
            }
            .anime-float-head {
              animation: ${isAnimated ? 'floatingData 4s infinite ease-in-out' : 'none'};
            }
          `}</style>
        </defs>

        {/* 1. Background Aura Glow */}
        <circle cx="100" cy="100" r="95" fill="#0f172a" />
        {aura !== 'none' && (
          <circle
            cx="100"
            cy="100"
            r="92"
            fill={`url(#aura-grad-${size})`}
            className="anime-aura-glow"
          />
        )}

        {/* Floating Digital Circuit Particles */}
        {aura !== 'none' && (
          <g opacity="0.4">
            <circle cx="35" cy="45" r="3" fill={auraConfig.end} />
            <circle cx="165" cy="55" r="2.5" fill={auraConfig.start} />
            <circle cx="160" cy="140" r="3.5" fill={auraConfig.end} />
            <line x1="35" y1="45" x2="50" y2="60" stroke={auraConfig.end} strokeWidth="1" strokeDasharray="2 2" />
          </g>
        )}

        {/* Group with Idle Float Animation */}
        <g className="anime-float-head">
          {/* 2. Torso / Shoulders & Outfits */}
          <g id="body-clothing">
            {clothing === 'school-blazer' && (
              <g>
                {/* White Shirt Collar */}
                <path d="M78 140 L100 162 L122 140 L100 135 Z" fill="#ffffff" />
                {/* Red or Gold School Tie */}
                <path d="M96 142 L104 142 L106 175 L100 185 L94 175 Z" fill="#dc2626" />
                {/* School Blazer Jacket */}
                <path
                  d="M50 152 Q100 135 150 152 L160 200 L40 200 Z"
                  fill={clothingColor}
                />
                {/* Golden Embroidered FUNDAI Lapel Crest */}
                <circle cx="75" cy="172" r="5" fill="#f59e0b" />
                <path d="M73 172 L77 172 M75 170 L75 174" stroke="#78350f" strokeWidth="1" />
              </g>
            )}

            {clothing === 'cyber-hoodie' && (
              <g>
                {/* Cyber Hoodie with Glowing Trim */}
                <path
                  d="M45 150 Q100 132 155 150 L165 200 L35 200 Z"
                  fill={clothingColor}
                />
                <path
                  d="M75 140 Q100 168 125 140"
                  stroke="#38bdf8"
                  strokeWidth="3"
                  fill="none"
                />
                {/* Neon Data Chest Badge */}
                <rect x="90" y="165" width="20" height="8" rx="2" fill="#0284c7" />
                <circle cx="100" cy="169" r="2" fill="#e0f2fe" />
              </g>
            )}

            {clothing === 'shweshwe-tech' && (
              <g>
                <path
                  d="M48 152 Q100 134 152 152 L162 200 L38 200 Z"
                  fill={clothingColor}
                />
                {/* Traditional South African geometric print overlays */}
                <path d="M60 165 L70 175 L60 185 L50 175 Z" fill="#fde047" opacity="0.8" />
                <path d="M140 165 L150 175 L140 185 L130 175 Z" fill="#fde047" opacity="0.8" />
                <path d="M100 165 L110 175 L100 185 L90 175 Z" fill="#38bdf8" opacity="0.8" />
              </g>
            )}

            {clothing === 'lab-coat' && (
              <g>
                <path d="M75 140 L100 160 L125 140 Z" fill="#1e293b" />
                <path
                  d="M46 150 Q100 134 154 150 L162 200 L38 200 Z"
                  fill="#f8fafc"
                />
                <line x1="100" y1="160" x2="100" y2="200" stroke="#cbd5e1" strokeWidth="2" />
              </g>
            )}

            {clothing === 'gamer-jersey' && (
              <g>
                <path
                  d="M48 152 Q100 134 152 152 L162 200 L38 200 Z"
                  fill={clothingColor}
                />
                <polygon points="70,165 85,155 100,165 85,175" fill="#f97316" />
                <text x="100" y="185" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                  ZA 01
                </text>
              </g>
            )}
          </g>

          {/* 3. Neck */}
          <path d="M88 120 L112 120 L116 146 L84 146 Z" fill={skin} opacity="0.9" />

          {/* 4. Head Base Face Structure */}
          <g id="face-base">
            {/* Anime Chin & Jaw */}
            <path
              d="M62 82 Q62 124 100 134 Q138 124 138 82 Q138 46 100 46 Q62 46 62 82 Z"
              fill={`url(#skin-grad-${size})`}
            />
            {/* Ears */}
            <circle cx="62" cy="88" r="8" fill={skin} />
            <circle cx="138" cy="88" r="8" fill={skin} />
          </g>

          {/* 5. Expressive Anime Eyes (with Blinking Animation) */}
          <g id="anime-eyes" className="anime-eye-blink">
            {/* Left Eye */}
            <ellipse cx="82" cy="88" rx="10" ry="12" fill="#ffffff" />
            <ellipse cx="82" cy="88" rx="7" ry="10" fill={eyeColor} />
            <circle cx="80" cy="84" r="3" fill="#ffffff" />
            <circle cx="84" cy="91" r="1.5" fill="#ffffff" />
            {/* Eyelash */}
            <path d="M71 82 Q82 78 93 84" stroke="#0f172a" strokeWidth="2.5" fill="none" strokeLinecap="round" />

            {/* Right Eye */}
            <ellipse cx="118" cy="88" rx="10" ry="12" fill="#ffffff" />
            <ellipse cx="118" cy="88" rx="7" ry="10" fill={eyeColor} />
            <circle cx="116" cy="84" r="3" fill="#ffffff" />
            <circle cx="120" cy="91" r="1.5" fill="#ffffff" />
            {/* Eyelash */}
            <path d="M107 84 Q118 78 129 82" stroke="#0f172a" strokeWidth="2.5" fill="none" strokeLinecap="round" />

            {/* Eyebrows */}
            <path d="M72 74 Q82 71 91 76" stroke={hair} strokeWidth="2.2" fill="none" strokeLinecap="round" />
            <path d="M109 76 Q118 71 128 74" stroke={hair} strokeWidth="2.2" fill="none" strokeLinecap="round" />
          </g>

          {/* Cute Anime Nose & Confident Mouth */}
          <path d="M100 98 L98 103 L101 103" stroke="#78350f" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.6" />
          <path d="M93 114 Q100 120 107 114" stroke="#78350f" strokeWidth="2" fill="none" strokeLinecap="round" />

          {/* 6. Hairstyle */}
          <g id="hair-layers">
            {hairStyle === 'afro-puff' && (
              <g>
                <circle cx="100" cy="52" r="38" fill={`url(#hair-grad-${size})`} />
                <circle cx="70" cy="60" r="28" fill={`url(#hair-grad-${size})`} />
                <circle cx="130" cy="60" r="28" fill={`url(#hair-grad-${size})`} />
                <circle cx="100" cy="38" r="30" fill={`url(#hair-grad-${size})`} />
              </g>
            )}

            {hairStyle === 'dreadlocks' && (
              <g>
                <path d="M68 50 Q50 80 48 115" stroke={hair} strokeWidth="9" strokeLinecap="round" fill="none" />
                <path d="M78 42 Q65 80 62 125" stroke={hair} strokeWidth="9" strokeLinecap="round" fill="none" />
                <path d="M122 42 Q135 80 138 125" stroke={hair} strokeWidth="9" strokeLinecap="round" fill="none" />
                <path d="M132 50 Q150 80 152 115" stroke={hair} strokeWidth="9" strokeLinecap="round" fill="none" />
                <path d="M100 40 Q100 70 100 90" stroke={hair} strokeWidth="9" strokeLinecap="round" fill="none" />
                <circle cx="100" cy="48" r="28" fill={hair} />
              </g>
            )}

            {hairStyle === 'spiky' && (
              <g fill={`url(#hair-grad-${size})`}>
                <polygon points="100,20 115,50 85,50" />
                <polygon points="120,25 130,55 105,52" />
                <polygon points="80,25 95,52 70,55" />
                <polygon points="140,40 145,70 120,60" />
                <polygon points="60,40 80,60 55,70" />
                <path d="M62 60 Q100 35 138 60 L135 75 Q100 58 65 75 Z" />
              </g>
            )}

            {hairStyle === 'braids' && (
              <g stroke={hair} strokeWidth="6" strokeLinecap="round" fill="none">
                <path d="M66 54 L52 120" />
                <path d="M76 46 L64 130" />
                <path d="M124 46 L136 130" />
                <path d="M134 54 L148 120" />
                {/* Golden Hair Beads */}
                <circle cx="52" cy="116" r="3" fill="#fbbf24" stroke="none" />
                <circle cx="64" cy="126" r="3" fill="#fbbf24" stroke="none" />
                <circle cx="136" cy="126" r="3" fill="#fbbf24" stroke="none" />
                <circle cx="148" cy="116" r="3" fill="#fbbf24" stroke="none" />
                <circle cx="100" cy="48" r="26" fill={hair} stroke="none" />
              </g>
            )}

            {hairStyle === 'short-cyber' && (
              <g fill={`url(#hair-grad-${size})`}>
                <path d="M60 70 Q100 28 140 70 L136 60 Q100 22 64 60 Z" />
                <rect x="58" y="70" width="8" height="18" rx="3" />
                <rect x="134" y="70" width="8" height="18" rx="3" />
              </g>
            )}

            {hairStyle === 'long-flowing' && (
              <g fill={`url(#hair-grad-${size})`}>
                <path d="M60 55 Q50 90 48 140 Q62 145 68 120 Q64 90 70 70 Z" />
                <path d="M140 55 Q150 90 152 140 Q138 145 132 120 Q136 90 130 70 Z" />
                <circle cx="100" cy="46" r="30" />
              </g>
            )}

            {hairStyle === 'side-sweep' && (
              <g fill={`url(#hair-grad-${size})`}>
                <path d="M60 65 Q90 35 142 55 L130 80 Q95 50 62 80 Z" />
                <circle cx="100" cy="46" r="28" />
              </g>
            )}
          </g>

          {/* 7. High-Tech Accessories */}
          <g id="accessories">
            {accessory === 'cyber-visor' && (
              <g>
                <path
                  d="M68 84 Q100 88 132 84 L134 94 Q100 100 66 94 Z"
                  fill="#06b6d4"
                  opacity="0.85"
                />
                <line x1="72" y1="89" x2="128" y2="89" stroke="#ffffff" strokeWidth="1" strokeDasharray="3 2" />
              </g>
            )}

            {accessory === 'hacker-headphones' && (
              <g>
                {/* Headband */}
                <path d="M54 84 Q100 25 146 84" stroke="#334155" strokeWidth="6" fill="none" />
                {/* Left Ear Cup */}
                <rect x="48" y="76" width="12" height="22" rx="4" fill="#0284c7" />
                <circle cx="54" cy="87" r="3" fill="#38bdf8" />
                {/* Right Ear Cup */}
                <rect x="140" y="76" width="12" height="22" rx="4" fill="#0284c7" />
                <circle cx="146" cy="87" r="3" fill="#38bdf8" />
              </g>
            )}

            {accessory === 'smart-glasses' && (
              <g stroke="#38bdf8" strokeWidth="2" fill="none">
                <rect x="72" y="82" width="22" height="14" rx="3" />
                <rect x="106" y="82" width="22" height="14" rx="3" />
                <line x1="94" y1="89" x2="106" y2="89" />
              </g>
            )}

            {accessory === 'african-bead-collar' && (
              <g>
                <path d="M80 134 Q100 148 120 134" stroke="#f59e0b" strokeWidth="4" strokeDasharray="3 3" fill="none" />
                <path d="M82 140 Q100 154 118 140" stroke="#059669" strokeWidth="3" strokeDasharray="2 2" fill="none" />
              </g>
            )}

            {accessory === 'ai-core-pendant' && (
              <g>
                <polygon points="100,150 105,158 100,166 95,158" fill="#38bdf8" />
                <circle cx="100" cy="158" r="2" fill="#ffffff" />
              </g>
            )}
          </g>
        </g>
      </svg>
    </div>
  );
};
