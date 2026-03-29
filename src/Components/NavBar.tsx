// src/Components/NavBar.tsx
import { useEffect, useState } from "react";
import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi2";
import { TbLanguage } from "react-icons/tb";
import { useTheme } from "./ThemeContext";
import { useLang } from "./Languagecontext";
import './NavBar.css';

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

  // Function to handle smooth scrolling
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setMenuOpen(false); // close mobile menu
  };

  return (
    <>
      <nav className={`tz-nav-wrap${scrolled ? " scrolled" : ""}`}>

        {/* Logo */}
        <a href="/" className="tz-nav-logo">
          <img src="/Images/tizart.png" alt="Tizart" />
        </a>

        {/* Desktop links */}
        <ul className="tz-nav-links" dir={isRtl ? "rtl" : "ltr"}>
          {(["nav.home", "nav.about", "nav.services", "nav.contact"] as const).map((key) => {
            const label = t(key);
            const sectionId = key.split(".")[1]; // home, about, services, contact
            return (
              <li key={key}>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(sectionId != "home" ? sectionId : "hero");
                  }}
                >
                  {label}
                </a>
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
            <span className={`tz-lang-label${lang === "en" ? "" : " ar"}`} key={lang}>
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
          {(["nav.home", "nav.about", "nav.services", "nav.contact"] as const).map((key) => {
            const sectionId = key.split(".")[1];
            return (
              <li key={key}>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(sectionId != "home" ? sectionId : "hero");
                  }}
                >
                  {t(key)}
                </a>
              </li>
            );
          })}
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