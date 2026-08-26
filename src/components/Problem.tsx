import React from 'react';
import { AlertCircle, TrendingUp, Clock, Briefcase } from 'lucide-react';

export const Problem: React.FC = () => {
  return (
    <section className="py-16 px-4 sm:px-6 bg-slate-900/50 border-y border-slate-800/60">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2 block">
            The Reality Today
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Traditional job searches aren't the only way people should be able to earn.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 mb-4">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-100 mb-2">Changing Job Market</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Economic shifts and layoffs make relying solely on single, full-time employment higher risk for many individuals.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 mb-4">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-100 mb-2">Unused Existing Skills</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Most people possess practical skills—from home repair to technology help—that could generate earnings immediately.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 mb-4">
              <Briefcase className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-100 mb-2">Friction in Discovery</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Finding local, direct help or advertising flexible availability often gets buried in complex job boards or social feeds.
            </p>
          </div>
        </div>

        <div className="mt-8 p-5 rounded-xl bg-amber-500/5 border border-amber-500/20 text-slate-300 text-sm leading-relaxed flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <p>
            <strong className="text-white font-semibold">SERVING's Core Focus:</strong> We're exploring a direct local marketplace where skills and real-time availability connect buyers and providers without corporate overhead or multi-stage application processes.
          </p>
        </div>
      </div>
    </section>
  );
};
