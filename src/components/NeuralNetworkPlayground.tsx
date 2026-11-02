import React, { useState, useMemo } from 'react';
import { GradeLevel } from '../types';
import { Play, RotateCcw, Activity, HelpCircle, Layers, Sliders } from 'lucide-react';

interface NeuralNetworkPlaygroundProps {
  grade: GradeLevel;
}

export const NeuralNetworkPlayground: React.FC<NeuralNetworkPlaygroundProps> = ({ grade }) => {
  const isElementary = grade <= 6;

  // Network Hyperparameters
  const [w11, setW11] = useState(1.2);
  const [w12, setW12] = useState(-0.8);
  const [w21, setW21] = useState(0.9);
  const [w22, setW22] = useState(1.1);
  const [bias1, setBias1] = useState(0.1);
  const [bias2, setBias2] = useState(-0.3);
  const [activationFn, setActivationFn] = useState<'relu' | 'sigmoid' | 'tanh'>('sigmoid');
  const [inputX1, setInputX1] = useState(0.8);
  const [inputX2, setInputX2] = useState(0.6);
  const [isForwardRunning, setIsForwardRunning] = useState(false);
  const [pulseStage, setPulseStage] = useState<number>(0);

  // Activation Math helper
  const activate = (z: number, fn: 'relu' | 'sigmoid' | 'tanh'): number => {
    if (fn === 'relu') return Math.max(0, z);
    if (fn === 'tanh') return Math.tanh(z);
    return 1 / (1 + Math.exp(-z)); // sigmoid
  };

  // Node computations
  const h1_raw = inputX1 * w11 + inputX2 * w21 + bias1;
  const h1 = activate(h1_raw, activationFn);

  const h2_raw = inputX1 * w12 + inputX2 * w22 + bias2;
  const h2 = activate(h2_raw, activationFn);

  const out_w1 = 1.0;
  const out_w2 = -0.9;
  const out_b = 0.05;
  const out_raw = h1 * out_w1 + h2 * out_w2 + out_b;
  const outputPrediction = activate(out_raw, activationFn);

  // Target true label (e.g. 1.0 for Class A)
  const targetLabel = 1.0;
  const lossMSE = 0.5 * Math.pow(targetLabel - outputPrediction, 2);

  const runForwardPass = () => {
    setIsForwardRunning(true);
    setPulseStage(1);
    setTimeout(() => setPulseStage(2), 350);
    setTimeout(() => setPulseStage(3), 700);
    setTimeout(() => {
      setPulseStage(0);
      setIsForwardRunning(false);
    }, 1100);
  };

  const resetWeights = () => {
    setW11(1.0);
    setW12(-0.8);
    setW21(0.7);
    setW22(1.2);
    setBias1(0.0);
    setBias2(0.0);
    setInputX1(0.7);
    setInputX2(0.5);
  };

  return (
    <div className="space-y-8">
      {/* Lab Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-3">
            <div className="text-xs font-semibold text-emerald-400 tracking-wide uppercase">
              Interactive Lab · Stage 3 & 4 Deep Learning Engine
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Neural Network & Activation Playground
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
              {isElementary
                ? 'Discover how artificial neurons connect like electrical pathways to solve puzzles. Move the weight sliders and see how numbers flow forward!'
                : 'Interact with forward propagation mathematics: z = Σ(w·x) + b, inspect activation non-linearities (Sigmoid, ReLU, Tanh), and calculate Mean Squared Error loss in real time.'}
            </p>
          </div>
          <div className="lg:col-span-4 flex justify-center">
            <img
              src="/src/assets/images/lab_neural_networks_concept_1793574204663.jpg"
              alt="Neural network nodes and weights schematic"
              referrerPolicy="no-referrer"
              className="w-full max-w-[280px] h-44 object-cover rounded-xl shadow-lg border border-slate-700"
            />
          </div>
        </div>
      </div>

      {/* Main Interactive Stage & Control Deck */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* SVG Network Visual Stage (7 Columns) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Layers className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                Live Architecture Visualizer
              </h3>
              <p className="text-xs text-slate-500">
                Input Layer (2) → Hidden Layer (2) → Output Layer (1)
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={runForwardPass}
                disabled={isForwardRunning}
                className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-all flex items-center gap-1.5 disabled:opacity-50"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                {isForwardRunning ? 'Propagating...' : 'Run Forward Pass'}
              </button>
              <button
                type="button"
                onClick={resetWeights}
                className="p-1.5 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800 rounded-lg transition-colors"
                title="Reset Weights"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* SVG Diagram Canvas */}
          <div className="relative w-full aspect-[16/9] bg-slate-950 rounded-xl overflow-hidden border border-slate-800 flex items-center justify-center p-4">
            <svg viewBox="0 0 700 380" className="w-full h-full select-none">
              <defs>
                <linearGradient id="synapsePulse" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="#38bdf8" stopOpacity="1" />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity="0.2" />
                </linearGradient>
              </defs>

              {/* Grid Background lines */}
              <g stroke="#1e293b" strokeWidth="1" strokeDasharray="4 4">
                <line x1="80" y1="0" x2="80" y2="380" />
                <line x1="350" y1="0" x2="350" y2="380" />
                <line x1="620" y1="0" x2="620" y2="380" />
              </g>

              {/* Layer Column Titles */}
              <text x="80" y="30" fill="#94a3b8" fontSize="12" fontWeight="600" textAnchor="middle">
                Input Features (X)
              </text>
              <text x="350" y="30" fill="#94a3b8" fontSize="12" fontWeight="600" textAnchor="middle">
                Hidden Layer (H)
              </text>
              <text x="620" y="30" fill="#94a3b8" fontSize="12" fontWeight="600" textAnchor="middle">
                Prediction (Ŷ)
              </text>

              {/* Synapses: Input to Hidden */}
              {/* x1 to h1 */}
              <line
                x1="120"
                y1="120"
                x2="310"
                y2="120"
                stroke={pulseStage === 1 ? 'url(#synapsePulse)' : '#334155'}
                strokeWidth={Math.max(1.5, Math.abs(w11) * 3)}
              />
              {/* x1 to h2 */}
              <line
                x1="120"
                y1="120"
                x2="310"
                y2="260"
                stroke={pulseStage === 1 ? 'url(#synapsePulse)' : '#334155'}
                strokeWidth={Math.max(1.5, Math.abs(w12) * 3)}
              />
              {/* x2 to h1 */}
              <line
                x1="120"
                y1="260"
                x2="310"
                y2="120"
                stroke={pulseStage === 1 ? 'url(#synapsePulse)' : '#334155'}
                strokeWidth={Math.max(1.5, Math.abs(w21) * 3)}
              />
              {/* x2 to h2 */}
              <line
                x1="120"
                y1="260"
                x2="310"
                y2="260"
                stroke={pulseStage === 1 ? 'url(#synapsePulse)' : '#334155'}
                strokeWidth={Math.max(1.5, Math.abs(w22) * 3)}
              />

              {/* Synapses: Hidden to Output */}
              {/* h1 to output */}
              <line
                x1="390"
                y1="120"
                x2="580"
                y2="190"
                stroke={pulseStage === 2 ? 'url(#synapsePulse)' : '#334155'}
                strokeWidth={3}
              />
              {/* h2 to output */}
              <line
                x1="390"
                y1="260"
                x2="580"
                y2="190"
                stroke={pulseStage === 2 ? 'url(#synapsePulse)' : '#334155'}
                strokeWidth={3}
              />

              {/* Weight labels on lines */}
              <text x="210" y="105" fill="#38bdf8" fontSize="10" fontFamily="monospace">
                w11={w11.toFixed(1)}
              </text>
              <text x="210" y="150" fill="#f59e0b" fontSize="10" fontFamily="monospace">
                w12={w12.toFixed(1)}
              </text>
              <text x="210" y="235" fill="#38bdf8" fontSize="10" fontFamily="monospace">
                w21={w21.toFixed(1)}
              </text>
              <text x="210" y="280" fill="#f59e0b" fontSize="10" fontFamily="monospace">
                w22={w22.toFixed(1)}
              </text>

              {/* Input Nodes */}
              {/* X1 */}
              <g transform="translate(80, 120)">
                <circle
                  r="32"
                  fill="#0f172a"
                  stroke={pulseStage === 1 ? '#38bdf8' : '#3b82f6'}
                  strokeWidth={pulseStage === 1 ? 4 : 2}
                />
                <text y="-6" fill="#e2e8f0" fontSize="13" fontWeight="bold" textAnchor="middle">
                  x₁
                </text>
                <text y="14" fill="#60a5fa" fontSize="11" fontFamily="monospace" textAnchor="middle">
                  {inputX1.toFixed(2)}
                </text>
              </g>

              {/* X2 */}
              <g transform="translate(80, 260)">
                <circle
                  r="32"
                  fill="#0f172a"
                  stroke={pulseStage === 1 ? '#38bdf8' : '#3b82f6'}
                  strokeWidth={pulseStage === 1 ? 4 : 2}
                />
                <text y="-6" fill="#e2e8f0" fontSize="13" fontWeight="bold" textAnchor="middle">
                  x₂
                </text>
                <text y="14" fill="#60a5fa" fontSize="11" fontFamily="monospace" textAnchor="middle">
                  {inputX2.toFixed(2)}
                </text>
              </g>

              {/* Hidden Layer Nodes */}
              {/* H1 */}
              <g transform="translate(350, 120)">
                <circle
                  r="34"
                  fill="#0f172a"
                  stroke={pulseStage === 2 ? '#a855f7' : '#8b5cf6'}
                  strokeWidth={pulseStage === 2 ? 4 : 2}
                />
                <text y="-8" fill="#e2e8f0" fontSize="13" fontWeight="bold" textAnchor="middle">
                  h₁
                </text>
                <text y="12" fill="#c084fc" fontSize="11" fontFamily="monospace" textAnchor="middle">
                  {h1.toFixed(3)}
                </text>
                <text y="24" fill="#64748b" fontSize="9" textAnchor="middle">
                  b={bias1.toFixed(1)}
                </text>
              </g>

              {/* H2 */}
              <g transform="translate(350, 260)">
                <circle
                  r="34"
                  fill="#0f172a"
                  stroke={pulseStage === 2 ? '#a855f7' : '#8b5cf6'}
                  strokeWidth={pulseStage === 2 ? 4 : 2}
                />
                <text y="-8" fill="#e2e8f0" fontSize="13" fontWeight="bold" textAnchor="middle">
                  h₂
                </text>
                <text y="12" fill="#c084fc" fontSize="11" fontFamily="monospace" textAnchor="middle">
                  {h2.toFixed(3)}
                </text>
                <text y="24" fill="#64748b" fontSize="9" textAnchor="middle">
                  b={bias2.toFixed(1)}
                </text>
              </g>

              {/* Output Node */}
              <g transform="translate(620, 190)">
                <circle
                  r="38"
                  fill="#0f172a"
                  stroke={pulseStage === 3 ? '#10b981' : '#059669'}
                  strokeWidth={pulseStage === 3 ? 5 : 2}
                />
                <text y="-10" fill="#e2e8f0" fontSize="14" fontWeight="bold" textAnchor="middle">
                  Ŷ Output
                </text>
                <text y="12" fill="#34d399" fontSize="13" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                  {outputPrediction.toFixed(3)}
                </text>
                <text y="26" fill="#94a3b8" fontSize="9" textAnchor="middle">
                  {outputPrediction > 0.5 ? 'Class A (Positive)' : 'Class B (Negative)'}
                </text>
              </g>
            </svg>
          </div>

          {/* Mathematical Status Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
              <span className="text-slate-500 block">Linear Sum z₁</span>
              <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                {h1_raw.toFixed(3)}
              </span>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
              <span className="text-slate-500 block">Linear Sum z₂</span>
              <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                {h2_raw.toFixed(3)}
              </span>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
              <span className="text-slate-500 block">Output Loss (MSE)</span>
              <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                {lossMSE.toFixed(4)}
              </span>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
              <span className="text-slate-500 block">Confidence</span>
              <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                {(Math.abs(outputPrediction - 0.5) * 200).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Parameter Tuning Deck (5 Columns) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-indigo-600" />
              Synapse & Bias Controls
            </h3>
            <span className="text-xs font-mono text-slate-400">
              Grade {grade}
            </span>
          </div>

          {/* Activation Function Selector */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Activation Function σ(z):
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['sigmoid', 'relu', 'tanh'] as const).map((fn) => (
                <button
                  key={fn}
                  type="button"
                  onClick={() => setActivationFn(fn)}
                  className={`py-2 text-xs font-medium uppercase rounded-lg border transition-all ${
                    activationFn === fn
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {fn}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-slate-500">
              {activationFn === 'sigmoid' && 'Sigmoid: Compresses values to (0, 1). Great for probabilities.'}
              {activationFn === 'relu' && 'ReLU: max(0, z). Faster training, modern industry standard.'}
              {activationFn === 'tanh' && 'Tanh: Zero-centered (-1, 1). Ideal for normalized hidden states.'}
            </p>
          </div>

          {/* Input Feature Sliders */}
          <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
              Input Sensor Values:
            </span>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600 dark:text-slate-400">Feature X₁ (e.g. Size):</span>
                <span className="font-mono font-bold">{inputX1.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={inputX1}
                onChange={(e) => setInputX1(parseFloat(e.target.value))}
                className="w-full accent-indigo-600 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600 dark:text-slate-400">Feature X₂ (e.g. Speed):</span>
                <span className="font-mono font-bold">{inputX2.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={inputX2}
                onChange={(e) => setInputX2(parseFloat(e.target.value))}
                className="w-full accent-indigo-600 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* Weight Sliders */}
          <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
              Synaptic Weights (Importance):
            </span>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <div className="flex justify-between mb-1">
                  <span>w₁₁:</span>
                  <span className="font-mono font-bold">{w11.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min="-2"
                  max="2"
                  step="0.1"
                  value={w11}
                  onChange={(e) => setW11(parseFloat(e.target.value))}
                  className="w-full accent-sky-500 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
                />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span>w₁₂:</span>
                  <span className="font-mono font-bold">{w12.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min="-2"
                  max="2"
                  step="0.1"
                  value={w12}
                  onChange={(e) => setW12(parseFloat(e.target.value))}
                  className="w-full accent-amber-500 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
                />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span>w₂₁:</span>
                  <span className="font-mono font-bold">{w21.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min="-2"
                  max="2"
                  step="0.1"
                  value={w21}
                  onChange={(e) => setW21(parseFloat(e.target.value))}
                  className="w-full accent-sky-500 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
                />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span>w₂₂:</span>
                  <span className="font-mono font-bold">{w22.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min="-2"
                  max="2"
                  step="0.1"
                  value={w22}
                  onChange={(e) => setW22(parseFloat(e.target.value))}
                  className="w-full accent-amber-500 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Biases */}
          <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
              Node Biases (Threshold Shifters):
            </span>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <div className="flex justify-between mb-1">
                  <span>Bias 1:</span>
                  <span className="font-mono font-bold">{bias1.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min="-1"
                  max="1"
                  step="0.1"
                  value={bias1}
                  onChange={(e) => setBias1(parseFloat(e.target.value))}
                  className="w-full accent-purple-500 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
                />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span>Bias 2:</span>
                  <span className="font-mono font-bold">{bias2.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min="-1"
                  max="1"
                  step="0.1"
                  value={bias2}
                  onChange={(e) => setBias2(parseFloat(e.target.value))}
                  className="w-full accent-purple-500 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
