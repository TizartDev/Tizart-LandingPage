import { useState, useEffect, useRef, useCallback } from "react";
import Project from "./Project";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { TbLayoutGrid } from "react-icons/tb";
import { useLang } from "./Languagecontext";

const useInView = (threshold = 0.06) => {
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

type SlideDir = "left" | "right";

const Projects = () => {
  const { ref: sectionRef, visible } = useInView();
  const { t, lang } = useLang();
  const isRtl = lang === "dz";

  // Build projects array from translations so it updates on language change
  const projectsData = [
    {
      title: t("pj.p1.title"),
      description: t("pj.p1.desc"),
      client: "Wail Benoulha",
      year: "2025",
      role: t("pj.p1.role"),
      techStack: ["React", "Django", "PostgreSQL", "Tailwind"],
      image: "/Pictures/eco-tourism.webp",
    },
    {
      title: t("pj.p2.title"),
      description: t("pj.p2.desc"),
      client: "Sara Meziani",
      year: "2024",
      role: t("pj.p2.role"),
      techStack: ["React", "Node.js", "MongoDB", "Stripe"],
      image: "/Pictures/ecomm.webp",
    },
    {
      title: t("pj.p3.title"),
      description: t("pj.p3.desc"),
      client: "Karim Boudali",
      year: "2024",
      role: t("pj.p3.role"),
      techStack: ["React", "OpenAI", "Tailwind", "Firebase"],
      image: "/Pictures/ai-resume.webp",
    },
  ];

  const [current, setCurrent] = useState(0);
  const [phase, setPhase] = useState<"idle" | "exit" | "enter">("idle");
  const [exitDir, setExitDir] = useState<SlideDir>("right");
  const nextIndex = useRef(0);

  const navigate = useCallback((dir: SlideDir) => {
    if (phase !== "idle") return;
    setExitDir(dir);
    setPhase("exit");
    nextIndex.current =
      dir === "right"
        ? (current + 1) % projectsData.length
        : (current - 1 + projectsData.length) % projectsData.length;
  }, [phase, current, projectsData.length]);

  const goTo = useCallback((i: number) => {
    if (phase !== "idle" || i === current) return;
    setExitDir(i > current ? "right" : "left");
    setPhase("exit");
    nextIndex.current = i;
  }, [phase, current]);

  useEffect(() => {
    if (phase === "exit") {
      const t = setTimeout(() => { setCurrent(nextIndex.current); setPhase("enter"); }, 360);
      return () => clearTimeout(t);
    }
    if (phase === "enter") {
      const t = setTimeout(() => setPhase("idle"), 400);
      return () => clearTimeout(t);
    }
  }, [phase]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") navigate(isRtl ? "right" : "left");
      if (e.key === "ArrowRight") navigate(isRtl ? "left" : "right");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate, isRtl]);

  const slideStyle = (): React.CSSProperties => {
    if (phase === "exit") return { opacity: 0, transform: exitDir === "right" ? "translateX(-56px) scale(.98)" : "translateX(56px) scale(.98)", transition: "opacity .36s cubic-bezier(.4,0,.6,1), transform .36s cubic-bezier(.4,0,.6,1)" };
    if (phase === "enter") return { opacity: 0, transform: exitDir === "right" ? "translateX(56px) scale(.98)" : "translateX(-56px) scale(.98)", transition: "none" };
    return { opacity: 1, transform: "translateX(0) scale(1)", transition: "opacity .45s cubic-bezier(.16,1,.3,1), transform .45s cubic-bezier(.16,1,.3,1)" };
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        .pjs-section { font-family: 'DM Sans', sans-serif; background: var(--bg-page); color: var(--text-primary); padding: 100px 72px 120px; position: relative; overflow: hidden; }

        .pjs-bg-grid { position: absolute; inset: 0; background-image: radial-gradient(circle, var(--grid-line) 1px, transparent 1px); background-size: 36px 36px; pointer-events: none; z-index: 0; opacity: .4; }

        .pjs-orb { position: absolute; border-radius: 50%; filter: blur(120px); pointer-events: none; z-index: 0; }
        .pjs-orb-1 { width: 600px; height: 600px; background: radial-gradient(circle, var(--orb-1) 0%, transparent 70%); top: -150px; right: -150px; animation: pjsFloat 18s ease-in-out infinite alternate; }
        .pjs-orb-2 { width: 400px; height: 400px; background: radial-gradient(circle, var(--orb-2) 0%, transparent 70%); bottom: -80px; left: -80px; animation: pjsFloat 22s 8s ease-in-out infinite alternate; }
        @keyframes pjsFloat { from { transform: translate(0,0) scale(1); } to { transform: translate(24px,-24px) scale(1.08); } }

        /* Header */
        .pjs-header { display: grid; grid-template-columns: 1fr auto; align-items: end; margin-bottom: 64px; position: relative; z-index: 1; gap: 32px; }

        .pjs-eyebrow { display: inline-flex; align-items: center; gap: 8px; background: rgba(0,222,217,.08); border: 1px solid var(--border-mid); border-radius: 100px; padding: 6px 16px; font-size: 11px; font-weight: 500; color: var(--text-teal); letter-spacing: .1em; text-transform: uppercase; margin-bottom: 18px; opacity: 0; transform: translateY(20px); transition: opacity .6s, transform .6s; }
        .pjs-eyebrow.in { opacity: 1; transform: translateY(0); }
        .pjs-eyebrow-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--text-teal); animation: pjsDot 2s ease-in-out infinite; }
        @keyframes pjsDot { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:.3; transform:scale(.5); } }

        .pjs-title { font-family: 'Syne', sans-serif; font-size: clamp(40px, 5vw, 72px); font-weight: 800; letter-spacing: -3px; line-height: 1.0; opacity: 0; transform: translateY(28px); transition: opacity .7s .1s, transform .7s .1s; color: var(--text-primary); }
        .pjs-title.in { opacity: 1; transform: translateY(0); }
        .pjs-title-dim { color: var(--text-secondary); opacity: .4; }
        .pjs-title-teal { color: var(--text-teal); }

        /* Nav controls */
        .pjs-nav-controls { display: flex; flex-direction: column; align-items: flex-end; gap: 16px; opacity: 0; transform: translateY(20px); transition: opacity .6s .2s, transform .6s .2s; }
        .pjs-nav-controls.in { opacity: 1; transform: translateY(0); }

        .pjs-arrow-group { display: flex; gap: 10px; }
        .pjs-arrow-btn { width: 48px; height: 48px; border-radius: 50%; background: var(--bg-card); border: 1px solid var(--border-subtle); display: flex; align-items: center; justify-content: center; color: var(--text-secondary); cursor: pointer; transition: background .2s, border-color .2s, color .2s, transform .15s, box-shadow .2s; }
        .pjs-arrow-btn:hover { background: rgba(0,222,217,.1); border-color: var(--border-strong); color: var(--text-teal); transform: scale(1.08); box-shadow: 0 0 20px rgba(0,222,217,.2); }
        .pjs-arrow-btn:active { transform: scale(.95); }
        .pjs-arrow-btn:disabled { opacity: .3; cursor: not-allowed; transform: none; }

        /* Project tabs */
        .pjs-tabs { display: flex; gap: 4px; background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: 10px; padding: 4px; }
        .pjs-tab { padding: 7px 14px; border-radius: 7px; font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 500; color: var(--text-muted); cursor: pointer; background: none; border: none; transition: background .2s, color .2s; letter-spacing: .03em; white-space: nowrap; }
        .pjs-tab.active { background: rgba(0,222,217,.12); color: var(--text-teal); box-shadow: inset 0 0 0 1px var(--border-mid); border-radius: 7px; }
        .pjs-tab:hover:not(.active) { color: var(--text-primary); background: var(--bg-card-hover); }

        /* Slide */
        .pjs-slide-wrap { position: relative; z-index: 1; opacity: 0; transform: translateY(40px); transition: opacity .8s .18s, transform .8s .18s; }
        .pjs-slide-wrap.in { opacity: 1; transform: translateY(0); }
        .pjs-slide-inner { will-change: transform, opacity; }

        /* Ticker */
        .pjs-ticker-wrap { position: relative; z-index: 1; margin-top: 40px; overflow: hidden; border-top: 1px solid var(--border-subtle); border-bottom: 1px solid var(--border-subtle); padding: 12px 0; opacity: 0; transition: opacity .6s .4s; }
        .pjs-ticker-wrap.in { opacity: 1; }
        .pjs-ticker-track { display: flex; gap: 0; animation: tickerScroll 30s linear infinite; width: max-content; }
        .pjs-ticker-track:hover { animation-play-state: paused; }
        @keyframes tickerScroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .pjs-ticker-item { display: flex; align-items: center; gap: 16px; padding: 0 32px; font-family: 'Syne', sans-serif; font-size: 12px; font-weight: 700; color: var(--text-muted); letter-spacing: .08em; text-transform: uppercase; white-space: nowrap; opacity: .4; }
        .pjs-ticker-dot { width: 4px; height: 4px; border-radius: 50%; background: var(--text-teal); flex-shrink: 0; opacity: .5; }

        @media (max-width: 1024px) { .pjs-section { padding: 72px 32px 80px; } .pjs-header { grid-template-columns: 1fr; } .pjs-nav-controls { align-items: flex-start; flex-direction: row; align-items: center; } }
        @media (max-width: 768px) { .pjs-section { padding: 72px 20px 80px; } .pjs-tabs { display: none; } }
      `}</style>

      <section className="pjs-section" ref={sectionRef} dir={isRtl ? "rtl" : "ltr"}>
        <div className="pjs-bg-grid" />
        <div className="pjs-orb pjs-orb-1" />
        <div className="pjs-orb pjs-orb-2" />

        {/* Header */}
        <div className="pjs-header">
          <div>
            <div className={`pjs-eyebrow${visible ? " in" : ""}`}>
              <span className="pjs-eyebrow-dot" />
              <TbLayoutGrid size={12} />
              {t("pj.eyebrow")}
            </div>
            <h1 className={`pjs-title${visible ? " in" : ""}`}>
              <span className="pjs-title-dim">{t("pj.title1")} </span>
              <span className="pjs-title-teal">{t("pj.title2")}</span>
              <span style={{ color: "var(--text-teal)" }}>.</span>
            </h1>
          </div>

          <div className={`pjs-nav-controls${visible ? " in" : ""}`}>
            {/* Tabs */}
            <div className="pjs-tabs">
              {projectsData.map((p, i) => (
                <button key={i} className={`pjs-tab${i === current ? " active" : ""}`} onClick={() => goTo(i)}>
                  {p.title.split(" ").slice(0, 2).join(" ")}
                </button>
              ))}
            </div>
            {/* Arrows */}
            <div className="pjs-arrow-group">
              <button className="pjs-arrow-btn" onClick={() => navigate(isRtl ? "right" : "left")} aria-label="Previous" disabled={phase !== "idle"}>
                <FiChevronLeft size={20} />
              </button>
              <button className="pjs-arrow-btn" onClick={() => navigate(isRtl ? "left" : "right")} aria-label="Next" disabled={phase !== "idle"}>
                <FiChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Slide */}
        <div className={`pjs-slide-wrap${visible ? " in" : ""}`}>
          <div className="pjs-slide-inner" style={slideStyle()}>
            <Project {...projectsData[current]} index={current} total={projectsData.length} />
          </div>
        </div>

        {/* Ticker */}
        <div className={`pjs-ticker-wrap${visible ? " in" : ""}`}>
          <div className="pjs-ticker-track">
            {[...Array(2)].map((_, rep) =>
              projectsData.map((p, i) => (
                <div className="pjs-ticker-item" key={`${rep}-${i}`}>
                  <span className="pjs-ticker-dot" />
                  {p.title}
                  <span className="pjs-ticker-dot" />
                  {p.role}
                  <span className="pjs-ticker-dot" />
                  {p.year}
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Projects;