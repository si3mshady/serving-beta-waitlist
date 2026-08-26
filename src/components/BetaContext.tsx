import React from 'react';
import { Smartphone, CheckCircle, MessageSquareHeart, Sliders, ThumbsUp, ThumbsDown } from 'lucide-react';

export const BetaContext: React.FC = () => {
  return (
    <section className="py-16 px-4 sm:px-6 bg-slate-900/40 border-y border-slate-800/60">
      <div className="max-w-4xl mx-auto">
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8 pb-8 border-b border-slate-800">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold mb-3">
                <Smartphone className="w-3.5 h-3.5" /> Closed Beta Recruiting
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                SERVING is currently in closed testing on Google Play, and I'm looking for people willing to help test the first version.
              </h2>
            </div>
          </div>

          <p className="text-slate-300 text-base leading-relaxed mb-6 font-normal">
            As an early beta tester, you will get access to the Android app on Google Play to test both sides of the marketplace—as a service provider listing your skills, as a client searching for services, or both.
          </p>

          <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400 mb-4">
            What We're Asking Beta Testers To Evaluate:
          </h3>

          <div className="grid sm:grid-cols-2 gap-4 text-sm text-slate-300">
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <CheckCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span><strong>What makes sense</strong> vs what is confusing during onboarding & service listing.</span>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <ThumbsUp className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span><strong>What you like</strong> and what features provide real value for your local needs.</span>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <ThumbsDown className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span><strong>What you don't like</strong> or feel could be simpler or more direct.</span>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <Sliders className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span><strong>Workflows that need improvement</strong> in booking, scheduling, and messaging.</span>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <MessageSquareHeart className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span><strong>Client experience:</strong> Is finding and selecting a provider intuitive?</span>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <Smartphone className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span><strong>Provider experience:</strong> Is setting availability and managing offerings seamless?</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
