import React from 'react';
import { GradeLevel, ActiveTab } from '../types';
import { ArrowRight, Sparkles, BookOpen, Cpu, ShieldCheck } from 'lucide-react';

interface HeroSectionProps {
  currentGrade: GradeLevel;
  onSelectGrade: (grade: GradeLevel) => void;
  onStartLearning: () => void;
  onExploreLabs: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  currentGrade,
  onSelectGrade,
  onStartLearning,
  onExploreLabs,
}) => {
  return (
    <div className="space-y-10">
      {/* 2-Column Split Hero with balanced height */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Column: Mission, Vision, and Grade Path Selector (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 tracking-wider uppercase">
              The AI Literacy & Innovation Learning System · Grades 4–12
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 leading-tight [text-wrap:balance]">
              Empowering young minds to understand, build, and responsibly lead with AI.
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
              By Grade 12, a learner should not just know how to type a prompt into ChatGPT or Gemini.
              They should understand the technology well enough to design, evaluate, build, and govern
              AI-powered solutions.
            </p>
          </div>

          {/* Interactive Grade Selector Track */}
          <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                Select Your Learner Grade Pathway:
              </span>
              <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">
                Active: Grade {currentGrade}
              </span>
            </div>

            <div className="grid grid-cols-9 gap-1 sm:gap-2">
              {[4, 5, 6, 7, 8, 9, 10, 11, 12].map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => onSelectGrade(g as GradeLevel)}
                  className={`py-2 text-xs font-bold rounded-lg transition-all ${
                    currentGrade === g
                      ? 'bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-500/50'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  G{g}
                </button>
              ))}
            </div>

            <div className="text-[11px] text-slate-500 flex items-center justify-between pt-1">
              <span>Stage 1: Discovery (4–5)</span>
              <span>Stage 2: Foundations (6–7)</span>
              <span>Stage 3: Application (8–9)</span>
              <span>Stage 4: Engineering (10–11)</span>
              <span>Stage 5: Research (12)</span>
            </div>
          </div>

          {/* Primary Action Row */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onStartLearning}
              className="w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Start Grade {currentGrade} Learning Path</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onExploreLabs}
              className="w-full sm:w-auto px-6 py-3 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 text-sm font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <Cpu className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>Explore Hands-On Labs</span>
            </button>
          </div>
        </div>

        {/* Right Column: Hero Visual Asset (5 Cols) */}
        <div className="lg:col-span-5 relative flex items-center">
          <div className="relative w-full h-full min-h-[340px] rounded-2xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-800 group">
            <img
              src="/src/assets/images/hero_ai_learning_ecosystem_1793574192331.jpg"
              alt="Grade 4-12 students collaborating in a modern AI laboratory"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Scrim Overlay for WCAG AA readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent flex flex-col justify-end p-6 text-white space-y-1">
              <span className="text-xs font-mono text-sky-300">
                AI Academy Digital Classroom
              </span>
              <h3 className="text-base font-bold leading-snug">
                Where Young Minds Build Tomorrow's Intelligent Systems
              </h3>
              <p className="text-xs text-slate-300">
                Interactive laboratories, prompt studios, and ethical dilemmas.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4-Column KPI Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm text-center">
          <span className="text-xs text-slate-500 font-medium">Curriculum Stages</span>
          <div className="text-2xl font-bold font-mono text-indigo-600 dark:text-indigo-400 mt-1">
            5 Stages
          </div>
          <span className="text-[11px] text-slate-400">Grades 4 through 12</span>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm text-center">
          <span className="text-xs text-slate-500 font-medium">Hands-On Labs</span>
          <div className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-1">
            5 Sandboxes
          </div>
          <span className="text-[11px] text-slate-400">Neural, Prompts, RAG & Ethics</span>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm text-center">
          <span className="text-xs text-slate-500 font-medium">Standards Aligned</span>
          <div className="text-2xl font-bold font-mono text-sky-600 dark:text-sky-400 mt-1">
            CSTA + UNESCO
          </div>
          <span className="text-[11px] text-slate-400">Verified Competencies</span>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm text-center">
          <span className="text-xs text-slate-500 font-medium">Adaptive AI Tutor</span>
          <div className="text-2xl font-bold font-mono text-purple-600 dark:text-purple-400 mt-1">
            Gemini 3.8
          </div>
          <span className="text-[11px] text-slate-400">Personalized Grade Mentorship</span>
        </div>
      </div>
    </div>
  );
};
