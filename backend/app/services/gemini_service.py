import os
import json
import requests
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")

class GeminiService:
    @staticmethod
    def ask_assistant(prompt: str, context: dict = None, lang: str = "en") -> str:
        prompt_clean = prompt.strip()
        prompt_lower = prompt_clean.lower()
        context = context or {}
        
        target_lang = "Bengali" if lang == "bn" else ("Hindi" if lang == "hi" else "English")
        city_name = context.get("city_name", "Metro City")
        helpline = context.get("helpline", "112 / Disaster Management 1070")
        rain_rate = context.get("rainfall_rate_mm_hr", 35.0)
        weather_cond = context.get("weather_condition", "Monsoon Heavy Rain")
        high_risk_zones = context.get("high_risk_zones", [])
        safe_corridors = context.get("safe_corridors", [])
        all_zones = context.get("all_zones", [])
        citizen_reports = context.get("citizen_reports", [])
        
        # 1. Attempt Live Gemini API
        if GEMINI_API_KEY:
            for model_name in ["gemini-2.5-flash", "gemini-1.5-flash", "gemini-2.0-flash", "gemini-2.5-flash-lite"]:
                url = f"https://generativelanguage.googleapis.com/v1beta/models/{model_name}:generateContent?key={GEMINI_API_KEY}"
                
                system_instruction = (
                    f"You are JalRakshak AI (জলরক্ষক), the pan-India urban flood nowcasting and citizen safe-navigation AI assistant. "
                    f"Answer the user's question clearly, politely, and thoroughly in {target_lang}. "
                    f"You MUST use the provided REAL-TIME LIVE CITY TELEMETRY DATA below to give accurate, specific answers with exact zone names, water depths in cm, vehicle safety status, safe alternative routes, and emergency helpline numbers. "
                    f"Format with clean markdown bullet points and emojis. Never produce cut-off or generic answers."
                )

                context_str = json.dumps(context, indent=2, ensure_ascii=False)
                full_text = f"{system_instruction}\n\n--- REAL-TIME LIVE TELEMETRY DATA ---\n{context_str}\n\nUser Question: {prompt_clean}"
                payload = {
                    "contents": [{"parts": [{"text": full_text}]}],
                    "generationConfig": {"temperature": 0.2, "maxOutputTokens": 2048}
                }

                try:
                    res = requests.post(url, json=payload, timeout=12)
                    if res.status_code == 200:
                        data = res.json()
                        candidates = data.get("candidates", [])
                        if candidates and "content" in candidates[0]:
                            parts = candidates[0]["content"].get("parts", [])
                            if parts and "text" in parts[0]:
                                reply = parts[0]["text"].strip()
                                if len(reply) > 20:
                                    return reply
                except Exception:
                    continue

        # 2. Comprehensive Dynamic Context Synthesizer (Ensures rich data-driven output in all languages)
        is_bengali = lang == "bn" or any(c in prompt_lower for c in ["কী", "কি", "কোথায়", "জল", "রাস্তা", "বন্যা", "সাবধানতা", "গাড়ি", "গাড়ি", "বাইক", "নিরাপদ", "বৃষ্টি", "নম্বর", "সাহায্য"])
        is_hindi = lang == "hi" or any(c in prompt_lower for c in ["क्या", "कहाँ", "पानी", "सड़क", "बाढ़", "सावधानी", "गाड़ी", "सुरक्षित", "बारिश", "नंबर", "मदद"])

        # Format zones list for dynamic display
        high_risk_text_en = []
        high_risk_text_bn = []
        high_risk_text_hi = []
        for z in high_risk_zones[:4]:
            name = z.get("name", "Zone")
            depth = z.get("water_depth_cm", 40.0)
            status = z.get("citizen_level", "KNEE DEEP")
            high_risk_text_en.append(f"• **{name}**: ~{depth} cm water depth ({status})")
            high_risk_text_bn.append(f"• **{name}**: প্রায় {depth} সেমি জল ({status})")
            high_risk_text_hi.append(f"• **{name}**: लगभग {depth} सेमी जलभराव ({status})")

        safe_text_en = ", ".join(safe_corridors[:3]) if safe_corridors else "Elevated Flyovers & Bypass Highways"
        safe_text_bn = ", ".join(safe_corridors[:3]) if safe_corridors else "উঁচু ফ্লাইওভার ও বাইপাস হাইওয়ে"
        safe_text_hi = ", ".join(safe_corridors[:3]) if safe_corridors else "ऊंचे फ्लाईओवर और बाईपास हाईवे"

        # Detect User Intent
        q_flooded = any(k in prompt_lower for k in ["road", "street", "flood", "waterlog", "submerge", "zone", "where", "কোথায়", "রাস্তা", "জল", "জলমগ্ন", "কहाँ", "सड़क", "पानी", "जलभराव"])
        q_vehicle = any(k in prompt_lower for k in ["drive", "car", "bike", "vehicle", "safe to drive", "passable", "গাড়ি", "বাইক", "গাড়ি", "চালাব", "गाड़ी", "बाइक", "चलाना", "सुरक्षित"])
        q_safety = any(k in prompt_lower for k in ["guideline", "rule", "precaution", "safety", "dos", "donts", "সাবধানতা", "নিয়ম", "সুরক্ষা", "কি করব", "सावधानी", "नियम", "सुरक्षा"])
        q_helpline = any(k in prompt_lower for k in ["help", "helpline", "emergency", "number", "phone", "contact", "ndrf", "112", "sos", "নম্বর", "যোগাযোগ", "জরুরি", "হেল্পলাইন", "मदद", "नंबर", "हेल्पलाइन"])
        q_weather = any(k in prompt_lower for k in ["weather", "rain", "rainfall", "forecast", "radar", "বৃষ্টি", "আবহাওয়া", "বৃষ্টিপাত", "बारिश", "मौसम", "पूर्वानुमान"])
        q_routes = any(k in prompt_lower for k in ["route", "bypass", "alternate", "reach", "destination", "রুট", "বিকল্প", "যাব", "পথ", "मार्ग", "रास्ता", "बायपास"])

        # --- BENGALI RESPONSES ---
        if is_bengali:
            if q_helpline:
                return (
                    f"🚨 **জরুরি দুর্যোগ ও উদ্ধার সহায়তা নম্বর ({city_name}):**\n\n"
                    f"• **জাতীয় জরুরি সেবা:** `112` (২৪x৭ পুলিশ, দমকল ও অ্যাম্বুলেন্স)\n"
                    f"• **সিটি কন্ট্রোল রুম হেল্পলাইন:** `{helpline}`\n"
                    f"• **NDRF ২৪x৭ কন্ট্রোল রুম:** `+91-9711077372` / `011-24363260`\n"
                    f"• **রাজ্য দুর্যোগ ব্যবস্থাপনা (SDMA):** `1070`\n"
                    f"• **ট্রাফিক ও হাইওয়ে পুলিশ:** `1073`\n\n"
                    f"💡 *পরামর্শ: জলে আটকে পড়লে প্যানিক করবেন না, গাড়ির কাচ নামিয়ে রাখুন এবং অবিলম্বে ১১২ ডায়াল করুন।*"
                )
            elif q_flooded or q_routes:
                zones_summary = "\n".join(high_risk_text_bn) if high_risk_text_bn else "• সমস্ত প্রধান রাস্তা বর্তমানে স্বাভাবিক ও চলাচলের উপযোগী।"
                return (
                    f"🌊 **{city_name}-এর বর্তমান লাইভ জলমগ্ন এলাকা ও রাস্তার অবস্থা:**\n\n"
                    f"🌧️ **লাইভ বৃষ্টিপাত:** {rain_rate} mm/h ({weather_cond})\n\n"
                    f"⚠️ **উচ্চ ঝুঁকিযুক্ত জলমগ্ন এলাকা:**\n"
                    f"{zones_summary}\n\n"
                    f"✅ **নিরাপদ বিকল্প পথ (উঁচু রুট):**\n"
                    f"• {safe_text_bn}\n\n"
                    f"🚗 বিস্তারিত নিরাপদ নেভিগেশন ম্যাপ দেখতে অ্যাপের **'Safe Routes'** বাটন ব্যবহার করুন। জরুরি প্রয়োজনে কল করুন: `{helpline}`"
                )
            elif q_vehicle:
                return (
                    f"🚗 **অতিবৃষ্টিতে যানবাহন চালানোর নির্দেশিকা ও নিরাপত্তা অবস্থা ({city_name}):**\n\n"
                    f"🌧️ বর্তমান বৃষ্টিপাতের তীব্রতা: **{rain_rate} mm/h**\n\n"
                    f"• 🛵 **বাইক / স্কুটার:** মাঝারি থেকে উচ্চ ঝুঁকি। ২০ সেমি বেশি জলে চাকা স্লিপ করা ও ইঞ্জিন বন্ধ হওয়ার ঝুঁকি থাকে।\n"
                    f"• 🚗 **হ্যাচব্যাক ও সেডান কার:** হাঁটু সমান (৩০+ সেমি) জলে কখনোই নামাবেন না। সাইলেন্সারে জল ঢুকলে ইঞ্জিন সিজ হতে পারে।\n"
                    f"• 🚙 **বড় SUV / বাস:** চলাচলের উপযুক্ত, তবে আন্ডারপাস সম্পূর্ণ এড়িয়ে চলুন।\n\n"
                    f"⚠️ **এই মুহূর্তে এড়িয়ে চলুন:**\n"
                    f"{chr(10).join(high_risk_text_bn[:2]) if high_risk_text_bn else '• নীচু আন্ডারপাসসমূহ'}\n\n"
                    f"জরুরি টোয়িং বা উদ্ধারকাজের জন্য কল করুন: `112` বা `{helpline}`।"
                )
            elif q_weather:
                return (
                    f"🌦️ **{city_name}-এর লাইভ আবহাওয়া ও রাডার তথ্য:**\n\n"
                    f"• **বৃষ্টিপাতের তীব্রতা:** {rain_rate} mm/h\n"
                    f"• **আবহাওয়া অবস্থা:** {weather_cond}\n"
                    f"• **ঝুঁকি মাত্রা:** {'উচ্চ ঝুঁকি (Heavy Waterlogging)' if rain_rate > 30 else 'মাঝারি ঝুঁকি (Moderate)'}\n"
                    f"• **নিরাপদ করিডোর:** {safe_text_bn}\n\n"
                    f"লাইভ স্যাটেলাইট ও ড্রেনেজ সিমুলেশন দেখতে ড্যাশবোর্ডের ইন্টারেক্টিভ ম্যাপ ব্যবহার করুন।"
                )
            elif q_safety:
                return (
                    f"🛡️ **বন্যা ও অতিবৃষ্টির সময় অপরিহার্য জীবনরক্ষাকারী সাবধানতা:**\n\n"
                    f"১. 🚫 **'Turn Around, Don't Drown':** কখনোই জলমগ্ন আন্ডারপাস বা নীচু রাস্তায় গাড়ি নিয়ে নামবেন না—মাত্র ১৫-১৮ ইঞ্চি জলের স্রোতে গাড়ি ভেসে যেতে পারে।\n"
                    f"২. ⚡ **বিদ্যুৎস্পৃষ্ট থেকে সতর্কতা:** রাস্তায় ছিঁড়ে পড়া তার, ল্যাম্পপোস্ট ও ট্রান্সফরমার থেকে কমপক্ষে ১৫ ফুট দূরে থাকুন।\n"
                    f"৩. 💧 **বিশুদ্ধ পানীয় জল:** জল ফুটিয়ে বা ক্লোরিন ট্যাবলেট দিয়ে শোধন করে পান করুন।\n"
                    f"৪. 🎒 **জরুরি কিট:** টর্চলাইট, পাওয়ারব্যাঙ্ক, ফার্স্ট এইড ও ওআরএস (ORS) সাথে রাখুন।\n"
                    f"৫. 📞 **জরুরি হেল্পলাইন:** যে কোনো বিপদে অবিলম্বে `112` অথবা `{helpline}` ডায়াল করুন।"
                )
            else:
                zones_summary = "\n".join(high_risk_text_bn[:3]) if high_risk_text_bn else "• প্রধান রাস্তাগুলো বর্তমানে স্বাভাবিক।"
                return (
                    f"🤖 **জলরক্ষক AI লাইভ রিপোর্ট ({city_name}):**\n\n"
                    f"🌧️ **লাইভ বৃষ্টিপাত:** {rain_rate} mm/h ({weather_cond})\n\n"
                    f"📍 **জলমগ্ন এলাকার অবস্থা:**\n{zones_summary}\n\n"
                    f"🛡️ **নিরাপদ বিকল্প পথ:** {safe_text_bn}\n"
                    f"📞 **জরুরি কন্ট্রোল রুম:** `{helpline}` / `112`\n\n"
                    f"আপনার গন্তব্যের নিরাপদ রুট জানতে 'Safe Routes' প্ল্যানার ব্যবহার করুন।"
                )

        # --- HINDI RESPONSES ---
        elif is_hindi:
            if q_helpline:
                return (
                    f"🚨 **आपातकालीन आपदा व बचाव हेल्पलाइन ({city_name}):**\n\n"
                    f"• **राष्ट्रीय आपातकालीन नंबर:** `112` (24x7 पुलिस, फायर, एम्बुलेंस)\n"
                    f"• **नगर निगम बाढ़ नियंत्रण:** `{helpline}`\n"
                    f"• **NDRF 24x7 कंट्रोल रूम:** `+91-9711077372` / `011-24363260`\n"
                    f"• **राज्य आपदा प्रबंधन (SDMA):** `1070`\n"
                    f"• **ट्रैफिक हेल्पलाइन:** `1073`"
                )
            elif q_flooded or q_routes:
                zones_summary = "\n".join(high_risk_text_hi) if high_risk_text_hi else "• सभी मुख्य मार्ग फिलहाल सुचारू हैं।"
                return (
                    f"🌊 **{city_name} में वर्तमान जलभराव और सड़कों की लाइव स्थिति:**\n\n"
                    f"🌧️ **वर्तमान वर्षा दर:** {rain_rate} mm/h ({weather_cond})\n\n"
                    f"⚠️ **अति-संवेदनशील जलमग्न क्षेत्र:**\n{zones_summary}\n\n"
                    f"✅ **सुरक्षित वैकल्पिक मार्ग:**\n• {safe_text_hi}\n\n"
                    f"सुरक्षित नेविगेशन के लिए **'Safe Routes'** विकल्प का उपयोग करें। आपातकालीन संपर्क: `{helpline}`"
                )
            elif q_vehicle:
                return (
                    f"🚗 **भारी बारिश में वाहन सुरक्षा परामर्श ({city_name}):**\n\n"
                    f"• 🛵 **दोपहिया वाहन:** मध्यम से उच्च जोखिम। 20 सेमी से अधिक पानी में वाहन न चलाएं।\n"
                    f"• 🚗 **कार / सेडान:** घुटनों तक भरे पानी में बिल्कुल न जाएं—इंजन बंद होने का खतरा है।\n"
                    f"• 🚙 **एसयूवी व बस:** सुरक्षित, लेकिन अंडरपास से बचें।\n\n"
                    f"आपातकालीन सहायता के लिए डायल करें: `112` या `{helpline}`"
                )
            else:
                return (
                    f"🛡️ **{city_name} बाढ़ सुरक्षा एवं लाइव अपडेट:**\n\n"
                    f"🌧️ **बारिश:** {rain_rate} mm/h | **मौसम:** {weather_cond}\n"
                    f"1. जलमग्न अंडरपास में वाहन न ले जाएं।\n"
                    f"2. बिजली के खंभों और खुले तारों से कम से कम 15 फीट दूर रहें।\n"
                    f"3. आपातकालीन सहायता के लिए राष्ट्रीय नंबर `112` या `{helpline}` पर संपर्क करें।"
                )

        # --- ENGLISH RESPONSES (DEFAULT) ---
        else:
            if q_helpline:
                return (
                    f"🚨 **Emergency Flood Rescue & Disaster Helplines ({city_name}):**\n\n"
                    f"• **National Emergency Response:** `112` (24x7 Multi-Service)\n"
                    f"• **City Municipal Flood Cell:** `{helpline}`\n"
                    f"• **NDRF 24x7 Control Room:** `+91-9711077372` / `011-24363260`\n"
                    f"• **State Disaster Management (SDMA):** `1070`\n"
                    f"• **Traffic & Highway Police Assistance:** `1073`\n\n"
                    f"💡 *Tip: If trapped in rising waters, roll down car windows immediately and call 112.*"
                )
            elif q_flooded or q_routes:
                zones_summary = "\n".join(high_risk_text_en) if high_risk_text_en else "• All monitored major corridors are currently passable."
                return (
                    f"🌊 **Live Waterlogging & Street Telemetry for {city_name}:**\n\n"
                    f"🌧️ **Live Precipitation Rate:** {rain_rate} mm/h ({weather_cond})\n\n"
                    f"⚠️ **High-Risk Submerged Hotspots:**\n"
                    f"{zones_summary}\n\n"
                    f"✅ **Recommended Flood-Safe Corridors (High Elevation):**\n"
                    f"• {safe_text_en}\n\n"
                    f"🧭 Use the **'Safe Routes'** engine on the map to navigate safely. Emergency Helpline: `{helpline}`"
                )
            elif q_vehicle:
                return (
                    f"🚗 **Vehicle Passability & Driving Advisory ({city_name}):**\n\n"
                    f"🌧️ **Current Rainfall Intensity:** {rain_rate} mm/h\n\n"
                    f"• 🛵 **Two-Wheelers & Bikes:** HIGH RISK. Standing water >15-20cm causes loss of traction and exhaust stalling.\n"
                    f"• 🚗 **Hatchbacks & Sedans:** CRITICAL RISK. Do not enter water above 25-30cm (wheel hub level) to avoid hydro-locking.\n"
                    f"• 🚙 **High-Clearance SUVs & Transit Buses:** PASSABLE with low speed; avoid low-lying underpasses.\n\n"
                    f"⚠️ **Known Deep Water Sinks:**\n"
                    f"{chr(10).join(high_risk_text_en[:2]) if high_risk_text_en else '• Low-lying underpasses'}\n\n"
                    f"For roadside breakdown or rescue, dial `112` or `{helpline}`."
                )
            elif q_weather:
                return (
                    f"🌦️ **Live Sensor & Doppler Radar Weather Report ({city_name}):**\n\n"
                    f"• **Rainfall Intensity:** {rain_rate} mm/h\n"
                    f"• **Atmospheric Condition:** {weather_cond}\n"
                    f"• **Hydrodynamic Risk Level:** {'HIGH RISK' if rain_rate > 35 else 'MODERATE'}\n"
                    f"• **Safe Bypass Corridors:** {safe_text_en}\n\n"
                    f"Check the 0-3h Nowcast chart on the dashboard for minute-by-minute radar surge predictions."
                )
            elif q_safety:
                return (
                    f"🛡️ **Essential Urban Flood Safety Protocols:**\n\n"
                    f"1. 🚫 **Turn Around, Don't Drown:** Just 12-18 inches of moving floodwater can sweep a vehicle away.\n"
                    f"2. ⚡ **Electrocution Hazard:** Stay at least 15 feet away from fallen power lines, submerged junction boxes, and street lamps.\n"
                    f"3. 💧 **Clean Water Security:** Boil tap water before consumption to protect against waterborne pathogens.\n"
                    f"4. 🎒 **Emergency Kit Ready:** Keep portable battery banks, flashlights, medicines, and ORS packets handy.\n"
                    f"5. 📞 **Immediate Assistance:** Dial `112` or City Helpline `{helpline}` in case of distress."
                )
            else:
                zones_summary = "\n".join(high_risk_text_en[:3]) if high_risk_text_en else "• Major streets clear."
                return (
                    f"🤖 **JalRakshak AI Telemetry Overview ({city_name}):**\n\n"
                    f"🌧️ **Precipitation:** {rain_rate} mm/h ({weather_cond})\n"
                    f"📍 **Top Monitored Waterlogging Zones:**\n{zones_summary}\n"
                    f"🛡️ **Safe Corridors:** {safe_text_en}\n"
                    f"📞 **Emergency Contact:** `{helpline}` / `112`\n\n"
                    f"Ask me about specific road conditions, vehicle passability, or safe routing anytime!"
                )

gemini_service = GeminiService()

