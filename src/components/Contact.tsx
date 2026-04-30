import { useState, type FormEvent, type CSSProperties } from 'react';
import { motion } from 'motion/react';

const NAVY = '#1B1F6B';
const WHITE = '#FFFFFF';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', service: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Project Inquiry — ${form.service || 'General'}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nService: ${form.service}\n\n${form.message}`
    );
    window.location.href = `mailto:contact@prodyous.com?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const inputStyle: CSSProperties = {
    fontFamily: '"Outfit", sans-serif',
    fontWeight: 300,
    fontSize: '15px',
    color: WHITE,
    backgroundColor: 'transparent',
    border: 'none',
    borderBottom: `1px solid ${WHITE}35`,
    padding: '16px 0',
    width: '100%',
    outline: 'none',
    transition: 'border-color 0.3s ease',
  };

  const labelStyle: CSSProperties = {
    fontFamily: '"Outfit", sans-serif',
    fontSize: '11px',
    fontWeight: 400,
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    color: `${WHITE}60`,
    display: 'block',
    marginBottom: '4px',
  };

  return (
    <section
      id="contact"
      style={{
        backgroundColor: NAVY,
        padding: 'clamp(80px, 10vh, 140px) clamp(20px, 4vw, 60px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background text */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontFamily: '"Syne", sans-serif',
        fontWeight: 800,
        fontSize: 'clamp(80px, 14vw, 200px)',
        color: `${WHITE}04`,
        whiteSpace: 'nowrap',
        pointerEvents: 'none',
        userSelect: 'none',
        letterSpacing: '-0.04em',
      }}>
        CONTACT
      </div>

      <div style={{ maxWidth: '960px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ marginBottom: 'clamp(48px, 6vh, 80px)' }}
        >
          <p style={{
            fontFamily: '"Outfit", sans-serif',
            fontSize: '12px',
            fontWeight: 400,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: `${WHITE}40`,
            marginBottom: '16px',
          }}>
            Ready to Collaborate?
          </p>
          <h2 style={{
            fontFamily: '"Syne", sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(36px, 5vw, 72px)',
            color: WHITE,
            letterSpacing: '-0.03em',
            lineHeight: 1,
          }}>
            Let's create<br />something real.
          </h2>
          <p style={{
            fontFamily: '"Outfit", sans-serif',
            fontWeight: 300,
            fontSize: '15px',
            color: `${WHITE}55`,
            marginTop: '24px',
            maxWidth: '480px',
            lineHeight: 1.7,
          }}>
            📍 Morocco &nbsp;·&nbsp; 📩 contact@prodyous.com
          </p>
        </motion.div>

        {sent ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              border: `1px solid ${WHITE}20`,
              padding: '48px',
              textAlign: 'center',
            }}
          >
            <p style={{ fontFamily: '"Syne", sans-serif', fontWeight: 700, fontSize: '28px', color: WHITE, letterSpacing: '-0.02em', marginBottom: '12px' }}>
              Message sent.
            </p>
            <p style={{ fontFamily: '"Outfit", sans-serif', fontWeight: 300, fontSize: '15px', color: `${WHITE}60` }}>
              We'll be in touch shortly at {form.email}
            </p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            onSubmit={handleSubmit}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '40px' }}
              className="contact-grid">
              <div>
                <label style={labelStyle}>Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Your name"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  style={{ ...inputStyle, caretColor: WHITE }}
                  onFocus={e => (e.currentTarget.style.borderBottomColor = WHITE)}
                  onBlur={e => (e.currentTarget.style.borderBottomColor = `${WHITE}20`)}
                />
              </div>
              <div>
                <label style={labelStyle}>Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  style={{ ...inputStyle, caretColor: WHITE }}
                  onFocus={e => (e.currentTarget.style.borderBottomColor = WHITE)}
                  onBlur={e => (e.currentTarget.style.borderBottomColor = `${WHITE}20`)}
                />
              </div>
            </div>

            <div style={{ marginBottom: '40px' }}>
              <label style={labelStyle}>Service</label>
              <select
                value={form.service}
                onChange={e => setForm(f => ({ ...f, service: e.target.value }))}
                style={{
                  ...inputStyle,
                  cursor: 'pointer',
                  appearance: 'none' as const,
                  WebkitAppearance: 'none' as const,
                }}
                onFocus={e => (e.currentTarget.style.borderBottomColor = WHITE)}
                onBlur={e => (e.currentTarget.style.borderBottomColor = `${WHITE}20`)}
              >
                <option value="" style={{ backgroundColor: NAVY }}>Select a service…</option>
                <option value="Film Direction" style={{ backgroundColor: NAVY }}>Film Direction</option>
                <option value="Graduation Film" style={{ backgroundColor: NAVY }}>Graduation Film</option>
                <option value="Wedding Film" style={{ backgroundColor: NAVY }}>Wedding Film</option>
                <option value="Corporate Event" style={{ backgroundColor: NAVY }}>Corporate Event</option>
                <option value="Photography" style={{ backgroundColor: NAVY }}>Photography</option>
                <option value="Content Creation" style={{ backgroundColor: NAVY }}>Content Creation</option>
              </select>
            </div>

            <div style={{ marginBottom: '52px' }}>
              <label style={labelStyle}>Your Message</label>
              <textarea
                required
                rows={5}
                placeholder="Tell us about your project…"
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                style={{
                  ...inputStyle,
                  resize: 'vertical' as const,
                  borderBottom: 'none',
                  border: `1px solid ${WHITE}20`,
                  padding: '20px',
                  marginTop: '4px',
                  caretColor: WHITE,
                }}
                onFocus={e => (e.currentTarget.style.borderColor = `${WHITE}60`)}
                onBlur={e => (e.currentTarget.style.borderColor = `${WHITE}20`)}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '32px', flexWrap: 'wrap' as const }}>
              <button
                type="submit"
                style={{
                  fontFamily: '"Outfit", sans-serif',
                  fontSize: '12px',
                  fontWeight: 400,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase' as const,
                  color: NAVY,
                  backgroundColor: WHITE,
                  border: 'none',
                  padding: '18px 48px',
                  cursor: 'pointer',
                  transition: 'opacity 0.2s ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                Send Inquiry →
              </button>
              <a
                href="mailto:contact@prodyous.com"
                style={{
                  fontFamily: '"Outfit", sans-serif',
                  fontSize: '13px',
                  fontWeight: 300,
                  color: `${WHITE}50`,
                  textDecoration: 'none',
                  letterSpacing: '0.06em',
                }}
              >
                or email us directly
              </a>
            </div>
          </motion.form>
        )}

        {/* Instagram links */}
        <div style={{
          marginTop: '80px',
          paddingTop: '48px',
          borderTop: `1px solid ${WHITE}10`,
          display: 'flex',
          gap: '40px',
          flexWrap: 'wrap' as const,
        }}>
          {[
            { handle: '@youssef_tayibi', url: 'https://www.instagram.com/youssef_tayibi/', desc: 'Personal' },
            { handle: '@prodyous.ma', url: 'https://www.instagram.com/prodyous.ma/', desc: 'Agency' },
          ].map(ig => (
            <a
              key={ig.handle}
              href={ig.url}
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'flex',
                flexDirection: 'column' as const,
                gap: '4px',
                textDecoration: 'none',
              }}
            >
              <span style={{ fontFamily: '"Syne", sans-serif', fontWeight: 700, fontSize: '16px', color: WHITE, letterSpacing: '-0.01em' }}>
                {ig.handle}
              </span>
              <span style={{ fontFamily: '"Outfit", sans-serif', fontSize: '11px', color: `${WHITE}40`, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                Instagram · {ig.desc}
              </span>
            </a>
          ))}
        </div>
      </div>

      <style>{`
        .contact-grid { grid-template-columns: 1fr 1fr; }
        @media (max-width: 600px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
        input::placeholder, textarea::placeholder {
          color: rgba(255,255,255,0.25);
        }
        select option {
          color: #FFFFFF;
        }
      `}</style>
    </section>
  );
}
