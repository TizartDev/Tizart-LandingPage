import { useEffect, useRef, useState } from "react";
import { FaInstagramSquare } from "react-icons/fa";
import { MdFacebook, MdEmail } from "react-icons/md";
import { IoCall } from "react-icons/io5";
import { FiArrowUpRight, FiSend, FiUser, FiMessageSquare } from "react-icons/fi";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
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

const Contact = () => {
  const { ref: sectionRef, visible } = useInView();
  const { t, lang } = useLang();
  const isRtl = lang === "dz";
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const channels = [
    { icon: <MdEmail size={22} />, label: "Email",     value: "contact@tizart.dev",  href: "mailto:contact@tizart.dev", hint: t("ct.email.hint") },
    { icon: <IoCall size={22} />, label: "Phone",      value: "+213 5 62 74 31 35",  href: "tel:+213562743135",         hint: t("ct.phone.hint") },
    { icon: <FaInstagramSquare size={22} />, label: "Instagram", value: "@Tizart-Agency", href: "#", hint: t("ct.ig.hint") },
    { icon: <MdFacebook size={22} />, label: "Facebook", value: "Tizart-Agency",     href: "#",                         hint: t("ct.fb.hint") },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSending(true);
    setTimeout(() => { setSending(false); setSent(true); }, 1800);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        .ct-section { font-family: 'DM Sans', sans-serif; background: var(--bg-page); color: var(--text-primary); padding: 100px 72px 120px; position: relative; overflow: hidden; }
        .ct-bg-grid { position: absolute; inset: 0; background-image: radial-gradient(circle, var(--grid-line) 1px, transparent 1px); background-size: 36px 36px; pointer-events: none; z-index: 0; opacity: .45; }
        .ct-orb { position: absolute; border-radius: 50%; filter: blur(110px); pointer-events: none; z-index: 0; }
        .ct-orb-1 { width: 560px; height: 560px; background: radial-gradient(circle, var(--orb-1) 0%, transparent 70%); top: -120px; right: -120px; animation: ctFloat 16s ease-in-out infinite alternate; }
        .ct-orb-2 { width: 400px; height: 400px; background: radial-gradient(circle, var(--orb-2) 0%, transparent 70%); bottom: -80px; left: -80px; animation: ctFloat 20s 7s ease-in-out infinite alternate; }
        @keyframes ctFloat { from { transform: translate(0,0) scale(1); } to { transform: translate(26px,-26px) scale(1.09); } }

        .ct-header { text-align: center; margin-bottom: 72px; position: relative; z-index: 1; }

        .ct-eyebrow { display: inline-flex; align-items: center; gap: 8px; background: rgba(0,222,217,.08); border: 1px solid var(--border-mid); border-radius: 100px; padding: 6px 16px; font-size: 11px; font-weight: 500; color: var(--text-teal); letter-spacing: .1em; text-transform: uppercase; margin-bottom: 20px; opacity: 0; transform: translateY(20px); transition: opacity .6s, transform .6s; }
        .ct-eyebrow.in { opacity: 1; transform: translateY(0); }
        .ct-eyebrow-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--text-teal); animation: ctDot 2s ease-in-out infinite; }
        @keyframes ctDot { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:.3; transform:scale(.5); } }

        .ct-title { font-family: 'Syne', sans-serif; font-size: clamp(38px, 5vw, 70px); font-weight: 800; letter-spacing: -3px; line-height: 1.0; margin-bottom: 16px; color: var(--text-primary); opacity: 0; transform: translateY(26px); transition: opacity .7s .1s, transform .7s .1s; }
        .ct-title.in { opacity: 1; transform: translateY(0); }
        .ct-title-dim { color: var(--text-secondary); }
        .ct-title-teal { color: var(--text-teal); position: relative; display: inline-block; }
        .ct-title-teal::after { content: ''; position: absolute; left: 0; bottom: -5px; width: 0; height: 3px; background: linear-gradient(90deg, var(--text-teal), transparent); border-radius: 2px; transition: width 1.1s .9s cubic-bezier(.16,1,.3,1); }
        .ct-title-teal.in::after { width: 100%; }

        .ct-tagline { font-size: 17px; color: var(--text-secondary); max-width: 460px; margin: 0 auto; line-height: 1.7; opacity: 0; transform: translateY(18px); transition: opacity .7s .22s, transform .7s .22s; }
        .ct-tagline.in { opacity: 1; transform: translateY(0); }

        .ct-body { position: relative; z-index: 1; display: grid; grid-template-columns: 1fr 1.1fr; gap: 28px; align-items: start; }

        .ct-channels { display: flex; flex-direction: column; gap: 14px; opacity: 0; transform: translateX(-32px); transition: opacity .8s .12s, transform .8s .12s; }
        .ct-channels.in { opacity: 1; transform: translateX(0); }
        .ct-ch-header { margin-bottom: 8px; }
        .ct-ch-label { font-size: 10px; font-weight: 500; color: var(--text-teal); letter-spacing: .1em; text-transform: uppercase; display: flex; align-items: center; gap: 8px; }
        .ct-ch-label::after { content: ''; flex: 1; height: 1px; background: var(--border-subtle); }
        .ct-ch-title { font-family: 'Syne', sans-serif; font-size: clamp(20px, 2.2vw, 28px); font-weight: 800; letter-spacing: -1px; color: var(--text-primary); margin-top: 8px; }
        .ct-ch-sub { font-size: 14px; color: var(--text-secondary); margin-top: 6px; line-height: 1.6; }

        .ct-card { display: flex; align-items: center; gap: 16px; padding: 18px 20px; background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: 14px; text-decoration: none; transition: border-color .25s, background .25s, transform .22s, box-shadow .25s; cursor: pointer; opacity: 0; transform: translateY(20px); }
        .ct-card.in { opacity: 1; transform: translateY(0); }
        .ct-card:hover { border-color: var(--border-strong); background: var(--bg-card-hover); transform: translateY(-3px); box-shadow: var(--shadow-card); }
        .ct-card-icon-wrap { width: 46px; height: 46px; border-radius: 12px; background: rgba(0,222,217,.1); border: 1px solid var(--border-mid); display: flex; align-items: center; justify-content: center; color: var(--text-teal); flex-shrink: 0; transition: background .25s, box-shadow .25s; }
        .ct-card:hover .ct-card-icon-wrap { background: rgba(0,222,217,.18); box-shadow: 0 0 18px rgba(0,222,217,.3); }
        .ct-card-text { flex: 1; }
        .ct-card-label { font-size: 10px; font-weight: 500; color: var(--text-teal); opacity: .7; letter-spacing: .08em; text-transform: uppercase; margin-bottom: 3px; }
        .ct-card-value { font-size: 14px; font-weight: 500; color: var(--text-primary); }
        .ct-card-hint { font-size: 11px; color: var(--text-muted); margin-top: 2px; }
        .ct-card-arrow { color: var(--border-mid); transition: color .2s, transform .2s; flex-shrink: 0; }
        .ct-card:hover .ct-card-arrow { color: var(--text-teal); transform: translate(3px,-3px); }

        .ct-form-wrap { background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: 20px; padding: 40px 36px; opacity: 0; transform: translateX(32px); transition: opacity .8s .18s, transform .8s .18s; position: relative; overflow: hidden; }
        .ct-form-wrap.in { opacity: 1; transform: translateX(0); }
        .ct-form-wrap::before { content: ''; position: absolute; top: -70px; right: -70px; width: 200px; height: 200px; border-radius: 50%; border: 1px solid var(--border-subtle); pointer-events: none; }
        .ct-form-wrap::after { content: ''; position: absolute; top: -100px; right: -100px; width: 280px; height: 280px; border-radius: 50%; border: 1px solid rgba(0,222,217,.04); pointer-events: none; }

        .ct-form-header { margin-bottom: 28px; }
        .ct-form-kicker { font-size: 10px; font-weight: 500; color: var(--text-teal); letter-spacing: .1em; text-transform: uppercase; display: flex; align-items: center; gap: 8px; margin-bottom: 10px; }
        .ct-form-kicker-line { width: 24px; height: 1px; background: var(--text-teal); opacity: .6; }
        .ct-form-title { font-family: 'Syne', sans-serif; font-size: clamp(20px, 2.2vw, 28px); font-weight: 800; letter-spacing: -1px; color: var(--text-primary); }
        .ct-form-title span { color: var(--text-teal); }
        .ct-form-sub { font-size: 13px; color: var(--text-secondary); margin-top: 6px; line-height: 1.6; }

        .ct-field { margin-bottom: 18px; }
        .ct-field-label { display: flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 500; color: var(--text-secondary); letter-spacing: .06em; text-transform: uppercase; margin-bottom: 8px; }
        .ct-field-label-icon { color: var(--text-teal); opacity: .6; display: flex; }

        .ct-input, .ct-textarea { width: 100%; background: var(--bg-card-hover); border: 1px solid var(--border-subtle); border-radius: 10px; padding: 12px 16px; font-family: 'DM Sans', sans-serif; font-size: 14px; color: var(--text-primary); outline: none; transition: border-color .2s, background .2s, box-shadow .2s; box-sizing: border-box; }
        .ct-input::placeholder, .ct-textarea::placeholder { color: var(--text-muted); }
        .ct-input:focus, .ct-textarea:focus { border-color: var(--border-strong); background: rgba(0,222,217,.04); box-shadow: 0 0 0 3px rgba(0,222,217,.08); }
        .ct-textarea { resize: none; min-height: 110px; line-height: 1.65; }

        .ct-field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 18px; }

        .ct-submit { width: 100%; display: flex; align-items: center; justify-content: center; gap: 10px; padding: 14px; border-radius: 10px; background: var(--text-teal); color: #040f12; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 600; border: none; cursor: pointer; position: relative; overflow: hidden; box-shadow: var(--shadow-btn); transition: transform .15s, box-shadow .22s, opacity .2s; letter-spacing: .02em; }
        .ct-submit::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(255,255,255,.18) 0%, transparent 55%); pointer-events: none; }
        .ct-submit:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 0 44px rgba(0,222,217,.5); }
        .ct-submit:active { transform: scale(.98); }
        .ct-submit:disabled { opacity: .7; cursor: default; }

        .ct-spinner { width: 16px; height: 16px; border-radius: 50%; border: 2px solid rgba(4,15,18,.3); border-top-color: #040f12; animation: ctSpin .7s linear infinite; }
        @keyframes ctSpin { to { transform: rotate(360deg); } }

        .ct-success { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px; text-align: center; padding: 40px 20px; }
        .ct-success-icon { width: 64px; height: 64px; border-radius: 50%; background: rgba(0,222,217,.1); border: 1px solid var(--border-mid); display: flex; align-items: center; justify-content: center; color: var(--text-teal); animation: ctSuccessPop .5s cubic-bezier(.16,1,.3,1) both; }
        @keyframes ctSuccessPop { from { transform: scale(.4); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .ct-success-title { font-family: 'Syne', sans-serif; font-size: 22px; font-weight: 800; color: var(--text-primary); letter-spacing: -.5px; }
        .ct-success-title span { color: var(--text-teal); }
        .ct-success-sub { font-size: 14px; color: var(--text-secondary); line-height: 1.6; max-width: 280px; }

        @media (max-width: 1024px) { .ct-section { padding: 72px 32px 80px; } .ct-body { grid-template-columns: 1fr; } .ct-channels { transform: translateY(20px); } .ct-form-wrap { transform: translateY(20px); } }
        @media (max-width: 640px) { .ct-section { padding: 72px 20px 80px; } .ct-field-row { grid-template-columns: 1fr; } .ct-form-wrap { padding: 28px 20px; } }
      `}</style>

      <section className="ct-section" ref={sectionRef} dir={isRtl ? "rtl" : "ltr"}>
        <div className="ct-bg-grid" />
        <div className="ct-orb ct-orb-1" />
        <div className="ct-orb ct-orb-2" />

        <div className="ct-header">
          <div className={`ct-eyebrow${visible ? " in" : ""}`}>
            <span className="ct-eyebrow-dot" />
            <HiOutlineChatBubbleLeftRight size={12} />
            {t("ct.eyebrow")}
          </div>
          <h1 className={`ct-title${visible ? " in" : ""}`}>
            <span className="ct-title-dim">{t("ct.title1")} </span>
            <span className={`ct-title-teal${visible ? " in" : ""}`}>{t("ct.title2")}</span>
          </h1>
          <p className={`ct-tagline${visible ? " in" : ""}`}>{t("ct.tagline")}</p>
        </div>

        <div className="ct-body">
          <div className={`ct-channels${visible ? " in" : ""}`}>
            <div className="ct-ch-header">
              <div className="ct-ch-label">Contact Channels</div>
              <div className="ct-ch-title">{t("ct.ch.title")}</div>
              <div className="ct-ch-sub">{t("ct.ch.sub")}</div>
            </div>
            {channels.map((ch, i) => (
              <a
                key={ch.label} href={ch.href}
                className={`ct-card${visible ? " in" : ""}`}
                style={{ transitionDelay: visible ? `${0.18 + i * 0.1}s` : "0s" }}
              >
                <div className="ct-card-icon-wrap">{ch.icon}</div>
                <div className="ct-card-text">
                  <div className="ct-card-label">{ch.label}</div>
                  <div className="ct-card-value">{ch.value}</div>
                  <div className="ct-card-hint">{ch.hint}</div>
                </div>
                <div className="ct-card-arrow"><FiArrowUpRight size={16} /></div>
              </a>
            ))}
          </div>

          <div className={`ct-form-wrap${visible ? " in" : ""}`}>
            {sent ? (
              <div className="ct-success">
                <div className="ct-success-icon"><FiSend size={26} /></div>
                <div className="ct-success-title">
                  {t("ct.success.title1")} <span>{t("ct.success.title2")}</span>
                </div>
                <div className="ct-success-sub">{t("ct.success.sub")}</div>
              </div>
            ) : (
              <>
                <div className="ct-form-header">
                  <div className="ct-form-kicker">
                    <div className="ct-form-kicker-line" />
                    {t("ct.form.kicker")}
                  </div>
                  <div className="ct-form-title">
                    {t("ct.form.title1")} <span>{t("ct.form.title2")}</span>
                  </div>
                  <div className="ct-form-sub">{t("ct.form.sub")}</div>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="ct-field-row">
                    <div className="ct-field">
                      <div className="ct-field-label">
                        <span className="ct-field-label-icon"><FiUser size={11} /></span>
                        {t("ct.name")}
                      </div>
                      <input className="ct-input" type="text" placeholder={t("ct.name.ph")} value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} required />
                    </div>
                    <div className="ct-field">
                      <div className="ct-field-label">
                        <span className="ct-field-label-icon"><MdEmail size={11} /></span>
                        {t("ct.email")}
                      </div>
                      <input className="ct-input" type="email" placeholder={t("ct.email.ph")} value={formData.email} onChange={e => setFormData(p => ({ ...p, email: e.target.value }))} required />
                    </div>
                  </div>
                  <div className="ct-field">
                    <div className="ct-field-label">
                      <span className="ct-field-label-icon"><FiMessageSquare size={11} /></span>
                      {t("ct.msg")}
                    </div>
                    <textarea className="ct-textarea" placeholder={t("ct.msg.ph")} value={formData.message} onChange={e => setFormData(p => ({ ...p, message: e.target.value }))} required />
                  </div>
                  <button className="ct-submit" type="submit" disabled={sending}>
                    {sending ? (
                      <><div className="ct-spinner" />{t("ct.sending")}</>
                    ) : (
                      <><FiSend size={14} />{t("ct.send")}</>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;