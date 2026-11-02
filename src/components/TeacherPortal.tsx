import React, { useState } from 'react';
import { GradeLevel } from '../types';
import { Users, AlertTriangle, CheckCircle, Award, FileText, Download, Check, Sparkles } from 'lucide-react';

interface TeacherPortalProps {
  grade: GradeLevel;
}

interface StudentRecord {
  id: string;
  name: string;
  grade: number;
  stageProgress: number; // 1 to 5
  modulesDone: number;
  avgQuizScore: number;
  currentProject: string;
  interventionNeeded?: string;
}

const CLASS_STUDENTS: StudentRecord[] = [
  {
    id: 'st-1',
    name: 'Maya Chen',
    grade: 11,
    stageProgress: 4,
    modulesDone: 9,
    avgQuizScore: 94,
    currentProject: 'EcoSort Edge Vision Classifier',
  },
  {
    id: 'st-2',
    name: 'Liam Vance',
    grade: 11,
    stageProgress: 4,
    modulesDone: 8,
    avgQuizScore: 91,
    currentProject: 'EcoSort Edge Vision Classifier',
  },
  {
    id: 'st-3',
    name: 'David Okafor',
    grade: 11,
    stageProgress: 3,
    modulesDone: 5,
    avgQuizScore: 68,
    currentProject: 'Sentiment Tracker',
    interventionNeeded: 'Needs review on Backpropagation chain rule',
  },
  {
    id: 'st-4',
    name: 'Sophia Rodriguez',
    grade: 11,
    stageProgress: 4,
    modulesDone: 10,
    avgQuizScore: 96,
    currentProject: 'MediScan X-Ray Prototype',
  },
  {
    id: 'st-5',
    name: 'Ethan Patel',
    grade: 11,
    stageProgress: 2,
    modulesDone: 3,
    avgQuizScore: 72,
    currentProject: 'Historical Bot',
    interventionNeeded: 'Struggling with Cosine Similarity vector distance',
  },
];

export const TeacherPortal: React.FC<TeacherPortalProps> = ({ grade }) => {
  const [activeTab, setActiveTab] = useState<'roster' | 'standards' | 'rubric'>('roster');
  const [rubricStudent, setRubricStudent] = useState('Maya Chen');
  const [rubricScores, setRubricScores] = useState({
    problemNeed: 4,
    techArchitecture: 4,
    ethicsBias: 3,
    humanAgency: 4,
  });
  const [rubricNotes, setRubricNotes] = useState(
    'Outstanding edge deployment on Raspberry Pi with excellent non-facial data isolation.'
  );
  const [feedbackExported, setFeedbackExported] = useState(false);

  const totalRubricScore =
    rubricScores.problemNeed +
    rubricScores.techArchitecture +
    rubricScores.ethicsBias +
    rubricScores.humanAgency;

  const handleExport = () => {
    setFeedbackExported(true);
    setTimeout(() => setFeedbackExported(false), 2500);
  };

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white p-6 sm:p-8">
        <div className="space-y-3">
          <div className="text-xs font-semibold text-teal-400 tracking-wide uppercase">
            Teacher & School District Command Engine
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Classroom AI Competency & Standards Hub
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
            Monitor real-time student mastery across all 5 AI stages, identify early conceptual struggles, track CSTA
            and UNESCO standards compliance, and execute rubric-based project assessments.
          </p>
        </div>
      </div>

      {/* View Switcher Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        <button
          type="button"
          onClick={() => setActiveTab('roster')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
            activeTab === 'roster'
              ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          Classroom Roster & Alerts ({CLASS_STUDENTS.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('standards')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
            activeTab === 'standards'
              ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          Standards Alignment Matrix (CSTA & UNESCO)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('rubric')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
            activeTab === 'rubric'
              ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          Project Rubric Evaluator
        </button>
      </div>

      {/* TAB 1: Roster & Interventions */}
      {activeTab === 'roster' && (
        <div className="space-y-6">
          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-sm text-center">
              <span className="text-xs text-slate-500">Enrolled Students</span>
              <div className="text-2xl font-bold font-mono text-slate-900 dark:text-slate-100">28</div>
            </div>
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-sm text-center">
              <span className="text-xs text-slate-500">Avg Quiz Mastery</span>
              <div className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400">88.4%</div>
            </div>
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-sm text-center">
              <span className="text-xs text-slate-500">Active Capstones</span>
              <div className="text-2xl font-bold font-mono text-indigo-600 dark:text-indigo-400">14</div>
            </div>
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-sm text-center">
              <span className="text-xs text-slate-500">Intervention Alerts</span>
              <div className="text-2xl font-bold font-mono text-amber-600 dark:text-amber-400">2</div>
            </div>
          </div>

          {/* Student Table */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                Grade {grade} AI Literacy Cohort
              </h3>
              <span className="text-xs text-slate-500">Updated Real-Time</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 font-semibold border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="py-3 px-4">Student</th>
                    <th className="py-3 px-4">Stage Progress</th>
                    <th className="py-3 px-4">Modules Completed</th>
                    <th className="py-3 px-4">Quiz Average</th>
                    <th className="py-3 px-4">Active Capstone</th>
                    <th className="py-3 px-4">Intervention Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {CLASS_STUDENTS.map((st) => (
                    <tr key={st.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                      <td className="py-3 px-4 font-semibold text-slate-900 dark:text-slate-100">
                        {st.name}
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">
                          Stage {st.stageProgress} / 5
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono">{st.modulesDone} modules</td>
                      <td className="py-3 px-4 font-mono font-bold">
                        <span
                          className={
                            st.avgQuizScore >= 90
                              ? 'text-emerald-600 dark:text-emerald-400'
                              : st.avgQuizScore >= 75
                              ? 'text-indigo-600 dark:text-indigo-400'
                              : 'text-amber-600 dark:text-amber-400'
                          }
                        >
                          {st.avgQuizScore}%
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-600 dark:text-slate-300">{st.currentProject}</td>
                      <td className="py-3 px-4">
                        {st.interventionNeeded ? (
                          <div className="flex items-center gap-1.5 text-amber-700 dark:text-amber-400 font-medium">
                            <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                            <span>{st.interventionNeeded}</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
                            <CheckCircle className="w-3.5 h-3.5" />
                            <span>On Track</span>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Standards Alignment */}
      {activeTab === 'standards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Award className="w-4 h-4 text-indigo-600" />
              CSTA K-12 Computer Science Standards
            </h3>
            <div className="space-y-3 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
                <span className="font-bold text-slate-900 dark:text-slate-100">
                  1A-CS-02 & 1B-AP-10 (Grades 4–5):
                </span>
                <p>Model how computer software operates; design programs using input/output variables & prompts.</p>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
                <span className="font-bold text-slate-900 dark:text-slate-100">
                  2-DA-08 & 2-IC-20 (Grades 6–8):
                </span>
                <p>Collect & transform data for machine learning; compare tradeoffs of technology choices and misinformation.</p>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
                <span className="font-bold text-slate-900 dark:text-slate-100">
                  3A-AP-13 & 3B-AP-15 (Grades 9–12):
                </span>
                <p>Construct algorithms and neural approximations; design modular autonomous multi-agent pipelines.</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Award className="w-4 h-4 text-teal-600" />
              UNESCO AI Competency Framework for Students
            </h3>
            <div className="space-y-3 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
                <span className="font-bold text-slate-900 dark:text-slate-100">
                  Aspect 1: Human-Centred Mindset
                </span>
                <p>Understanding that human agency, empathy, and dignity precede technology implementation.</p>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
                <span className="font-bold text-slate-900 dark:text-slate-100">
                  Aspect 2: Ethics of AI
                </span>
                <p>Evaluating algorithmic bias, personal privacy, data minimization, and environmental impact.</p>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
                <span className="font-bold text-slate-900 dark:text-slate-100">
                  Aspect 3: AI Techniques & Applications
                </span>
                <p>Designing, building, testing, and deploying real AI systems with verified ground truth.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Rubric Evaluator */}
      {activeTab === 'rubric' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  Formative Rubric Scoring Matrix
                </h3>
                <p className="text-xs text-slate-500">Grading scale: 1 (Beginning) to 4 (Exemplary)</p>
              </div>

              <select
                value={rubricStudent}
                onChange={(e) => setRubricStudent(e.target.value)}
                className="px-3 py-1.5 text-xs bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 font-semibold"
              >
                {CLASS_STUDENTS.map((st) => (
                  <option key={st.id} value={st.name}>
                    {st.name} ({st.currentProject})
                  </option>
                ))}
              </select>
            </div>

            {/* Rubric Criteria */}
            <div className="space-y-4 text-xs">
              {/* Criterion 1 */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    1. Real-World Problem Definition & Community Need:
                  </span>
                  <span className="font-mono font-bold text-indigo-600">{rubricScores.problemNeed} / 4</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4].map((tier) => (
                    <button
                      key={tier}
                      type="button"
                      onClick={() => setRubricScores((prev) => ({ ...prev, problemNeed: tier }))}
                      className={`py-1.5 rounded-lg border text-xs font-semibold ${
                        rubricScores.problemNeed === tier
                          ? 'bg-indigo-600 text-white border-indigo-600'
                          : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      Tier {tier}
                    </button>
                  ))}
                </div>
              </div>

              {/* Criterion 2 */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    2. Technical Architecture & Algorithmic Rigor:
                  </span>
                  <span className="font-mono font-bold text-indigo-600">
                    {rubricScores.techArchitecture} / 4
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4].map((tier) => (
                    <button
                      key={tier}
                      type="button"
                      onClick={() => setRubricScores((prev) => ({ ...prev, techArchitecture: tier }))}
                      className={`py-1.5 rounded-lg border text-xs font-semibold ${
                        rubricScores.techArchitecture === tier
                          ? 'bg-indigo-600 text-white border-indigo-600'
                          : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      Tier {tier}
                    </button>
                  ))}
                </div>
              </div>

              {/* Criterion 3 */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    3. Ethical Assessment, Bias & Privacy Safeguards:
                  </span>
                  <span className="font-mono font-bold text-indigo-600">{rubricScores.ethicsBias} / 4</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4].map((tier) => (
                    <button
                      key={tier}
                      type="button"
                      onClick={() => setRubricScores((prev) => ({ ...prev, ethicsBias: tier }))}
                      className={`py-1.5 rounded-lg border text-xs font-semibold ${
                        rubricScores.ethicsBias === tier
                          ? 'bg-indigo-600 text-white border-indigo-600'
                          : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      Tier {tier}
                    </button>
                  ))}
                </div>
              </div>

              {/* Criterion 4 */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    4. Critical Reflection, Limitations & Human Agency:
                  </span>
                  <span className="font-mono font-bold text-indigo-600">{rubricScores.humanAgency} / 4</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4].map((tier) => (
                    <button
                      key={tier}
                      type="button"
                      onClick={() => setRubricScores((prev) => ({ ...prev, humanAgency: tier }))}
                      className={`py-1.5 rounded-lg border text-xs font-semibold ${
                        rubricScores.humanAgency === tier
                          ? 'bg-indigo-600 text-white border-indigo-600'
                          : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      Tier {tier}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Teacher Feedback Notes */}
            <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Formative Educator Notes & Next Steps:
              </label>
              <textarea
                rows={3}
                value={rubricNotes}
                onChange={(e) => setRubricNotes(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100"
              />
            </div>
          </div>

          {/* Rubric Summary Card (5 Cols) */}
          <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-5">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
              <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Assessment Summary
              </h4>
              <p className="text-xs text-slate-500">Student: {rubricStudent}</p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-center space-y-1">
              <span className="text-xs text-slate-500">Total Capstone Score</span>
              <div className="text-3xl font-extrabold font-mono text-indigo-600 dark:text-indigo-400">
                {totalRubricScore} / 16
              </div>
              <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {totalRubricScore >= 14
                  ? 'Exemplary Mastery (Level 4)'
                  : totalRubricScore >= 11
                  ? 'Proficient Competency (Level 3)'
                  : 'Developing Competency (Level 2)'}
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span>Problem Need:</span>
                <span className="font-mono font-bold text-slate-900 dark:text-slate-100">
                  {rubricScores.problemNeed} / 4
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span>Technical Rigor:</span>
                <span className="font-mono font-bold text-slate-900 dark:text-slate-100">
                  {rubricScores.techArchitecture} / 4
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span>Ethics & Privacy:</span>
                <span className="font-mono font-bold text-slate-900 dark:text-slate-100">
                  {rubricScores.ethicsBias} / 4
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span>Human Agency:</span>
                <span className="font-mono font-bold text-slate-900 dark:text-slate-100">
                  {rubricScores.humanAgency} / 4
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleExport}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-all flex items-center justify-center gap-2"
            >
              {feedbackExported ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  Rubric Assessment Saved & Dispatched!
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  Save Assessment & Send to Student
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
