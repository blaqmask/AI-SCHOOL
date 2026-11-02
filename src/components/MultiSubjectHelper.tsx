import React, { useState } from 'react';
import { GradeLevel, SouthAfricanLanguageCode, SubjectTrack } from '../types';
import { SA_LANGUAGES } from '../data/saLanguages';
import { BookOpen, Calculator, Atom, Dna, Cpu, Briefcase, Sparkles, Send, CheckCircle2, RefreshCw } from 'lucide-react';

interface MultiSubjectHelperProps {
  grade: GradeLevel;
  language: SouthAfricanLanguageCode;
  onOpenTutor: (subject: SubjectTrack, question?: string) => void;
}

interface SubjectCard {
  id: SubjectTrack;
  name: string;
  icon: React.ReactNode;
  capsTitle: string;
  description: string;
  keyTopics: string[];
  sampleQuestions: string[];
}

export const MultiSubjectHelper: React.FC<MultiSubjectHelperProps> = ({
  grade,
  language,
  onOpenTutor,
}) => {
  const [selectedSubject, setSelectedSubject] = useState<SubjectTrack>('mathematics');
  const [customQuestion, setCustomQuestion] = useState('');
  const [isSolving, setIsSolving] = useState(false);
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);

  const currentLangObj = SA_LANGUAGES.find((l) => l.code === language) || SA_LANGUAGES[0];

  const subjects: SubjectCard[] = [
    {
      id: 'mathematics',
      name: currentLangObj.dictionary.mathematics || 'Mathematics',
      icon: <Calculator className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
      capsTitle: `CAPS Mathematics (Grade ${grade})`,
      description: 'Master algebra, geometric proofs, probability distributions, functions, and financial math.',
      keyTopics: ['Algebraic Equations', 'Quadratic Formulas & Graphs', 'Probability & Statistics', 'Financial Mathematics'],
      sampleQuestions: [
        'How do I solve quadratic equations using the quadratic formula: x = (-b ± √(b² - 4ac)) / 2a?',
        'Explain the difference between simple interest and compound interest for a South African savings account.',
        'How is probability used by AI algorithms to make predictions?',
      ],
    },
    {
      id: 'physical-sciences',
      name: currentLangObj.dictionary.science || 'Physical Sciences',
      icon: <Atom className="w-5 h-5 text-sky-600 dark:text-sky-400" />,
      capsTitle: `CAPS Physical Sciences (Grade ${grade})`,
      description: 'Newtonian mechanics, electricity and circuits, chemical bonding, optics, and solar physics.',
      keyTopics: ["Ohm's Law & Circuit Resistance", "Newton's 3 Laws of Motion", 'Chemical Stoichiometry', 'Electromagnetic Spectrum'],
      sampleQuestions: [
        "Explain Ohm's Law (V = I·R) with a practical household battery circuit example.",
        'How does Newton’s Second Law (F_net = m·a) apply to stopping an autonomous electric car?',
        'How do silicon photovoltaic solar panels convert sunlight into direct current electricity?',
      ],
    },
    {
      id: 'life-sciences',
      name: 'Life Sciences & Biology',
      icon: <Dna className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
      capsTitle: `CAPS Life Sciences (Grade ${grade})`,
      description: 'Genetics, cellular respiration, human endocrine regulation, and indigenous South African ecosystems.',
      keyTopics: ['DNA Replication & Mutations', 'Photosynthesis Light Phase', 'Biodiversity & Conservation', 'Human Endocrine System'],
      sampleQuestions: [
        'Explain the light-dependent phase of photosynthesis in thylakoid membranes.',
        'How can machine learning models predict which crop strains will resist African drought?',
        'What is DNA transcription and how does mRNA carry genetic code to ribosomes?',
      ],
    },
    {
      id: 'coding-robotics',
      name: 'Coding & Robotics (DBE CAPS)',
      icon: <Cpu className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
      capsTitle: `DBE CAPS Coding & Robotics (Grade ${grade})`,
      description: 'Microcontrollers, sensor inputs (ultrasonic, LDR, soil moisture), algorithms, and Python syntax.',
      keyTopics: ['Microcontroller Pinouts', 'Ultrasonic Distance Detection', 'Python Data Lists & Loops', 'Logic Gates (AND, OR, NOT)'],
      sampleQuestions: [
        'How do I connect an ultrasonic sensor to a micro:bit or Raspberry Pi to avoid obstacles?',
        'Write a simple Python script to read soil moisture sensor data and sound an irrigation buzzer.',
        'Explain how logic gates combine in automated greenhouse ventilators.',
      ],
    },
    {
      id: 'ems-business',
      name: 'EMS, Business & Fintech',
      icon: <Briefcase className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
      capsTitle: `CAPS EMS & Business Studies (Grade ${grade})`,
      description: 'Township entrepreneurship, financial accounting, mobile money algorithms, and POPIA data protection.',
      keyTopics: ['Entrepreneurial Venture Plans', 'Financial Records & Balance Sheets', 'Fintech & Spaza Digitization', 'POPIA Law & Consumer Rights'],
      sampleQuestions: [
        'How can a township spaza shop use a mobile phone AI inventory scanner to reduce stock waste?',
        'Explain the break-even point formula for a student-run technology startup.',
        'Why does South Africa’s POPIA law protect customer phone numbers from unauthorized marketing?',
      ],
    },
  ];

  const activeSub = subjects.find((s) => s.id === selectedSubject) || subjects[0];

  const handleSolveQuestion = async (q: string) => {
    setIsSolving(true);
    setAiExplanation(null);
    try {
      const res = await fetch('/api/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: q,
          grade,
          topic: activeSub.name,
          language,
          subject: selectedSubject,
        }),
      });
      const data = await res.json();
      setAiExplanation(data.reply);
    } catch {
      setAiExplanation(
        `Here is a step-by-step explanation for your ${activeSub.name} question in ${currentLangObj.name}: Break the problem into known values, state the relevant formula, substitute variables carefully, and check your final units!`
      );
    } finally {
      setIsSolving(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 tracking-wide uppercase">
            <span>South African CAPS Multi-Subject Digital Study Hub</span>
            <span aria-hidden="true">·</span>
            <span>Study in {currentLangObj.nativeName}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Learn Any Subject in Your Mother Tongue with AI
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
            FUNDAI does not stop at AI theory. It accelerates your mastery across Mathematics, Sciences, Coding &
            Robotics, and Business in all 11 official South African languages, empowering you for university entry and
            high-paying digital jobs.
          </p>
        </div>
      </div>

      {/* Subject Selector Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {subjects.map((s) => {
          const isSelected = selectedSubject === s.id;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => {
                setSelectedSubject(s.id);
                setAiExplanation(null);
              }}
              className={`p-4 rounded-xl border text-left transition-all ${
                isSelected
                  ? 'bg-white dark:bg-slate-900 border-indigo-600 dark:border-indigo-500 shadow-md ring-1 ring-indigo-500'
                  : 'bg-white/80 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 hover:border-slate-300'
              }`}
            >
              <div className="mb-2">{s.icon}</div>
              <div className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate">
                {s.name}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5 truncate">
                Grade {grade} CAPS
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Subject Study Deck Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Topics & Sample Inquiries (7 Cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                {activeSub.capsTitle}
              </h3>
              <p className="text-xs text-slate-500">{activeSub.description}</p>
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
              {currentLangObj.code.toUpperCase()}
            </span>
          </div>

          {/* Key Topics Badges */}
          <div className="space-y-1.5">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
              Core CAPS Syllabus Focus Areas:
            </span>
            <div className="flex flex-wrap gap-2">
              {activeSub.keyTopics.map((top, i) => (
                <span
                  key={i}
                  className="text-xs px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg border border-slate-200 dark:border-slate-700"
                >
                  {top}
                </span>
              ))}
            </div>
          </div>

          {/* Preset Questions for Socratic Help */}
          <div className="space-y-2.5">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
              Quick Concept Explanations (Click to Ask in {currentLangObj.nativeName}):
            </span>
            <div className="space-y-2">
              {activeSub.sampleQuestions.map((q, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSolveQuestion(q)}
                  className="w-full text-left p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 hover:bg-indigo-50/60 dark:hover:bg-indigo-950/40 hover:border-indigo-300 text-xs text-slate-800 dark:text-slate-200 transition-colors flex items-center justify-between gap-2"
                >
                  <span>{q}</span>
                  <Sparkles className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                </button>
              ))}
            </div>
          </div>

          {/* Custom Question Input */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
              Or Ask Your Own Homework Problem:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={customQuestion}
                onChange={(e) => setCustomQuestion(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && customQuestion.trim() && handleSolveQuestion(customQuestion)}
                placeholder={`Ask any ${activeSub.name} question in ${currentLangObj.name} or English...`}
                className="flex-1 px-3 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="button"
                disabled={!customQuestion.trim() || isSolving}
                onClick={() => handleSolveQuestion(customQuestion)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-all disabled:opacity-40 flex items-center gap-1.5 shrink-0"
              >
                {isSolving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                <span>Solve</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: AI Socratic Explanation Deck (5 Cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-5 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                Fundi Socratic Study Coach
              </h4>
              <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                {currentLangObj.nativeName}
              </span>
            </div>

            {isSolving ? (
              <div className="py-12 text-center space-y-3">
                <RefreshCw className="w-8 h-8 text-indigo-600 animate-spin mx-auto" />
                <p className="text-xs text-slate-500">
                  Formulating step-by-step guidance in {currentLangObj.name}...
                </p>
              </div>
            ) : aiExplanation ? (
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-wrap font-sans max-h-[380px] overflow-y-auto">
                {aiExplanation}
              </div>
            ) : (
              <div className="py-10 text-center space-y-2 text-slate-400">
                <BookOpen className="w-8 h-8 mx-auto opacity-50" />
                <p className="text-xs max-w-xs mx-auto">
                  Select a question on the left or type your own homework problem to receive step-by-step Socratic
                  guidance in {currentLangObj.name}.
                </p>
              </div>
            )}
          </div>

          {/* Bilingual Study Vocabulary */}
          <div className="p-3 bg-indigo-50/70 dark:bg-indigo-950/30 rounded-xl border border-indigo-200 dark:border-indigo-800/60 text-xs space-y-1">
            <span className="font-bold text-indigo-900 dark:text-indigo-200 block">
              Bilingual CAPS Vocabulary ({currentLangObj.name}):
            </span>
            <div className="grid grid-cols-2 gap-1 text-[11px] text-slate-700 dark:text-slate-300">
              <div>• {currentLangObj.dictionary.mathematics} (Maths)</div>
              <div>• {currentLangObj.dictionary.science} (Sciences)</div>
              <div>• {currentLangObj.dictionary.algorithm} (Algorithm)</div>
              <div>• {currentLangObj.dictionary.code} (Code)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
