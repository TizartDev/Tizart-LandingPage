import { useEffect, useRef, useState } from "react";
import { TbWorld, TbBrain } from "react-icons/tb";
import { MdPhoneIphone } from "react-icons/md";
import { HiOutlinePaintBrush } from "react-icons/hi2";
import { FiArrowRight, FiMapPin } from "react-icons/fi";
import { useLang } from "./Languagecontext";

const expertiseIcons = [
  <TbWorld size={22} color="var(--text-teal)" />,
  <MdPhoneIphone size={22} color="var(--text-teal)" />,
  <HiOutlinePaintBrush size={22} color="var(--text-teal)" />,
  <TbBrain size={22} color="var(--text-teal)" />,
];

const useInView = (threshold = 0.08) => {
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

const About = () => {
  const { ref: sectionRef, visible } = useInView();
  const { t, lang } = useLang();
  const isRtl = lang === "dz";

  const expertise = [
    { icon: expertiseIcons[0], title: t("about.exp1.title"), desc: t("about.exp1.desc") },
    { icon: expertiseIcons[1], title: t("about.exp2.title"), desc: t("about.exp2.desc") },
    { icon: expertiseIcons[2], title: t("about.exp3.title"), desc: t("about.exp3.desc") },
    { icon: expertiseIcons[3], title: t("about.exp4.title"), desc: t("about.exp4.desc") },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        .ab-section {
          font-family: 'DM Sans', sans-serif;
          background: var(--bg-page);
          color: var(--text-primary);
          padding: 100px 64px;
          position: relative; overflow: hidden;
        }
        .ab-bg-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(var(--grid-line) 1px, transparent 1px),
            linear-gradient(90deg, var(--grid-line) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }
        .ab-orb { position: absolute; border-radius: 50%; filter: blur(100px); pointer-events: none; }
        .ab-orb-1 { width: 480px; height: 480px; background: radial-gradient(circle, var(--orb-1) 0%, transparent 70%); top: -80px; right: -80px; }
        .ab-orb-2 { width: 360px; height: 360px; background: radial-gradient(circle, var(--orb-2) 0%, transparent 70%); bottom: -60px; left: -60px; }

        .ab-header { text-align: center; margin-bottom: 72px; position: relative; z-index: 1; }

        .ab-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(0,222,217,.08); border: 1px solid var(--border-mid);
          border-radius: 100px; padding: 6px 16px;
          font-size: 11px; font-weight: 500; color: var(--text-teal);
          letter-spacing: .1em; text-transform: uppercase; margin-bottom: 20px;
          opacity: 0; transform: translateY(20px);
          transition: opacity .6s, transform .6s;
        }
        .ab-eyebrow.in { opacity: 1; transform: translateY(0); }
        .ab-eyebrow-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--text-teal); animation: abDot 2s ease-in-out infinite; }
        @keyframes abDot { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:.3; transform:scale(.5); } }

        .ab-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(36px, 4.5vw, 64px); font-weight: 800;
          letter-spacing: -2px; line-height: 1.0; margin-bottom: 16px;
          opacity: 0; transform: translateY(24px);
          transition: opacity .7s .12s, transform .7s .12s;
          color: var(--text-primary);
        }
        .ab-title.in { opacity: 1; transform: translateY(0); }
        .ab-title-teal { color: var(--text-teal); position: relative; display: inline-block; }
        .ab-title-teal::after {
          content: ''; position: absolute; left: 0; bottom: -4px;
          width: 0; height: 3px;
          background: linear-gradient(90deg, var(--text-teal), transparent);
          border-radius: 2px;
          transition: width 1s .9s cubic-bezier(.16,1,.3,1);
        }
        .ab-title-teal.in::after { width: 100%; }

        .ab-tagline {
          font-size: 17px; color: var(--text-secondary);
          max-width: 520px; margin: 0 auto; line-height: 1.7;
          opacity: 0; transform: translateY(20px);
          transition: opacity .7s .22s, transform .7s .22s;
        }
        .ab-tagline.in { opacity: 1; transform: translateY(0); }

        .ab-card {
          position: relative; z-index: 1;
          display: flex; align-items: stretch;
          background: var(--bg-card);
          border: 1px solid var(--border-subtle);
          border-radius: 24px; overflow: hidden; margin-bottom: 56px;
          opacity: 0; transform: translateY(36px);
          transition: opacity .8s .1s, transform .8s .1s;
        }
        .ab-card.in { opacity: 1; transform: translateY(0); }

        .ab-img-wrap { flex: 0 0 46%; position: relative; overflow: hidden; min-height: 460px; }
        .ab-img-wrap::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(90deg, transparent 60%, var(--bg-page) 100%),
                      linear-gradient(0deg, rgba(4,15,18,.4) 0%, transparent 40%);
          pointer-events: none;
        }
        .ab-img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 8s ease; }
        .ab-card:hover .ab-img { transform: scale(1.04); }

        .ab-img-label {
          position: absolute; bottom: 28px; left: 28px; z-index: 2;
          background: rgba(4,15,18,.78); border: 1px solid var(--border-mid);
          backdrop-filter: blur(12px); border-radius: 12px; padding: 12px 16px;
          display: flex; align-items: center; gap: 10px;
        }
        .ab-label-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--text-teal); box-shadow: 0 0 8px rgba(0,222,217,.8); animation: abDot 1.8s ease-in-out infinite; flex-shrink: 0; }
        .ab-label-text { font-size: 12px; font-weight: 500; color: #e8f4f6; line-height: 1.3; }
        .ab-label-sub { font-size: 10px; color: rgba(0,222,217,.7); margin-top: 1px; }

        .ab-text-side { flex: 1; padding: 52px 52px 52px 48px; display: flex; flex-direction: column; justify-content: center; gap: 20px; }
        .ab-kicker { font-size: 11px; font-weight: 500; color: var(--text-teal); letter-spacing: .1em; text-transform: uppercase; }
        .ab-text-h2 { font-family: 'Syne', sans-serif; font-size: clamp(26px, 3vw, 40px); font-weight: 800; letter-spacing: -1px; line-height: 1.1; color: var(--text-primary); }
        .ab-text-h2 span { color: var(--text-teal); }
        .ab-text-p { font-size: 16px; line-height: 1.78; color: var(--text-secondary); max-width: 440px; }
        .ab-divider { width: 48px; height: 3px; background: linear-gradient(90deg, var(--text-teal), transparent); border-radius: 2px; }

        .ab-mini-stats { display: flex; gap: 28px; padding-top: 20px; border-top: 1px solid var(--border-subtle); margin-top: 4px; }
        .ab-stat-val { font-family: 'Syne', sans-serif; font-size: 24px; font-weight: 700; color: var(--text-teal); line-height: 1; }
        .ab-stat-lbl { font-size: 11px; color: var(--text-muted); margin-top: 4px; letter-spacing: .04em; }

        .ab-grid-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(22px, 2.8vw, 34px); font-weight: 800; letter-spacing: -1px;
          text-align: center; margin-bottom: 36px;
          position: relative; z-index: 1; color: var(--text-primary);
          opacity: 0; transform: translateY(20px);
          transition: opacity .7s .05s, transform .7s .05s;
        }
        .ab-grid-title.in { opacity: 1; transform: translateY(0); }
        .ab-grid-title span { color: var(--text-teal); }

        .ab-exp-grid { position: relative; z-index: 1; display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }

        .ab-exp-card {
          background: var(--bg-card); border: 1px solid var(--border-subtle);
          border-radius: 16px; padding: 28px 22px;
          display: flex; flex-direction: column; gap: 14px;
          transition: border-color .25s, transform .25s, box-shadow .25s, background .25s;
          cursor: default; opacity: 0; transform: translateY(32px);
        }
        .ab-exp-card.in { opacity: 1; transform: translateY(0); }
        .ab-exp-card:hover { border-color: var(--border-strong); transform: translateY(-5px); box-shadow: var(--shadow-card); background: var(--bg-card-hover); }

        .ab-exp-icon-wrap {
          width: 44px; height: 44px; border-radius: 12px;
          background: rgba(0,222,217,.1); border: 1px solid var(--border-mid);
          display: flex; align-items: center; justify-content: center;
          transition: background .25s, box-shadow .25s;
        }
        .ab-exp-card:hover .ab-exp-icon-wrap { background: rgba(0,222,217,.18); box-shadow: 0 0 16px rgba(0,222,217,.3); }
        .ab-exp-title { font-family: 'Syne', sans-serif; font-size: 15px; font-weight: 700; color: var(--text-primary); letter-spacing: -.2px; }
        .ab-exp-desc { font-size: 13px; line-height: 1.65; color: var(--text-secondary); }
        .ab-exp-arrow { margin-top: auto; color: var(--border-mid); display: flex; align-items: center; transition: color .2s, transform .2s; }
        .ab-exp-card:hover .ab-exp-arrow { color: var(--text-teal); transform: translateX(5px); }

        @media (max-width: 1024px) { .ab-exp-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 768px) {
          .ab-section { padding: 72px 24px; }
          .ab-card { flex-direction: column; }
          .ab-img-wrap { flex: unset; min-height: 240px; }
          .ab-img-wrap::after { background: linear-gradient(0deg, var(--bg-page) 0%, transparent 50%); }
          .ab-text-side { padding: 32px 24px; }
          .ab-exp-grid { grid-template-columns: 1fr; }
          .ab-mini-stats { gap: 16px; }
        }
      `}</style>

      <section className="ab-section" ref={sectionRef} dir={isRtl ? "rtl" : "ltr"}>
        <div className="ab-bg-grid" />
        <div className="ab-orb ab-orb-1" />
        <div className="ab-orb ab-orb-2" />

        <div className="ab-header">
          <div className={`ab-eyebrow${visible ? " in" : ""}`}>
            <span className="ab-eyebrow-dot" />
            {t("about.eyebrow")}
          </div>
          <h1 className={`ab-title${visible ? " in" : ""}`}>
            {t("about.title1")}{" "}
            <span className={`ab-title-teal${visible ? " in" : ""}`}>{t("about.title2")}</span>
          </h1>
          <p className={`ab-tagline${visible ? " in" : ""}`}>{t("about.tagline")}</p>
        </div>

        <div className={`ab-card${visible ? " in" : ""}`}>
          <div className="ab-img-wrap">
            <img className="ab-img" src="./src/Pictures/business.jpg" alt="Tizart team" />
            <div className="ab-img-label">
              <span className="ab-label-dot" />
              <div>
                <div className="ab-label-text">Est. 2024</div>
                <div style={{ display:"flex", alignItems:"center", gap:4 }}>
                  <FiMapPin size={10} color="rgba(0,222,217,.7)" />
                  <span className="ab-label-sub">Algiers, Algeria</span>
                </div>
              </div>
            </div>
          </div>

          <div className="ab-text-side">
            <div className="ab-kicker">{t("about.kicker")}</div>
            <div className="ab-divider" />
            <h2 className="ab-text-h2">
              {t("about.h2.1")}<br />
              <span>{t("about.h2.2")}</span>
            </h2>
            <p className="ab-text-p">{t("about.desc")}</p>
            <div className="ab-mini-stats">
              {[
                { v: t("about.stat1.v"), l: t("about.stat1.l") },
                { v: t("about.stat2.v"), l: t("about.stat2.l") },
                { v: t("about.stat3.v"), l: t("about.stat3.l") },
              ].map((s) => (
                <div key={s.l}>
                  <div className="ab-stat-val">{s.v}</div>
                  <div className="ab-stat-lbl">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <h2 className={`ab-grid-title${visible ? " in" : ""}`}>
          {t("about.grid.title1")} <span>{t("about.grid.title2")}</span>
        </h2>

        <div className="ab-exp-grid">
          {expertise.map((item, i) => (
            <div
              key={item.title}
              className={`ab-exp-card${visible ? " in" : ""}`}
              style={{ transitionDelay: visible ? `${0.12 + i * 0.1}s` : "0s" }}
            >
              <div className="ab-exp-icon-wrap">{item.icon}</div>
              <div className="ab-exp-title">{item.title}</div>
              <div className="ab-exp-desc">{item.desc}</div>
              <div className="ab-exp-arrow"><FiArrowRight size={18} /></div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default About;