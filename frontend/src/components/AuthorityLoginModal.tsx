'use client';

import React, { useState } from 'react';
import { ShieldCheck, Lock, KeyRound, AlertCircle, X, CheckCircle2, ArrowRight } from 'lucide-react';

interface AuthorityLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const AuthorityLoginModal: React.FC<AuthorityLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess
}) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      if (password === '12345678') {
        setIsLoading(false);
        onLoginSuccess();
        onClose();
        setPassword('');
      } else {
        setIsLoading(false);
        setError('Invalid credentials. Authorized personnel only.');
      }
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-md animate-in fade-in duration-150">
      <div className="relative w-full max-w-md bg-white rounded-3xl border border-stone-200 shadow-2xl p-6 sm:p-8 space-y-5">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Badge */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-700 to-indigo-800 text-white flex items-center justify-center shadow-md shadow-blue-700/20">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-blue-700">
              Government Official Access
            </div>
            <h3 className="text-lg font-black text-stone-900 leading-tight">
              Ministry &amp; Municipal Console
            </h3>
          </div>
        </div>

        <p className="text-xs text-stone-500 leading-relaxed">
          Access to real-time Doppler radar telemetry, hydraulic pump dispatch protocols, and municipal emergency broadcast controls is restricted to authorized MoES, NDMA, and Municipal Disaster Management officers.
        </p>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1.5">
              Official PIN / Security Passcode
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                placeholder="Enter passcode (e.g. 12345678)"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-sm font-mono tracking-widest text-stone-900 transition focus:outline-hidden"
                autoFocus
              />
            </div>
            {error && (
              <div className="flex items-center gap-1.5 text-xs text-rose-600 font-semibold mt-1.5">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}
          </div>

          <div className="p-2.5 rounded-xl bg-blue-50/80 border border-blue-200/80 text-[11px] text-blue-900 flex items-center justify-between">
            <span>Demo Authorized Access:</span>
            <code className="font-mono font-bold bg-white px-2 py-0.5 rounded border border-blue-200">12345678</code>
          </div>

          <button
            type="submit"
            disabled={isLoading || !password}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-600 hover:to-indigo-600 text-white font-bold text-xs shadow-md shadow-blue-700/20 transition active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <span>Verifying National Security Token...</span>
            ) : (
              <>
                <span>Authenticate &amp; Enter Command Center</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
