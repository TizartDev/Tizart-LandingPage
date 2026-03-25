import { useEffect, useRef } from "react";
import { useLang } from "./Languagecontext";
import './Hero.css';

export default function Hero() {
  const { t, lang } = useLang();
  const logoRef = useRef<HTMLDivElement>(null);
  const isRtl = lang === "dz";

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!logoRef.current) return;
      const { innerWidth: w, innerHeight: h } = window;
      const x = (e.clientX / w - 0.5) * 20;
      const y = (e.clientY / h - 0.5) * 14;
      logoRef.current.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      <div className="tz-page" dir={isRtl ? "rtl" : "ltr"}>
        <div className="tz-grid" />
        <div className="tz-orb tz-orb-1" />
        <div className="tz-orb tz-orb-2" />
        <div className="tz-orb tz-orb-3" />

        <section className="tz-hero">
          <div className="tz-left">
            <div className="tz-badge">
              <span className="badge-dot" />
              {t("hero.badge")}
            </div>

            <h1 className="tz-h1">
              {t("hero.title1")}<br />
              {t("hero.title2")}{" "}
              <span className="tz-teal">{t("hero.teal")}</span>
            </h1>

            <p className="tz-sub2">{t("hero.sub")}</p>
            <p className="tz-desc">{t("hero.desc")}</p>

            <div className="tz-cta">
              <button className="btn btn-primary">{t("hero.cta1")}</button>
              <button className="btn btn-outline">{t("hero.cta2")}</button>
            </div>

            <div className="tz-stats">
              {[
                { v: t("hero.stat1.val"), l: t("hero.stat1.lbl") },
                { v: t("hero.stat2.val"), l: t("hero.stat2.lbl") },
                { v: t("hero.stat3.val"), l: t("hero.stat3.lbl") },
              ].map((s) => (
                <div key={s.l}>
                  <div className="stat-val">{s.v}</div>
                  <div className="stat-lbl">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="tz-right">
            <div className="tz-ring-spin tz-ring-spin-1" />
            <div className="tz-ring-spin tz-ring-spin-2" />
            <div className="tz-ring-spin tz-ring-spin-3" />
            <div className="tz-logo-glow" />
            <div className="tz-logo-wrap">
              <div className="tz-logo-inner" ref={logoRef}>
                <img src="/Images/Logo.png" className="tz-logo-img" alt="Tizart" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}