import React, { useState } from 'react';
import { ActiveTab, GradeLevel, SouthAfricanLanguageCode, UserAccount, UserRole } from '../types';
import { LanguageSelector } from './LanguageSelector';
import { AnimeAvatarRenderer } from './AnimeAvatarRenderer';
import {
  Bot,
  User,
  LogOut,
  Award,
  Sparkles,
  ChevronDown,
  LogIn,
  BookOpen,
  Users,
  ShieldCheck,
  School,
  ShieldAlert,
  Lock,
  Layers,
  Flame,
} from 'lucide-react';

interface NavbarProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  onOpenTutor: () => void;
  currentGrade: GradeLevel;
  onSelectGrade: (grade: GradeLevel) => void;
  currentLanguage: SouthAfricanLanguageCode;
  onSelectLanguage: (code: SouthAfricanLanguageCode) => void;
  user: UserAccount | null;
  onOpenAuth: (mode?: 'login' | 'register') => void;
  onOpenAvatarStudio: () => void;
  onLogout: () => void;
  activeRolePreview?: UserRole;
  onSelectRolePreview?: (role: UserRole) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  onOpenTutor,
  currentGrade,
  onSelectGrade,
  currentLanguage,
  onSelectLanguage,
  user,
  onOpenAuth,
  onOpenAvatarStudio,
  onLogout,
  activeRolePreview = 'learner',
  onSelectRolePreview,
}) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isDashboardsOpen, setIsDashboardsOpen] = useState(false);

  const learnerGrade = user?.grade || currentGrade;
  const learnerNumber = user?.learnerNumber || 'LRN-2026-7041';

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Wordmark & Grade Lock Badge */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => onSelectTab('curriculum')}
            className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-slate-100 whitespace-nowrap hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <span className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
              F
            </span>
            <span>FUNDAI</span>
          </button>

          {/* 12-Month Grade Lock Badge */}
          <div
            title="12-Month Academic Lock (Jan Reopening to Dec Report Collection)"
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[11px] font-mono text-slate-700 dark:text-slate-300"
          >
            <Lock className="w-3 h-3 text-amber-500 shrink-0" />
            <span className="font-bold">Grade {learnerGrade}</span>
            <span className="text-[10px] text-slate-400">· 12M Lock</span>
          </div>
        </div>

        {/* Zone 2: Navigation Links (Careers Removed, CAPS Books Added) */}
        <nav className="hidden md:flex items-center gap-5 lg:gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
          <button
            type="button"
            onClick={() => onSelectTab('curriculum')}
            className={`whitespace-nowrap shrink-0 transition-colors ${
              activeTab === 'curriculum'
                ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
                : 'hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Curriculum
          </button>

          {/* CAPS Digital Books Tab */}
          <button
            type="button"
            onClick={() => onSelectTab('textbook')}
            className={`whitespace-nowrap shrink-0 transition-colors flex items-center gap-1.5 ${
              activeTab === 'textbook'
                ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
                : 'hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
            <span>Digital Books</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectTab('labs')}
            className={`whitespace-nowrap shrink-0 transition-colors ${
              activeTab === 'labs'
                ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
                : 'hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            AI Labs
          </button>

          <button
            type="button"
            onClick={() => onSelectTab('multi-subject')}
            className={`whitespace-nowrap shrink-0 transition-colors ${
              activeTab === 'multi-subject'
                ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
                : 'hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Subjects
          </button>

          <button
            type="button"
            onClick={() => onSelectTab('achievements')}
            className={`whitespace-nowrap shrink-0 transition-colors flex items-center gap-1.5 ${
              activeTab === 'achievements'
                ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
                : 'hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-amber-500" />
            <span>Badges</span>
          </button>

          {/* Dashboards Dropdown (Learner, Teacher, Parent, Principal, Master Admin) */}
          <div className="relative inline-block text-left">
            <button
              type="button"
              onClick={() => setIsDashboardsOpen(!isDashboardsOpen)}
              className={`whitespace-nowrap shrink-0 transition-colors flex items-center gap-1 py-1 px-2 rounded-lg ${
                [
                  'classroom',
                  'parent-portal',
                  'principal-portal',
                  'master-admin',
                ].includes(activeTab)
                  ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 font-semibold'
                  : 'hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Portals</span>
              <ChevronDown className="w-3 h-3 ml-0.5" />
            </button>

            {isDashboardsOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsDashboardsOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl z-50 p-2 text-xs divide-y divide-slate-100 dark:divide-slate-800">
                  <div className="py-1">
                    <button
                      type="button"
                      onClick={() => {
                        setIsDashboardsOpen(false);
                        onSelectTab('curriculum');
                      }}
                      className="w-full text-left p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium"
                    >
                      <User className="w-3.5 h-3.5 text-indigo-500" />
                      <span>Learner Dashboard</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsDashboardsOpen(false);
                        onSelectTab('classroom');
                      }}
                      className="w-full text-left p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium"
                    >
                      <Users className="w-3.5 h-3.5 text-blue-500" />
                      <span>Teacher Classroom</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsDashboardsOpen(false);
                        onSelectTab('parent-portal');
                      }}
                      className="w-full text-left p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-teal-500" />
                      <span>Parent & Guardian Portal</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsDashboardsOpen(false);
                        onSelectTab('principal-portal');
                      }}
                      className="w-full text-left p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium"
                    >
                      <School className="w-3.5 h-3.5 text-purple-500" />
                      <span>Principal Dashboard</span>
                    </button>
                  </div>
                  <div className="pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        setIsDashboardsOpen(false);
                        onSelectTab('master-admin');
                      }}
                      className="w-full text-left p-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold"
                    >
                      <ShieldAlert className="w-3.5 h-3.5" />
                      <span>Master Admin (Invite)</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </nav>

        {/* Zone 3: Language Selector + Ask Fundi + User Account */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* SA Language Selector */}
          <LanguageSelector
            currentLanguage={currentLanguage}
            onSelectLanguage={onSelectLanguage}
          />

          {/* Ask Fundi AI Button */}
          <button
            type="button"
            onClick={onOpenTutor}
            className="hidden sm:flex px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-all whitespace-nowrap shrink-0 items-center gap-1.5"
          >
            <Bot className="w-3.5 h-3.5" />
            <span>Ask Fundi</span>
          </button>

          {/* User Account / Avatar Dropdown or Login Button */}
          {user ? (
            <div className="relative inline-block text-left">
              <button
                type="button"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 p-1 pl-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 transition-all shadow-sm"
              >
                <AnimeAvatarRenderer avatar={user.avatar} size="xs" />
                <span className="hidden sm:inline text-xs font-bold text-slate-800 dark:text-slate-200 max-w-[90px] truncate">
                  {user.fullName.split(' ')[0]}
                </span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {isUserMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsUserMenuOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl z-50 p-2 text-xs divide-y divide-slate-100 dark:divide-slate-800">
                    <div className="p-3 space-y-1">
                      <div className="flex items-center gap-2.5">
                        <AnimeAvatarRenderer avatar={user.avatar} size="sm" />
                        <div className="overflow-hidden">
                          <span className="font-bold text-slate-900 dark:text-slate-100 block truncate">
                            {user.fullName}
                          </span>
                          <span className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400 font-bold block truncate">
                            {learnerNumber}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-2 text-[11px] font-mono">
                        <span className="text-slate-500">Grade {user.grade} (12M Lock)</span>
                        <span className="text-amber-600 dark:text-amber-400 font-bold">
                          {user.totalXP} XP
                        </span>
                      </div>
                    </div>

                    <div className="py-1">
                      <button
                        type="button"
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          onOpenAvatarStudio();
                        }}
                        className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 text-slate-700 dark:text-slate-200 font-medium transition-colors"
                      >
                        <Sparkles className="w-4 h-4 text-indigo-500" />
                        <span>Customize Anime Avatar</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          onSelectTab('achievements');
                        }}
                        className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 text-slate-700 dark:text-slate-200 font-medium transition-colors"
                      >
                        <Award className="w-4 h-4 text-amber-500" />
                        <span>My Learning Badges</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          onSelectTab('master-admin');
                        }}
                        className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold transition-colors"
                      >
                        <ShieldAlert className="w-4 h-4" />
                        <span>Master Admin (nthabiso019)</span>
                      </button>
                    </div>

                    <div className="pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          onLogout();
                        }}
                        className="w-full text-left p-2.5 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-600 dark:text-rose-400 flex items-center gap-2 font-medium transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Log Out</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => onOpenAuth('login')}
                className="px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-slate-900 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 rounded-lg transition-colors"
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => onOpenAuth('register')}
                className="px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-all whitespace-nowrap"
              >
                Register
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Nav Strip */}
      <div className="md:hidden flex items-center justify-between border-t border-slate-200 dark:border-slate-800 py-2 px-3 text-[11px] bg-slate-50 dark:bg-slate-900 overflow-x-auto gap-2">
        <button
          type="button"
          onClick={() => onSelectTab('curriculum')}
          className={`py-1 px-2 whitespace-nowrap rounded font-medium ${
            activeTab === 'curriculum' ? 'text-indigo-600 font-bold' : 'text-slate-500'
          }`}
        >
          Curriculum
        </button>
        <button
          type="button"
          onClick={() => onSelectTab('textbook')}
          className={`py-1 px-2 whitespace-nowrap rounded font-medium ${
            activeTab === 'textbook' ? 'text-indigo-600 font-bold' : 'text-slate-500'
          }`}
        >
          Books
        </button>
        <button
          type="button"
          onClick={() => onSelectTab('labs')}
          className={`py-1 px-2 whitespace-nowrap rounded font-medium ${
            activeTab === 'labs' ? 'text-indigo-600 font-bold' : 'text-slate-500'
          }`}
        >
          AI Labs
        </button>
        <button
          type="button"
          onClick={() => onSelectTab('classroom')}
          className={`py-1 px-2 whitespace-nowrap rounded font-medium ${
            activeTab === 'classroom' ? 'text-indigo-600 font-bold' : 'text-slate-500'
          }`}
        >
          Teacher
        </button>
        <button
          type="button"
          onClick={() => onSelectTab('parent-portal')}
          className={`py-1 px-2 whitespace-nowrap rounded font-medium ${
            activeTab === 'parent-portal' ? 'text-indigo-600 font-bold' : 'text-slate-500'
          }`}
        >
          Parent
        </button>
        <button
          type="button"
          onClick={() => onSelectTab('principal-portal')}
          className={`py-1 px-2 whitespace-nowrap rounded font-medium ${
            activeTab === 'principal-portal' ? 'text-indigo-600 font-bold' : 'text-slate-500'
          }`}
        >
          Principal
        </button>
      </div>
    </header>
  );
};
