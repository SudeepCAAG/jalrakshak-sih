import os
import requests
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")

class GeminiService:
    @staticmethod
    def ask_assistant(prompt: str, context: dict = None, lang: str = "en") -> str:
        prompt_lower = prompt.lower()
        target_lang = "Bengali" if lang == "bn" else ("Hindi" if lang == "hi" else "English")

        # Try live Gemini API with 2.5-flash
        if GEMINI_API_KEY:
            for model_name in ["gemini-2.5-flash", "gemini-flash-latest", "gemini-2.5-flash-lite"]:
                url = f"https://generativelanguage.googleapis.com/v1beta/models/{model_name}:generateContent?key={GEMINI_API_KEY}"
                
                system_instruction = (
                    f"You are JalRakshak AI (জলরক্ষক), an intelligent real-time flood advisor and urban safety assistant for India. "
                    f"Provide clear, complete, structured, and polite answers in {target_lang}. "
                    f"Always mention 112 (National Emergency), NDRF (+91-9711077372), or 1070 when relevant. "
                    f"Give complete answers, never cut off sentences midway."
                )

                full_text = f"{system_instruction}\nCity Context: {context}\n\nUser Question: {prompt}"
                payload = {
                    "contents": [{"parts": [{"text": full_text}]}],
                    "generationConfig": {"temperature": 0.3, "maxOutputTokens": 2048}
                }

                try:
                    res = requests.post(url, json=payload, timeout=20)
                    if res.status_code == 200:
                        data = res.json()
                        candidates = data.get("candidates", [])
                        if candidates and "content" in candidates[0]:
                            parts = candidates[0]["content"].get("parts", [])
                            if parts and "text" in parts[0]:
                                reply = parts[0]["text"].strip()
                                if reply:
                                    return reply
                except Exception:
                    continue

        # Smart Domain-Specific Local Fallback (Guarantees helpful answer in user's language)
        is_bengali = any(c in prompt for c in ["কী", "কি", "কোথায়", "জল", "রাস্তা", "বন্যা", "সাবধানতা", "গাড়ি"])
        is_hindi = any(c in prompt for c in ["क्या", "कहाँ", "पानी", "सड़क", "बाढ़", "सावधानी", "गाड़ी"])

        if is_bengali:
            if "সাবধানতা" in prompt_lower or "করব" in prompt_lower or "নিয়ম" in prompt_lower:
                return (
                    "বন্যার সময় প্রধান সাবধানতাসমূহ:\n"
                    "১. কখনোই হাঁটু সমান জলজমা রাস্তায় বা রেলওয়ে আন্ডারপাসে গাড়ি নামাবেন না (১৮ ইঞ্চি জলে গাড়ি ভেসে যেতে পারে)।\n"
                    "২. ছিঁড়ে পড়া তার, ল্যাম্পপোস্ট ও ট্রান্সফরমার থেকে কমপক্ষে ১৫ ফুট দূরে থাকুন—বিদ্যুৎস্পৃষ্ট হওয়ার ঝুঁকি থাকে।\n"
                    "৩. পানীয় জল ফুটিয়ে পান করুন এবং শুকনো খাবার ও ওআরএস (ORS) সাথে রাখুন।\n"
                    "৪. জরুরি সহায়তার জন্য সরাসরি ১১২ অথবা NDRF হেল্পলাইন +91-9711077372 নম্বরে কল করুন।"
                )
            elif "কলকাতা" in prompt_lower or "সল্টলেক" in prompt_lower or "রাস্তা" in prompt_lower:
                return (
                    "কলকাতা ও সংলগ্ন এলাকার প্রধান জলমগ্ন সংবেদনশীল এলাকা:\n"
                    "• ঠান্ডানিয়া কালীবাড়ি (আমহার্স্ট স্ট্রিট) ও কলেজ স্ট্রিট (বইপাড়া)—এখানে ভারী বৃষ্টিতে ১ ফুট বা তার বেশি জল জমতে পারে।\n"
                    "• পার্ক স্ট্রিট ও ক্যামাক স্ট্রিট সংযোগস্থল—হালকা থেকে মাঝারি জলজমার সম্ভাবনা থাকে।\n"
                    "• নিরাপদ বিকল্প: ই.এম বাইপাস ও সেন্ট্রাল এভিনিউ-এর উঁচু ফ্লাইওভার ব্যবহার করুন। বিস্তারিত লাইভ রুট দেখতে 'Safe Routes' ট্যাব দেখুন।"
                )
            elif "গাড়ি" in prompt_lower or "বাইক" in prompt_lower:
                return (
                    "অতিবৃষ্টিতে গাড়ি নিয়ে বের হওয়ার নির্দেশিকা:\n"
                    "• আন্ডারপাস বা নীচু রাস্তা সম্পূর্ণ এড়িয়ে চলুন।\n"
                    "• সাইলেন্সার পাইপে জল ঢুকে গাড়ি বন্ধ হয়ে গেলে স্টার্ট দেওয়ার চেষ্টা করবেন না।\n"
                    "• হাইওয়ে ও টোয়িং সাহায্যের জন্য ১০৭৩ নম্বরে কল করুন।"
                )
            else:
                return (
                    "জলরক্ষক AI সর্বদা আপনার সুরক্ষায় নিয়োজিত। ভারী বৃষ্টিতে নিরাপদ উঁচু স্থানে থাকুন, বিদ্যুতের খুঁটি ও ড্রেনের খোলা মুখ এড়িয়ে চলুন। "
                    "যেকোনো জরুরি উদ্ধারকাজের জন্য অবিলম্বে জাতীয় জরুরি নম্বর ১১২ অথবা দুর্যোগ ব্যবস্থাপনা ১০৭০ নম্বরে যোগাযোগ করুন।"
                )

        elif is_hindi:
            return (
                "बाढ़ के दौरान महत्वपूर्ण सुरक्षा निर्देश:\n"
                "1. जलमग्न अंडरपास और सड़कों पर वाहन न चलाएं (18 इंच पानी में वाहन बह सकता है)।\n"
                "2. बिजली के खंभों, तारों और खुले मैनहोल से दूर रहें।\n"
                "3. केवल उबला हुआ पानी पिएं और आवश्यक दवाइयां साथ रखें।\n"
                "4. आपातकालीन सहायता के लिए राष्ट्रीय हेल्पलाइन 112 या NDRF +91-9711077372 पर संपर्क करें।"
            )

        else:
            return (
                "Key Flood Safety Guidelines:\n"
                "1. Turn Around, Don't Drown: Never drive or walk through flooded underpasses or moving street water.\n"
                "2. Electrical Safety: Stay clear of downed power lines, submerged transformers, and metallic lampposts.\n"
                "3. Safe Drinking Water: Boil water before use to prevent waterborne contamination.\n"
                "4. Emergency Rescue: For immediate assistance, dial 112 or NDRF at +91-9711077372."
            )

gemini_service = GeminiService()
