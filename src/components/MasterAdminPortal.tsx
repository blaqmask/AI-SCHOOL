import React, { useState } from 'react';
import { GradeLevel, DashboardInvitation, UserRole } from '../types';
import {
  ShieldAlert,
  UserPlus,
  Mail,
  Copy,
  Check,
  Users,
  School,
  ShieldCheck,
  Send,
  Eye,
  Key,
  Lock,
  Layers,
  Sparkles,
} from 'lucide-react';

interface MasterAdminPortalProps {
  onSwitchPreviewRole: (role: UserRole) => void;
  masterAdminEmail?: string;
}

const INITIAL_INVITATIONS: DashboardInvitation[] = [
  {
    id: 'inv-1',
    targetRole: 'teacher',
    recipientEmail: 'khumalo.n@stemacademy.co.za',
    recipientName: 'Mrs. N. Khumalo',
    assignedGrade: 7,
    assignedSubject: 'Coding & Robotics / Math',
    inviteCode: 'INV-TCH-G07-8821',
    status: 'accepted',
    sentAt: '2026-01-15T09:00:00Z',
    sentBy: 'nthabiso019@gmail.com',
  },
  {
    id: 'inv-2',
    targetRole: 'parent',
    recipientEmail: 'parent.dlamini@joburgmail.co.za',
    recipientName: 'Mrs. T. Dlamini',
    linkedLearnerNumber: 'LRN-2026-7041',
    inviteCode: 'INV-PRN-7041-3312',
    status: 'accepted',
    sentAt: '2026-01-16T14:30:00Z',
    sentBy: 'nthabiso019@gmail.com',
  },
  {
    id: 'inv-3',
    targetRole: 'principal',
    recipientEmail: 'sithole.m@stemacademy.co.za',
    recipientName: 'Dr. M. Sithole',
    inviteCode: 'INV-PRC-JHB-9014',
    status: 'accepted',
    sentAt: '2026-01-10T10:00:00Z',
    sentBy: 'nthabiso019@gmail.com',
  },
];

export const MasterAdminPortal: React.FC<MasterAdminPortalProps> = ({
  onSwitchPreviewRole,
  masterAdminEmail = 'nthabiso019@gmail.com',
}) => {
  const [invitations, setInvitations] = useState<DashboardInvitation[]>(() => {
    try {
      const saved = localStorage.getItem('fundai_invitations');
      return saved ? JSON.parse(saved) : INITIAL_INVITATIONS;
    } catch {
      return INITIAL_INVITATIONS;
    }
  });

  // Invitation Form State
  const [targetRole, setTargetRole] = useState<'teacher' | 'parent' | 'principal'>('teacher');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [assignedGrade, setAssignedGrade] = useState<GradeLevel>(7);
  const [assignedSubject, setAssignedSubject] = useState('Coding & Robotics');
  const [linkedLearnerNumber, setLinkedLearnerNumber] = useState('LRN-2026-7041');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleGenerateInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipientEmail || !recipientName) {
      alert('Please fill in both recipient name and email.');
      return;
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const prefix =
      targetRole === 'teacher'
        ? `INV-TCH-G${assignedGrade}-${randomSuffix}`
        : targetRole === 'parent'
        ? `INV-PRN-${linkedLearnerNumber.replace('LRN-', '')}-${randomSuffix}`
        : `INV-PRC-JHB-${randomSuffix}`;

    const newInvite: DashboardInvitation = {
      id: `inv-${Date.now()}`,
      targetRole,
      recipientEmail: recipientEmail.trim(),
      recipientName: recipientName.trim(),
      assignedGrade: targetRole === 'teacher' ? assignedGrade : undefined,
      assignedSubject: targetRole === 'teacher' ? assignedSubject : undefined,
      linkedLearnerNumber: targetRole === 'parent' ? linkedLearnerNumber : undefined,
      inviteCode: prefix,
      status: 'pending',
      sentAt: new Date().toISOString(),
      sentBy: masterAdminEmail,
    };

    const updated = [newInvite, ...invitations];
    setInvitations(updated);
    try {
      localStorage.setItem('fundai_invitations', JSON.stringify(updated));
    } catch (err) {
      console.warn(err);
    }

    setStatusMessage(`Official invitation code generated: ${prefix}. Sent to ${recipientEmail}.`);
    setRecipientEmail('');
    setRecipientName('');
    setTimeout(() => setStatusMessage(null), 5000);
  };

  const handleCopyLink = (invite: DashboardInvitation) => {
    const inviteLink = `${window.location.origin}?inviteCode=${invite.inviteCode}&role=${invite.targetRole}`;
    navigator.clipboard.writeText(inviteLink);
    setCopiedId(invite.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="space-y-8">
      {/* Master Admin Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-800 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs">
              <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-400/30 font-bold flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5" />
                Master Admin Console · Authority Level 0
              </span>
              <span className="text-slate-400">·</span>
              <span className="text-slate-300 font-mono">{masterAdminEmail}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Institutional Invitation & Access Management
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              As Master Admin, you control access to FUNDAI dashboards. When learners register, they are locked to Grade 7 for 12 months. Teachers, parents, and principals can only access their dashboards upon your direct invitation.
            </p>
          </div>

          {/* Quick Dashboard Preview Selector */}
          <div className="bg-slate-800/90 p-4 rounded-2xl border border-slate-700/80 space-y-2 shrink-0">
            <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400 block">
              Quick Role View Preview:
            </span>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => onSwitchPreviewRole('learner')}
                className="px-2.5 py-1 text-xs font-bold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
              >
                Learner
              </button>
              <button
                type="button"
                onClick={() => onSwitchPreviewRole('teacher')}
                className="px-2.5 py-1 text-xs font-bold rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors"
              >
                Teacher
              </button>
              <button
                type="button"
                onClick={() => onSwitchPreviewRole('parent')}
                className="px-2.5 py-1 text-xs font-bold rounded-lg bg-teal-600 hover:bg-teal-500 text-white transition-colors"
              >
                Parent
              </button>
              <button
                type="button"
                onClick={() => onSwitchPreviewRole('principal')}
                className="px-2.5 py-1 text-xs font-bold rounded-lg bg-purple-600 hover:bg-purple-500 text-white transition-colors"
              >
                Principal
              </button>
            </div>
          </div>
        </div>
      </div>

      {statusMessage && (
        <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 rounded-xl text-xs font-semibold text-emerald-800 dark:text-emerald-200 flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Grid: Left = Generate Invitation / Right = Active Invitations Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Generate Invitation Card (5 Cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <UserPlus className="w-4 h-4 text-indigo-600" />
              Invite Stakeholder to Dashboard
            </h3>
            <p className="text-xs text-slate-500">
              Generate authenticated invitation keys for educators, parents, or principals
            </p>
          </div>

          <form onSubmit={handleGenerateInvite} className="space-y-3 text-xs">
            {/* Role Radio Pills */}
            <div className="space-y-1">
              <label className="font-semibold text-slate-700 dark:text-slate-300">
                Dashboard Role to Invite:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['teacher', 'parent', 'principal'] as const).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setTargetRole(r)}
                    className={`py-2 px-2.5 rounded-lg font-bold capitalize transition-all border text-center ${
                      targetRole === r
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Recipient Full Name:
              </label>
              <input
                type="text"
                required
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                placeholder="e.g. Mrs. N. Khumalo or Mr. T. Dlamini"
                className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Recipient Email Address:
              </label>
              <input
                type="email"
                required
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
                placeholder="e.g. educator@school.co.za"
                className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
              />
            </div>

            {targetRole === 'teacher' && (
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Assigned Grade:
                  </label>
                  <select
                    value={assignedGrade}
                    onChange={(e) => setAssignedGrade(Number(e.target.value) as GradeLevel)}
                    className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  >
                    {[4, 5, 6, 7, 8, 9, 10, 11, 12].map((g) => (
                      <option key={g} value={g}>
                        Grade {g}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Subject:
                  </label>
                  <input
                    type="text"
                    value={assignedSubject}
                    onChange={(e) => setAssignedSubject(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>
            )}

            {targetRole === 'parent' && (
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Link Child Learner Number (POPIA ID):
                </label>
                <input
                  type="text"
                  required
                  value={linkedLearnerNumber}
                  onChange={(e) => setLinkedLearnerNumber(e.target.value)}
                  placeholder="LRN-2026-XXXX"
                  className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-mono"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-sm transition-all flex items-center justify-center gap-1.5 pt-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Generate Invitation & Link</span>
            </button>
          </form>
        </div>

        {/* Existing Invitations List (7 Cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Active Invitations & Assigned Access
              </h3>
              <p className="text-xs text-slate-500">
                Authorized stakeholders who can access confidential student metrics
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-indigo-600">
              {invitations.length} Stakeholders
            </span>
          </div>

          <div className="space-y-3">
            {invitations.map((inv) => (
              <div
                key={inv.id}
                className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase font-mono ${
                        inv.targetRole === 'teacher'
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300'
                          : inv.targetRole === 'parent'
                          ? 'bg-teal-100 text-teal-700 dark:bg-teal-950/60 dark:text-teal-300'
                          : 'bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300'
                      }`}
                    >
                      {inv.targetRole}
                    </span>
                    <span className="font-bold text-slate-900 dark:text-slate-100">
                      {inv.recipientName}
                    </span>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      inv.status === 'accepted'
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                        : 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
                    }`}
                  >
                    {inv.status}
                  </span>
                </div>

                <div className="text-slate-500 flex flex-wrap items-center gap-3 text-[11px]">
                  <span>Email: {inv.recipientEmail}</span>
                  {inv.assignedGrade && <span>· Grade {inv.assignedGrade}</span>}
                  {inv.linkedLearnerNumber && (
                    <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">
                      · Linked to: {inv.linkedLearnerNumber}
                    </span>
                  )}
                </div>

                <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
                  <span className="font-mono text-[11px] text-slate-600 dark:text-slate-400">
                    Code: {inv.inviteCode}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopyLink(inv)}
                    className="px-2.5 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 text-slate-700 dark:text-slate-200 rounded-lg text-[11px] font-semibold flex items-center gap-1 transition-colors"
                  >
                    {copiedId === inv.id ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span>Link Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy Invite Link</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
