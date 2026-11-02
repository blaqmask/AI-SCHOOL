import React, { useState } from 'react';
import { GradeLevel, SouthAfricanLanguageCode, AnimeAvatarConfig } from '../types';
import { AnimeAvatarRenderer } from './AnimeAvatarRenderer';
import {
  ShieldCheck,
  CheckCircle,
  Clock,
  Flame,
  FileText,
  Calendar,
  Award,
  BookOpen,
  Send,
  Sparkles,
  Lock,
  Download,
  AlertCircle,
} from 'lucide-react';

interface ParentDashboardProps {
  currentGrade: GradeLevel;
  parentName?: string;
  childLearnerNumber?: string;
  preferredLanguage?: SouthAfricanLanguageCode;
}

export const ParentDashboard: React.FC<ParentDashboardProps> = ({
  currentGrade,
  parentName = 'Mrs. T. Dlamini',
  childLearnerNumber = 'LRN-2026-7041',
  preferredLanguage = 'zu',
}) => {
  const [signedOffToday, setSignedOffToday] = useState(false);
  const [parentFeedback, setParentFeedback] = useState('');
  const [feedbackSent, setFeedbackSent] = useState(false);

  // Child statistics
  const childStats = {
    learnerNumber: childLearnerNumber,
    grade: 7,
    dailyMinutesToday: 38,
    dailyMinutesTarget: 45,
    streakDays: 14,
    currentTerm: 1,
    academicYear: '2026 (Jan 14 – Dec 10)',
    school: 'Johannesburg STEM Academy',
    topSubject: 'Coding & Robotics (92%)',
    term1Score: 90,
    term2Score: 94,
    term3Score: 91,
    term4ProjectedScore: 93,
    badgesEarned: 6,
    avatar: {
      genderStyle: 'anime-boy' as const,
      skinTone: '#a16207',
      hairStyle: 'afro-puff' as const,
      hairColor: '#171717',
      eyeExpression: 'sparkle' as const,
      eyeColor: '#451a03',
      clothing: 'school-blazer' as const,
      clothingColor: '#1e3a8a',
      accessory: 'hacker-headphones' as const,
      auraEffect: 'azure-cyber' as const,
    },
  };

  const handleSignOff = () => {
    setSignedOffToday(true);
  };

  const handleSendTeacherNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!parentFeedback.trim()) return;
    setFeedbackSent(true);
    setTimeout(() => {
      setFeedbackSent(false);
      setParentFeedback('');
    }, 3000);
  };

  const completionPercent = Math.min(
    100,
    Math.round((childStats.dailyMinutesToday / childStats.dailyMinutesTarget) * 100)
  );

  return (
    <div className="space-y-8">
      {/* Parent Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-800 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs">
              <span className="px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-400/30 font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                Parent & Guardian Portal · POPIA Protected
              </span>
              <span className="text-slate-400">·</span>
              <span className="text-slate-300 font-mono">
                Monitoring Child: {childStats.learnerNumber}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Welcome, {parentName}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Active child monitoring for the 12-month CAPS Grade {childStats.grade} academic year ({childStats.academicYear}). Review daily 45-minute study consistency, school reports, and sign off homework.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-3 rounded-xl shrink-0">
            <AnimeAvatarRenderer avatar={childStats.avatar} size="sm" />
            <div className="text-xs">
              <span className="font-bold text-slate-100 block">
                {childStats.learnerNumber}
              </span>
              <span className="text-teal-400 font-mono">Grade 7 Learner</span>
            </div>
          </div>
        </div>
      </div>

      {/* Top 3 KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Daily 45-Minute Target */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                Today’s 45-Min Quota
              </h3>
            </div>
            <span className="text-xs font-mono font-bold text-indigo-600">
              {completionPercent}%
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-black font-mono text-slate-900 dark:text-slate-100">
                {childStats.dailyMinutesToday} / 45
              </span>
              <span className="text-xs text-slate-500">Minutes Active Today</span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                style={{ width: `${completionPercent}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-500">
              {childStats.dailyMinutesTarget - childStats.dailyMinutesToday > 0
                ? `${childStats.dailyMinutesTarget - childStats.dailyMinutesToday} minutes remaining to complete today’s CAPS study quota.`
                : '🎉 Daily 45-minute CAPS learning quota successfully completed!'}
            </p>
          </div>
        </div>

        {/* Card 2: Study Streak & Attendance */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-orange-500" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                Attendance & Streak
              </h3>
            </div>
            <span className="text-xs font-mono font-bold text-orange-500">
              100% On-Time
            </span>
          </div>

          <div className="space-y-1">
            <div className="text-2xl font-black font-mono text-slate-900 dark:text-slate-100">
              {childStats.streakDays} Consecutive Days
            </div>
            <p className="text-xs text-slate-500">
              Your child has logged in every school day during Term {childStats.currentTerm}.
            </p>
          </div>

          <div className="pt-2 flex items-center gap-1.5 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Digital attendance confirmed with DBE portal</span>
          </div>
        </div>

        {/* Card 3: 12-Month Academic Lock & December Report Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-teal-600" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                December Report Projection
              </h3>
            </div>
            <span className="text-xs font-mono font-bold text-teal-600">
              Level 7 (Code 7)
            </span>
          </div>

          <div className="space-y-1">
            <div className="text-2xl font-black font-mono text-slate-900 dark:text-slate-100">
              {childStats.term4ProjectedScore}% Projected
            </div>
            <p className="text-xs text-slate-500">
              Term 1: {childStats.term1Score}% · Term 2: {childStats.term2Score}% · Term 3: {childStats.term3Score}%
            </p>
          </div>

          <div className="pt-2 flex items-center justify-between text-[11px]">
            <span className="text-slate-500">Lock Expiry: 10 Dec 2026</span>
            <span className="font-bold text-indigo-600 hover:underline cursor-pointer flex items-center gap-1">
              <Download className="w-3 h-3" /> Term SBA PDF
            </span>
          </div>
        </div>
      </div>

      {/* Daily Parent Sign-Off & Educator Messaging */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Parent Daily Homework Sign-Off (6 Cols) */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Official Daily Homework & Study Sign-Off
              </h3>
              <p className="text-xs text-slate-500">
                Confirm your child’s daily learning to boost your Parent Engagement Score
              </p>
            </div>
            <Award className="w-5 h-5 text-amber-500" />
          </div>

          <div className="space-y-3">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 text-xs space-y-2">
              <div className="flex items-center justify-between font-bold text-slate-800 dark:text-slate-200">
                <span>Today's Completed Subject:</span>
                <span className="text-indigo-600 font-mono">Coding & Robotics (Chapter 1)</span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                Topic: "Algorithmic Thinking & Flowchart Architecture". Completed 1 practice quiz with 100% score and reviewed mother-tongue vocabulary.
              </p>
            </div>

            {signedOffToday ? (
              <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 rounded-xl text-xs font-bold text-emerald-800 dark:text-emerald-200 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  Signed Off & Verified! Your participation has been updated on the Principal's Engagement Board.
                </span>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleSignOff}
                className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Sign Off Today’s Study Session (Confirm 45 Min Quota)</span>
              </button>
            )}
          </div>
        </div>

        {/* Message Educator (6 Cols) */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Direct Note to Grade 7 Subject Educator
            </h3>
            <p className="text-xs text-slate-500">
              Send an inquiry or study note regarding {childStats.learnerNumber}
            </p>
          </div>

          <form onSubmit={handleSendTeacherNote} className="space-y-3">
            <textarea
              rows={3}
              value={parentFeedback}
              onChange={(e) => setParentFeedback(e.target.value)}
              placeholder="e.g. Sipho enjoyed the algorithm chapter today, but wanted extra practice on Python variables..."
              className="w-full p-3 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />

            {feedbackSent && (
              <div className="text-xs text-emerald-600 font-semibold flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Note sent to Mrs. N. Khumalo (HOD Science & Technology).</span>
              </div>
            )}

            <button
              type="submit"
              disabled={!parentFeedback.trim()}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-teal-600 dark:hover:bg-teal-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors disabled:opacity-50 flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Note to Teacher</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
