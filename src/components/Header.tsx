import React from 'react';
import { Zap, Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-amber-500/20">
            <Zap className="h-5 w-5 fill-slate-950 stroke-slate-950" />
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-tight text-white">SERVING</span>
            <span className="hidden sm:inline-block ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
              Google Play Closed Beta
            </span>
          </div>
        </div>

        <a
          href="#signup"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold bg-amber-500 text-slate-950 hover:bg-amber-400 transition-all duration-150 shadow-md shadow-amber-500/20"
        >
          <Sparkles className="w-4 h-4" />
          Join Beta
        </a>
      </div>
    </header>
  );
};
