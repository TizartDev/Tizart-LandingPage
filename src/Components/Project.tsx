import { useEffect, useState } from "react";
import { FiExternalLink, FiGithub, FiUser, FiCalendar, FiBriefcase } from "react-icons/fi";
import { useLang } from "./Languagecontext";
import './Project.css'

interface ProjectProps {
  title: string;
  description: string;
  client: string;
  year: string;
  role: string;
  techStack: string[];
  image: string;
  index: number;
  total: number;
}

const Project = ({ title, description, client, year, role, techStack, image, index, total }: ProjectProps) => {
  const { t, lang } = useLang();
  const isRtl = lang === "dz";
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  const px = (mousePos.x - 0.5) * 14;
  const py = (mousePos.y - 0.5) * 8;

  const words = title.split(" ");
  const lastWord = words.pop()!;
  const firstWords = words.join(" ");

  return (
    <div className="proj-root" dir={isRtl ? "rtl" : "ltr"}>

      {/* Left: Image */}
      <div className="proj-visual">
        <div className="proj-progress-line">
          <div className="proj-progress-fill" style={{ width: `${((index + 1) / total) * 100}%` }} />
        </div>
        <div className="proj-img-mover" style={{ transform: `translate(${px}px, ${py}px)` }}>
          <img className="proj-bg-img" src={image} alt={title} />
        </div>
        <div className="proj-featured-badge">
          <span className="proj-badge-dot" />
          {t("pj.featured")}
        </div>
        <div className="proj-img-chips">
          <div className="proj-chip"><span className="proj-chip-icon"><FiCalendar size={11} /></span>{year}</div>
          <div className="proj-chip"><span className="proj-chip-icon"><FiBriefcase size={11} /></span>{role}</div>
        </div>
        <div className="proj-watermark">0{index + 1}</div>
      </div>

      {/* Right: Content */}
      <div className="proj-content">
        <div className="proj-top">
          <div className="proj-eyebrow">
            <div className="proj-eyebrow-line" />
            <span className="proj-eyebrow-text">{t("pj.featured")}</span>
          </div>

          <div className="proj-title-block">
            <span className="proj-title-first">{firstWords}</span>
            <span className="proj-title-last">{lastWord}</span>
          </div>

          <div className="proj-divider" />
          <p className="proj-desc">{description}</p>

          <div className="proj-meta-row">
            <div className="proj-meta-item">
              <div className="proj-meta-label"><FiUser size={9} />{t("pj.client")}</div>
              <div className="proj-meta-value">{client}</div>
            </div>
            <div className="proj-meta-item">
              <div className="proj-meta-label"><FiCalendar size={9} />{t("pj.year")}</div>
              <div className="proj-meta-value">{year}</div>
            </div>
            <div className="proj-meta-item">
              <div className="proj-meta-label"><FiBriefcase size={9} />{t("pj.role")}</div>
              <div className="proj-meta-value">{role}</div>
            </div>
          </div>

          <div className="proj-stack">
            {techStack.map((tech) => <span className="proj-tech" key={tech}>{tech}</span>)}
          </div>

          <div className="proj-actions">
            <button className="proj-btn proj-btn-primary">
              <FiExternalLink size={13} />{t("pj.live")}
            </button>
            <button className="proj-btn proj-btn-ghost">
              <FiGithub size={13} />{t("pj.github")}
            </button>
          </div>
        </div>

        <div className="proj-counter-row">
          <div className="proj-counter-nums">
            <span className="proj-counter-cur">0{index + 1}</span> / 0{total}
          </div>
          <div className="proj-counter-dots">
            {Array.from({ length: total }).map((_, i) => (
              <div key={i} className={`proj-cdot${i === index ? " active" : ""}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Project;