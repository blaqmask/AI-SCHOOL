import React, { useState } from 'react';
import { CurriculumModule, GradeLevel, LabType } from '../types';
import { CheckCircle2, BookOpen, Sparkles, HelpCircle, ArrowRight, ArrowLeft, Award, Play } from 'lucide-react';

interface LessonViewerProps {
  module: CurriculumModule;
  grade: GradeLevel;
  onCompleteLesson: (moduleId: string) => void;
  isCompleted: boolean;
  onOpenLab: (labType: LabType) => void;
  onBack: () => void;
}

export const LessonViewer: React.FC<LessonViewerProps> = ({
  module,
  grade,
  onCompleteLesson,
  isCompleted,
  onOpenLab,
  onBack,
}) => {
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [showQuizResults, setShowQuizResults] = useState(false);

  const currentSection = module.sections[activeSectionIndex];

  const handleSelectQuizOption = (questionId: string, optionIndex: number) => {
    setQuizAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const isQuizComplete = module.quiz.every((q) => quizAnswers[q.id] !== undefined);
  const correctCount = module.quiz.filter((q) => quizAnswers[q.id] === q.correctIndex).length;

  return (
    <div className="space-y-6">
      {/* Top Breadcrumb & Navigation */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Curriculum Roadmap
        </button>

        <div className="flex items-center gap-3 text-xs text-slate-500">
          <span>{module.durationMinutes} min read</span>
          <span aria-hidden="true">·</span>
          <span>{module.difficulty}</span>
          <span aria-hidden="true">·</span>
          <span className="font-semibold text-indigo-600 dark:text-indigo-400">
            {module.competencyTrack} Track
          </span>
        </div>
      </div>

      {/* Module Title Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-semibold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-1 rounded-md">
              Stage {module.stageId} · Grade {module.targetGrade} ({module.code})
            </span>
            <span className="text-slate-500">{module.capsAlignment}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            {module.title}
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            {module.shortDescription}
          </p>
        </div>

        {/* Section Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pt-2 overflow-x-auto">
          {module.sections.map((section, idx) => (
            <button
              key={section.id}
              type="button"
              onClick={() => setActiveSectionIndex(idx)}
              className={`pb-3 text-xs font-semibold whitespace-nowrap border-b-2 transition-all ${
                activeSectionIndex === idx
                  ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                  : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              Part {idx + 1}: {section.title.length > 28 ? `${section.title.slice(0, 28)}...` : section.title}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setActiveSectionIndex(module.sections.length)}
            className={`pb-3 text-xs font-semibold whitespace-nowrap border-b-2 transition-all flex items-center gap-1.5 ${
              activeSectionIndex === module.sections.length
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            Check-for-Understanding Quiz
          </button>
        </div>

        {/* Section Content View */}
        {activeSectionIndex < module.sections.length ? (
          <div className="space-y-6 pt-2">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              {currentSection.title}
            </h2>

            <div className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed space-y-4">
              <p>{currentSection.content}</p>
            </div>

            {/* Analogy / Student Tip Callout */}
            {currentSection.analogyOrTip && (
              <div className="p-4 bg-indigo-50/70 dark:bg-indigo-950/30 rounded-xl border border-indigo-200 dark:border-indigo-800/80 space-y-1">
                <div className="text-xs font-semibold text-indigo-900 dark:text-indigo-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                  Real-World Conceptual Analogy
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {currentSection.analogyOrTip}
                </p>
              </div>
            )}

            {/* Key Takeaway Strip */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                  Core Lesson Takeaway
                </span>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
                  {currentSection.keyTakeaway}
                </p>
              </div>
            </div>

            {/* Attached Interactive Lab Affordance */}
            {module.interactiveLabType && (
              <div className="p-4 bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
                <div className="space-y-1 text-center sm:text-left">
                  <span className="text-xs font-semibold text-indigo-300 uppercase tracking-wide">
                    Hands-On Practice Available
                  </span>
                  <div className="text-sm font-bold">
                    Test this concept in the {module.interactiveLabType.replace('-', ' ').toUpperCase()} Lab
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onOpenLab(module.interactiveLabType!)}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors flex items-center gap-1.5 shrink-0"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  Launch Interactive Lab
                </button>
              </div>
            )}

            {/* Next Part Controller */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                disabled={activeSectionIndex === 0}
                onClick={() => setActiveSectionIndex((prev) => prev - 1)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white disabled:opacity-40 transition-colors"
              >
                ← Previous Part
              </button>
              <button
                type="button"
                onClick={() => setActiveSectionIndex((prev) => prev + 1)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
              >
                {activeSectionIndex === module.sections.length - 1
                  ? 'Take the Quiz →'
                  : 'Next Part →'}
              </button>
            </div>
          </div>
        ) : (
          /* Check-for-Understanding Quiz Tab */
          <div className="space-y-6 pt-2">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                Check-for-Understanding Quiz
              </h2>
              <p className="text-xs text-slate-500">
                Reinforce your understanding with instant grading and explanatory feedback
              </p>
            </div>

            <div className="space-y-6">
              {module.quiz.map((q, qIdx) => (
                <div
                  key={q.id}
                  className="p-5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3"
                >
                  <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    Question {qIdx + 1}: {q.question}
                  </div>

                  <div className="space-y-2">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = quizAnswers[q.id] === optIdx;
                      const isCorrect = q.correctIndex === optIdx;

                      let buttonStyle =
                        'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-indigo-300';
                      if (showQuizResults) {
                        if (isCorrect) {
                          buttonStyle = 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-400 text-emerald-900 dark:text-emerald-200 font-semibold';
                        } else if (isSelected && !isCorrect) {
                          buttonStyle = 'bg-rose-50 dark:bg-rose-950/60 border-rose-400 text-rose-900 dark:text-rose-200';
                        }
                      } else if (isSelected) {
                        buttonStyle = 'bg-indigo-50 dark:bg-indigo-950/50 border-indigo-500 text-indigo-900 dark:text-indigo-200 font-semibold ring-1 ring-indigo-500';
                      }

                      return (
                        <button
                          key={optIdx}
                          type="button"
                          onClick={() => handleSelectQuizOption(q.id, optIdx)}
                          className={`w-full text-left p-3 text-xs sm:text-sm rounded-lg border transition-all ${buttonStyle}`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full border flex items-center justify-center text-xs font-mono shrink-0">
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span>{opt}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {showQuizResults && (
                    <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                      <span className="font-bold text-slate-900 dark:text-slate-100 block mb-0.5">
                        Explanation:
                      </span>
                      {q.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Quiz Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setActiveSectionIndex(module.sections.length - 1)}
                className="text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white"
              >
                ← Review Lesson Content
              </button>

              <div className="flex items-center gap-3">
                {!showQuizResults ? (
                  <button
                    type="button"
                    disabled={!isQuizComplete}
                    onClick={() => setShowQuizResults(true)}
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-all disabled:opacity-40"
                  >
                    Submit Quiz & Check Answers
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => onCompleteLesson(module.id)}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-all flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Complete Module & Earn {correctCount * 50 + 100} XP
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
