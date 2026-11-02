export type GradeLevel = 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type StageId = 1 | 2 | 3 | 4;

export type SouthAfricanLanguageCode =
  | 'en'
  | 'zu'
  | 'xh'
  | 'af'
  | 'nso'
  | 'tn'
  | 'st'
  | 'ts'
  | 'ss'
  | 've'
  | 'nr';

export interface SouthAfricanLanguage {
  code: SouthAfricanLanguageCode;
  name: string;
  nativeName: string;
  greeting: string;
  flagRegion: string;
  dictionary: {
    ai: string;
    data: string;
    code: string;
    algorithm: string;
    robotics: string;
    security: string;
    mathematics: string;
    science: string;
  };
}

export type SubjectTrack =
  | 'ai-digital'
  | 'coding-robotics'
  | 'mathematics'
  | 'physical-sciences'
  | 'life-sciences'
  | 'ems-business';

export type UserRole =
  | 'learner'
  | 'teacher'
  | 'parent'
  | 'principal'
  | 'master_admin'
  | 'school-admin'
  | 'super-admin';

export interface FutureJobProfile {
  id: string;
  title: string;
  localIndustry: string;
  description: string;
  averageSalaryZAR: string;
  highSchoolSubjects: string[];
  requiredSkills: string[];
  qualificationRoute: string;
  demandLevel: 'Critical Shortage' | 'High Growth' | 'Emerging Frontier';
}

export interface LearningStage {
  id: StageId;
  title: string;
  subtitle: string;
  grades: string;
  gradeRange: [number, number];
  outcome: string;
  color: string;
  accentBg: string;
  description: string;
  coreConcepts: string[];
}

export interface LessonSection {
  id: string;
  title: string;
  content: string;
  analogyOrTip?: string;
  keyTakeaway: string;
  saLanguageTranslation?: Partial<Record<SouthAfricanLanguageCode, string>>;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface CurriculumModule {
  id: string;
  code: string; // e.g. "M01", "M16", "M33", "M47"
  stageId: StageId;
  targetGrade: GradeLevel;
  title: string;
  shortDescription: string;
  durationMinutes: number;
  competencyTrack: 'Discovery' | 'Literacy' | 'Development' | 'Mastery' | 'Ethics' | 'Robotics';
  difficulty: 'Foundation' | 'Intermediate' | 'Advanced' | 'Professional';
  sections: LessonSection[];
  interactiveLabType?: 'prompt-studio' | 'neural-net' | 'hallucination-spotter' | 'rag-pipeline' | 'ethics-dilemma';
  quiz: QuizQuestion[];
  capsAlignment: string; // e.g. "CAPS: Coding & Robotics Grade 4 Term 1"
  futureCareerTags: string[];
}

export interface CapstoneProject {
  id: string;
  studentName: string;
  grade: GradeLevel;
  title: string;
  category: string;
  abstract: string;
  modelArchitecture: string;
  ethicalConsiderations: string;
  likes: number;
  badges: string[];
  codeSnippet?: string;
  saContextTag?: string; // e.g. "Kruger Wildlife Tracking", "Cape Town Water Smart Grid"
}

export interface AnimeAvatarConfig {
  genderStyle: 'anime-boy' | 'anime-girl' | 'cyber-neutral';
  skinTone: string;
  hairStyle: 'spiky' | 'dreadlocks' | 'long-flowing' | 'afro-puff' | 'short-cyber' | 'braids' | 'side-sweep';
  hairColor: string;
  eyeExpression: 'sparkle' | 'determined' | 'friendly' | 'analytical' | 'cool';
  eyeColor: string;
  clothing: 'school-blazer' | 'cyber-hoodie' | 'shweshwe-tech' | 'lab-coat' | 'gamer-jersey';
  clothingColor: string;
  accessory: 'none' | 'cyber-visor' | 'hacker-headphones' | 'smart-glasses' | 'ai-core-pendant' | 'african-bead-collar';
  auraEffect: 'none' | 'azure-cyber' | 'matrix-green' | 'solar-gold' | 'neon-violet';
}

export interface AchievementBadge {
  id: string;
  title: string;
  description: string;
  category: 'Prompting' | 'Data & ML' | 'Coding' | 'Ethics & POPIA' | 'Innovation' | 'Heritage';
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  icon: string;
  unlockedAt?: string;
  progressPercent: number;
  criteria: string;
  certificateHash?: string;
  xpReward: number;
}

// CAPS Digital Textbook Structures
export interface TextbookPage {
  pageNumber: number;
  title: string;
  content: string;
  conceptDiagramPrompt?: string;
  diagramType?: 'flowchart' | 'comparison' | 'code' | 'equation';
  vocabularyWord?: {
    term: string;
    definition: string;
    saTranslations: Partial<Record<SouthAfricanLanguageCode, string>>;
  };
}

export interface TextbookChapter {
  id: string;
  chapterNumber: number;
  title: string;
  term: 1 | 2 | 3 | 4;
  capsTopicCode: string; // e.g. "CAPS-NS-G07-T1"
  estimatedMinutes: number;
  pages: TextbookPage[];
  practiceQuiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
    capsMarks: number;
  };
  isSavedOffline?: boolean;
}

export interface TextbookSubject {
  id: string;
  title: string;
  shortCode: string;
  grade: GradeLevel;
  themeColor: string;
  iconName: string;
  capsCurriculumCode: string; // e.g. "DBE-CAPS-MAT-G07"
  synopsis: string;
  chapters: TextbookChapter[];
}

// POPIA Compliant Anonymized Classroom Records
export interface ClassroomLearnerRecord {
  learnerNumber: string; // ANONYMOUS: "LRN-2026-7041"
  grade: GradeLevel;
  dailyMinutesToday: number;
  dailyTargetMet: boolean;
  studyStreakDays: number;
  termAvgScore: number;
  term1Score: number;
  term2Score: number;
  term3Score: number;
  term4ProjectedScore: number;
  status: 'top-performer' | 'on-track' | 'struggling' | 'intervention-needed';
  strugglingTopic?: string;
  lastActive: string;
  parentEmailMasked: string;
  parentSignOffCount: number;
  avatar: AnimeAvatarConfig;
}

export interface DashboardInvitation {
  id: string;
  targetRole: 'teacher' | 'parent' | 'principal';
  recipientEmail: string;
  recipientName: string;
  assignedGrade?: GradeLevel;
  assignedSubject?: string;
  linkedLearnerNumber?: string;
  inviteCode: string;
  status: 'pending' | 'accepted';
  sentAt: string;
  sentBy: string; // "nthabiso019@gmail.com"
}

export interface UserAccount {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  grade: GradeLevel;
  learnerNumber: string; // e.g. "LRN-2026-7041"
  isGradeLocked: boolean;
  gradeLockDate: string; // e.g. "2026-01-14"
  gradeLockExpiryDate: string; // e.g. "2026-12-10"
  academicTerm: 1 | 2 | 3 | 4;
  dailyMinutesTarget: number; // default 45 min
  dailyMinutesCompleted: number; // minutes completed today
  lastStudyDate: string; // YYYY-MM-DD
  studyStreakDays: number;
  parentGuardianEmail?: string;
  parentGuardianPhone?: string;
  preferredLanguage: SouthAfricanLanguageCode;
  schoolName: string;
  province: string;
  avatar: AnimeAvatarConfig;
  token?: string;
  earnedBadgeIds: string[];
  totalXP: number;
  completedModuleIds: string[];
  createdAt: string;
  invitedBy?: string;
  linkedLearnerNumber?: string; // For parents: which child they monitor
  assignedGrade?: GradeLevel; // For teachers: assigned class
  assignedSubject?: string; // For teachers: e.g. "Mathematics & Coding"
}

export type ActiveTab =
  | 'curriculum'
  | 'textbook'
  | 'labs'
  | 'multi-subject'
  | 'achievements'
  | 'portfolio'
  | 'classroom'
  | 'parent-portal'
  | 'principal-portal'
  | 'master-admin';

export type LabType =
  | 'prompt-studio'
  | 'neural-net'
  | 'hallucination-spotter'
  | 'rag-pipeline'
  | 'ethics-dilemma';
