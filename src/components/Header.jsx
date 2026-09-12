import React from 'react';
import { ShieldCheck, PhoneCall, UserPlus, Layers, Building2, UserCheck, Truck } from 'lucide-react';

export default function Header({ 
  currentView, 
  onNavigate, 
  onOpenLegalModal 
}) {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-cas-border shadow-sm">
      {/* Top Regulatory & Operations Phone Bar */}
      <div className="bg-cas-slate text-white text-xs py-2 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-cas-green animate-pulse" aria-hidden="true"></span>
            <span className="font-medium text-slate-300">Official NMDPRA Regulated Trading Hub</span>
            <span className="text-slate-400">|</span>
            <span className="text-slate-300">Parent Company: CAS Holdings Nigeria</span>
          </div>
          <div className="flex items-center gap-4 text-slate-300">
            <a 
              href="tel:+23418880227" 
              className="flex items-center gap-1 hover:text-white transition-colors"
              aria-label="Call CAS Energy Operations Desk"
            >
              <PhoneCall className="w-3.5 h-3.5 text-cas-amber" aria-hidden="true" />
              <span>Operations Desk: +234 (01) 888-0227</span>
            </a>
            <button 
              type="button"
              onClick={() => onOpenLegalModal('terms')} 
              className="hover:text-white underline underline-offset-2"
            >
              Escrow Terms
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 sm:py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Brand Identity */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="flex items-center gap-3 text-left"
            >
              <div className="w-11 h-11 bg-cas-slate rounded-lg flex items-center justify-center border-2 border-cas-amber shadow-inner">
                <span className="font-extrabold text-xl tracking-wider text-cas-amber">CAS</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-2xl tracking-tight text-cas-slate">CAS Energy</span>
                  <span className="bg-cas-amberLight text-cas-amberDark text-[11px] font-bold px-2 py-0.5 rounded border border-cas-amber">
                    AGO Diesel
                  </span>
                </div>
                <p className="text-xs text-cas-muted font-medium">Bulk Fuel Marketplace & Geofenced Escrow Logistics</p>
              </div>
            </button>
          </div>

          {/* Navigation Links & Action Buttons */}
          <div className="flex items-center flex-wrap gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                currentView === 'home'
                  ? 'bg-slate-100 text-cas-slate'
                  : 'text-cas-muted hover:text-cas-slate'
              }`}
            >
              What We Do
            </button>

            <button
              type="button"
              onClick={() => onNavigate('supplier-portal')}
              className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                currentView === 'supplier-portal'
                  ? 'bg-slate-100 text-cas-slate'
                  : 'text-cas-muted hover:text-cas-slate'
              }`}
            >
              Supplier Desk
            </button>

            <button
              type="button"
              onClick={() => onNavigate('driver-cockpit')}
              className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                currentView === 'driver-cockpit'
                  ? 'bg-slate-100 text-cas-slate'
                  : 'text-cas-muted hover:text-cas-slate'
              }`}
            >
              Driver Cockpit
            </button>

            {/* Primary Registration CTA Button */}
            <button
              type="button"
              onClick={() => onNavigate('register')}
              className={`px-5 py-2.5 rounded-lg text-xs sm:text-sm font-extrabold transition-all flex items-center gap-2 shadow-sm ${
                currentView === 'register'
                  ? 'bg-cas-slate text-white'
                  : 'bg-cas-amber hover:bg-cas-amberDark text-slate-900 hover:text-white border-2 border-cas-amber'
              }`}
            >
              <UserPlus className="w-4 h-4" aria-hidden="true" />
              <span>Create Account / Register</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
