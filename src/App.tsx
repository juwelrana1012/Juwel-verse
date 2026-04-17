import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Star, Play, Cpu, BookOpen, Target, Gamepad2, Brain, Swords, User, Twitter, MessageCircle } from 'lucide-react';
import VerseQuiz from './components/VerseQuiz';
import BitcoinGuide from './components/BitcoinGuide';
import VerseSnake from './components/VerseSnake';
import VerseTapSurvival from './components/VerseTapSurvival';
import VerseMemoryMatch from './components/VerseMemoryMatch';
import VerseLudoKing from './components/VerseLudoKing';
import Login from './components/Login';

type GameType = 'verse' | 'guide' | 'snake' | 'tap' | 'game5' | 'game6' | null;

interface GameCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  onClick: () => void;
}

const GameCard = ({ title, description, icon, color, onClick }: GameCardProps) => (
  <motion.div
    onClick={onClick}
    className="game-card group relative overflow-hidden flex flex-col items-center justify-between h-full"
  >
    <div className={`absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 rounded-full opacity-10 blur-3xl transition-opacity group-hover:opacity-20 ${color}`} />
    
    <div className="flex flex-col items-center">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 shadow-lg ${color} text-white`}>
        {icon}
      </div>
      
      <h3 className="text-xl font-bold mb-2 group-hover:text-white transition-colors">{title}</h3>
      <p className="text-slate-400 text-xs leading-relaxed mb-4">{description}</p>
    </div>
    
    <button className="game-btn w-full">
      Play Now
    </button>
  </motion.div>
);

export default function App() {
  const [activeGame, setActiveGame] = useState<GameType>(null);
  const [user, setUser] = useState<string | null>(() => {
    return localStorage.getItem('gameUser');
  });

  // Clear programmatic suppression as per user request
  React.useEffect(() => {
    // Programmatic suppression removed. Logo visibility is now managed via CSS.
  }, []);

  const handleLogin = (username: string, save: boolean) => {
    setUser(username);
    if (save) {
      localStorage.setItem('gameUser', username);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('gameUser');
    setUser(null);
    setActiveGame(null);
  };

  return (
    <div className="min-h-screen bg-verse-bg text-slate-50 selection:bg-verse-blue/30">
      {/* Social Header */}
      <header className="relative z-20 w-full border-b border-white/5 bg-black py-4 md:py-6">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-4">
          {/* Header logo on the left */}
          <div className="flex items-center">
            <img 
              src="https://i.ibb.co/YBRT9QkB/IMG-20260417-223333-555.jpg" 
              alt="Verse Logo" 
              className="h-[35px] w-auto verse-logo object-contain"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="flex items-center gap-8">
            <a 
              href="https://x.com/VerseEcosystem" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-[10px] font-bold text-slate-500 hover:text-white transition-all uppercase tracking-widest"
            >
              <Twitter className="w-3.5 h-3.5 text-blue-400 group-hover:scale-110 transition-transform" />
              <span>@VerseEcosystem</span>
            </a>
            
            <div className="w-px h-3 bg-white/10" />

            <a 
              href="https://t.me/GetVerse" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-[10px] font-bold text-slate-500 hover:text-white transition-all uppercase tracking-widest"
            >
              <MessageCircle className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
              <span>Get Verse</span>
            </a>
          </div>
        </div>
      </header>

      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-verse-blue/10 blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] rounded-full bg-verse-pink/10 blur-[120px]" />
        <div className="absolute -bottom-[10%] left-[20%] w-[50%] h-[50%] rounded-full bg-white/5 blur-[120px]" />
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12 md:py-20">
        <AnimatePresence mode="wait">
          {!user ? (
            <Login onLogin={handleLogin} />
          ) : !activeGame ? (
            <motion.div
              key="menu"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-16"
            >
              {/* Header */}
              <div className="text-center space-y-6">
                <div className="flex flex-col items-center gap-6 mb-8">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center gap-4"
                  >
                    <img 
                      src="https://i.ibb.co/YBRT9QkB/IMG-20260417-223333-555.jpg" 
                      alt="Verse Logo" 
                      className="w-48 md:w-64 h-auto drop-shadow-[0_0_20px_rgba(0,133,255,0.3)] verse-logo"
                      referrerPolicy="no-referrer"
                    />
                    <div className="h-px w-24 bg-gradient-to-r from-transparent via-verse-blue to-transparent opacity-50" />
                  </motion.div>

                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-verse-blue font-bold text-sm tracking-widest font-display"
                  >
                    <Star className="w-4 h-4 fill-current animate-pulse" />
                    BEYOND THE ECOSYSTEM
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-4 bg-white/5 border border-white/10 px-6 py-2 rounded-2xl"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-verse-blue/20 rounded-lg flex items-center justify-center border border-verse-blue/30">
                        <User className="w-4 h-4 text-verse-blue" />
                      </div>
                      <span className="text-sm font-bold text-slate-300 font-display uppercase tracking-wider">Hello, {user}!</span>
                    </div>
                    <div className="w-px h-4 bg-white/10" />
                    <button 
                      onClick={handleLogout}
                      className="text-xs font-bold text-slate-500 hover:text-red-400 transition-colors uppercase tracking-widest"
                    >
                      Logout
                    </button>
                  </motion.div>
                </div>

                <div className="game-title-section text-center space-y-4">
                  <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase font-display text-[#00ffd5] drop-shadow-[0_0_15px_rgba(0,255,213,0.4)]">
                    VERSE INTERACTIVE HUB
                  </h1>
                  <p className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto font-medium leading-relaxed">
                    A collection of some addictive verse mini-games specially selected to test
                    your reflexes, memory and strategy.
                  </p>
                </div>
              </div>

              {/* Game Grid */}
              <div className="game-container">
                <GameCard
                  title="1. 📘 Intro to Bitcoin.com"
                  description="Learn about Bitcoin, Verse, and the future of finance."
                  icon={<BookOpen className="w-8 h-8" />}
                  color="bg-blue-500"
                  onClick={() => setActiveGame('guide')}
                />
                <GameCard
                  title="2. 🧠 Verse Quiz Master"
                  description="Answer questions based on Verse ecosystem & Crypto world."
                  icon={<Cpu className="w-8 h-8" />}
                  color="bg-cyan-500"
                  onClick={() => setActiveGame('verse')}
                />
                <GameCard
                  title="3. 🐍 Verse Snake"
                  description="Eat Verse logos and level up! Can you reach level 200?"
                  icon={<Gamepad2 className="w-8 h-8" />}
                  color="bg-green-500"
                  onClick={() => setActiveGame('snake')}
                />
                <GameCard
                  title="4. ⚡ Verse Tap Survival"
                  description="How fast can you tap? Test your reflexes in 15 seconds!"
                  icon={<Target className="w-8 h-8" />}
                  color="bg-indigo-500"
                  onClick={() => setActiveGame('tap')}
                />
                <GameCard
                  title="5. 🎲 Verse Ludo King"
                  description="A fast-paced board game! Capture your opponent and reach the finish line."
                  icon={<Swords className="w-8 h-8" />}
                  color="bg-amber-500"
                  onClick={() => setActiveGame('game5')}
                />
                <GameCard
                  title="6. 🧠 Verse Memory Match"
                  description="Test your memory! Match all the pairs in the fewest moves."
                  icon={<Brain className="w-8 h-8" />}
                  color="bg-emerald-500"
                  onClick={() => setActiveGame('game6')}
                />
              </div>

              {/* Stats Footer */}
              <div className="pt-12 border-t border-slate-900 flex flex-wrap justify-center gap-12 md:gap-24 opacity-50">
                <div className="text-center">
                  <p className="text-3xl font-black">6</p>
                  <p className="text-xs uppercase tracking-widest font-bold">Items</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-black">100%</p>
                  <p className="text-xs uppercase tracking-widest font-bold">Free</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-black">∞</p>
                  <p className="text-xs uppercase tracking-widest font-bold">Fun</p>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="game-container"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-4xl mx-auto"
            >
              {activeGame === 'verse' && <VerseQuiz onBack={() => setActiveGame(null)} />}
              {activeGame === 'guide' && <BitcoinGuide onBack={() => setActiveGame(null)} />}
              {activeGame === 'snake' && <VerseSnake onBack={() => setActiveGame(null)} />}
              {activeGame === 'tap' && <VerseTapSurvival onBack={() => setActiveGame(null)} />}
              {activeGame === 'game5' && <VerseLudoKing onBack={() => setActiveGame(null)} />}
              {activeGame === 'game6' && <VerseMemoryMatch onBack={() => setActiveGame(null)} />}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Minimal Footer */}
      <footer className="relative z-10 py-15 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-4 text-center">
          <div className="text-slate-600 text-[10px] uppercase font-bold tracking-[0.2em] space-y-1">
            <p>&copy; 2026 Verse Game. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
