import React, { useState, useEffect } from 'react';
import { GradeLevel } from '../types';
import {
  Clock,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Lock,
  Flame,
  CheckCircle2,
  Calendar,
} from 'lucide-react';

interface DailyStudyTimerProps {
  grade: GradeLevel;
  minutesCompleted: number;
  minutesTarget?: number;
  streakDays?: number;
  isGradeLocked?: boolean;
  onIncrementMinutes: (addedMinutes: number) => void;
}

export const DailyStudyTimer: React.FC<DailyStudyTimerProps> = ({
  grade,
  minutesCompleted,
  minutesTarget = 45,
  streakDays = 14,
  isGradeLocked = true,
  onIncrementMinutes,
}) => {
  const [isActive, setIsActive] = useState<boolean>(true);
  const [seconds, setSeconds] = useState<number>(0);
  const [hasCelebrated, setHasCelebrated] = useState<boolean>(false);

  useEffect(() => {
    let interval: any = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prev) => {
          if (prev >= 59) {
            onIncrementMinutes(1);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, onIncrementMinutes]);

  // Check if target reached
  useEffect(() => {
    if (minutesCompleted >= minutesTarget && !hasCelebrated) {
      setHasCelebrated(true);
    }
  }, [minutesCompleted, minutesTarget, hasCelebrated]);

  const percentage = Math.min(100, Math.round((minutesCompleted / minutesTarget) * 100));

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
      {/* 12-Month Academic Lock Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <Lock className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-900 dark:text-slate-100 block">
              12-Month Grade {grade} Academic Lock
            </span>
            <span className="text-[10px] text-slate-500">
              January Reopening → December Report Collection (Term 1 Active)
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-xs font-bold text-orange-500 font-mono bg-orange-50 dark:bg-orange-950/40 px-2.5 py-1 rounded-lg border border-orange-200 dark:border-orange-900/50">
            <Flame className="w-3.5 h-3.5" />
            {streakDays} Day Streak
          </span>
        </div>
      </div>

      {/* Timer Display & 45-Min Progress */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          {/* Progress Ring / Dial */}
          <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
            <svg className="w-16 h-16 transform -rotate-90">
              <circle
                cx="32"
                cy="32"
                r="26"
                className="stroke-slate-100 dark:stroke-slate-800"
                strokeWidth="5"
                fill="transparent"
              />
              <circle
                cx="32"
                cy="32"
                r="26"
                className={percentage >= 100 ? 'stroke-emerald-500' : 'stroke-indigo-600'}
                strokeWidth="5"
                strokeDasharray={163.36}
                strokeDashoffset={163.36 - (163.36 * percentage) / 100}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <span className="absolute font-mono font-black text-xs text-slate-900 dark:text-slate-100">
              {percentage}%
            </span>
          </div>

          <div className="space-y-0.5">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black font-mono text-slate-900 dark:text-slate-100">
                {minutesCompleted} / {minutesTarget}
              </span>
              <span className="text-xs font-semibold text-slate-500">Minutes</span>
            </div>
            <p className="text-xs text-slate-500">
              {percentage >= 100 ? (
                <span className="text-emerald-600 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Daily CAPS quota completed! +100 XP
                </span>
              ) : (
                `Active session ticking (${String(seconds).padStart(2, '0')}s). ${minutesTarget - minutesCompleted}m left today.`
              )}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsActive(!isActive)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs ${
              isActive
                ? 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
            }`}
          >
            {isActive ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                <span>Resume Study</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
