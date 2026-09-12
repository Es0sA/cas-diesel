import React from 'react';
import { ShieldCheck, MapPin, CheckCircle2, Lock, ArrowRight, Truck } from 'lucide-react';

export default function Hero({ onExploreMarketplace, onExploreSimulator }) {
  return (
    <section className="bg-white py-8 sm:py-16 md:py-20 border-b border-cas-border">
      <div className="max-w-7xl mx-auto px-3 sm:px-8">
        <div className="max-w-4xl">
          {/* Regulatory Trust Badge */}
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-full bg-cas-amberLight border border-cas-amber/40 text-cas-amberDark text-[11px] sm:text-sm font-bold mb-4 sm:mb-6">
            <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cas-amberDark shrink-0" aria-hidden="true" />
            <span>Downstream Petroleum Trading Architecture | CAS Energy</span>
          </div>

          {/* Main Headline with large high-contrast typography */}
          <h1 className="text-2xl sm:text-5xl lg:text-6xl font-extrabold text-cas-slate tracking-tight leading-[1.2] sm:leading-[1.15] mb-4 sm:mb-6">
            Direct Depot Pricing. <br />
            <span className="text-cas-amberDark underline decoration-cas-amber/50 decoration-4 underline-offset-8">
              Escrow Protected.
            </span> <br />
            Delivered To Your Tanks.
          </h1>

          {/* Subtitle formatted for maximum clarity */}
          <p className="text-base sm:text-xl text-cas-muted leading-relaxed mb-6 sm:mb-8 max-w-3xl">
            CAS Energy connects corporate procurement officers with licensed Nigerian depot marketers.
            Your payment is held safely in escrow. Once delivery begins, dispatch is guaranteed, and funds can only be released after the truck arrives inside your registered facility perimeter.
          </p>

          {/* Action CTAs: Big, high-contrast, large click targets (minimum 52px height) */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-12">
            <button
              type="button"
              onClick={onExploreSimulator}
              className="px-8 py-4 bg-cas-slate hover:bg-black text-white font-bold text-base sm:text-lg rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-3 border-2 border-transparent hover:border-cas-amber"
            >
              <span>Test the Escrow Simulator</span>
              <ArrowRight className="w-5 h-5 text-cas-amber" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={onExploreMarketplace}
              className="px-8 py-4 bg-white hover:bg-slate-50 text-cas-slate font-bold text-base sm:text-lg rounded-lg border-2 border-cas-slate transition-all flex items-center justify-center gap-2"
            >
              <span>Compare Depot Suppliers</span>
            </button>
          </div>

          {/* The 3 Core Guarantees */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-cas-border">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded bg-cas-greenLight text-cas-green flex items-center justify-center shrink-0 mt-1">
                <Lock className="w-4 h-4" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-bold text-cas-slate text-base">Two-Sided Escrow Lock</h3>
                <p className="text-sm text-cas-muted leading-snug">
                  Marketers are protected against payment defaults; buyers are protected against failed deliveries.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded bg-cas-blueLight text-cas-blue flex items-center justify-center shrink-0 mt-1">
                <MapPin className="w-4 h-4" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-bold text-cas-slate text-base">Geofenced Sign-Off</h3>
                <p className="text-sm text-cas-muted leading-snug">
                  Payment release is physically locked until the tanker crosses into your registered GPS coordinates.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded bg-cas-amberLight text-cas-amberDark flex items-center justify-center shrink-0 mt-1">
                <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-bold text-cas-slate text-base">Certified NMDPRA Quality</h3>
                <p className="text-sm text-cas-muted leading-snug">
                  Every batch includes certified hydrometer density readings and flash point laboratory certificates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
