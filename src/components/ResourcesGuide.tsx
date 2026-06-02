import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronDown, BookOpen, Film, Eye, Download, Info } from 'lucide-react';
import { FAQS } from '../data/learningContent';

export default function ResourcesGuide() {
  const [activeFaq, setActiveFaq] = useState<string | null>(null);
  const [activeFaqCategory, setActiveFaqCategory] = useState<string | null>(null);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const faqCategories = Array.from(new Set(FAQS.map(f => f.category)));

  const filteredFaqs = activeFaqCategory
    ? FAQS.filter(f => f.category === activeFaqCategory)
    : FAQS;

  const mVideoLessons = [
    {
      id: "vid-1",
      title: "Self-Custody Protocols: Securing your Mnemonics",
      duration: "10:24",
      instructor: "DeFi Research Lab",
      notes: "Overview of secure physical backups, hardware keystores, seed derivation routes, and avoiding online key logging vectors.",
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ" // Standard educational link placeholder
    },
    {
      id: "vid-2",
      title: "Verse DEX and AMM Mechanics Demystified",
      duration: "14:15",
      instructor: "Bitcoin.com Curriculum Team",
      notes: "Analysis of constant product formula x * y = k, liquidity mining providers, block level slip-pages, and open-source smart routing contracts.",
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      id: "vid-3",
      title: "The Web2 to Web3 paradigm shift analyzed",
      duration: "8:50",
      instructor: "Web3 Engineering Consortium",
      notes: "How distributed ledger states bypass platforms monopolies and establish user sovereign key-based identity permissions.",
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    }
  ];

  return (
    <div className="space-y-12">
      {/* Upper Grid: FAQs and Video Player */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* Interactive FAQ Accordion */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold font-display text-[#004dc0] flex items-center gap-2 uppercase tracking-wide">
              <HelpCircle className="text-[#0085ff] w-6 h-6" /> Curated Q&A Hub
            </h2>
            <p className="text-slate-600 text-sm font-semibold">
              Answers to critical questions regarding wallets, transactions propagation, and security methodologies.
            </p>
          </div>

          {/* FAQ categories filter */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveFaqCategory(null)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all uppercase tracking-wider ${
                activeFaqCategory === null
                  ? 'bg-[#0085ff] border-[#0085ff] text-white'
                  : 'bg-slate-50 border-slate-200 text-slate-500 hover:text-slate-800'
              }`}
            >
              All
            </button>
            {faqCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveFaqCategory(cat)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all uppercase tracking-wider ${
                  activeFaqCategory === cat
                    ? 'bg-[#0085ff] border-[#0085ff] text-white'
                    : 'bg-slate-50 border-slate-200 text-slate-500 hover:text-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Accordion List */}
          <div className="space-y-3">
            {filteredFaqs.map((faq) => {
              const isOpen = activeFaq === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white border border-slate-200 hover:border-[#0085ff]/30 rounded-xl overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : faq.id)}
                    className="w-full text-left px-5 py-4 flex justify-between items-center gap-4 transition-colors bg-slate-50/50"
                  >
                    <span className="font-bold text-[#004dc0] text-sm md:text-base">{faq.question}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#0085ff]' : ''}`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 pt-3 text-slate-700 text-[14.5px] leading-relaxed border-t border-slate-200/60 mt-1 font-semibold bg-white">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* Video Learning Section */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold font-display text-[#004dc0] flex items-center gap-2 uppercase tracking-wide">
              <Film className="text-[#0085ff] w-6 h-6" /> Video Academy
            </h2>
            <p className="text-slate-600 text-sm font-semibold">
              Watch curated video presentations with summary takeaways. Connect theoretical systems with mechanical actions.
            </p>
          </div>

          <div className="space-y-4">
            {mVideoLessons.map(video => (
              <div
                key={video.id}
                className="bg-white border border-slate-200 hover:border-[#0085ff]/45 p-5 rounded-2xl transition-all duration-300 flex flex-col md:flex-row gap-4 justify-between items-start hover:shadow-lg hover:shadow-blue-500/5 relative overflow-hidden"
              >
                {/* Top Accent line inside card */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-blue-500/10" />

                <div className="space-y-2 flex-grow">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-mono font-bold bg-blue-50 text-[#0085ff] border border-blue-100 px-2 py-0.5 rounded uppercase tracking-wider">
                      {video.duration} Mins
                    </span>
                    <span className="text-slate-500 text-[11px] font-bold font-mono">By {video.instructor}</span>
                  </div>
                  <h4 className="font-bold text-[#004dc0] text-base font-display">{video.title}</h4>
                  <p className="text-slate-600 text-xs leading-relaxed max-w-lg font-medium">{video.notes}</p>
                </div>

                <button
                  onClick={() => setActiveVideo(video.url)}
                  className="flex items-center gap-2 px-4 py-2 bg-[#0085ff] hover:bg-blue-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all self-end md:self-center flex-shrink-0"
                >
                  <Eye className="w-3.5 h-3.5" /> Watch Lesson
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Educational Infographics Hub */}
      <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 md:p-8 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold font-display text-[#004dc0] flex items-center gap-2 uppercase tracking-wide">
              <Info className="text-[#0085ff] w-6 h-6" /> Digital Sovereign Infographics
            </h2>
            <p className="text-slate-600 text-sm font-semibold">
              Visual schematics describing how decentralized keys and blockchain node consensus systems run.
            </p>
          </div>
        </div>

        {/* Infographic Visual representation of Token-Ledger Ecosystem */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 space-y-3 relative overflow-hidden group hover:border-[#0085ff]/30 transition-all">
            <div className="absolute top-0 right-0 p-3 opacity-[0.03] text-[#0085ff]">
              <BookOpen className="w-16 h-16" />
            </div>
            <p className="text-xs font-bold text-[#0085ff] font-mono uppercase tracking-widest">Phase I</p>
            <h4 className="font-bold text-slate-900 text-[15px] font-display">Decentralized Storage</h4>
            <p className="text-slate-600 text-xs leading-relaxed font-semibold">
              Files are split, cryptographically hashed, and distributed across multi-peer IPFS nodes globally.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 space-y-3 relative overflow-hidden group hover:border-[#0085ff]/30 transition-all font-sans">
            <div className="absolute top-0 right-0 p-3 opacity-[0.03] text-sky-500">
              <Film className="w-16 h-16" />
            </div>
            <p className="text-xs font-bold text-sky-600 font-mono uppercase tracking-widest">Phase II</p>
            <h4 className="font-bold text-slate-900 text-[15px] font-display">Asymmetric Cryptography</h4>
            <p className="text-slate-600 text-xs leading-relaxed font-semibold">
              Public address keys receive value blocks while corresponding matching private keys confirm transactions securely.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 space-y-3 relative overflow-hidden group hover:border-[#0085ff]/30 transition-all">
            <div className="absolute top-0 right-0 p-3 opacity-[0.03] text-indigo-5050">
              <Eye className="w-16 h-16" />
            </div>
            <p className="text-xs font-bold text-indigo-600 font-mono uppercase tracking-widest">Phase III</p>
            <h4 className="font-bold text-slate-900 text-[15px] font-display">Distributed Consensus</h4>
            <p className="text-slate-600 text-xs leading-relaxed font-semibold">
              Independent nodes verify key status and register valid blocks chronologically without central controllers.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-blue-50/50 border border-blue-100 space-y-3 relative overflow-hidden">
            <p className="text-xs font-bold text-[#0085ff] font-mono uppercase tracking-widest">Result</p>
            <h4 className="font-bold text-[#004dc0] text-[15px] font-display">Trustless Economy</h4>
            <p className="text-slate-600 text-xs leading-relaxed font-semibold">
              Safe, automated exchange of assets and direct coordinate alignments for communities globally.
            </p>
          </div>
        </div>
      </div>

      {/* Video Overlay Backdrop */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          >
            <div className="relative w-full max-w-3xl aspect-video bg-black rounded-2xl overflow-hidden border border-slate-700 shadow-2xl">
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute top-4 right-4 z-10 p-2.5 bg-black/60 hover:bg-black rounded-full border border-white/10 text-white transition-colors"
              >
                ✕ Close Player
              </button>
              <iframe
                src={activeVideo}
                title="Lesson Presentation Player"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
