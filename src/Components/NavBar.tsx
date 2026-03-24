import { useEffect, useState } from "react";
import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi2";
import { TbLanguage } from "react-icons/tb";
import { useTheme } from "./ThemeContext";
import { useLang } from "./Languagecontext";

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLang, t } = useLang();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isRtl = lang === "dz";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@400;500&display=swap');

        .tz-nav-wrap {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 1000;
          padding: 0 48px;
          height: 68px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid transparent;
          animation: navSlideIn .7s cubic-bezier(.16,1,.3,1) both;
          transition: background .4s, border-color .4s, box-shadow .4s;
        }

        @keyframes navSlideIn {
          from { opacity: 0; transform: translateY(-24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .tz-nav-wrap.scrolled {
          background: var(--nav-bg);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom-color: var(--nav-border);
          box-shadow: 0 4px 32px rgba(0,0,0,.15);
        }

        /* Logo */
        .tz-nav-logo {
          display: flex; align-items: center;
          text-decoration: none;
          opacity: 0;
          animation: fadeInLeft .7s .15s cubic-bezier(.16,1,.3,1) forwards;
          flex-shrink: 0;
        }
        .tz-nav-logo img {
          height: 36px; width: auto;
          filter: drop-shadow(0 0 8px rgba(0,222,217,.35));
          transition: filter .3s, transform .3s;
        }
        .tz-nav-logo:hover img {
          filter: drop-shadow(0 0 16px rgba(0,222,217,.65));
          transform: scale(1.05);
        }

        /* Desktop links */
        .tz-nav-links {
          display: flex; gap: 4px;
          list-style: none; margin: 0; padding: 0;
          opacity: 0;
          animation: fadeIn .7s .3s cubic-bezier(.16,1,.3,1) forwards;
        }
        .tz-nav-links a {
          position: relative;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px; font-weight: 500;
          color: var(--nav-link);
          text-decoration: none;
          padding: 6px 14px; border-radius: 8px;
          transition: color .2s, background .2s;
        }
        .tz-nav-links a::after {
          content: '';
          position: absolute; left: 50%; bottom: 2px;
          width: 0; height: 2px;
          background: var(--text-teal);
          border-radius: 1px;
          transform: translateX(-50%);
          transition: width .25s cubic-bezier(.16,1,.3,1);
        }
        .tz-nav-links a:hover { color: var(--nav-link-hover); background: var(--nav-link-bg-hover); }
        .tz-nav-links a:hover::after { width: 60%; }

        /* Right controls group */
        .tz-nav-right {
          display: flex; align-items: center; gap: 8px;
          opacity: 0;
          animation: fadeInRight .7s .45s cubic-bezier(.16,1,.3,1) forwards;
        }

        /* ── Theme toggle pill ── */
        .tz-theme-toggle {
          position: relative;
          width: 56px; height: 30px;
          border-radius: 100px;
          background: var(--bg-card);
          border: 1.5px solid var(--border-mid);
          cursor: pointer;
          display: flex; align-items: center;
          padding: 3px;
          transition: background .3s, border-color .3s, box-shadow .3s;
          flex-shrink: 0;
        }
        .tz-theme-toggle:hover {
          border-color: var(--text-teal);
          box-shadow: 0 0 12px rgba(0,222,217,.25);
        }
        .tz-toggle-pill {
          position: absolute;
          width: 22px; height: 22px; border-radius: 50%;
          background: var(--text-teal);
          display: flex; align-items: center; justify-content: center;
          color: #040f12;
          transition: transform .35s cubic-bezier(.16,1,.3,1);
          box-shadow: 0 0 8px rgba(0,222,217,.4);
        }
        [data-theme="dark"]  .tz-toggle-pill { transform: translateX(0px); }
        [data-theme="light"] .tz-toggle-pill { transform: translateX(26px); }
        .tz-toggle-track-icon {
          position: absolute; right: 6px;
          color: rgba(0,222,217,.3);
          display: flex; align-items: center;
          pointer-events: none;
        }
        [data-theme="light"] .tz-toggle-track-icon { left: 6px; right: auto; }

        /* ── Language toggle button ── */
        .tz-lang-btn {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 7px 12px; border-radius: 10px;
          background: var(--bg-card);
          border: 1.5px solid var(--border-subtle);
          cursor: pointer;
          color: var(--text-teal);
          font-family: 'DM Sans', sans-serif;
          font-size: 12px; font-weight: 600;
          letter-spacing: .04em;
          transition: background .2s, border-color .2s, transform .15s, box-shadow .2s;
          flex-shrink: 0;
          white-space: nowrap;
          position: relative;
          overflow: hidden;
        }
        .tz-lang-btn::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(0,222,217,.08) 0%, transparent 60%);
          pointer-events: none;
        }
        .tz-lang-btn:hover {
          background: rgba(0,222,217,.08);
          border-color: var(--text-teal);
          transform: translateY(-1px);
          box-shadow: 0 0 14px rgba(0,222,217,.18);
        }
        .tz-lang-btn:active { transform: scale(.96); }

        /* Animated label swap */
        .tz-lang-label {
          display: inline-block;
          animation: langFlip .3s cubic-bezier(.16,1,.3,1);
        }
        @keyframes langFlip {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Darija label uses Arabic font */
        .tz-lang-label.ar {
          font-family: 'Segoe UI', 'Arial', sans-serif;
          font-size: 13px;
          direction: rtl;
        }

        /* ── CTA ── */
        .tz-nav-btn {
          position: relative;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px; font-weight: 500;
          color: #040f12;
          background: var(--text-teal);
          border: none;
          padding: 10px 20px; border-radius: 10px;
          cursor: pointer; letter-spacing: .02em;
          overflow: hidden;
          transition: transform .15s, box-shadow .25s;
          box-shadow: var(--shadow-btn);
          white-space: nowrap;
        }
        .tz-nav-btn::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,.18) 0%, transparent 60%);
          pointer-events: none;
        }
        .tz-nav-btn:hover { transform: translateY(-2px); box-shadow: 0 0 36px rgba(0,222,217,.5); }
        .tz-nav-btn:active { transform: scale(.97); }

        /* Mobile hamburger */
        .tz-hamburger {
          display: none; flex-direction: column; gap: 5px;
          background: none; border: none; cursor: pointer; padding: 4px;
        }
        .tz-hamburger span {
          display: block; width: 22px; height: 2px;
          background: var(--text-primary); border-radius: 1px;
          transition: transform .3s, opacity .3s;
        }
        .tz-hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .tz-hamburger.open span:nth-child(2) { opacity: 0; }
        .tz-hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        /* Mobile drawer */
        .tz-mobile-menu {
          display: none;
          position: fixed; top: 68px; left: 0; right: 0;
          background: var(--mobile-menu-bg);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--nav-border);
          padding: 16px 24px 24px;
          z-index: 999;
          animation: slideDown .3s cubic-bezier(.16,1,.3,1);
        }
        .tz-mobile-menu.open { display: block; }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .tz-mobile-menu ul {
          list-style: none; margin: 0 0 16px; padding: 0;
          display: flex; flex-direction: column; gap: 4px;
        }
        .tz-mobile-menu a {
          display: block; font-family: 'DM Sans', sans-serif;
          font-size: 15px; color: var(--mobile-link);
          text-decoration: none; padding: 10px 12px; border-radius: 8px;
          transition: background .2s, color .2s;
        }
        .tz-mobile-menu a:hover { background: var(--nav-link-bg-hover); color: var(--nav-link-hover); }
        .tz-mobile-bottom {
          display: flex; align-items: center; gap: 8px; flex-wrap: wrap;
        }
        .tz-mobile-btn {
          flex: 1; min-width: 100px;
          font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500;
          color: #040f12; background: var(--text-teal);
          border: none; padding: 12px; border-radius: 10px; cursor: pointer;
        }

        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-16px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(16px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        @media (max-width: 768px) {
          .tz-nav-wrap { padding: 0 24px; }
          .tz-nav-links { display: none; }
          .tz-nav-btn { display: none; }
          .tz-theme-toggle { display: none; }
          .tz-lang-btn { display: none; }
          .tz-hamburger { display: flex; }
        }
      `}</style>

      <nav className={`tz-nav-wrap${scrolled ? " scrolled" : ""}`}>

        {/* Logo */}
        <a href="/" className="tz-nav-logo">
          <img src="/Pictures/tizart.png" alt="Tizart" />
        </a>

        {/* Desktop links */}
        <ul className="tz-nav-links" dir={isRtl ? "rtl" : "ltr"}>
          {(["nav.home", "nav.about", "nav.services", "nav.contact"] as const).map((key) => {
            const label = t(key);
            const href = key === "nav.home" ? "/" : `/${key.split(".")[1]}`;
            return (
              <li key={key}>
                <a href={href}>{label}</a>
              </li>
            );
          })}
        </ul>

        {/* Right: theme pill + language btn + CTA */}
        <div className="tz-nav-right">

          {/* Theme toggle pill */}
          <button
            className="tz-theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            <span className="tz-toggle-track-icon">
              {theme === "dark" ? <HiOutlineMoon size={12} /> : <HiOutlineSun size={12} />}
            </span>
            <span className="tz-toggle-pill">
              {theme === "dark" ? <HiOutlineSun size={13} /> : <HiOutlineMoon size={13} />}
            </span>
          </button>

          {/* Language toggle */}
          <button
            className="tz-lang-btn"
            onClick={toggleLang}
            aria-label={lang === "en" ? "Switch to Darija" : "Switch to English"}
            title={lang === "en" ? "تبديل للدارجة" : "Switch to English"}
          >
            <TbLanguage size={15} />
            <span
              className={`tz-lang-label${lang === "en" ? "" : " ar"}`}
              key={lang}
            >
              {t("nav.lang")}
            </span>
          </button>

          {/* CTA */}
          <button className="tz-nav-btn">
            {t("nav.order")}
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className={`tz-hamburger${menuOpen ? " open" : ""}`}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile drawer */}
      <div className={`tz-mobile-menu${menuOpen ? " open" : ""}`} dir={isRtl ? "rtl" : "ltr"}>
        <ul>
          {(["nav.home", "nav.about", "nav.services", "nav.contact"] as const).map((key) => (
            <li key={key}>
              <a
                href={key === "nav.home" ? "/" : `/${key.split(".")[1]}`}
                onClick={() => setMenuOpen(false)}
              >
                {t(key)}
              </a>
            </li>
          ))}
        </ul>
        <div className="tz-mobile-bottom">
          <button className="tz-mobile-btn">{t("nav.order")}</button>
          <button className="tz-theme-toggle" onClick={toggleTheme} style={{ width: 56, height: 30 }}>
            <span className="tz-toggle-track-icon">
              {theme === "dark" ? <HiOutlineMoon size={12} /> : <HiOutlineSun size={12} />}
            </span>
            <span className="tz-toggle-pill">
              {theme === "dark" ? <HiOutlineSun size={13} /> : <HiOutlineMoon size={13} />}
            </span>
          </button>
          <button className="tz-lang-btn" onClick={toggleLang}>
            <TbLanguage size={14} />
            <span className={`tz-lang-label${lang === "en" ? "" : " ar"}`} key={lang}>
              {t("nav.lang")}
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default NavBar;