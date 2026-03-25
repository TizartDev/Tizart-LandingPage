import { useState, useEffect, useRef, useCallback } from "react";
import Project from "./Project";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { TbLayoutGrid } from "react-icons/tb";
import { useLang } from "./Languagecontext";
import './Projects.css'

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
      image: "/Images/eco-tourism.webp",
    },
    {
      title: t("pj.p2.title"),
      description: t("pj.p2.desc"),
      client: "Sara Meziani",
      year: "2024",
      role: t("pj.p2.role"),
      techStack: ["React", "Node.js", "MongoDB", "Stripe"],
      image: "/Images/ecomm.webp",
    },
    {
      title: t("pj.p3.title"),
      description: t("pj.p3.desc"),
      client: "Karim Boudali",
      year: "2024",
      role: t("pj.p3.role"),
      techStack: ["React", "OpenAI", "Tailwind", "Firebase"],
      image: "/Images/ai-resume.webp",
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