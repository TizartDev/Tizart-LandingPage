import { useEffect, useRef, useState } from "react";
import { TbWorld, TbBrain } from "react-icons/tb";
import { MdPhoneIphone } from "react-icons/md";
import { HiOutlinePaintBrush } from "react-icons/hi2";
import { FiArrowRight, FiMapPin } from "react-icons/fi";
import { useLang } from "./Languagecontext";
import './About.css';

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
            <img className="ab-img" src="/Images/business.webp" alt="Tizart team" loading="lazy" />
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