import React, { useState } from 'react';
import { Loader2, CheckCircle2, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { config } from '../config';
import { BetaRole, SubmissionResponse } from '../types';

export const SignupForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<BetaRole>('both');
  
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'duplicate' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [submittedEmail, setSubmittedEmail] = useState('');

  const validateEmail = (emailStr: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(emailStr.trim());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedName) {
      setStatus('error');
      setErrorMessage('Please enter your full name.');
      return;
    }

    if (!trimmedEmail || !validateEmail(trimmedEmail)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    // Check client-side local cache for duplicate submit
    let submittedCache: string[] = [];
    try {
      submittedCache = JSON.parse(localStorage.getItem('serving_beta_signups') || '[]');
    } catch {
      submittedCache = [];
    }

    if (submittedCache.includes(trimmedEmail)) {
      setStatus('duplicate');
      setSubmittedEmail(trimmedEmail);
      return;
    }

    setStatus('submitting');

    const payload = {
      name: trimmedName,
      email: trimmedEmail,
      role: role,
      source: 'serving-beta-landing-page',
      timestamp: new Date().toISOString()
    };

    if (config.googleScriptUrl) {
      try {
        const response = await fetch(config.googleScriptUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'text/plain;charset=utf-8',
          },
          body: JSON.stringify(payload),
        });

        if (response.ok || response.type === 'opaque') {
          try {
            const data: SubmissionResponse = await response.json();
            if (data.result === 'duplicate') {
              setStatus('duplicate');
              setSubmittedEmail(trimmedEmail);
              return;
            } else if (data.result === 'error') {
              setStatus('error');
              setErrorMessage(data.message || 'Submission failed. Please try again.');
              return;
            }
          } catch {
            // Text/plain or opaque response from Apps Script redirect is success
          }
        }
      } catch (err: any) {
        console.error('Remote waitlist submission error:', err);
      }
    }

    // Record local success
    submittedCache.push(trimmedEmail);
    localStorage.setItem('serving_beta_signups', JSON.stringify(submittedCache));

    setSubmittedEmail(trimmedEmail);
    setStatus('success');
    setName('');
    setEmail('');
  };

  return (
    <section id="signup" className="py-16 sm:py-24 px-4 sm:px-6 relative">
      <div className="max-w-xl mx-auto">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="text-center mb-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2 block">
              Be An Early Beta Tester
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-3">
              Help shape the first version of SERVING.
            </h2>
            <p className="text-slate-400 text-sm">
              Enter your details below to request Google Play closed beta access.
            </p>
          </div>

          {status === 'success' ? (
            <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center animate-fadeIn">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">You're on the list!</h3>
              <p className="text-emerald-200/90 text-sm mb-4 leading-relaxed font-medium">
                You're on the list. I'll send you the next steps for the SERVING beta.
              </p>
              <p className="text-xs text-slate-400">
                Confirmation sent for <span className="text-slate-200 font-mono">{submittedEmail}</span>.
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="mt-6 text-xs text-amber-400 hover:text-amber-300 underline font-semibold"
              >
                Submit another email
              </button>
            </div>
          ) : status === 'duplicate' ? (
            <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-center animate-fadeIn">
              <div className="w-12 h-12 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Already Registered</h3>
              <p className="text-amber-200/90 text-sm mb-4 leading-relaxed font-medium">
                <span className="font-mono text-slate-200">{submittedEmail}</span> is already on the beta waitlist. I'll reach out as soon as the next testing batch opens.
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="text-xs text-amber-400 hover:text-amber-300 underline font-semibold"
              >
                Use a different email address
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {status === 'error' && (
                <div role="alert" className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div>
                <label htmlFor="name" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Your Name <span className="text-amber-400">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Doe"
                  disabled={status === 'submitting'}
                  aria-required="true"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors text-sm"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Email Address <span className="text-amber-400">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane@example.com"
                  disabled={status === 'submitting'}
                  aria-required="true"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  I want to test SERVING primarily as:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setRole('provider')}
                    className={`px-3 py-2.5 rounded-xl border text-xs font-semibold transition-all ${
                      role === 'provider'
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    Provider
                  </button>

                  <button
                    type="button"
                    onClick={() => setRole('client')}
                    className={`px-3 py-2.5 rounded-xl border text-xs font-semibold transition-all ${
                      role === 'client'
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    Client
                  </button>

                  <button
                    type="button"
                    onClick={() => setRole('both')}
                    className={`px-3 py-2.5 rounded-xl border text-xs font-semibold transition-all ${
                      role === 'both'
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    Both
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full py-4 px-6 rounded-xl bg-amber-500 text-slate-950 font-extrabold text-base hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150 shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 group mt-4"
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Joining Beta...</span>
                  </>
                ) : (
                  <>
                    <span>Join the Beta</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-xs text-slate-400 pt-2">
                <ShieldCheck className="w-4 h-4 text-slate-400" />
                <span>Zero spam. No password required. Private Google Play test.</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
