import React, { useState } from 'react';
import { CapstoneProject, GradeLevel } from '../types';
import { Plus, ThumbsUp, Code2, ShieldAlert, Sparkles, Filter, ExternalLink, Check } from 'lucide-react';

interface CapstonePortfolioProps {
  grade: GradeLevel;
  projects: CapstoneProject[];
  onAddProject: (project: CapstoneProject) => void;
}

export const CapstonePortfolio: React.FC<CapstonePortfolioProps> = ({
  grade,
  projects,
  onAddProject,
}) => {
  const [gradeFilter, setGradeFilter] = useState<'all' | 'elementary' | 'middle' | 'high'>('all');
  const [likesMap, setLikesMap] = useState<Record<string, number>>(
    projects.reduce((acc, p) => ({ ...acc, [p.id]: p.likes }), {})
  );
  const [hasLiked, setHasLiked] = useState<Record<string, boolean>>({});
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  // New Project Form
  const [title, setTitle] = useState('');
  const [studentName, setStudentName] = useState('');
  const [category, setCategory] = useState('Computer Vision & Sustainability');
  const [abstract, setAbstract] = useState('');
  const [modelArchitecture, setModelArchitecture] = useState('');
  const [ethicalConsiderations, setEthicalConsiderations] = useState('');
  const [codeSnippet, setCodeSnippet] = useState('');

  const handleLike = (id: string) => {
    if (hasLiked[id]) return;
    setLikesMap((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    setHasLiked((prev) => ({ ...prev, [id]: true }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !studentName || !abstract) return;

    const newProject: CapstoneProject = {
      id: `proj-${Date.now()}`,
      studentName,
      grade,
      title,
      category,
      abstract,
      modelArchitecture: modelArchitecture || 'Standard Gemini API integration with prompt grounding',
      ethicalConsiderations: ethicalConsiderations || 'Assessed for student privacy and fairness.',
      likes: 1,
      badges: [`Grade ${grade} Builder`, 'Community Project'],
      codeSnippet: codeSnippet || undefined,
    };

    onAddProject(newProject);
    setIsSubmitModalOpen(false);
    // Reset form
    setTitle('');
    setStudentName('');
    setAbstract('');
    setModelArchitecture('');
    setEthicalConsiderations('');
    setCodeSnippet('');
  };

  const filteredProjects = projects.filter((p) => {
    if (gradeFilter === 'elementary') return p.grade <= 5;
    if (gradeFilter === 'middle') return p.grade >= 6 && p.grade <= 8;
    if (gradeFilter === 'high') return p.grade >= 9;
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="text-xs font-semibold text-emerald-400 tracking-wide uppercase">
              Student Innovation Hub · Grades 4–12
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Capstone AI Portfolio & Community Showcase
            </h2>
            <p className="text-slate-300 text-sm max-w-xl leading-relaxed">
              Real artificial intelligence systems created by learners. Every project is accompanied by its dataset
              provenance, model architecture, and ethical impact statement.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsSubmitModalOpen(true)}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 shrink-0"
          >
            <Plus className="w-4 h-4" />
            Publish My Capstone Project
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs">
          <button
            type="button"
            onClick={() => setGradeFilter('all')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              gradeFilter === 'all'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-sm'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            All Projects ({projects.length})
          </button>
          <button
            type="button"
            onClick={() => setGradeFilter('elementary')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              gradeFilter === 'elementary'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-sm'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Grades 4–5
          </button>
          <button
            type="button"
            onClick={() => setGradeFilter('middle')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              gradeFilter === 'middle'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-sm'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Grades 6–8
          </button>
          <button
            type="button"
            onClick={() => setGradeFilter('high')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              gradeFilter === 'high'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-sm'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Grades 9–12
          </button>
        </div>

        <div className="text-xs text-slate-500">
          Peer-Reviewed & Teacher Certified
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((proj) => (
          <div
            key={proj.id}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between space-y-4 hover:border-slate-300 dark:hover:border-slate-700 transition-all"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>By {proj.studentName}</span>
                <span aria-hidden="true">·</span>
                <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                  Grade {proj.grade}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 leading-snug">
                {proj.title}
              </h3>

              <div className="text-xs text-slate-500 font-medium">
                {proj.category}
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                {proj.abstract}
              </p>

              {/* Architecture & Ethics Accordion-like notes */}
              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] leading-relaxed">
                <div>
                  <span className="font-semibold text-slate-800 dark:text-slate-200 block">
                    Architecture:
                  </span>
                  <p className="text-slate-500">{proj.modelArchitecture}</p>
                </div>
                <div>
                  <span className="font-semibold text-emerald-700 dark:text-emerald-400 block">
                    Ethics & Safety Guardrail:
                  </span>
                  <p className="text-slate-500">{proj.ethicalConsiderations}</p>
                </div>
              </div>

              {/* Optional Code Snippet */}
              {proj.codeSnippet && (
                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 overflow-x-auto">
                  <pre className="text-[10px] font-mono text-slate-300">
                    {proj.codeSnippet}
                  </pre>
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex flex-wrap gap-1">
                {proj.badges.map((b, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-semibold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded"
                  >
                    {b}
                  </span>
                ))}
              </div>

              <button
                type="button"
                onClick={() => handleLike(proj.id)}
                className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors ${
                  hasLiked[proj.id]
                    ? 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/60'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                <span className="font-mono">{likesMap[proj.id] || 0}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Submit Modal */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-xl w-full p-6 sm:p-8 space-y-5 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  Publish Capstone AI Project
                </h3>
                <p className="text-xs text-slate-500">
                  Add your solution to the FUNDAI student research repository
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsSubmitModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">
                    Project Title:
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. SignBridge: ASL Live Interpreter"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">
                    Creator Name(s):
                  </label>
                  <input
                    type="text"
                    required
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="e.g. Jordan Lee"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 dark:text-slate-300">
                  Category Track:
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100"
                >
                  <option value="Computer Vision & Sustainability">Computer Vision & Sustainability</option>
                  <option value="NLP & Educational RAG">NLP & Educational RAG</option>
                  <option value="Autonomous Robotics & Edge AI">Autonomous Robotics & Edge AI</option>
                  <option value="Creative AI & Wellbeing">Creative AI & Wellbeing</option>
                  <option value="AI Cybersecurity & Governance">AI Cybersecurity & Governance</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 dark:text-slate-300">
                  Abstract / Real-World Problem Solved:
                </label>
                <textarea
                  rows={3}
                  required
                  value={abstract}
                  onChange={(e) => setAbstract(e.target.value)}
                  placeholder="Describe the human or community problem and how your model addresses it..."
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 dark:text-slate-300">
                  Model Architecture & Dataset:
                </label>
                <input
                  type="text"
                  value={modelArchitecture}
                  onChange={(e) => setModelArchitecture(e.target.value)}
                  placeholder="e.g. YOLOv8 tiny trained on 3,000 traffic images"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-emerald-700 dark:text-emerald-400">
                  Ethical Impact & Privacy Assessment:
                </label>
                <input
                  type="text"
                  value={ethicalConsiderations}
                  onChange={(e) => setEthicalConsiderations(e.target.value)}
                  placeholder="e.g. No personally identifiable facial data collected; full on-device processing."
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 dark:text-slate-300">
                  Core Code Snippet (Python / JS - optional):
                </label>
                <textarea
                  rows={2}
                  value={codeSnippet}
                  onChange={(e) => setCodeSnippet(e.target.value)}
                  placeholder="# Model inference call..."
                  className="w-full px-3 py-2 font-mono bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsSubmitModalOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-900 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg shadow-sm"
                >
                  Publish to AI Academy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
