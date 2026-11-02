import React, { useState } from 'react';
import { GradeLevel } from '../types';
import { Sparkles, ArrowRight, CheckCircle2, AlertTriangle, RefreshCw, Layers, Copy, Check } from 'lucide-react';

interface PromptStudioLabProps {
  grade: GradeLevel;
}

export const PromptStudioLab: React.FC<PromptStudioLabProps> = ({ grade }) => {
  const [role, setRole] = useState(grade <= 6 ? 'Helpful Science Teacher' : 'Senior Machine Learning Scientist');
  const [task, setTask] = useState(
    grade <= 6
      ? 'Explain why leaves change color in autumn'
      : 'Explain how attention mechanisms in Transformers calculate token weights'
  );
  const [context, setContext] = useState(
    grade <= 6 ? 'For a 5th grade school science fair poster' : 'For a high school robotics engineering presentation'
  );
  const [constraints, setConstraints] = useState(
    grade <= 6 ? 'Use 3 short bullet points and one kitchen analogy' : 'Include mathematical formula intuition and maximum 150 words'
  );
  const [copied, setCopied] = useState(false);

  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluation, setEvaluation] = useState<{
    clarityScore: number;
    contextScore: number;
    constraintsScore: number;
    safetyScore: number;
    overallScore: number;
    strengths: string[];
    improvements: string[];
    superchargedPrompt: string;
  } | null>(null);

  const [activeOutputTab, setActiveOutputTab] = useState<'engineered' | 'basic'>('engineered');

  const assembledPrompt = `Act as: ${role}.\nTask: ${task}.\nTarget Context: ${context}.\nRules & Constraints: ${constraints}.`;

  const handleEvaluate = async () => {
    setIsEvaluating(true);
    try {
      const res = await fetch('/api/evaluate-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: assembledPrompt,
          grade,
          targetTask: task,
        }),
      });
      const data = await res.json();
      if (data.evaluation) {
        setEvaluation(data.evaluation);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsEvaluating(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 text-white p-6 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-3">
            <div className="text-xs font-semibold text-indigo-300 tracking-wide uppercase">
              Interactive Lab · Stage 2 & 3 Prompt Engineering
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Prompt Engineering Studio & AI Coach
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
              Artificial intelligence cannot read your mind. Build modular, high-impact prompts by separating
              Role, Task, Context, and Constraints. Watch real-time AI scoring and compare outputs.
            </p>
          </div>
          <div className="lg:col-span-4 flex justify-center">
            <img
              src="/src/assets/images/lab_prompt_engineering_creative_1793574217665.jpg"
              alt="Prompt engineering modular blocks"
              referrerPolicy="no-referrer"
              className="w-full max-w-[280px] h-44 object-cover rounded-xl shadow-lg border border-indigo-500/30"
            />
          </div>
        </div>
      </div>

      {/* Main Interactive Studio Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Modular Block Builder */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                1. Modular Prompt Blocks
              </h3>
              <p className="text-xs text-slate-500">Tune each block to assemble a high-precision prompt</p>
            </div>
            <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium bg-indigo-50 dark:bg-indigo-950/50 px-2.5 py-1 rounded-md">
              Grade {grade} Mode
            </span>
          </div>

          {/* Block 1: Role */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-orange-500" />
              Role & Persona (Who is speaking?)
            </label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g. Friendly NASA astrophysicist"
            />
          </div>

          {/* Block 2: Task */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              Core Task (What is the explicit mission?)
            </label>
            <textarea
              rows={2}
              value={task}
              onChange={(e) => setTask(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g. Explain photosynthesis"
            />
          </div>

          {/* Block 3: Context */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Audience & Context (Why and for whom?)
            </label>
            <input
              type="text"
              value={context}
              onChange={(e) => setContext(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g. For a middle school science project"
            />
          </div>

          {/* Block 4: Constraints */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-purple-500" />
              Output Constraints & Format (Length, tone, rules)
            </label>
            <input
              type="text"
              value={constraints}
              onChange={(e) => setConstraints(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g. 3 bullet points, no jargon, max 120 words"
            />
          </div>

          {/* Preset Buttons */}
          <div className="pt-2">
            <span className="text-xs text-slate-400 block mb-2 font-medium">Quick Challenge Presets:</span>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => {
                  setRole('Playful Robotics Guide');
                  setTask('Explain how self-driving cars detect red lights');
                  setContext('Classroom presentation for 5th graders');
                  setConstraints('Include 1 traffic light analogy and 2 questions to ask the audience');
                }}
                className="text-xs px-2.5 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-md transition-colors"
              >
                Self-Driving Vision (Grades 4–6)
              </button>
              <button
                type="button"
                onClick={() => {
                  setRole('AI Ethics Investigator');
                  setTask('Analyze potential bias in face-recognition security cameras');
                  setContext('High school civics and tech debate');
                  setConstraints('Provide 2 distinct stakeholder perspectives and 1 mitigation policy');
                }}
                className="text-xs px-2.5 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-md transition-colors"
              >
                Ethics & Bias (Grades 8–10)
              </button>
              <button
                type="button"
                onClick={() => {
                  setRole('Senior NLP Systems Architect');
                  setTask('Design an architecture for grounding a customer service bot with RAG');
                  setContext('Technical engineering capstone proposal');
                  setConstraints('Specify vector database choice, chunking strategy, and latency budget');
                }}
                className="text-xs px-2.5 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-md transition-colors"
              >
                RAG Architecture (Grades 11–12)
              </button>
            </div>
          </div>

          {/* Assemble & Evaluate CTA */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row gap-3 items-center justify-between">
            <button
              type="button"
              onClick={handleEvaluate}
              disabled={isEvaluating}
              className="w-full sm:w-auto px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isEvaluating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Evaluating with AI Coach...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Evaluate & Supercharge Prompt
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => copyToClipboard(assembledPrompt)}
              className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-1.5 py-1"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied assembled prompt!' : 'Copy full prompt'}
            </button>
          </div>
        </div>

        {/* Right Column: AI Diagnostic & Output Comparison */}
        <div className="lg:col-span-6 space-y-6">
          {/* Assembled Prompt Live Box */}
          <div className="bg-slate-900 text-slate-100 rounded-2xl p-5 border border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold text-indigo-400 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                Assembled Composite Prompt
              </span>
              <span>{assembledPrompt.length} chars</span>
            </div>
            <pre className="text-xs sm:text-sm font-mono text-slate-300 whitespace-pre-wrap bg-slate-950/60 p-3.5 rounded-lg border border-slate-800/80 leading-relaxed overflow-x-auto">
              {assembledPrompt}
            </pre>
          </div>

          {/* Evaluation Results Deck */}
          {evaluation ? (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  AI Coach Diagnostics & Rubric
                </h4>
                <div className="text-right">
                  <span className="text-xs text-slate-500">Overall Score</span>
                  <div className="text-xl font-bold font-mono text-indigo-600 dark:text-indigo-400">
                    {evaluation.overallScore}/100
                  </div>
                </div>
              </div>

              {/* 4 Score Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-center">
                  <div className="text-xs text-slate-500">Clarity</div>
                  <div className="text-base font-bold font-mono text-slate-900 dark:text-slate-100">
                    {evaluation.clarityScore}%
                  </div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-center">
                  <div className="text-xs text-slate-500">Context</div>
                  <div className="text-base font-bold font-mono text-slate-900 dark:text-slate-100">
                    {evaluation.contextScore}%
                  </div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-center">
                  <div className="text-xs text-slate-500">Constraints</div>
                  <div className="text-base font-bold font-mono text-slate-900 dark:text-slate-100">
                    {evaluation.constraintsScore}%
                  </div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-center">
                  <div className="text-xs text-slate-500">Safety & Ethics</div>
                  <div className="text-base font-bold font-mono text-emerald-600 dark:text-emerald-400">
                    {evaluation.safetyScore}%
                  </div>
                </div>
              </div>

              {/* Strengths & Improvements */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1.5 bg-emerald-50/60 dark:bg-emerald-950/20 p-3 rounded-lg border border-emerald-200 dark:border-emerald-800/60">
                  <span className="font-semibold text-emerald-800 dark:text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> What You Did Well
                  </span>
                  <ul className="space-y-1 text-slate-700 dark:text-slate-300">
                    {evaluation.strengths.map((str, idx) => (
                      <li key={idx}>· {str}</li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-1.5 bg-amber-50/60 dark:bg-amber-950/20 p-3 rounded-lg border border-amber-200 dark:border-amber-800/60">
                  <span className="font-semibold text-amber-800 dark:text-amber-400 flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" /> Opportunities to Improve
                  </span>
                  <ul className="space-y-1 text-slate-700 dark:text-slate-300">
                    {evaluation.improvements.map((imp, idx) => (
                      <li key={idx}>· {imp}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Supercharged Prompt Suggestion */}
              <div className="bg-indigo-50/70 dark:bg-indigo-950/30 p-4 rounded-xl border border-indigo-200 dark:border-indigo-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-indigo-900 dark:text-indigo-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-600" /> Supercharged Prompt Recommendation
                  </span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(evaluation.superchargedPrompt)}
                    className="text-xs text-indigo-700 dark:text-indigo-300 font-medium hover:underline flex items-center gap-1"
                  >
                    <Copy className="w-3 h-3" /> Copy
                  </button>
                </div>
                <p className="text-xs font-mono text-slate-800 dark:text-slate-200 whitespace-pre-wrap leading-relaxed">
                  {evaluation.superchargedPrompt}
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-slate-50 dark:bg-slate-900/60 border border-dashed border-slate-300 dark:border-slate-800 rounded-2xl p-8 text-center space-y-3">
              <Sparkles className="w-8 h-8 text-indigo-500 mx-auto opacity-70" />
              <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                Ready for AI Coach Analysis
              </h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Click "Evaluate & Supercharge Prompt" above to run the FUNDAI evaluation engine powered by Gemini
                3.8 Flash. You'll get rubric scores and instant tips!
              </p>
            </div>
          )}

          {/* Side-by-Side Comparison: Basic Prompt vs Engineered Prompt */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Simulated Output Comparison
              </h4>
              <div className="flex items-center gap-1 p-0.5 bg-slate-100 dark:bg-slate-800 rounded-lg">
                <button
                  type="button"
                  onClick={() => setActiveOutputTab('engineered')}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                    activeOutputTab === 'engineered'
                      ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Engineered Output
                </button>
                <button
                  type="button"
                  onClick={() => setActiveOutputTab('basic')}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                    activeOutputTab === 'basic'
                      ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Unengineered ("Lazy") Prompt
                </button>
              </div>
            </div>

            {activeOutputTab === 'engineered' ? (
              <div className="space-y-2 text-xs leading-relaxed text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="font-semibold text-indigo-700 dark:text-indigo-400">
                  Target: {task} (Tailored for Grade {grade})
                </div>
                <p>
                  <strong>1. The Chlorophyll Shutdown:</strong> During spring and summer, trees use a chemical called
                  chlorophyll to soak up sunlight like solar panels. Because chlorophyll is bright green, it hides all
                  the other pigments inside the leaf.
                </p>
                <p>
                  <strong>2. Revealing Hidden Colors:</strong> As daylight hours shorten in autumn, the tree stops
                  producing chlorophyll. With the green gone, golden carotenoids (like in carrots) and anthocyanins (like
                  in blueberries) suddenly shine through!
                </p>
                <p>
                  <strong>3. The Winter Armor:</strong> Dropping leaves seals moisture inside the trunk, protecting the
                  tree from freezing during winter storms.
                </p>
                <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-200 dark:border-slate-700">
                  Kitchen Analogy: Imagine frosting a chocolate brownie with thick green icing. As soon as you scrape
                  off the green frosting, the delicious golden chocolate underneath is revealed!
                </div>
              </div>
            ) : (
              <div className="space-y-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400 bg-amber-50/40 dark:bg-amber-950/20 p-4 rounded-xl border border-amber-200 dark:border-amber-900/40">
                <div className="text-amber-800 dark:text-amber-400 font-medium">
                  Result of typing only "leaves changing colors":
                </div>
                <p>
                  Leaves change color because of various biochemical processes occurring in deciduous flora. As the
                  photoperiod decreases and temperatures decline, abscission layers form at the petiole base, preventing
                  vascular transport of xylem and phloem fluids. Consequently, anthocyanins and flavonoids exhibit
                  spectral shifts under atmospheric UV...
                </p>
                <div className="text-[11px] text-amber-700 dark:text-amber-400 font-medium">
                  Notice: Dense, impenetrable college vocabulary, zero formatting, no analogies, and unsuitable for
                  the requested student audience!
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
