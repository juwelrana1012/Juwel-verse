import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, RotateCcw, Trophy, CheckCircle2, XCircle, Cpu } from 'lucide-react';

const QUESTION_BANK = [
  { q: "What is Verse ecosystem?", a: ["Blockchain based ecosystem", "Cooking app", "Video game console", "Music app"] },
  { q: "What is Bitcoin?", a: ["Digital currency", "Photo editor", "Social app", "Bank branch"] },
  { q: "Blockchain means?", a: ["Data stored in blocks", "Food delivery system", "Game engine", "Video platform"] },
  { q: "Verse community is?", a: ["Crypto ecosystem community", "School group", "Football team", "Shopping mall"] },
  { q: "CryptoCommunity refers to?", a: ["Crypto interested people", "Gamers only", "Farmers group", "Movie fans"] },
  { q: "VerseArmy means?", a: ["Supporters of Verse ecosystem", "Military force", "Sports team", "Music band"] },
  { q: "Experience vs Knowledge?", a: ["Experience increases knowledge", "No relation", "Same always", "Opposite concepts"] }
];

export default function VerseQuiz({ onBack }: { onBack: () => void }) {
  const [usedIndices, setUsedIndices] = useState<number[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<{ q: string; options: string[]; correct: string } | null>(null);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const shuffle = (array: any[]) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const loadNextQuestion = useCallback((currentUsed: number[]) => {
    if (currentUsed.length === QUESTION_BANK.length) {
      setIsFinished(true);
      return;
    }

    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * QUESTION_BANK.length);
    } while (currentUsed.includes(nextIndex));

    const questionData = QUESTION_BANK[nextIndex];
    const shuffledOptions = shuffle(questionData.a);
    
    setCurrentQuestion({
      q: questionData.q,
      options: shuffledOptions,
      correct: questionData.a[0]
    });
    setUsedIndices([...currentUsed, nextIndex]);
    setSelectedOption(null);
    setShowFeedback(false);
  }, []);

  useEffect(() => {
    loadNextQuestion([]);
  }, [loadNextQuestion]);

  const handleAnswer = (option: string) => {
    if (showFeedback || !currentQuestion) return;
    
    setSelectedOption(option);
    setShowFeedback(true);
    
    if (option === currentQuestion.correct) {
      setScore(s => s + 1);
    }

    setTimeout(() => {
      loadNextQuestion(usedIndices);
    }, 1500);
  };

  const resetGame = () => {
    setScore(0);
    setUsedIndices([]);
    setIsFinished(false);
    loadNextQuestion([]);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[600px] p-4">
      <div className="w-full max-w-md mb-8 flex items-center justify-between">
        <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="text-center">
          <p className="text-xs text-slate-400 uppercase tracking-wider">Progress</p>
          <p className="text-2xl font-bold text-game-primary">{usedIndices.length}/{QUESTION_BANK.length}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-slate-400 uppercase tracking-wider">Score</p>
          <p className="text-2xl font-bold text-game-secondary">{score}</p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!isFinished && currentQuestion ? (
          <motion.div
            key={currentQuestion.q}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="w-full max-w-md space-y-6"
          >
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-xl text-center">
              <Cpu className="w-12 h-12 text-game-primary mx-auto mb-4 opacity-50" />
              <h2 className="text-2xl font-bold leading-tight">{currentQuestion.q}</h2>
            </div>
            
            <div className="grid gap-3">
              {currentQuestion.options.map((option, index) => {
                let statusClass = "bg-slate-900 border-slate-800 hover:border-game-primary hover:bg-slate-800";
                if (showFeedback) {
                  if (option === currentQuestion.correct) {
                    statusClass = "bg-green-500/20 border-green-500 text-green-400";
                  } else if (option === selectedOption) {
                    statusClass = "bg-red-500/20 border-red-500 text-red-400";
                  } else {
                    statusClass = "bg-slate-900/50 border-slate-800 opacity-50";
                  }
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    disabled={showFeedback}
                    className={`w-full p-4 rounded-2xl border-2 text-left transition-all flex items-center justify-between ${statusClass}`}
                  >
                    <span className="font-medium">{option}</span>
                    {showFeedback && option === currentQuestion.correct && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                    {showFeedback && option === selectedOption && option !== currentQuestion.correct && <XCircle className="w-5 h-5 text-red-500" />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        ) : isFinished ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center p-10 bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl max-w-sm w-full"
          >
            <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-2">Quiz Finished!</h2>
            <p className="text-slate-400 mb-8 text-lg">You got <span className="text-white font-bold">{score}</span> out of {QUESTION_BANK.length} correct.</p>
            <div className="space-y-3">
              <button 
                onClick={resetGame}
                className="w-full bg-game-primary hover:bg-game-primary/90 text-white py-4 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-5 h-5" /> Retake Quiz
              </button>
              <button 
                onClick={onBack}
                className="w-full bg-slate-800 hover:bg-slate-700 text-white py-4 rounded-2xl font-bold transition-all"
              >
                Back to Menu
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
