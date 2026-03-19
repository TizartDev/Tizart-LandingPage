import { useRef, useEffect, useState } from "react";
import { FiExternalLink, FiGithub, FiUser, FiCalendar, FiBriefcase } from "react-icons/fi";
import { useLang } from "./Languagecontext";

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
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        .proj-root {
          font-family: 'DM Sans', sans-serif;
          position: relative; width: 100%; min-height: 620px;
          display: grid; grid-template-columns: 1fr 1fr;
          border-radius: 28px; overflow: hidden; isolation: isolate;
          border: 1px solid var(--border-subtle);
          box-shadow: var(--shadow-card);
        }

        /* ── Left: Image ── */
        .proj-visual { position: relative; overflow: hidden; background: #000; min-height: 560px; }
        .proj-visual::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(0,222,217,.08) 0%, transparent 50%, rgba(0,0,0,.5) 100%),
                      linear-gradient(90deg, transparent 55%, var(--bg-page) 100%);
          pointer-events: none; z-index: 1;
        }
        .proj-visual::before {
          content: ''; position: absolute; inset: 0; z-index: 2;
          background: repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,.06) 3px, rgba(0,0,0,.06) 4px);
          pointer-events: none;
        }
        .proj-img-mover { position: absolute; inset: -6%; transition: transform 0.12s linear; }
        .proj-bg-img { width: 100%; height: 100%; object-fit: cover; display: block; filter: brightness(.6) saturate(.85); transition: filter .4s; }
        .proj-root:hover .proj-bg-img { filter: brightness(.75) saturate(1.05); }

        .proj-featured-badge {
          position: absolute; top: 20px; left: 20px; z-index: 5;
          display: inline-flex; align-items: center; gap: 6px;
          background: rgba(4,15,18,.75); border: 1px solid var(--border-mid);
          backdrop-filter: blur(10px); border-radius: 100px;
          padding: 5px 12px; font-size: 10px; font-weight: 500;
          color: var(--text-primary); letter-spacing: .08em; text-transform: uppercase;
        }
        .proj-badge-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--text-teal); animation: projDot 2s ease-in-out infinite; }
        @keyframes projDot { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:.3; transform:scale(.5); } }

        .proj-img-chips { position: absolute; top: 20px; right: 20px; z-index: 5; display: flex; flex-direction: column; gap: 8px; }
        .proj-chip { display: inline-flex; align-items: center; gap: 6px; background: rgba(4,15,18,.72); border: 1px solid var(--border-subtle); backdrop-filter: blur(10px); border-radius: 8px; padding: 6px 12px; font-size: 11px; font-weight: 500; color: var(--text-primary); white-space: nowrap; }
        .proj-chip-icon { color: var(--text-teal); display: flex; align-items: center; }

        .proj-watermark { position: absolute; bottom: -16px; left: 20px; z-index: 3; font-family: 'Syne', sans-serif; font-size: 160px; font-weight: 800; line-height: 1; letter-spacing: -8px; color: transparent; -webkit-text-stroke: 1px rgba(0,222,217,.15); pointer-events: none; user-select: none; }

        .proj-progress-line { position: absolute; top: 0; left: 0; right: 0; height: 2px; z-index: 6; background: var(--border-subtle); }
        .proj-progress-fill { height: 100%; background: linear-gradient(90deg, var(--text-teal), rgba(0,222,217,.3)); transition: width .5s cubic-bezier(.16,1,.3,1); }

        /* ── Right: Content ── */
        .proj-content {
          background: var(--bg-page);
          border-left: 1px solid var(--border-subtle);
          padding: 44px 40px;
          display: flex; flex-direction: column; justify-content: space-between;
          position: relative; overflow: hidden;
        }
        .proj-content::before { content: ''; position: absolute; top: -80px; right: -80px; width: 220px; height: 220px; border-radius: 50%; border: 1px solid var(--border-subtle); pointer-events: none; }
        .proj-content::after  { content: ''; position: absolute; top: -110px; right: -110px; width: 300px; height: 300px; border-radius: 50%; border: 1px solid rgba(0,222,217,.04); pointer-events: none; }

        .proj-top {}
        .proj-eyebrow { display: flex; align-items: center; gap: 10px; margin-bottom: 20px; }
        .proj-eyebrow-line { width: 32px; height: 1px; background: var(--text-teal); opacity: .6; }
        .proj-eyebrow-text { font-size: 10px; font-weight: 500; color: var(--text-teal); letter-spacing: .12em; text-transform: uppercase; }

        .proj-title-block { margin-bottom: 24px; }
        .proj-title-first { font-family: 'Syne', sans-serif; font-size: clamp(22px, 2.8vw, 38px); font-weight: 400; letter-spacing: -1.5px; color: var(--text-secondary); line-height: 1.05; display: block; }
        .proj-title-last { font-family: 'Syne', sans-serif; font-size: clamp(26px, 3.4vw, 48px); font-weight: 800; letter-spacing: -2px; color: var(--text-primary); line-height: 1.0; display: block; position: relative; }
        .proj-title-last::after { content: ''; position: absolute; bottom: -4px; left: 0; width: 100%; height: 2px; background: linear-gradient(90deg, var(--text-teal) 40%, transparent); border-radius: 1px; }

        .proj-divider { width: 36px; height: 2px; background: linear-gradient(90deg, var(--text-teal), transparent); border-radius: 1px; margin: -4px 0 20px; }

        .proj-desc { font-size: 14px; line-height: 1.75; color: var(--text-secondary); margin-bottom: 24px; max-width: 380px; }

        .proj-meta-row { display: flex; gap: 0; border: 1px solid var(--border-subtle); border-radius: 12px; overflow: hidden; margin-bottom: 24px; }
        .proj-meta-item { flex: 1; padding: 12px 14px; border-right: 1px solid var(--border-subtle); display: flex; flex-direction: column; gap: 4px; transition: background .2s; }
        .proj-meta-item:last-child { border-right: none; }
        .proj-meta-item:hover { background: var(--bg-card-hover); }
        .proj-meta-label { display: flex; align-items: center; gap: 5px; font-size: 9px; font-weight: 500; color: var(--text-teal); letter-spacing: .1em; text-transform: uppercase; opacity: .7; }
        .proj-meta-value { font-size: 12.5px; font-weight: 500; color: var(--text-primary); }

        .proj-stack { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 28px; }
        .proj-tech { padding: 5px 12px; border-radius: 6px; border: 1px solid var(--border-subtle); background: var(--bg-card); font-size: 11px; font-weight: 500; color: var(--text-teal); letter-spacing: .03em; transition: background .2s, border-color .2s, transform .15s; }
        .proj-tech:hover { background: rgba(0,222,217,.1); border-color: var(--border-strong); transform: translateY(-2px); }

        .proj-actions { display: flex; gap: 10px; align-items: center; }
        .proj-btn { display: inline-flex; align-items: center; gap: 8px; padding: 12px 22px; border-radius: 10px; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500; cursor: pointer; border: none; position: relative; overflow: hidden; transition: transform .15s, box-shadow .22s; white-space: nowrap; }
        .proj-btn:active { transform: scale(.97); }
        .proj-btn-primary { background: var(--text-teal); color: #040f12; box-shadow: var(--shadow-btn); }
        .proj-btn-primary::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(255,255,255,.2) 0%, transparent 55%); pointer-events: none; }
        .proj-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 0 44px rgba(0,222,217,.5); }
        .proj-btn-ghost { background: transparent; color: var(--text-secondary); border: 1px solid var(--border-subtle); }
        .proj-btn-ghost:hover { color: var(--text-teal); border-color: var(--border-mid); transform: translateY(-2px); }

        .proj-counter-row { display: flex; align-items: center; justify-content: space-between; padding-top: 20px; border-top: 1px solid var(--border-subtle); margin-top: auto; }
        .proj-counter-nums { font-family: 'Syne', sans-serif; font-size: 13px; font-weight: 700; color: var(--text-muted); letter-spacing: .05em; }
        .proj-counter-cur { color: var(--text-teal); font-size: 18px; }
        .proj-counter-dots { display: flex; gap: 6px; align-items: center; }
        .proj-cdot { width: 6px; height: 6px; border-radius: 50%; background: var(--border-subtle); transition: background .3s, transform .3s; }
        .proj-cdot.active { background: var(--text-teal); transform: scale(1.3); box-shadow: 0 0 8px rgba(0,222,217,.6); }

        @media (max-width: 900px) {
          .proj-root { grid-template-columns: 1fr; }
          .proj-visual { min-height: 280px; }
          .proj-visual::after { background: linear-gradient(0deg, var(--bg-page) 0%, transparent 50%), linear-gradient(135deg, rgba(0,222,217,.06) 0%, transparent 60%); }
          .proj-content { padding: 32px 24px; }
          .proj-watermark { font-size: 100px; bottom: -10px; }
        }
      `}</style>

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