import React, { useState } from 'react';
import { GradeLevel, ClassroomLearnerRecord, AnimeAvatarConfig } from '../types';
import { AnimeAvatarRenderer } from './AnimeAvatarRenderer';
import {
  Users,
  Trophy,
  AlertTriangle,
  Clock,
  CheckCircle,
  Search,
  Filter,
  Flame,
  FileCheck,
  Send,
  Sparkles,
  ShieldCheck,
  Lock,
} from 'lucide-react';

interface TeacherDashboardProps {
  currentGrade: GradeLevel;
  teacherName?: string;
  assignedSubject?: string;
}

// Demo classroom with POPIA-compliant anonymous Learner Numbers
const INITIAL_CLASSROOM_LEARNERS: ClassroomLearnerRecord[] = [
  {
    learnerNumber: 'LRN-2026-7041',
    grade: 7,
    dailyMinutesToday: 48,
    dailyTargetMet: true,
    studyStreakDays: 14,
    termAvgScore: 92,
    term1Score: 90,
    term2Score: 94,
    term3Score: 91,
    term4ProjectedScore: 93,
    status: 'top-performer',
    lastActive: '12 mins ago',
    parentEmailMasked: 'p*****1@joburgmail.co.za',
    parentSignOffCount: 18,
    avatar: {
      genderStyle: 'anime-boy',
      skinTone: '#a16207',
      hairStyle: 'afro-puff',
      hairColor: '#171717',
      eyeExpression: 'sparkle',
      eyeColor: '#451a03',
      clothing: 'school-blazer',
      clothingColor: '#1e3a8a',
      accessory: 'hacker-headphones',
      auraEffect: 'azure-cyber',
    },
  },
  {
    learnerNumber: 'LRN-2026-8812',
    grade: 7,
    dailyMinutesToday: 45,
    dailyTargetMet: true,
    studyStreakDays: 12,
    termAvgScore: 89,
    term1Score: 88,
    term2Score: 90,
    term3Score: 87,
    term4ProjectedScore: 91,
    status: 'top-performer',
    lastActive: '25 mins ago',
    parentEmailMasked: 's*****m@telkomsa.net',
    parentSignOffCount: 15,
    avatar: {
      genderStyle: 'anime-girl',
      skinTone: '#78350f',
      hairStyle: 'braids',
      hairColor: '#171717',
      eyeExpression: 'determined',
      eyeColor: '#047857',
      clothing: 'shweshwe-tech',
      clothingColor: '#0284c7',
      accessory: 'smart-glasses',
      auraEffect: 'matrix-green',
    },
  },
  {
    learnerNumber: 'LRN-2026-3390',
    grade: 7,
    dailyMinutesToday: 38,
    dailyTargetMet: false,
    studyStreakDays: 6,
    termAvgScore: 78,
    term1Score: 75,
    term2Score: 80,
    term3Score: 77,
    term4ProjectedScore: 79,
    status: 'on-track',
    lastActive: '1 hour ago',
    parentEmailMasked: 'k*****o@vodamail.co.za',
    parentSignOffCount: 11,
    avatar: {
      genderStyle: 'cyber-neutral',
      skinTone: '#d97706',
      hairStyle: 'short-cyber',
      hairColor: '#4338ca',
      eyeExpression: 'analytical',
      eyeColor: '#1e40af',
      clothing: 'cyber-hoodie',
      clothingColor: '#312e81',
      accessory: 'cyber-visor',
      auraEffect: 'neon-violet',
    },
  },
  {
    learnerNumber: 'LRN-2026-1145',
    grade: 7,
    dailyMinutesToday: 12,
    dailyTargetMet: false,
    studyStreakDays: 1,
    termAvgScore: 48,
    term1Score: 45,
    term2Score: 50,
    term3Score: 47,
    term4ProjectedScore: 52,
    status: 'struggling',
    strugglingTopic: 'Integer Operations & Algorithmic Loops (Chapter 1)',
    lastActive: '2 days ago',
    parentEmailMasked: 'd*****z@gmail.com',
    parentSignOffCount: 3,
    avatar: {
      genderStyle: 'anime-boy',
      skinTone: '#451a03',
      hairStyle: 'dreadlocks',
      hairColor: '#171717',
      eyeExpression: 'cool',
      eyeColor: '#78350f',
      clothing: 'school-blazer',
      clothingColor: '#1e3a8a',
      accessory: 'none',
      auraEffect: 'none',
    },
  },
  {
    learnerNumber: 'LRN-2026-4920',
    grade: 7,
    dailyMinutesToday: 8,
    dailyTargetMet: false,
    studyStreakDays: 0,
    termAvgScore: 42,
    term1Score: 40,
    term2Score: 44,
    term3Score: 41,
    term4ProjectedScore: 46,
    status: 'intervention-needed',
    strugglingTopic: 'Microcontroller Sensor Logic & Fractions',
    lastActive: 'Yesterday',
    parentEmailMasked: 'm*****t@mtn.co.za',
    parentSignOffCount: 1,
    avatar: {
      genderStyle: 'anime-girl',
      skinTone: '#b45309',
      hairStyle: 'afro-puff',
      hairColor: '#312e81',
      eyeExpression: 'friendly',
      eyeColor: '#1e3a8a',
      clothing: 'gamer-jersey',
      clothingColor: '#9333ea',
      accessory: 'african-bead-collar',
      auraEffect: 'solar-gold',
    },
  },
];

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  currentGrade,
  teacherName = 'Mrs. N. Khumalo (HOD Science & Technology)',
  assignedSubject = 'Grade 7 · Coding & Mathematics',
}) => {
  const [learners, setLearners] = useState<ClassroomLearnerRecord[]>(INITIAL_CLASSROOM_LEARNERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [interventionNotice, setInterventionNotice] = useState<string | null>(null);

  const topLearners = learners.filter((l) => l.status === 'top-performer');
  const strugglingLearners = learners.filter(
    (l) => l.status === 'struggling' || l.status === 'intervention-needed'
  );

  const filteredLearners = learners.filter((l) => {
    const matchesSearch = l.learnerNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || l.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleSendIntervention = (learnerNumber: string) => {
    setInterventionNotice(
      `Intervention lesson module & SMS study notice successfully dispatched to Parent of ${learnerNumber}.`
    );
    setTimeout(() => setInterventionNotice(null), 4000);
  };

  return (
    <div className="space-y-8">
      {/* Teacher Classroom Header */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-800 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs">
              <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 font-bold flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" />
                Teacher Classroom Portal
              </span>
              <span className="text-slate-400">·</span>
              <span className="text-slate-300 font-mono">{assignedSubject}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Classroom Performance & Intervention Hub
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Educator: <span className="font-semibold text-white">{teacherName}</span>.
              Real-time monitoring of daily 45-minute CAPS learning targets, top achievers, and targeted interventions.
            </p>
          </div>

          {/* POPIA Privacy Badge */}
          <div className="bg-slate-800/90 p-3.5 rounded-xl border border-slate-700/80 flex items-center gap-3 shrink-0">
            <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
            <div className="text-xs">
              <span className="font-bold text-slate-100 block">POPIA Child Privacy Active</span>
              <span className="text-slate-400 text-[11px]">
                Identified strictly by Learner No. (No real names)
              </span>
            </div>
          </div>
        </div>

        {/* Quick Classroom KPI Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
            <span className="text-[11px] text-slate-400 block">Enrolled Learners</span>
            <span className="text-xl font-bold font-mono text-white">{learners.length}</span>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
            <span className="text-[11px] text-slate-400 block">Daily 45m Target Met</span>
            <span className="text-xl font-bold font-mono text-emerald-400">
              {learners.filter((l) => l.dailyTargetMet).length} / {learners.length}
            </span>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
            <span className="text-[11px] text-slate-400 block">Class SBA Average</span>
            <span className="text-xl font-bold font-mono text-indigo-300">
              {Math.round(learners.reduce((acc, l) => acc + l.termAvgScore, 0) / learners.length)}%
            </span>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
            <span className="text-[11px] text-slate-400 block">Needs Intervention</span>
            <span className="text-xl font-bold font-mono text-amber-400">
              {strugglingLearners.length}
            </span>
          </div>
        </div>
      </div>

      {interventionNotice && (
        <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 rounded-xl text-xs font-semibold text-emerald-800 dark:text-emerald-200 flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span>{interventionNotice}</span>
        </div>
      )}

      {/* Two Column Layout: Top Learners & Struggling Learners */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Top Performers (6 Cols) */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-500" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                Top Performing Learners
              </h3>
            </div>
            <span className="text-xs font-mono text-emerald-600 font-bold">
              Consistently &gt; 45 mins/day
            </span>
          </div>

          <div className="space-y-3">
            {topLearners.map((learner, idx) => (
              <div
                key={learner.learnerNumber}
                className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 font-bold text-xs flex items-center justify-center font-mono">
                    #{idx + 1}
                  </span>
                  <AnimeAvatarRenderer avatar={learner.avatar} size="xs" />
                  <div>
                    <span className="text-xs font-bold font-mono text-slate-900 dark:text-slate-100 block">
                      {learner.learnerNumber}
                    </span>
                    <span className="text-[11px] text-slate-500 flex items-center gap-1.5">
                      <Flame className="w-3 h-3 text-orange-500" />
                      {learner.studyStreakDays} Day Streak · Active {learner.lastActive}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 block font-mono">
                    {learner.termAvgScore}% Average
                  </span>
                  <span className="text-[10px] text-slate-400">
                    Today: {learner.dailyMinutesToday} / 45m
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Struggling Learners Alert (6 Cols) */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-500" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                Intervention Needed (Struggling Learners)
              </h3>
            </div>
            <span className="text-xs font-mono text-rose-600 font-bold">
              Action Required
            </span>
          </div>

          <div className="space-y-3">
            {strugglingLearners.map((learner) => (
              <div
                key={learner.learnerNumber}
                className="p-3.5 bg-rose-50/50 dark:bg-rose-950/20 rounded-xl border border-rose-200 dark:border-rose-900/40 space-y-2.5"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <AnimeAvatarRenderer avatar={learner.avatar} size="xs" />
                    <div>
                      <span className="text-xs font-bold font-mono text-slate-900 dark:text-slate-100 block">
                        {learner.learnerNumber}
                      </span>
                      <span className="text-[11px] text-rose-600 dark:text-rose-400 font-semibold">
                        Today: {learner.dailyMinutesToday} / 45 mins · Score: {learner.termAvgScore}%
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleSendIntervention(learner.learnerNumber)}
                    className="px-2.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-[11px] font-semibold rounded-lg shadow-xs transition-colors flex items-center gap-1 shrink-0"
                  >
                    <Send className="w-3 h-3" />
                    <span>Send Support</span>
                  </button>
                </div>

                {learner.strugglingTopic && (
                  <div className="text-[11px] bg-white dark:bg-slate-900 p-2 rounded-lg border border-rose-100 dark:border-rose-950 text-slate-700 dark:text-slate-300">
                    <span className="font-bold text-rose-700 dark:text-rose-400">Focus Gap: </span>
                    <span>{learner.strugglingTopic}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Full Classroom Roster Table with Daily 45-Min Tracker */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Grade {currentGrade} Learner Roster & Daily 45-Min Progress
            </h3>
            <p className="text-xs text-slate-500">
              Complies with DBE & POPIA student data protection laws
            </p>
          </div>

          {/* Search & Filter */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                placeholder="Search Learner No..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="py-1.5 px-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
            >
              <option value="all">All Statuses</option>
              <option value="top-performer">Top Performers</option>
              <option value="on-track">On Track</option>
              <option value="struggling">Struggling</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 font-mono text-[11px] uppercase border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3 px-3">Learner ID (POPIA)</th>
                <th className="py-3 px-3">Daily 45-Min Goal</th>
                <th className="py-3 px-3">Study Streak</th>
                <th className="py-3 px-3">Term 1 (SBA)</th>
                <th className="py-3 px-3">Term 2 (SBA)</th>
                <th className="py-3 px-3">Dec Projection</th>
                <th className="py-3 px-3">Parent Sign-Offs</th>
                <th className="py-3 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredLearners.map((l) => (
                <tr key={l.learnerNumber} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <AnimeAvatarRenderer avatar={l.avatar} size="xs" />
                      <span className="font-bold font-mono text-slate-900 dark:text-slate-100">
                        {l.learnerNumber}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between font-mono text-[10px]">
                        <span className={l.dailyTargetMet ? 'text-emerald-600 font-bold' : 'text-slate-600'}>
                          {l.dailyMinutesToday} / 45m
                        </span>
                        <span>{Math.round((l.dailyMinutesToday / 45) * 100)}%</span>
                      </div>
                      <div className="w-24 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            l.dailyTargetMet ? 'bg-emerald-500' : 'bg-indigo-500'
                          }`}
                          style={{ width: `${Math.min(100, (l.dailyMinutesToday / 45) * 100)}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3 font-mono">
                    <span className="flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-300">
                      <Flame className="w-3.5 h-3.5 text-orange-500" />
                      {l.studyStreakDays} days
                    </span>
                  </td>
                  <td className="py-3 px-3 font-mono">{l.term1Score}%</td>
                  <td className="py-3 px-3 font-mono">{l.term2Score}%</td>
                  <td className="py-3 px-3 font-mono font-bold text-indigo-600 dark:text-indigo-400">
                    {l.term4ProjectedScore}%
                  </td>
                  <td className="py-3 px-3 font-mono text-slate-500">
                    {l.parentSignOffCount} verified
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        l.status === 'top-performer'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                          : l.status === 'on-track'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300'
                          : 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                      }`}
                    >
                      {l.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
