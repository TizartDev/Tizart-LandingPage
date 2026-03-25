import { useEffect, useRef, useState } from "react";
import { MdOutlineDeveloperMode } from "react-icons/md";
import { TbDeviceMobileCode } from "react-icons/tb";
import { FaLaptop } from "react-icons/fa";
import { FiArrowUpRight, FiCheck } from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi2";
import { useLang } from "./Languagecontext";
import "./Services.css";

const servicesData = [
  {
    id: "01",
    icon: <MdOutlineDeveloperMode size={28} />,
    image: "/Images/web-dev.webp",
    key: "sv.s1",
  },
  {
    id: "02",
    icon: <TbDeviceMobileCode size={28} />,
    image: "/Images/mob-dev.webp",
    key: "sv.s2",
  },
  {
    id: "03",
    icon: <FaLaptop size={26} />,
    image: "/Images/ui-dev.webp",
    key: "sv.s3",
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

const Services = () => {
  const { ref: sectionRef, visible } = useInView();
  const { t, lang } = useLang();
  const isRtl = lang === "dz";

  const services = servicesData.map((s) => ({
    id: s.id,
    icon: s.icon,
    image: s.image,
    title: t(`${s.key}.title`),
    subtitle: t(`${s.key}.sub`),
    desc: t(`${s.key}.desc`),
    features: [
      t(`${s.key}.f1`),
      t(`${s.key}.f2`),
      t(`${s.key}.f3`),
      t(`${s.key}.f4`),
    ],
  }));

  return (
    <>
      <section
        className="sv-section"
        ref={sectionRef}
        dir={isRtl ? "rtl" : "ltr"}
      >
        <div className="sv-bg-grid" />
        <div className="sv-orb sv-orb-1" />
        <div className="sv-orb sv-orb-2" />

        <div className="sv-header">
          <div className={`sv-eyebrow${visible ? " in" : ""}`}>
            <span className="sv-eyebrow-dot" />
            {t("sv.eyebrow")}
          </div>
          <h1 className={`sv-title${visible ? " in" : ""}`}>
            {t("sv.title1")}
            {t("sv.title2") ? " " : ""}
            <span className={`sv-title-teal${visible ? " in" : ""}`}>
              {t("sv.title2")}
            </span>
          </h1>
          <p className={`sv-tagline${visible ? " in" : ""}`}>
            {t("sv.tagline")}
          </p>
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
                ref={(el) => {
                  if (el) {
                    const img = el.querySelector("img");
                    if (img?.complete) el.classList.add("loaded");
                  }
                }}
              >
                <img
                  className="sv-img"
                  src={svc.image}
                  alt={svc.title}
                  loading={i === 0 ? "eager" : "lazy"}
                  decoding="async"
                  width={480}
                  height={200}
                  onLoad={(e) =>
                    (
                      e.currentTarget.closest(".sv-img-wrap") as HTMLElement
                    )?.classList.add("loaded")
                  }
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
                      <span className="sv-feature-check">
                        <FiCheck size={10} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <button className="sv-cta">
                  {t("sv.learn")}
                  <span className="sv-cta-arrow">
                    <FiArrowUpRight size={15} />
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className={`sv-banner${visible ? " in" : ""}`}>
          <div className="sv-banner-left">
            <div className="sv-banner-icon">
              <HiOutlineSparkles size={28} />
            </div>
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
