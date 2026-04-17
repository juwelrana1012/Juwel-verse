import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, Trophy, Dices, User, Swords } from 'lucide-react';

interface VerseLudoKingProps {
  onBack: () => void;
}

const BOARD_SIZE = 20;

export default function VerseLudoKing({ onBack }: VerseLudoKingProps) {
  const [positions, setPositions] = useState({ player: 0, ai: 0 });
  const [turn, setTurn] = useState<'player' | 'ai'>('player');
  const [lastDice, setLastDice] = useState<{ player: number | null; ai: number | null }>({ player: null, ai: null });
  const [isRolling, setIsRolling] = useState(false);
  const [winner, setWinner] = useState<'player' | 'ai' | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [totalScore, setTotalScore] = useState(0);

  useEffect(() => {
    const savedScore = localStorage.getItem('verse_ludo_score');
    if (savedScore) setTotalScore(parseInt(savedScore));
  }, []);

  const addLog = (msg: string) => {
    setLogs(prev => [msg, ...prev].slice(0, 5));
  };

  const executeMove = useCallback((who: 'player' | 'ai', dice: number) => {
    setPositions(prev => {
      const nextPositions = { ...prev };
      let newPos = nextPositions[who] + dice;

      if (newPos >= BOARD_SIZE) {
        newPos = BOARD_SIZE - 1;
      }

      nextPositions[who] = newPos;

      // Capture logic
      if (who === 'player') {
        if (newPos === nextPositions.ai && newPos !== 0 && newPos !== BOARD_SIZE - 1) {
          nextPositions.ai = 0;
          addLog("🔵 You captured 🤖 AI!");
        }
      } else {
        if (newPos === nextPositions.player && newPos !== 0 && newPos !== BOARD_SIZE - 1) {
          nextPositions.player = 0;
          addLog("🤖 AI captured 🔵 You!");
        }
      }

      if (newPos === BOARD_SIZE - 1) {
        setWinner(who);
        if (who === 'player') {
          const newScore = totalScore + 10;
          setTotalScore(newScore);
          localStorage.setItem('verse_ludo_score', newScore.toString());
        }
      }

      return nextPositions;
    });
  }, [totalScore]);

  const aiRoll = useCallback(() => {
    if (winner) return;
    
    setIsRolling(true);
    setTimeout(() => {
      const dice = Math.floor(Math.random() * 6) + 1;
      setLastDice(prev => ({ ...prev, ai: dice }));
      setIsRolling(false);
      executeMove('ai', dice);
      setTurn('player');
    }, 1200);
  }, [winner, executeMove]);

  const playerRoll = () => {
    if (isRolling || winner || turn !== 'player') return;

    setIsRolling(true);
    setTimeout(() => {
      const dice = Math.floor(Math.random() * 6) + 1;
      setLastDice({ player: dice, ai: null });
      setIsRolling(false);
      executeMove('player', dice);
      
      if (positions.player + dice < BOARD_SIZE - 1) {
        setTurn('ai');
        setTimeout(aiRoll, 500);
      }
    }, 600);
  };

  const resetGame = () => {
    setPositions({ player: 0, ai: 0 });
    setTurn('player');
    setLastDice({ player: null, ai: null });
    setWinner(null);
    setLogs([]);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[600px] p-4 font-sans text-white">
      {/* Header */}
      <div className="w-full max-w-md mb-6 flex items-center justify-between">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex gap-4">
          <div className={`px-4 py-1 rounded-full text-xs font-bold border transition-all ${turn === 'player' ? 'bg-blue-500/20 border-blue-500 text-blue-400 scale-110 shadow-[0_0_10px_rgba(59,130,246,0.3)]' : 'bg-slate-800 border-slate-700 text-slate-500'}`}>
            YOU
          </div>
          <div className={`px-4 py-1 rounded-full text-xs font-bold border transition-all ${turn === 'ai' ? 'bg-red-500/20 border-red-500 text-red-400 scale-110 shadow-[0_0_10px_rgba(239,68,68,0.3)]' : 'bg-slate-800 border-slate-700 text-slate-500'}`}>
            AI 🤖
          </div>
        </div>
      </div>

      <div className="w-full max-w-md bg-slate-900/50 p-6 rounded-[2.5rem] border border-white/5 backdrop-blur-xl shadow-2xl">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Trophy className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-bold text-yellow-500 uppercase tracking-widest">Score: {totalScore}</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight flex items-center justify-center gap-2">
            <Swords className="w-6 h-6 text-yellow-500" />
            VERSE LUDO KING AI
          </h2>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mt-1">
            {turn === 'player' ? 'Your Turn' : 'AI Thinking...'}
          </p>
        </div>

        {/* Board Grid */}
        <div className="grid grid-cols-5 gap-2 mb-8">
          {Array.from({ length: BOARD_SIZE }).map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-xl border-2 flex items-center justify-center relative transition-all duration-300
                ${i === BOARD_SIZE - 1 ? 'bg-yellow-500/20 border-yellow-500' : 'bg-slate-800/50 border-slate-700'}
                ${(positions.player === i || positions.ai === i) ? 'shadow-inner' : ''}`}
            >
              <span className="text-[10px] absolute top-1 left-1 opacity-20 font-bold">{i}</span>
              
              {i === BOARD_SIZE - 1 && <Trophy className="w-4 h-4 text-yellow-500/30 absolute" />}

              <div className="flex gap-1">
                <AnimatePresence>
                  {positions.player === i && (
                    <motion.div
                      initial={{ scale: 0, y: 10 }}
                      animate={{ scale: 1, y: 0 }}
                      exit={{ scale: 0 }}
                      className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shadow-lg border-2 border-blue-400 z-10"
                    >
                      <span className="text-[10px]">🔵</span>
                    </motion.div>
                  )}
                </AnimatePresence>
                <AnimatePresence>
                  {positions.ai === i && (
                    <motion.div
                      initial={{ scale: 0, y: 10 }}
                      animate={{ scale: 1, y: 0 }}
                      exit={{ scale: 0 }}
                      className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center shadow-lg border-2 border-red-400 z-10"
                    >
                      <span className="text-[10px]">🔴</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center gap-6">
          <div className="grid grid-cols-2 gap-8 w-full">
            <div className="text-center">
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-2">Your Dice</p>
              <motion.div 
                key={lastDice.player}
                initial={{ scale: 0.5, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                className="w-full h-16 bg-white rounded-2xl flex items-center justify-center text-slate-900 text-3xl font-black shadow-xl"
              >
                {isRolling && turn === 'player' ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 0.5, ease: "linear" }}
                  >
                    <Dices className="w-8 h-8 text-slate-400" />
                  </motion.div>
                ) : (
                  lastDice.player || '-'
                )}
              </motion.div>
            </div>

            <div className="text-center">
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-2">AI Dice</p>
              <motion.div 
                key={lastDice.ai}
                initial={{ scale: 0.5, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                className="w-full h-16 bg-slate-800 rounded-2xl flex items-center justify-center text-white text-3xl font-black shadow-xl border border-white/5"
              >
                {isRolling && turn === 'ai' ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 0.5, ease: "linear" }}
                  >
                    <Dices className="w-8 h-8 text-slate-600" />
                  </motion.div>
                ) : (
                  lastDice.ai || '-'
                )}
              </motion.div>
            </div>
          </div>

          <button
            onClick={playerRoll}
            disabled={isRolling || !!winner || turn !== 'player'}
            className={`w-full py-4 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-95 shadow-2xl font-black uppercase tracking-widest
              ${winner || turn !== 'player' ? 'bg-slate-800 text-slate-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500 shadow-blue-500/20'}`}
          >
            <Dices className="w-6 h-6" />
            Roll Dice
          </button>

          {/* Logs */}
          <div className="w-full bg-black/20 rounded-2xl p-4 min-h-[80px]">
            {logs.length === 0 ? (
              <p className="text-slate-600 text-xs text-center italic">Game started. Your turn!</p>
            ) : (
              logs.map((log, i) => (
                <p key={i} className={`text-xs mb-1 ${i === 0 ? 'text-white font-medium' : 'text-slate-500'}`}>
                  {log}
                </p>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Winner Modal */}
      <AnimatePresence>
        {winner && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-slate-900 border border-white/10 p-10 rounded-[3rem] text-center max-w-sm w-full shadow-2xl"
            >
              <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 ${winner === 'player' ? 'bg-blue-500/20' : 'bg-red-500/20'}`}>
                <Trophy className={`w-10 h-10 ${winner === 'player' ? 'text-blue-500' : 'text-red-500'}`} />
              </div>
              <h2 className="text-3xl font-black mb-2">{winner === 'player' ? 'VICTORY!' : 'DEFEAT!'}</h2>
              <p className="text-slate-400 mb-4">
                {winner === 'player' ? 'You have conquered the AI!' : 'The AI outsmarted you this time.'}
              </p>
              {winner === 'player' && (
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-4 mb-8">
                  <p className="text-yellow-500 font-black text-xl">+10 REWARD</p>
                  <p className="text-[10px] text-yellow-500/60 uppercase tracking-widest font-bold">Added to total score</p>
                </div>
              )}
              <button
                onClick={resetGame}
                className="w-full py-4 bg-white text-slate-900 font-bold rounded-2xl hover:bg-slate-200 transition-all active:scale-95"
              >
                PLAY AGAIN
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
