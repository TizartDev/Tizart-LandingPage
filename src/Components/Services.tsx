import { useEffect, useRef, useState } from "react";
import { MdOutlineDeveloperMode } from "react-icons/md";
import { TbDeviceMobileCode } from "react-icons/tb";
import { FaLaptop } from "react-icons/fa";
import { FiArrowUpRight, FiCheck } from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi2";
import { useLang } from "./Languagecontext";

const serviceIcons = [
  <MdOutlineDeveloperMode size={28} />,
  <TbDeviceMobileCode size={28} />,
  <FaLaptop size={26} />,
];
const serviceImages = [
  "/Pictures/web-dev.webp",
  "/Pictures/mob-dev.webp",
  "/Pictures/ui-dev.webp",
];
const serviceIds = ["01", "02", "03"];
const serviceKeys = ["sv.s1", "sv.s2", "sv.s3"];

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

const Services = () => {
  const { ref: sectionRef, visible } = useInView();
  const { t, lang } = useLang();
  const isRtl = lang === "dz";

  const services = serviceKeys.map((k, i) => ({
    id: serviceIds[i],
    icon: serviceIcons[i],
    image: serviceImages[i],
    title: t(`${k}.title`),
    subtitle: t(`${k}.sub`),
    desc: t(`${k}.desc`),
    features: [t(`${k}.f1`), t(`${k}.f2`), t(`${k}.f3`), t(`${k}.f4`)],
  }));

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        .sv-section { font-family: 'DM Sans', sans-serif; background: var(--bg-page); color: var(--text-primary); padding: 100px 64px; position: relative; overflow: hidden; }
        .sv-bg-grid { position: absolute; inset: 0; background-image: linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px); background-size: 60px 60px; pointer-events: none; z-index: 0; }
        .sv-orb { position: absolute; border-radius: 50%; filter: blur(110px); pointer-events: none; z-index: 0; }
        .sv-orb-1 { width: 500px; height: 500px; background: radial-gradient(circle, var(--orb-1) 0%, transparent 70%); top: -100px; left: -100px; animation: svOrb 16s ease-in-out infinite alternate; }
        .sv-orb-2 { width: 400px; height: 400px; background: radial-gradient(circle, var(--orb-2) 0%, transparent 70%); bottom: -80px; right: -80px; animation: svOrb 20s 5s ease-in-out infinite alternate; }
        @keyframes svOrb { from { transform: translate(0,0) scale(1); } to { transform: translate(30px,-30px) scale(1.1); } }

        .sv-header { text-align: center; margin-bottom: 80px; position: relative; z-index: 1; }

        .sv-eyebrow { display: inline-flex; align-items: center; gap: 8px; background: rgba(0,222,217,.08); border: 1px solid var(--border-mid); border-radius: 100px; padding: 6px 16px; font-size: 11px; font-weight: 500; color: var(--text-teal); letter-spacing: .1em; text-transform: uppercase; margin-bottom: 20px; opacity: 0; transform: translateY(20px); transition: opacity .6s, transform .6s; }
        .sv-eyebrow.in { opacity: 1; transform: translateY(0); }
        .sv-eyebrow-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--text-teal); animation: svDot 2s ease-in-out infinite; }
        @keyframes svDot { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:.3; transform:scale(.5); } }

        .sv-title { font-family: 'Syne', sans-serif; font-size: clamp(36px, 4.5vw, 64px); font-weight: 800; letter-spacing: -2.5px; line-height: 1.0; margin-bottom: 18px; color: var(--text-primary); opacity: 0; transform: translateY(24px); transition: opacity .7s .12s, transform .7s .12s; }
        .sv-title.in { opacity: 1; transform: translateY(0); }
        .sv-title-teal { color: var(--text-teal); position: relative; display: inline-block; }
        .sv-title-teal::after { content: ''; position: absolute; left: 0; bottom: -5px; width: 0; height: 3px; background: linear-gradient(90deg, var(--text-teal), transparent); border-radius: 2px; transition: width 1s .9s cubic-bezier(.16,1,.3,1); }
        .sv-title-teal.in::after { width: 100%; }

        .sv-tagline { font-size: 17px; color: var(--text-secondary); max-width: 480px; margin: 0 auto; line-height: 1.7; opacity: 0; transform: translateY(18px); transition: opacity .7s .22s, transform .7s .22s; }
        .sv-tagline.in { opacity: 1; transform: translateY(0); }

        .sv-grid { position: relative; z-index: 1; display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; align-items: start; }

        .sv-card { position: relative; background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: 20px; overflow: hidden; display: flex; flex-direction: column; opacity: 0; transform: translateY(40px); transition: opacity .7s, transform .7s, border-color .3s, box-shadow .3s; }
        .sv-card.in { opacity: 1; transform: translateY(0); }
        .sv-card:hover { border-color: var(--border-strong); box-shadow: var(--shadow-card), 0 0 40px rgba(0,222,217,.06); }

        .sv-card-num { position: absolute; top: 16px; right: 18px; font-family: 'Syne', sans-serif; font-size: 11px; font-weight: 700; color: var(--border-mid); letter-spacing: .1em; z-index: 10; }

        .sv-img-wrap { position: relative; width: 100%; height: 200px; overflow: hidden; flex-shrink: 0; background: #0a1a1f; background-image: linear-gradient(90deg, #0a1a1f 0%, #0f2530 40%, #0a1a1f 80%); background-size: 200% 100%; animation: svShimmer 1.6s ease-in-out infinite; contain: layout paint; }
        .sv-img-wrap.loaded { animation: none; background: #0a1a1f; }
        @keyframes svShimmer { from { background-position: 200% 0; } to { background-position: -200% 0; } }
        .sv-img-wrap::after { content: ''; position: absolute; inset: 0; background: linear-gradient(180deg, transparent 30%, rgba(4,15,18,.7) 70%, rgba(4,15,18,.98) 100%); pointer-events: none; }
        .sv-img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .6s cubic-bezier(.4,0,.2,1), filter .6s ease; filter: brightness(.75) saturate(.9); will-change: transform; }
        .sv-card:hover .sv-img { transform: scale(1.05); filter: brightness(.88) saturate(1.05); }

        .sv-icon-wrap { position: absolute; bottom: -22px; left: 24px; z-index: 5; width: 52px; height: 52px; border-radius: 14px; background: var(--bg-page); border: 1px solid var(--border-mid); display: flex; align-items: center; justify-content: center; color: var(--text-teal); box-shadow: 0 0 20px rgba(0,222,217,.2); transition: box-shadow .3s, border-color .3s; }
        .sv-card:hover .sv-icon-wrap { box-shadow: 0 0 32px rgba(0,222,217,.45); border-color: var(--border-strong); }

        .sv-body { padding: 36px 24px 24px; display: flex; flex-direction: column; gap: 14px; flex: 1; }
        .sv-subtitle { font-size: 10px; font-weight: 500; color: var(--text-teal); letter-spacing: .1em; text-transform: uppercase; margin-top: 4px; }
        .sv-card-title { font-family: 'Syne', sans-serif; font-size: 20px; font-weight: 800; letter-spacing: -.5px; color: var(--text-primary); line-height: 1.1; }
        .sv-desc { font-size: 13.5px; line-height: 1.72; color: var(--text-secondary); }

        .sv-features { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 7px; padding-top: 10px; border-top: 1px solid var(--border-subtle); }
        .sv-feature-item { display: flex; align-items: center; gap: 8px; font-size: 12.5px; color: var(--text-secondary); }
        .sv-feature-check { width: 18px; height: 18px; border-radius: 50%; background: rgba(0,222,217,.1); border: 1px solid var(--border-mid); display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: var(--text-teal); transition: background .2s; }
        .sv-card:hover .sv-feature-check { background: rgba(0,222,217,.18); }

        .sv-cta { display: inline-flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 500; color: var(--text-teal); opacity: .7; cursor: pointer; margin-top: 4px; padding: 0; background: none; border: none; transition: color .2s, gap .2s, opacity .2s; }
        .sv-cta:hover { opacity: 1; gap: 10px; }
        .sv-cta-arrow { transition: transform .2s; }
        .sv-cta:hover .sv-cta-arrow { transform: translate(2px,-2px); }

        .sv-banner { position: relative; z-index: 1; margin-top: 56px; background: var(--bg-card-hover); border: 1px solid var(--border-subtle); border-radius: 20px; padding: 40px 52px; display: flex; align-items: center; justify-content: space-between; gap: 24px; overflow: hidden; opacity: 0; transform: translateY(28px); transition: opacity .7s .3s, transform .7s .3s; }
        .sv-banner.in { opacity: 1; transform: translateY(0); }
        .sv-banner::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(0,222,217,.04) 0%, transparent 60%); pointer-events: none; }

        .sv-banner-left { flex: 1; }
        .sv-banner-icon { color: var(--text-teal); margin-bottom: 10px; animation: svSparkle 3s ease-in-out infinite; }
        @keyframes svSparkle { 0%,100% { opacity:.7; transform:scale(1) rotate(0deg); } 50% { opacity:1; transform:scale(1.1) rotate(8deg); } }
        .sv-banner-title { font-family: 'Syne', sans-serif; font-size: clamp(18px, 2.5vw, 26px); font-weight: 800; letter-spacing: -.5px; color: var(--text-primary); margin-bottom: 8px; }
        .sv-banner-title span { color: var(--text-teal); }
        .sv-banner-sub { font-size: 14px; color: var(--text-secondary); max-width: 420px; line-height: 1.6; }

        .sv-banner-btn { flex-shrink: 0; display: inline-flex; align-items: center; gap: 8px; background: var(--text-teal); color: #040f12; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500; padding: 14px 28px; border-radius: 10px; border: none; cursor: pointer; position: relative; overflow: hidden; box-shadow: var(--shadow-btn); transition: transform .15s, box-shadow .25s; white-space: nowrap; }
        .sv-banner-btn::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(255,255,255,.18) 0%, transparent 55%); pointer-events: none; }
        .sv-banner-btn:hover { transform: translateY(-2px); box-shadow: 0 0 48px rgba(0,222,217,.5); }
        .sv-banner-btn:active { transform: scale(.97); }

        @media (max-width: 1024px) { .sv-grid { grid-template-columns: 1fr; max-width: 480px; margin: 0 auto; } .sv-banner { flex-direction: column; text-align: center; align-items: center; } .sv-banner-sub { max-width: 100%; } }
        @media (max-width: 768px) { .sv-section { padding: 72px 24px; } .sv-banner { padding: 32px 24px; } }
      `}</style>

      <section className="sv-section" ref={sectionRef} dir={isRtl ? "rtl" : "ltr"}>
        <div className="sv-bg-grid" />
        <div className="sv-orb sv-orb-1" />
        <div className="sv-orb sv-orb-2" />

        <div className="sv-header">
          <div className={`sv-eyebrow${visible ? " in" : ""}`}>
            <span className="sv-eyebrow-dot" />
            {t("sv.eyebrow")}
          </div>
          <h1 className={`sv-title${visible ? " in" : ""}`}>
            {t("sv.title1")}{t("sv.title2") ? " " : ""}
            <span className={`sv-title-teal${visible ? " in" : ""}`}>{t("sv.title2")}</span>
          </h1>
          <p className={`sv-tagline${visible ? " in" : ""}`}>{t("sv.tagline")}</p>
        </div>

        <div className="sv-grid">
          {services.map((svc, i) => (
            <div
              key={svc.id}
              className={`sv-card${visible ? " in" : ""}`}
              style={{ transitionDelay: visible ? `${0.1 + i * 0.15}s` : "0s" }}
            >
              <div className="sv-card-num">{svc.id}</div>
              <div
                className="sv-img-wrap"
                ref={(el) => { if (el) { const img = el.querySelector("img"); if (img?.complete) el.classList.add("loaded"); } }}
              >
                <img
                  className="sv-img" src={svc.image} alt={svc.title}
                  loading={i === 0 ? "eager" : "lazy"} decoding="async" width={480} height={200}
                  onLoad={(e) => (e.currentTarget.closest(".sv-img-wrap") as HTMLElement)?.classList.add("loaded") }
                />
                <div className="sv-icon-wrap">{svc.icon}</div>
              </div>
              <div className="sv-body">
                <div>
                  <div className="sv-subtitle">{svc.subtitle}</div>
                  <div className="sv-card-title">{svc.title}</div>
                </div>
                <p className="sv-desc">{svc.desc}</p>
                <ul className="sv-features">
                  {svc.features.map((f) => (
                    <li className="sv-feature-item" key={f}>
                      <span className="sv-feature-check"><FiCheck size={10} /></span>
                      {f}
                    </li>
                  ))}
                </ul>
                <button className="sv-cta">
                  {t("sv.learn")}
                  <span className="sv-cta-arrow"><FiArrowUpRight size={15} /></span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className={`sv-banner${visible ? " in" : ""}`}>
          <div className="sv-banner-left">
            <div className="sv-banner-icon"><HiOutlineSparkles size={28} /></div>
            <div className="sv-banner-title">
              {t("sv.banner.title1")} <span>{t("sv.banner.title2")}</span>
            </div>
            <div className="sv-banner-sub">{t("sv.banner.sub")}</div>
          </div>
          <button className="sv-banner-btn">
            {t("sv.banner.btn")} <FiArrowUpRight size={16} />
          </button>
        </div>
      </section>
    </>
  );
};

export default Services;