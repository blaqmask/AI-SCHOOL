import React, { useState } from 'react';
import { GradeLevel } from '../types';
import { Shield, Scale, Users, Eye, HelpCircle, Check, ArrowRight } from 'lucide-react';

interface EthicsDilemmaLabProps {
  grade: GradeLevel;
}

interface Dilemma {
  id: string;
  title: string;
  domain: string;
  scenario: string;
  choices: {
    id: string;
    label: string;
    actionDescription: string;
    impactScores: {
      fairness: number;
      privacy: number;
      safety: number;
      humanAgency: number;
    };
    tradeoffSummary: string;
  }[];
}

const DILEMMAS: Dilemma[] = [
  {
    id: 'd-1',
    title: 'The Autonomous Campus Shuttle Incident',
    domain: 'Transportation & Edge Robotics',
    scenario:
      'A school district deploys self-driving electric shuttles. During heavy rain, a student suddenly slips off a wet curb directly into the lane. The vehicle sensor must decide in 40 milliseconds: swerve into a sturdy metal bike rack (potentially bruising the 2 passengers inside) or brake hard with an 85% probability of bumping the fallen pedestrian.',
    choices: [
      {
        id: 'c1-1',
        label: 'A: Prioritize Exterior Pedestrian (Swerve into bike rack)',
        actionDescription: 'Algorithm swerves to protect the vulnerable fallen student, causing minor impact to shuttle occupants.',
        impactScores: { fairness: 85, privacy: 90, safety: 70, humanAgency: 60 },
        tradeoffSummary: 'Protects the vulnerable unprotected pedestrian, but imposes known mild injury risk on captive passengers.',
      },
      {
        id: 'c1-2',
        label: 'B: Maximum Emergency Linear Braking',
        actionDescription: 'Lock all brakes in lane while sounding emergency horn, leaving outcome to kinetic friction limits.',
        impactScores: { fairness: 65, privacy: 90, safety: 60, humanAgency: 75 },
        tradeoffSummary: 'Avoids steering into stationary infrastructure, but risks serious impact if stopping distance is exceeded.',
      },
      {
        id: 'c1-3',
        label: 'C: Mandatory Human-Teleoperation Fallback Gate',
        actionDescription: 'Reduce speed limits in wet campus zones and transfer emergency intervention to an onboard licensed driver.',
        impactScores: { fairness: 92, privacy: 90, safety: 95, humanAgency: 98 },
        tradeoffSummary: 'High safety and human accountability, but increases operational cost and lowers autonomy speed.',
      },
    ],
  },
  {
    id: 'd-2',
    title: 'Predictive High School Course Placement Algorithm',
    domain: 'Algorithmic Fairness & Education',
    scenario:
      'A school network introduces an AI model that predicts which 8th grade students will succeed in AP Computer Science and AP Calculus. The training data comes from past 10 years of grades, but past grading favored students with expensive home tutoring.',
    choices: [
      {
        id: 'c2-1',
        label: 'A: Raw Model Ranking (Efficiency First)',
        actionDescription: 'Sort all candidates purely by model predicted GPA without adjusting for historical disparities.',
        impactScores: { fairness: 35, privacy: 80, safety: 50, humanAgency: 30 },
        tradeoffSummary: 'Perpetuates historical socioeconomic inequality and locks out talented students lacking prior private tutoring.',
      },
      {
        id: 'c2-2',
        label: 'B: Algorithmic Parity with Socioeconomic Feature Debiasing',
        actionDescription: 'Apply equalized odds debiasing to weight growth mindset, curiosity projects, and local student circumstances.',
        impactScores: { fairness: 90, privacy: 85, safety: 85, humanAgency: 70 },
        tradeoffSummary: 'Significantly improves diversity and equity, though requires continuous auditing for feature drift.',
      },
      {
        id: 'c2-3',
        label: 'C: Open Enrollment with AI Diagnostic Tutoring',
        actionDescription: 'Allow any interested student to enroll, using the AI model purely as a personalized diagnostic tutor to fill skill gaps.',
        impactScores: { fairness: 98, privacy: 90, safety: 95, humanAgency: 95 },
        tradeoffSummary: 'Maximum student agency and opportunity. Uses AI to uplift students rather than gatekeep them.',
      },
    ],
  },
  {
    id: 'd-3',
    title: 'Facial Recognition for Campus Attendance vs Hallway Privacy',
    domain: 'Computer Vision & Biometrics',
    scenario:
      'To prevent tardiness and eliminate roll call, a high school tests biometric facial recognition cameras mounted at every doorway.',
    choices: [
      {
        id: 'c3-1',
        label: 'A: Continuous Real-Time Facial Scanning',
        actionDescription: 'Log every student face across every corridor to build heatmaps and automated attendance sheets.',
        impactScores: { fairness: 45, privacy: 15, safety: 65, humanAgency: 25 },
        tradeoffSummary: 'Massive violation of student privacy and surveillance normalization with high risk of demographic misidentification.',
      },
      {
        id: 'c3-2',
        label: 'B: Voluntary Kiosk Tap with On-Device Verification',
        actionDescription: 'Students tap their student ID card at a desk kiosk; face matching is performed locally and biometric vectors deleted instantly.',
        impactScores: { fairness: 88, privacy: 92, safety: 85, humanAgency: 90 },
        tradeoffSummary: 'Balances convenience with strong data minimization and user consent.',
      },
    ],
  },
];

export const EthicsDilemmaLab: React.FC<EthicsDilemmaLabProps> = ({ grade }) => {
  const [selectedDilemmaIndex, setSelectedDilemmaIndex] = useState(0);
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);

  const currentDilemma = DILEMMAS[selectedDilemmaIndex];
  const activeChoice = currentDilemma.choices.find((c) => c.id === selectedChoiceId);

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 text-white p-6 sm:p-8">
        <div className="space-y-3">
          <div className="text-xs font-semibold text-purple-300 tracking-wide uppercase">
            Societal Governance Lab · UNESCO AI Ethics Alignment
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            AI Ethics & Multi-Stakeholder Dilemma Lab
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
            Technology is never neutral. Every algorithmic parameter represents a human value judgment. Explore real-world
            dilemmas, analyze tradeoff impacts on fairness, privacy, and safety, and defend your policy decisions.
          </p>
        </div>
      </div>

      {/* Main Dilemma Deck */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Scenario & Choices (7 Cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <span className="text-xs font-bold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 px-2.5 py-1 rounded-md">
              Dilemma #{selectedDilemmaIndex + 1}: {currentDilemma.domain}
            </span>
            <span className="text-xs text-slate-400">Target: Grade {grade}</span>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              {currentDilemma.title}
            </h3>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
              {currentDilemma.scenario}
            </p>
          </div>

          {/* Action Policy Choices */}
          <div className="space-y-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              Choose an AI Governance & Deployment Policy:
            </span>
            <div className="space-y-2.5">
              {currentDilemma.choices.map((choice) => (
                <button
                  key={choice.id}
                  type="button"
                  onClick={() => setSelectedChoiceId(choice.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    selectedChoiceId === choice.id
                      ? 'bg-purple-50 dark:bg-purple-950/40 border-purple-400 dark:border-purple-600 shadow-sm ring-1 ring-purple-500'
                      : 'bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      {choice.label}
                    </span>
                    {selectedChoiceId === choice.id && (
                      <Check className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    )}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {choice.actionDescription}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Dilemma Selector Tabs */}
          <div className="flex items-center gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
            {DILEMMAS.map((d, i) => (
              <button
                key={d.id}
                type="button"
                onClick={() => {
                  setSelectedDilemmaIndex(i);
                  setSelectedChoiceId(null);
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  selectedDilemmaIndex === i
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                Case {i + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Stakeholder Impact Deck (5 Cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-5">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <h4 className="text-base font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Scale className="w-4 h-4 text-purple-600" />
              UNESCO Ethical Impact Matrix
            </h4>
            <p className="text-xs text-slate-500">
              Instant impact scoring based on UNESCO AI Ethics Recommendations
            </p>
          </div>

          {activeChoice ? (
            <div className="space-y-4">
              {/* 4 Pillars Meter */}
              <div className="space-y-3">
                {/* Fairness */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                      <Scale className="w-3.5 h-3.5 text-blue-500" /> Fairness & Non-Discrimination
                    </span>
                    <span className="font-mono font-bold">{activeChoice.impactScores.fairness}%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-blue-500 h-full transition-all duration-300"
                      style={{ width: `${activeChoice.impactScores.fairness}%` }}
                    />
                  </div>
                </div>

                {/* Privacy */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                      <Eye className="w-3.5 h-3.5 text-emerald-500" /> Personal Privacy & Consent
                    </span>
                    <span className="font-mono font-bold">{activeChoice.impactScores.privacy}%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-500 h-full transition-all duration-300"
                      style={{ width: `${activeChoice.impactScores.privacy}%` }}
                    />
                  </div>
                </div>

                {/* Safety */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                      <Shield className="w-3.5 h-3.5 text-amber-500" /> Safety & Reliability
                    </span>
                    <span className="font-mono font-bold">{activeChoice.impactScores.safety}%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-amber-500 h-full transition-all duration-300"
                      style={{ width: `${activeChoice.impactScores.safety}%` }}
                    />
                  </div>
                </div>

                {/* Human Agency */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                      <Users className="w-3.5 h-3.5 text-purple-500" /> Human Agency & Oversight
                    </span>
                    <span className="font-mono font-bold">{activeChoice.impactScores.humanAgency}%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-purple-500 h-full transition-all duration-300"
                      style={{ width: `${activeChoice.impactScores.humanAgency}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Tradeoff Summary */}
              <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 text-xs space-y-1">
                <span className="font-semibold text-slate-800 dark:text-slate-200 block">
                  Ethical Tradeoff Insight:
                </span>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {activeChoice.tradeoffSummary}
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-10 space-y-2 text-slate-400">
              <Scale className="w-8 h-8 mx-auto opacity-50" />
              <p className="text-xs">Select a policy choice on the left to see the multi-stakeholder impact matrix.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
