'use client';

import React, { useState } from 'react';
import { 
  BellRing, 
  Phone, 
  Mail, 
  MapPin, 
  CheckCircle2, 
  X, 
  Send, 
  ShieldCheck, 
  AlertTriangle,
  MessageSquare
} from 'lucide-react';
import { Zone } from '@/types';

interface CitizenAlertSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  zones: Zone[];
  cityName: string;
}

export const CitizenAlertSubscriptionModal: React.FC<CitizenAlertSubscriptionModalProps> = ({
  isOpen,
  onClose,
  zones,
  cityName
}) => {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedZone, setSelectedZone] = useState(zones[0]?.zone_name || 'All City Zones');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showSampleNotification, setShowSampleNotification] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone && !email) return;
    setIsSubscribed(true);
  };

  const handleTestNotification = () => {
    setShowSampleNotification(true);
    setTimeout(() => {
      setShowSampleNotification(false);
    }, 6000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-md animate-in fade-in duration-150">
      {/* Sample Simulated Push Notification Banner */}
      {showSampleNotification && (
        <div className="fixed top-6 right-6 z-60 max-w-sm w-full bg-white rounded-2xl border-2 border-rose-300 shadow-2xl p-4 animate-in slide-in-from-top duration-200">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-rose-50 text-rose-600 shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-rose-800 uppercase">JalDrishti Flash Flood Alert</span>
                <span className="text-[10px] text-stone-400">Now</span>
              </div>
              <p className="text-xs font-bold text-stone-900 mt-1">
                URGENT: {selectedZone} Waterlogging Expected!
              </p>
              <p className="text-[11px] text-stone-600 mt-0.5">
                Doppler Radar detects 58 mm/hr storm cell. Underpass water level projected to exceed 45cm in next 25 mins. Please take elevated bypass!
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="relative w-full max-w-md bg-white rounded-3xl border border-stone-200 shadow-2xl p-6 sm:p-8 space-y-5">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center shadow-md shadow-orange-500/20">
            <BellRing className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-orange-600">
              Instant Disaster Early Warning
            </div>
            <h3 className="text-lg font-black text-stone-900 leading-tight">
              Get Real-Time Flood Alerts
            </h3>
          </div>
        </div>

        <p className="text-xs text-stone-500 leading-relaxed">
          Receive proactive WhatsApp, SMS, and Email notifications 30–45 minutes before water accumulates on your daily commute route.
        </p>

        {isSubscribed ? (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-3 text-center">
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-black text-emerald-900">Successfully Subscribed!</div>
              <p className="text-xs text-emerald-700 mt-0.5">
                You will receive alerts for <strong>{selectedZone}</strong> on {phone || email}.
              </p>
            </div>
            <button
              onClick={handleTestNotification}
              className="px-4 py-2 rounded-xl bg-emerald-700 text-white text-xs font-bold hover:bg-emerald-800 transition"
            >
              Test Sample Notification
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
            <div>
              <label className="block font-bold text-stone-700 mb-1">
                Select Your Monitored Locality / Ward ({cityName})
              </label>
              <select
                value={selectedZone}
                onChange={(e) => setSelectedZone(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-stone-50 text-stone-800 font-semibold focus:outline-hidden focus:border-blue-600"
              >
                <option value="All City Hotspots">All City Hotspots &amp; Underpasses</option>
                {zones.map((z) => (
                  <option key={z.zone_id} value={z.zone_name}>
                    {z.zone_name} (~{z.elevation_m}m ASL)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-stone-700 mb-1">
                Mobile Number (for SMS &amp; WhatsApp Alert)
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-hidden focus:border-blue-600 text-stone-900 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-stone-700 mb-1">
                Email Address (Optional)
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="commuter@example.com"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-hidden focus:border-blue-600 text-stone-900 font-medium"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={!phone && !email}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-600 hover:to-indigo-600 text-white font-bold text-xs shadow-md shadow-blue-700/20 transition active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Activate Early Warning Alerts</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
