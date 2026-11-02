import React, { useState } from 'react';
import { AnimeAvatarConfig } from '../types';
import { AnimeAvatarRenderer, DEFAULT_ANIME_AVATAR } from './AnimeAvatarRenderer';
import { Sparkles, Dices, Check, X, Shield, Palette } from 'lucide-react';

interface AnimeAvatarStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentAvatar: AnimeAvatarConfig;
  onSaveAvatar: (newAvatar: AnimeAvatarConfig) => void;
  isInitialSetup?: boolean;
}

export const AnimeAvatarStudioModal: React.FC<AnimeAvatarStudioModalProps> = ({
  isOpen,
  onClose,
  currentAvatar,
  onSaveAvatar,
  isInitialSetup = false,
}) => {
  const [avatar, setAvatar] = useState<AnimeAvatarConfig>(currentAvatar || DEFAULT_ANIME_AVATAR);
  const [activeTab, setActiveTab] = useState<'hair' | 'face' | 'clothes' | 'gear'>('hair');

  if (!isOpen) return null;

  const skinTones = [
    { label: 'Deep Melanin', color: '#593110' },
    { label: 'Rich Bronze', color: '#8d5524' },
    { label: 'Warm Caramel', color: '#c68642' },
    { label: 'Golden Amber', color: '#e0ac69' },
    { label: 'Warm Honey', color: '#f1c27d' },
    { label: 'Fair Glow', color: '#ffdbac' },
  ];

  const hairColors = [
    { label: 'Obsidian Black', color: '#0f172a' },
    { label: 'Cyber Indigo', color: '#4f46e5' },
    { label: 'Neon Azure', color: '#0284c7' },
    { label: 'Solar Amber', color: '#d97706' },
    { label: 'Emerald Tech', color: '#059669' },
    { label: 'Electric Magenta', color: '#db2777' },
    { label: 'Platinum White', color: '#e2e8f0' },
  ];

  const eyeColors = [
    { label: 'Indigo Core', color: '#4f46e5' },
    { label: 'Cyan Laser', color: '#0284c7' },
    { label: 'Emerald Scan', color: '#10b981' },
    { label: 'Golden Focus', color: '#f59e0b' },
    { label: 'Violet Mind', color: '#7c3aed' },
    { label: 'Ruby Drive', color: '#be123c' },
  ];

  const clothingColors = [
    { label: 'Midnight Navy', color: '#1e1b4b' },
    { label: 'Deep Indigo', color: '#312e81' },
    { label: 'Protea Crimson', color: '#881337' },
    { label: 'Forest Green', color: '#064e3b' },
    { label: 'Cyber Charcoal', color: '#0f172a' },
    { label: 'Highveld Ochre', color: '#78350f' },
  ];

  const randomizeAvatar = () => {
    const randomSkin = skinTones[Math.floor(Math.random() * skinTones.length)].color;
    const randomHairCol = hairColors[Math.floor(Math.random() * hairColors.length)].color;
    const randomEyeCol = eyeColors[Math.floor(Math.random() * eyeColors.length)].color;
    const randomClothCol = clothingColors[Math.floor(Math.random() * clothingColors.length)].color;

    const hairStyles: AnimeAvatarConfig['hairStyle'][] = [
      'spiky',
      'dreadlocks',
      'long-flowing',
      'afro-puff',
      'short-cyber',
      'braids',
      'side-sweep',
    ];
    const clothingStyles: AnimeAvatarConfig['clothing'][] = [
      'school-blazer',
      'cyber-hoodie',
      'shweshwe-tech',
      'lab-coat',
      'gamer-jersey',
    ];
    const accessories: AnimeAvatarConfig['accessory'][] = [
      'cyber-visor',
      'hacker-headphones',
      'smart-glasses',
      'african-bead-collar',
      'ai-core-pendant',
      'none',
    ];
    const auras: AnimeAvatarConfig['auraEffect'][] = [
      'azure-cyber',
      'matrix-green',
      'solar-gold',
      'neon-violet',
      'none',
    ];

    setAvatar({
      ...avatar,
      skinTone: randomSkin,
      hairColor: randomHairCol,
      eyeColor: randomEyeCol,
      clothingColor: randomClothCol,
      hairStyle: hairStyles[Math.floor(Math.random() * hairStyles.length)],
      clothing: clothingStyles[Math.floor(Math.random() * clothingStyles.length)],
      accessory: accessories[Math.floor(Math.random() * accessories.length)],
      auraEffect: auras[Math.floor(Math.random() * auras.length)],
    });
  };

  const handleSave = () => {
    onSaveAvatar(avatar);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-3xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold">
                {isInitialSetup ? 'Welcome! Create Your Anime Tech Avatar' : 'Anime Avatar Customization Studio'}
              </h3>
              <p className="text-xs text-slate-300">
                Design your digital identity for the FUNDAI learning ecosystem
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={randomizeAvatar}
              className="px-3 py-1.5 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-indigo-300 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Dices className="w-3.5 h-3.5" />
              <span>Randomize</span>
            </button>
            {!isInitialSetup && (
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Studio Content Split: Avatar Preview (Left) + Options Deck (Right) */}
        <div className="grid grid-cols-1 md:grid-cols-12 flex-1 overflow-y-auto">
          {/* Left: Interactive Anime Stage (5 Cols) */}
          <div className="md:col-span-5 bg-slate-950 p-6 flex flex-col items-center justify-center text-center space-y-4 border-r border-slate-800">
            <div className="p-2 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl">
              <AnimeAvatarRenderer avatar={avatar} size="xl" isAnimated={true} />
            </div>

            <div className="space-y-1">
              <div className="text-sm font-bold text-slate-100 flex items-center justify-center gap-1.5">
                <span>{avatar.hairStyle.toUpperCase()}</span>
                <span className="text-slate-500">·</span>
                <span className="text-indigo-400">{avatar.clothing.toUpperCase()}</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Aura: {avatar.auraEffect} · Accessory: {avatar.accessory}
              </p>
            </div>
          </div>

          {/* Right: Customization Controls (7 Cols) */}
          <div className="md:col-span-7 p-6 space-y-5 bg-white dark:bg-slate-900 text-xs">
            {/* Customization Category Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
              {[
                { id: 'hair', label: 'Hair & Melanin' },
                { id: 'face', label: 'Eyes & Expression' },
                { id: 'clothes', label: 'Blazer & Outfit' },
                { id: 'gear', label: 'Cyber Gear & Aura' },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setActiveTab(t.id as any)}
                  className={`flex-1 py-1.5 rounded-lg font-semibold text-center transition-all ${
                    activeTab === t.id
                      ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* TAB 1: HAIR & SKIN */}
            {activeTab === 'hair' && (
              <div className="space-y-4">
                {/* Skin Melanin Tone */}
                <div className="space-y-2">
                  <span className="font-bold text-slate-800 dark:text-slate-200 block">
                    Melanin Skin Tone:
                  </span>
                  <div className="flex items-center gap-2.5">
                    {skinTones.map((st) => (
                      <button
                        key={st.color}
                        type="button"
                        onClick={() => setAvatar({ ...avatar, skinTone: st.color })}
                        style={{ backgroundColor: st.color }}
                        className={`w-8 h-8 rounded-full border-2 transition-transform ${
                          avatar.skinTone === st.color
                            ? 'border-indigo-600 scale-110 shadow-md ring-2 ring-indigo-400/50'
                            : 'border-white dark:border-slate-800 hover:scale-105'
                        }`}
                        title={st.label}
                      />
                    ))}
                  </div>
                </div>

                {/* Hairstyle */}
                <div className="space-y-2">
                  <span className="font-bold text-slate-800 dark:text-slate-200 block">
                    Anime Hairstyle:
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'dreadlocks', label: 'Crown Dreads' },
                      { id: 'afro-puff', label: 'Afro Puff' },
                      { id: 'spiky', label: 'Spiky Cyber' },
                      { id: 'braids', label: 'Clean Braids' },
                      { id: 'side-sweep', label: 'Side Sweep' },
                      { id: 'short-cyber', label: 'Short Crop' },
                      { id: 'long-flowing', label: 'Flowing Waves' },
                    ].map((hs) => (
                      <button
                        key={hs.id}
                        type="button"
                        onClick={() => setAvatar({ ...avatar, hairStyle: hs.id as any })}
                        className={`p-2.5 rounded-xl border text-left font-medium transition-all ${
                          avatar.hairStyle === hs.id
                            ? 'bg-indigo-50 dark:bg-indigo-950 border-indigo-600 text-indigo-900 dark:text-indigo-200 font-bold'
                            : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-slate-300'
                        }`}
                      >
                        {hs.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Hair Color */}
                <div className="space-y-2">
                  <span className="font-bold text-slate-800 dark:text-slate-200 block">
                    Hair Color:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {hairColors.map((hc) => (
                      <button
                        key={hc.color}
                        type="button"
                        onClick={() => setAvatar({ ...avatar, hairColor: hc.color })}
                        style={{ backgroundColor: hc.color }}
                        className={`w-7 h-7 rounded-full border-2 transition-transform ${
                          avatar.hairColor === hc.color
                            ? 'border-indigo-600 scale-110 ring-2 ring-indigo-400/50'
                            : 'border-white dark:border-slate-800 hover:scale-105'
                        }`}
                        title={hc.label}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: EYES & EXPRESSION */}
            {activeTab === 'face' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <span className="font-bold text-slate-800 dark:text-slate-200 block">
                    Eye Expression:
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'determined', label: 'Determined Focus' },
                      { id: 'sparkle', label: 'Curious & Sparkle' },
                      { id: 'friendly', label: 'Friendly Scholar' },
                      { id: 'analytical', label: 'Analytical Thinker' },
                      { id: 'cool', label: 'Cyber Cool' },
                    ].map((exp) => (
                      <button
                        key={exp.id}
                        type="button"
                        onClick={() => setAvatar({ ...avatar, eyeExpression: exp.id as any })}
                        className={`p-2.5 rounded-xl border text-left font-medium transition-all ${
                          avatar.eyeExpression === exp.id
                            ? 'bg-indigo-50 dark:bg-indigo-950 border-indigo-600 text-indigo-900 dark:text-indigo-200 font-bold'
                            : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700'
                        }`}
                      >
                        {exp.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="font-bold text-slate-800 dark:text-slate-200 block">
                    Eye Iris Color:
                  </span>
                  <div className="flex items-center gap-2.5">
                    {eyeColors.map((ec) => (
                      <button
                        key={ec.color}
                        type="button"
                        onClick={() => setAvatar({ ...avatar, eyeColor: ec.color })}
                        style={{ backgroundColor: ec.color }}
                        className={`w-7 h-7 rounded-full border-2 transition-transform ${
                          avatar.eyeColor === ec.color
                            ? 'border-indigo-600 scale-110 ring-2 ring-indigo-400/50'
                            : 'border-white dark:border-slate-800 hover:scale-105'
                        }`}
                        title={ec.label}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: CLOTHING */}
            {activeTab === 'clothes' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <span className="font-bold text-slate-800 dark:text-slate-200 block">
                    Outfit Style:
                  </span>
                  <div className="space-y-2">
                    {[
                      { id: 'school-blazer', label: 'School Uniform Blazer & Tie (SA Classic)' },
                      { id: 'cyber-hoodie', label: 'Cyber Tech Hoodie with Circuit Lines' },
                      { id: 'shweshwe-tech', label: 'Shweshwe African Modern Fusion' },
                      { id: 'lab-coat', label: 'Robotics & Science Lab Coat' },
                      { id: 'gamer-jersey', label: 'Esports & Coding Hackathon Jersey' },
                    ].map((cl) => (
                      <button
                        key={cl.id}
                        type="button"
                        onClick={() => setAvatar({ ...avatar, clothing: cl.id as any })}
                        className={`w-full p-2.5 rounded-xl border text-left font-medium transition-all ${
                          avatar.clothing === cl.id
                            ? 'bg-indigo-50 dark:bg-indigo-950 border-indigo-600 text-indigo-900 dark:text-indigo-200 font-bold'
                            : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700'
                        }`}
                      >
                        {cl.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="font-bold text-slate-800 dark:text-slate-200 block">
                    Blazer / Clothing Color:
                  </span>
                  <div className="flex items-center gap-2.5">
                    {clothingColors.map((cc) => (
                      <button
                        key={cc.color}
                        type="button"
                        onClick={() => setAvatar({ ...avatar, clothingColor: cc.color })}
                        style={{ backgroundColor: cc.color }}
                        className={`w-7 h-7 rounded-full border-2 transition-transform ${
                          avatar.clothingColor === cc.color
                            ? 'border-indigo-600 scale-110 ring-2 ring-indigo-400/50'
                            : 'border-white dark:border-slate-800 hover:scale-105'
                        }`}
                        title={cc.label}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: GEAR & AURA */}
            {activeTab === 'gear' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <span className="font-bold text-slate-800 dark:text-slate-200 block">
                    Tech Accessory:
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'cyber-visor', label: 'Holographic Visor' },
                      { id: 'hacker-headphones', label: 'Studio Headphones' },
                      { id: 'smart-glasses', label: 'Smart Tech Glasses' },
                      { id: 'african-bead-collar', label: 'Beaded Heritage Collar' },
                      { id: 'ai-core-pendant', label: 'AI Core Pendant' },
                      { id: 'none', label: 'No Accessory' },
                    ].map((acc) => (
                      <button
                        key={acc.id}
                        type="button"
                        onClick={() => setAvatar({ ...avatar, accessory: acc.id as any })}
                        className={`p-2.5 rounded-xl border text-left font-medium transition-all ${
                          avatar.accessory === acc.id
                            ? 'bg-indigo-50 dark:bg-indigo-950 border-indigo-600 text-indigo-900 dark:text-indigo-200 font-bold'
                            : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700'
                        }`}
                      >
                        {acc.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="font-bold text-slate-800 dark:text-slate-200 block">
                    Energy Aura Glow:
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'azure-cyber', label: 'Azure Quantum Pulse' },
                      { id: 'matrix-green', label: 'Matrix Terminal Glow' },
                      { id: 'solar-gold', label: 'African Solar Gold' },
                      { id: 'neon-violet', label: 'Deep Neural Violet' },
                      { id: 'none', label: 'Neutral Ambient' },
                    ].map((aur) => (
                      <button
                        key={aur.id}
                        type="button"
                        onClick={() => setAvatar({ ...avatar, auraEffect: aur.id as any })}
                        className={`p-2.5 rounded-xl border text-left font-medium transition-all ${
                          avatar.auraEffect === aur.id
                            ? 'bg-indigo-50 dark:bg-indigo-950 border-indigo-600 text-indigo-900 dark:text-indigo-200 font-bold'
                            : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700'
                        }`}
                      >
                        {aur.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer / Save Action */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Avatars appear across your dashboard, quiz certificates, and capstone cards.
          </span>
          <button
            type="button"
            onClick={handleSave}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
          >
            <Check className="w-4 h-4" />
            <span>Save & Set Active Avatar</span>
          </button>
        </div>
      </div>
    </div>
  );
};
