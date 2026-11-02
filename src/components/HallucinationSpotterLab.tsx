import React, { useState } from 'react';
import { GradeLevel } from '../types';
import { ShieldCheck, AlertOctagon, Search, CheckCircle, HelpCircle, RefreshCw, Award } from 'lucide-react';

interface HallucinationSpotterLabProps {
  grade: GradeLevel;
}

interface FactScenario {
  id: string;
  topic: string;
  statement: string;
  isHallucination: boolean;
  trapExplanation: string;
  primarySources: string[];
}

const PRESET_SCENARIOS: FactScenario[] = [
  {
    id: 's-1',
    topic: 'Space Exploration',
    statement:
      'In 1984, the European Space Agency launched the Kepler-7 telescope, which discovered water vapor in the atmosphere of Proxima Centauri b during its second orbital pass.',
    isHallucination: true,
    trapExplanation:
      'Proxima Centauri b was not discovered until 2016 (by ESO, not in 1984!). Furthermore, Kepler was a NASA mission launched in 2009, not ESA in 1984.',
    primarySources: ['NASA Kepler Mission Archives', 'European Southern Observatory (ESO) 2016 Announcement'],
  },
  {
    id: 's-2',
    topic: 'Biology & Photosynthesis',
    statement:
      'Photosystem II in green plants absorbs photons around 680 nanometers wavelength, using the energy to split water molecules into oxygen gas, protons, and electrons.',
    isHallucination: false,
    trapExplanation:
      'This is 100% verified scientific fact. Photosystem II is indeed known as P680 and splits H2O via photolysis.',
    primarySources: ['NCBI Biochemistry Archives', 'Campbell Biology 12th Ed.'],
  },
  {
    id: 's-3',
    topic: 'Computer Science History',
    statement:
      'Ada Lovelace wrote the world\'s first computer program for Charles Babbage\'s Analytical Engine in 1843, specifically an algorithm to compute Bernoulli numbers.',
    isHallucination: false,
    trapExplanation:
      'Accurate historical fact. Ada Lovelace published Note G in 1843 containing the Bernoulli number algorithm, making her the first recognized programmer.',
    primarySources: ['British Library Historical Archives', 'Scientific Memoirs (Richard Taylor, 1843)'],
  },
  {
    id: 's-4',
    topic: 'AI Architecture & Citations',
    statement:
      'According to Professor Jonathan Sterling\'s famous 2019 Stanford paper "Dynamic Entropy Bounds in Dense LLMs", transformers can achieve zero latency by eliminating softmax normalization layers completely.',
    isHallucination: true,
    trapExplanation:
      'Complete hallucination! "Jonathan Sterling" did not publish this paper; the title and paper were fabricated by an LLM guessing plausible academic jargon.',
    primarySources: ['Stanford AI Lab Index', 'ArXiv Computer Science Repository'],
  },
];

export const HallucinationSpotterLab: React.FC<HallucinationSpotterLabProps> = ({ grade }) => {
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState(0);
  const [userGuesses, setUserGuesses] = useState<Record<string, boolean>>({});
  const [revealedResults, setRevealedResults] = useState<Record<string, boolean>>({});
  const [customStatement, setCustomStatement] = useState('');
  const [customAnalysis, setCustomAnalysis] = useState<any>(null);
  const [isAnalyzingCustom, setIsAnalyzingCustom] = useState(false);

  const currentScenario = PRESET_SCENARIOS[selectedScenarioIndex];

  const handleGuess = (isHallucination: boolean) => {
    setUserGuesses((prev) => ({ ...prev, [currentScenario.id]: isHallucination }));
    setRevealedResults((prev) => ({ ...prev, [currentScenario.id]: true }));
  };

  const scoreCount = Object.keys(revealedResults).filter((id) => {
    const sc = PRESET_SCENARIOS.find((s) => s.id === id);
    return sc && userGuesses[id] === sc.isHallucination;
  }).length;

  const handleCustomCheck = async () => {
    if (!customStatement.trim()) return;
    setIsAnalyzingCustom(true);
    try {
      const res = await fetch('/api/hallucination-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ statement: customStatement, grade }),
      });
      const data = await res.json();
      setCustomAnalysis(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsAnalyzingCustom(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-950 via-slate-900 to-amber-900 text-white p-6 sm:p-8">
        <div className="space-y-3">
          <div className="text-xs font-semibold text-amber-400 tracking-wide uppercase">
            Critical Thinking Lab · Stage 2 & 4 Information Integrity
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            AI Misinformation & Hallucination Spotter Lab
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
            Large Language Models are prediction engines, not truth repositories. Step into the shoes of an AI
            Fact-Checking Detective: inspect claims, cross-examine dates and citations, and master the primary source
            triangulation rule!
          </p>
        </div>
      </div>

      {/* Detective Game Deck */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Detective Scenario (7 Columns) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                Case #{selectedScenarioIndex + 1} of {PRESET_SCENARIOS.length}
              </span>
              <span className="text-xs text-slate-500">{currentScenario.topic}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-xs font-medium text-slate-500">Detective Score:</span>
              <span className="text-xs font-bold font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
                {scoreCount}/{PRESET_SCENARIOS.length}
              </span>
            </div>
          </div>

          {/* Statement Under Cross-Examination */}
          <div className="space-y-3">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              AI Generated Statement Under Review:
            </label>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-sm sm:text-base text-slate-800 dark:text-slate-200 leading-relaxed font-serif">
              "{currentScenario.statement}"
            </div>
          </div>

          {/* Decision Buttons */}
          {!revealedResults[currentScenario.id] ? (
            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 block">
                What is your detective verdict?
              </span>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => handleGuess(false)}
                  className="py-3 px-4 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 text-emerald-800 dark:text-emerald-300 font-semibold text-sm rounded-xl border border-emerald-300 dark:border-emerald-800 flex items-center justify-center gap-2 transition-colors"
                >
                  <CheckCircle className="w-4 h-4" />
                  Verified Ground Truth
                </button>
                <button
                  type="button"
                  onClick={() => handleGuess(true)}
                  className="py-3 px-4 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 text-rose-800 dark:text-rose-300 font-semibold text-sm rounded-xl border border-rose-300 dark:border-rose-800 flex items-center justify-center gap-2 transition-colors"
                >
                  <AlertOctagon className="w-4 h-4" />
                  Hallucination Detected!
                </button>
              </div>
            </div>
          ) : (
            /* Revealed Analysis */
            <div className="space-y-4 pt-2">
              <div
                className={`p-4 rounded-xl border ${
                  userGuesses[currentScenario.id] === currentScenario.isHallucination
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                    : 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-sm mb-1.5">
                  {userGuesses[currentScenario.id] === currentScenario.isHallucination ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      Brilliant Detective Work! You nailed it.
                    </>
                  ) : (
                    <>
                      <AlertOctagon className="w-4 h-4 text-rose-600" />
                      Deceived by plausible syntax!
                    </>
                  )}
                </div>
                <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                  {currentScenario.trapExplanation}
                </p>
              </div>

              {/* Primary Sources */}
              <div className="text-xs space-y-1.5 bg-slate-50 dark:bg-slate-800/40 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  Authoritative Primary Sources for Triangulation:
                </span>
                <ul className="space-y-1 text-slate-500">
                  {currentScenario.primarySources.map((src, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <Search className="w-3 h-3 text-indigo-500" /> {src}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Next Case Button */}
              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() =>
                    setSelectedScenarioIndex((prev) => (prev + 1) % PRESET_SCENARIOS.length)
                  }
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
                >
                  Next Investigation Case →
                </button>
              </div>
            </div>
          )}

          {/* Scenario Tabs */}
          <div className="flex items-center gap-2 pt-4 border-t border-slate-100 dark:border-slate-800 overflow-x-auto">
            {PRESET_SCENARIOS.map((sc, idx) => (
              <button
                key={sc.id}
                type="button"
                onClick={() => setSelectedScenarioIndex(idx)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                  selectedScenarioIndex === idx
                    ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                Case {idx + 1}: {sc.topic}
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Custom Hallucination Inspector (5 Columns) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-5">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Search className="w-4 h-4 text-amber-600" />
              Live AI Claim Inspector
            </h3>
            <p className="text-xs text-slate-500">
              Paste any text or AI generated answer to evaluate for hallucination markers
            </p>
          </div>

          <div className="space-y-2">
            <textarea
              rows={4}
              value={customStatement}
              onChange={(e) => setCustomStatement(e.target.value)}
              placeholder="e.g. Marie Curie won the Nobel Prize in Literature in 1928 for her poetic essays on radium..."
              className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <button
              type="button"
              onClick={handleCustomCheck}
              disabled={isAnalyzingCustom || !customStatement.trim()}
              className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isAnalyzingCustom ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  Cross-Checking with Primary Sources...
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  Analyze for Hallucination Risk
                </>
              )}
            </button>
          </div>

          {customAnalysis && (
            <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span
                  className={`font-bold px-2 py-0.5 rounded ${
                    customAnalysis.isHallucination
                      ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                      : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                  }`}
                >
                  {customAnalysis.isHallucination ? 'High Hallucination Probability' : 'Factually Consistent'}
                </span>
                <span className="font-mono text-slate-500">
                  Confidence: {customAnalysis.confidence}%
                </span>
              </div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                {customAnalysis.analysis}
              </p>
              <div className="pt-2 border-t border-slate-200 dark:border-slate-700 text-slate-500">
                <span className="font-semibold text-slate-700 dark:text-slate-300 block mb-0.5">
                  How to Verify:
                </span>
                {customAnalysis.verificationStrategy}
              </div>
            </div>
          )}

          {/* Badge Achievement */}
          {scoreCount >= 3 && (
            <div className="p-3.5 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl border border-indigo-200 dark:border-indigo-800 flex items-center gap-3">
              <Award className="w-8 h-8 text-amber-500 shrink-0" />
              <div>
                <h5 className="text-xs font-bold text-indigo-900 dark:text-indigo-200">
                  Badge Unlocked: Certified AI Fact-Checker
                </h5>
                <p className="text-[11px] text-indigo-700 dark:text-indigo-300">
                  You successfully caught multiple hallucinations across history, science, and AI citations!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
