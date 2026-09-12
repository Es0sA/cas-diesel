import React from 'react';
import { ShieldCheck, PhoneCall, Truck, Building2, UserCheck, Layers } from 'lucide-react';

export default function Header({ activeView, setActiveView, onOpenLegalModal }) {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-cas-border shadow-sm">
      {/* Top Compliance & Phone Bar */}
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
              onClick={() => onOpenLegalModal('terms')} 
              className="hover:text-white underline underline-offset-2"
            >
              Escrow Terms
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Brand Identity */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-cas-slate rounded-lg flex items-center justify-center border-2 border-cas-amber shadow-inner">
                <span className="font-extrabold text-xl tracking-wider text-cas-amber">CAS</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-2xl tracking-tight text-cas-slate">CAS Energy</span>
                  <span className="bg-cas-amberLight text-cas-amberDark text-xs font-bold px-2 py-0.5 rounded border border-cas-amber">
                    AGO Diesel
                  </span>
                </div>
                <p className="text-xs text-cas-muted font-medium">Bulk Fuel Marketplace & Geofenced Escrow Logistics</p>
              </div>
            </div>

            {/* Mobile View Indicator */}
            <div className="lg:hidden">
              <span className="text-xs font-bold text-cas-slate bg-slate-100 px-2.5 py-1.5 rounded border border-cas-border">
                {activeView === 'portal' && 'Public Portal'}
                {activeView === 'buyer' && 'Buyer Site Setup'}
                {activeView === 'supplier' && 'Supplier Desk'}
                {activeView === 'driver' && 'Driver Cockpit'}
              </span>
            </div>
          </div>

          {/* Persona / Interactive Perspective Switcher */}
          <nav aria-label="Interactive Demo Switcher" className="flex items-center flex-wrap gap-1.5 p-1 bg-slate-100 rounded-lg border border-cas-border">
            <button
              type="button"
              onClick={() => setActiveView('portal')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-semibold transition-all ${
                activeView === 'portal'
                  ? 'bg-white text-cas-slate shadow-sm border border-cas-border font-bold'
                  : 'text-cas-muted hover:text-cas-slate'
              }`}
              aria-current={activeView === 'portal' ? 'page' : undefined}
            >
              <Layers className="w-4 h-4 text-cas-blue" aria-hidden="true" />
              <span>Public Marketplace</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveView('buyer')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-semibold transition-all ${
                activeView === 'buyer'
                  ? 'bg-white text-cas-slate shadow-sm border border-cas-border font-bold'
                  : 'text-cas-muted hover:text-cas-slate'
              }`}
              aria-current={activeView === 'buyer' ? 'page' : undefined}
            >
              <Building2 className="w-4 h-4 text-cas-amber" aria-hidden="true" />
              <span>Buyer Facility Setup</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveView('supplier')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-semibold transition-all ${
                activeView === 'supplier'
                  ? 'bg-white text-cas-slate shadow-sm border border-cas-border font-bold'
                  : 'text-cas-muted hover:text-cas-slate'
              }`}
              aria-current={activeView === 'supplier' ? 'page' : undefined}
            >
              <UserCheck className="w-4 h-4 text-cas-green" aria-hidden="true" />
              <span>Marketer Desk</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveView('driver')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-semibold transition-all ${
                activeView === 'driver'
                  ? 'bg-white text-cas-slate shadow-sm border border-cas-border font-bold'
                  : 'text-cas-muted hover:text-cas-slate'
              }`}
              aria-current={activeView === 'driver' ? 'page' : undefined}
            >
              <Truck className="w-4 h-4 text-cas-amberDark" aria-hidden="true" />
              <span>Driver Cockpit</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
