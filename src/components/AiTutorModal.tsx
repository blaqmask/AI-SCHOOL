import React, { useState } from 'react';
import { GradeLevel, SouthAfricanLanguageCode, SubjectTrack } from '../types';
import { SA_LANGUAGES } from '../data/saLanguages';
import { Sparkles, Send, X, Bot, User, RefreshCw, Globe, BookOpen } from 'lucide-react';

interface AiTutorModalProps {
  grade: GradeLevel;
  isOpen: boolean;
  onClose: () => void;
  activeTopic?: string;
  language: SouthAfricanLanguageCode;
  onSelectLanguage: (code: SouthAfricanLanguageCode) => void;
  initialSubject?: SubjectTrack;
}

interface Message {
  role: 'user' | 'tutor';
  text: string;
  time: string;
}

export const AiTutorModal: React.FC<AiTutorModalProps> = ({
  grade,
  isOpen,
  onClose,
  activeTopic = 'General AI Exploration',
  language,
  onSelectLanguage,
  initialSubject = 'ai-digital',
}) => {
  const activeLangObj = SA_LANGUAGES.find((l) => l.code === language) || SA_LANGUAGES[0];
  const [selectedSubject, setSelectedSubject] = useState<SubjectTrack>(initialSubject);

  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'tutor',
      text: `${activeLangObj.greeting}\n\nI am Fundi, your AI & Multi-Subject tutor for Grade ${grade}. I can explain concepts in ${activeLangObj.nativeName} or English across Coding, AI, Mathematics, and Physical Sciences. What would you like to explore today?`,
      time: 'Just now',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const quickPromptsBySubject: Record<SubjectTrack, string[]> = {
    'ai-digital': [
      'Why do LLMs hallucinate false citations?',
      'How do I structure a role-task prompt?',
      'What are the ethical risks of facial recognition in SA?',
      'How does RAG vector search work?',
    ],
    mathematics: [
      'Explain quadratic equations step-by-step',
      'How does probability connect to AI prediction confidence?',
      'Help me understand compound interest financial math',
      'Explain geometric proofs in Euclidean geometry',
    ],
    'physical-sciences': [
      "Explain Ohm's Law and electric circuit resistors",
      "How does Newton's second law apply to robotics?",
      'How do silicon photovoltaic solar panels generate power?',
      'Explain chemical equilibrium and Le Chatelier’s principle',
    ],
    'life-sciences': [
      'Explain the light phase of photosynthesis',
      'How does mRNA transcribe DNA in protein synthesis?',
      'How does AI help predict drought-resistant crop strains?',
      'Explain biodiversity conservation in Kruger National Park',
    ],
    'coding-robotics': [
      'Write a Python function to read an ultrasonic sensor',
      'Explain the difference between while loops and for loops',
      'How do logic gates (AND, OR, NOT) control robotics motors?',
      'How to connect Gemini API to a full-stack web app?',
    ],
    'ems-business': [
      'How can a township spaza shop use AI for inventory?',
      'Explain the break-even point formula for a startup',
      'What are South Africa’s POPIA privacy compliance rules?',
      'How do fintech algorithms expand micro-credit access?',
    ],
  };

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() || isLoading) return;

    const userMsg: Message = {
      role: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          grade,
          topic: activeTopic,
          language,
          subject: selectedSubject,
        }),
      });
      const data = await res.json();
      const tutorMsg: Message = {
        role: 'tutor',
        text: data.reply || 'Great question! Let us explore that step by step.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, tutorMsg]);
    } catch {
      const fallbackMsg: Message = {
        role: 'tutor',
        text: `Artificial Intelligence (Ubuhlakani Bokwenziwa / Kunsmatige Intelligensie) is a powerful tool built by humans to spot patterns and assist with calculations. Always remember to formulate your prompt with clear role, task, and constraints!`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-t-2xl sm:rounded-2xl max-w-2xl w-full h-[85vh] sm:h-[680px] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold">Fundi AI Tutor</h3>
                <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/80">
                  {activeLangObj.nativeName} · Grade {grade}
                </span>
              </div>
              <p className="text-xs text-slate-300">
                South African Multi-Subject Digital & AI Coach
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={language}
              onChange={(e) => onSelectLanguage(e.target.value as SouthAfricanLanguageCode)}
              className="text-xs bg-slate-800 text-white border border-slate-700 rounded-lg px-2 py-1 cursor-pointer"
            >
              {SA_LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.nativeName}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Subject Filter Bar inside Tutor */}
        <div className="px-4 py-2 bg-slate-100 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 flex items-center gap-1.5 overflow-x-auto text-xs">
          <span className="text-slate-500 font-semibold shrink-0">Subject:</span>
          {(
            [
              ['ai-digital', 'AI & Digital'],
              ['mathematics', 'Mathematics'],
              ['physical-sciences', 'Physical Sciences'],
              ['life-sciences', 'Life Sciences'],
              ['coding-robotics', 'Coding & Robotics'],
              ['ems-business', 'Business/EMS'],
            ] as const
          ).map(([subId, label]) => (
            <button
              key={subId}
              type="button"
              onClick={() => setSelectedSubject(subId)}
              className={`px-2.5 py-1 rounded-md whitespace-nowrap text-xs transition-colors ${
                selectedSubject === subId
                  ? 'bg-indigo-600 text-white font-bold shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Quick Prompts Bar */}
        <div className="px-4 py-2 bg-slate-50 dark:bg-slate-800/40 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-slate-400 shrink-0 font-medium flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-indigo-500" /> Prompts:
          </span>
          {quickPromptsBySubject[selectedSubject].map((qp, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleSend(qp)}
              className="px-2.5 py-1 bg-white dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 text-slate-700 dark:text-slate-300 hover:text-indigo-600 rounded-md border border-slate-200 dark:border-slate-700 whitespace-nowrap transition-colors"
            >
              {qp}
            </button>
          ))}
        </div>

        {/* Messages Chat List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 text-xs sm:text-sm">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.role === 'tutor' && (
                <div className="w-7 h-7 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              <div
                className={`max-w-[85%] rounded-2xl p-4 leading-relaxed whitespace-pre-wrap ${
                  m.role === 'user'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700/60'
                }`}
              >
                {m.text}
                <div
                  className={`text-[10px] mt-1.5 font-mono ${
                    m.role === 'user' ? 'text-indigo-200' : 'text-slate-400'
                  }`}
                >
                  {m.time}
                </div>
              </div>
              {m.role === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 items-center text-xs text-slate-500">
              <div className="w-7 h-7 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 flex items-center justify-center shrink-0">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              </div>
              <span>Fundi is thinking in {activeLangObj.name}...</span>
            </div>
          )}
        </div>

        {/* Bottom Input Field */}
        <div className="p-3 sm:p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={`Ask Fundi anything in ${activeLangObj.name} or English...`}
            className="flex-1 px-4 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="button"
            onClick={() => handleSend()}
            disabled={!inputText.trim() || isLoading}
            className="p-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-sm transition-all disabled:opacity-40"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
