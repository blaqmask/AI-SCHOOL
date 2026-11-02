import React, { useState } from 'react';
import { SouthAfricanLanguageCode } from '../types';
import { SA_LANGUAGES } from '../data/saLanguages';
import { Globe, Check, ChevronDown } from 'lucide-react';

interface LanguageSelectorProps {
  currentLanguage: SouthAfricanLanguageCode;
  onSelectLanguage: (code: SouthAfricanLanguageCode) => void;
  compact?: boolean;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLanguage,
  onSelectLanguage,
  compact = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const activeLang = SA_LANGUAGES.find((l) => l.code === currentLanguage) || SA_LANGUAGES[0];

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-700 text-xs font-semibold shadow-sm transition-all whitespace-nowrap`}
        title="Select South African Language"
      >
        <Globe className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
        <span className="font-mono">{activeLang.code.toUpperCase()}</span>
        <span className="hidden sm:inline">· {activeLang.name}</span>
        <ChevronDown className="w-3 h-3 text-slate-400" />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />

          {/* Dropdown Menu */}
          <div className="absolute right-0 mt-2 w-72 sm:w-80 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl z-50 p-2 text-xs divide-y divide-slate-100 dark:divide-slate-800 max-h-96 overflow-y-auto">
            <div className="p-2 pb-2">
              <span className="font-bold text-slate-900 dark:text-slate-100 block">
                Official South African Languages
              </span>
              <p className="text-[11px] text-slate-500">
                All 11 languages supported for curriculum, AI tutor & multi-subject help
              </p>
            </div>

            <div className="py-1 space-y-0.5">
              {SA_LANGUAGES.map((lang) => {
                const isSelected = lang.code === currentLanguage;
                return (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => {
                      onSelectLanguage(lang.code);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left p-2 rounded-xl flex items-start justify-between transition-colors ${
                      isSelected
                        ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-900 dark:text-indigo-200 font-bold'
                        : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-900 dark:text-slate-100">
                          {lang.nativeName}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          ({lang.code.toUpperCase()})
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                        {lang.flagRegion}
                      </div>
                    </div>
                    {isSelected && (
                      <Check className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
