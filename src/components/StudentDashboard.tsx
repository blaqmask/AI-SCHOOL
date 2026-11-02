import React from 'react';
import { GradeLevel, LearningStage, CurriculumModule, LabType, UserAccount } from '../types';
import { INITIAL_ACHIEVEMENT_BADGES } from '../data/achievementsData';
import { AnimeAvatarRenderer } from './AnimeAvatarRenderer';
import { DailyStudyTimer } from './DailyStudyTimer';
import {
  Award,
  ArrowRight,
  Sparkles,
  Target,
  School,
  Lock,
  BookOpen,
  Calendar,
  Flame,
  ShieldCheck,
} from 'lucide-react';

interface StudentDashboardProps {
  currentGrade: GradeLevel;
  stages: LearningStage[];
  modules: CurriculumModule[];
  completedModuleIds: string[];
  user?: UserAccount | null;
  onSelectModule: (module: CurriculumModule) => void;
  onOpenLab: (labType: LabType) => void;
  onOpenTutor: () => void;
  onOpenAvatarStudio?: () => void;
  onOpenAchievements?: () => void;
  onOpenBooks?: () => void;
  onIncrementMinutes?: (addedMinutes: number) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  currentGrade,
  stages,
  modules,
  completedModuleIds,
  user,
  onSelectModule,
  onOpenLab,
  onOpenTutor,
  onOpenAvatarStudio,
  onOpenAchievements,
  onOpenBooks,
  onIncrementMinutes,
}) => {
  // Find recommended module
  const uncompleted = modules.filter((m) => !completedModuleIds.includes(m.id));
  const recommendedModule =
    uncompleted.find((m) => m.targetGrade === (user?.grade || currentGrade)) ||
    modules[0];

  const earnedBadgeIds = user?.earnedBadgeIds || [
    'badge-prompt-master',
    'badge-data-detective',
    'badge-ubuntu-ethics',
    'badge-multilingual-hero',
  ];
  const userXP = user?.totalXP || completedModuleIds.length * 150 + 450;

  const badges = INITIAL_ACHIEVEMENT_BADGES.slice(0, 5).map((badge) => ({
    ...badge,
    earned: earnedBadgeIds.includes(badge.id) || badge.progressPercent === 100,
  }));

  const learnerNumber = user?.learnerNumber || 'LRN-2026-7041';
  const studyMinutesToday = user?.dailyMinutesCompleted || 28;
  const studyStreak = user?.studyStreakDays || 14;

  return (
    <div className="space-y-8">
      {/* 12-Month Grade Lock & 45-Min Daily Study Engine */}
      <DailyStudyTimer
        grade={user?.grade || currentGrade}
        minutesCompleted={studyMinutesToday}
        minutesTarget={45}
        streakDays={studyStreak}
        isGradeLocked={true}
        onIncrementMinutes={(m) => {
          if (onIncrementMinutes) onIncrementMinutes(m);
        }}
      />

      {/* Personalized Welcome Card with Anime Avatar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-5">
            {/* Anime Avatar with Quick Customize Trigger */}
            <div className="relative group shrink-0">
              <AnimeAvatarRenderer avatar={user?.avatar} size="lg" />
              {onOpenAvatarStudio && (
                <button
                  type="button"
                  onClick={onOpenAvatarStudio}
                  title="Customize Avatar"
                  className="absolute -bottom-1 -right-1 p-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-md border-2 border-white dark:border-slate-900 transition-transform group-hover:scale-110"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 px-2 py-0.5 rounded-md border border-indigo-200 dark:border-indigo-800 flex items-center gap-1">
                  <Lock className="w-3 h-3 text-amber-500" />
                  {learnerNumber} · Grade {user?.grade || currentGrade}
                </span>
                <span className="text-slate-300 dark:text-slate-700">·</span>
                <span className="text-slate-500 flex items-center gap-1">
                  <School className="w-3 h-3 text-slate-400" />
                  {user?.schoolName || 'Johannesburg STEM Academy'}
                </span>
                <span className="text-slate-300 dark:text-slate-700">·</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Term {user?.academicTerm || 1}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
                Sawubona, {user?.fullName || 'Sipho Dlamini'}!
              </h2>

              <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm max-w-xl leading-relaxed">
                Your 12-month CAPS curriculum is locked for the 2026 academic year. Read your digital subject textbooks, finish 45 minutes daily, and earn certified badges.
              </p>
            </div>
          </div>

          {/* Stats Badges */}
          <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shrink-0 self-stretch md:self-auto justify-around sm:justify-start">
            <div className="text-center">
              <span className="text-[11px] text-slate-500 block">Total Experience</span>
              <span className="text-xl font-bold font-mono text-indigo-600 dark:text-indigo-400">
                {userXP} XP
              </span>
            </div>
            <div className="w-px h-8 bg-slate-200 dark:bg-slate-700" />
            <div className="text-center">
              <span className="text-[11px] text-slate-500 block">Modules Done</span>
              <span className="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
                {completedModuleIds.length} / {modules.length}
              </span>
            </div>
            <div className="w-px h-8 bg-slate-200 dark:bg-slate-700" />
            <div className="text-center">
              <span className="text-[11px] text-slate-500 block">Badges</span>
              <span className="text-xl font-bold font-mono text-amber-500">
                {earnedBadgeIds.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Up Next & CAPS Digital Book Jump */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recommended Module (7 Cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5" />
                Recommended Next Step
              </span>
              <span className="text-slate-500 font-mono">
                {recommendedModule.durationMinutes} min lesson
              </span>
            </div>

            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              {recommendedModule.title}
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {recommendedModule.shortDescription}
            </p>

            <div className="flex flex-wrap gap-2 text-[11px] text-slate-500 pt-1">
              <span>Alignment: {recommendedModule.capsAlignment}</span>
              <span aria-hidden="true">·</span>
              <span>Track: {recommendedModule.competencyTrack}</span>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">
              Stage {recommendedModule.stageId}
            </span>

            <button
              type="button"
              onClick={() => onSelectModule(recommendedModule)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
            >
              <span>Continue Lesson</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* CAPS Digital Book Reader Jump (5 Cols) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-indigo-300">
              <span className="font-semibold flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5 text-indigo-400" /> CAPS Digital Books
              </span>
              <span>Offline Ready</span>
            </div>

            <h4 className="text-base font-bold">Grade {user?.grade || currentGrade} Multi-Subject Textbook Shelf</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Read Coding & Robotics, Mathematics, Natural Sciences, EMS, and English with offline caching and mother-tongue glossaries.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-2">
            {onOpenBooks && (
              <button
                type="button"
                onClick={onOpenBooks}
                className="flex-1 py-2 px-3 bg-indigo-500 hover:bg-indigo-400 text-white font-bold text-xs rounded-lg shadow-sm transition-colors text-center flex items-center justify-center gap-1.5"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Open Subject Books</span>
              </button>
            )}
            <button
              type="button"
              onClick={onOpenTutor}
              className="py-2 px-3 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg transition-colors text-center"
            >
              Ask Fundi AI
            </button>
          </div>
        </div>
      </div>

      {/* Earned Competency Badges Strip */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-500" />
            Competency Badges & Credentials
          </h3>
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500">
              {badges.filter((b) => b.earned).length} / {badges.length} Badges Earned
            </span>
            {onOpenAchievements && (
              <button
                type="button"
                onClick={onOpenAchievements}
                className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
              >
                <span>View All & Certificates</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {badges.map((b, i) => (
            <div
              key={i}
              className={`p-3.5 rounded-xl border text-center space-y-1 transition-all ${
                b.earned
                  ? 'bg-amber-50/60 dark:bg-amber-950/20 border-amber-300 dark:border-amber-800 text-slate-900 dark:text-slate-100'
                  : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-400 opacity-60'
              }`}
            >
              <Award
                className={`w-6 h-6 mx-auto ${
                  b.earned ? 'text-amber-500' : 'text-slate-400'
                }`}
              />
              <div className="text-xs font-bold">{b.title}</div>
              <div className="text-[10px] text-slate-500 line-clamp-2 leading-tight">
                {b.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
