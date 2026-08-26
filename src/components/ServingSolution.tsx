import React from 'react';
import { Wrench, Search, Calendar, Zap, UserCheck, HeartHandshake } from 'lucide-react';

export const ServingSolution: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2 block">
            How SERVING Works
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            List what you can do. Set your availability. Connect with people who need your help.
          </h2>
          <p className="text-slate-400 text-base max-w-2xl mx-auto">
            SERVING eliminates intermediate steps by allowing direct discovery and booking based on verified skills and open schedules.
          </p>
        </div>

        {/* Two Sides Breakdown */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Provider Card */}
          <div className="p-8 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-bold mb-4">
              <Wrench className="w-3.5 h-3.5" /> For Providers
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Share Your Skills & Earn</h3>
            <p className="text-sm text-slate-300 mb-6 leading-relaxed">
              For people who have skills, tools, or expertise they want to offer locally on their own schedule.
            </p>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <Zap className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>List specific services & capabilities (handyman, tech, tutoring, lawn care, design, etc.)</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Calendar className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Set your exact availability and operating hours</span>
              </li>
              <li className="flex items-start gap-2.5">
                <UserCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Get discovered by nearby clients looking for immediate help</span>
              </li>
            </ul>
          </div>

          {/* Client Card */}
          <div className="p-8 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-bold mb-4">
              <Search className="w-3.5 h-3.5" /> For Clients
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Find Skilled Local Help</h3>
            <p className="text-sm text-slate-300 mb-6 leading-relaxed">
              For people looking for reliable someone nearby to perform a task or service cleanly and efficiently.
            </p>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <Search className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Browse available local providers by service type</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Calendar className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>See real-time provider availability without back-and-forth messaging</span>
              </li>
              <li className="flex items-start gap-2.5">
                <HeartHandshake className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Connect directly with providers to complete tasks smoothly</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
