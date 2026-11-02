import React, { useState } from 'react';
import { GradeLevel } from '../types';
import { Database, Search, ArrowRight, BookOpen, Cpu, Sparkles, CheckCircle2 } from 'lucide-react';

interface RagPipelineVisualizerProps {
  grade: GradeLevel;
}

interface Chunk {
  id: string;
  sourceDoc: string;
  text: string;
  vector: [number, number]; // 2D projection for visualization
  similarity?: number;
}

const CORPUS_CHUNKS: Chunk[] = [
  {
    id: 'chunk-1',
    sourceDoc: 'Bio Textbook Vol 3 (Ch. 4)',
    text: 'Chloroplasts absorb photons through chlorophyll a and b pigments, driving electrons through the thylakoid membrane electron transport chain.',
    vector: [0.78, 0.82],
  },
  {
    id: 'chunk-2',
    sourceDoc: 'Bio Textbook Vol 3 (Ch. 4)',
    text: 'ATP synthase utilizes the proton gradient across the thylakoid lumen to generate adenosine triphosphate (ATP) and NADPH for carbon fixation.',
    vector: [0.72, 0.88],
  },
  {
    id: 'chunk-3',
    sourceDoc: 'Physics Manual (Ch. 9)',
    text: 'Photovoltaic silicon solar cells rely on the photoelectric effect where incident light dislodges valence electrons creating direct current.',
    vector: [0.15, 0.65],
  },
  {
    id: 'chunk-4',
    sourceDoc: 'World History (Ch. 14)',
    text: 'The Agricultural Revolution of the 18th century transformed European crop yields through the Norfolk four-course crop rotation system.',
    vector: [-0.65, -0.42],
  },
  {
    id: 'chunk-5',
    sourceDoc: 'Space Astronomy (Ch. 2)',
    text: 'The James Webb Space Telescope operates at the second Lagrange point (L2), nearly 1.5 million kilometers from Earth.',
    vector: [-0.85, 0.55],
  },
];

export const RagPipelineVisualizer: React.FC<RagPipelineVisualizerProps> = ({ grade }) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [query, setQuery] = useState('How do plant cells store light energy as chemical energy?');
  const [topK, setTopK] = useState(2);

  // Simulated query vector in 2D
  const queryVector: [number, number] = [0.75, 0.85];

  // Calculate Cosine Similarity in 2D
  const scoredChunks = CORPUS_CHUNKS.map((chunk) => {
    const dot = chunk.vector[0] * queryVector[0] + chunk.vector[1] * queryVector[1];
    const magA = Math.sqrt(chunk.vector[0] ** 2 + chunk.vector[1] ** 2);
    const magB = Math.sqrt(queryVector[0] ** 2 + queryVector[1] ** 2);
    const cosineSim = Math.max(0, dot / (magA * magB));
    return { ...chunk, similarity: Math.round(cosineSim * 100) / 100 };
  }).sort((a, b) => (b.similarity ?? 0) - (a.similarity ?? 0));

  const retrievedChunks = scoredChunks.slice(0, topK);

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white p-6 sm:p-8">
        <div className="space-y-3">
          <div className="text-xs font-semibold text-sky-400 tracking-wide uppercase">
            Architecture Lab · Stage 4 & 5 Enterprise Systems
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Retrieval-Augmented Generation (RAG) Visualizer
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
            See how modern search engines and AI applications eliminate hallucinations. Instead of relying on a model's
            hazy memory, we chunk textbooks into mathematical vector embeddings and inject exact source paragraphs into
            the prompt!
          </p>
        </div>
      </div>

      {/* Step Progress Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
        <div className="flex items-center justify-between text-xs font-semibold overflow-x-auto gap-2">
          {[
            { step: 1, label: '1. Document Ingestion' },
            { step: 2, label: '2. Vector Embeddings' },
            { step: 3, label: '3. Student Query' },
            { step: 4, label: '4. Vector Distance Match' },
            { step: 5, label: '5. Grounded Generation' },
          ].map((item) => (
            <button
              key={item.step}
              type="button"
              onClick={() => setCurrentStep(item.step as any)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                currentStep === item.step
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : currentStep > item.step
                  ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Pipeline Stages */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: 2D Vector Space Scatter & Chunks (7 Cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Database className="w-4 h-4 text-sky-600" />
                2D Semantic Embedding Space
              </h3>
              <p className="text-xs text-slate-500">
                Text embeddings projected into 2D coordinates. Closer dots = closer conceptual meanings!
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">Top-K Chunks:</span>
              <select
                value={topK}
                onChange={(e) => setTopK(parseInt(e.target.value))}
                className="px-2 py-1 text-xs bg-slate-100 dark:bg-slate-800 rounded border border-slate-300 dark:border-slate-700"
              >
                <option value={1}>Top 1</option>
                <option value={2}>Top 2</option>
                <option value={3}>Top 3</option>
              </select>
            </div>
          </div>

          {/* 2D Vector Canvas */}
          <div className="relative w-full aspect-[4/3] bg-slate-950 rounded-xl overflow-hidden border border-slate-800 p-3 select-none">
            <svg viewBox="-1.2 -1.2 2.4 2.4" className="w-full h-full">
              {/* Axes */}
              <line x1="-1.1" y1="0" x2="1.1" y2="0" stroke="#334155" strokeWidth="0.015" />
              <line x1="0" y1="-1.1" x2="0" y2="1.1" stroke="#334155" strokeWidth="0.015" />
              {/* Grid circle radius */}
              <circle cx="0" cy="0" r="1.0" fill="none" stroke="#1e293b" strokeWidth="0.01" />

              {/* Corpus Chunks */}
              {scoredChunks.map((chunk, i) => {
                const isRetrieved = currentStep >= 4 && i < topK;
                return (
                  <g key={chunk.id}>
                    <circle
                      cx={chunk.vector[0]}
                      cy={-chunk.vector[1]}
                      r={isRetrieved ? 0.08 : 0.05}
                      fill={isRetrieved ? '#38bdf8' : '#64748b'}
                      stroke={isRetrieved ? '#ffffff' : '#0f172a'}
                      strokeWidth="0.015"
                      className="transition-all duration-300"
                    />
                    <text
                      x={chunk.vector[0] + 0.08}
                      y={-chunk.vector[1] + 0.03}
                      fill={isRetrieved ? '#38bdf8' : '#94a3b8'}
                      fontSize="0.07"
                      fontWeight={isRetrieved ? 'bold' : 'normal'}
                      fontFamily="sans-serif"
                    >
                      {chunk.sourceDoc.split(' ')[0]} ({chunk.similarity})
                    </text>
                  </g>
                );
              })}

              {/* Query Vector */}
              {currentStep >= 3 && (
                <g>
                  <circle
                    cx={queryVector[0]}
                    cy={-queryVector[1]}
                    r="0.09"
                    fill="#ec4899"
                    stroke="#ffffff"
                    strokeWidth="0.02"
                  />
                  <line
                    x1="0"
                    y1="0"
                    x2={queryVector[0]}
                    y2={-queryVector[1]}
                    stroke="#ec4899"
                    strokeWidth="0.02"
                    strokeDasharray="0.05 0.02"
                  />
                  <text
                    x={queryVector[0] + 0.09}
                    y={-queryVector[1] + 0.03}
                    fill="#f472b6"
                    fontSize="0.08"
                    fontWeight="bold"
                  >
                    ★ User Query Vector
                  </text>
                </g>
              )}
            </svg>
          </div>

          {/* Retrieved Context Cards */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              Retrieved Context Snippets (Cosine Similarity Ranking):
            </span>
            <div className="space-y-2">
              {scoredChunks.map((chunk, i) => {
                const isSelected = currentStep >= 4 && i < topK;
                return (
                  <div
                    key={chunk.id}
                    className={`p-3 rounded-xl border text-xs transition-colors ${
                      isSelected
                        ? 'bg-sky-50/80 dark:bg-sky-950/40 border-sky-300 dark:border-sky-700 text-slate-900 dark:text-slate-100 shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-500'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-sky-700 dark:text-sky-300 flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5" />
                        {chunk.sourceDoc}
                      </span>
                      <span className="font-mono text-[11px] font-bold">
                        Cosine Sim: {chunk.similarity}
                      </span>
                    </div>
                    <p className="line-clamp-2">{chunk.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Synthesis & Prompt Augmentation Deck (5 Cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-5">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-indigo-600" />
              Prompt Augmentation & Grounding
            </h3>
            <p className="text-xs text-slate-500">
              How the prompt changes when external source documents are attached
            </p>
          </div>

          {/* User Query Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Student Query:
            </label>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Augmented Prompt Box */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-indigo-700 dark:text-indigo-400 block">
              Injected Augmented Prompt:
            </span>
            <div className="p-3.5 bg-slate-900 text-slate-200 rounded-xl border border-slate-800 text-[11px] font-mono leading-relaxed space-y-2 overflow-x-auto">
              <div className="text-slate-400"># System Instruction: Answer ONLY using provided verified context.</div>
              <div className="text-emerald-400">
                [CONTEXT 1]: {retrievedChunks[0]?.text.slice(0, 90)}...
              </div>
              {retrievedChunks[1] && (
                <div className="text-emerald-400">
                  [CONTEXT 2]: {retrievedChunks[1]?.text.slice(0, 90)}...
                </div>
              )}
              <div className="text-sky-300">USER QUESTION: {query}</div>
            </div>
          </div>

          {/* Generated Grounded Synthesis */}
          <div className="bg-emerald-50/70 dark:bg-emerald-950/30 p-4 rounded-xl border border-emerald-200 dark:border-emerald-800 space-y-2 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-emerald-900 dark:text-emerald-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Grounded Synthesis (Zero Hallucination)
            </div>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              Plant cells store solar energy into chemical bonds using two coordinated stages:
              chlorophyll pigments in the thylakoid membrane absorb photons to drive the electron transport chain{' '}
              <span className="text-indigo-600 dark:text-indigo-400 font-semibold">[Bio Textbook Ch. 4]</span>. The resulting
              proton gradient enables ATP synthase to synthesize high-energy ATP and NADPH molecules, which fix
              carbon into sugars{' '}
              <span className="text-indigo-600 dark:text-indigo-400 font-semibold">[Bio Textbook Ch. 4]</span>.
            </p>
          </div>

          <div className="pt-2 flex justify-between items-center text-xs text-slate-500">
            <span>Accuracy: 99.8% Grounded</span>
            <button
              type="button"
              onClick={() => setCurrentStep((prev) => (prev < 5 ? ((prev + 1) as any) : 1))}
              className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-sm transition-colors"
            >
              Step Forward ({currentStep}/5) →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
