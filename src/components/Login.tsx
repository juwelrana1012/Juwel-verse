import React, { useState } from 'react';
import { motion } from 'motion/react';
import { User, LogIn, ShieldCheck } from 'lucide-react';

interface LoginProps {
  onLogin: (username: string, save: boolean) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState('');
  const [saveLogin, setSaveLogin] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onLogin(username.trim(), saveLogin);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[600px] p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-slate-900/50 p-8 rounded-[2.5rem] border border-white/5 backdrop-blur-xl shadow-2xl"
      >
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-game-primary/20 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-game-primary/30">
            <User className="w-10 h-10 text-game-primary" />
          </div>
          <h2 className="text-4xl font-black tracking-tight text-white mb-2">Welcome Back</h2>
          <p className="text-slate-400 font-medium">Enter your nickname to enter the Zone</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest font-bold text-slate-500 ml-1">
              Nickname
            </label>
            <div className="relative">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. CryptoKing"
                className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 px-6 text-white placeholder:text-slate-600 focus:outline-none focus:border-game-primary/50 transition-colors"
                required
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600">
                <ShieldCheck className="w-5 h-5" />
              </div>
            </div>
          </div>

          <label className="flex items-center gap-3 cursor-pointer group select-none">
            <div className="relative">
              <input
                type="checkbox"
                checked={saveLogin}
                onChange={(e) => setSaveLogin(e.target.checked)}
                className="sr-only"
              />
              <div className={`w-6 h-6 rounded-lg border-2 transition-all flex items-center justify-center ${saveLogin ? 'bg-game-primary border-game-primary' : 'bg-transparent border-white/10 group-hover:border-white/20'}`}>
                {saveLogin && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-3 h-3 bg-white rounded-sm"
                  />
                )}
              </div>
            </div>
            <span className="text-sm font-medium text-slate-400 group-hover:text-slate-300 transition-colors">
              Save login for next time
            </span>
          </label>

          <button
            type="submit"
            className="w-full py-4 bg-game-primary hover:bg-game-primary/90 text-white font-black rounded-2xl transition-all active:scale-[0.98] shadow-lg shadow-game-primary/20 flex items-center justify-center gap-3 text-lg"
          >
            <LogIn className="w-5 h-5" />
            ENTER ZONE
          </button>
        </form>
      </motion.div>
    </div>
  );
}
