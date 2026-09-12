import React, { useState } from 'react';
import { Truck, Navigation, Phone, MapPin, CheckCircle2, ShieldCheck, AlertCircle, FileText } from 'lucide-react';

export default function DriverCockpit() {
  const [driverMode, setDriverMode] = useState('active-trip'); // 'active-trip' or 'register'
  
  // Active Trip State
  const [tripStep, setTripStep] = useState(2); // 1 = loaded, 2 = transit, 3 = arrived at gate, 4 = discharged
  const [driverRegistrationStatus, setDriverRegistrationStatus] = useState(false);

  // New Driver Form
  const [driverName, setDriverName] = useState('');
  const [phone, setPhone] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [truckPlate, setTruckPlate] = useState('');
  const [truckVolume, setTruckVolume] = useState('33000');
  const [selectedMarketer, setSelectedMarketer] = useState('Matrix Downstream Distribution Ltd');

  const handleRegisterDriver = (e) => {
    e.preventDefault();
    setDriverRegistrationStatus(true);
    setTimeout(() => {
      setDriverRegistrationStatus(false);
      setDriverMode('active-trip');
    }, 4000);
  };

  return (
    <section id="driver-cockpit" className="bg-cas-canvas py-12 md:py-20 border-b border-cas-border">
      <div className="max-w-3xl mx-auto px-4 sm:px-8">
        
        {/* Toggle between Active Trip and Driver Registration */}
        <div className="flex items-center justify-center mb-8">
          <div className="p-1 bg-slate-200 rounded-lg inline-flex gap-1">
            <button
              type="button"
              onClick={() => setDriverMode('active-trip')}
              className={`px-5 py-2.5 rounded-md text-xs sm:text-sm font-bold transition-all ${
                driverMode === 'active-trip'
                  ? 'bg-cas-slate text-white shadow'
                  : 'text-cas-slate hover:bg-slate-300'
              }`}
            >
              Active Delivery Manifest
            </button>
            <button
              type="button"
              onClick={() => setDriverMode('register')}
              className={`px-5 py-2.5 rounded-md text-xs sm:text-sm font-bold transition-all ${
                driverMode === 'register'
                  ? 'bg-cas-slate text-white shadow'
                  : 'text-cas-slate hover:bg-slate-300'
              }`}
            >
              Driver Fleet Registration
            </button>
          </div>
        </div>

        {/* View 1: Active Trip Manifest (Mobile First Cockpit) */}
        {driverMode === 'active-trip' ? (
          <div className="bg-white rounded-2xl border-2 border-cas-border shadow-md overflow-hidden">
            
            {/* Header / Identity */}
            <div className="bg-cas-slate text-white p-5 sm:p-6 border-b border-slate-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-cas-amber text-slate-900 flex items-center justify-center font-bold">
                    <Truck className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-lg text-white">Driver Suleiman Tanko</h3>
                    <span className="text-xs text-slate-300">Fleet: Matrix Downstream Distribution Ltd</span>
                  </div>
                </div>
                <span className="font-mono font-bold text-xs bg-slate-800 text-cas-amber px-2.5 py-1 rounded border border-slate-700">
                  LSR-492-XA
                </span>
              </div>
            </div>

            {/* Trip Manifest Body */}
            <div className="p-5 sm:p-8 space-y-6">
              
              {/* Order Assignment Box */}
              <div className="p-5 bg-amber-50 border-2 border-cas-amber rounded-xl">
                <div className="text-xs font-bold uppercase tracking-wider text-cas-amberDark mb-1">
                  Active Dispatch Manifest
                </div>
                <div className="text-xl font-extrabold text-cas-slate">
                  Order #CAS-ORD-8812 (33,000 Litres AGO)
                </div>
                <div className="text-xs text-slate-700 mt-1">
                  Escrow Verified by CAS Energy. Payment locked for delivery.
                </div>
              </div>

              {/* Waypoint Coordinates & Destination */}
              <div className="space-y-3 text-sm">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-cas-blue shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <span className="text-xs text-cas-muted font-bold block uppercase tracking-wider">
                        Delivery Destination (Buyer Facility)
                      </span>
                      <strong className="text-base text-cas-slate block mt-0.5">
                        Standard Industrial Plant - Ikeja Terminal
                      </strong>
                      <span className="text-xs font-mono text-cas-muted block mt-0.5">
                        GPS Coordinates: 6.595200 N, 3.342100 E
                      </span>
                      <span className="text-xs text-cas-amberDark font-semibold block mt-1">
                        Gate Clearance: Standard 33,000L trailer. Camlock 3-inch connection.
                      </span>
                    </div>
                  </div>

                  {/* One-Tap Navigation Button */}
                  <div className="mt-4 pt-3 border-t border-slate-200 flex flex-col sm:flex-row gap-3">
                    <a
                      href="https://maps.google.com/?q=6.5952,3.3421"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-3 px-4 bg-cas-blue hover:bg-sky-800 text-white font-bold text-sm rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <Navigation className="w-4 h-4" aria-hidden="true" />
                      <span>Open GPS Turn-by-Turn Route</span>
                    </a>

                    <a
                      href="tel:+2348034912289"
                      className="py-3 px-4 bg-white border-2 border-slate-300 hover:bg-slate-100 text-cas-slate font-bold text-sm rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <Phone className="w-4 h-4 text-cas-green" aria-hidden="true" />
                      <span>Call Gate Officer</span>
                    </a>
                  </div>
                </div>

                {/* Loading Depot Verification */}
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs flex justify-between items-center">
                  <div>
                    <span className="text-cas-muted block">Depot of Origin</span>
                    <strong className="text-cas-slate">Ijegun Egba Cluster (Gantry 14)</strong>
                  </div>
                  <div className="text-right">
                    <span className="text-cas-muted block">Security Seals</span>
                    <span className="font-mono font-bold text-cas-slate">SEAL-8821 / 8822</span>
                  </div>
                </div>
              </div>

              {/* Delivery Milestone Status Buttons */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-cas-slate block mb-3">
                  Update Trip Milestone
                </span>

                <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setTripStep(1)}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      tripStep === 1
                        ? 'bg-cas-slate text-white border-cas-slate'
                        : 'bg-white text-cas-slate border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <span>1. Loaded at Depot</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTripStep(2)}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      tripStep === 2
                        ? 'bg-cas-amber text-slate-900 border-cas-amber font-extrabold'
                        : 'bg-white text-cas-slate border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <span>2. In Transit (Route Locked)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTripStep(3)}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      tripStep === 3
                        ? 'bg-cas-blue text-white border-cas-blue'
                        : 'bg-white text-cas-slate border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <span>3. Arrived at Buyer Gate</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTripStep(4)}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      tripStep === 4
                        ? 'bg-cas-green text-white border-cas-green'
                        : 'bg-white text-cas-slate border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <span>4. Discharge Completed</span>
                  </button>
                </div>

                <p className="text-[11px] text-cas-muted mt-2">
                  Tapping milestones automatically pings the buyer and releases the geofence perimeter lock when you cross into the delivery address coordinates.
                </p>
              </div>

            </div>
          </div>
        ) : (
          /* View 2: Driver Registration Form */
          <div className="bg-white p-6 sm:p-10 rounded-2xl border-2 border-cas-border shadow-md">
            <div className="mb-6">
              <h3 className="text-xl font-extrabold text-cas-slate">Register As A Fleet Driver</h3>
              <p className="text-sm text-cas-muted mt-1">
                Register your details and calibrated tanker under a licensed downstream marketer to receive paid delivery dispatch orders.
              </p>
            </div>

            {driverRegistrationStatus && (
              <div className="p-4 mb-6 bg-emerald-50 border-2 border-emerald-400 rounded-xl text-emerald-900 text-sm font-bold flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-cas-green shrink-0" aria-hidden="true" />
                <span>Driver profile submitted. Assigned to Matrix Downstream pending badge verification.</span>
              </div>
            )}

            <form onSubmit={handleRegisterDriver} className="space-y-5">
              <div>
                <label htmlFor="driver-full-name" className="block text-xs font-bold uppercase tracking-wider text-cas-slate mb-1.5">
                  Full Legal Name
                </label>
                <input
                  id="driver-full-name"
                  type="text"
                  required
                  placeholder="e.g. Suleiman Tanko"
                  value={driverName}
                  onChange={(e) => setDriverName(e.target.value)}
                  className="w-full p-3 bg-white border border-slate-300 rounded-lg text-sm text-cas-slate focus:border-cas-amber"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="driver-phone" className="block text-xs font-bold uppercase tracking-wider text-cas-slate mb-1.5">
                    Phone Number (WhatsApp Enabled)
                  </label>
                  <input
                    id="driver-phone"
                    type="tel"
                    required
                    placeholder="+234 802 000 0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-3 bg-white border border-slate-300 rounded-lg text-sm text-cas-slate focus:border-cas-amber font-mono"
                  />
                </div>

                <div>
                  <label htmlFor="driver-license" className="block text-xs font-bold uppercase tracking-wider text-cas-slate mb-1.5">
                    FRSC Heavy Articulated License No.
                  </label>
                  <input
                    id="driver-license"
                    type="text"
                    required
                    placeholder="FRSC-LAG-98214"
                    value={licenseNumber}
                    onChange={(e) => setLicenseNumber(e.target.value)}
                    className="w-full p-3 bg-white border border-slate-300 rounded-lg text-sm text-cas-slate focus:border-cas-amber font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="truck-plate" className="block text-xs font-bold uppercase tracking-wider text-cas-slate mb-1.5">
                    Tanker Registration Plate
                  </label>
                  <input
                    id="truck-plate"
                    type="text"
                    required
                    placeholder="e.g. LSR-492-XA"
                    value={truckPlate}
                    onChange={(e) => setTruckPlate(e.target.value)}
                    className="w-full p-3 bg-white border border-slate-300 rounded-lg text-sm text-cas-slate focus:border-cas-amber font-mono"
                  />
                </div>

                <div>
                  <label htmlFor="truck-vol-select" className="block text-xs font-bold uppercase tracking-wider text-cas-slate mb-1.5">
                    Calibrated Tanker Volume
                  </label>
                  <select
                    id="truck-vol-select"
                    value={truckVolume}
                    onChange={(e) => setTruckVolume(e.target.value)}
                    className="w-full p-3 bg-white border border-slate-300 rounded-lg text-sm text-cas-slate focus:border-cas-amber"
                  >
                    <option value="11000">11,000 Litres</option>
                    <option value="22000">22,000 Litres</option>
                    <option value="33000">33,000 Litres</option>
                    <option value="45000">45,000 Litres</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="employer-marketer" className="block text-xs font-bold uppercase tracking-wider text-cas-slate mb-1.5">
                  Select Marketer / Depot Employer
                </label>
                <select
                  id="employer-marketer"
                  value={selectedMarketer}
                  onChange={(e) => setSelectedMarketer(e.target.value)}
                  className="w-full p-3 bg-white border border-slate-300 rounded-lg text-sm text-cas-slate focus:border-cas-amber"
                >
                  <option value="Matrix Downstream Distribution Ltd">Matrix Downstream Distribution Ltd</option>
                  <option value="Pinnacle Hydrocarbons FZE">Pinnacle Hydrocarbons FZE</option>
                  <option value="Rainoil Energy Logistics Hub">Rainoil Energy Logistics Hub</option>
                  <option value="NIPCO Bulk Gas & AGO Operations">NIPCO Bulk Gas & AGO Operations</option>
                </select>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-4 px-6 bg-cas-slate hover:bg-black text-white font-extrabold text-base rounded-lg transition-all shadow-md"
                >
                  Register Driver & Tanker Under Marketer
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </section>
  );
}
