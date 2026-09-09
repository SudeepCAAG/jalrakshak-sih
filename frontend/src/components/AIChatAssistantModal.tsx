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
      let fallback = (
        currentLang === 'bn' 
          ? 'সার্ভার ব্যস্ত। জরুরি সুরক্ষার জন্য মনে রাখুন: কখনোই হাঁটু সমান জলে গাড়ি নামাবেন না। জরুরি রেসকিউর জন্য সরাসরি ১১২ অথবা NDRF নম্বরে কল করুন।'
          : currentLang === 'hi'
          ? 'सर्वर व्यस्त है। कृपया जलमग्न अंडरपास में वाहन न ले जाएं। आपातकालीन बचाव के लिए 112 या NDRF पर कॉल करें।'
          : 'Server busy. Turn around, do not drown: Never drive through flooded underpasses. For emergency rescue, dial 112 or NDRF hotline.'
      );

      if (userText.toLowerCase().includes('help') || userText.toLowerCase().includes('sos')) {
        fallback = (
          currentLang === 'bn'
            ? 'জরুরি সাহায্য: অবিলম্বে National Emergency 112 অথবা Disaster Management 1070 ডায়াল করুন।'
            : currentLang === 'hi'
            ? 'आपातकालीन सहायता: तुरंत राष्ट्रीय हेल्पलाइन 112 या आपदा प्रबंधन 1070 डायल करें।'
            : 'Immediate Assistance: Dial National Emergency 112 or Disaster Helpline 1070 immediately.'
        );
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
