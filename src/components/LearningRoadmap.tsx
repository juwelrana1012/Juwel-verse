import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, Compass, Search, ChevronRight, CheckCircle2, Terminal, Landmark, Blocks, Code2, Globe } from 'lucide-react';

interface RoadmapNode {
  id: string;
  tier: number;
  title: string;
  shortDesc: string;
  longDesc: string;
  estimatedTime: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  objectives: string[];
  icon: React.ComponentType<{ className?: string }>;
}

export default function LearningRoadmap() {
  const [selectedNode, setSelectedNode] = useState<RoadmapNode | null>(null);

  const nodes: RoadmapNode[] = [
    {
      id: "node-1",
      tier: 1,
      title: "Blockchain Foundations & Ledger Networks",
      shortDesc: "Demystify decentralized transaction blocks, cryptographic hashes, and consensus routing.",
      longDesc: "Understand how independent computer systems achieve synchronized, non-falsifiable agreement on transactions history without central intermediaries. This module teaches hashing, peer-to-peer ledger state synchronization, and standard security boundaries.",
      estimatedTime: "2 Hours",
      difficulty: "Beginner",
      objectives: ["Hashing mechanics (SHA-256)", "Peer-to-peer transaction broadcast chains", "Proof-of-work vs Proof-of-stake algorithms"],
      icon: Blocks
    },
    {
      id: "node-2",
      tier: 1,
      title: "Self-Custody Mechanics & Seed Keys",
      shortDesc: "Master private/public key pairs, mnemonics phrases, and cold vs hot secure wallets.",
      longDesc: "Take absolute sovereign command of your assets. Learn the mathematical processes behind seed phrases (BIP-39 standards), private/public key derivations, and the real-world practices of defending your wallets against physical & digital theft.",
      estimatedTime: "1.5 Hours",
      difficulty: "Beginner",
      objectives: ["Private and Public Key asymmetric pairs", "Sovereign recovery seed phrases safeguarding", "Evaluating Air-Gapped and hardware hot/cold wallets"],
      icon: Code2
    },
    {
      id: "node-3",
      tier: 2,
      title: "Decentralized Finance (DeFi) Demystified",
      shortDesc: "Understand Constant Product AMMs, peer-to-contract liquidity pools, and smart routers.",
      longDesc: "Ditch the brokers. Step into a world of open, permissionless financial operations. Analyze how automated market makers (AMMs), decentralized exchanges (DEXs), and liquidity loops operate autonomously on public state machines.",
      estimatedTime: "3 Hours",
      difficulty: "Intermediate",
      objectives: ["Constant product formulas (x * y = k) dynamics", "Slippage limits, price impact, impermanent loss", "Smart contract yield generation protocols"],
      icon: Terminal
    },
    {
      id: "node-4",
      tier: 2,
      title: "The VERSE Tokenomics Ecosystem",
      shortDesc: "Examine buyback burns, token utilities, community governance, and dApp reward chains.",
      longDesc: "A complete forensic inspection of the VERSE utility token. Delve into token supply allocation metrics, decentralization goals, utility integrations across Bitcoin.com services, and dynamic reward systems for community active developers.",
      estimatedTime: "2 Hours",
      difficulty: "Intermediate",
      objectives: ["VERSE deflationary buyback design metrics", "Utility use-cases across decentralized wallets", "Governance rights and community proposal submission pathways"],
      icon: Landmark
    },
    {
      id: "node-5",
      tier: 3,
      title: "The Web3 Sovereign Horizon",
      shortDesc: "Deep dive into sovereign identity keys, gasless dApp transactions, and global DAO protocols.",
      longDesc: "Explore the bleeding-edge layout of the decentralized web. Witness how decentralized identity keys, gasless transactions abstraction layers, and decentralized autonomous organizations (DAOs) reshape user sovereignty globally.",
      estimatedTime: "4 Hours",
      difficulty: "Advanced",
      objectives: ["Sovereign decentralized identity (DID) credentials", "ERC-4337 account abstraction and gasless transfers", "On-chain DAO voting execution systems"],
      icon: Globe
    }
  ];

  return (
    <div className="space-y-12 max-w-5xl mx-auto">
      {/* Title block */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-15 bg-blue-50 border border-blue-15/30 border-blue-100 text-[#0085ff] text-xs font-bold rounded-full uppercase tracking-wider">
          <Compass className="w-3.5 h-3.5" /> VERSE Pedagogical Roadmap
        </div>
        <h2 className="text-3xl md:text-4xl font-black font-display text-slate-900 uppercase tracking-tight">Structured Sovereign Path</h2>
        <p className="text-slate-600 text-sm leading-relaxed font-semibold">
          Avoid coordinate-noise or information overload. Follow this pristine, class-room tested pathway from fundamental cryptography up to complex multi-chain tokenomics.
        </p>
      </div>

      {/* Visual Roadmap Path Column */}
      <div className="relative pl-8 md:pl-12 border-l-2 border-dashed border-blue-200 space-y-12 py-4">
        {nodes.map((node, i) => {
          const NodeIcon = node.icon;
          return (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative group"
            >
              {/* Outer Indicator node marker */}
              <div className="absolute -left-[53px] md:-left-[69px] top-1.5 w-10 h-10 md:w-12 md:h-12 rounded-full border-4 border-white bg-slate-50 flex items-center justify-center text-[#0085ff] shadow-sm transition-all duration-300 group-hover:bg-blue-50 group-hover:border-[#0085ff] group-hover:shadow-md animate-none">
                <NodeIcon className="w-5 h-5" />
              </div>

              {/* Tier Label */}
              <span className="text-[10px] font-bold font-mono text-[#0085ff] uppercase tracking-widest bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
                Tier {node.tier} Progress Node
              </span>

              {/* Node Card - Solid White Container with soft borders */}
              <div 
                onClick={() => setSelectedNode(node)}
                className="mt-4 bg-white border border-slate-200 hover:border-[#0085ff]/50 rounded-2xl p-6 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-blue-500/5 group"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold font-display text-[#004dc0] group-hover:text-[#0085ff] transition-colors leading-snug">
                      {node.title}
                    </h3>
                    <p className="text-slate-600 text-sm font-medium leading-relaxed max-w-2xl">
                      {node.shortDesc}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-[10px] font-bold font-mono bg-slate-100 text-slate-700 border border-slate-25 border-slate-200/60 px-2.5 py-0.5 rounded capitalize">
                      {node.estimatedTime}
                    </span>
                    <span className={`text-[10px] font-bold font-mono px-2.5 py-0.5 rounded uppercase tracking-wider ${
                      node.difficulty === 'Beginner' ? 'bg-green-50 text-green-700 border border-green-200' :
                      node.difficulty === 'Intermediate' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                      'bg-indigo-50 text-indigo-700 border border-indigo-200'
                    }`}>
                      {node.difficulty}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center text-xs font-bold text-slate-400">
                  <span className="uppercase tracking-widest text-[10px] font-mono text-[#0085ff]/80">Click for Course Syllabus Details</span>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#0085ff] group-hover:translate-x-1.5 transition-all" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Node Detail Popup Overlay */}
      <AnimatePresence>
        {selectedNode && (
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
              className="bg-white border border-slate-200 w-full max-w-2xl rounded-3xl p-6 md:p-8 shadow-2xl space-y-6 relative overflow-hidden"
            >
              {/* Header Status */}
              <div className="flex justify-between items-start gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold text-[#0085ff] uppercase tracking-widest bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-md">
                    Syllabus Node Tier {selectedNode.tier}
                  </span>
                  <h3 className="text-2xl font-black font-display text-[#004dc0] pt-1 leading-tight uppercase">
                    {selectedNode.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedNode(null)}
                  className="p-1 px-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-500 hover:text-slate-900 transition-colors font-bold text-xs"
                >
                  ✕ Close
                </button>
              </div>

              {/* Description */}
              <div className="space-y-3">
                <p className="text-[11px] font-bold uppercase tracking-widest text-[#0085ff] font-mono">Detailed Focus Objective:</p>
                <p className="text-slate-600 text-sm md:text-base leading-relaxed font-semibold">
                  {selectedNode.longDesc}
                </p>
              </div>

              {/* Learning objectives checked */}
              <div className="space-y-3 pt-2">
                <p className="text-[11px] font-bold uppercase tracking-widest text-[#0085ff] font-mono">Milestone Mastery Checkpoints:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedNode.objectives.map((obj, i) => (
                    <div key={i} className="flex gap-2.5 items-start p-3 bg-slate-50 border border-slate-200 rounded-xl">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-600 text-xs md:text-sm leading-relaxed font-bold">{obj}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom footer bar */}
              <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                <div className="text-slate-500 text-xs font-mono">
                  Suggested Time: <span className="font-bold text-[#004dc0]">{selectedNode.estimatedTime}</span>
                </div>
                <button
                  onClick={() => setSelectedNode(null)}
                  className="px-6 py-2.5 bg-[#0085ff] hover:bg-blue-600 text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-all"
                >
                  Acknowledge Goal &rarr;
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
