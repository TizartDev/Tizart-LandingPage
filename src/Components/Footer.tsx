import { useEffect, useRef, useState } from "react";
import { FaInstagram } from "react-icons/fa";
import { CiFacebook } from "react-icons/ci";
import { GrLinkedin } from "react-icons/gr";
import { MdEmail } from "react-icons/md";
import { IoCall } from "react-icons/io5";
import { FiMapPin, FiArrowUpRight, FiArrowUp } from "react-icons/fi";
import { useLang } from "./Languagecontext";

const socials = [
  { icon: <FaInstagram size={15} />, href: "#", label: "Instagram" },
  { icon: <CiFacebook size={15} />, href: "#", label: "Facebook" },
  { icon: <GrLinkedin size={15} />, href: "#", label: "LinkedIn" },
];

const useInView = (threshold = 0.05) => {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return { ref, visible };
};

const Footer = () => {
  const { ref: footerRef, visible } = useInView();
  const { t, lang } = useLang();
  const isRtl = lang === "dz";
  const year = new Date().getFullYear();
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const navLinks = [
    { label: t("nav.home"),     href: "/" },
    { label: t("nav.about"),    href: "/about" },
    { label: t("nav.services"), href: "/services" },
    { label: "Projects",        href: "/projects" },
    { label: t("nav.contact"),  href: "/contact" },
  ];

  const serviceLinks = [
    t("about.exp1.title"),
    t("about.exp2.title"),
    t("about.exp3.title"),
    t("about.exp4.title"),
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        .ft-footer { font-family: 'DM Sans', sans-serif; background: var(--bg-page); color: var(--text-primary); position: relative; overflow: hidden; }
        .ft-footer::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent 0%, var(--border-subtle) 20%, var(--text-teal) 50%, var(--border-subtle) 80%, transparent 100%); opacity: .5; }

        .ft-bg-grid { position: absolute; inset: 0; background-image: radial-gradient(circle, var(--grid-line) 1px, transparent 1px); background-size: 36px 36px; pointer-events: none; z-index: 0; opacity: .4; }
        .ft-orb { position: absolute; border-radius: 50%; filter: blur(100px); pointer-events: none; z-index: 0; }
        .ft-orb-1 { width: 400px; height: 400px; background: radial-gradient(circle, var(--orb-1) 0%, transparent 70%); bottom: -80px; left: -80px; }
        .ft-orb-2 { width: 300px; height: 300px; background: radial-gradient(circle, var(--orb-2) 0%, transparent 70%); top: -60px; right: -60px; }

        .ft-cta-band { position: relative; z-index: 1; margin: 0 72px; padding: 52px 60px; background: var(--bg-card-hover); border: 1px solid var(--border-subtle); border-radius: 24px; display: flex; align-items: center; justify-content: space-between; gap: 32px; transform: translateY(-50%); overflow: hidden; opacity: 0; transition: opacity .8s .1s; }
        .ft-cta-band.in { opacity: 1; }
        .ft-cta-band::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(0,222,217,.04) 0%, transparent 55%); pointer-events: none; }

        .ft-cta-eyebrow { font-size: 10px; font-weight: 500; color: var(--text-teal); letter-spacing: .12em; text-transform: uppercase; margin-bottom: 10px; display: flex; align-items: center; gap: 8px; }
        .ft-cta-eyebrow::before { content: ''; width: 20px; height: 1px; background: var(--text-teal); opacity: .6; }
        .ft-cta-title { font-family: 'Syne', sans-serif; font-size: clamp(22px, 2.8vw, 36px); font-weight: 800; letter-spacing: -1.5px; color: var(--text-primary); line-height: 1.1; }
        .ft-cta-title span { color: var(--text-teal); }
        .ft-cta-sub { font-size: 14px; color: var(--text-secondary); margin-top: 8px; max-width: 380px; line-height: 1.6; }

        .ft-cta-btn { display: inline-flex; align-items: center; gap: 8px; padding: 14px 28px; border-radius: 10px; background: var(--text-teal); color: #040f12; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 600; border: none; cursor: pointer; flex-shrink: 0; position: relative; overflow: hidden; box-shadow: var(--shadow-btn); transition: transform .15s, box-shadow .22s; text-decoration: none; white-space: nowrap; }
        .ft-cta-btn::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(255,255,255,.2) 0%, transparent 55%); pointer-events: none; }
        .ft-cta-btn:hover { transform: translateY(-2px); box-shadow: 0 0 48px rgba(0,222,217,.5); }
        .ft-cta-btn:active { transform: scale(.97); }

        .ft-body { position: relative; z-index: 1; padding: 0 72px 60px; }

        .ft-grid { display: grid; grid-template-columns: 1.6fr 1fr 1fr 1.2fr; gap: 48px; padding-bottom: 48px; border-bottom: 1px solid var(--border-subtle); }

        .ft-brand { opacity: 0; transform: translateY(24px); transition: opacity .7s .1s, transform .7s .1s; }
        .ft-brand.in { opacity: 1; transform: translateY(0); }
        .ft-logo { height: 36px; width: auto; filter: drop-shadow(0 0 8px rgba(0,222,217,.3)); margin-bottom: 18px; display: block; }
        .ft-brand-desc { font-size: 13.5px; line-height: 1.75; color: var(--text-secondary); max-width: 260px; margin-bottom: 22px; }
        .ft-socials { display: flex; gap: 8px; }
        .ft-social-btn { width: 36px; height: 36px; border-radius: 9px; background: var(--bg-card); border: 1px solid var(--border-subtle); display: flex; align-items: center; justify-content: center; color: var(--text-secondary); text-decoration: none; transition: background .2s, border-color .2s, color .2s, transform .15s; }
        .ft-social-btn:hover { background: rgba(0,222,217,.1); border-color: var(--border-strong); color: var(--text-teal); transform: translateY(-3px); }

        .ft-col { opacity: 0; transform: translateY(24px); transition: opacity .7s, transform .7s; }
        .ft-col.in { opacity: 1; transform: translateY(0); }
        .ft-col-title { font-size: 10px; font-weight: 600; color: var(--text-teal); opacity: .7; letter-spacing: .12em; text-transform: uppercase; margin-bottom: 20px; display: flex; align-items: center; gap: 8px; }
        .ft-col-title::after { content: ''; flex: 1; height: 1px; background: var(--border-subtle); }

        .ft-nav-link { display: flex; align-items: center; gap: 6px; font-size: 13.5px; color: var(--text-secondary); text-decoration: none; padding: 4px 0; transition: color .2s, gap .2s; width: fit-content; }
        .ft-nav-link:hover { color: var(--text-primary); gap: 10px; }
        .ft-nav-arrow { color: transparent; transition: color .2s, transform .2s; font-size: 10px; }
        .ft-nav-link:hover .ft-nav-arrow { color: var(--text-teal); transform: translateX(2px); }
        .ft-nav-links { display: flex; flex-direction: column; }

        .ft-contact-item { display: flex; align-items: flex-start; gap: 10px; margin-bottom: 14px; }
        .ft-contact-icon { width: 30px; height: 30px; border-radius: 8px; background: rgba(0,222,217,.08); border: 1px solid var(--border-subtle); display: flex; align-items: center; justify-content: center; color: var(--text-teal); flex-shrink: 0; margin-top: 1px; }
        .ft-contact-label { font-size: 10px; font-weight: 500; color: var(--text-teal); opacity: .6; letter-spacing: .08em; text-transform: uppercase; margin-bottom: 2px; }
        .ft-contact-value { font-size: 13px; color: var(--text-secondary); }

        .ft-bottom { position: relative; z-index: 1; display: flex; align-items: center; justify-content: space-between; gap: 16px; padding-top: 24px; opacity: 0; transform: translateY(12px); transition: opacity .6s .4s, transform .6s .4s; }
        .ft-bottom.in { opacity: 1; transform: translateY(0); }
        .ft-copy { font-size: 12px; color: var(--text-muted); letter-spacing: .02em; }
        .ft-copy span { color: var(--text-teal); opacity: .7; }
        .ft-made-in { display: flex; align-items: center; gap: 6px; font-size: 12px; color: var(--text-muted); }
        .ft-scroll-top { width: 36px; height: 36px; border-radius: 9px; background: var(--bg-card); border: 1px solid var(--border-subtle); display: flex; align-items: center; justify-content: center; color: var(--text-teal); cursor: pointer; transition: background .2s, border-color .2s, transform .15s; }
        .ft-scroll-top:hover { background: rgba(0,222,217,.12); border-color: var(--border-strong); transform: translateY(-3px); }

        @media (max-width: 1100px) { .ft-grid { grid-template-columns: 1fr 1fr; } .ft-cta-band { margin: 0 32px; padding: 36px 32px; } .ft-body { padding: 0 32px 48px; } }
        @media (max-width: 768px) { .ft-grid { grid-template-columns: 1fr; gap: 32px; } .ft-cta-band { flex-direction: column; align-items: flex-start; margin: 0 20px; padding: 28px 24px; } .ft-body { padding: 0 20px 40px; } .ft-bottom { flex-wrap: wrap; gap: 12px; } }
      `}</style>

      <footer className="ft-footer" ref={footerRef} dir={isRtl ? "rtl" : "ltr"}>
        <div className="ft-bg-grid" />
        <div className="ft-orb ft-orb-1" />
        <div className="ft-orb ft-orb-2" />

        <div className={`ft-cta-band${visible ? " in" : ""}`}>
          <div className="ft-cta-left">
            <div className="ft-cta-eyebrow">{t("ft.cta.eyebrow")}</div>
            <div className="ft-cta-title">
              {t("ft.cta.title1")}<br />
              <span>{t("ft.cta.title2")}</span>
            </div>
            <div className="ft-cta-sub">{t("ft.cta.sub")}</div>
          </div>
          <a href="/contact" className="ft-cta-btn">
            {t("ft.cta.btn")} <FiArrowUpRight size={15} />
          </a>
        </div>

        <div className="ft-body">
          <div className="ft-grid">

            <div className={`ft-brand${visible ? " in" : ""}`}>
              <img src="./src/Pictures/tizart.png" className="ft-logo" alt="Tizart" />
              <p className="ft-brand-desc">{t("ft.brand.desc")}</p>
              <div className="ft-socials">
                {socials.map((s) => (
                  <a key={s.label} href={s.href} className="ft-social-btn" aria-label={s.label}>{s.icon}</a>
                ))}
              </div>
            </div>

            <div className={`ft-col${visible ? " in" : ""}`} style={{ transitionDelay: visible ? ".18s" : "0s" }}>
              <div className="ft-col-title">{t("ft.nav")}</div>
              <div className="ft-nav-links">
                {navLinks.map((link) => (
                  <a key={link.label} href={link.href} className="ft-nav-link">
                    <span className="ft-nav-arrow">›</span>
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            <div className={`ft-col${visible ? " in" : ""}`} style={{ transitionDelay: visible ? ".26s" : "0s" }}>
              <div className="ft-col-title">{t("ft.services")}</div>
              <div className="ft-nav-links">
                {serviceLinks.map((s) => (
                  <a key={s} href="#" className="ft-nav-link">
                    <span className="ft-nav-arrow">›</span>
                    {s}
                  </a>
                ))}
              </div>
            </div>

            <div className={`ft-col${visible ? " in" : ""}`} style={{ transitionDelay: visible ? ".34s" : "0s" }}>
              <div className="ft-col-title">{t("ft.contact")}</div>
              <div className="ft-contact-item">
                <div className="ft-contact-icon"><MdEmail size={13} /></div>
                <div>
                  <div className="ft-contact-label">Email</div>
                  <div className="ft-contact-value">contact@tizart.dev</div>
                </div>
              </div>
              <div className="ft-contact-item">
                <div className="ft-contact-icon"><IoCall size={13} /></div>
                <div>
                  <div className="ft-contact-label">Phone</div>
                  <div className="ft-contact-value">+213 5 62 74 31 35</div>
                </div>
              </div>
              <div className="ft-contact-item">
                <div className="ft-contact-icon"><FiMapPin size={13} /></div>
                <div>
                  <div className="ft-contact-label">Location</div>
                  <div className="ft-contact-value">Constantine, Algeria</div>
                </div>
              </div>
            </div>

          </div>

          <div className={`ft-bottom${visible ? " in" : ""}`}>
            <p className="ft-copy">© {year} <span>{t("ft.copy")}</span>. All rights reserved.</p>
            <div className="ft-made-in">🇩🇿 {t("ft.madein")}</div>
            <button className="ft-scroll-top" onClick={scrollToTop} aria-label="Scroll to top">
              <FiArrowUp size={15} />
            </button>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;