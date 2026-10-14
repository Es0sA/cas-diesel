import React, { useState } from 'react';
import {
  ArrowRight, ArrowDown, BadgeCheck, Eye, Truck, MapPin, ClipboardCheck, Scale, FileSearch,
  MessageSquare, ShieldCheck, Plus, Minus, Building2, Fuel, Lock, Check, Clock, Star, Zap,
  Repeat, FileText, Receipt, Droplets, Navigation, TriangleAlert, Stamp, Layers
} from 'lucide-react';
import { CONTACT, hasContact } from '../config';
import { DEPOTS } from '../data/depots';

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

const TRUST_STRIP = [
  { icon: BadgeCheck, title: 'Verified marketers', text: 'Company and licence documents reviewed by CAS before anyone is listed.' },
  { icon: Lock, title: 'Escrow on every order', text: 'Your money is held by the platform until delivery is verified.' },
  { icon: Droplets, title: 'Pay for what you receive', text: 'Settlement follows the verified quantity, not the ordered one.' },
  { icon: MapPin, title: 'Tracked to your gate', text: 'Live location and arrival detection within 100 metres.' }
];

const OLD_WAY = [
  'Phone around for quotes',
  'Chase certificates and specs by message',
  'Pay up front and hope',
  'Chase the truck by phone',
  'Argue over the litres received'
];
const CAS_WAY = [
  'Post one RFQ with your spec',
  'Compare spec-checked quotes side by side',
  'Pay into escrow',
  'Follow the truck to your gate',
  'Settle on the verified quantity'
];

const STEPS = [
  { n: '01', icon: FileText, title: 'Post an RFQ', text: 'Enter volume, gate and deadline. The Nigerian AGO spec is prefilled and you can tighten it.' },
  { n: '02', icon: Layers, title: 'Compare quotes', text: 'Verified marketers quote with a certificate. Every quote is checked against your spec automatically.' },
  { n: '03', icon: Check, title: 'Accept one', text: 'Accepting creates the order with your spec and terms locked in. The other quotes close.' },
  { n: '04', icon: Lock, title: 'Fund escrow', text: 'Pay into escrow. The marketer sees the funds are secured before the truck loads.' },
  { n: '05', icon: Navigation, title: 'Track delivery', text: 'A verified driver is dispatched within 24 hours. You follow the truck until it reaches your gate.' },
  { n: '06', icon: Scale, title: 'Verify and settle', text: 'You record weights, density and tank levels. CAS releases payment for the verified quantity.' }
];

const MECHANISMS = [
  { icon: Lock, title: 'Escrow', text: 'You fund the full order. Nothing reaches the marketer until delivery is verified, and any unused balance returns to you.' },
  { icon: FileSearch, title: 'Marketer verification', text: 'Company and licence documents are reviewed one by one by a CAS admin, approved or rejected with a reason.' },
  { icon: ClipboardCheck, title: 'Driver verification', text: 'Drivers upload their licence for review before they are dispatched on any order.' },
  { icon: MapPin, title: 'Geofenced arrival', text: 'The truck is marked as arrived when its location is within 100 metres of your registered gate.' },
  { icon: Stamp, title: 'Documents and seals', text: 'Waybill, certificate, calibration chart, driver ID and seal record must be ticked off before offloading starts.' },
  { icon: Droplets, title: 'Quality against spec', text: 'Quotes carry a batch certificate checked against your density, flash point, sulphur and water limits.' },
  { icon: Scale, title: 'Dispute desk', text: 'Off-spec product, broken seals or quantity disagreements go to a CAS admin with the full measurement record.' },
  { icon: Receipt, title: 'Audit trail', text: 'Every status change on every order is logged with who triggered it and when.' }
];

const FEATURES = [
  { icon: FileText, title: 'RFQ in minutes', text: 'A prefilled AGO spec template, so you never retype the standard clauses.' },
  { icon: Zap, title: 'Instant spec check', text: 'Each quote is checked against your limits and any deviation is flagged.' },
  { icon: Repeat, title: 'Standing-rate auto-quotes', text: 'Marketers save depots, minimums and prices, then confirm quotes in one tap.' },
  { icon: Clock, title: 'Deadlines enforced', text: 'Dispatch within 24 hours and delivery within 3 working days, tracked automatically.' },
  { icon: Eye, title: 'Open directory', text: 'Browse verified marketers by depot with prices and minimum orders side by side.' },
  { icon: MessageSquare, title: 'Order chat', text: 'Buyer and marketer talk on the order itself, with unread alerts.' },
  { icon: Receipt, title: 'Waybills on demand', text: 'Download a waybill for any order as a PDF.' },
  { icon: Star, title: 'Reviews and ratings', text: 'Buyers rate marketers after delivery, so ratings come from real orders.' },
  { icon: ShieldCheck, title: 'Admin operations desk', text: 'KYC review, user verification, order search with CSV export and dispute resolution.' }
];

const FAQ = [
  { q: 'Who can buy through CAS?', a: 'Businesses with recurring bulk diesel needs, such as factories, hotels, hospitals, construction firms and fleets. You register a buyer account with your company details.' },
  { q: 'Where does CAS operate?', a: 'Orders load from the depots listed on this page, across Lagos, Delta, Rivers and Cross River. You set your own delivery gate.' },
  { q: 'What quantity can I order?', a: 'Each marketer sets a minimum order. Bulk orders start from the marketer\'s listed minimum, and your RFQ states the volume you need.' },
  { q: 'How are marketers verified?', a: 'Marketers upload company and licence documents. A CAS admin approves or rejects each one with a reason. Only verified marketers can quote or be listed.' },
  { q: 'How is the price determined?', a: 'Marketers set their own prices. Post an RFQ and they quote against it, or browse the directory and order at a listed price. CAS does not set prices.' },
  { q: 'How does payment work?', a: 'You fund the order into escrow. It stays locked while the truck loads, travels and arrives, and is released to the marketer after delivery is verified.' },
  { q: 'When does the marketer get paid?', a: 'After you record the delivery verification. Payment follows the final verified quantity multiplied by the accepted price. Any difference returns to you.' },
  { q: 'How is delivery verified?', a: 'The truck is detected at your gate, then you record weighbridge and tank readings along with destination density. CAS computes the verified quantity from those.' },
  { q: 'What if the product is off-spec or the seals are broken?', a: 'Reject the delivery and open a dispute. A CAS admin reviews the measurements and documents, and escrow stays locked until it is resolved.' },
  { q: 'Can I use CAS for recurring supply?', a: 'Yes. Order again from the directory at a marketer\'s listed price, or post a fresh RFQ whenever you restock.' },
  { q: 'How do I become a marketer or a driver?', a: 'Register as a marketer or driver, then upload your documents for review. You are listed or dispatched once they are approved.' }
];

/* ------------------------------------------------------------------ */
/* Small helpers                                                       */
/* ------------------------------------------------------------------ */

function Eyebrow({ children, dark }) {
  return (
    <div className={`text-xs font-bold uppercase tracking-[0.18em] mb-3 ${dark ? 'text-amber-400' : 'text-cas-amberDark'}`}>
      {children}
    </div>
  );
}

function Sample() {
  return <div className="mt-4 text-[11px] font-semibold uppercase tracking-wider text-slate-500">Illustrative example</div>;
}

const naira = (n) => `₦${n.toLocaleString('en-NG')}`;

/* ------------------------------------------------------------------ */
/* Product mockups                                                     */
/* ------------------------------------------------------------------ */

function QuotesMock({ compact }) {
  const quotes = [
    { name: 'Marketer A', depot: 'Apapa', price: 1172, eta: '18 hrs', spec: 'pass' },
    { name: 'Marketer B', depot: 'Ijegun', price: 1168, eta: '22 hrs', spec: 'pass', best: true },
    { name: 'Marketer C', depot: 'Warri', price: 1160, eta: '30 hrs', spec: 'flag' }
  ];
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-4 sm:p-5 text-left">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">Request for quotation</div>
          <div className="text-white font-extrabold mt-1">45,000 L AGO</div>
        </div>
        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 bg-amber-500/10 border border-amber-500/30 rounded-full px-2.5 py-1">
          <Clock className="w-3.5 h-3.5" aria-hidden="true" /> Closes in 23h 12m
        </span>
      </div>
      <div className="mt-4 space-y-2">
        {quotes.map((q) => (
          <div key={q.name} className={`rounded-xl border p-3 flex items-center justify-between gap-3 ${q.best ? 'border-amber-500/50 bg-amber-500/[0.07]' : 'border-white/10 bg-white/[0.03]'}`}>
            <div className="min-w-0">
              <div className="text-white font-bold text-sm flex items-center gap-2">
                {q.name}
                {q.best && <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-950 bg-amber-400 rounded px-1.5 py-0.5 whitespace-nowrap">Best price</span>}
              </div>
              <div className="text-xs text-slate-400 mt-0.5">{q.depot} depot, dispatch in {q.eta}</div>
            </div>
            <div className="text-right shrink-0">
              <div className="text-white font-extrabold text-sm">{naira(q.price)}<span className="text-slate-400 font-semibold"> /L</span></div>
              {q.spec === 'pass' ? (
                <div className="text-xs font-bold text-emerald-400 flex items-center justify-end gap-1 mt-0.5"><Check className="w-3.5 h-3.5" aria-hidden="true" />Spec passes</div>
              ) : (
                <div className="text-xs font-bold text-amber-400 flex items-center justify-end gap-1 mt-0.5"><TriangleAlert className="w-3.5 h-3.5" aria-hidden="true" />Flash point flagged</div>
              )}
            </div>
          </div>
        ))}
      </div>
      {!compact && (
        <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[11px] text-slate-400">
          {[['Density', '0.830 to 0.840'], ['Flash point', 'min 66 C'], ['Sulphur', 'max 0.05%']].map(([k, v]) => (
            <div key={k} className="rounded-lg bg-white/[0.04] py-2"><div className="font-bold text-slate-300">{k}</div>{v}</div>
          ))}
        </div>
      )}
    </div>
  );
}

function EscrowMock() {
  const stages = [
    { label: 'Funded', note: 'Locked in escrow', done: true },
    { label: 'Loaded and dispatched', note: 'Driver assigned', done: true },
    { label: 'Arrived at gate', note: 'Within 100 m', done: true },
    { label: 'Verified', note: 'Weights and density recorded', done: false, now: true },
    { label: 'Settled', note: 'Payment released', done: false }
  ];
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-5 text-left">
      <div className="flex items-center justify-between">
        <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">Escrow balance</div>
        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-300"><Lock className="w-3.5 h-3.5" aria-hidden="true" />Locked</span>
      </div>
      <div className="mt-1 text-3xl font-black text-white tracking-tight">{naira(52875000)}</div>
      <div className="mt-5 space-y-0">
        {stages.map((s, i) => (
          <div key={s.label} className="flex items-start gap-3">
            <div className="flex flex-col items-center">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-extrabold ${s.done ? 'bg-emerald-500 text-slate-950' : s.now ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-500'}`}>
                {s.done ? <Check className="w-3.5 h-3.5" aria-hidden="true" /> : i + 1}
              </span>
              {i < stages.length - 1 && <span className={`w-px h-7 ${s.done ? 'bg-emerald-500/60' : 'bg-slate-700'}`} />}
            </div>
            <div className="pb-4">
              <div className={`text-sm font-bold ${s.done || s.now ? 'text-white' : 'text-slate-500'}`}>{s.label}</div>
              <div className="text-xs text-slate-400">{s.note}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TrackingMock() {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-4 sm:p-5 text-left">
      <div className="relative rounded-xl overflow-hidden border border-white/10 bg-slate-950">
        <svg viewBox="0 0 360 220" className="w-full h-auto block" role="img" aria-label="Truck approaching the delivery gate geofence">
          <defs>
            <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
              <path d="M24 0H0V24" fill="none" stroke="#1e293b" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="360" height="220" fill="url(#grid)" />
          <path d="M20 190 C 90 190, 110 120, 170 110 S 270 100, 292 96" fill="none" stroke="#475569" strokeWidth="3" strokeDasharray="2 7" strokeLinecap="round" />
          <path d="M20 190 C 90 190, 110 120, 170 110 S 235 103, 250 101" fill="none" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
          <circle cx="300" cy="94" r="46" fill="#10b981" fillOpacity="0.10" stroke="#10b981" strokeOpacity="0.6" strokeDasharray="4 4" />
          <circle cx="300" cy="94" r="6" fill="#10b981" />
          <circle cx="250" cy="101" r="14" fill="#f59e0b" fillOpacity="0.2" className="cas-pulse" />
          <circle cx="250" cy="101" r="6" fill="#f59e0b" />
          <text x="248" y="170" textAnchor="middle" fill="#6ee7b7" fontSize="11" fontWeight="700">Your gate, 100 m radius</text>
        </svg>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        {[['Status', 'In transit'], ['Distance', '412 m'], ['Last ping', '12 sec ago']].map(([k, v]) => (
          <div key={k} className="rounded-lg bg-white/[0.04] py-2.5">
            <div className="text-[11px] uppercase tracking-wider text-slate-500 font-bold">{k}</div>
            <div className="text-sm font-extrabold text-white mt-0.5">{v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function VerifyMock() {
  const rows = [
    ['Gross weight', '71,240 kg'],
    ['Tare weight', '33,610 kg'],
    ['Destination density', '0.8390 kg/L'],
    ['Tank before', '8,400 L'],
    ['Tank after', '53,300 L']
  ];
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-5 text-left">
      <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400 mb-3">Delivery verification</div>
      <div className="divide-y divide-white/5 text-sm">
        {rows.map(([k, v]) => (
          <div key={k} className="flex items-center justify-between py-2"><span className="text-slate-400">{k}</span><span className="text-white font-bold">{v}</span></div>
        ))}
      </div>
      <div className="mt-4 rounded-xl bg-white/[0.04] p-3 space-y-1.5 text-sm">
        <div className="flex justify-between"><span className="text-slate-400">Weighbridge quantity</span><span className="text-white font-bold">44,820 L</span></div>
        <div className="flex justify-between"><span className="text-slate-400">Tank quantity</span><span className="text-white font-bold">44,900 L</span></div>
        <div className="flex justify-between border-t border-white/10 pt-1.5"><span className="text-amber-300 font-bold">Final verified quantity</span><span className="text-amber-300 font-black">44,860 L</span></div>
      </div>
    </div>
  );
}

function DocsMock() {
  const docs = ['Waybill', 'Invoice', 'Batch quality certificate', 'Truck calibration chart', 'Driver ID', 'Seal record', 'Loading ticket'];
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-5 text-left">
      <div className="flex items-center justify-between mb-3">
        <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">Before offloading</div>
        <span className="text-xs font-bold text-emerald-300">7 of 7 ready</span>
      </div>
      <ul className="space-y-1.5">
        {docs.map((d) => (
          <li key={d} className="flex items-center gap-2.5 text-sm text-slate-200">
            <span className="w-5 h-5 rounded bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0"><Check className="w-3.5 h-3.5" aria-hidden="true" /></span>{d}
          </li>
        ))}
      </ul>
      <div className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-500/[0.07] p-3 text-sm text-emerald-200 flex items-center gap-2">
        <Stamp className="w-4 h-4 shrink-0" aria-hidden="true" /> Original depot seals intact. Offloading cleared.
      </div>
    </div>
  );
}

function ChatMock() {
  const msgs = [
    { me: false, who: 'Marketer', t: 'Truck loaded and sealed. Leaving the depot now.' },
    { me: true, who: 'You', t: 'Thanks. Gate is open until 18:00. Offloading needs two hours.' },
    { me: false, who: 'Marketer', t: 'Driver will arrive by 14:30.' }
  ];
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-5 text-left space-y-3">
      <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">Order chat</div>
      {msgs.map((m, i) => (
        <div key={i} className={`flex ${m.me ? 'justify-end' : 'justify-start'}`}>
          <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${m.me ? 'bg-amber-500 text-slate-950 font-semibold rounded-br-sm' : 'bg-white/[0.07] text-slate-100 rounded-bl-sm'}`}>
            <div className={`text-[11px] font-bold mb-0.5 ${m.me ? 'text-slate-800' : 'text-slate-400'}`}>{m.who}</div>
            {m.t}
          </div>
        </div>
      ))}
    </div>
  );
}

const SHOWCASE = [
  { id: 'rfq', tab: 'RFQ and quotes', title: 'Post once. Compare real quotes.', text: 'Set your volume, gate and deadline and CAS prefills the Nigerian AGO specification. Verified marketers answer with a price, source depot, taxes, payment terms and a batch certificate. Each quote is checked against your limits, and any deviation is flagged before you accept.', mock: () => <QuotesMock /> },
  { id: 'escrow', tab: 'Escrow', title: 'Your money stays locked until it counts.', text: 'You fund the full order into escrow. The marketer sees the funds are secured before the truck loads. Nothing is released until delivery is verified, and any balance above the verified amount comes back to you.', mock: () => <EscrowMock /> },
  { id: 'track', tab: 'Live tracking', title: 'Watch the truck reach your gate.', text: 'The driver\'s phone shares its location for the whole trip. When the truck is within 100 metres of the gate you registered, the order flips to arrived and you are alerted to get ready for offloading.', mock: () => <TrackingMock /> },
  { id: 'verify', tab: 'Verification', title: 'Pay for the litres you actually received.', text: 'On arrival you record gross and tare weights, destination density and tank levels. CAS works out the quantity from the weighbridge and from the tank, averages the two, and settles on that figure.', mock: () => <VerifyMock /> },
  { id: 'docs', tab: 'Documents', title: 'No paperwork, no offloading.', text: 'The waybill, invoice, quality certificate, truck calibration chart, driver ID, seal record and loading ticket are checked off before discharge is cleared. Broken seals mean rejection, not an argument.', mock: () => <DocsMock /> },
  { id: 'chat', tab: 'Order chat', title: 'Every conversation lives on the order.', text: 'Buyer and marketer message each other on the order itself to settle timing, quality questions or a cancellation request. Nothing gets lost in a phone log.', mock: () => <ChatMock /> }
];

/* ------------------------------------------------------------------ */
/* Sections                                                            */
/* ------------------------------------------------------------------ */

function Hero({ onGetDiesel }) {
  return (
    <section className="relative bg-slate-950 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-[0.07]" aria-hidden="true"
        style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '56px 56px' }} />
      <div className="absolute -top-40 -right-40 w-[34rem] h-[34rem] rounded-full bg-amber-600/20 blur-3xl" aria-hidden="true" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 py-14 sm:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-500/40 bg-amber-500/10 text-amber-300 text-xs font-bold uppercase tracking-[0.16em] mb-6">
              <Fuel className="w-3.5 h-3.5" aria-hidden="true" />
              Bulk diesel for businesses
            </div>
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black tracking-tight leading-[1.05]">
              Bulk diesel.<br />
              <span className="text-amber-400">Better sourced.</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-slate-300 leading-relaxed max-w-xl">
              Post an RFQ, compare spec-checked quotes from verified marketers, pay into escrow and settle on the quantity you actually receive.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row sm:items-center gap-4">
              <button
                type="button"
                onClick={onGetDiesel}
                className="px-8 py-4 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-base flex items-center justify-center gap-2.5 transition-colors"
              >
                Get Diesel
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </button>
              <a href="#how-it-works" className="inline-link text-center sm:text-left text-slate-200 hover:text-white font-bold text-base underline underline-offset-4 decoration-slate-600 hover:decoration-amber-400 py-2">
                See how it works
              </a>
            </div>
          </div>
          <div className="lg:col-span-6">
            <QuotesMock compact />
            <Sample />
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustStrip() {
  return (
    <section className="bg-white border-b border-cas-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {TRUST_STRIP.map((t) => (
          <div key={t.title} className="flex items-start gap-3">
            <t.icon className="w-6 h-6 text-cas-amberDark shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <h2 className="font-extrabold text-cas-slate text-base">{t.title}</h2>
              <p className="text-sm text-cas-muted leading-relaxed mt-0.5">{t.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProblemSolution() {
  return (
    <section className="bg-cas-canvas py-16 sm:py-24 border-b border-cas-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="max-w-3xl mb-12">
          <Eyebrow>Why CAS</Eyebrow>
          <h2 className="text-3xl sm:text-5xl font-black text-cas-slate tracking-tight leading-tight">
            Buying diesel shouldn&apos;t feel like a gamble.
          </h2>
          <p className="mt-4 text-lg text-cas-muted leading-relaxed">
            Quotes by phone, certificates by message, a truck you cannot see and a quantity nobody agrees on. CAS puts the whole purchase in one place, from request to settlement.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500 mb-5">The usual way</div>
            <ol className="space-y-3">
              {OLD_WAY.map((s, i) => (
                <li key={s}>
                  <div className="flex items-center gap-3 text-slate-600 font-semibold">
                    <span className="w-7 h-7 rounded-full bg-slate-100 text-slate-500 text-xs font-extrabold flex items-center justify-center shrink-0">{i + 1}</span>
                    {s}
                  </div>
                  {i < OLD_WAY.length - 1 && <ArrowDown className="w-4 h-4 text-slate-300 ml-1.5 mt-2" aria-hidden="true" />}
                </li>
              ))}
            </ol>
          </div>
          <div className="rounded-2xl bg-slate-950 p-6 sm:p-8 border border-slate-800">
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-amber-400 mb-5">With CAS</div>
            <ol className="space-y-3">
              {CAS_WAY.map((s, i) => (
                <li key={s}>
                  <div className="flex items-center gap-3 text-white font-semibold">
                    <span className="w-7 h-7 rounded-full bg-amber-500 text-slate-950 text-xs font-extrabold flex items-center justify-center shrink-0">{i + 1}</span>
                    {s}
                  </div>
                  {i < CAS_WAY.length - 1 && <ArrowDown className="w-4 h-4 text-amber-500/50 ml-1.5 mt-2" aria-hidden="true" />}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white py-16 sm:py-24 border-b border-cas-border scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="max-w-3xl mb-12">
          <Eyebrow>How it works</Eyebrow>
          <h2 className="text-3xl sm:text-5xl font-black text-cas-slate tracking-tight leading-tight">
            From request to settled payment in six steps.
          </h2>
        </div>
        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-200 rounded-2xl overflow-hidden border border-slate-200">
          {STEPS.map((s) => (
            <li key={s.n} className="bg-white p-6 sm:p-7 flex flex-col">
              <div className="flex items-center justify-between">
                <span className="text-4xl font-black text-amber-500/90 tracking-tight">{s.n}</span>
                <span className="w-10 h-10 rounded-xl bg-slate-100 text-cas-slate flex items-center justify-center"><s.icon className="w-5 h-5" aria-hidden="true" /></span>
              </div>
              <h3 className="mt-4 font-extrabold text-cas-slate text-lg leading-snug">{s.title}</h3>
              <p className="mt-2 text-sm text-cas-muted leading-relaxed">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Showcase() {
  const [active, setActive] = useState(0);
  const item = SHOWCASE[active];
  return (
    <section className="bg-slate-950 text-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="max-w-3xl mb-10">
          <Eyebrow dark>The platform</Eyebrow>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Every step of the purchase, in one place.
          </h2>
        </div>
        <div role="tablist" aria-label="Platform features" className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
          {SHOWCASE.map((s, i) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={i === active}
              onClick={() => setActive(i)}
              className={`shrink-0 px-4 py-2.5 rounded-full text-sm font-bold border transition-colors ${i === active ? 'bg-amber-500 border-amber-500 text-slate-950' : 'bg-transparent border-white/15 text-slate-300 hover:border-white/40 hover:text-white'}`}
            >
              {s.tab}
            </button>
          ))}
        </div>
        <div role="tabpanel" className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          <div className="lg:col-span-5">
            <h3 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">{item.title}</h3>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">{item.text}</p>
          </div>
          <div className="lg:col-span-7">
            {item.mock()}
            <Sample />
          </div>
        </div>
      </div>
    </section>
  );
}

function VerifiedQuantity() {
  const lines = [
    ['Escrow funded (45,000 L at ' + naira(1175) + ' per litre)', naira(52875000), false],
    ['Final verified quantity (44,860 L)', naira(52710500), false],
    ['Released to the marketer', naira(52710500), true],
    ['Returned to you', naira(164500), true]
  ];
  return (
    <section className="bg-white py-16 sm:py-24 border-b border-cas-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        <div className="lg:col-span-6">
          <Eyebrow>Fair settlement</Eyebrow>
          <h2 className="text-3xl sm:text-5xl font-black text-cas-slate tracking-tight leading-tight">
            Pay for what you receive. Not a litre more.
          </h2>
          <p className="mt-4 text-lg text-cas-muted leading-relaxed">
            Trucks rarely deliver the exact ordered volume. CAS measures the delivery two ways, from the weighbridge and from your tank, then averages them. You pay the verified quantity multiplied by the accepted price. The difference goes straight back to you.
          </p>
          <ul className="mt-6 space-y-2.5 text-cas-slate font-semibold">
            {['Destination density overrides density on supplier paperwork', 'Extra volume above your order is only paid if you approve it', 'Missing paperwork or measurements keep the money locked'].map((t) => (
              <li key={t} className="flex items-start gap-2.5"><Check className="w-5 h-5 text-cas-green shrink-0 mt-0.5" aria-hidden="true" />{t}</li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-6">
          <div className="rounded-2xl border border-slate-200 bg-cas-canvas p-6 sm:p-8">
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500 mb-5">Settlement example</div>
            <div className="space-y-3">
              {lines.map(([k, v, strong]) => (
                <div key={k} className={`flex items-center justify-between gap-4 ${strong ? 'pt-3 border-t border-slate-200' : ''}`}>
                  <span className={`text-sm ${strong ? 'font-extrabold text-cas-slate' : 'text-cas-muted font-semibold'}`}>{k}</span>
                  <span className={`shrink-0 font-black ${strong ? 'text-cas-slate text-lg' : 'text-slate-600 text-base'}`}>{v}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 text-[11px] font-semibold uppercase tracking-wider text-slate-500">Illustrative example</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustMechanisms() {
  return (
    <section className="bg-slate-950 text-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="max-w-3xl mb-12">
          <Eyebrow dark>Trust</Eyebrow>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Built for purchases where trust matters.
          </h2>
          <p className="mt-4 text-lg text-slate-300 leading-relaxed">
            Large diesel orders carry real risk. These are the checks CAS builds into every order.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {MECHANISMS.map((m) => (
            <div key={m.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <span className="w-11 h-11 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center">
                <m.icon className="w-5 h-5" aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-extrabold text-lg">{m.title}</h3>
              <p className="mt-2 text-sm text-slate-300 leading-relaxed">{m.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Depots() {
  return (
    <section className="bg-white py-16 sm:py-20 border-b border-cas-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="max-w-3xl mb-10">
          <Eyebrow>Where it loads</Eyebrow>
          <h2 className="text-3xl sm:text-4xl font-black text-cas-slate tracking-tight leading-tight">Six depots across the southern corridor.</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {DEPOTS.map((d) => (
            <div key={d.id} className="rounded-xl border border-slate-200 bg-slate-50 p-5 flex items-start gap-3">
              <span className="w-10 h-10 rounded-lg bg-slate-950 text-amber-400 flex items-center justify-center shrink-0"><MapPin className="w-5 h-5" aria-hidden="true" /></span>
              <div>
                <h3 className="font-extrabold text-cas-slate leading-snug">{d.name}</h3>
                <p className="text-sm text-cas-muted mt-0.5">{d.hub}</p>
                <p className="text-xs font-bold uppercase tracking-wider text-cas-amberDark mt-1.5">{d.state} State</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section className="bg-cas-canvas py-16 sm:py-24 border-b border-cas-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="max-w-3xl mb-12">
          <Eyebrow>Everything included</Eyebrow>
          <h2 className="text-3xl sm:text-5xl font-black text-cas-slate tracking-tight leading-tight">
            The tools a diesel purchase actually needs.
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f) => (
            <div key={f.title} className="rounded-2xl border border-slate-200 bg-white p-6">
              <span className="w-11 h-11 rounded-xl bg-amber-100 text-cas-amberDark flex items-center justify-center"><f.icon className="w-5 h-5" aria-hidden="true" /></span>
              <h3 className="mt-4 font-extrabold text-cas-slate text-lg">{f.title}</h3>
              <p className="mt-1.5 text-sm text-cas-muted leading-relaxed">{f.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ArrowLink({ role, onRegister, children }) {
  return (
    <button type="button" onClick={() => onRegister(role)} className="mt-5 inline-link text-sm font-extrabold text-cas-slate underline underline-offset-4 decoration-amber-500 hover:decoration-cas-slate">
      {children}
    </button>
  );
}

function Audiences({ onRegister }) {
  return (
    <section className="bg-white py-16 sm:py-24 border-b border-cas-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div id="buyers" className="lg:col-span-6 rounded-2xl bg-cas-amberLight border border-amber-300/60 p-7 sm:p-10 scroll-mt-20 flex flex-col">
          <Eyebrow>For buyers</Eyebrow>
          <h2 className="text-2xl sm:text-4xl font-black text-cas-slate tracking-tight leading-tight">
            For businesses that can&apos;t afford supply uncertainty.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-700 leading-relaxed">
            Factories, hotels, hospitals, construction sites and fleets run on diesel. Post an RFQ whenever you restock, or order again from a marketer you already trust.
          </p>
          <ul className="mt-5 space-y-2 text-slate-800 font-semibold text-sm">
            {['Set your own spec and delivery gate', 'Compare quotes without a phone call', 'Pay only for the verified quantity', 'Keep a record of every order and document'].map((t) => (
              <li key={t} className="flex items-start gap-2"><Check className="w-4 h-4 text-cas-green shrink-0 mt-0.5" aria-hidden="true" />{t}</li>
            ))}
          </ul>
          <div className="mt-8">
            <button
              type="button"
              onClick={() => onRegister('buyer')}
              className="px-7 py-3.5 rounded-lg bg-cas-slate hover:bg-black text-white font-extrabold flex items-center gap-2.5 transition-colors"
            >
              Start sourcing diesel
              <ArrowRight className="w-4 h-4 text-amber-400" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div id="for-marketers" className="lg:col-span-3 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-7 scroll-mt-20">
          <Eyebrow>For marketers</Eyebrow>
          <h2 className="text-xl font-black text-cas-slate tracking-tight">For licensed diesel marketers</h2>
          <p className="mt-2 text-sm text-cas-muted leading-relaxed">
            Get in front of businesses with real, recurring demand.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-slate-700 font-semibold">
            {['Quote on RFQs with your certificate', 'Save standing rates and confirm in one tap', 'See escrow funded before the truck loads', 'Build a rating from real deliveries'].map((t) => (
              <li key={t} className="flex items-start gap-2"><Check className="w-4 h-4 text-cas-green shrink-0 mt-0.5" aria-hidden="true" />{t}</li>
            ))}
          </ul>
          <ArrowLink role="supplier" onRegister={onRegister}>Join as a marketer</ArrowLink>
        </div>

        <div className="lg:col-span-3 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-7">
          <Eyebrow>For drivers</Eyebrow>
          <h2 className="text-xl font-black text-cas-slate tracking-tight">For delivery partners</h2>
          <p className="mt-2 text-sm text-cas-muted leading-relaxed">
            Work as an independent driver, not tied to one marketer.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-slate-700 font-semibold">
            {['Accept dispatches from any verified marketer', 'Exact gate location for every drop', 'One-tap navigation to the gate', 'Clear paperwork list for each load'].map((t) => (
              <li key={t} className="flex items-start gap-2"><Check className="w-4 h-4 text-cas-green shrink-0 mt-0.5" aria-hidden="true" />{t}</li>
            ))}
          </ul>
          <ArrowLink role="driver" onRegister={onRegister}>Become a delivery partner</ArrowLink>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="bg-slate-950 text-white py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        <Eyebrow dark>About CAS</Eyebrow>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
          Diesel procurement should not run on phone calls and trust alone.
        </h2>
        <p className="mt-5 text-lg text-slate-300 leading-relaxed">
          Bulk diesel is still bought through scattered relationships, unclear specs and quantities that get argued after the fact. CAS is building a structured way for businesses to request, compare, pay for and verify every delivery, with the money held safely until the job is done.
        </p>
      </div>
    </section>
  );
}

function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="bg-cas-canvas py-16 sm:py-24 border-b border-cas-border scroll-mt-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-8">
        <Eyebrow>FAQ</Eyebrow>
        <h2 className="text-3xl sm:text-4xl font-black text-cas-slate tracking-tight mb-8">Questions buyers ask first</h2>
        <div className="divide-y divide-slate-200 border-y border-slate-200">
          {FAQ.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="font-extrabold text-cas-slate text-base sm:text-lg">{f.q}</span>
                  {isOpen ? <Minus className="w-5 h-5 text-cas-amberDark shrink-0" aria-hidden="true" /> : <Plus className="w-5 h-5 text-slate-500 shrink-0" aria-hidden="true" />}
                </button>
                {isOpen && <p className="pb-5 -mt-1 text-cas-muted leading-relaxed">{f.a}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FinalCta({ onGetDiesel }) {
  return (
    <section className="relative bg-slate-950 text-white py-16 sm:py-24 overflow-hidden">
      <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[40rem] h-[24rem] rounded-full bg-amber-600/20 blur-3xl" aria-hidden="true" />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-8 text-center">
        <Building2 className="w-8 h-8 text-amber-400 mx-auto mb-5" aria-hidden="true" />
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
          Ready to source your next diesel delivery?
        </h2>
        <p className="mt-4 text-lg text-slate-300">
          Create a buyer account, post your first RFQ and let verified marketers compete for it.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={onGetDiesel}
            className="px-8 py-4 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-base flex items-center gap-2.5 transition-colors"
          >
            Get Diesel
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </button>
          {hasContact && CONTACT.email && (
            <a href={`mailto:${CONTACT.email}`} className="inline-link text-slate-200 hover:text-white font-bold underline underline-offset-4 decoration-slate-600 hover:decoration-amber-400 py-2">
              Talk to CAS
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

export default function Landing({ onRegister, marketplace }) {
  const getDiesel = () => onRegister('buyer');
  return (
    <>
      <Hero onGetDiesel={getDiesel} />
      <TrustStrip />
      <ProblemSolution />
      <HowItWorks />
      <Showcase />
      <VerifiedQuantity />
      {marketplace}
      <TrustMechanisms />
      <Depots />
      <Features />
      <Audiences onRegister={onRegister} />
      <About />
      <Faq />
      <FinalCta onGetDiesel={getDiesel} />
    </>
  );
}
