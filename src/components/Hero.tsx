import React from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Users } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative py-16 sm:py-24 px-4 sm:px-6 overflow-hidden">
      {/* Subtle ambient glow background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs sm:text-sm font-medium mb-6">
          <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
          Closed Beta Recruiting • Google Play Test
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.15] mb-6">
          Turn the skills you already have into another way to earn.
        </h1>

        <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8 font-normal">
          SERVING is a local services marketplace connecting people who have skills and availability with people who need those services.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <a
            href="#signup"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-amber-500 text-slate-950 font-bold text-base hover:bg-amber-400 transition-all duration-150 shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 group"
          >
            Join the SERVING Beta
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-slate-800/60 max-w-3xl mx-auto text-left">
          <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-900/40 border border-slate-800/40">
            <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-slate-200">Direct Connections</h4>
              <p className="text-xs text-slate-400">Skip traditional job boards & long search delays.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-900/40 border border-slate-800/40">
            <Users className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-slate-200">Two-Sided Platform</h4>
              <p className="text-xs text-slate-400">Offer your skills or find help when you need it.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-900/40 border border-slate-800/40">
            <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-slate-200">Google Play Beta</h4>
              <p className="text-xs text-slate-400">Be among the first to test and shape the app.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
