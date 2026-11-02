import React, { useState } from 'react';
import { AchievementBadge, UserAccount } from '../types';
import { INITIAL_ACHIEVEMENT_BADGES } from '../data/achievementsData';
import { AnimeAvatarRenderer } from './AnimeAvatarRenderer';
import {
  Award,
  Sparkles,
  Lock,
  CheckCircle2,
  Share2,
  Download,
  ShieldCheck,
  Star,
  ExternalLink,
  ChevronRight,
  X,
  FileCheck2,
} from 'lucide-react';

interface AchievementsBadgesViewProps {
  user: UserAccount | null;
  earnedBadgeIds: string[];
  onNavigateToModule?: (moduleId: string) => void;
  onOpenLab?: (labType: any) => void;
}

export const AchievementsBadgesView: React.FC<AchievementsBadgesViewProps> = ({
  user,
  earnedBadgeIds,
  onNavigateToModule,
  onOpenLab,
}) => {
  const [selectedBadge, setSelectedBadge] = useState<AchievementBadge | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [isCopied, setIsCopied] = useState(false);

  const badges = INITIAL_ACHIEVEMENT_BADGES.map((b) => ({
    ...b,
    isUnlocked: earnedBadgeIds.includes(b.id) || b.progressPercent === 100,
  }));

  const unlockedCount = badges.filter((b) => b.isUnlocked).length;
  const totalXP = badges
    .filter((b) => b.isUnlocked)
    .reduce((sum, b) => sum + b.xpReward, 0);

  const filteredBadges = badges.filter((b) => {
    if (categoryFilter === 'all') return true;
    return b.category.toLowerCase().includes(categoryFilter.toLowerCase());
  });

  const getRarityBadgeStyle = (rarity: AchievementBadge['rarity']) => {
    switch (rarity) {
      case 'Legendary':
        return 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300 border-amber-300 dark:border-amber-700';
      case 'Epic':
        return 'bg-purple-100 text-purple-900 dark:bg-purple-950 dark:text-purple-300 border-purple-300 dark:border-purple-700';
      case 'Rare':
        return 'bg-sky-100 text-sky-900 dark:bg-sky-950 dark:text-sky-300 border-sky-300 dark:border-sky-700';
      default:
        return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700';
    }
  };

  const handleShare = () => {
    if (!selectedBadge) return;
    const shareText = `I just verified the "${selectedBadge.title}" AI achievement on FUNDAI Academy! Certificate: ${selectedBadge.certificateHash}`;
    navigator.clipboard.writeText(shareText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-950 via-slate-900 to-indigo-950 text-white p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="text-xs font-semibold text-amber-400 tracking-wide uppercase">
              Verifiable Competency Badges & National Credentials
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Learning Achievements & Digital Badges
            </h2>
            <p className="text-slate-300 text-sm max-w-xl leading-relaxed">
              Earn authenticated micro-credentials as you master prompt engineering, Python algorithms, neural network
              weights, and South African POPIA ethics. Click any unlocked badge to view and print your verifiable
              certificate.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-slate-900/80 p-4 rounded-2xl border border-slate-800 shrink-0">
            {user && (
              <div className="shrink-0">
                <AnimeAvatarRenderer avatar={user.avatar} size="md" />
              </div>
            )}
            <div className="text-right">
              <span className="text-[11px] text-slate-400 block font-medium">Earned Credentials</span>
              <div className="text-2xl font-bold font-mono text-amber-400">
                {unlockedCount} / {badges.length}
              </div>
              <span className="text-[10px] text-emerald-400 font-semibold">{totalXP} Total XP Earned</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3 overflow-x-auto text-xs">
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
          {[
            { id: 'all', label: `All Badges (${badges.length})` },
            { id: 'prompting', label: 'Prompting' },
            { id: 'data', label: 'Data & ML' },
            { id: 'coding', label: 'Python & Coding' },
            { id: 'ethics', label: 'Ethics & POPIA' },
            { id: 'heritage', label: 'Indigenous Languages' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setCategoryFilter(tab.id)}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                categoryFilter === tab.id
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="text-xs text-slate-500 font-medium hidden sm:block">
          Authentic DBE CAPS & CSTA Verified
        </div>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredBadges.map((badge) => (
          <div
            key={badge.id}
            onClick={() => setSelectedBadge(badge)}
            className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
              badge.isUnlocked
                ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-amber-400 dark:hover:border-amber-500 shadow-sm hover:shadow-md'
                : 'bg-slate-50/70 dark:bg-slate-900/40 border-slate-200/60 dark:border-slate-800/60 opacity-80'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${getRarityBadgeStyle(
                    badge.rarity
                  )}`}
                >
                  {badge.rarity}
                </span>

                <div className="flex items-center gap-1 font-mono text-xs font-bold text-amber-600 dark:text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>+{badge.xpReward} XP</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${
                    badge.isUnlocked
                      ? 'bg-gradient-to-br from-amber-400 to-amber-600 text-white shadow-md border-amber-300'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-400 border-slate-300 dark:border-slate-700'
                  }`}
                >
                  {badge.isUnlocked ? (
                    <Award className="w-6 h-6" />
                  ) : (
                    <Lock className="w-5 h-5 text-slate-400" />
                  )}
                </div>

                <div className="space-y-0.5">
                  <h4 className="text-base font-bold text-slate-900 dark:text-slate-100 leading-snug">
                    {badge.title}
                  </h4>
                  <span className="text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold block">
                    {badge.category}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
                {badge.description}
              </p>

              {/* Criteria */}
              <div className="p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 text-[11px] text-slate-600 dark:text-slate-400">
                <span className="font-semibold text-slate-800 dark:text-slate-200 block mb-0.5">
                  Requirements:
                </span>
                {badge.criteria}
              </div>
            </div>

            {/* Bottom Status */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              {badge.isUnlocked ? (
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Unlocked ({badge.unlockedAt || 'Certified'})
                </span>
              ) : (
                <div className="w-full space-y-1">
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>Progress</span>
                    <span>{badge.progressPercent}%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-indigo-600 h-full rounded-full"
                      style={{ width: `${badge.progressPercent}%` }}
                    />
                  </div>
                </div>
              )}

              {badge.isUnlocked && (
                <span className="text-indigo-600 dark:text-indigo-400 font-semibold text-[11px] hover:underline">
                  View Certificate →
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Verifiable Digital Certificate Modal */}
      {selectedBadge && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <button
              type="button"
              onClick={() => setSelectedBadge(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Certificate Header Stamp */}
            <div className="text-center space-y-2 border-b border-slate-100 dark:border-slate-800 pb-5">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-white flex items-center justify-center mx-auto shadow-lg">
                <Award className="w-9 h-9" />
              </div>
              <span className="text-[11px] uppercase tracking-widest text-amber-600 dark:text-amber-400 font-bold block">
                Official AI Academy Micro-Credential
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100">
                {selectedBadge.title}
              </h3>
              <p className="text-xs text-slate-500">
                Issued by FUNDAI — South African AI & Digital Education Ecosystem
              </p>
            </div>

            {/* Certificate Body */}
            <div className="p-5 bg-gradient-to-b from-slate-50 to-amber-50/20 dark:from-slate-800/40 dark:to-slate-800/10 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4 text-xs">
              <div className="flex items-center gap-4">
                {user && (
                  <AnimeAvatarRenderer avatar={user.avatar} size="lg" />
                )}
                <div className="space-y-1">
                  <span className="text-slate-500 block">This certifies that learner:</span>
                  <div className="text-base font-bold text-slate-900 dark:text-slate-100">
                    {user?.fullName || 'South African AI Scholar'}
                  </div>
                  <div className="text-slate-500">
                    Grade {user?.grade || 7} · {user?.schoolName || 'South Africa K-12 Network'}
                  </div>
                </div>
              </div>

              <p className="text-slate-700 dark:text-slate-300 leading-relaxed pt-2 border-t border-slate-200 dark:border-slate-700">
                Has successfully demonstrated competency in: <strong>{selectedBadge.description}</strong> adhering
                to South African DBE CAPS and UNESCO AI Competency Standards.
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-700 text-[11px] text-slate-500 font-mono">
                <span>Verification Hash: {selectedBadge.certificateHash}</span>
                <span>Date: {selectedBadge.unlockedAt || '2026-11-01'}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={handleShare}
                className="flex-1 py-2.5 px-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                <span>{isCopied ? 'Verification Link Copied!' : 'Share Credential'}</span>
              </button>

              <button
                type="button"
                onClick={() => window.print()}
                className="flex-1 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Print Certificate</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
