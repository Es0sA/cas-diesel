import React, { useState, useEffect } from 'react';
import { ShieldCheck, X } from 'lucide-react';

export default function CookieBanner({ onOpenPolicy }) {
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('cas_cookie_consent');
    if (!saved) {
      setDismissed(false);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cas_cookie_consent', 'accepted');
    setDismissed(true);
  };

  if (dismissed) return null;

  return (
    <aside 
      aria-label="Cookie consent banner"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-40 bg-white border-2 border-cas-border rounded-xl shadow-2xl p-5"
    >
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded bg-cas-amberLight text-cas-amberDark flex items-center justify-center shrink-0 mt-0.5">
          <ShieldCheck className="w-5 h-5" aria-hidden="true" />
        </div>
        <div>
          <h4 className="font-extrabold text-sm text-cas-slate">Strictly Necessary Cookies</h4>
          <p className="text-xs text-cas-muted mt-1 leading-relaxed">
            CAS Energy uses essential cookies to secure your escrow transactions, persist authenticated login sessions, and protect against CSRF attacks. No third-party ad tracking is ever used.
          </p>

          <div className="flex items-center gap-3 mt-4">
            <button
              type="button"
              onClick={handleAccept}
              className="px-4 py-2 bg-cas-slate hover:bg-black text-white text-xs font-bold rounded-lg transition-colors"
            >
              Accept Essential Cookies
            </button>
            <button
              type="button"
              onClick={() => onOpenPolicy('cookies')}
              className="text-xs font-semibold text-cas-muted hover:text-cas-slate underline underline-offset-2"
            >
              Read Cookie Policy
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={handleAccept}
          className="text-slate-400 hover:text-cas-slate p-1"
          aria-label="Dismiss cookie notice"
        >
          <X className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </aside>
  );
}
