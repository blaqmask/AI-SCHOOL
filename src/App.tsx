import React, { useState, useEffect } from 'react';
import {
  GradeLevel,
  StageId,
  ActiveTab,
  CurriculumModule,
  CapstoneProject,
  LabType,
  SouthAfricanLanguageCode,
  SubjectTrack,
  UserAccount,
  AnimeAvatarConfig,
  UserRole,
} from './types';
import {
  LEARNING_STAGES,
  CURRICULUM_MODULES,
  INITIAL_CAPSTONE_PROJECTS,
} from './data/curriculumData';
import { SA_LANGUAGES } from './data/saLanguages';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { StageNavigator } from './components/StageNavigator';
import { StudentDashboard } from './components/StudentDashboard';
import { LessonViewer } from './components/LessonViewer';
import { LabsHub } from './components/LabsHub';
import { MultiSubjectHelper } from './components/MultiSubjectHelper';
import { CapsBookReader } from './components/CapsBookReader';
import { TeacherDashboard } from './components/TeacherDashboard';
import { ParentDashboard } from './components/ParentDashboard';
import { PrincipalDashboard } from './components/PrincipalDashboard';
import { MasterAdminPortal } from './components/MasterAdminPortal';
import { CapstonePortfolio } from './components/CapstonePortfolio';
import { AiTutorModal } from './components/AiTutorModal';
import { AchievementsBadgesView } from './components/AchievementsBadgesView';
import { AuthModal } from './components/AuthModal';
import { AnimeAvatarStudioModal } from './components/AnimeAvatarStudioModal';
import { DEFAULT_ANIME_AVATAR } from './components/AnimeAvatarRenderer';
import { Bot, Sparkles, BookOpen, Wifi, WifiOff } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('curriculum');
  const [currentGrade, setCurrentGrade] = useState<GradeLevel>(7);
  const [activeStageId, setActiveStageId] = useState<StageId>(2);
  const [selectedModule, setSelectedModule] = useState<CurriculumModule | null>(null);
  const [activeLabType, setActiveLabType] = useState<LabType>('prompt-studio');
  const [isTutorOpen, setIsTutorOpen] = useState(false);
  const [tutorSubject, setTutorSubject] = useState<SubjectTrack>('ai-digital');
  const [isOfflineMode, setIsOfflineMode] = useState<boolean>(false);

  // Authentication & User State
  const [user, setUser] = useState<UserAccount | null>(() => {
    try {
      const savedUser = localStorage.getItem('fundai_user');
      if (savedUser) {
        return JSON.parse(savedUser);
      }
      return null;
    } catch {
      return null;
    }
  });

  const [sessionToken, setSessionToken] = useState<string>(() => {
    try {
      return localStorage.getItem('fundai_session_token') || '';
    } catch {
      return '';
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');
  const [isAvatarStudioOpen, setIsAvatarStudioOpen] = useState(false);
  const [isInitialAvatarSetup, setIsInitialAvatarSetup] = useState(false);

  // South African Language State
  const [currentLanguage, setCurrentLanguage] = useState<SouthAfricanLanguageCode>(() => {
    try {
      const saved = localStorage.getItem('fundai_sa_language');
      return (saved as SouthAfricanLanguageCode) || user?.preferredLanguage || 'zu';
    } catch {
      return 'zu';
    }
  });

  // Completed modules tracking
  const [completedModuleIds, setCompletedModuleIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('fundai_completed_modules');
      return saved ? JSON.parse(saved) : user?.completedModuleIds || ['m01', 'm02'];
    } catch {
      return ['m01', 'm02'];
    }
  });

  // Capstone projects
  const [projects, setProjects] = useState<CapstoneProject[]>(() => {
    try {
      const saved = localStorage.getItem('fundai_projects');
      return saved ? JSON.parse(saved) : INITIAL_CAPSTONE_PROJECTS;
    } catch {
      return INITIAL_CAPSTONE_PROJECTS;
    }
  });

  // Sync language to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('fundai_sa_language', currentLanguage);
    } catch (e) {
      console.warn(e);
    }
  }, [currentLanguage]);

  // Sync user to localStorage
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('fundai_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('fundai_user');
      }
    } catch (e) {
      console.warn(e);
    }
  }, [user]);

  // Sync completed modules to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('fundai_completed_modules', JSON.stringify(completedModuleIds));
    } catch (e) {
      console.warn(e);
    }
  }, [completedModuleIds]);

  // Sync projects to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('fundai_projects', JSON.stringify(projects));
    } catch (e) {
      console.warn(e);
    }
  }, [projects]);

  // Online / Offline window events
  useEffect(() => {
    const handleOnline = () => setIsOfflineMode(false);
    const handleOffline = () => setIsOfflineMode(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Update active stage whenever grade changes
  const handleSelectGrade = (newGrade: GradeLevel) => {
    setCurrentGrade(newGrade);
    const matchingStage = LEARNING_STAGES.find(
      (s) => newGrade >= s.gradeRange[0] && newGrade <= s.gradeRange[1]
    );
    if (matchingStage) {
      setActiveStageId(matchingStage.id);
    }
  };

  // Record daily study minutes (45 min target)
  const handleRecordStudyMinutes = async (minutes: number) => {
    if (!user) return;
    const newMinutes = (user.dailyMinutesCompleted || 0) + minutes;
    const updatedUser: UserAccount = {
      ...user,
      dailyMinutesCompleted: newMinutes,
    };
    setUser(updatedUser);

    // Sync with backend
    try {
      await fetch('/api/user/study-time', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionToken}`,
        },
        body: JSON.stringify({ minutesAdded: minutes }),
      });
    } catch (err) {
      // Offline fallback
      console.warn('Study time recorded locally (offline mode):', err);
    }
  };

  const handleCompleteLesson = (moduleId: string) => {
    if (!completedModuleIds.includes(moduleId)) {
      const updated = [...completedModuleIds, moduleId];
      setCompletedModuleIds(updated);

      if (user) {
        const earnedBadges = [...user.earnedBadgeIds];
        let addedXP = 150;

        if (updated.length >= 2 && !earnedBadges.includes('badge-prompt-master')) {
          earnedBadges.push('badge-prompt-master');
          addedXP += 250;
        }
        if (updated.length >= 3 && !earnedBadges.includes('badge-data-detective')) {
          earnedBadges.push('badge-data-detective');
          addedXP += 300;
        }
        if (updated.length >= 5 && !earnedBadges.includes('badge-neural-architect')) {
          earnedBadges.push('badge-neural-architect');
          addedXP += 500;
        }

        const updatedUser: UserAccount = {
          ...user,
          completedModuleIds: updated,
          earnedBadgeIds: earnedBadges,
          totalXP: user.totalXP + addedXP,
          dailyMinutesCompleted: Math.min(45, user.dailyMinutesCompleted + 15),
        };
        setUser(updatedUser);
      }
    }
    setSelectedModule(null);
  };

  const handleOpenLab = (labType: LabType) => {
    setActiveLabType(labType);
    setActiveTab('labs');
    setSelectedModule(null);
  };

  const handleAddProject = (newProject: CapstoneProject) => {
    setProjects((prev) => [newProject, ...prev]);
    if (user && !user.earnedBadgeIds.includes('badge-capstone-inventor')) {
      setUser({
        ...user,
        earnedBadgeIds: [...user.earnedBadgeIds, 'badge-capstone-inventor'],
        totalXP: user.totalXP + 750,
      });
    }
  };

  // Auth Handlers
  const handleAuthSuccess = (
    authenticatedUser: UserAccount,
    token: string,
    requiresAvatarSetup: boolean
  ) => {
    setUser(authenticatedUser);
    setSessionToken(token);
    try {
      localStorage.setItem('fundai_session_token', token);
      localStorage.setItem('fundai_user', JSON.stringify(authenticatedUser));
    } catch (e) {
      console.warn(e);
    }

    if (authenticatedUser.grade) {
      handleSelectGrade(authenticatedUser.grade);
    }
    if (authenticatedUser.preferredLanguage) {
      setCurrentLanguage(authenticatedUser.preferredLanguage);
    }
    if (authenticatedUser.completedModuleIds) {
      setCompletedModuleIds(authenticatedUser.completedModuleIds);
    }

    setIsAuthModalOpen(false);

    if (requiresAvatarSetup) {
      setIsInitialAvatarSetup(true);
      setIsAvatarStudioOpen(true);
    }
  };

  const handleLogout = async () => {
    try {
      if (sessionToken) {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionToken}`,
          },
        });
      }
    } catch (e) {
      console.warn('Logout notification error:', e);
    }
    setUser(null);
    setSessionToken('');
    try {
      localStorage.removeItem('fundai_user');
      localStorage.removeItem('fundai_session_token');
    } catch (e) {
      console.warn(e);
    }
  };

  const handleSaveAvatar = async (newAvatar: AnimeAvatarConfig) => {
    if (!user) return;
    const updatedUser: UserAccount = {
      ...user,
      avatar: newAvatar,
    };
    setUser(updatedUser);
    setIsAvatarStudioOpen(false);
    setIsInitialAvatarSetup(false);

    try {
      await fetch('/api/user/avatar', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionToken}`,
        },
        body: JSON.stringify({
          avatar: newAvatar,
          email: user.email,
        }),
      });
    } catch (e) {
      console.warn('Backend avatar sync error:', e);
    }
  };

  const activeLangObj =
    SA_LANGUAGES.find((l) => l.code === currentLanguage) || SA_LANGUAGES[0];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
      {/* Top Bar Contract (3-Zones) */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          setSelectedModule(null);
        }}
        onOpenTutor={() => {
          setTutorSubject('ai-digital');
          setIsTutorOpen(true);
        }}
        currentGrade={currentGrade}
        onSelectGrade={handleSelectGrade}
        currentLanguage={currentLanguage}
        onSelectLanguage={setCurrentLanguage}
        user={user}
        onOpenAuth={(mode) => {
          setAuthModalMode(mode || 'login');
          setIsAuthModalOpen(true);
        }}
        onOpenAvatarStudio={() => {
          setIsInitialAvatarSetup(false);
          setIsAvatarStudioOpen(true);
        }}
        onLogout={handleLogout}
        onSelectRolePreview={(role) => {
          if (role === 'learner') setActiveTab('curriculum');
          if (role === 'teacher') setActiveTab('classroom');
          if (role === 'parent') setActiveTab('parent-portal');
          if (role === 'principal') setActiveTab('principal-portal');
          if (role === 'master_admin') setActiveTab('master-admin');
        }}
      />

      {/* Offline Mode Banner & Simulation Toggle */}
      <div className="bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-1.5 px-4 text-xs flex items-center justify-between">
        <div className="flex items-center gap-2">
          {isOfflineMode ? (
            <span className="text-amber-600 dark:text-amber-400 font-bold flex items-center gap-1.5">
              <WifiOff className="w-3.5 h-3.5" />
              Offline Study Mode Active · Learning from Local Storage Cache (Zero Data Used)
            </span>
          ) : (
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
              <Wifi className="w-3.5 h-3.5" />
              Connected · Syncing SBA Marks & Daily 45m Study Log
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={() => setIsOfflineMode(!isOfflineMode)}
          className="text-[11px] font-mono text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 underline"
        >
          {isOfflineMode ? 'Switch to Online Mode' : 'Simulate Offline Mode'}
        </button>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* If viewing a single lesson module */}
        {selectedModule ? (
          <LessonViewer
            module={selectedModule}
            grade={currentGrade}
            onCompleteLesson={handleCompleteLesson}
            isCompleted={completedModuleIds.includes(selectedModule.id)}
            onOpenLab={handleOpenLab}
            onBack={() => setSelectedModule(null)}
          />
        ) : (
          <>
            {/* TAB 1: CURRICULUM & LEARNER DASHBOARD */}
            {activeTab === 'curriculum' && (
              <div className="space-y-12">
                <HeroSection
                  currentGrade={currentGrade}
                  onSelectGrade={handleSelectGrade}
                  onStartLearning={() => {
                    const stageModules = CURRICULUM_MODULES.filter(
                      (m) => m.stageId === activeStageId
                    );
                    if (stageModules.length > 0) {
                      setSelectedModule(stageModules[0]);
                    }
                  }}
                  onExploreLabs={() => setActiveTab('labs')}
                />

                <StudentDashboard
                  currentGrade={currentGrade}
                  stages={LEARNING_STAGES}
                  modules={CURRICULUM_MODULES}
                  completedModuleIds={completedModuleIds}
                  user={user}
                  onSelectModule={(mod) => setSelectedModule(mod)}
                  onOpenLab={handleOpenLab}
                  onOpenTutor={() => setIsTutorOpen(true)}
                  onOpenAvatarStudio={() => {
                    setIsInitialAvatarSetup(false);
                    setIsAvatarStudioOpen(true);
                  }}
                  onOpenAchievements={() => setActiveTab('achievements')}
                  onOpenBooks={() => setActiveTab('textbook')}
                  onIncrementMinutes={(m) => handleRecordStudyMinutes(m)}
                />

                <StageNavigator
                  stages={LEARNING_STAGES}
                  modules={CURRICULUM_MODULES}
                  activeStageId={activeStageId}
                  onSelectStage={setActiveStageId}
                  onSelectModule={(mod) => setSelectedModule(mod)}
                  completedModuleIds={completedModuleIds}
                  currentGrade={currentGrade}
                  onOpenLab={handleOpenLab}
                />
              </div>
            )}

            {/* TAB 2: CAPS DIGITAL SUBJECT BOOKS */}
            {activeTab === 'textbook' && (
              <CapsBookReader
                currentGrade={currentGrade}
                user={user}
                currentLanguage={currentLanguage}
                onRecordStudyMinutes={handleRecordStudyMinutes}
                onOpenTutorWithContext={(subj, topic) => {
                  setTutorSubject('ai-digital');
                  setIsTutorOpen(true);
                }}
                isOfflineMode={isOfflineMode}
              />
            )}

            {/* TAB 3: INTERACTIVE AI LABS */}
            {activeTab === 'labs' && (
              <LabsHub grade={currentGrade} initialLab={activeLabType} />
            )}

            {/* TAB 4: MULTI-SUBJECT CAPS STUDY HELPER */}
            {activeTab === 'multi-subject' && (
              <MultiSubjectHelper
                grade={currentGrade}
                language={currentLanguage}
                onOpenTutor={(subj) => {
                  setTutorSubject(subj);
                  setIsTutorOpen(true);
                }}
              />
            )}

            {/* TAB 5: LEARNING ACHIEVEMENTS & CERTIFIED DIGITAL BADGES */}
            {activeTab === 'achievements' && (
              <AchievementsBadgesView
                user={user}
                earnedBadgeIds={user?.earnedBadgeIds || []}
                onNavigateToModule={(moduleId) => {
                  const m = CURRICULUM_MODULES.find((mod) => mod.id === moduleId);
                  if (m) {
                    setSelectedModule(m);
                    setActiveTab('curriculum');
                  }
                }}
                onOpenLab={handleOpenLab}
              />
            )}

            {/* TAB 6: TEACHER CLASSROOM DASHBOARD */}
            {activeTab === 'classroom' && (
              <TeacherDashboard
                currentGrade={user?.grade || currentGrade}
                teacherName="Mrs. N. Khumalo (HOD Science & Technology)"
                assignedSubject="Grade 7 · Coding & Mathematics"
              />
            )}

            {/* TAB 7: PARENT & GUARDIAN PORTAL */}
            {activeTab === 'parent-portal' && (
              <ParentDashboard
                currentGrade={user?.grade || currentGrade}
                parentName="Mrs. T. Dlamini"
                childLearnerNumber={user?.learnerNumber || 'LRN-2026-7041'}
                preferredLanguage={currentLanguage}
              />
            )}

            {/* TAB 8: PRINCIPAL EXECUTIVE DASHBOARD */}
            {activeTab === 'principal-portal' && (
              <PrincipalDashboard
                schoolName="Johannesburg STEM Academy"
                principalName="Dr. M. Sithole (Principal)"
                currentTerm={1}
              />
            )}

            {/* TAB 9: MASTER ADMIN CONSOLE */}
            {activeTab === 'master-admin' && (
              <MasterAdminPortal
                masterAdminEmail="nthabiso019@gmail.com"
                onSwitchPreviewRole={(role) => {
                  if (role === 'learner') setActiveTab('curriculum');
                  if (role === 'teacher') setActiveTab('classroom');
                  if (role === 'parent') setActiveTab('parent-portal');
                  if (role === 'principal') setActiveTab('principal-portal');
                }}
              />
            )}

            {/* TAB 10: CAPSTONE PORTFOLIO */}
            {activeTab === 'portfolio' && (
              <CapstonePortfolio
                grade={currentGrade}
                projects={projects}
                onAddProject={handleAddProject}
              />
            )}
          </>
        )}
      </main>

      {/* Floating Ask Fundi AI Tutor Button */}
      {!isTutorOpen && (
        <aside aria-label="AI Tutor Assistant">
          <button
            type="button"
            onClick={() => {
              setTutorSubject('ai-digital');
              setIsTutorOpen(true);
            }}
            className="fixed bottom-6 right-6 z-30 p-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all flex items-center gap-2 text-xs font-semibold"
          >
            <Bot className="w-5 h-5" />
            <span className="hidden sm:inline">Ask Fundi ({activeLangObj.code.toUpperCase()})</span>
          </button>
        </aside>
      )}

      {/* Fundi AI Tutor Modal */}
      <AiTutorModal
        grade={currentGrade}
        isOpen={isTutorOpen}
        onClose={() => setIsTutorOpen(false)}
        activeTopic={selectedModule ? selectedModule.title : 'South African Digital Education'}
        language={currentLanguage}
        onSelectLanguage={setCurrentLanguage}
        initialSubject={tutorSubject}
      />

      {/* Login & Register Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
        initialMode={authModalMode}
      />

      {/* Anime Avatar Studio Modal */}
      <AnimeAvatarStudioModal
        isOpen={isAvatarStudioOpen}
        onClose={() => {
          setIsAvatarStudioOpen(false);
          setIsInitialAvatarSetup(false);
        }}
        currentAvatar={user?.avatar || DEFAULT_ANIME_AVATAR}
        onSaveAvatar={handleSaveAvatar}
        isInitialSetup={isInitialAvatarSetup}
      />
    </div>
  );
}
