import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const NAVY  = '#1B1F6B';
const WHITE = '#FFFFFF';

const PROJECT_TYPES = [
  'Film Production',
  'Photography',
  'Brand Content',
  'Event Coverage',
  'Documentary',
  'Other',
];

const label: React.CSSProperties = {
  fontFamily: '"Montserrat", sans-serif',
  fontSize: '10px', letterSpacing: '2px',
  textTransform: 'uppercase', color: `${NAVY}70`,
  display: 'block', marginBottom: '8px',
};

const field: React.CSSProperties = {
  width: '100%', boxSizing: 'border-box',
  fontFamily: '"Montserrat", sans-serif',
  fontSize: '14px', color: NAVY,
  backgroundColor: '#f5f5fb',
  border: `1px solid ${NAVY}18`,
  padding: '13px 14px', outline: 'none',
};

export default function ProjectModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [name,    setName]    = useState('');
  const [email,   setEmail]   = useState('');
  const [type,    setType]    = useState('');
  const [message, setMessage] = useState('');
  const [sent,    setSent]    = useState(false);

  const reset = () => { setName(''); setEmail(''); setType(''); setMessage(''); setSent(false); };

  const handleClose = () => { onClose(); setTimeout(reset, 400); };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Project Inquiry — ${type || 'General'}`);
    const body    = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nType: ${type}\n\n${message}`);
    window.open(`mailto:contact@prodyous.com?subject=${subject}&body=${body}`);
    setSent(true);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={handleClose}
            style={{
              position: 'fixed', inset: 0, zIndex: 200,
              background: 'rgba(10,12,40,0.75)',
              backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
            }}
          />

          <motion.div
            key="modal"
            initial={{ opacity: 0, y: 36, scale: 0.96 }}
            animate={{ opacity: 1, y: 0,  scale: 1    }}
            exit={{    opacity: 0, y: 24, scale: 0.97  }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 201,
              width: 'min(560px, calc(100vw - 32px))',
              maxHeight: '90vh', overflowY: 'auto',
              backgroundColor: WHITE,
              padding: 'clamp(32px, 5vw, 52px)',
            }}
          >
            <button
              onClick={handleClose}
              style={{
                position: 'absolute', top: '18px', right: '20px',
                background: 'none', border: 'none', cursor: 'pointer',
                color: `${NAVY}50`, fontSize: '22px', lineHeight: 1, padding: '4px 8px',
              }}
              aria-label="Close"
            >×</button>

            {!sent ? (
              <>
                <p style={{ fontFamily: '"Montserrat", sans-serif', fontSize: '10px', letterSpacing: '4px', textTransform: 'uppercase', color: `${NAVY}55`, marginBottom: '10px' }}>
                  New Project
                </p>
                <h2 style={{ fontFamily: '"Cunia", sans-serif', fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 400, color: NAVY, letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '36px' }}>
                  Tell us about<br />your vision.
                </h2>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }} className="modal-grid">
                    <div>
                      <label style={label}>Name</label>
                      <input required value={name} onChange={e => setName(e.target.value)} style={field} placeholder="Your name" />
                    </div>
                    <div>
                      <label style={label}>Email</label>
                      <input required type="email" value={email} onChange={e => setEmail(e.target.value)} style={field} placeholder="your@email.com" />
                    </div>
                  </div>

                  <div>
                    <label style={label}>Project Type</label>
                    <select required value={type} onChange={e => setType(e.target.value)} style={{ ...field, appearance: 'none', cursor: 'pointer' }}>
                      <option value="">Select a type</option>
                      {PROJECT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>

                  <div>
                    <label style={label}>Tell us more</label>
                    <textarea value={message} onChange={e => setMessage(e.target.value)} style={{ ...field, height: '120px', resize: 'none' } as React.CSSProperties} placeholder="Describe your project, timeline, location…" />
                  </div>

                  <button
                    type="submit"
                    style={{
                      marginTop: '4px',
                      fontFamily: '"Montserrat", sans-serif',
                      fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase',
                      color: WHITE, backgroundColor: NAVY,
                      border: 'none', padding: '18px', cursor: 'pointer', width: '100%',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                    onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                  >
                    Send Inquiry
                  </button>
                </form>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '32px 0' }}>
                <div style={{ width: '52px', height: '52px', borderRadius: '50%', border: `2px solid ${NAVY}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: '22px', color: NAVY }}>✓</div>
                <h3 style={{ fontFamily: '"Cunia", sans-serif', fontSize: '28px', color: NAVY, marginBottom: '12px' }}>We'll be in touch.</h3>
                <p style={{ fontFamily: '"Montserrat", sans-serif', color: `${NAVY}70`, fontSize: '14px', lineHeight: 1.6 }}>
                  Your mail client should have opened.<br />We'll get back to you shortly.
                </p>
                <button onClick={handleClose} style={{ marginTop: '32px', fontFamily: '"Montserrat", sans-serif', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: NAVY, background: 'none', border: `1px solid ${NAVY}30`, padding: '12px 32px', cursor: 'pointer' }}>
                  Close
                </button>
              </div>
            )}
          </motion.div>

          <style>{`
            @media (max-width: 480px) { .modal-grid { grid-template-columns: 1fr !important; } }
          `}</style>
        </>
      )}
    </AnimatePresence>
  );
}
