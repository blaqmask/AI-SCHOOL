import React, { useState } from 'react';
import { GradeLevel, SouthAfricanLanguageCode } from '../types';
import { FUTURE_JOBS_SA } from '../data/futureJobsData';
import { SA_LANGUAGES } from '../data/saLanguages';
import { Briefcase, GraduationCap, TrendingUp, DollarSign, CheckCircle2, ChevronRight, Check } from 'lucide-react';

interface FutureCareersExplorerProps {
  grade: GradeLevel;
  language: SouthAfricanLanguageCode;
}

export const FutureCareersExplorer: React.FC<FutureCareersExplorerProps> = ({
  grade,
  language,
}) => {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([
    'Mathematics (CAPS)',
    'Coding & Robotics',
  ]);

  const allSchoolSubjects = [
    'Mathematics (CAPS)',
    'Technical Mathematics',
    'Physical Sciences',
    'Information Technology (IT)',
    'Coding & Robotics',
    'Agricultural Sciences',
    'Business Studies / EMS',
    'Accounting',
    'Life Sciences',
  ];

  const toggleSubject = (subj: string) => {
    setSelectedSubjects((prev) =>
      prev.includes(subj) ? prev.filter((s) => s !== subj) : [...prev, subj]
    );
  };

  const filteredJobs = FUTURE_JOBS_SA.filter((job) => {
    if (selectedIndustry === 'all') return true;
    return job.localIndustry.toLowerCase().includes(selectedIndustry.toLowerCase());
  });

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 text-white p-6 sm:p-8">
        <div className="space-y-3">
          <div className="text-xs font-semibold text-emerald-400 tracking-wide uppercase">
            Future of Work · South African Digital Qualifications Matrix
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Future High-Income Jobs That Will Require AI Qualifications
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
            In South Africa and across the world, tomorrow's highest-demand jobs require deep digital literacy,
            algorithmic problem solving, and AI skills. Discover what school subjects you need to take and how much
            these careers earn in South African Rand (ZAR).
          </p>
        </div>
      </div>

      {/* Subject Matcher Interactive Widget */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              CAPS High School Subject Matcher (Grade 10–12 Package)
            </h3>
            <p className="text-xs text-slate-500">
              Select your current or planned school subjects to see which future AI & digital careers you qualify for:
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950 px-2.5 py-1 rounded-md shrink-0">
            {selectedSubjects.length} Subjects Selected
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {allSchoolSubjects.map((subj) => {
            const isChecked = selectedSubjects.includes(subj);
            return (
              <button
                key={subj}
                type="button"
                onClick={() => toggleSubject(subj)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all flex items-center gap-1.5 ${
                  isChecked
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                }`}
              >
                {isChecked && <Check className="w-3.5 h-3.5" />}
                <span>{subj}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Industry Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 overflow-x-auto text-xs">
        {[
          { id: 'all', label: 'All Industries' },
          { id: 'agri', label: 'Smart Agriculture' },
          { id: 'fintech', label: 'Fintech & Banking' },
          { id: 'mining', label: 'Mining & Robotics' },
          { id: 'telecom', label: 'African Languages AI' },
          { id: 'security', label: 'Cybersecurity & POPIA' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setSelectedIndustry(tab.id)}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
              selectedIndustry === tab.id
                ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Career Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.map((job) => (
          <div
            key={job.id}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between space-y-4 hover:border-indigo-400 dark:hover:border-indigo-500 transition-all"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-mono">
                  <DollarSign className="w-3.5 h-3.5" />
                  {job.averageSalaryZAR}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    job.demandLevel === 'Critical Shortage'
                      ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                      : 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300'
                  }`}
                >
                  {job.demandLevel}
                </span>
              </div>

              <h4 className="text-base font-bold text-slate-900 dark:text-slate-100 leading-snug">
                {job.title}
              </h4>

              <div className="text-xs text-slate-500 font-medium">
                {job.localIndustry}
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {job.description}
              </p>

              {/* High School Requirements */}
              <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                <span className="font-bold text-slate-800 dark:text-slate-200 block">
                  Required High School Subjects:
                </span>
                <div className="flex flex-wrap gap-1">
                  {job.highSchoolSubjects.map((s: string, i: number) => (
                    <span
                      key={i}
                      className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded font-medium"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div className="space-y-1.5 text-xs">
                <span className="font-bold text-slate-800 dark:text-slate-200 block">
                  Core AI / Technical Skills:
                </span>
                <div className="flex flex-wrap gap-1">
                  {job.requiredSkills.map((sk: string, i: number) => (
                    <span
                      key={i}
                      className="text-[10px] bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 px-2 py-0.5 rounded font-medium"
                    >
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              {/* Qualification Route */}
              <div className="p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 text-[11px] text-slate-600 dark:text-slate-400">
                <span className="font-semibold text-slate-800 dark:text-slate-200 block mb-0.5">
                  South African Tertiary Route:
                </span>
                {job.qualificationRoute}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
