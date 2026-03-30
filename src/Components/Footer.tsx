import { useEffect, useRef, useState } from "react";
import { FaInstagram } from "react-icons/fa";
import { CiFacebook } from "react-icons/ci";
import { GrLinkedin } from "react-icons/gr";
import { MdEmail } from "react-icons/md";
import { IoCall } from "react-icons/io5";
import { FiMapPin, FiArrowUp } from "react-icons/fi";
import { useLang } from "./Languagecontext";
import "./Footer.css";

const socials = [
  { icon: <FaInstagram size={15} />, href: "https://www.instagram.com/tizartagency/", label: "Instagram" },
  {
    icon: <CiFacebook size={15} />,
    href: "https://www.facebook.com/TizartAgency/",
    label: "Facebook",
  },
  {
    icon: <GrLinkedin size={15} />,
    href: "https://www.linkedin.com/company/tizartagency/",
    label: "LinkedIn",
  },
];

const useInView = (threshold = 0.05) => {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold },
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
    { label: t("nav.home"), href: "#hero" },
    { label: t("nav.about"), href: "#about" },
    { label: t("nav.services"), href: "#services" },
    { label: "Projects", href: "#projects" },
    { label: t("nav.contact"), href: "#contact" },
  ];

  const serviceLinks = [
    t("about.exp1.title"),
    t("about.exp2.title"),
    t("about.exp3.title"),
    t("about.exp4.title"),
  ];

  const scrollToSection = (href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <footer className="ft-footer" ref={footerRef} dir={isRtl ? "rtl" : "ltr"}>
        <div className="ft-bg-grid" />
        <div className="ft-orb ft-orb-1" />
        <div className="ft-orb ft-orb-2" />

        <div className="ft-body">
          <div className="ft-grid">
            <div className={`ft-brand${visible ? " in" : ""}`}>
              <img src="/Images/tizart.png" className="ft-logo" alt="Tizart" />
              <p className="ft-brand-desc">{t("ft.brand.desc")}</p>
              <div className="ft-socials">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    className="ft-social-btn"
                    aria-label={s.label}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            <div
              className={`ft-col${visible ? " in" : ""}`}
              style={{ transitionDelay: visible ? ".18s" : "0s" }}
            >
              <div className="ft-col-title">{t("ft.nav")}</div>
              <div className="ft-nav-links">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="ft-nav-link"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                  >
                    <span className="ft-nav-arrow">›</span>
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            <div
              className={`ft-col${visible ? " in" : ""}`}
              style={{ transitionDelay: visible ? ".26s" : "0s" }}
            >
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

            <div
              className={`ft-col${visible ? " in" : ""}`}
              style={{ transitionDelay: visible ? ".34s" : "0s" }}
            >
              <div className="ft-col-title">{t("ft.contact")}</div>
              <div className="ft-contact-item">
                <div className="ft-contact-icon">
                  <MdEmail size={13} />
                </div>
                <div>
                  <div className="ft-contact-label">Email</div>
                  <div className="ft-contact-value">contact@tizart.dev</div>
                </div>
              </div>
              <div className="ft-contact-item">
                <div className="ft-contact-icon">
                  <IoCall size={13} />
                </div>
                <div>
                  <div className="ft-contact-label">Phone</div>
                  <div className="ft-contact-value">+213 5 62 74 31 35</div>
                </div>
              </div>
              <div className="ft-contact-item">
                <div className="ft-contact-icon">
                  <FiMapPin size={13} />
                </div>
                <div>
                  <div className="ft-contact-label">Location</div>
                  <div className="ft-contact-value">Constantine, Algeria</div>
                </div>
              </div>
            </div>
          </div>

          <div className={`ft-bottom${visible ? " in" : ""}`}>
            <p className="ft-copy">
              © {year} <span>{t("ft.copy")}</span>. All rights reserved.
            </p>
            <div className="ft-made-in">🇩🇿 {t("ft.madein")}</div>
            <button
              className="ft-scroll-top"
              onClick={scrollToTop}
              aria-label="Scroll to top"
            >
              <FiArrowUp size={15} />
            </button>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
