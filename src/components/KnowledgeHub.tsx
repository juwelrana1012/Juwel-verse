import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import * as Icons from 'lucide-react';
import { CATEGORIES, CategoryData } from '../data/learningContent';

interface KnowledgeHubProps {
  user: string;
  bookmarks: string[];
  onToggleBookmark: (articleId: string) => void;
  completedTopics: string[];
  onToggleCompleted: (articleId: string) => void;
}

export default function KnowledgeHub({ 
  user, 
  bookmarks, 
  onToggleBookmark, 
  completedTopics, 
  onToggleCompleted 
}: KnowledgeHubProps) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryData | null>(null);
  const [activeTab, setActiveTab] = useState<'intro' | 'history' | 'tech' | 'benefits' | 'practical' | 'guide' | 'advanced'>('intro');
  const [searchQuery, setSearchQuery] = useState('');

  // Helper dynamic rendering of Lucide icons
  const getIconComponent = (iconName: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const IconComponent = (Icons as any)[iconName];
    return IconComponent ? <IconComponent className="w-5 h-5 text-[#0085ff]" /> : <Icons.BookOpen className="w-5 h-5 text-[#0085ff]" />;
  };

  const filteredCategories = CATEGORIES.filter(cat => 
    cat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cat.shortDesc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-12">
      <AnimatePresence mode="wait">
        {!selectedCategory ? (
          <motion.div
            key="list"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-8"
          >
            {/* Search and Overview Banner in Soft Premium Blue Accent */}
            <div className="bg-gradient-to-r from-blue-50/80 via-indigo-50/45 to-white border border-blue-100 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-6 justify-between items-center shadow-sm">
              <div className="space-y-2 text-center md:text-left max-w-xl">
                <h2 className="text-3xl font-black font-display text-[#004dc0] uppercase tracking-tight">The Core Curriculum</h2>
                <p className="text-slate-600 text-sm leading-relaxed font-sans font-medium">
                  Dive into structured knowledge about DeFi, Blockchain networks, secure self-custody systems, and the internet evolution timelines. Select a category below to start learning.
                </p>
              </div>
              <div className="relative w-full md:w-80">
                <Icons.Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#0085ff]" />
                <input
                  type="text"
                  placeholder="Search course topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-blue-200 hover:border-[#0085ff]/50 focus:border-[#0085ff] focus:ring-4 focus:ring-blue-100 rounded-xl py-3 pl-12 pr-4 text-slate-800 text-sm outline-none placeholder:text-slate-400 transition-all shadow-sm"
                />
              </div>
            </div>

            {/* Grid display */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCategories.map((cat, idx) => {
                const articleId = `${cat.id}_main`;
                const isBookmarked = bookmarks.includes(articleId);
                const isCompleted = completedTopics.includes(articleId);

                return (
                  <motion.div
                    key={cat.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="relative group bg-white border border-slate-200/80 hover:border-[#0085ff]/60 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5 relative overflow-hidden"
                  >
                    {/* Top Accent line */}
                    <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#0085ff] via-[#db00ff] to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />

                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                          {getIconComponent(cat.icon)}
                        </div>
                        <div className="flex gap-2">
                          {isCompleted && (
                            <span className="flex items-center gap-1 text-[10px] bg-green-50 text-green-700 border border-green-200 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                              <Icons.Check className="w-3 h-3" /> Completed
                            </span>
                          )}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onToggleBookmark(articleId);
                            }}
                            className={`p-2 rounded-lg border transition-all ${
                              isBookmarked
                                ? 'bg-amber-50 border-amber-200 text-amber-600'
                                : 'bg-slate-50 border-slate-200/60 text-slate-400 hover:text-slate-600'
                            }`}
                          >
                            <Icons.Bookmark className="w-3.5 h-3.5 fill-current" />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-xl font-bold font-display text-[#004dc0] group-hover:text-[#0085ff] transition-colors leading-tight">
                          {cat.title}
                        </h3>
                        <p className="text-slate-600 text-xs leading-relaxed line-clamp-3 font-medium">
                          {cat.shortDesc}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center">
                      <span className="text-[10px] font-bold text-[#0085ff]/80 uppercase tracking-widest font-mono">
                        Mastery Module
                      </span>
                      <button
                        onClick={() => {
                          setSelectedCategory(cat);
                          setActiveTab('intro');
                        }}
                        className="flex items-center gap-1.5 text-xs font-black text-[#0085ff] group-hover:text-blue-700 transition-colors"
                      >
                        Enter Course <Icons.TrendingUp className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
              {filteredCategories.length === 0 && (
                <div className="col-span-full py-16 text-center text-slate-500 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                  <Icons.AlertTriangle className="w-12 h-12 mx-auto text-[#0085ff] opacity-75 mb-4" />
                  <p className="text-lg font-bold text-slate-800">No course topics matched your search queries.</p>
                  <p className="text-sm text-slate-400 mt-1">Try searching for keywords like "Wallet", "Blockchain", or "VERSE".</p>
                </div>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="reader"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="space-y-8"
          >
            {/* Top Navigation Bar inside article */}
            <div className="flex flex-wrap items-center justify-between gap-4 py-2 border-b border-slate-200">
              <button
                onClick={() => setSelectedCategory(null)}
                className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors uppercase tracking-widest"
              >
                <Icons.ArrowLeft className="w-4 h-4 text-[#0085ff]" /> Back to Curriculum
              </button>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => onToggleBookmark(`${selectedCategory.id}_main`)}
                  className={`flex items-center gap-2 px-4 py-2 border rounded-xl text-xs font-bold transition-all uppercase tracking-wider ${
                    bookmarks.includes(`${selectedCategory.id}_main`)
                      ? 'bg-amber-50 border-amber-200 text-amber-600'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Icons.Bookmark className="w-3.5 h-3.5 fill-current" />
                  {bookmarks.includes(`${selectedCategory.id}_main`) ? 'Bookmarked' : 'Add to Bookmarks'}
                </button>

                <button
                  onClick={() => onToggleCompleted(`${selectedCategory.id}_main`)}
                  className={`flex items-center gap-2 px-4 py-2 border rounded-xl text-xs font-bold transition-all uppercase tracking-wider ${
                    completedTopics.includes(`${selectedCategory.id}_main`)
                      ? 'bg-green-50 border-green-200 text-green-700'
                      : 'bg-[#0085ff] hover:bg-blue-600 border-[#0085ff] text-white'
                  }`}
                >
                  <Icons.Check className="w-3.5 h-3.5" />
                  {completedTopics.includes(`${selectedCategory.id}_main`) ? 'Topic Fully Mastered!' : 'Mark Topic Mastered'}
                </button>
              </div>
            </div>

            {/* Structured Page Header */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-[#0085ff] font-bold text-xs uppercase tracking-widest px-3 py-1 rounded-full">
                {selectedCategory.title} Standard Guide
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black font-display text-[#004dc0] uppercase tracking-tight leading-tight">
                {selectedCategory.articles["main"].title}
              </h1>
              <p className="text-slate-600 text-base md:text-lg font-medium max-w-4xl italic leading-relaxed">
                "{selectedCategory.articles["main"].shortDesc}"
              </p>
            </div>

            {/* Interactive Layout: Side-Tabs containing detailed Pedagogical approach */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Vertical Tab Navigation */}
              <div className="lg:col-span-3 space-y-2 lg:sticky lg:top-4 bg-slate-50 border border-slate-200 p-4 rounded-2xl">
                <span className="block text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 mb-4 px-2">
                  COURSE PATHWAY
                </span>
                
                {[
                  { id: 'intro', label: '1. Basic Introduction', icon: 'Compass' },
                  { id: 'history', label: '2. Origin & History', icon: 'History' },
                  { id: 'tech', label: '3. Technical Pillars', icon: 'Cpu' },
                  { id: 'benefits', label: '4. Benefits vs Limitations', icon: 'Flame' },
                  { id: 'practical', label: '5. Real-World Applications', icon: 'Workflow' },
                  { id: 'guide', label: '6. Beginner\'s Guide', icon: 'BookOpen' },
                  { id: 'advanced', label: '7. Advanced Analysis', icon: 'TrendingUp' }
                ].map((tab) => {
                  const Icon = (Icons as any)[tab.icon] || Icons.Book;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-xs font-bold transition-all relative overflow-hidden ${
                        activeTab === tab.id
                          ? 'bg-[#0085ff] text-white shadow-md shadow-blue-500/10'
                          : 'text-slate-600 hover:text-[#0085ff] hover:bg-white'
                      }`}
                    >
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Central Content Area detailing the exact approaches */}
              <div className="lg:col-span-9 bg-white border border-slate-200 rounded-3xl p-6 md:p-10 shadow-sm min-h-[450px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    {activeTab === 'intro' && (
                      <div className="space-y-6">
                        <h2 className="text-2xl font-bold font-display text-[#004dc0] flex items-center gap-2 border-b border-slate-200 pb-3 uppercase tracking-wide">
                          <Icons.Compass className="text-[#0085ff] w-6 h-6" /> Detailed Introduction
                        </h2>
                        <p className="text-slate-700 text-[16px] md:text-base leading-relaxed whitespace-pre-wrap font-sans font-medium">
                          {selectedCategory.articles["main"].introduction}
                        </p>
                        <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-6 mt-6">
                          <p className="text-xs font-bold text-[#0085ff] uppercase tracking-widest font-mono mb-2">Educators Tip</p>
                          <p className="text-slate-600 text-sm font-medium">
                            This module is designed for learners of all backgrounds. Re-read sections as needed and attempt the companion quiz afterwards in the Quiz Hub to cement your mastery!
                          </p>
                        </div>
                      </div>
                    )}

                    {activeTab === 'history' && (
                      <div className="space-y-6">
                        <h2 className="text-2xl font-bold font-display text-[#004dc0] flex items-center gap-2 border-b border-slate-200 pb-3 uppercase tracking-wide">
                          <Icons.History className="text-blue-500 w-6 h-6" /> Origin & Historical Genesis
                        </h2>
                        <div className="space-y-6 text-slate-700 text-base leading-relaxed font-sans font-medium">
                          <p className="whitespace-pre-wrap">{selectedCategory.articles["main"].originHistory}</p>
                          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                            <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-3">When, Why, & How it was created:</h4>
                            <p className="text-slate-600 text-sm font-medium">{selectedCategory.articles["main"].whenWhyHow}</p>
                          </div>
                          <div className="border-l-4 border-[#0085ff] pl-4 py-1">
                            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest font-mono">Key Contributors & Founders:</h4>
                            <p className="text-slate-800 text-sm font-bold mt-1">{selectedCategory.articles["main"].foundersContributors}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === 'tech' && (
                      <div className="space-y-6">
                        <h2 className="text-2xl font-bold font-display text-[#004dc0] flex items-center gap-2 border-b border-slate-200 pb-3 uppercase tracking-wide">
                          <Icons.Cpu className="text-blue-600 w-6 h-6" /> Technical Foundations & Operation
                        </h2>
                        <p className="text-slate-700 text-base leading-relaxed whitespace-pre-wrap font-sans font-medium">
                          {selectedCategory.articles["main"].technicalFoundations}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                            <h4 className="font-bold text-slate-800 text-sm mb-2 uppercase tracking-wide">Dynamic Popularity</h4>
                            <p className="text-slate-600 text-xs leading-relaxed font-medium">{selectedCategory.articles["main"].popularityReasons}</p>
                          </div>
                          <div className="p-5 rounded-2xl bg-blue-50/50 border border-blue-100 flex flex-col justify-center">
                            <h4 className="font-bold text-[#0085ff] text-sm mb-2 uppercase tracking-widest font-mono">Ledger Cryptography</h4>
                            <p className="text-slate-600 text-xs font-medium">All activities operate deterministically on open source consensus algorithms, free of personal discretion.</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === 'benefits' && (
                      <div className="space-y-6">
                        <h2 className="text-2xl font-bold font-display text-[#004dc0] flex items-center gap-2 border-b border-slate-200 pb-3 uppercase tracking-wide">
                          <Icons.Flame className="text-amber-600 w-6 h-6" /> Benefits, Limitations, and Potential
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                          <div className="space-y-4">
                            <h3 className="font-bold text-green-700 flex items-center gap-2 text-lg">
                              <Icons.CheckCircle className="w-5 h-5 flex-shrink-0 text-green-600" /> Benefits & Assets
                            </h3>
                            <ul className="space-y-2">
                              {selectedCategory.articles["main"].benefitsLimitations.benefits.map((ben, i) => (
                                <li key={i} className="flex gap-2 text-[14px] text-slate-600 leading-relaxed font-bold">
                                  <span className="text-green-500">&#8226;</span> {ben}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="space-y-4">
                            <h3 className="font-bold text-red-700 flex items-center gap-2 text-lg">
                              <Icons.XCircle className="w-5 h-5 flex-shrink-0 text-red-600" /> Limitations & Weaknesses
                            </h3>
                            <ul className="space-y-2">
                              {selectedCategory.articles["main"].benefitsLimitations.limitations.map((lim, i) => (
                                <li key={i} className="flex gap-2 text-[14px] text-slate-600 leading-relaxed font-bold">
                                  <span className="text-red-500">&#8226;</span> {lim}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === 'practical' && (
                      <div className="space-y-6">
                        <h2 className="text-2xl font-bold font-display text-[#004dc0] flex items-center gap-2 border-b border-slate-200 pb-3 uppercase tracking-wide">
                          <Icons.Workflow className="text-blue-500 w-6 h-6" /> Practical-use Cases
                        </h2>
                        <div className="space-y-4">
                          {selectedCategory.articles["main"].realWorldCases.map((useCase, idx) => (
                            <div key={idx} className="flex gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200/80 items-start">
                              <div className="w-8 h-8 rounded-full bg-blue-100 text-[#0085ff] font-extrabold flex items-center justify-center flex-shrink-0 font-mono text-xs">
                                0{idx + 1}
                              </div>
                              <p className="text-slate-700 text-sm md:text-base leading-relaxed pt-0.5 font-sans font-semibold">{useCase}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeTab === 'guide' && (
                      <div className="space-y-6">
                        <h2 className="text-2xl font-bold font-display text-[#004dc0] flex items-center gap-2 border-b border-slate-200 pb-3 uppercase tracking-wide">
                          <Icons.BookOpen className="text-blue-500 w-6 h-6" /> Step-by-Step Beginner Guide
                        </h2>
                        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 md:p-8 space-y-6 text-slate-700 text-base leading-relaxed font-sans font-medium">
                          <p className="whitespace-pre-wrap">{selectedCategory.articles["main"].beginnerGuide}</p>
                        </div>
                      </div>
                    )}

                    {activeTab === 'advanced' && (
                      <div className="space-y-6">
                        <h2 className="text-2xl font-bold font-display text-[#004dc0] flex items-center gap-2 border-b border-slate-200 pb-3 uppercase tracking-wide">
                          <Icons.TrendingUp className="text-indigo-600 w-6 h-6" /> In-depth Advanced Analysis
                        </h2>
                        <div className="border border-indigo-100 bg-indigo-50/20 rounded-3xl p-6 md:p-8 space-y-6 text-slate-700 text-base leading-relaxed font-sans font-medium">
                          <p className="whitespace-pre-wrap">{selectedCategory.articles["main"].advancedAnalysis}</p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
