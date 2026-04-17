import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, Trophy, Timer, RefreshCw, Brain } from 'lucide-react';

interface Card {
  id: number;
  symbol: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const SYMBOLS = ['₿', 'Ξ', 'V', '◈', '⚡', '🛡️', '📈', '💎'];

interface VerseMemoryMatchProps {
  onBack: () => void;
}

export default function VerseMemoryMatch({ onBack }: VerseMemoryMatchProps) {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [time, setTime] = useState(0);
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'won'>('idle');
  const [highScore, setHighScore] = useState<{ moves: number; time: number } | null>(null);

  const initGame = useCallback(() => {
    const deck: Card[] = [...SYMBOLS, ...SYMBOLS]
      .sort(() => Math.random() - 0.5)
      .map((symbol, index) => ({
        id: index,
        symbol,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(deck);
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
    setTime(0);
    setGameState('playing');
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('verse_memory_highscore');
    if (saved) setHighScore(JSON.parse(saved));
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameState === 'playing') {
      timer = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameState]);

  useEffect(() => {
    if (matches === SYMBOLS.length) {
      setGameState('won');
      const currentScore = { moves, time };
      if (!highScore || moves < highScore.moves || (moves === highScore.moves && time < highScore.time)) {
        setHighScore(currentScore);
        localStorage.setItem('verse_memory_highscore', JSON.stringify(currentScore));
      }
    }
  }, [matches, moves, time, highScore]);

  const handleCardClick = (id: number) => {
    if (gameState !== 'playing' || flippedCards.length === 2 || cards[id].isFlipped || cards[id].isMatched) return;

    const newCards = [...cards];
    newCards[id].isFlipped = true;
    setCards(newCards);

    const newFlipped = [...flippedCards, id];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((prev) => prev + 1);
      const [firstId, secondId] = newFlipped;

      if (cards[firstId].symbol === cards[secondId].symbol) {
        setTimeout(() => {
          const matchedCards = [...cards];
          matchedCards[firstId].isMatched = true;
          matchedCards[secondId].isMatched = true;
          setCards(matchedCards);
          setMatches((prev) => prev + 1);
          setFlippedCards([]);
        }, 500);
      } else {
        setTimeout(() => {
          const resetCards = [...cards];
          resetCards[firstId].isFlipped = false;
          resetCards[secondId].isFlipped = false;
          setCards(resetCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
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
            <p className="text-xl font-black text-game-secondary">{time}s</p>
          </div>
          <div className="text-center">
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Moves</p>
            <p className="text-xl font-black text-game-accent">{moves}</p>
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
            <div className="w-[60px] h-[60px] bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-3xl font-bold shadow-lg">
              V
            </div>
            <h2 className="text-4xl font-bold mb-4 tracking-tight text-white">Verse Memory Match</h2>
            <p className="text-slate-400 mb-10 text-lg leading-relaxed">
              Test your memory! Match all the pairs in the fewest moves possible.
            </p>
            <button 
              onClick={initGame}
              className="w-full py-4 bg-purple-500 hover:bg-purple-400 text-white font-bold rounded-2xl transition-all active:scale-95 shadow-lg shadow-purple-500/20 text-lg"
            >
              START MATCHING
            </button>
            {highScore && (
              <div className="mt-8 flex items-center justify-center gap-2 text-slate-500">
                <Trophy className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-medium uppercase tracking-wider">
                  Best: {highScore.moves} moves in {highScore.time}s
                </span>
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
            <div className="grid grid-cols-4 gap-3">
              {cards.map((card) => (
                <motion.div
                  key={card.id}
                  onClick={() => handleCardClick(card.id)}
                  className={`aspect-square rounded-xl cursor-pointer perspective-1000 relative transition-all duration-500 transform-style-3d
                    ${card.isFlipped || card.isMatched ? 'rotate-y-180' : ''}`}
                >
                  <div className={`absolute inset-0 rounded-xl border-2 transition-colors flex items-center justify-center text-2xl font-bold backface-hidden
                    ${card.isMatched ? 'bg-lime-500/20 border-lime-500 text-lime-400' : 'bg-slate-800 border-slate-700 hover:border-slate-500'}`}>
                    {card.isFlipped || card.isMatched ? card.symbol : '?'}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="won"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center bg-slate-900/50 p-10 rounded-[2.5rem] border border-white/5 backdrop-blur-xl w-full max-w-sm"
          >
            <div className="w-20 h-20 bg-lime-500/20 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Brain className="w-10 h-10 text-lime-500" />
            </div>
            <h2 className="text-3xl font-bold mb-2 text-white">Mastermind!</h2>
            <p className="text-slate-400 mb-8">You matched all pairs perfectly.</p>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Moves</p>
                <p className="text-2xl font-black text-game-accent">{moves}</p>
              </div>
              <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Time</p>
                <p className="text-2xl font-black text-game-secondary">{time}s</p>
              </div>
            </div>

            <button 
              onClick={initGame}
              className="w-full py-4 bg-white text-slate-900 font-bold rounded-2xl hover:bg-slate-200 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-5 h-5" />
              PLAY AGAIN
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
