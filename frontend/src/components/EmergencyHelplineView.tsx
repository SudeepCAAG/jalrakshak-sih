'use client';

import React, { useState, useEffect } from 'react';
import { 
  PhoneCall, 
  ShieldAlert, 
  AlertTriangle, 
  MapPin, 
  Copy, 
  Check, 
  Share2, 
  HeartHandshake, 
  Ambulance, 
  Flame, 
  LifeBuoy, 
  Building2, 
  WifiOff,
  Zap,
  Droplets,
  Ban
} from 'lucide-react';
import { SystemOverview } from '@/types';
import { Language } from '@/utils/translations';

interface EmergencyHelplineViewProps {
  overview?: SystemOverview | null;
  selectedCity: string;
  currentLang: Language;
}

export const EmergencyHelplineView: React.FC<EmergencyHelplineViewProps> = ({
  overview,
  selectedCity,
  currentLang
}) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [gpsLocation, setGpsLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [gpsError, setGpsError] = useState<string | null>(null);
  const [isCopiedLocation, setIsCopiedLocation] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    setIsOnline(navigator.onLine);
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    try {
      localStorage.setItem('jalrakshak_emergency_cached', 'true');
    } catch (e) {}

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setGpsError(currentLang === 'bn' 
        ? 'আপনার ব্রাউজারে Geolocation সমর্থিত নয়।' 
        : currentLang === 'hi'
        ? 'आपके ब्राउज़र में जियोलोकेशन समर्थित नहीं है।'
        : 'Geolocation is not supported by your browser.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGpsLocation({
          lat: Number(pos.coords.latitude.toFixed(5)),
          lon: Number(pos.coords.longitude.toFixed(5))
        });
        setGpsError(null);
      },
      () => {
        setGpsError(currentLang === 'bn'
          ? 'লোকেশন পারমিশন মেলেনি। দয়া করে GPS অনুমতি দিন।'
          : currentLang === 'hi'
          ? 'स्थान अनुमति अस्वीकृत। कृपया GPS की अनुमति दें।'
          : 'Location access permission denied. Please allow GPS.');
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const helplineCards = [
    {
      title: currentLang === 'bn' ? 'জাতীয় জরুরি সেবা' : currentLang === 'hi' ? 'राष्ट्रीय आपातकालीन सेवा' : 'National Emergency',
      number: '112',
      desc: currentLang === 'bn' ? 'সমগ্র ভারতে এক ক্লিকে সর্বজনীন জরুরি সহায়তা ডেস্ক' : currentLang === 'hi' ? 'पूरे भारत में एकल आपातकालीन प्रतिक्रिया सहायता प्रणाली' : 'All-in-one Single Emergency Response System across India',
      badge: currentLang === 'bn' ? 'তাত্ক্ষণিক' : currentLang === 'hi' ? 'त्वरित' : 'Immediate',
      badgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
      icon: ShieldAlert,
      iconColor: 'text-rose-600',
      btnColor: 'bg-rose-600 hover:bg-rose-700'
    },
    {
      title: currentLang === 'bn' ? 'NDRF হেল্পলাইন' : currentLang === 'hi' ? 'NDRF हेल्पलाइन' : 'NDRF Helpline',
      number: '+91-9711077372',
      desc: currentLang === 'bn' ? 'জাতীয় দুর্যোগ প্রতিক্রিয়া বাহিনী (বন্যা রেসকিউ টিম)' : currentLang === 'hi' ? 'राष्ट्रीय आपदा प्रतिक्रिया बल (बाढ़ बचाव मुख्यालय)' : 'National Disaster Response Force direct headquarters dispatch',
      badge: currentLang === 'bn' ? 'বন্যা রেসকিউ' : currentLang === 'hi' ? 'बाढ़ बचाव' : 'Flood Rescue',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
      icon: LifeBuoy,
      iconColor: 'text-amber-600',
      btnColor: 'bg-amber-600 hover:bg-amber-700'
    },
    {
      title: currentLang === 'bn' ? 'দুর্যোগ ব্যবস্থাপনা (SDMA)' : currentLang === 'hi' ? 'आपदा प्रबंधन (SDMA)' : 'Disaster Management',
      number: '1070',
      desc: currentLang === 'bn' ? 'রাজ্য দুর্যোগ ব্যবস্থাপনা ২৪x৭ জরুরি কন্ট্রোল রুম' : currentLang === 'hi' ? 'राज्य आपदा प्रबंधन प्राधिकरण 24x7 नियंत्रण कक्ष' : 'State Disaster Management Authority (SDMA) round-the-clock desk',
      badge: 'Govt SDMA',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
      icon: Building2,
      iconColor: 'text-blue-600',
      btnColor: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      title: currentLang === 'bn' ? 'অ্যাম্বুলেন্স ও চিকিৎসা' : currentLang === 'hi' ? 'एम्बुलेंस एवं चिकित्सा' : 'Ambulance & Medical',
      number: '108',
      desc: currentLang === 'bn' ? 'জরুরি চিকিৎসা সেবা ও প্যারামেডিক্যাল রেসপন্স' : currentLang === 'hi' ? 'आपातकालीन चिकित्सा सेवा और प्राथमिक उपचार प्रतिक्रिया' : 'Emergency Medical Service, flood victim paramedical response',
      badge: currentLang === 'bn' ? 'চিকিৎসা' : currentLang === 'hi' ? 'चिकित्सा' : 'Medical',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      icon: Ambulance,
      iconColor: 'text-emerald-600',
      btnColor: 'bg-emerald-600 hover:bg-emerald-700'
    },
    {
      title: currentLang === 'bn' ? 'দমকল ও উদ্ধারকারী দল' : currentLang === 'hi' ? 'दमकल एवं बचाव' : 'Fire & Rescue',
      number: '101',
      desc: currentLang === 'bn' ? 'জল নিষ্কাশন, গাছ কাটা ও ভারী উদ্ধার কাজ' : currentLang === 'hi' ? 'जल निकासी, गिरे पेड़ों को हटाना और बचाव कार्य' : 'Water pumping, collapsed structure and tree clearing rescue team',
      badge: currentLang === 'bn' ? 'রেসকিউ' : currentLang === 'hi' ? 'बचाव' : 'Rescue',
      badgeColor: 'bg-orange-100 text-orange-800 border-orange-200',
      icon: Flame,
      iconColor: 'text-orange-600',
      btnColor: 'bg-orange-600 hover:bg-orange-700'
    },
    {
      title: currentLang === 'bn' ? 'পুলিশ জরুরি কন্ট্রোল' : currentLang === 'hi' ? 'पुलिस आपातकालीन' : 'Police Emergency',
      number: '100',
      desc: currentLang === 'bn' ? 'ট্রাফিক ডাইভারশন ও রাস্তা ব্যারিকেড ব্যবস্থাপনা' : currentLang === 'hi' ? 'यातायात डायवर्जन और सड़क सुरक्षा नियंत्रण' : 'Local law enforcement, traffic division and road barricade control',
      badge: 'Traffic/Law',
      badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      icon: ShieldAlert,
      iconColor: 'text-indigo-600',
      btnColor: 'bg-indigo-600 hover:bg-indigo-700'
    },
    {
      title: currentLang === 'bn' ? 'বন্যা নিয়ন্ত্রণ কন্ট্রোল রুম' : currentLang === 'hi' ? 'बाढ़ नियंत्रण कक्ष' : 'Flood / NDRF Control Room',
      number: '011-24363260',
      desc: currentLang === 'bn' ? 'স্বরাষ্ট্র মন্ত্রক কেন্দ্রীয় বন্যা পর্যবেক্ষণ সেল' : currentLang === 'hi' ? 'गृह मंत्रालय केंद्रीय बाढ़ निगरानी नियंत्रण कक्ष' : 'Central Ministry of Home Affairs Flood Monitoring Control Desk',
      badge: 'Central NDRF',
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
      icon: LifeBuoy,
      iconColor: 'text-purple-600',
      btnColor: 'bg-purple-600 hover:bg-purple-700'
    },
    {
      title: currentLang === 'bn' ? 'হাইওয়ে দুর্ঘটনা ও উদ্ধার' : currentLang === 'hi' ? 'राजमार्ग आपातकालीन' : 'Road Accident & Highway',
      number: '1073',
      desc: currentLang === 'bn' ? 'জাতীয় সড়কে পেট্রোলিং ও জলমগ্ন গাড়ি টোয়িং সেবা' : currentLang === 'hi' ? 'राष्ट्रीय राजमार्ग गश्ती और जलभराव वाले वाहनों को निकालना' : 'National Highway emergency patrol and towing in waterlogged corridors',
      badge: 'Highways',
      badgeColor: 'bg-teal-100 text-teal-800 border-teal-200',
      icon: AlertTriangle,
      iconColor: 'text-teal-600',
      btnColor: 'bg-teal-600 hover:bg-teal-700'
    }
  ];

  const copyToClipboard = (num: string, idx: number) => {
    navigator.clipboard.writeText(num);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const copyGpsCoords = () => {
    if (!gpsLocation) return;
    const text = `[JalRakshak SOS] I need emergency help! My live GPS Location: https://maps.google.com/?q=${gpsLocation.lat},${gpsLocation.lon} (Lat: ${gpsLocation.lat}, Lon: ${gpsLocation.lon})`;
    navigator.clipboard.writeText(text);
    setIsCopiedLocation(true);
    setTimeout(() => setIsCopiedLocation(false), 2500);
  };

  const shareWhatsApp = () => {
    const coordsStr = gpsLocation 
      ? `https://maps.google.com/?q=${gpsLocation.lat},${gpsLocation.lon}` 
      : 'Location not retrieved yet';
    const text = `*JalRakshak EMERGENCY SOS*\nI am stranded in waterlogged area in ${selectedCity.toUpperCase()}.\nMy Location: ${coordsStr}\nPlease dispatch NDRF / Emergency 112 assistance immediately.`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Offline Status Banner */}
      {!isOnline && (
        <div className="bg-amber-500 text-amber-950 px-4 py-3 rounded-2xl flex items-center justify-between font-bold text-xs shadow-md border border-amber-600 animate-pulse">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-950" />
            <span>
              {currentLang === 'bn'
                ? 'আপনি এখন অফলাইনে আছেন (No Internet)। সমস্ত হেল্পলাইন নম্বর এবং সেফটি ডেটা অফলাইনে ব্রাউজারে সেভ রয়েছে।'
                : currentLang === 'hi'
                ? 'आप वर्तमान में ऑफ़लाइन हैं (No Internet)। सभी हेल्पलाइन और सुरक्षा नियम ऑफ़लाइन उपलब्ध हैं।'
                : 'You are currently offline (No Internet). All emergency helplines and safety protocols are cached locally.'}
            </span>
          </div>
          <span className="bg-amber-900 text-amber-100 px-2 py-0.5 rounded-full text-[10px]">
            Offline Cached
          </span>
        </div>
      )}

      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-amber-700 to-stone-800 text-white rounded-3xl p-6 sm:p-8 shadow-lg border border-amber-500">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-200 text-xs font-semibold backdrop-blur-xs border border-amber-300/30">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-300" />
              <span>National Disaster Response Protocol</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              {currentLang === 'bn' 
                ? 'জরুরি বন্যা হেল্পলাইন ও রেসকিউ' 
                : currentLang === 'hi' 
                ? 'आपातकालीन बाढ़ हेल्पलाइन एवं बचाव' 
                : 'Emergency & Flood Helplines'}
            </h2>
            <p className="text-amber-100 text-xs sm:text-sm max-w-2xl leading-relaxed">
              {currentLang === 'bn'
                ? 'বন্যা বা অতিবৃষ্টির সময় এক ক্লিকে সরাসরি জরুরি নম্বরে কল করুন অথবা আপনার লাইভ জিপিএস লোকেশন রেসকিউ টিমকে পাঠান।'
                : currentLang === 'hi'
                ? 'बाढ़ या भारी बारिश के दौरान एक क्लिक में सीधे आपातकालीन नंबरों पर कॉल करें या बचाव दल को अपनी लाइव लोकेशन भेजें।'
                : 'One-tap direct emergency dispatch and live GPS SOS sharing for immediate flood response and rescue.'}
            </p>
          </div>

          {/* SOS Quick Location Signal Card */}
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-xs space-y-3 shrink-0 max-w-sm w-full">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-amber-300 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>
                  {currentLang === 'bn' ? 'আপনার লাইভ GPS লোকেশন' : currentLang === 'hi' ? 'आपकी लाइव GPS लोकेशन' : 'Your Live GPS Coordinates'}
                </span>
              </span>
              <button 
                onClick={handleGetLocation}
                className="text-[10px] bg-amber-400 text-stone-900 font-bold px-2 py-0.5 rounded-full hover:bg-amber-300 transition"
              >
                {gpsLocation ? 'Update GPS' : 'Fetch GPS'}
              </button>
            </div>

            {gpsLocation ? (
              <div className="bg-black/30 p-2 rounded-xl text-[11px] font-mono text-emerald-300 flex items-center justify-between">
                <span>Lat: {gpsLocation.lat}, Lon: {gpsLocation.lon}</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              </div>
            ) : (
              <p className="text-[11px] text-amber-200">
                {gpsError || (currentLang === 'bn' ? 'GPS লোকেশন দেখতে উপরের Fetch বাটনে ক্লিক করুন।' : currentLang === 'hi' ? 'GPS लोकेशन प्राप्त करने के लिए ऊपर Fetch बटन दबाएं।' : 'Click Fetch GPS above to locate your exact spot.')}
              </p>
            )}

            <div className="flex items-center gap-2 pt-1">
              <button 
                onClick={copyGpsCoords}
                disabled={!gpsLocation}
                className="flex-1 bg-white/20 hover:bg-white/30 disabled:opacity-50 text-white font-bold py-1.5 px-2 rounded-xl text-[11px] transition flex items-center justify-center gap-1"
              >
                {isCopiedLocation ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{isCopiedLocation ? 'Copied!' : 'Copy SOS Link'}</span>
              </button>
              <button 
                onClick={shareWhatsApp}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-1.5 px-3 rounded-xl text-[11px] transition flex items-center gap-1 shadow-xs"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share SOS</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Helpline Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {helplineCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div 
              key={idx}
              className="bg-white rounded-3xl p-5 border border-stone-200 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-4 group hover:border-amber-400"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className={`w-10 h-10 rounded-2xl bg-stone-50 border border-stone-200/80 flex items-center justify-center ${card.iconColor}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${card.badgeColor}`}>
                    {card.badge}
                  </span>
                </div>

                <div>
                  <h3 className="font-black text-stone-900 text-base">{card.title}</h3>
                  <p className="text-xs text-stone-500 mt-0.5 leading-snug">{card.desc}</p>
                </div>

                <div className="bg-stone-50 p-3 rounded-2xl border border-stone-200/70 flex items-center justify-between">
                  <span className="font-mono font-bold text-stone-800 text-sm">{card.number}</span>
                  <button 
                    onClick={() => copyToClipboard(card.number, idx)}
                    className="text-stone-400 hover:text-stone-700 p-1 transition"
                    title="Copy number"
                  >
                    {copiedIndex === idx ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <a 
                href={`tel:${card.number}`}
                className={`w-full ${card.btnColor} text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-xs transition group-hover:scale-[1.02]`}
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>
                  {currentLang === 'bn' ? 'সরাসরি কল করুন' : currentLang === 'hi' ? 'हेल्पलाइन पर कॉल करें' : 'Call Helpline Now'}
                </span>
              </a>
            </div>
          );
        })}
      </div>

      {/* Flood Safety Protocols & Handbook */}
      <div className="bg-amber-50/60 rounded-3xl p-6 sm:p-8 border border-amber-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
          <HeartHandshake className="w-5 h-5 text-amber-600" />
          <span>
            {currentLang === 'bn' 
              ? 'বন্যা ও অতিবৃষ্টির জরুরি নিয়মাবলী (Safety Protocols)' 
              : currentLang === 'hi'
              ? 'बाढ़ एवं भारी बारिश के आपातकालीन सुरक्षा नियम (Safety Protocols)'
              : 'Emergency Urban Flood Safety Protocols'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-stone-700">
          <div className="bg-white p-4 rounded-2xl border border-amber-200/80 shadow-xs space-y-1.5">
            <div className="font-bold text-rose-600 flex items-center gap-1.5">
              <Ban className="w-4 h-4 text-rose-600 shrink-0" />
              <span>
                {currentLang === 'bn' ? '১. গাড়ি চালানো পরিহার করুন' : currentLang === 'hi' ? '1. जलमग्न सड़कों पर वाहन न चलाएं' : '1. Never Drive Into Water'}
              </span>
            </div>
            <p className="text-stone-600 leading-relaxed">
              {currentLang === 'bn'
                ? 'মাত্র দেড় ফুট (১৮ ইঞ্চি) জল যেকোনো সেডান বা এসইউভি গাড়িকে ভাসিয়ে নিয়ে যেতে পারে। ডুবে থাকা রেলওয়ে আন্ডারপাসে কখনো ঢুকবেন না।'
                : currentLang === 'hi'
                ? 'सिर्फ 18 इंच गहरा पानी किसी भी कार या एसयूवी को बहा सकता है। कभी भी जलमग्न अंडरपास में वाहन न ले जाएं।'
                : 'Just 18 inches of moving floodwater can float and sweep away most cars and SUVs. Never attempt to cross flooded railway underpasses.'}
            </p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-amber-200/80 shadow-xs space-y-1.5">
            <div className="font-bold text-amber-600 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                {currentLang === 'bn' ? '২. বিদ্যুতের খুঁটি ও তার থেকে দূরে থাকুন' : currentLang === 'hi' ? '2. बिजली के खंभों और तारों से दूर रहें' : '2. Stay Clear of Power Lines'}
              </span>
            </div>
            <p className="text-stone-600 leading-relaxed">
              {currentLang === 'bn'
                ? 'জলে ছেঁড়া বৈদ্যুতিক তার পড়ে থাকতে পারে। কোনো ল্যাম্পপোস্ট, ট্রান্সফরমার বা ড্রেনের খোলা ঢাকনায় হাত বা পা দেবেন না।'
                : currentLang === 'hi'
                ? 'पानी में टूटे हुए बिजली के तार हो सकते हैं। खंभों, ट्रांसफार्मर या खुले मैनहोल के पास बिल्कुल न जाएं।'
                : 'Electrocution is a primary hazard during flash floods. Keep away from lampposts, submerged transformers, and open stormwater manholes.'}
            </p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-amber-200/80 shadow-xs space-y-1.5">
            <div className="font-bold text-emerald-600 flex items-center gap-1.5">
              <Droplets className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                {currentLang === 'bn' ? '৩. জল বিশুদ্ধ করে পান করুন' : currentLang === 'hi' ? '3. केवल उबला या सुरक्षित पानी पिएं' : '3. Safe Drinking Water'}
              </span>
            </div>
            <p className="text-stone-600 leading-relaxed">
              {currentLang === 'bn'
                ? 'বন্যার সময় পানীয় জল দ্রুত দূষিত হয়। সবসময় জল ফুটিয়ে পান করুন এবং সাথে শুকনো খাবার ও ওআরএস (ORS) মজুত রাখুন।'
                : currentLang === 'hi'
                ? 'बाढ़ के दौरान पेयजल स्रोत दूषित हो जाते हैं। पानी उबालकर पिएं और ओआरएस (ORS) तथा सूखा भोजन साथ रखें।'
                : 'Municipal pipelines can get cross-contaminated during surcharge. Always boil water before consumption and keep ORS hydration packs handy.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
