import React, { useState } from 'react';
import Header from './components/Header';
import DepotTicker from './components/DepotTicker';
import Hero from './components/Hero';
import EscrowTerminal from './components/EscrowTerminal';
import Marketplace from './components/Marketplace';
import BuyerDischargeSetup from './components/BuyerDischargeSetup';
import SupplierPortal from './components/SupplierPortal';
import DriverCockpit from './components/DriverCockpit';
import LegalModals from './components/LegalModals';
import CookieBanner from './components/CookieBanner';
import Footer from './components/Footer';
import { ShieldCheck, Lock, Truck, HelpCircle, CheckCircle2, ChevronDown } from 'lucide-react';

export default function App() {
  const [activeView, setActiveView] = useState('portal'); // 'portal', 'buyer', 'supplier', 'driver'
  const [activeLegalModal, setActiveLegalModal] = useState(null); // 'terms', 'privacy', 'refund', 'cookies' or null

  const handleSelectSupplierForEscrow = (supplier) => {
    setActiveView('portal');
    // Smooth scroll to the Escrow Simulator
    const sim = document.getElementById('escrow-simulator');
    if (sim) {
      sim.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreMarketplace = () => {
    const market = document.getElementById('marketplace');
    if (market) {
      market.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreSimulator = () => {
    const sim = document.getElementById('escrow-simulator');
    if (sim) {
      sim.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-cas-canvas text-cas-slate">
      {/* Universal Header with Persona View Switcher */}
      <Header 
        activeView={activeView} 
        setActiveView={setActiveView} 
        onOpenLegalModal={(modal) => setActiveLegalModal(modal)} 
      />

      {/* Live Depot Spot Ticker (Visible Across Portal) */}
      <DepotTicker />

      {/* Main Content Area Based on Active Perspective */}
      <main className="flex-1">
        {activeView === 'portal' && (
          <>
            {/* 1. Hero Section with Generous White Space */}
            <Hero 
              onExploreMarketplace={handleExploreMarketplace}
              onExploreSimulator={handleExploreSimulator}
            />

            {/* 2. Signature Element: The Geofence Escrow Terminal */}
            <EscrowTerminal />

            {/* 3. Live Supplier Directory & Depot Comparison */}
            <Marketplace 
              onSelectSupplierForEscrow={handleSelectSupplierForEscrow}
            />

            {/* 4. Trust & Dual Protection Comparison Section */}
            <section className="bg-white py-12 md:py-20 border-b border-cas-border">
              <div className="max-w-7xl mx-auto px-4 sm:px-8">
                <div className="text-center max-w-3xl mx-auto mb-12">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-slate-100 text-cas-slate text-xs font-bold uppercase tracking-wider mb-3">
                    <ShieldCheck className="w-3.5 h-3.5 text-cas-amberDark" aria-hidden="true" />
                    <span>Fiduciary Architecture</span>
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-extrabold text-cas-slate tracking-tight">
                    How CAS Escrow Protects Both Sides
                  </h2>
                  <p className="text-base sm:text-lg text-cas-muted mt-2">
                    In high-value petroleum logistics, uncertainty damages commerce. CAS Energy eliminates risk for both corporate purchasers and licensed marketers.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                  {/* Buyer Protection Column */}
                  <div className="p-8 bg-slate-50 rounded-2xl border-2 border-slate-200">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border-2 border-cas-blue text-cas-blue mb-6 shadow-sm">
                      <Lock className="w-6 h-6" aria-hidden="true" />
                    </div>
                    <h3 className="text-xl font-extrabold text-cas-slate mb-4">Protection For Corporate Buyers</h3>
                    <ul className="space-y-3.5 text-sm text-cas-muted">
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-5 h-5 text-cas-green shrink-0 mt-0.5" aria-hidden="true" />
                        <span><strong>Zero Premature Debits:</strong> Payment stays safely locked in escrow until the tanker crosses into your facility gate perimeter.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-5 h-5 text-cas-green shrink-0 mt-0.5" aria-hidden="true" />
                        <span><strong>Quality Rejection Guarantee:</strong> If the on-site hydrometer density or flash point test fails, product is rejected and 100% of escrow is returned.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-5 h-5 text-cas-green shrink-0 mt-0.5" aria-hidden="true" />
                        <span><strong>Calibrated Meter Verification:</strong> Every tanker is metered with certified digital tickets so you never pay for short volumes.</span>
                      </li>
                    </ul>
                  </div>

                  {/* Marketer Protection Column */}
                  <div className="p-8 bg-slate-50 rounded-2xl border-2 border-slate-200">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border-2 border-cas-amber text-cas-amberDark mb-6 shadow-sm">
                      <Truck className="w-6 h-6" aria-hidden="true" />
                    </div>
                    <h3 className="text-xl font-extrabold text-cas-slate mb-4">Protection For Licensed Marketers</h3>
                    <ul className="space-y-3.5 text-sm text-cas-muted">
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-5 h-5 text-cas-green shrink-0 mt-0.5" aria-hidden="true" />
                        <span><strong>Guaranteed Funds Upfront:</strong> Never dispatch a 40-million Naira fuel tanker on credit or uncertain payment promises.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-5 h-5 text-cas-green shrink-0 mt-0.5" aria-hidden="true" />
                        <span><strong>Non-Cancellable Route Lock:</strong> The moment your loaded truck departs the depot gate, the buyer cannot cancel the order while product is in transit.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-5 h-5 text-cas-green shrink-0 mt-0.5" aria-hidden="true" />
                        <span><strong>Automated Instant Settlement:</strong> Once the receiving officer confirms discharge inside the geofenced perimeter, funds are transferred within sixty seconds.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* 5. Corporate FAQ Section */}
            <section className="bg-cas-canvas py-12 md:py-20 border-b border-cas-border">
              <div className="max-w-4xl mx-auto px-4 sm:px-8">
                <div className="text-center mb-12">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-slate-200 text-cas-slate text-xs font-bold uppercase tracking-wider mb-3">
                    <HelpCircle className="w-3.5 h-3.5 text-cas-amberDark" aria-hidden="true" />
                    <span>Frequently Answered Questions</span>
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-extrabold text-cas-slate tracking-tight">
                    Frequently Asked Questions
                  </h2>
                </div>

                <div className="space-y-4">
                  <div className="p-6 bg-white rounded-xl border border-slate-200">
                    <h4 className="font-bold text-base text-cas-slate mb-2">
                      How does CAS Escrow hold buyer funds securely?
                    </h4>
                    <p className="text-sm text-cas-muted leading-relaxed">
                      Buyer payments are held in an independent custodial account managed by licensed institutional trustees (Stanbic IBTC Nominees / FCMB Trustees). Funds cannot be accessed by CAS Energy, the buyer, or the marketer until the physical delivery criteria are met.
                    </p>
                  </div>

                  <div className="p-6 bg-white rounded-xl border border-slate-200">
                    <h4 className="font-bold text-base text-cas-slate mb-2">
                      Why does the platform require GPS location during registration?
                    </h4>
                    <p className="text-sm text-cas-muted leading-relaxed">
                      Accurate delivery of bulk fuel requires millimeter clarity. Drivers need exact gate coordinates to prevent dangerous turnarounds on narrow urban roads. Furthermore, the GPS perimeter ensures that the payment release button cannot be activated prematurely.
                    </p>
                  </div>

                  <div className="p-6 bg-white rounded-xl border border-slate-200">
                    <h4 className="font-bold text-base text-cas-slate mb-2">
                      What happens if the delivered diesel fails our quality test?
                    </h4>
                    <p className="text-sm text-cas-muted leading-relaxed">
                      Your receiving officer tests the fuel density with a hydrometer and inspects bottom samples before connecting the discharge hose. If the fuel fails specifications, the officer files an instant dispute on the platform. The tanker remains sealed, and 100% of your escrow deposit is protected.
                    </p>
                  </div>

                  <div className="p-6 bg-white rounded-xl border border-slate-200">
                    <h4 className="font-bold text-base text-cas-slate mb-2">
                      What are the demurrage rules for delayed off-loading?
                    </h4>
                    <p className="text-sm text-cas-muted leading-relaxed">
                      Drivers allow up to four free hours of detention upon arrival at the buyer gate. If facility tank maintenance or administrative delays exceed four hours, demurrage is assessed at ₦15,000 per hour to compensate the driver and marketer.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {/* Persona Perspective 2: Buyer Facility Setup */}
        {activeView === 'buyer' && (
          <BuyerDischargeSetup />
        )}

        {/* Persona Perspective 3: Supplier Desk */}
        {activeView === 'supplier' && (
          <SupplierPortal />
        )}

        {/* Persona Perspective 4: Driver Cockpit */}
        {activeView === 'driver' && (
          <DriverCockpit />
        )}
      </main>

      {/* Compliance & Policy Modals */}
      <LegalModals 
        activeModal={activeLegalModal} 
        onClose={() => setActiveLegalModal(null)} 
      />

      {/* Cookie Consent Banner */}
      <CookieBanner onOpenPolicy={(modal) => setActiveLegalModal(modal)} />

      {/* Universal Footer with Real Corporate Details & Legal Links */}
      <Footer onOpenLegalModal={(modal) => setActiveLegalModal(modal)} />
    </div>
  );
}
