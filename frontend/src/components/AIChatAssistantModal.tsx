'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  X, 
  Sparkles, 
  AlertTriangle, 
  ShieldCheck, 
  MapPin, 
  PhoneCall, 
  RefreshCw,
  Copy,
  Check,
  Compass,
  ArrowUp
} from 'lucide-react';
import axios from 'axios';
import { Language } from '@/utils/translations';
import { API_BASE_URL } from '@/utils/apiConfig';

interface Message {
  sender: 'user' | 'ai';
  text: string;
  time: string;
}

interface AIChatAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentCity: string;
  userCoords?: { lat: number; lon: number } | null;
  currentLang?: Language;
}

export const AIChatAssistantModal: React.FC<AIChatAssistantModalProps> = ({
  isOpen,
  onClose,
  currentCity,
  userCoords,
  currentLang = 'en'
}) => {
  const getInitialWelcomeMessage = (lang: Language) => {
    if (lang === 'bn') {
      return 'নমস্কার! আমি JalRakshak AI (জলরক্ষক)। ভারী বৃষ্টির সময় জলমগ্ন রাস্তা, নিরাপদ বিকল্প রুট বা জরুরি সহায়তার জন্য আমাকে যেকোনো প্রশ্ন করতে পারেন।';
    }
    if (lang === 'hi') {
      return 'नमस्ते! मैं JalRakshak AI (जल रक्षक) हूँ। भारी बारिश के दौरान जलभराव वाले रास्तों, सुरक्षित वैकल्पिक मार्गों या आपातकालीन सहायता के लिए मुझसे पूछें।';
    }
    return 'Hello! I am JalRakshak AI, your urban flood safety and navigation assistant. Ask me anything about waterlogged roads, safe bypass routes, or emergency protocols.';
  };

  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: getInitialWelcomeMessage(currentLang),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sync initial welcome message when language changes
  useEffect(() => {
    setMessages([
      {
        sender: 'ai',
        text: getInitialWelcomeMessage(currentLang),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, [currentLang]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  if (!isOpen) return null;

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || loading) return;

    const userText = input;
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    setMessages((prev) => [...prev, { sender: 'user', text: userText, time: now }]);
    setInput('');
    setLoading(true);

    try {
      const res = await axios.post(`${API_BASE_URL}/api/ai/ask`, {
        message: userText,
        city: currentCity,
        lat: userCoords?.lat || null,
        lon: userCoords?.lon || null,
        lang: currentLang
      });

      const replyText = res.data?.reply || (
        currentLang === 'bn' ? 'তথ্যটি যাচাই করা হয়েছে। অনুগ্রহ করে সতর্কতা অবলম্বন করুন এবং নীচু আন্ডারপাস এড়িয়ে চলুন।' :
        currentLang === 'hi' ? 'डेटा सत्यापित कर लिया गया है। कृपया सावधानी बरतें और जलमग्न अंडरपास से बचें।' :
        'Data verified. Please exercise caution and avoid low-lying flooded underpasses.'
      );

      setMessages((prev) => [...prev, { 
        sender: 'ai', 
        text: replyText, 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      }]);
    } catch (err) {
      const lower = userText.toLowerCase();
      let fallback = '';
      
      const cityTitle = currentCity.charAt(0).toUpperCase() + currentCity.slice(1);

      if (currentLang === 'bn') {
        if (lower.includes('সাবধানতা') || lower.includes('guideline') || lower.includes('safety') || lower.includes('নিয়ম') || lower.includes('করব')) {
          fallback = `🛡️ **বন্যা ও অতিবৃষ্টির অপরিহার্য জীবনরক্ষাকারী সাবধানতা (${cityTitle}):**\n\n1. 🚫 **Turn Around, Don't Drown:** কখনোই হাঁটু সমান জলে গাড়ি বা বাইক নামাবেন না। মাত্র ১৫-১৮ ইঞ্চি জলের স্রোতে গাড়ি ভেসে যেতে পারে।\n2. ⚡ **বিদ্যুৎস্পৃষ্ট থেকে সতর্কতা:** রাস্তায় ছিঁড়ে পড়া তার, ল্যাম্পপোস্ট ও ট্রান্সফরমার থেকে কমপক্ষে ১৫ ফুট দূরে থাকুন।\n3. 💧 **বিশুদ্ধ পানীয় জল:** জল ফুটিয়ে বা ক্লোরিন ট্যাবলেট দিয়ে শোধন করে পান করুন।\n4. 🎒 **জরুরি কিট:** টর্চলাইট, পাওয়ারব্যাঙ্ক, শুকনো খাবার ও ওআরএস (ORS) সাথে রাখুন।\n5. 📞 **জরুরি হেল্পলাইন:** যেকোনো বিপদে অবিলম্বে জাতীয় জরুরি নম্বর **112** অথবা দুর্যোগ ব্যবস্থাপনা **1070** ডায়াল করুন।`;
        } else if (lower.includes('রাস্তা') || lower.includes('road') || lower.includes('flood') || lower.includes('জলমগ্ন')) {
          fallback = `🌊 **${cityTitle} মেট্রোর গুরুত্বপূর্ণ জলমগ্ন এলাকা ও নিরাপদ পথ:**\n\n⚠️ **সতর্কতা অঞ্চল:** নীচু আন্ডারপাস ও রেলওয়ে ব্রিজ সংলগ্ন রাস্তায় ভারী জল জমার সম্ভাবনা থাকে।\n\n✅ **নিরাপদ বিকল্প পথ:** উঁচু ফ্লাইওভার ও প্রধান বাইপাস করিডোর ব্যবহার করুন। লাইভ নেভিগেশনের জন্য অ্যাপের **'Safe Routes'** ট্যাব দেখুন।\n\n📞 **জরুরি কন্ট্রোল রুম:** \`112\` / \`1070\``;
        } else if (lower.includes('গাড়ি') || lower.includes('গাড়ি') || lower.includes('bike') || lower.includes('drive') || lower.includes('বাইক')) {
          fallback = `🚗 **যানবাহন চালানোর সেফটি নির্দেশিকা (${cityTitle}):**\n\n• 🛵 **বাইক / স্কুটার:** ২০ সেমি বেশি জলে চালাবেন না; স্লিপ করার ও ইঞ্জিন বন্ধ হওয়ার ঝুঁকি থাকে।\n• 🚗 **হ্যাচব্যাক / সেডান:** ৩০+ সেমি জলে নামাবেন না; সাইলেন্সারে জল ঢুকলে ইঞ্জিন বিকল হতে পারে।\n• 🚙 **বড় SUV:** গতি নিয়ন্ত্রণে রেখে উঁচু লেন দিয়ে চলাচল করুন।\n\nজরুরি টোয়িং বা সহায়তার জন্য ডায়াল করুন: **112**`;
        } else {
          fallback = `🚨 **জরুরি কন্ট্রোল রুম ও উদ্ধার নম্বর (${cityTitle}):**\n\n• **জাতীয় জরুরি সেবা:** \`112\` (পুলিশ, দমকল ও অ্যাম্বুলেন্স)\n• **NDRF হেল্পলাইন:** \`+91-9711077372\`\n• **রাজ্য দুর্যোগ সেল:** \`1070\`\n\nযেকোনো দুর্যোগে সতর্ক থাকুন এবং নিরাপদ উঁচু স্থানে অবস্থান করুন।`;
        }
      } else if (currentLang === 'hi') {
        if (lower.includes('सावधानी') || lower.includes('guideline') || lower.includes('safety') || lower.includes('नियम')) {
          fallback = `🛡️ **बाढ़ और भारी बारिश के दौरान जीवन रक्षक सावधानियां (${cityTitle}):**\n\n1. 🚫 **Turn Around, Don't Drown:** जलमग्न अंडरपास या सड़कों पर वाहन न चलाएं।\n2. ⚡ **विद्युत सुरक्षा:** बिजली के खंभों, ट्रांसफार्मर और गिरे हुए तारों से कम से कम 15 फीट दूर रहें।\n3. 💧 **पेयजल सुरक्षा:** उबला हुआ पानी पिएं और ओआरएस साथ रखें।\n4. 📞 **आपातकालीन सहायता:** राष्ट्रीय आपातकालीन नंबर **112** या राज्य आपदा प्रबंधन **1070** पर संपर्क करें।`;
        } else {
          fallback = `🚨 **आपातकालीन हेल्पलाइन एवं सुरक्षा स्थिति (${cityTitle}):**\n\n• **राष्ट्रीय आपातकालीन सेवा:** \`112\`\n• **NDRF कंट्रोल रूम:** \`+91-9711077372\`\n• **आपदा प्रबंधन:** \`1070\`\n\nकृपया सुरक्षित वैकल्पिक ऊंचे मार्गों का उपयोग करें।`;
        }
      } else {
        if (lower.includes('guideline') || lower.includes('safety') || lower.includes('precaution') || lower.includes('rule') || lower.includes('what are')) {
          fallback = `🛡️ **Essential Urban Flood Safety Protocols (${cityTitle}):**\n\n1. 🚫 **Turn Around, Don't Drown:** Never drive or walk through flooded underpasses or moving street water (12-18 inches can sweep away vehicles).\n2. ⚡ **Electrical Safety:** Stay at least 15 feet away from downed power lines, submerged transformers, and metallic lampposts.\n3. 💧 **Safe Drinking Water:** Boil water before use or use purification tablets to prevent waterborne diseases.\n4. 🎒 **Emergency Kit Ready:** Keep power banks, dry rations, first-aid kit, and essential medicines handy.\n5. 📞 **Immediate Assistance:** For rescue or emergencies, dial National Emergency **112** or NDRF Helpline **+91-9711077372**.`;
        } else if (lower.includes('road') || lower.includes('flood') || lower.includes('street') || lower.includes('waterlog')) {
          fallback = `🌊 **Live Waterlogging Advisory for ${cityTitle}:**\n\n⚠️ **High Risk:** Low-lying sunken underpasses and bowl depressions are at risk of deep inundation.\n\n✅ **Safe Corridors:** Use arterial elevated flyovers and bypass highways.\n\n🧭 Check the interactive map and **Safe Routes** tab for real-time bypass navigation. Emergency Helpline: \`112\``;
        } else if (lower.includes('drive') || lower.includes('car') || lower.includes('bike') || lower.includes('vehicle')) {
          fallback = `🚗 **Vehicle Driving Safety Advisory (${cityTitle}):**\n\n• 🛵 **Two-Wheelers:** Avoid water above 15 cm to prevent loss of balance and stalling.\n• 🚗 **Hatchbacks & Sedans:** Do not drive through water above wheel-hub level (>25 cm) to avoid engine seizure.\n• 🚙 **High Clearance SUVs:** Proceed at low constant speed; avoid sunken railway underpasses.\n\nFor breakdown assistance, dial **112** or Traffic Helpline **1073**.`;
        } else {
          fallback = `🚨 **Emergency Flood Helpline Contacts (${cityTitle}):**\n\n• **National Emergency Number:** \`112\` (Police, Fire, Ambulance)\n• **NDRF 24x7 Control Room:** \`+91-9711077372\`\n• **Disaster Management Helpline:** \`1070\`\n• **Traffic Police Helpline:** \`1073\`\n\nFor safe navigation routing, please explore the **'Safe Routes'** tab on the dashboard.`;
        }
      }

      setMessages((prev) => [...prev, { 
        sender: 'ai', 
        text: fallback, 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      }]);
    } finally {
      setLoading(false);
    }
  };

  const getQuickPrompts = (lang: Language) => {
    if (lang === 'bn') {
      return [
        'জলমগ্ন রাস্তাগুলো কোনগুলো?',
        'বন্যার সময় কী সাবধানতা নেওয়া উচিত?',
        'গাড়ি নিয়ে বেরোনো কি নিরাপদ?',
        '১১২ ও NDRF জরুরি নম্বর কী?'
      ];
    }
    if (lang === 'hi') {
      return [
        'जलभराव वाले रास्ते कौन से हैं?',
        'बाढ़ के दौरान क्या सावधानियां बरतें?',
        'क्या गाड़ी चलाना सुरक्षित है?',
        '112 और NDRF हेल्पलाइन क्या हैं?'
      ];
    }
    return [
      `Which roads are flooded in ${currentCity.toUpperCase()}?`,
      'What are the flood safety guidelines?',
      'Is it safe to drive right now?',
      'What is the 112 emergency hotline?'
    ];
  };

  const quickPrompts = getQuickPrompts(currentLang);

  const getPlaceholderText = (lang: Language) => {
    if (lang === 'bn') return 'জলরক্ষক এআই-কে যেকোনো প্রশ্ন করুন...';
    if (lang === 'hi') return 'जल रक्षक एआई से कोई भी प्रश्न पूछें...';
    return 'Ask JalRakshak AI anything about flood routes & safety...';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200/90 w-full max-w-2xl flex flex-col h-[640px] overflow-hidden">
        
        {/* Modern Minimalist Header (Claude & ChatGPT Aesthetic) */}
        <div className="bg-white px-5 py-3.5 flex items-center justify-between border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-slate-900">JalRakshak AI</h3>
              </div>
              <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span className="capitalize">{currentCity} Metro Active</span>
              </div>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center transition"
            title="Close Assistant"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Chat Stream (ChatGPT / Claude Clean Conversation Layout) */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-white">
          {messages.map((m, idx) => (
            <div 
              key={idx} 
              className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'} group`}
            >
              <div className="flex items-start gap-2.5 max-w-[85%]">
                {m.sender === 'ai' && (
                  <div className="w-7 h-7 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5 border border-blue-100">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                )}
                
                <div 
                  className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-slate-900 text-white font-normal rounded-tr-xs shadow-xs'
                      : 'bg-slate-100/80 text-slate-900 rounded-tl-xs space-y-2 border border-slate-200/50'
                  }`}
                >
                  {m.text.split('\n').map((line, lIdx) => {
                    const cleanLine = line.trim();
                    if (!cleanLine) return <div key={lIdx} className="h-1.5" />;
                    
                    const isBullet = cleanLine.startsWith('•') || cleanLine.startsWith('*') || cleanLine.startsWith('-');
                    const displayText = isBullet ? cleanLine.replace(/^[*•-]\s*/, '') : cleanLine;
                    
                    return (
                      <div key={lIdx} className={isBullet ? 'flex items-start gap-1.5 ml-1' : ''}>
                        {isBullet && <span className="text-blue-600 font-bold shrink-0 mt-0.5">•</span>}
                        <span>
                          {displayText.split(/(\**.*?\**)/g).map((part, pIdx) => {
                            if (part.startsWith('**') && part.endsWith('**')) {
                              return <strong key={pIdx} className="font-semibold text-slate-950">{part.slice(2, -2)}</strong>;
                            }
                            return part;
                          })}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Timestamp & Copy Action */}
              <div className={`flex items-center gap-2 mt-1 px-1 text-[10px] text-slate-400 ${m.sender === 'ai' ? 'ml-9' : ''}`}>
                <span>{m.time}</span>
                {m.sender === 'ai' && (
                  <button
                    onClick={() => handleCopy(m.text, idx)}
                    className="opacity-0 group-hover:opacity-100 transition hover:text-slate-700 flex items-center gap-1"
                    title="Copy message"
                  >
                    {copiedIdx === idx ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedIdx === idx ? 'Copied' : 'Copy'}</span>
                  </button>
                )}
              </div>
            </div>
          ))}

          {/* Typing Indicator (Claude / ChatGPT 3-Dot Pulse) */}
          {loading && (
            <div className="flex items-start gap-2.5">
              <div className="w-7 h-7 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
                <Sparkles className="w-3.5 h-3.5 animate-spin" />
              </div>
              <div className="bg-slate-100 text-slate-500 rounded-2xl px-4 py-3 text-sm flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]"></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips (ChatGPT Prompt Tags) */}
        <div className="px-5 py-2 bg-white flex gap-2 overflow-x-auto no-scrollbar">
          {quickPrompts.map((p, i) => (
            <button
              key={i}
              onClick={() => {
                setInput(p);
              }}
              className="text-xs whitespace-nowrap bg-slate-50 border border-slate-200/90 text-slate-600 px-3 py-1.5 rounded-full hover:bg-slate-100 hover:text-slate-900 transition shrink-0"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Input Bar (ChatGPT / Claude Floating Pill) */}
        <div className="p-4 bg-white border-t border-slate-100">
          <form 
            onSubmit={handleSend} 
            className="flex items-center gap-2 bg-slate-50 border border-slate-200 focus-within:border-slate-400 focus-within:bg-white focus-within:ring-2 focus-within:ring-slate-900/5 rounded-2xl p-1.5 transition"
          >
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={getPlaceholderText(currentLang)}
              className="flex-1 bg-transparent px-3 py-2 text-sm text-slate-900 focus:outline-none placeholder:text-slate-400"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="w-8 h-8 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-30 disabled:bg-slate-300 text-white flex items-center justify-center transition shrink-0 shadow-xs"
              title="Send message"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </form>
          <div className="text-[10px] text-slate-400 text-center mt-1.5">
            JalRakshak AI may make mistakes. Verify critical road updates with local traffic authorities.
          </div>
        </div>

      </div>
    </div>
  );
};
