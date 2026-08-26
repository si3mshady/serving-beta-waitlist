import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Problem } from './components/Problem';
import { ServingSolution } from './components/ServingSolution';
import { BetaContext } from './components/BetaContext';
import { SignupForm } from './components/SignupForm';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Problem />
        <ServingSolution />
        <BetaContext />
        <SignupForm />
      </main>
      <Footer />
    </div>
  );
};

export default App;
