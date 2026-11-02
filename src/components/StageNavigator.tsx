import React from 'react';
import { LearningStage, CurriculumModule, StageId, GradeLevel, LabType } from '../types';
import { ArrowRight, CheckCircle2, Clock, BookOpen, Play, Award } from 'lucide-react';

interface StageNavigatorProps {
  stages: LearningStage[];
  modules: CurriculumModule[];
  activeStageId: StageId;
  onSelectStage: (id: StageId) => void;
  onSelectModule: (module: CurriculumModule) => void;
  completedModuleIds: string[];
  currentGrade: GradeLevel;
  onOpenLab: (labType: LabType) => void;
}

export const StageNavigator: React.FC<StageNavigatorProps> = ({
  stages,
  modules,
  activeStageId,
  onSelectStage,
  onSelectModule,
  completedModuleIds,
  currentGrade,
  onOpenLab,
}) => {
  const currentStage = stages.find((s) => s.id === activeStageId) || stages[0];
  const stageModules = modules.filter((m) => m.stageId === activeStageId);

  return (
    <div className="space-y-8">
      {/* 5-Stage Stepper Navigation */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Grade 4–12 Learning Pathway Architecture
          </h2>
          <span className="text-xs text-slate-500 font-medium">
            5 Progressive Stages
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {stages.map((st) => {
            const isActive = st.id === activeStageId;
            const isGradeStage =
              currentGrade >= st.gradeRange[0] && currentGrade <= st.gradeRange[1];

            return (
              <button
                key={st.id}
                type="button"
                onClick={() => onSelectStage(st.id)}
                className={`text-left p-3.5 rounded-xl border transition-all ${
                  isActive
                    ? 'bg-white dark:bg-slate-900 border-indigo-600 dark:border-indigo-500 shadow-md ring-1 ring-indigo-500'
                    : 'bg-slate-50/60 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-slate-500">{st.grades}</span>
                  {isGradeStage && (
                    <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                      Your Grade
                    </span>
                  )}
                </div>
                <div className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate">
                  {st.title.split('—')[1] || st.title}
                </div>
                <div className="text-xs text-slate-500 mt-1 line-clamp-1">
                  {st.subtitle}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Stage Detailed Spotlight */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold">
              <span className={`px-2.5 py-1 rounded-md ${currentStage.accentBg} ${currentStage.color}`}>
                {currentStage.grades}
              </span>
              <span className="text-slate-400">·</span>
              <span className="text-slate-500">{currentStage.subtitle}</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              {currentStage.title}
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              {currentStage.description}
            </p>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300">
              <span className="font-bold text-slate-900 dark:text-slate-100 block mb-0.5">
                Target Stage Outcome:
              </span>
              {currentStage.outcome}
            </div>
          </div>

          <div className="lg:col-span-4 bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
              Core Competencies:
            </span>
            <ul className="text-xs space-y-1.5 text-slate-600 dark:text-slate-400">
              {currentStage.coreConcepts.map((concept, idx) => (
                <li key={idx} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  <span>{concept}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Modules Grid for this Stage */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Curriculum Modules in {currentStage.title.split('—')[0]}
            </h4>
            <span className="text-xs text-slate-500 font-mono">
              {stageModules.filter((m) => completedModuleIds.includes(m.id)).length} / {stageModules.length} Completed
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stageModules.map((module) => {
              const isCompleted = completedModuleIds.includes(module.id);

              return (
                <div
                  key={module.id}
                  className="bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl p-5 shadow-sm hover:border-indigo-400 dark:hover:border-indigo-500 transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                        {module.competencyTrack} Track
                      </span>
                      <span className="flex items-center gap-1 font-mono">
                        <Clock className="w-3.5 h-3.5" />
                        {module.durationMinutes} min
                      </span>
                    </div>

                    <h5 className="text-base font-bold text-slate-900 dark:text-slate-100 leading-snug">
                      {module.title}
                    </h5>

                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {module.shortDescription}
                    </p>

                    <div className="text-[11px] text-slate-400">
                      Alignment: {module.capsAlignment}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-700">
                    {isCompleted ? (
                      <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" />
                        Completed & Verified
                      </span>
                    ) : (
                      <span className="text-xs text-slate-400">
                        {module.difficulty}
                      </span>
                    )}

                    <div className="flex items-center gap-2">
                      {module.interactiveLabType && (
                        <button
                          type="button"
                          onClick={() => onOpenLab(module.interactiveLabType!)}
                          className="px-2.5 py-1.5 text-xs text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 bg-slate-100 dark:bg-slate-700 rounded-lg transition-colors flex items-center gap-1"
                          title="Open Lab"
                        >
                          <Play className="w-3 h-3 fill-current" />
                          Lab
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => onSelectModule(module)}
                        className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors flex items-center gap-1"
                      >
                        <span>{isCompleted ? 'Review' : 'Start Lesson'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
