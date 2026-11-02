import React, { useState } from 'react';
import { GradeLevel, SouthAfricanLanguageCode, UserRole } from '../types';
import { SA_LANGUAGES } from '../data/saLanguages';
import { Users, GraduationCap, ShieldCheck, School, Building2, Download, Check, FileText, Smartphone } from 'lucide-react';

interface RolesPortalProps {
  grade: GradeLevel;
  language: SouthAfricanLanguageCode;
}

export const RolesPortal: React.FC<RolesPortalProps> = ({ grade, language }) => {
  const [activeRole, setActiveRole] = useState<UserRole>('teacher');
  const [isDataPackGenerated, setIsDataPackGenerated] = useState(false);
  const [parentReportLanguage, setParentReportLanguage] = useState<SouthAfricanLanguageCode>(language);

  const activeLangObj = SA_LANGUAGES.find((l) => l.code === language) || SA_LANGUAGES[0];

  const handleGenerateDataPack = () => {
    setIsDataPackGenerated(true);
    setTimeout(() => setIsDataPackGenerated(false), 3000);
  };

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white p-6 sm:p-8">
        <div className="space-y-3">
          <div className="text-xs font-semibold text-teal-400 tracking-wide uppercase">
            Ecosystem Portals · 5 South African Education Stakeholders
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Institutional Administration & Role Access
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
            A sustainable school AI subject requires all stakeholders working together: learners, educators, parents,
            principals, and provincial education departments. Switch roles below to view dedicated workflows.
          </p>
        </div>
      </div>

      {/* 5-Role Segmented Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs overflow-x-auto">
        {[
          { id: 'learner', label: '1. Learners', icon: <GraduationCap className="w-3.5 h-3.5" /> },
          { id: 'teacher', label: '2. Teachers', icon: <Users className="w-3.5 h-3.5" /> },
          { id: 'parent', label: '3. Parents & Guardians', icon: <ShieldCheck className="w-3.5 h-3.5" /> },
          { id: 'school-admin', label: '4. School Administration', icon: <School className="w-3.5 h-3.5" /> },
          { id: 'super-admin', label: '5. Super / DBE Provincial', icon: <Building2 className="w-3.5 h-3.5" /> },
        ].map((r) => (
          <button
            key={r.id}
            type="button"
            onClick={() => setActiveRole(r.id as UserRole)}
            className={`px-3.5 py-2 rounded-lg font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeRole === r.id
                ? 'bg-white dark:bg-slate-900 text-teal-700 dark:text-teal-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {r.icon}
            <span>{r.label}</span>
          </button>
        ))}
      </div>

      {/* ROLE 1: LEARNERS PORTAL OVERVIEW */}
      {activeRole === 'learner' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-5">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Student Learning Portal & Personalized Portfolio
            </h3>
            <p className="text-xs text-slate-500">
              Personalized grade dashboard, bilingual curriculum, and offline access mode
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5">
              <span className="font-bold text-slate-900 dark:text-slate-100">Bilingual Mother-Tongue Learning</span>
              <p className="text-slate-600 dark:text-slate-400">
                Switch seamlessly between all 11 official South African languages at any point during lessons or lab exercises.
              </p>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5">
              <span className="font-bold text-slate-900 dark:text-slate-100">Zero Data Waste Mode</span>
              <p className="text-slate-600 dark:text-slate-400">
                Lightweight text and compressed vector visualizers designed for South African mobile data conditions.
              </p>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5">
              <span className="font-bold text-slate-900 dark:text-slate-100">Certified Matric Credentials</span>
              <p className="text-slate-600 dark:text-slate-400">
                Build an authenticated GitHub/PDF capstone portfolio verifying AI, prompt engineering, and Python skills.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ROLE 2: TEACHERS PORTAL */}
      {activeRole === 'teacher' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-5">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3 flex justify-between items-center">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Educator Lesson Planning & CAPS Alignment Engine
              </h3>
              <p className="text-xs text-slate-500">
                Generate CAPS lesson plans and homework exercises in any South African language
              </p>
            </div>
            <button
              type="button"
              onClick={handleGenerateDataPack}
              className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-all flex items-center gap-1.5"
            >
              {isDataPackGenerated ? <Check className="w-3.5 h-3.5" /> : <Download className="w-3.5 h-3.5" />}
              <span>{isDataPackGenerated ? 'Lesson Plan Downloaded!' : 'Export Grade CAPS Plan (PDF)'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="font-bold text-slate-900 dark:text-slate-100">
                Automated South African Language Worksheet Generator:
              </span>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Creates printable coding and AI worksheets in isiZulu, Sesotho, Afrikaans, and English with step-by-step
                solutions for learners without home computers.
              </p>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="font-bold text-slate-900 dark:text-slate-100">
                Early Intervention Diagnostic Flags:
              </span>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Highlights learners struggling with specific algorithmic concepts (e.g. while-loops or vector distance)
                before term exams.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ROLE 3: PARENTS & GUARDIANS */}
      {activeRole === 'parent' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-5">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Parent & Guardian Portal: Child Safety & Progress
              </h3>
              <p className="text-xs text-slate-500">
                Monitor learning progress, POPIA data protections, and view reports in your home language
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500">Report Language:</span>
              <select
                value={parentReportLanguage}
                onChange={(e) => setParentReportLanguage(e.target.value as SouthAfricanLanguageCode)}
                className="px-2.5 py-1 text-xs bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 font-semibold"
              >
                {SA_LANGUAGES.map((l) => (
                  <option key={l.code} value={l.code}>
                    {l.nativeName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-300 dark:border-emerald-800 space-y-2 text-xs">
            <div className="flex items-center gap-2 font-bold text-emerald-900 dark:text-emerald-200">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              POPIA Certified Learner Safety Shield
            </div>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              FUNDAI operates under strict South African POPIA (Protection of Personal Information Act) standards. No
              child voice recordings, biometric faces, or residential locations are shared or sold to commercial AI
              vendors.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
              <span className="text-slate-500 block">Weekly Study Time</span>
              <span className="text-xl font-bold font-mono text-indigo-600 dark:text-indigo-400">4.5 Hours</span>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
              <span className="text-slate-500 block">Current Focus Module</span>
              <span className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-1 block">M16: Machine Learning</span>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
              <span className="text-slate-500 block">Digital Safety Status</span>
              <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mt-1 block">100% Protected</span>
            </div>
          </div>
        </div>
      )}

      {/* ROLE 4: SCHOOL ADMINISTRATION */}
      {activeRole === 'school-admin' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-5">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              School Principal & IT Administration Portal
            </h3>
            <p className="text-xs text-slate-500">
              Computer lab schedules, device allocations, and offline server synchronization
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="font-bold text-slate-900 dark:text-slate-100">
                Offline Local Server Hub (Kiwix / Docker Pack):
              </span>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                For schools with intermittent internet or load shedding constraints, the entire FUNDAI curriculum,
                code exercises, and offline models run locally on a Raspberry Pi or school desktop server.
              </p>
              <button
                type="button"
                onClick={handleGenerateDataPack}
                className="mt-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold"
              >
                Sync Offline School Lab Cache
              </button>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="font-bold text-slate-900 dark:text-slate-100">
                Device Allocation & Load-Shedding Battery Modes:
              </span>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Track 42 school tablets and 28 computer lab desktops. Automatically toggles dark mode and low-CPU
                render settings when UPS battery power is detected.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ROLE 5: SUPER ADMIN / PROVINCIAL DBE */}
      {activeRole === 'super-admin' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-5">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              National & Provincial Department of Basic Education (DBE) Hub
            </h3>
            <p className="text-xs text-slate-500">
              Aggregated AI literacy metrics across all 9 provinces
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
              <span className="text-slate-500">Participating Schools</span>
              <div className="text-xl font-bold font-mono text-slate-900 dark:text-slate-100 mt-0.5">384</div>
              <span className="text-[10px] text-emerald-600 font-semibold">+18% this term</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
              <span className="text-slate-500">Active Learners</span>
              <div className="text-xl font-bold font-mono text-indigo-600 dark:text-indigo-400 mt-0.5">48,290</div>
              <span className="text-[10px] text-slate-400">Grades 4 through 12</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
              <span className="text-slate-500">Languages Used</span>
              <div className="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-0.5">11 of 11</div>
              <span className="text-[10px] text-slate-400">All SA Official</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
              <span className="text-slate-500">Capstones Deployed</span>
              <div className="text-xl font-bold font-mono text-purple-600 dark:text-purple-400 mt-0.5">2,140</div>
              <span className="text-[10px] text-slate-400">Real-World SA Solutions</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
