import React, { useState, useEffect } from 'react';
import {
  TextbookSubject,
  TextbookChapter,
  TextbookPage,
  GradeLevel,
  SouthAfricanLanguageCode,
  UserAccount,
} from '../types';
import { CAPS_TEXTBOOKS } from '../data/textbookData';
import { SA_LANGUAGES } from '../data/saLanguages';
import {
  BookOpen,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
  Download,
  CheckCircle,
  HelpCircle,
  Sparkles,
  Lock,
  Layers,
  Award,
  Globe,
  Clock,
  Wifi,
  WifiOff,
  Type,
  FileCheck,
} from 'lucide-react';

interface CapsBookReaderProps {
  currentGrade: GradeLevel;
  user: UserAccount | null;
  currentLanguage: SouthAfricanLanguageCode;
  onRecordStudyMinutes?: (minutes: number) => void;
  onOpenTutorWithContext?: (subject: string, topic: string) => void;
  isOfflineMode?: boolean;
}

export const CapsBookReader: React.FC<CapsBookReaderProps> = ({
  currentGrade,
  user,
  currentLanguage,
  onRecordStudyMinutes,
  onOpenTutorWithContext,
  isOfflineMode = false,
}) => {
  // Available textbooks (filter by grade or default to Grade 7 books)
  const availableBooks = CAPS_TEXTBOOKS.filter(
    (b) => b.grade === (user?.grade || currentGrade)
  ).length > 0
    ? CAPS_TEXTBOOKS.filter((b) => b.grade === (user?.grade || currentGrade))
    : CAPS_TEXTBOOKS;

  const [selectedBook, setSelectedBook] = useState<TextbookSubject>(availableBooks[0]);
  const [selectedChapter, setSelectedChapter] = useState<TextbookChapter>(
    selectedBook.chapters[0]
  );
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
  const [fontSize, setFontSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [offlineCachedIds, setOfflineCachedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('fundai_offline_books');
      return saved ? JSON.parse(saved) : ['cdr-g7-ch1', 'mat-g7-ch1'];
    } catch {
      return ['cdr-g7-ch1', 'mat-g7-ch1'];
    }
  });

  // Practice Quiz State
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [quizScoreAwarded, setQuizScoreAwarded] = useState<boolean>(false);

  // Active reading timer (increments every 60 seconds if reading)
  useEffect(() => {
    const timer = setInterval(() => {
      if (onRecordStudyMinutes) {
        onRecordStudyMinutes(1);
      }
    }, 60000); // 1 minute
    return () => clearInterval(timer);
  }, [onRecordStudyMinutes]);

  // Sync offline cache
  const handleToggleOfflineSave = (chapterId: string) => {
    const updated = offlineCachedIds.includes(chapterId)
      ? offlineCachedIds.filter((id) => id !== chapterId)
      : [...offlineCachedIds, chapterId];

    setOfflineCachedIds(updated);
    try {
      localStorage.setItem('fundai_offline_books', JSON.stringify(updated));
    } catch (e) {
      console.warn(e);
    }
  };

  const handleSelectBook = (book: TextbookSubject) => {
    setSelectedBook(book);
    setSelectedChapter(book.chapters[0]);
    setCurrentPageIndex(0);
    setSelectedOption(null);
    setQuizSubmitted(false);
    setQuizScoreAwarded(false);
  };

  const handleSelectChapter = (ch: TextbookChapter) => {
    setSelectedChapter(ch);
    setCurrentPageIndex(0);
    setSelectedOption(null);
    setQuizSubmitted(false);
    setQuizScoreAwarded(false);
  };

  // Text-To-Speech implementation using browser SpeechSynthesis
  const handleToggleTTS = (textToRead: string) => {
    if (!('speechSynthesis' in window)) {
      alert('Text-to-speech is not supported by your browser.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(textToRead.replace(/[*#`$\\]/g, ''));
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const currentPage: TextbookPage =
    selectedChapter.pages[currentPageIndex] || selectedChapter.pages[0];

  const isCurrentOfflineSaved = offlineCachedIds.includes(selectedChapter.id);

  const activeLangObj =
    SA_LANGUAGES.find((l) => l.code === currentLanguage) || SA_LANGUAGES[0];

  return (
    <div className="space-y-6">
      {/* Grade Lock & Offline Mode Status Ribbon */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-5 shadow-sm border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 font-bold flex items-center gap-1.5">
              <Lock className="w-3 h-3 text-amber-400" />
              12-Month Academic Lock: Grade {user?.grade || currentGrade}
            </span>
            <span className="text-slate-400">·</span>
            <span className="text-slate-300">
              January Reopening → December Report Collection (Term {user?.academicTerm || 1})
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-indigo-400" />
            <span>FUNDAI CAPS Digital Subject Books</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Multi-subject official CAPS syllabus books for South African schools. Read online or cache offline with bilingual explanations, diagrams, and practice quizzes.
          </p>
        </div>

        {/* Offline Toggle & Indicator */}
        <div className="flex items-center gap-3 shrink-0 bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/60">
          <div className="flex items-center gap-2 text-xs font-semibold">
            {isOfflineMode ? (
              <span className="text-amber-400 flex items-center gap-1.5">
                <WifiOff className="w-4 h-4" /> Offline Cache Mode
              </span>
            ) : (
              <span className="text-emerald-400 flex items-center gap-1.5">
                <Wifi className="w-4 h-4" /> Connected · Auto-Sync
              </span>
            )}
          </div>
          <div className="w-px h-5 bg-slate-700" />
          <span className="text-[11px] text-slate-300 font-mono">
            {offlineCachedIds.length} Books Cached
          </span>
        </div>
      </div>

      {/* Main Layout: Left Book Shelf & Right Chapter Reader */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Book Shelf & Chapter List (4 Columns) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                Subjects Shelf (Grade {user?.grade || currentGrade})
              </span>
              <span className="text-[11px] text-indigo-600 font-semibold font-mono">
                {availableBooks.length} Available
              </span>
            </div>

            {/* Subject Selector Buttons */}
            <div className="space-y-1.5">
              {availableBooks.map((book) => {
                const isSelected = selectedBook.id === book.id;
                return (
                  <button
                    key={book.id}
                    type="button"
                    onClick={() => handleSelectBook(book)}
                    className={`w-full text-left p-3 rounded-xl transition-all border flex items-center justify-between ${
                      isSelected
                        ? 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-300 dark:border-indigo-800 shadow-xs'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                          {book.shortCode}
                        </span>
                        <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                          {book.title.split(':')[0]}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-1">
                        {book.capsCurriculumCode} · {book.chapters.length} Chapters
                      </p>
                    </div>
                    <ChevronRight
                      className={`w-4 h-4 shrink-0 transition-transform ${
                        isSelected ? 'text-indigo-600 rotate-90' : 'text-slate-400'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Chapters Table of Contents */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Bookmark className="w-3.5 h-3.5 text-indigo-600" />
                Chapters · {selectedBook.shortCode}
              </span>
              <span className="text-[11px] text-slate-400 font-mono">
                Term 1 – Term 4
              </span>
            </div>

            <div className="space-y-2">
              {selectedBook.chapters.map((ch) => {
                const isChapterActive = selectedChapter.id === ch.id;
                const isCached = offlineCachedIds.includes(ch.id);

                return (
                  <button
                    key={ch.id}
                    type="button"
                    onClick={() => handleSelectChapter(ch)}
                    className={`w-full text-left p-3 rounded-xl border text-xs transition-all space-y-1 ${
                      isChapterActive
                        ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                        : 'bg-slate-50 dark:bg-slate-800/40 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-mono font-bold ${
                        isChapterActive ? 'text-indigo-300' : 'text-indigo-600 dark:text-indigo-400'
                      }`}>
                        Chapter {ch.chapterNumber} · Term {ch.term}
                      </span>
                      {isCached && (
                        <span
                          title="Saved for offline reading"
                          className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-500/20 text-emerald-400 flex items-center gap-1"
                        >
                          <CheckCircle className="w-2.5 h-2.5" /> Offline
                        </span>
                      )}
                    </div>
                    <div className="font-bold line-clamp-1">{ch.title}</div>
                    <div className={`text-[10px] flex items-center gap-2 ${
                      isChapterActive ? 'text-slate-400' : 'text-slate-500'
                    }`}>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {ch.estimatedMinutes} min
                      </span>
                      <span>·</span>
                      <span>{ch.pages.length} Pages</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Interactive Book Page Reader (8 Columns) */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden flex flex-col min-h-[640px]">
          {/* Reader Top Controls Toolbar */}
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/90 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md text-[11px] font-mono font-bold bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                {selectedChapter.capsTopicCode}
              </span>
              <span className="text-xs font-semibold text-slate-500">
                Page {currentPageIndex + 1} of {selectedChapter.pages.length}
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs">
              {/* Font Size Adjuster */}
              <div className="flex items-center gap-0.5 bg-slate-200/80 dark:bg-slate-800 p-0.5 rounded-lg">
                <button
                  type="button"
                  onClick={() => setFontSize('sm')}
                  className={`px-2 py-1 rounded text-[11px] font-bold ${
                    fontSize === 'sm' ? 'bg-white dark:bg-slate-700 shadow-xs' : 'text-slate-500'
                  }`}
                  title="Small text"
                >
                  A-
                </button>
                <button
                  type="button"
                  onClick={() => setFontSize('md')}
                  className={`px-2 py-1 rounded text-[11px] font-bold ${
                    fontSize === 'md' ? 'bg-white dark:bg-slate-700 shadow-xs' : 'text-slate-500'
                  }`}
                  title="Normal text"
                >
                  A
                </button>
                <button
                  type="button"
                  onClick={() => setFontSize('lg')}
                  className={`px-2 py-1 rounded text-[11px] font-bold ${
                    fontSize === 'lg' ? 'bg-white dark:bg-slate-700 shadow-xs' : 'text-slate-500'
                  }`}
                  title="Large text"
                >
                  A+
                </button>
              </div>

              {/* Text-To-Speech Button */}
              <button
                type="button"
                onClick={() =>
                  handleToggleTTS(`${currentPage.title}. ${currentPage.content}`)
                }
                className={`p-2 rounded-lg border transition-all flex items-center gap-1.5 ${
                  isSpeaking
                    ? 'bg-rose-500 text-white border-rose-600 animate-pulse'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                }`}
                title="Read aloud"
              >
                {isSpeaking ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5" />
                    <span className="text-[11px] font-semibold hidden sm:inline">Stop</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                    <span className="text-[11px] font-semibold hidden sm:inline">Listen</span>
                  </>
                )}
              </button>

              {/* Offline Save Toggle */}
              <button
                type="button"
                onClick={() => handleToggleOfflineSave(selectedChapter.id)}
                className={`p-2 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  isCurrentOfflineSaved
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100'
                }`}
                title="Cache for offline learning without internet"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">
                  {isCurrentOfflineSaved ? 'Saved Offline' : 'Save Offline'}
                </span>
              </button>
            </div>
          </div>

          {/* Book Page Content */}
          <div className="p-6 sm:p-8 flex-1 space-y-6">
            <div className="space-y-2 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">
                {selectedBook.title} · Chapter {selectedChapter.chapterNumber}
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
                {currentPage.title}
              </h1>
            </div>

            {/* Markdown / Paragraph Content */}
            <div
              className={`text-slate-700 dark:text-slate-200 leading-relaxed space-y-4 whitespace-pre-line font-serif ${
                fontSize === 'sm'
                  ? 'text-xs'
                  : fontSize === 'lg'
                  ? 'text-base leading-loose'
                  : 'text-sm'
              }`}
            >
              {currentPage.content}
            </div>

            {/* Bilingual Vocabulary Box if present on page */}
            {currentPage.vocabularyWord && (
              <div className="bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-amber-900 dark:text-amber-200">
                  <span className="flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-amber-600" />
                    CAPS Key Term & Mother-Tongue Glossary:
                  </span>
                  <span className="font-mono text-amber-700 dark:text-amber-300 font-bold">
                    {currentPage.vocabularyWord.term}
                  </span>
                </div>
                <p className="text-xs text-amber-950 dark:text-amber-300/90 leading-relaxed">
                  {currentPage.vocabularyWord.definition}
                </p>

                {/* SA Language Translations */}
                <div className="pt-2 border-t border-amber-200/60 dark:border-amber-800/40 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                  {Object.entries(currentPage.vocabularyWord.saTranslations).map(
                    ([code, translation]) => (
                      <div
                        key={code}
                        className="bg-white/80 dark:bg-slate-900/60 p-2 rounded-lg border border-amber-200/40 text-slate-700 dark:text-slate-300"
                      >
                        <span className="font-bold text-indigo-600 dark:text-indigo-400 uppercase font-mono mr-1">
                          [{code}]:
                        </span>
                        <span>{translation}</span>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

            {/* End of Chapter CAPS Practice Quiz (Shown when reaching last page) */}
            {currentPageIndex === selectedChapter.pages.length - 1 && (
              <div className="mt-8 pt-6 border-t-2 border-dashed border-slate-200 dark:border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-emerald-600" />
                    CAPS Chapter Assessment · {selectedChapter.practiceQuiz.capsMarks} Marks
                  </h3>
                  <span className="text-[11px] font-mono text-indigo-600 font-bold">
                    +50 XP Reward
                  </span>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
                  <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                    {selectedChapter.practiceQuiz.question}
                  </p>

                  <div className="space-y-2">
                    {selectedChapter.practiceQuiz.options.map((opt, idx) => {
                      const isChosen = selectedOption === idx;
                      const isCorrect = idx === selectedChapter.practiceQuiz.correctIndex;

                      return (
                        <button
                          key={idx}
                          type="button"
                          disabled={quizSubmitted}
                          onClick={() => setSelectedOption(idx)}
                          className={`w-full text-left p-3 rounded-lg text-xs font-medium border transition-all flex items-center justify-between ${
                            quizSubmitted
                              ? isCorrect
                                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-800 dark:text-emerald-300 font-bold'
                                : isChosen
                                ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-800 dark:text-rose-300'
                                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500'
                              : isChosen
                              ? 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-500 text-indigo-900 dark:text-indigo-200 font-bold shadow-xs'
                              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-slate-300 text-slate-800 dark:text-slate-200'
                          }`}
                        >
                          <span>{opt}</span>
                          {quizSubmitted && isCorrect && (
                            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {!quizSubmitted ? (
                    <button
                      type="button"
                      disabled={selectedOption === null}
                      onClick={() => {
                        setQuizSubmitted(true);
                        if (
                          selectedOption ===
                          selectedChapter.practiceQuiz.correctIndex
                        ) {
                          setQuizScoreAwarded(true);
                        }
                      }}
                      className="mt-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-semibold rounded-lg shadow-sm transition-all"
                    >
                      Submit CAPS Answer
                    </button>
                  ) : (
                    <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 text-xs space-y-1">
                      <div className="font-bold text-slate-900 dark:text-slate-100">
                        {selectedOption === selectedChapter.practiceQuiz.correctIndex
                          ? '🎉 Correct! CAPS Marks Earned (+5 Marks)'
                          : '💡 Revision Explanation:'}
                      </div>
                      <p className="text-slate-600 dark:text-slate-400">
                        {selectedChapter.practiceQuiz.explanation}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Bottom Pagination Strip */}
          <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex items-center justify-between">
            <button
              type="button"
              disabled={currentPageIndex === 0}
              onClick={() => {
                if (currentPageIndex > 0) {
                  setCurrentPageIndex(currentPageIndex - 1);
                }
              }}
              className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 disabled:opacity-40 flex items-center gap-1"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Previous Page</span>
            </button>

            {/* Quick Ask AI for clarification on this page */}
            {onOpenTutorWithContext && (
              <button
                type="button"
                onClick={() =>
                  onOpenTutorWithContext(
                    selectedBook.title,
                    `${currentPage.title}: ${currentPage.content.slice(0, 150)}...`
                  )
                }
                className="hidden sm:flex text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline items-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Clarify this page with Fundi AI</span>
              </button>
            )}

            <button
              type="button"
              disabled={currentPageIndex === selectedChapter.pages.length - 1}
              onClick={() => {
                if (currentPageIndex < selectedChapter.pages.length - 1) {
                  setCurrentPageIndex(currentPageIndex + 1);
                }
              }}
              className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs disabled:opacity-40 flex items-center gap-1"
            >
              <span>Next Page</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
