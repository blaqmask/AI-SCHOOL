import React, { useState } from 'react';
import { GradeLevel } from '../types';
import {
  School,
  Trophy,
  Users,
  Award,
  AlertTriangle,
  HeartHandshake,
  CheckCircle,
  TrendingUp,
  BarChart3,
  Calendar,
  Sparkles,
  ShieldCheck,
  FileSpreadsheet,
} from 'lucide-react';

interface PrincipalDashboardProps {
  schoolName?: string;
  principalName?: string;
  currentTerm?: number;
}

export const PrincipalDashboard: React.FC<PrincipalDashboardProps> = ({
  schoolName = 'Johannesburg STEM Academy',
  principalName = 'Dr. M. Sithole (Principal)',
  currentTerm = 1,
}) => {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'parents' | 'teachers' | 'learners'>('overview');

  // Top Participating Parents Leaderboard
  const TOP_PARENTS = [
    {
      parentNameMasked: 'Mrs. T. D*****i',
      childLearnerNo: 'LRN-2026-7041',
      childGrade: 7,
      signOffCount: 24,
      attendanceRate: '100%',
      engagementScore: 98,
      rank: 1,
      badge: 'Platinum Guardian',
    },
    {
      parentNameMasked: 'Mr. B. M*****u',
      childLearnerNo: 'LRN-2026-8812',
      childGrade: 7,
      signOffCount: 22,
      attendanceRate: '98%',
      engagementScore: 95,
      rank: 2,
      badge: 'Gold Guardian',
    },
    {
      parentNameMasked: 'Ms. K. N*****e',
      childLearnerNo: 'LRN-2026-4401',
      childGrade: 8,
      signOffCount: 21,
      attendanceRate: '96%',
      engagementScore: 93,
      rank: 3,
      badge: 'Gold Guardian',
    },
    {
      parentNameMasked: 'Mr. S. V*****r',
      childLearnerNo: 'LRN-2026-5519',
      childGrade: 10,
      signOffCount: 19,
      attendanceRate: '94%',
      engagementScore: 90,
      rank: 4,
      badge: 'Silver Guardian',
    },
    {
      parentNameMasked: 'Mrs. L. C*****n',
      childLearnerNo: 'LRN-2026-9923',
      childGrade: 11,
      signOffCount: 18,
      attendanceRate: '92%',
      engagementScore: 88,
      rank: 5,
      badge: 'Silver Guardian',
    },
  ];

  // Top Performing Teachers
  const TOP_TEACHERS = [
    {
      name: 'Mrs. N. Khumalo',
      subject: 'Coding & Robotics / Math (Grade 7 & 8)',
      syllabusCompleted: '96%',
      classDaily45mRate: '92%',
      studentPassRate: '98%',
      status: 'Exemplary',
    },
    {
      name: 'Mr. J. Van Der Merwe',
      subject: 'Physical Sciences (Grade 10–12)',
      syllabusCompleted: '94%',
      classDaily45mRate: '88%',
      studentPassRate: '95%',
      status: 'Exemplary',
    },
    {
      name: 'Ms. A. Mthembu',
      subject: 'Natural Sciences (Grade 7–9)',
      syllabusCompleted: '91%',
      classDaily45mRate: '85%',
      studentPassRate: '93%',
      status: 'On-Track',
    },
    {
      name: 'Mr. D. Pillay',
      subject: 'EMS & Business Studies (Grade 7 & 11)',
      syllabusCompleted: '89%',
      classDaily45mRate: '82%',
      studentPassRate: '91%',
      status: 'On-Track',
    },
  ];

  // Top Learners Across School (Anonymized by Learner No.)
  const TOP_SCHOOL_LEARNERS = [
    {
      learnerNumber: 'LRN-2026-7041',
      grade: 7,
      overallScore: 94,
      dailyMinutesAvg: 49,
      streak: 14,
      badges: 6,
    },
    {
      learnerNumber: 'LRN-2026-8812',
      grade: 7,
      overallScore: 91,
      dailyMinutesAvg: 46,
      streak: 12,
      badges: 5,
    },
    {
      learnerNumber: 'LRN-2026-5520',
      grade: 11,
      overallScore: 96,
      dailyMinutesAvg: 52,
      streak: 28,
      badges: 8,
    },
    {
      learnerNumber: 'LRN-2026-4401',
      grade: 8,
      overallScore: 89,
      dailyMinutesAvg: 45,
      streak: 10,
      badges: 4,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Principal Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-800 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs">
              <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/30 font-bold flex items-center gap-1.5">
                <School className="w-3.5 h-3.5" />
                Principal & Institutional Executive Portal
              </span>
              <span className="text-slate-400">·</span>
              <span className="text-slate-300">
                2026 Academic Year · Term {currentTerm}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              {schoolName} Executive Oversight
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Principal: <span className="font-semibold text-white">{principalName}</span>.
              Comprehensive analytics across all Grade 4–12 classes: teacher syllabus pace, student 45-min daily compliance, and parent engagement rankings.
            </p>
          </div>

          <div className="bg-slate-800/90 p-3.5 rounded-xl border border-slate-700/80 flex items-center gap-3 shrink-0">
            <ShieldCheck className="w-6 h-6 text-purple-400 shrink-0" />
            <div className="text-xs">
              <span className="font-bold text-slate-100 block">CAPS DBE Compliant</span>
              <span className="text-slate-400 text-[11px]">
                Anonymized Learner ID Encryption Active
              </span>
            </div>
          </div>
        </div>

        {/* School-Wide Vital KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
            <span className="text-[11px] text-slate-400 block">Enrolled Scholars</span>
            <span className="text-xl font-bold font-mono text-white">418</span>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
            <span className="text-[11px] text-slate-400 block">Daily 45m Adherence</span>
            <span className="text-xl font-bold font-mono text-emerald-400">86.4%</span>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
            <span className="text-[11px] text-slate-400 block">Active Educators</span>
            <span className="text-xl font-bold font-mono text-purple-300">18 Staff</span>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
            <span className="text-[11px] text-slate-400 block">Parent Sign-Off Rate</span>
            <span className="text-xl font-bold font-mono text-amber-400">91.2%</span>
          </div>
        </div>
      </div>

      {/* Segmented Sub-View Navigation */}
      <div className="flex items-center gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs overflow-x-auto">
        <button
          type="button"
          onClick={() => setSelectedTab('overview')}
          className={`px-3.5 py-2 rounded-lg font-bold transition-all ${
            selectedTab === 'overview'
              ? 'bg-white dark:bg-slate-900 text-purple-700 dark:text-purple-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          Executive Overview
        </button>
        <button
          type="button"
          onClick={() => setSelectedTab('parents')}
          className={`px-3.5 py-2 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
            selectedTab === 'parents'
              ? 'bg-white dark:bg-slate-900 text-purple-700 dark:text-purple-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <HeartHandshake className="w-3.5 h-3.5 text-amber-500" />
          <span>Most Participating Parents</span>
        </button>
        <button
          type="button"
          onClick={() => setSelectedTab('teachers')}
          className={`px-3.5 py-2 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
            selectedTab === 'teachers'
              ? 'bg-white dark:bg-slate-900 text-purple-700 dark:text-purple-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <Users className="w-3.5 h-3.5 text-blue-500" />
          <span>Top Performing Teachers</span>
        </button>
        <button
          type="button"
          onClick={() => setSelectedTab('learners')}
          className={`px-3.5 py-2 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
            selectedTab === 'learners'
              ? 'bg-white dark:bg-slate-900 text-purple-700 dark:text-purple-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <Trophy className="w-3.5 h-3.5 text-amber-500" />
          <span>Top Learners (School-Wide)</span>
        </button>
      </div>

      {/* SECTION 1: MOST PARTICIPATING PARENTS LEADERBOARD */}
      {(selectedTab === 'overview' || selectedTab === 'parents') && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <HeartHandshake className="w-5 h-5 text-amber-500" />
                Most Participating Parents Leaderboard (Engagement Index)
              </h3>
              <p className="text-xs text-slate-500">
                Recognizing guardians who actively verify daily 45-min study sessions and communicate with educators
              </p>
            </div>
            <span className="text-xs font-mono text-purple-600 dark:text-purple-400 font-bold">
              Parent Community Index: 91.2%
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 font-mono text-[11px] uppercase border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="py-3 px-3">Rank</th>
                  <th className="py-3 px-3">Parent Name (Masked)</th>
                  <th className="py-3 px-3">Child Learner No.</th>
                  <th className="py-3 px-3">Grade</th>
                  <th className="py-3 px-3">Homework Sign-Offs</th>
                  <th className="py-3 px-3">Attendance Check</th>
                  <th className="py-3 px-3">Guardian Honour</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {TOP_PARENTS.map((parent) => (
                  <tr key={parent.rank} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30">
                    <td className="py-3 px-3 font-mono font-bold">
                      <span className="w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 flex items-center justify-center text-xs">
                        #{parent.rank}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-semibold text-slate-900 dark:text-slate-100">
                      {parent.parentNameMasked}
                    </td>
                    <td className="py-3 px-3 font-mono text-indigo-600 dark:text-indigo-400 font-bold">
                      {parent.childLearnerNo}
                    </td>
                    <td className="py-3 px-3 font-mono">Grade {parent.childGrade}</td>
                    <td className="py-3 px-3 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      {parent.signOffCount} Verified
                    </td>
                    <td className="py-3 px-3 font-mono">{parent.attendanceRate}</td>
                    <td className="py-3 px-3">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300">
                        {parent.badge}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SECTION 2: TOP PERFORMING TEACHERS */}
      {(selectedTab === 'overview' || selectedTab === 'teachers') && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-500" />
                Top Performing Educators (CAPS Syllabus & 45-Min Quota Adherence)
              </h3>
              <p className="text-xs text-slate-500">
                Staff ranked by curriculum pacing and classroom daily engagement
              </p>
            </div>
            <span className="text-xs font-mono text-emerald-600 font-bold">
              100% CAPS Compliant
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {TOP_TEACHERS.map((teacher, i) => (
              <div
                key={i}
                className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                    {teacher.name}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300">
                    {teacher.status}
                  </span>
                </div>
                <div className="text-slate-500">{teacher.subject}</div>

                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 text-center font-mono">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Syllabus</span>
                    <span className="font-bold text-indigo-600 dark:text-indigo-400">
                      {teacher.syllabusCompleted}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">45m Target</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">
                      {teacher.classDaily45mRate}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Pass Rate</span>
                    <span className="font-bold text-purple-600 dark:text-purple-400">
                      {teacher.studentPassRate}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 3: TOP LEARNERS SCHOOL-WIDE */}
      {(selectedTab === 'overview' || selectedTab === 'learners') && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-500" />
                School-Wide Top Achievers (Identified by Anonymous Learner No.)
              </h3>
              <p className="text-xs text-slate-500">
                Highest academic consistency and digital badge achievements
              </p>
            </div>
            <span className="text-xs font-mono text-purple-600 font-bold">
              Term 1 Honor Roll
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {TOP_SCHOOL_LEARNERS.map((learner, i) => (
              <div
                key={i}
                className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/60 text-xs space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-black text-indigo-600 dark:text-indigo-400">
                    {learner.learnerNumber}
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-700">
                    Grade {learner.grade}
                  </span>
                </div>
                <div className="text-2xl font-black font-mono text-slate-900 dark:text-slate-100">
                  {learner.overallScore}%
                </div>
                <div className="text-[11px] text-slate-500 space-y-0.5">
                  <div>Daily Avg: {learner.dailyMinutesAvg} min/day</div>
                  <div>Streak: {learner.streak} days · {learner.badges} Badges</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
