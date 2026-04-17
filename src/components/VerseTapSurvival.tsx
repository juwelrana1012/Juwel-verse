import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, MousePointer2, Trophy, Timer, Zap } from 'lucide-react';

interface VerseTapSurvivalProps {
  onBack: () => void;
}

export default function VerseTapSurvival({ onBack }: VerseTapSurvivalProps) {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameover'>('idle');
  const [highScore, setHighScore] = useState(0);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isFrozen, setIsFrozen] = useState(false);
  const [taps, setTaps] = useState<{ id: number; x: number; y: number }[]>([]);

  const getSpeed = useCallback(() => {
    return timeLeft <= 10 ? 300 : 700;
  }, [timeLeft]);

  useEffect(() => {
    const saved = localStorage.getItem('verse_tap_highscore');
    if (saved) setHighScore(parseInt(saved));
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    let moveTimer: NodeJS.Timeout;

    if (gameState === 'playing' && timeLeft > 0) {
      // Main game timer
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      // Target movement timer - only if not frozen
      if (!isFrozen) {
        moveTimer = setInterval(() => {
          setActiveIndex(Math.floor(Math.random() * 12));
        }, getSpeed());
      }
    } else if (timeLeft === 0) {
      setGameState('gameover');
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem('verse_tap_highscore', score.toString());
      }
    }

    return () => {
      clearInterval(timer);
      clearInterval(moveTimer);
    };
  }, [gameState, timeLeft, score, highScore, isFrozen, getSpeed]);

  const freezeGame = () => {
    setIsFrozen(true);
    setTimeout(() => {
      setIsFrozen(false);
    }, 2000);
  };

  const handleBoxClick = (index: number, e: React.MouseEvent | React.TouchEvent) => {
    if (gameState !== 'playing' || isFrozen) return;

    if (index === activeIndex) {
      setScore((prev) => prev + 10);
      
      // Visual feedback
      const target = e.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      
      const newTap = {
        id: Date.now(),
        x: clientX - rect.left,
        y: clientY - rect.top,
      };
      setTaps((prev) => [...prev, newTap]);
      setTimeout(() => {
        setTaps((prev) => prev.filter((t) => t.id !== newTap.id));
      }, 400);
    } else {
      // Wrong tap penalty
      freezeGame();
    }
  };

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setIsFrozen(false);
    setGameState('playing');
    setActiveIndex(Math.floor(Math.random() * 12));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[600px] p-4 font-sans text-white">
      {/* Header */}
      <div className="w-full max-w-md mb-8 flex items-center justify-between">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex gap-6">
          <div className="text-center">
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Time</p>
            <p className={`text-xl font-black ${timeLeft < 5 ? 'text-red-500 animate-pulse' : 'text-game-secondary'}`}>
              {timeLeft}s
            </p>
          </div>
          <div className="text-center">
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Score</p>
            <p className="text-xl font-black text-game-accent">{score}</p>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {gameState === 'idle' ? (
          <motion.div
            key="idle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center max-w-sm w-full"
          >
            <div className="w-[60px] h-[60px] bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6 text-black text-3xl font-bold shadow-lg">
              V
            </div>
            <h2 className="text-4xl font-bold mb-4 tracking-tight text-white">Verse Tap Survival</h2>
            <p className="text-slate-400 mb-10 text-lg leading-relaxed">
              Tap the green boxes! Wrong taps freeze the game for 2s. Speed increases in the last 10s!
            </p>
            <button 
              onClick={startGame}
              className="w-full py-4 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-2xl transition-all active:scale-95 shadow-lg shadow-yellow-500/20 text-lg"
            >
              START SURVIVAL
            </button>
            {highScore > 0 && (
              <div className="mt-8 flex items-center justify-center gap-2 text-slate-500">
                <Trophy className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-medium uppercase tracking-wider">Best: {highScore}</span>
              </div>
            )}
          </motion.div>
        ) : gameState === 'playing' ? (
          <motion.div
            key="playing"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md"
          >
            <div className={`grid grid-cols-3 gap-2 p-4 bg-slate-900/50 rounded-3xl border border-white/5 transition-opacity duration-300 ${isFrozen ? 'opacity-50 grayscale' : 'opacity-100'}`}>
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  onClick={(e) => handleBoxClick(i, e)}
                  className={`relative h-24 rounded-2xl border-2 transition-all duration-150 cursor-pointer overflow-hidden flex items-center justify-center
                    ${i === activeIndex 
                      ? 'bg-lime-500 border-lime-400 shadow-[0_0_20px_rgba(132,204,22,0.4)] scale-105 z-10' 
                      : 'bg-slate-800/50 border-slate-700 hover:bg-slate-800'}`}
                >
                  <span className={`text-2xl font-black transition-colors ${i === activeIndex ? 'text-black' : 'text-slate-700'}`}>
                    V
                  </span>

                  {i === activeIndex && !isFrozen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute inset-0 flex items-center justify-center bg-lime-400/10"
                    >
                      <Zap className="w-8 h-8 text-black/50 animate-pulse" />
                    </motion.div>
                  )}

                  {isFrozen && (
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[1px] flex items-center justify-center">
                      <div className="w-1 h-8 bg-white/20 rounded-full animate-pulse" />
                    </div>
                  )}

                  {/* Tap Feedback Particles */}
                  <AnimatePresence>
                    {taps.map((tap) => (
                      <motion.div
                        key={tap.id}
                        initial={{ scale: 0, opacity: 1 }}
                        animate={{ scale: 2, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        className="absolute w-12 h-12 bg-white/30 rounded-full pointer-events-none border border-white/50"
                        style={{ left: tap.x - 24, top: tap.y - 24 }}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              ))}
            </div>
            {isFrozen && (
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mt-4 text-red-500 font-bold uppercase tracking-widest text-sm animate-pulse"
              >
                Frozen! 2s Penalty
              </motion.p>
            )}
            {timeLeft <= 10 && !isFrozen && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center mt-4 text-yellow-500 font-bold uppercase tracking-widest text-xs animate-bounce"
              >
                🔥 Spirit Boost Active!
              </motion.p>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="gameover"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center bg-slate-900/50 p-10 rounded-[2.5rem] border border-white/5 backdrop-blur-xl w-full max-w-sm"
          >
            <div className="w-20 h-20 bg-red-500/20 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Timer className="w-10 h-10 text-red-500" />
            </div>
            <h2 className="text-3xl font-bold mb-2 text-white">Time's Up!</h2>
            <p className="text-slate-400 mb-8">Great effort! Your speed was impressive.</p>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Score</p>
                <p className="text-2xl font-black text-game-accent">{score}</p>
              </div>
              <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Best</p>
                <p className="text-2xl font-black text-yellow-500">{highScore}</p>
              </div>
            </div>

            <button 
              onClick={startGame}
              className="w-full py-4 bg-white text-slate-900 font-bold rounded-2xl hover:bg-slate-200 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              TRY AGAIN
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
