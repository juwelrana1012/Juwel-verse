import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Library, GraduationCap, BookOpen, Milestone, HelpCircle, ChevronRight, Award, CheckCircle } from 'lucide-react';
import KnowledgeHub from './components/KnowledgeHub';
import QuizEngine from './components/QuizEngine';
import GlossaryMatrix from './components/GlossaryMatrix';
import LearningRoadmap from './components/LearningRoadmap';
import ResourcesGuide from './components/ResourcesGuide';
import { saveLearnerProgress, loadLearnerProgress } from './firebase';

type NavigatorTab = 'curriculum' | 'roadmap' | 'quizzes' | 'glossary' | 'resources';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavigatorTab>('curriculum');
  const user = 'guest_learner';

  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [completedTopics, setCompletedTopics] = useState<string[]>([]);
  const [quizScores, setQuizScores] = useState<Record<string, number>>({});
  
  const [bookmarkCount, setBookmarkCount] = useState(0);
  const [completionCount, setCompletionCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Synchronize stats on mount from persistent store
  useEffect(() => {
    async function initProgress() {
      try {
        const progress = await loadLearnerProgress(user);
        setBookmarks(progress.bookmarks);
        setCompletedTopics(progress.completedTopics);
        setQuizScores(progress.scores);
        setBookmarkCount(progress.bookmarks.length);
        setCompletionCount(progress.completedTopics.length);
      } catch (error) {
        console.error('Error fetching learner profile details:', error);
      } finally {
        setLoading(false);
      }
    }
    initProgress();
  }, []);

  const handleToggleBookmark = async (articleId: string) => {
    const next = bookmarks.includes(articleId)
      ? bookmarks.filter((id) => id !== articleId)
      : [...bookmarks, articleId];
    setBookmarks(next);
    setBookmarkCount(next.length);
    await saveLearnerProgress(user, next, completedTopics, quizScores);
  };

  const handleToggleCompleted = async (articleId: string) => {
    const next = completedTopics.includes(articleId)
      ? completedTopics.filter((id) => id !== articleId)
      : [...completedTopics, articleId];
    setCompletedTopics(next);
    setCompletionCount(next.length);
    await saveLearnerProgress(user, bookmarks, next, quizScores);
  };

  const handleSaveScore = async (quizId: string, val: number) => {
    const newScores = { ...quizScores, [quizId]: val };
    setQuizScores(newScores);
    await saveLearnerProgress(user, bookmarks, completedTopics, newScores);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col justify-center items-center">
        <div className="w-10 h-10 border-4 border-[#0085ff] border-t-transparent rounded-full animate-spin" />
        <p className="mt-4 text-slate-500 font-mono text-xs uppercase tracking-widest">Loading Platform Workspace...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-800 selection:bg-blue-100 relative flex flex-col justify-between">
      
      {/* Clean Light Header */}
      <header className="relative z-30 w-full border-b border-slate-200 bg-white/95 backdrop-blur-sm py-4">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* Left side: Professional Logo */}
          <div className="flex items-center gap-3 sm:gap-4">
            <img 
              src="https://i.ibb.co/nq1G0pmP/file-0000000099f071fd85bdf42c0cb05613.png" 
              alt="Verse Logo" 
              className="h-[38px] w-auto verse-logo object-contain"
              referrerPolicy="no-referrer"
            />
            <span className="text-xl font-black tracking-widest text-[#0085ff] uppercase font-display select-none">
              Verse
            </span>
            <div className="w-px h-6 bg-slate-200 hidden md:block" />
            <a 
              href="http://dashboard.vgdh.io" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden md:block text-[12px] text-slate-700 no-underline bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-[6px] transition-all duration-300 font-bold uppercase tracking-wider"
            >
              Dashboard
            </a>
          </div>

          {/* Right side: Social Profile & Telegram link */}
          <div className="flex flex-col items-end gap-1.5 text-right">
            {/* Bitcoin Link */}
            <a 
              href="https://x.com/BitcoinCom" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-[13px] text-slate-700 no-underline bg-slate-100 hover:bg-blue-50 hover:text-[#0085ff] px-4 py-2 rounded-[6px] transition-all duration-300 font-bold shadow-sm border border-slate-200/40"
            >
              <img 
                src="https://i.ibb.co/hx1FvtyV/file-00000000bc08720b9442e03fc47020a2.png" 
                alt="Bitcoin Logo" 
                className="h-[18px] w-auto object-contain mr-2"
                referrerPolicy="no-referrer"
              />
              <span>@BitcoinCom</span>
            </a>

            {/* Telegram Community Link */}
            <a 
              href="https://t.me/GetVerse/177601" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-[12px] text-slate-600 hover:text-[#0085ff] no-underline bg-slate-50 hover:bg-blue-50 px-4 py-1.5 rounded-[6px] border border-slate-200 hover:border-[#0085ff]/30 transition-all duration-300 font-bold uppercase tracking-wider"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2 animate-pulse" />
              Telegram Community
            </a>
          </div>
        </div>
      </header>

      {/* Subtle Pastel Background Highlights */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-5%] left-[-5%] w-[35%] h-[35%] rounded-full bg-blue-500/[0.04] blur-[100px]" />
        <div className="absolute top-[25%] right-[-5%] w-[30%] h-[30%] rounded-full bg-pink-500/[0.03] blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[15%] w-[45%] h-[45%] rounded-full bg-slate-500/[0.02] blur-[130px]" />
      </div>

      {/* Main Container */}
      <main className="relative z-10 max-w-7xl mx-auto w-full px-6 py-12 md:py-16 flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key="hub-layout"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-12"
          >
            {/* Dynamic Welcome Hero Panel */}
            <div className="bg-gradient-to-br from-slate-50 via-slate-100/30 to-white border border-slate-200/80 rounded-[2rem] p-8 md:p-12 relative overflow-hidden shadow-sm">
              {/* Visual geometric grid accent overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
              
              <div className="relative z-10 flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
                <div className="space-y-6 text-center md:text-left max-w-2xl">
                  
                  {/* Status Indicator Badge */}
                  <div className="inline-flex items-center gap-3 bg-blue-50 border border-blue-100 px-4 py-2 rounded-2xl">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#0085ff] animate-pulse" />
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-widest font-mono">
                      Guest Learner Profile Active
                    </span>
                  </div>

                  {/* Absolute Black Branding Title */}
                  <div className="space-y-4">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight uppercase font-display text-black">
                      VERSE INTERACTIVE HUB
                    </h1>
                    <p className="text-slate-600 text-sm md:text-base leading-relaxed font-sans max-w-xl">
                      A world-class Educational Knowledge Platform built to empower beginners and advanced professionals with clean, reliable insights into Cryptocurrency, Blockchain technology networks, the Verse Ecosystem, and the Sovereign Digital Economy.
                    </p>
                  </div>

                  {/* Highlights */}
                  <div className="flex flex-wrap justify-center md:justify-start gap-3">
                    <span className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 border border-slate-200/60 text-slate-700 text-xs rounded-full font-medium">
                      <CheckCircle className="w-3.5 h-3.5 text-blue-600" /> Beginner Adaptive Paths
                    </span>
                    <span className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 border border-slate-200/60 text-slate-700 text-xs rounded-full font-medium">
                      <Star className="w-3.5 h-3.5 text-amber-500" /> Verified Content
                    </span>
                  </div>
                </div>

                {/* Adaptive live status stats board */}
                <div className="w-full md:w-80 flex flex-col justify-center gap-4">
                  <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm text-center flex flex-col items-center justify-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-blue-100/40 border border-blue-200 flex items-center justify-center text-[#0085ff]">
                      <Award className="w-6 h-6 text-[#0085ff]" />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#0085ff] block font-mono">Verified Learnings</span>
                      <h4 className="text-base font-black uppercase tracking-wider text-slate-900 font-display">Interactive Quiz Masters</h4>
                      <p className="text-xs text-slate-500 leading-relaxed max-w-[210px] mx-auto">
                        Sharpen your blockchain literacy by completing our micro quizzes!
                      </p>
                    </div>
                    <button 
                      onClick={() => setActiveTab('quizzes')}
                      className="w-full inline-flex items-center justify-center gap-2 bg-[#0085ff] hover:bg-blue-600 text-white font-bold text-xs uppercase tracking-widest px-4 py-2.5 rounded-xl transition-all shadow-md shadow-blue-500/10"
                    >
                      <span>Take Quiz</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Course Navigation Tabs list */}
            <div className="flex flex-wrap border-b border-slate-200 pb-1 gap-2">
              {[
                { id: 'curriculum', label: 'Curriculum Hub', icon: Library },
                { id: 'roadmap', label: 'Learning Roadmaps', icon: Milestone },
                { id: 'quizzes', label: 'Interactive Quizzes', icon: GraduationCap },
                { id: 'glossary', label: 'Sovereign Glossary', icon: BookOpen },
                { id: 'resources', label: 'Curated FAQs & Videos', icon: HelpCircle }
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as NavigatorTab)}
                    className={`flex items-center gap-2 px-5 py-3 rounded-t-xl text-xs font-bold transition-all relative uppercase tracking-wider outline-none ${
                      isActive
                        ? 'text-[#0085ff] border-b-2 border-[#0085ff] bg-slate-50 font-black'
                        : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50/50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Page Area dynamic rendering based on activeTab */}
            <div className="min-h-[400px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="transition-all"
                >
                  {activeTab === 'curriculum' && (
                    <KnowledgeHub 
                      user={user} 
                      bookmarks={bookmarks}
                      onToggleBookmark={handleToggleBookmark}
                      completedTopics={completedTopics}
                      onToggleCompleted={handleToggleCompleted}
                    />
                  )}
                  {activeTab === 'roadmap' && <LearningRoadmap />}
                  {activeTab === 'quizzes' && (
                    <QuizEngine 
                      user={user} 
                      scores={quizScores}
                      onSaveScore={handleSaveScore}
                    />
                  )}
                  {activeTab === 'glossary' && <GlossaryMatrix />}
                  {activeTab === 'resources' && <ResourcesGuide />}
                </motion.div>
              </AnimatePresence>
            </div>

          </motion.div>
        </AnimatePresence>
      </main>

      {/* Pristine Light Footer */}
      <footer className="relative z-10 py-12 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <img 
              src="https://i.ibb.co/nq1G0pmP/file-0000000099f071fd85bdf42c0cb05613.png" 
              alt="Verse Logo" 
              className="h-[34px] w-auto verse-logo object-contain"
              referrerPolicy="no-referrer"
            />
            <div className="w-px h-4 bg-slate-300" />
            <span className="text-slate-500 font-bold uppercase tracking-widest text-[9px] font-mono select-none">
              Crypto Sovereign Educational Platform
            </span>
          </div>

          <p className="text-slate-500 text-[10px] uppercase font-mono font-bold tracking-[0.2em] md:text-right">
            &copy; 2026 VERSE KNOWLEDGE HUB. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
