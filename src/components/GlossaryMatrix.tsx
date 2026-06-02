import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Compass, BookOpen, ExternalLink, HelpCircle } from 'lucide-react';
import { GLOSSARY, TermDefinition } from '../data/learningContent';

export default function GlossaryMatrix() {
  const [activeTerm, setActiveTerm] = useState<TermDefinition | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCat, setActiveCat] = useState<string | null>(null);

  // Derive active categories
  const categories = Array.from(new Set(GLOSSARY.map(g => g.category)));

  // Filter glossary list
  const filtered = GLOSSARY.filter(item => {
    const matchesSearch = item.term.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.definition.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = activeCat ? item.category === activeCat : true;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-12">
      {/* Search and Filters Hub */}
      <div className="bg-gradient-to-r from-blue-50/80 via-white to-white border border-blue-100 rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-black font-display text-[#004dc0] flex items-center gap-2 uppercase tracking-wide">
              <BookOpen className="text-[#0085ff] w-6 h-6" /> Glossary & Encyclopedia
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed font-semibold">
              Forensic definitions of Web3 standards, cryptography protocols, block algorithms, and tokenomics.
            </p>
          </div>

          {/* Search bar inside header wrapper */}
          <div className="relative w-full md:w-80 flex-shrink-0">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search cryptographic terms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-blue-200 hover:border-[#0085ff]/50 focus:border-[#0085ff] focus:ring-4 focus:ring-blue-100 rounded-xl py-2.5 pl-11 pr-4 text-slate-800 text-xs outline-none placeholder:text-slate-400 transition-all font-medium"
            />
          </div>
        </div>

        {/* Dynamic Category filtering buttons */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
          <button
            onClick={() => setActiveCat(null)}
            className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all uppercase tracking-widest ${
              activeCat === null
                ? 'bg-[#0085ff] border-[#0085ff] text-white shadow-md shadow-blue-500/10'
                : 'bg-slate-50 border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-100'
            }`}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all uppercase tracking-widest ${
                activeCat === cat
                  ? 'bg-[#0085ff] border-[#0085ff] text-white shadow-md shadow-blue-500/10'
                  : 'bg-slate-50 border-slate-200 text-slate-500 hover:text-[#0085ff] hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Terms */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div
            key={item.term}
            onClick={() => setActiveTerm(item)}
            className="group bg-white border border-slate-200/80 hover:border-[#0085ff]/50 rounded-2xl p-6 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-blue-500/5 relative overflow-hidden flex flex-col justify-between"
          >
            {/* Soft blue corner category indicator */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-[#0085ff] uppercase tracking-widest bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded-full">
                  {item.category}
                </span>
                <HelpCircle className="w-4 h-4 text-slate-300 group-hover:text-[#0085ff] transition-colors" />
              </div>

              <div className="space-y-2">
                <h4 className="text-xl font-bold font-display text-[#004dc0] group-hover:text-[#0085ff] transition-colors">
                  {item.term}
                </h4>
                <p className="text-slate-600 text-xs leading-relaxed line-clamp-3 font-medium">
                  {item.definition}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-400 group-hover:text-[#0085ff] transition-colors font-mono uppercase tracking-widest">
              <span>View full definition</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-full py-16 text-center text-slate-500 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            <Compass className="w-12 h-12 mx-auto text-[#0085ff]/70 mb-4" />
            <p className="text-lg font-bold text-slate-800">No jargon words matched search parameters.</p>
            <p className="text-sm text-slate-400 mt-1">Try typing a acronym like "AMM", "DeFi", or "Sovereignty".</p>
          </div>
        )}
      </div>

      {/* Term Modal Overlay */}
      <AnimatePresence>
        {activeTerm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white border border-slate-200 w-full max-w-xl rounded-3xl p-6 md:p-8 shadow-2xl space-y-6 relative overflow-hidden"
            >
              {/* Header inside modal */}
              <div className="flex justify-between items-start gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold text-[#0085ff] uppercase tracking-widest bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-md">
                    Web3 Encyclopedia {activeTerm.category}
                  </span>
                  <h3 className="text-2xl font-black font-display text-[#004dc0] pt-1 uppercase leading-none">
                    {activeTerm.term}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveTerm(null)}
                  className="px-2.5 py-1 text-slate-500 hover:text-slate-900 bg-slate-50 border border-slate-25 border-slate-200 rounded-lg text-xs font-bold transition-all"
                >
                  ✕ Close
                </button>
              </div>

              {/* Definition */}
              <div className="space-y-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#0085ff] font-mono">Academic Definition:</p>
                <p className="text-slate-700 text-sm md:text-base leading-relaxed font-semibold">
                  {activeTerm.definition}
                </p>
              </div>

              {/* Reference Example */}
              {activeTerm.example && (
                <div className="bg-blue-50/50 border border-blue-100/50 rounded-2xl p-5 space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#0085ff] font-mono">Practical Example & Context:</p>
                  <p className="text-slate-600 text-xs leading-relaxed font-semibold">
                    {activeTerm.example}
                  </p>
                </div>
              )}

              {/* Close Button at bottom */}
              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => setActiveTerm(null)}
                  className="px-5 py-2.5 bg-[#0085ff] hover:bg-blue-600 text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-all"
                >
                  I Understand Term &rarr;
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
