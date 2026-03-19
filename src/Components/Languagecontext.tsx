import { createContext, useContext, useEffect, useState } from "react";

export type Lang = "en" | "dz";

interface LangContextValue {
  lang: Lang;
  toggleLang: () => void;
  t: (key: string) => string;
}

// ─── All translations ───────────────────────────────────────
export const translations: Record<Lang, Record<string, string>> = {
  en: {
    // NavBar
    "nav.home":       "Home",
    "nav.about":      "About",
    "nav.services":   "Services",
    "nav.contact":    "Contact",
    "nav.order":      "Order Now",
    "nav.lang":       "دارجة",

    // Hero
    "hero.badge":     "Digital Agency · Est. 2024",
    "hero.title1":    "Turn your Idea",
    "hero.title2":    "into",
    "hero.teal":      "Reality!",
    "hero.sub":       "Tizart — A Platform for building Startups",
    "hero.desc":      "Tizart Agency is a modern digital agency specialized in web development, mobile app development, UI/UX design, and AI-powered solutions. We help startups, businesses, and entrepreneurs transform their ideas into scalable, high-performance digital products.",
    "hero.cta1":      "Get Started →",
    "hero.cta2":      "View Portfolio",
    "hero.stat1.val": "50+",
    "hero.stat1.lbl": "Projects Shipped",
    "hero.stat2.val": "98%",
    "hero.stat2.lbl": "Client Satisfaction",
    "hero.stat3.val": "4×",
    "hero.stat3.lbl": "Avg. ROI",

    // About
    "about.eyebrow":  "About Us",
    "about.title1":   "Who",
    "about.title2":   "We Are",
    "about.tagline":  "A team of builders, designers, and strategists turning bold ideas into world-class digital products.",
    "about.kicker":   "Our Story",
    "about.h2.1":     "Digital Expertise,",
    "about.h2.2":     "Real Results.",
    "about.desc":     "We are a digital agency focused on creating modern websites and mobile applications. Our goal is to help businesses grow through innovative technology, user-friendly design, and reliable development. Every project we take on is driven by purpose — not just pixels.",
    "about.stat1.v":  "50+", "about.stat1.l": "Projects Shipped",
    "about.stat2.v":  "30+", "about.stat2.l": "Happy Clients",
    "about.stat3.v":  "3+",  "about.stat3.l": "Years Experience",
    "about.grid.title1": "Our", "about.grid.title2": "Expertises",
    "about.exp1.title": "Web Development",
    "about.exp1.desc":  "Modern, fast, and scalable web applications built with cutting-edge technology.",
    "about.exp2.title": "Mobile Apps",
    "about.exp2.desc":  "Cross-platform mobile experiences that feel native on every device.",
    "about.exp3.title": "UI/UX Design",
    "about.exp3.desc":  "Beautiful, intuitive interfaces that users actually enjoy using.",
    "about.exp4.title": "AI Solutions",
    "about.exp4.desc":  "Smart integrations that automate and supercharge your product.",

    // Services
    "sv.eyebrow":    "What We Do",
    "sv.title1":     "Our",
    "sv.title2":     "Services",
    "sv.tagline":    "We design and build modern websites and mobile applications tailored to your business needs.",
    "sv.s1.title":   "Web Development",
    "sv.s1.sub":     "Full-stack Engineering",
    "sv.s1.desc":    "We build powerful web applications using modern technologies like React and Node.js — secure, scalable, and tailored to turn your idea into a real business.",
    "sv.s1.f1": "React / Next.js", "sv.s1.f2": "Node.js & APIs", "sv.s1.f3": "Database Design", "sv.s1.f4": "Cloud Deployment",
    "sv.s2.title":   "Mobile Development",
    "sv.s2.sub":     "iOS & Android Apps",
    "sv.s2.desc":    "We craft smooth, responsive mobile apps for iOS and Android using React Native — delivering a native experience with a single codebase.",
    "sv.s2.f1": "React Native", "sv.s2.f2": "Cross-Platform", "sv.s2.f3": "Push Notifications", "sv.s2.f4": "App Store Ready",
    "sv.s3.title":   "UI / UX Design",
    "sv.s3.sub":     "Interface & Experience",
    "sv.s3.desc":    "We design clean, intuitive interfaces that users love — focused on usability, visual harmony, and creating experiences that keep people coming back.",
    "sv.s3.f1": "Figma Prototypes", "sv.s3.f2": "Design Systems", "sv.s3.f3": "User Research", "sv.s3.f4": "Responsive UI",
    "sv.learn":      "Learn more",
    "sv.banner.title1": "Have a project in mind?",
    "sv.banner.title2": "Let's build it.",
    "sv.banner.sub": "Tell us your idea and we'll turn it into a high-performance digital product — fast, beautiful, and built to scale.",
    "sv.banner.btn": "Start a Project",

    // Contact
    "ct.eyebrow":  "Let's Talk",
    "ct.title1":   "Get in",
    "ct.title2":   "Touch",
    "ct.tagline":  "Let's discuss your project and bring your ideas to life.",
    "ct.ch.title": "Reach us anywhere",
    "ct.ch.sub":   "Pick the channel that works best for you — we're available across all platforms.",
    "ct.email.hint": "Reply within 24h",
    "ct.phone.hint": "Mon–Fri, 9am–6pm",
    "ct.ig.hint":    "DM us anytime",
    "ct.fb.hint":    "Message on Messenger",
    "ct.form.kicker": "Send a Message",
    "ct.form.title1": "Start a",
    "ct.form.title2": "conversation",
    "ct.form.sub":    "Fill out the form and we'll be in touch shortly.",
    "ct.name":       "Name",
    "ct.name.ph":    "Your name",
    "ct.email":      "Email",
    "ct.email.ph":   "your@email.com",
    "ct.msg":        "Message",
    "ct.msg.ph":     "Tell us about your project...",
    "ct.send":       "Send Message",
    "ct.sending":    "Sending…",
    "ct.success.title1": "Message",
    "ct.success.title2": "Sent!",
    "ct.success.sub": "Thanks for reaching out. We'll get back to you within 24 hours.",

    // Projects
    "pj.eyebrow":  "Portfolio",
    "pj.title1":   "Selected",
    "pj.title2":   "Work",
    "pj.tagline":  "A curated selection of products we've designed and built for our clients.",
    "pj.featured": "Featured Case Study",
    "pj.client":   "Client",
    "pj.year":     "Year",
    "pj.role":     "Role",
    "pj.live":     "Live Demo",
    "pj.github":   "GitHub",
    "pj.p1.title": "Tourism Platform",
    "pj.p1.desc":  "Discover the beauty of nature through responsible travel experiences that protect the environment and support local communities. Explore eco-friendly destinations, sustainable tours, and adventures designed to preserve our planet.",
    "pj.p1.role":  "Full Stack",
    "pj.p2.title": "E-Commerce Fashion Store",
    "pj.p2.desc":  "A full-featured online fashion store with product catalog, shopping cart, secure payment integration, and an admin dashboard for managing inventory, orders, and customers in real time.",
    "pj.p2.role":  "Full Stack",
    "pj.p3.title": "AI Resume Builder",
    "pj.p3.desc":  "A smart resume builder powered by AI that helps users generate professional resumes in seconds. Users answer a few questions and the platform crafts a tailored, ATS-friendly resume instantly.",
    "pj.p3.role":  "Frontend",

    // Footer
    "ft.brand.desc": "Tizart Agency is a modern digital agency helping startups and businesses build scalable, high-performance digital products.",
    "ft.nav":        "Navigation",
    "ft.services":   "Services",
    "ft.contact":    "Contact",
    "ft.cta.eyebrow": "Start a project",
    "ft.cta.title1":  "Have an idea?",
    "ft.cta.title2":  "Let's build it together.",
    "ft.cta.sub":     "Drop us a message and we'll get back to you within 24 hours.",
    "ft.cta.btn":     "Get in Touch",
    "ft.copy":        "Tizart Agency",
    "ft.madein":      "Built with pride in Algeria",
  },

  dz: {
    // NavBar
    "nav.home":       "الصفحة",
    "nav.about":      "علينا",
    "nav.services":   "خدماتنا",
    "nav.contact":    "تواصل",
    "nav.order":      "اطلب دابا",
    "nav.lang":       "EN",

    // Hero
    "hero.badge":     "وكالة رقمية · منذ 2024",
    "hero.title1":    "حوّل فكرتك",
    "hero.title2":    "لـ",
    "hero.teal":      "واقع!",
    "hero.sub":       "تيزارت — منصة لبناء الستارتوب",
    "hero.desc":      "تيزارت وكالة رقمية عصرية متخصصة في تطوير المواقع والتطبيقات والتصميم والذكاء الاصطناعي. كنعاونو الشركات الناشئة باش تحوّل أفكارها لمنتجات رقمية قوية.",
    "hero.cta1":      "ابدا دابا →",
    "hero.cta2":      "شوف المشاريع",
    "hero.stat1.val": "+50",
    "hero.stat1.lbl": "مشروع منجز",
    "hero.stat2.val": "98%",
    "hero.stat2.lbl": "رضا العملاء",
    "hero.stat3.val": "4×",
    "hero.stat3.lbl": "متوسط العائد",

    // About
    "about.eyebrow":  "علينا",
    "about.title1":   "شكون",
    "about.title2":   "حنا؟",
    "about.tagline":  "فريق من المطورين والمصممين والاستراتيجيين يحوّلون الأفكار لمنتجات رقمية عالمية.",
    "about.kicker":   "قصتنا",
    "about.h2.1":     "خبرة رقمية،",
    "about.h2.2":     "نتائج حقيقية.",
    "about.desc":     "وكالة رقمية متخصصة في بناء مواقع وتطبيقات عصرية. هدفنا هو مساعدة الشركات على النمو من خلال التكنولوجيا والتصميم. كل مشروع نديروه عندو غاية — مش غير بيكسلات.",
    "about.stat1.v":  "+50", "about.stat1.l": "مشروع منجز",
    "about.stat2.v":  "+30", "about.stat2.l": "عميل راضي",
    "about.stat3.v":  "+3",  "about.stat3.l": "سنوات خبرة",
    "about.grid.title1": "خدماتنا", "about.grid.title2": "",
    "about.exp1.title": "تطوير الويب",
    "about.exp1.desc":  "تطبيقات ويب عصرية وسريعة وقابلة للتوسع مبنية بأحدث التقنيات.",
    "about.exp2.title": "تطبيقات الموبايل",
    "about.exp2.desc":  "تجارب موبايل متعددة المنصات تحس بيها كأنها أصلية في أي جهاز.",
    "about.exp3.title": "تصميم UI/UX",
    "about.exp3.desc":  "واجهات جميلة وسهلة الاستخدام يحبها المستخدمون.",
    "about.exp4.title": "حلول الذكاء الاصطناعي",
    "about.exp4.desc":  "تكاملات ذكية تتمتع بالأتمتة وتطوير منتجاتك.",

    // Services
    "sv.eyebrow":    "واش كنديرو",
    "sv.title1":     "خدماتنا",
    "sv.title2":     "",
    "sv.tagline":    "كنصمّمو ونبنيو مواقع وتطبيقات عصرية مخصصة لاحتياجات عملك.",
    "sv.s1.title":   "تطوير الويب",
    "sv.s1.sub":     "هندسة متكاملة",
    "sv.s1.desc":    "كنبنيو تطبيقات ويب قوية بتقنيات عصرية كـ React و Node.js — آمنة وقابلة للتوسع.",
    "sv.s1.f1": "React / Next.js", "sv.s1.f2": "Node.js و APIs", "sv.s1.f3": "تصميم قاعدة البيانات", "sv.s1.f4": "النشر السحابي",
    "sv.s2.title":   "تطوير الموبايل",
    "sv.s2.sub":     "iOS و Android",
    "sv.s2.desc":    "كنصنعو تطبيقات موبايل سلسة لـ iOS و Android باستخدام React Native.",
    "sv.s2.f1": "React Native", "sv.s2.f2": "متعدد المنصات", "sv.s2.f3": "الإشعارات الفورية", "sv.s2.f4": "جاهز للمتجر",
    "sv.s3.title":   "تصميم UI/UX",
    "sv.s3.sub":     "الواجهة والتجربة",
    "sv.s3.desc":    "كنصمّمو واجهات نظيفة وسهلة يحبها المستخدمون — مع التركيز على التجربة الجمالية.",
    "sv.s3.f1": "نماذج Figma", "sv.s3.f2": "أنظمة التصميم", "sv.s3.f3": "أبحاث المستخدم", "sv.s3.f4": "واجهة متجاوبة",
    "sv.learn":      "شوف أكثر",
    "sv.banner.title1": "عندك مشروع؟",
    "sv.banner.title2": "خليناه يبدا.",
    "sv.banner.sub": "قلنا على فكرتك وغادي نحوّلوها لمنتج رقمي قوي — سريع، جميل، وقابل للنمو.",
    "sv.banner.btn": "ابدا مشروع",

    // Contact
    "ct.eyebrow":  "تواصل معانا",
    "ct.title1":   "كلمنا",
    "ct.title2":   "",
    "ct.tagline":  "خليناه نناقشو مشروعك ونجيبو أفكارك للحياة.",
    "ct.ch.title": "لقونا فين ما كنتي",
    "ct.ch.sub":   "اختار القناة اللي تناسبك — متواجدين في كل المنصات.",
    "ct.email.hint": "نرد خلال 24 ساعة",
    "ct.phone.hint": "الاثنين–الجمعة، 9ص–6م",
    "ct.ig.hint":    "راسلنا وقتاش ما كان",
    "ct.fb.hint":    "راسلنا على ماسنجر",
    "ct.form.kicker": "ابعت رسالة",
    "ct.form.title1": "ابدا",
    "ct.form.title2": "محادثة",
    "ct.form.sub":    "عبي الفورم وغادي نتواصلو معك بزاف بسرعة.",
    "ct.name":       "الاسم",
    "ct.name.ph":    "اسمك",
    "ct.email":      "الإيميل",
    "ct.email.ph":   "إيميلك@مثال.com",
    "ct.msg":        "الرسالة",
    "ct.msg.ph":     "قلنا على مشروعك...",
    "ct.send":       "ابعت الرسالة",
    "ct.sending":    "كيتبعت…",
    "ct.success.title1": "الرسالة",
    "ct.success.title2": "وصلت!",
    "ct.success.sub": "شكراً على التواصل. غادي نرجعو ليك خلال 24 ساعة.",

    // Projects
    "pj.eyebrow":  "المشاريع",
    "pj.title1":   "أعمالنا",
    "pj.title2":   "المختارة",
    "pj.tagline":  "مجموعة مختارة من المنتجات اللي صممناها وبنيناها لعملائنا.",
    "pj.featured": "دراسة حالة مميزة",
    "pj.client":   "العميل",
    "pj.year":     "السنة",
    "pj.role":     "الدور",
    "pj.live":     "العرض المباشر",
    "pj.github":   "GitHub",
    "pj.p1.title": "منصة السياحة",
    "pj.p1.desc":  "اكتشف جمال الطبيعة من خلال تجارب سفر مسؤولة تحمي البيئة وتدعم المجتمعات المحلية. استكشف وجهات صديقة للبيئة وجولات مستدامة ومغامرات مصممة للحفاظ على كوكبنا.",
    "pj.p1.role":  "فول ستاك",
    "pj.p2.title": "متجر الأزياء الإلكتروني",
    "pj.p2.desc":  "متجر أزياء إلكتروني متكامل مع كتالوج المنتجات وسلة التسوق ودفع آمن ولوحة تحكم للمسير.",
    "pj.p2.role":  "فول ستاك",
    "pj.p3.title": "صانع السيرة الذاتية بالذكاء الاصطناعي",
    "pj.p3.desc":  "أداة ذكية تساعد المستخدمين على إنشاء سير ذاتية احترافية في ثواني بمساعدة الذكاء الاصطناعي.",
    "pj.p3.role":  "فرونتند",

    // Footer
    "ft.brand.desc": "تيزارت وكالة رقمية عصرية تساعد الشركات الناشئة على بناء منتجات رقمية قوية وقابلة للتوسع.",
    "ft.nav":        "التنقل",
    "ft.services":   "الخدمات",
    "ft.contact":    "التواصل",
    "ft.cta.eyebrow": "ابدا مشروع",
    "ft.cta.title1":  "عندك فكرة؟",
    "ft.cta.title2":  "خليناها تتحقق معاً.",
    "ft.cta.sub":     "ابعتلنا رسالة وغادي نرجعو ليك خلال 24 ساعة.",
    "ft.cta.btn":     "تواصل معانا",
    "ft.copy":        "وكالة تيزارت",
    "ft.madein":      "صنعنا بفخر في الجزائر",
  },
};

// ─── Context ─────────────────────────────────────────────────
export const LangContext = createContext<LangContextValue>({
  lang: "en",
  toggleLang: () => {},
  t: (k) => k,
});

export const useLang = () => useContext(LangContext);

// ─── Provider ────────────────────────────────────────────────
export const LangProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLang] = useState<Lang>(() => {
    return (localStorage.getItem("tizart-lang") as Lang) || "en";
  });

  useEffect(() => {
    localStorage.setItem("tizart-lang", lang);
    // RTL for Darija Arabic
    document.documentElement.setAttribute("dir", lang === "dz" ? "rtl" : "ltr");
    document.documentElement.setAttribute("lang", lang === "dz" ? "ar" : "en");
  }, [lang]);

  const toggleLang = () => setLang((prev) => (prev === "en" ? "dz" : "en"));
  const t = (key: string): string => translations[lang][key] ?? translations["en"][key] ?? key;

  return (
    <LangContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LangContext.Provider>
  );
};