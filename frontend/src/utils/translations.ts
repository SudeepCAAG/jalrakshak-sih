export type Language = 'en' | 'bn' | 'hi';

export interface Translations {
  appName: string;
  appSub: string;
  tagline: string;
  navHome: string;
  navGis: string;
  navSafeNav: string;
  navEmergency: string;
  navBulletins: string;
  navMoES: string;
  aiBtn: string;
  loginBtn: string;
  locateMe: string;
  gpsActive: string;
  emergencyTitle: string;
  emergencySub: string;
  heroHeadline1: string;
  heroHeadlineHighlight: string;
  heroDescription: string;
  checkStreetStatus: string;
  planSafeRoute: string;
  searchPlaceholder: string;
  viewSafeRoute: string;
  aiAdvisoryTitle: string;
  liveSensorsTitle: string;
  radarActive: string;
  waterDepthcm: string;
  elevation: string;
  safeRouteLabel: string;
  hazardRouteLabel: string;
  callNow: string;
  copyNumber: string;
  shareSos: string;
  offlineBanner: string;
  corePillarsTitle: string;
  corePillarsSub: string;
  impactMetricsTitle: string;
  liveStatsActiveRadars: string;
  liveStatsZonesMonitored: string;
  liveStatsAccuracy: string;
  liveStatsCitizensProtected: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    appName: "JalRakshak",
    appSub: "Urban Flood Nowcasting • 0–3h Street Precision",
    tagline: "Live Urban Flood Nowcasting & Safe Navigation System",
    navHome: "Home",
    navGis: "GIS Nowcast",
    navSafeNav: "Safe Routes",
    navEmergency: "Emergency 112",
    navBulletins: "Bulletins",
    navMoES: "MoES Portal",
    aiBtn: "AI Assistant",
    loginBtn: "Official Login",
    locateMe: "Locate Me",
    gpsActive: "GPS Active",
    emergencyTitle: "Emergency & Flood Helplines",
    emergencySub: "One-tap direct emergency dispatch and live GPS SOS sharing for rapid flood response.",
    heroHeadline1: "Predicting Street-Level Urban Flooding",
    heroHeadlineHighlight: "0–3 Hours in Advance",
    heroDescription: "Knowing rainfall volume does not reveal which underpasses will drown. JalRakshak couples real-time Doppler Weather Radar & OpenWeatherMap sensors with 30m Micro-DEM Topography and an Underground Drainage Hydraulic Graph, pinpointing exact street-level water depths in centimeters before gridlocks occur.",
    checkStreetStatus: "Check Street Status",
    planSafeRoute: "Plan Flood-Safe Route",
    searchPlaceholder: "Search any street, metro station or underpass...",
    viewSafeRoute: "Navigate Safe Route",
    aiAdvisoryTitle: "Hydraulic Advisory",
    liveSensorsTitle: "Live Hydro-Meteorological Sensors",
    radarActive: "Doppler Radar Active",
    waterDepthcm: "Water Depth",
    elevation: "Elevation",
    safeRouteLabel: "Recommended Flood-Safe Route",
    hazardRouteLabel: "Hazardous Direct Route",
    callNow: "Call Helpline Now",
    copyNumber: "Copy Number",
    shareSos: "Share SOS",
    offlineBanner: "You are offline. Showing cached emergency helplines & safety protocols.",
    corePillarsTitle: "Coupled Physics-Guided Hydraulic Framework",
    corePillarsSub: "How JalRakshak delivers hyper-local predictive intelligence where conventional weather apps fail.",
    impactMetricsTitle: "National Impact Telemetry",
    liveStatsActiveRadars: "6 Doppler DWR Stations",
    liveStatsZonesMonitored: "128 Monitored Hotspots",
    liveStatsAccuracy: "94.2% Prediction Accuracy",
    liveStatsCitizensProtected: "1.8M+ Citizens Alerted"
  },
  bn: {
    appName: "জলরক্ষক (JalRakshak)",
    appSub: "শহরের বন্যা পূর্বাভাসের আধুনিক প্রযুক্তি • ০–৩ ঘণ্টা নির্ভুলতা",
    tagline: "লাইভ নগর বন্যা পূর্বাভাস ও নিরাপদ যাতায়াত ব্যবস্থা",
    navHome: "হোম",
    navGis: "GIS নাওকাস্ট",
    navSafeNav: "নিরাপদ রুট",
    navEmergency: "জরুরি ১১২",
    navBulletins: "বুলেটিন",
    navMoES: "প্রশাসনিক পোর্টাল",
    aiBtn: "AI সহকারী",
    loginBtn: "অফিসিয়াল লগইন",
    locateMe: "আমার লোকেশন",
    gpsActive: "GPS চালু আছে",
    emergencyTitle: "জরুরি বন্যা হেল্পলাইন ও রেসকিউ",
    emergencySub: "এক ক্লিকে জরুরি নম্বরে ডায়াল করুন অথবা উদ্ধারকারী দলের কাছে লাইভ GPS SOS লোকেশন পাঠান।",
    heroHeadline1: "রাস্তায় জল জমার আগাম পূর্বাভাস",
    heroHeadlineHighlight: "০–৩ ঘণ্টা আগেই সতর্কবার্তা",
    heroDescription: "শুধু বৃষ্টির পরিমাণ জেনে বোঝা যায় না কোন আন্ডারপাস বা রাস্তা জলে ডুববে। জলরক্ষক ডপলার ওয়েদার রাডার, লাইভ সেন্সর, ৩০ মিটার ডিজিটাল এলিভেশন (DEM) এবং মাটির নিচের ড্রেনেজ গ্রাফ একসাথে যুক্ত করে সেন্টিমিটারে রাস্তার জলের উচ্চতা নিখুঁতভাবে প্রেডিক্ট করে।",
    checkStreetStatus: "রাস্তার অবস্থা দেখুন",
    planSafeRoute: "নিরাপদ রুট খুঁজুন",
    searchPlaceholder: "যেকোনো রাস্তা, আন্ডারপাস বা মেট্রো স্টেশন খুঁজুন...",
    viewSafeRoute: "নিরাপদ রাস্তায় চলুন",
    aiAdvisoryTitle: "AI হাইড্রোলিক পরামর্শ",
    liveSensorsTitle: "লাইভ আবহাওয়া ও ড্রেনেজ সেন্সর",
    radarActive: "ডপলার রাডার লাইভ সক্রিয়",
    waterDepthcm: "জলের গভীরতা",
    elevation: "উচ্চতা (MSL)",
    safeRouteLabel: "প্রস্তাবিত নিরাপদ বিকল্প রুট",
    hazardRouteLabel: "জলমগ্ন বিপদজনক রাস্তা",
    callNow: "এখনই কল করুন",
    copyNumber: "নম্বর কপি করুন",
    shareSos: "SOS পাঠান",
    offlineBanner: "আপনি অফলাইনে আছেন। ব্রাউজারে সংরক্ষিত জরুরি নম্বর ও নিয়মাবলী দেখানো হচ্ছে।",
    corePillarsTitle: "জলরক্ষকের মূল বৈজ্ঞানিক প্রযুক্তি",
    corePillarsSub: "যেভাবে আধুনিক হাইড্রোলিক মডেলিং সাধারণ অ্যাপের চেয়ে বহু গুণ এগিয়ে কাজ করে।",
    impactMetricsTitle: "জাতীয় স্তরে পারফরম্যান্স",
    liveStatsActiveRadars: "৬টি ডপলার রাডার নেটওয়ার্ক",
    liveStatsZonesMonitored: "১২৮টি ঝুঁকিপূর্ণ এলাকা",
    liveStatsAccuracy: "৯৪.২% প্রেডিকশন অ্যাকুরেসি",
    liveStatsCitizensProtected: "১৮ লাখ+ নাগরিক সুরক্ষিত"
  },
  hi: {
    appName: "जल रक्षक (JalRakshak)",
    appSub: "शहरी बाढ़ पूर्वानुमान • 0–3 घंटे सटीक सड़क चेतावनी",
    tagline: "लाइव शहरी बाढ़ पूर्वानुमान एवं सुरक्षित नेविगेशन प्रणाली",
    navHome: "होम",
    navGis: "GIS नाउकास्ट",
    navSafeNav: "सुरक्षित मार्ग",
    navEmergency: "आपातकालीन 112",
    navBulletins: "बुलेटिन",
    navMoES: "प्रशासनिक कंसोल",
    aiBtn: "AI सहायक",
    loginBtn: "अधिकारिक लॉगिन",
    locateMe: "मेरा स्थान",
    gpsActive: "GPS सक्रिय",
    emergencyTitle: "आपातकालीन बाढ़ हेल्पलाइन एवं बचाव",
    emergencySub: "एक क्लिक में आपातकालीन सेवाओं को कॉल करें या बचाव दल को अपनी लाइव GPS SOS लोकेशन भेजें।",
    heroHeadline1: "सड़क स्तर पर जलभराव का सटीक पूर्वानुमान",
    heroHeadlineHighlight: "0–3 घंटे पहले चेतावनी",
    heroDescription: "केवल बारिश की मात्रा से यह पता नहीं चलता कि कौन सा अंडरपास डूबेगा। जलरक्षक डॉप्लर रडार, लाइव सेंसर, 30m डिजिटल एलिवेशन (DEM) और भूमिगत ड्रेनेज नेटवर्क को जोड़कर सेंटीमीटर में सटीक जलभराव का स्तर बताता है।",
    checkStreetStatus: "सड़क की स्थिति जांचें",
    planSafeRoute: "सुरक्षित मार्ग खोजें",
    searchPlaceholder: "किसी भी सड़क, अंडरपास या स्टेशन का नाम खोजें...",
    viewSafeRoute: "सुरक्षित मार्ग देखें",
    aiAdvisoryTitle: "हाइड्रोलिक सलाह",
    liveSensorsTitle: "लाइव मौसम व ड्रेनेज टेलीमेट्री",
    radarActive: "डॉप्लर रडार सक्रिय",
    waterDepthcm: "जलभराव स्तर",
    elevation: "ऊंचाई (MSL)",
    safeRouteLabel: "अनुशंसित सुरक्षित मार्ग",
    hazardRouteLabel: "जलमग्न खतरनाक रास्ता",
    callNow: "हेल्पलाइन पर कॉल करें",
    copyNumber: "नंबर कॉपी करें",
    shareSos: "SOS साझा करें",
    offlineBanner: "आप ऑफ़लाइन हैं। सहेजे गए आपातकालीन संपर्क दिखाए जा रहे हैं।",
    corePillarsTitle: "जलरक्षक की प्रमुख वैज्ञानिक तकनीक",
    corePillarsSub: "जानिए कैसे भौतिकी-आधारित हाइड्रोलिक मॉडल पारंपरिक मौसम ऐप्स से बेहतर परिणाम देता है।",
    impactMetricsTitle: "राष्ट्रीय प्रभाव मेट्रिक्स",
    liveStatsActiveRadars: "6 डॉप्लर रडार स्टेशन",
    liveStatsZonesMonitored: "128 निगरानी क्षेत्र",
    liveStatsAccuracy: "94.2% सटीक भविष्यवाणी",
    liveStatsCitizensProtected: "18 लाख+ नागरिक सुरक्षित"
  }
};
