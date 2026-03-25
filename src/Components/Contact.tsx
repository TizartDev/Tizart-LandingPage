import { useEffect, useRef, useState } from "react";
import { FaInstagramSquare } from "react-icons/fa";
import { MdFacebook, MdEmail } from "react-icons/md";
import { IoCall } from "react-icons/io5";
import { FiArrowUpRight, FiSend, FiUser, FiMessageSquare } from "react-icons/fi";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import { useLang } from "./Languagecontext";
import './Contact.css'

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