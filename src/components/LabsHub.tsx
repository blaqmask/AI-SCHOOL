import React, { useState } from 'react';
import { GradeLevel, LabType } from '../types';
import { PromptStudioLab } from './PromptStudioLab';
import { NeuralNetworkPlayground } from './NeuralNetworkPlayground';
import { HallucinationSpotterLab } from './HallucinationSpotterLab';
import { RagPipelineVisualizer } from './RagPipelineVisualizer';
import { EthicsDilemmaLab } from './EthicsDilemmaLab';
import { Sparkles, Layers, ShieldCheck, Database, Scale, Cpu } from 'lucide-react';

interface LabsHubProps {
  grade: GradeLevel;
  initialLab?: LabType;
}

export const LabsHub: React.FC<LabsHubProps> = ({ grade, initialLab = 'prompt-studio' }) => {
  const [activeLab, setActiveLab] = useState<LabType>(initialLab);

  return (
    <div className="space-y-8">
      {/* Lab Switcher Segmented Control */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4 overflow-x-auto">
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs">
          <button
            type="button"
            onClick={() => setActiveLab('prompt-studio')}
            className={`px-3.5 py-2 rounded-lg font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeLab === 'prompt-studio'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Prompt Studio
          </button>

          <button
            type="button"
            onClick={() => setActiveLab('neural-net')}
            className={`px-3.5 py-2 rounded-lg font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeLab === 'neural-net'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            Neural Playground
          </button>

          <button
            type="button"
            onClick={() => setActiveLab('hallucination-spotter')}
            className={`px-3.5 py-2 rounded-lg font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeLab === 'hallucination-spotter'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Hallucination Spotter
          </button>

          <button
            type="button"
            onClick={() => setActiveLab('rag-pipeline')}
            className={`px-3.5 py-2 rounded-lg font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeLab === 'rag-pipeline'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            RAG Visualizer
          </button>

          <button
            type="button"
            onClick={() => setActiveLab('ethics-dilemma')}
            className={`px-3.5 py-2 rounded-lg font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeLab === 'ethics-dilemma'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            Ethics & Dilemmas
          </button>
        </div>

        <div className="text-xs text-slate-500 font-mono hidden sm:block">
          Interactive Simulation Mode · Grade {grade}
        </div>
      </div>

      {/* Render Selected Lab */}
      {activeLab === 'prompt-studio' && <PromptStudioLab grade={grade} />}
      {activeLab === 'neural-net' && <NeuralNetworkPlayground grade={grade} />}
      {activeLab === 'hallucination-spotter' && <HallucinationSpotterLab grade={grade} />}
      {activeLab === 'rag-pipeline' && <RagPipelineVisualizer grade={grade} />}
      {activeLab === 'ethics-dilemma' && <EthicsDilemmaLab grade={grade} />}
    </div>
  );
};
