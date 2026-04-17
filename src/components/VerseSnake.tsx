import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, RotateCcw, Trophy, Timer, Star, Play } from 'lucide-react';

interface Point {
  x: number;
  y: number;
}

export default function VerseSnake({ onBack }: { onBack: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [level, setLevel] = useState(1);
  const [time, setTime] = useState(30);
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameover' | 'finished'>('idle');
  const [score, setScore] = useState(0);

  // Game state refs to avoid re-renders during game loop
  const snakeRef = useRef<Point[]>([{ x: 160, y: 160 }]);
  const dxRef = useRef(20);
  const dyRef = useRef(0);
  const foodsRef = useRef<Point[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);
  const speedRef = useRef(200);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const logoImgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const img = new Image();
    img.src = "https://www.bitcoin.com/static/brand/verse/verse-logo.svg";
    img.referrerPolicy = "no-referrer";
    img.onload = () => {
      logoImgRef.current = img;
    };
  }, []);

  const generateFoods = useCallback((currentLevel: number) => {
    const newFoods: Point[] = [];
    for (let i = 0; i < currentLevel; i++) {
      newFoods.push({
        x: Math.floor(Math.random() * 16) * 20,
        y: Math.floor(Math.random() * 16) * 20
      });
    }
    foodsRef.current = newFoods;
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Snake
    snakeRef.current.forEach((s, i) => {
      // 🟢 body (round)
      ctx.beginPath();
      ctx.arc(s.x + 10, s.y + 10, 7, 0, Math.PI * 2);
      ctx.fillStyle = "#22c55e";
      ctx.fill();

      // 🐍 head (bigger + style)
      if (i === 0) {
        ctx.beginPath();
        ctx.arc(s.x + 10, s.y + 10, 9, 0, Math.PI * 2);
        ctx.fillStyle = "#16a34a";
        ctx.fill();

        // 👀 eyes
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(s.x + 7, s.y + 8, 2, 0, Math.PI * 2);
        ctx.arc(s.x + 13, s.y + 8, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    // Draw Foods
    foodsRef.current.forEach((f) => {
      if (logoImgRef.current) {
        ctx.drawImage(logoImgRef.current, f.x + 2, f.y + 2, 16, 16);
      } else {
        // Fallback if logo hasn't loaded
        const gradient = ctx.createRadialGradient(
          f.x + 10, f.y + 10, 2,
          f.x + 10, f.y + 10, 10
        );
        gradient.addColorStop(0, "#ff4d6d");
        gradient.addColorStop(1, "#ff8fab");
        ctx.beginPath();
        ctx.arc(f.x + 10, f.y + 10, 10, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.fillStyle = "white";
        ctx.font = "bold 12px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("V", f.x + 10, f.y + 11);
      }
    });

    // Check level complete
    if (foodsRef.current.length === 0 && gameState === 'playing') {
      setLevel((prev) => {
        if (prev >= 200) {
          setGameState('finished');
          return prev;
        }
        const nextLvl = prev + 1;
        generateFoods(nextLvl);
        return nextLvl;
      });
    }
  }, [gameState, generateFoods]);

  const move = useCallback(() => {
    if (gameState !== 'playing') return;
    const head = { 
      x: snakeRef.current[0].x + dxRef.current, 
      y: snakeRef.current[0].y + dyRef.current 
    };

    // Wall loop
    if (head.x < 0) head.x = 300;
    if (head.x > 300) head.x = 0;
    if (head.y < 0) head.y = 300;
    if (head.y > 300) head.y = 0;

    const newSnake = [head, ...snakeRef.current];

    // Check if ate food
    let ate = false;
    for (let i = 0; i < foodsRef.current.length; i++) {
      if (head.x === foodsRef.current[i].x && head.y === foodsRef.current[i].y) {
        foodsRef.current.splice(i, 1);
        setScore((s) => s + 10);
        ate = true;
        break;
      }
    }

    if (!ate) {
      newSnake.pop();
    }
    
    snakeRef.current = newSnake;
  }, [gameState]);

  const startGame = () => {
    setGameState('playing');
    setLevel(1);
    setScore(0);
    setTime(30);
    snakeRef.current = [{ x: 160, y: 160 }];
    dxRef.current = 20;
    dyRef.current = 0;
    speedRef.current = 220; // Initial speed for level 1
    generateFoods(1);
  };

  useEffect(() => {
    if (gameState !== 'playing') {
      if (timerRef.current) clearInterval(timerRef.current);
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
      return;
    }

    // Set speed based on level
    let currentSpeed = 220;
    if (level <= 40) currentSpeed = 220;
    else if (level <= 100) currentSpeed = 150;
    else if (level <= 200) currentSpeed = 80;
    
    speedRef.current = currentSpeed;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp": if (dyRef.current === 0) { dxRef.current = 0; dyRef.current = -20; } break;
        case "ArrowDown": if (dyRef.current === 0) { dxRef.current = 0; dyRef.current = 20; } break;
        case "ArrowLeft": if (dxRef.current === 0) { dxRef.current = -20; dyRef.current = 0; } break;
        case "ArrowRight": if (dxRef.current === 0) { dxRef.current = 20; dyRef.current = 0; } break;
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStartRef.current) return;
      const touch = e.changedTouches[0];
      const dx = touch.clientX - touchStartRef.current.x;
      const dy = touch.clientY - touchStartRef.current.y;
      
      if (Math.abs(dx) > Math.abs(dy)) {
        // Horizontal swipe
        if (Math.abs(dx) > 30) {
          if (dx > 0 && dxRef.current === 0) { dxRef.current = 20; dyRef.current = 0; }
          else if (dx < 0 && dxRef.current === 0) { dxRef.current = -20; dyRef.current = 0; }
        }
      } else {
        // Vertical swipe
        if (Math.abs(dy) > 30) {
          if (dy > 0 && dyRef.current === 0) { dxRef.current = 0; dyRef.current = 20; }
          else if (dy < 0 && dyRef.current === 0) { dxRef.current = 0; dyRef.current = -20; }
        }
      }
      touchStartRef.current = null;
    };

    window.addEventListener("keydown", handleKeyDown);
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener("touchstart", handleTouchStart, { passive: true });
      canvas.addEventListener("touchend", handleTouchEnd, { passive: true });
    }

    // Game loop with level-based speed
    gameLoopRef.current = setInterval(() => {
      move();
      draw();
    }, speedRef.current);

    // Timer control (no longer controls speed)
    timerRef.current = setInterval(() => {
      setTime((prev) => {
        const nextTime = prev - 1;
        
        if (nextTime <= 0) {
          setGameState('gameover');
          return 0;
        }
        return nextTime;
      });
    }, 1000);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (canvas) {
        canvas.removeEventListener("touchstart", handleTouchStart);
        canvas.removeEventListener("touchend", handleTouchEnd);
      }
      if (timerRef.current) clearInterval(timerRef.current);
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [gameState, level, move, draw]);

  const handleCanvasClick = () => {
    if (gameState !== 'playing') return;
    if (dxRef.current === 20) { dxRef.current = 0; dyRef.current = 20; }
    else if (dyRef.current === 20) { dxRef.current = -20; dyRef.current = 0; }
    else if (dxRef.current === -20) { dxRef.current = 0; dyRef.current = -20; }
    else { dxRef.current = 20; dyRef.current = 0; }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[600px] p-4">
      <div className="w-full max-w-md mb-6 flex items-center justify-between">
        <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex gap-6">
          <div className="text-center">
            <p className="text-[10px] text-slate-500 uppercase tracking-widest">Level</p>
            <p className="text-xl font-black text-game-primary">{level}</p>
          </div>
          <div className="text-center">
            <p className="text-[10px] text-slate-500 uppercase tracking-widest">Time</p>
            <p className={`text-xl font-black ${time < 10 ? 'text-red-500 animate-pulse' : 'text-game-secondary'}`}>{time}s</p>
          </div>
          <div className="text-center">
            <p className="text-[10px] text-slate-500 uppercase tracking-widest">Score</p>
            <p className="text-xl font-black text-game-accent">{score}</p>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {gameState === 'playing' ? (
          <motion.div
            key="game"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative"
          >
            <canvas
              ref={canvasRef}
              width={320}
              height={320}
              onClick={handleCanvasClick}
              className="bg-slate-900 border-4 border-slate-800 rounded-2xl shadow-2xl cursor-pointer"
            />
            <div className="mt-4 text-center text-slate-500 text-xs">
              Use Arrow Keys or Tap Canvas to Turn
            </div>
          </motion.div>
        ) : gameState === 'finished' ? (
          <motion.div
            key="finish"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center p-10 bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl max-w-sm w-full"
          >
            <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-2">Victory!</h2>
            <p className="text-slate-400 mb-8 text-lg">
              You completed all 200 levels!<br/>
              Final Score: <span className="text-white font-bold">{score}</span>
            </p>
            <div className="space-y-3">
              <button 
                onClick={startGame}
                className="w-full bg-game-primary hover:bg-game-primary/90 text-white py-4 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-5 h-5" /> Play Again
              </button>
              <button 
                onClick={onBack}
                className="w-full bg-slate-800 hover:bg-slate-700 text-white py-4 rounded-2xl font-bold transition-all"
              >
                Back to Menu
              </button>
            </div>
          </motion.div>
        ) : gameState === 'gameover' ? (
          <motion.div
            key="gameover"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center p-10 bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl max-w-sm w-full"
          >
            <div className="w-20 h-20 bg-red-500/20 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Timer className="w-10 h-10" />
            </div>
            <h2 className="text-4xl font-bold mb-2 text-red-500 tracking-tight">Time Up!</h2>
            <p className="text-slate-400 mb-8 text-lg leading-relaxed">
              You reached <span className="text-white font-bold">Level {level}</span><br/>
              Final Score: <span className="text-white font-bold">{score}</span>
            </p>
            <div className="space-y-3">
              <button 
                onClick={startGame}
                className="w-full bg-game-primary hover:bg-game-primary/90 text-white py-4 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-game-primary/20"
              >
                <Play className="w-5 h-5" /> Try Again
              </button>
              <button 
                onClick={onBack}
                className="w-full bg-slate-800 hover:bg-slate-700 text-white py-4 rounded-2xl font-bold transition-all"
              >
                Back to Menu
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="idle"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center p-10 bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl max-w-sm w-full"
          >
            <div className="w-24 h-24 bg-game-primary/20 text-game-primary rounded-3xl flex items-center justify-center mx-auto mb-8 rotate-12">
              <Star className="w-12 h-12 fill-current" />
            </div>
            <h2 className="text-4xl font-bold mb-4 tracking-tight">Verse Snake</h2>
            <p className="text-slate-400 mb-10 text-lg">
              Collect Verse logos to level up. Speed increases as you reach higher levels!
            </p>
            <button 
              onClick={startGame}
              className="w-full bg-game-primary hover:bg-game-primary/90 text-white py-5 rounded-2xl font-black text-xl transition-all flex items-center justify-center gap-3 shadow-xl shadow-game-primary/30"
            >
              <Play className="w-6 h-6 fill-current" /> PLAY GAME
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
