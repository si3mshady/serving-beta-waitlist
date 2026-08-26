import React from 'react';
import { Zap } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-slate-800/80 bg-slate-950 py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 rounded-lg bg-amber-500 flex items-center justify-center text-slate-950 font-bold">
            <Zap className="h-4 w-4 fill-slate-950 stroke-slate-950" />
          </div>
          <span className="text-lg font-bold text-white tracking-tight">SERVING</span>
        </div>

        <p className="text-xs text-slate-400">
          © {new Date().getFullYear()} SERVING Marketplace. All rights reserved. Google Play Closed Beta.
        </p>

        <a
          href="https://github.com/si3mshady/serving-beta-waitlist"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-slate-400 hover:text-amber-400 transition-colors"
        >
          GitHub Repository
        </a>
      </div>
    </footer>
  );
};
