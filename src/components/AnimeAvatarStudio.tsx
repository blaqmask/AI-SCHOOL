import React, { useState } from 'react';
import { AnimeAvatarConfig } from '../types';
import { AnimeAvatarRenderer } from './AnimeAvatarRenderer';
import { Sparkles, Dices, Check, ArrowRight, X, Palette, Shirt, Zap, Eye, Scissors } from 'lucide-react';

interface AnimeAvatarStudioProps {
  initialConfig?: AnimeAvatarConfig;
  onSave: (config: AnimeAvatarConfig) => void;
  onClose?: () => void;
  isFirstTimeOnboarding?: boolean;
  learnerName?: string;
}

const SKIN_TONES = [
  { id: '#451a03', name: 'Deep Espresso' },
  { id: '#78350f', name: 'Rich Bronze' },
  { id: '#a16207', name: 'Warm Amber' },
  { id: '#ca8a04', name: 'Golden Honey' },
  { id: '#d97706', name: 'Caramel Tan' },
  { id: '#fde047', name: 'Fair Ivory' },
];

const HAIR_COLORS = [
  { id: '#171717', name: 'Obsidian Black' },
  { id: '#451a03', name: 'Chestnut Brown' },
  { id: '#d97706', name: 'Golden Honey' },
  { id: '#0284c7', name: 'Electric Cyan' },
  { id: '#7c3aed', name: 'Neon Violet' },
  { id: '#e11d48', name: 'Ruby Crimson' },
  { id: '#f43f5e', name: 'Sakura Pink' },
  { id: '#e2e8f0', name: 'Silver Platinum' },
];

const EYE_COLORS = [
  { id: '#451a03', name: 'Warm Brown' },
  { id: '#d97706', name: 'Amber Gold' },
  { id: '#0284c7', name: 'Cyber Sky' },
  { id: '#059669', name: 'Emerald Green' },
  { id: '#7c3aed', name: 'Amethyst' },
];

const CLOTHING_COLORS = [
  { id: '#1e3a8a', name: 'Classic Navy' },
  { id: '#065f46', name: 'Forest Green' },
  { id: '#7c2d12', name: 'Maroon Blazer' },
  { id: '#0f172a', name: 'Stealth Black' },
  { id: '#7e22ce', name: 'Royal Purple' },
  { id: '#0284c7', name: 'Cyber Blue' },
];

export const AnimeAvatarStudio: React.FC<AnimeAvatarStudioProps> = ({
  initialConfig,
  onSave,
  onClose,
  isFirstTimeOnboarding = false,
  learnerName = 'Learner',
}) => {
  const [config, setConfig] = useState<AnimeAvatarConfig>(
    initialConfig || {
      genderStyle: 'anime-boy',
      skinTone: '#a16207',
      hairStyle: 'afro-puff',
      hairColor: '#171717',
      eyeExpression: 'sparkle',
      eyeColor: '#451a03',
      clothing: 'school-blazer',
      clothingColor: '#1e3a8a',
      accessory: 'hacker-headphones',
      auraEffect: 'azure-cyber',
    }
  );

  const [activeTab, setActiveTab] = useState<'hair' | 'face' | 'clothes' | 'tech'>('hair');
  const [isSavedNotice, setIsSavedNotice] = useState(false);

  const handleRandomize = () => {
    const hairStyles: AnimeAvatarConfig['hairStyle'][] = [
      'afro-puff',
      'dreadlocks',
      'spiky',
      'braids',
      'short-cyber',
      'long-flowing',
      'side-sweep',
    ];
    const clothingTypes: AnimeAvatarConfig['clothing'][] = [
      'school-blazer',
      'cyber-hoodie',
      'shweshwe-tech',
      'lab-coat',
      'gamer-jersey',
    ];
    const accessories: AnimeAvatarConfig['accessory'][] = [
      'none',
      'cyber-visor',
      'hacker-headphones',
      'smart-glasses',
      'ai-core-pendant',
      'african-bead-collar',
    ];
    const auras: AnimeAvatarConfig['auraEffect'][] = [
      'none',
      'azure-cyber',
      'matrix-green',
      'solar-gold',
      'neon-violet',
    ];

    setConfig({
      genderStyle: Math.random() > 0.5 ? 'anime-boy' : 'anime-girl',
      skinTone: SKIN_TONES[Math.floor(Math.random() * SKIN_TONES.length)].id,
      hairStyle: hairStyles[Math.floor(Math.random() * hairStyles.length)],
      hairColor: HAIR_COLORS[Math.floor(Math.random() * HAIR_COLORS.length)].id,
      eyeExpression: 'sparkle',
      eyeColor: EYE_COLORS[Math.floor(Math.random() * EYE_COLORS.length)].id,
      clothing: clothingTypes[Math.floor(Math.random() * clothingTypes.length)],
      clothingColor: CLOTHING_COLORS[Math.floor(Math.random() * CLOTHING_COLORS.length)].id,
      accessory: accessories[Math.floor(Math.random() * accessories.length)],
      auraEffect: auras[Math.floor(Math.random() * auras.length)],
    });
  };

  const handleSave = () => {
    setIsSavedNotice(true);
    onSave(config);
    setTimeout(() => {
      if (onClose) onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 text-white flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-sky-300 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Anime Avatar Creation Studio</span>
              {isFirstTimeOnboarding && (
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded text-[10px]">
                  Step 2 of 2: Cadet Identity
                </span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
              {isFirstTimeOnboarding
                ? `Design Your Animated AI Avatar, ${learnerName}!`
                : 'Customize Your Anime Cadet Avatar'}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleRandomize}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
              title="Randomize Appearance"
            >
              <Dices className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden sm:inline">Randomize</span>
            </button>
            {onClose && (
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

        {/* Studio Content Grid */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Live Animated Avatar Stage (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-slate-950 rounded-2xl border border-slate-800 text-center space-y-4">
            <div className="relative">
              <AnimeAvatarRenderer config={config} size="xl" isAnimated={true} />
              <div className="absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-bold shadow-md">
                LIVE ANIMATED
              </div>
            </div>

            <div className="space-y-1">
              <h4 className="text-base font-bold text-white tracking-tight">{learnerName}</h4>
              <p className="text-xs text-indigo-300 font-mono">FUNDAI Cadet · Active Avatar</p>
            </div>

            <div className="text-[11px] text-slate-400 max-w-xs leading-relaxed">
              Featuring animated eye blinking, floating digital circuit aura, and South African academy uniform badges.
            </div>

            <button
              type="button"
              onClick={handleSave}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
              {isSavedNotice ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  Avatar Activated!
                </>
              ) : (
                <>
                  <span>Save & Enter Academy</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          {/* Right Column: Customization Deck (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Customizer Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs overflow-x-auto">
              <button
                type="button"
                onClick={() => setActiveTab('hair')}
                className={`px-3 py-2 rounded-lg font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  activeTab === 'hair'
                    ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                <Scissors className="w-3.5 h-3.5" />
                <span>Hairstyle & Skin</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('face')}
                className={`px-3 py-2 rounded-lg font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  activeTab === 'face'
                    ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Eyes & Face</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('clothes')}
                className={`px-3 py-2 rounded-lg font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  activeTab === 'clothes'
                    ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                <Shirt className="w-3.5 h-3.5" />
                <span>Uniforms & Outfits</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('tech')}
                className={`px-3 py-2 rounded-lg font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  activeTab === 'tech'
                    ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Tech Visor & Aura</span>
              </button>
            </div>

            {/* TAB 1: HAIRSTYLE & SKIN */}
            {activeTab === 'hair' && (
              <div className="space-y-5 text-xs">
                {/* Skin Tone Palette */}
                <div className="space-y-2">
                  <label className="font-bold text-slate-800 dark:text-slate-200 block">
                    Skin Tone Palette:
                  </label>
                  <div className="flex flex-wrap gap-2.5">
                    {SKIN_TONES.map((st) => (
                      <button
                        key={st.id}
                        type="button"
                        onClick={() => setConfig((prev) => ({ ...prev, skinTone: st.id }))}
                        className={`w-9 h-9 rounded-xl border-2 transition-transform ${
                          config.skinTone === st.id
                            ? 'border-indigo-600 scale-110 shadow-md ring-2 ring-indigo-400'
                            : 'border-white dark:border-slate-800 hover:scale-105'
                        }`}
                        style={{ backgroundColor: st.id }}
                        title={st.name}
                      />
                    ))}
                  </div>
                </div>

                {/* Hairstyle Selection */}
                <div className="space-y-2">
                  <label className="font-bold text-slate-800 dark:text-slate-200 block">
                    Anime Hairstyle:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      { id: 'afro-puff', label: 'High Afro Puff' },
                      { id: 'dreadlocks', label: 'Dreadlocks / Locs' },
                      { id: 'braids', label: 'Box Braids with Beads' },
                      { id: 'spiky', label: 'Shonen Anime Spikes' },
                      { id: 'short-cyber', label: 'Short Cyber Fade' },
                      { id: 'long-flowing', label: 'Long Flowing' },
                      { id: 'side-sweep', label: 'Side-Sweep Manga' },
                    ].map((h) => (
                      <button
                        key={h.id}
                        type="button"
                        onClick={() => setConfig((prev) => ({ ...prev, hairStyle: h.id as any }))}
                        className={`p-2.5 rounded-xl border text-left transition-all ${
                          config.hairStyle === h.id
                            ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-500 font-bold text-indigo-900 dark:text-indigo-200'
                            : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                        }`}
                      >
                        {h.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Hair Color Palette */}
                <div className="space-y-2">
                  <label className="font-bold text-slate-800 dark:text-slate-200 block">
                    Hair Color:
                  </label>
                  <div className="flex flex-wrap gap-2.5">
                    {HAIR_COLORS.map((hc) => (
                      <button
                        key={hc.id}
                        type="button"
                        onClick={() => setConfig((prev) => ({ ...prev, hairColor: hc.id }))}
                        className={`w-8 h-8 rounded-xl border-2 transition-transform ${
                          config.hairColor === hc.id
                            ? 'border-indigo-600 scale-110 shadow-md ring-2 ring-indigo-400'
                            : 'border-white dark:border-slate-800 hover:scale-105'
                        }`}
                        style={{ backgroundColor: hc.id }}
                        title={hc.name}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: EYES & FACE */}
            {activeTab === 'face' && (
              <div className="space-y-5 text-xs">
                {/* Eye Color */}
                <div className="space-y-2">
                  <label className="font-bold text-slate-800 dark:text-slate-200 block">
                    Eye Color:
                  </label>
                  <div className="flex flex-wrap gap-2.5">
                    {EYE_COLORS.map((ec) => (
                      <button
                        key={ec.id}
                        type="button"
                        onClick={() => setConfig((prev) => ({ ...prev, eyeColor: ec.id }))}
                        className={`w-8 h-8 rounded-xl border-2 transition-transform ${
                          config.eyeColor === ec.id
                            ? 'border-indigo-600 scale-110 shadow-md ring-2 ring-indigo-400'
                            : 'border-white dark:border-slate-800 hover:scale-105'
                        }`}
                        style={{ backgroundColor: ec.id }}
                        title={ec.name}
                      />
                    ))}
                  </div>
                </div>

                {/* Eye Expression */}
                <div className="space-y-2">
                  <label className="font-bold text-slate-800 dark:text-slate-200 block">
                    Anime Expression:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'sparkle', label: 'Curious Sparkle (Live Blinking)' },
                      { id: 'determined', label: 'Determined Focus' },
                      { id: 'friendly', label: 'Friendly Smile' },
                      { id: 'analytical', label: 'Analytical Thinker' },
                    ].map((exp) => (
                      <button
                        key={exp.id}
                        type="button"
                        onClick={() => setConfig((prev) => ({ ...prev, eyeExpression: exp.id as any }))}
                        className={`p-2.5 rounded-xl border text-left transition-all ${
                          config.eyeExpression === exp.id
                            ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-500 font-bold text-indigo-900 dark:text-indigo-200'
                            : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {exp.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: UNIFORMS & OUTFITS */}
            {activeTab === 'clothes' && (
              <div className="space-y-5 text-xs">
                {/* Outfit Type */}
                <div className="space-y-2">
                  <label className="font-bold text-slate-800 dark:text-slate-200 block">
                    Academy Uniform / Outfit:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'school-blazer', label: '🇿🇦 South African School Blazer & Tie' },
                      { id: 'cyber-hoodie', label: '⚡ Cyber Tech Hoodie with Neon Trim' },
                      { id: 'shweshwe-tech', label: '🎨 Shweshwe Tech Heritage Jacket' },
                      { id: 'lab-coat', label: '🔬 Research Scientist Lab Coat' },
                      { id: 'gamer-jersey', label: '🎮 Esports AI Gamer Jersey' },
                    ].map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setConfig((prev) => ({ ...prev, clothing: c.id as any }))}
                        className={`p-2.5 rounded-xl border text-left transition-all ${
                          config.clothing === c.id
                            ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-500 font-bold text-indigo-900 dark:text-indigo-200'
                            : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {c.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Clothing Color */}
                <div className="space-y-2">
                  <label className="font-bold text-slate-800 dark:text-slate-200 block">
                    Uniform Color:
                  </label>
                  <div className="flex flex-wrap gap-2.5">
                    {CLOTHING_COLORS.map((cc) => (
                      <button
                        key={cc.id}
                        type="button"
                        onClick={() => setConfig((prev) => ({ ...prev, clothingColor: cc.id }))}
                        className={`w-8 h-8 rounded-xl border-2 transition-transform ${
                          config.clothingColor === cc.id
                            ? 'border-indigo-600 scale-110 shadow-md ring-2 ring-indigo-400'
                            : 'border-white dark:border-slate-800 hover:scale-105'
                        }`}
                        style={{ backgroundColor: cc.id }}
                        title={cc.name}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: TECH ACCESSORIES & AURA */}
            {activeTab === 'tech' && (
              <div className="space-y-5 text-xs">
                {/* Accessories */}
                <div className="space-y-2">
                  <label className="font-bold text-slate-800 dark:text-slate-200 block">
                    High-Tech Accessory:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'hacker-headphones', label: '🎧 RGB Hacker Headphones' },
                      { id: 'cyber-visor', label: '👓 Glowing Cyber Data Visor' },
                      { id: 'smart-glasses', label: '🕶️ Smart AI Wireframe Glasses' },
                      { id: 'african-bead-collar', label: '📿 African Heritage Bead Collar' },
                      { id: 'ai-core-pendant', label: '💎 Floating AI Neural Core Pendant' },
                      { id: 'none', label: 'None' },
                    ].map((acc) => (
                      <button
                        key={acc.id}
                        type="button"
                        onClick={() => setConfig((prev) => ({ ...prev, accessory: acc.id as any }))}
                        className={`p-2.5 rounded-xl border text-left transition-all ${
                          config.accessory === acc.id
                            ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-500 font-bold text-indigo-900 dark:text-indigo-200'
                            : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {acc.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Animated Aura Glow */}
                <div className="space-y-2">
                  <label className="font-bold text-slate-800 dark:text-slate-200 block">
                    Animated Digital Aura:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      { id: 'azure-cyber', label: '🔷 Azure Cyber Pulse' },
                      { id: 'matrix-green', label: '🟢 Matrix Emerald' },
                      { id: 'solar-gold', label: '🟡 Solar Energy Gold' },
                      { id: 'neon-violet', label: '🟣 Neon Violet Wave' },
                      { id: 'none', label: '⚪ Minimal Dark' },
                    ].map((aura) => (
                      <button
                        key={aura.id}
                        type="button"
                        onClick={() => setConfig((prev) => ({ ...prev, auraEffect: aura.id as any }))}
                        className={`p-2.5 rounded-xl border text-left transition-all ${
                          config.auraEffect === aura.id
                            ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-500 font-bold text-indigo-900 dark:text-indigo-200'
                            : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {aura.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
