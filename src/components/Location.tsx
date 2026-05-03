import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import worldData from 'world-atlas/countries-50m.json';

const HIGHLIGHT = new Set([504, 732]);

const CITIES: { name: string; coords: [number, number]; main?: boolean }[] = [
  { name: 'Casablanca', coords: [-7.62, 33.59], main: true },
  { name: 'Rabat',      coords: [-6.83, 34.01] },
  { name: 'Salé',       coords: [-6.79, 34.05] },
  { name: 'Kenitra',    coords: [-6.58, 34.26] },
  { name: 'Fes',        coords: [-5.00, 34.03] },
  { name: 'Meknes',     coords: [-5.55, 33.89] },
  { name: 'Tangier',    coords: [-5.80, 35.76] },
  { name: 'Oujda',      coords: [-1.91, 34.68] },
  { name: 'Marrakech',  coords: [-7.99, 31.63] },
  { name: 'Agadir',     coords: [-9.60, 30.43] },
];

const CASABLANCA: [number, number] = [-7.62, 33.59];

const ARC_TARGETS: [number, number][] = [
  [2.35,   48.85],
  [-74.0,  40.7 ],
  [55.3,   25.2 ],
  [-46.6, -23.5 ],
];

const ARC_LINES = ARC_TARGETS.map(target => {
  const interp = d3.geoInterpolate(CASABLANCA, target);
  return Array.from({ length: 65 }, (_, i) => interp(i / 64) as [number, number]);
});

const FLY_DURATION = 2600;
const FLY_START_LON = -68;
const FLY_END_LON   = 5;

function easeOutCubic(t: number) { return 1 - Math.pow(1 - t, 3); }

function getMoroccoClock() {
  return new Date().toLocaleTimeString('en-GB', {
    timeZone: 'Africa/Casablanca',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
  });
}

export default function Location() {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const rafRef     = useRef<number>(0);
  const pausedRef  = useRef(false);
  const [clock, setClock] = useState(getMoroccoClock);

  useEffect(() => {
    const id = setInterval(() => setClock(getMoroccoClock()), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const W = window.innerWidth;
    const H = window.innerHeight;
    canvas.width  = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d')!;

    const isMobile = W < 768;
    const SCALE    = Math.min(W, H) * (isMobile ? 0.72 : 0.64);
    const CX       = W / 2;
    const CY       = H / 2 + SCALE * 0.08;

    const proj = d3.geoOrthographic()
      .scale(SCALE)
      .translate([CX, CY])
      .rotate([FLY_START_LON, -22, 0]);

    const gp        = d3.geoPath().projection(proj).context(ctx);
    const graticule = d3.geoGraticule()();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const world   = worldData as any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const feat    = topojson.feature(world, world.objects.countries) as any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const borders = topojson.mesh(world, world.objects.countries, (a: any, b: any) => a !== b);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const morocco = feat.features.filter((f: any) => HIGHLIGHT.has(+f.id));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const others  = feat.features.filter((f: any) => !HIGHLIGHT.has(+f.id));

    // Stars — fewer on mobile
    const starCount = isMobile ? 90 : 240;
    const stars = Array.from({ length: starCount }, () => {
      let x: number, y: number;
      do { x = Math.random() * W; y = Math.random() * H; }
      while (Math.hypot(x - CX, y - CY) < SCALE * 1.15);
      return { x, y, r: Math.random() * 1.0 + 0.2, base: Math.random() * 0.5 + 0.1, speed: Math.random() * 1.5 + 0.4, phase: Math.random() * Math.PI * 2 };
    });

    // Precompute static screen-space gradients (avoids recreating every frame)
    const atm2 = ctx.createRadialGradient(CX, CY, SCALE * 0.96, CX, CY, SCALE * 1.18);
    atm2.addColorStop(0, 'rgba(60,90,200,0.14)'); atm2.addColorStop(0.6, 'rgba(40,60,160,0.05)'); atm2.addColorStop(1, 'transparent');

    const atm1 = ctx.createRadialGradient(CX, CY, SCALE * 0.93, CX, CY, SCALE * 1.04);
    atm1.addColorStop(0, 'rgba(110,140,255,0.28)'); atm1.addColorStop(0.6, 'rgba(80,110,230,0.1)'); atm1.addColorStop(1, 'transparent');

    const og = ctx.createRadialGradient(CX - SCALE * 0.18, CY - SCALE * 0.22, 0, CX, CY, SCALE);
    og.addColorStop(0, '#1e2580'); og.addColorStop(0.45, '#0d1255'); og.addColorStop(1, '#04051a');

    const vg = ctx.createRadialGradient(CX - SCALE * 0.1, CY - SCALE * 0.18, SCALE * 0.2, CX, CY, SCALE);
    vg.addColorStop(0, 'transparent'); vg.addColorStop(0.58, 'rgba(4,5,26,0.2)'); vg.addColorStop(1, 'rgba(4,5,26,0.9)');

    const sg = ctx.createRadialGradient(CX - SCALE * 0.38, CY - SCALE * 0.38, 0, CX - SCALE * 0.15, CY - SCALE * 0.15, SCALE * 0.72);
    sg.addColorStop(0, 'rgba(255,255,255,0.13)'); sg.addColorStop(0.35, 'rgba(200,220,255,0.05)'); sg.addColorStop(1, 'transparent');

    // Shadow blur scales — cheaper on mobile
    const shadowScale = isMobile ? 0.45 : 1.0;

    let flyStartTime: number | null = null;
    let flyDone = false;

    function drawArcs(arcProgress: number) {
      if (arcProgress <= 0 || isMobile) return;
      ARC_LINES.forEach((points, i) => {
        const stagger = i * 0.14;
        const local = Math.max(0, Math.min(1, (arcProgress - stagger) / (1 - stagger)));
        if (local <= 0) return;

        const count = Math.max(2, Math.ceil(points.length * local));
        const partial = {
          type: 'Feature' as const,
          geometry: { type: 'LineString' as const, coordinates: points.slice(0, count) },
          properties: {},
        };

        ctx.save();
        ctx.beginPath();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        gp(partial as any);
        ctx.setLineDash([3, 7]);
        ctx.strokeStyle = `rgba(120,155,255,${(0.22 * local).toFixed(3)})`;
        ctx.lineWidth = 0.9;
        ctx.stroke();

        const tip = points[count - 1];
        const tipPt = proj(tip);
        if (tipPt) {
          const [tx, ty] = tipPt;
          if (Math.hypot(tx - CX, ty - CY) <= SCALE) {
            ctx.setLineDash([]);
            ctx.shadowBlur = 10;
            ctx.shadowColor = 'rgba(150,185,255,0.9)';
            ctx.beginPath();
            ctx.arc(tx, ty, 2.2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(190,215,255,${(0.85 * local).toFixed(3)})`;
            ctx.fill();
          }
        }
        ctx.restore();
      });
    }

    function frame(timestamp: number) {
      if (pausedRef.current) { rafRef.current = 0; return; }
      if (flyStartTime === null) flyStartTime = timestamp;
      const t = Date.now() / 1000;

      let arcProgress = 0;
      if (!flyDone) {
        const flyT = Math.min((timestamp - flyStartTime) / FLY_DURATION, 1);
        proj.rotate([FLY_START_LON + (FLY_END_LON - FLY_START_LON) * easeOutCubic(flyT), -22, 0]);
        if (flyT >= 1) flyDone = true;
        arcProgress = Math.max(0, (flyT - 0.65) / 0.35);
      } else {
        proj.rotate([FLY_END_LON + 7 * Math.sin(t * 0.13), -22, 0]);
        arcProgress = 1;
      }

      ctx.clearRect(0, 0, W, H);

      // Stars
      stars.forEach(s => {
        const o = s.base * (0.6 + 0.4 * Math.sin(t * s.speed + s.phase));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${o.toFixed(2)})`;
        ctx.fill();
      });

      // Atmosphere
      ctx.beginPath(); ctx.arc(CX, CY, SCALE * 1.18, 0, Math.PI * 2); ctx.fillStyle = atm2; ctx.fill();
      ctx.beginPath(); ctx.arc(CX, CY, SCALE * 1.04, 0, Math.PI * 2); ctx.fillStyle = atm1; ctx.fill();

      // Sphere clip
      ctx.save();
      ctx.beginPath();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      gp({ type: 'Sphere' } as any);
      ctx.clip();

      ctx.fillStyle = og;
      ctx.fillRect(CX - SCALE - 2, CY - SCALE - 2, (SCALE + 2) * 2, (SCALE + 2) * 2);

      ctx.beginPath();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      gp(graticule as any);
      ctx.strokeStyle = 'rgba(255,255,255,0.05)'; ctx.lineWidth = 0.5; ctx.stroke();

      ctx.beginPath();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      others.forEach((f: any) => gp(f));
      ctx.fillStyle = '#171d72'; ctx.fill();

      ctx.beginPath();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      gp(borders as any);
      ctx.strokeStyle = '#2b3cbb'; ctx.lineWidth = 0.4; ctx.stroke();

      ctx.beginPath(); ctx.arc(CX, CY, SCALE, 0, Math.PI * 2); ctx.fillStyle = vg; ctx.fill();
      ctx.beginPath(); ctx.arc(CX, CY, SCALE, 0, Math.PI * 2); ctx.fillStyle = sg; ctx.fill();

      drawArcs(arcProgress);

      ctx.restore();

      // Rim
      ctx.beginPath(); ctx.arc(CX, CY, SCALE, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(110,140,255,0.22)'; ctx.lineWidth = 1.8; ctx.stroke();

      // Morocco glow
      const breathe = (55 + 18 * Math.sin(t * 0.9)) * shadowScale;
      ctx.save();
      ctx.beginPath();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      morocco.forEach((f: any) => gp(f));
      ctx.shadowBlur = breathe; ctx.shadowColor = 'rgba(255,255,255,0.55)';
      ctx.fillStyle = 'rgba(255,255,255,0.14)'; ctx.fill();
      ctx.shadowBlur = breathe * 0.45; ctx.shadowColor = 'rgba(210,220,255,0.5)'; ctx.fill();
      ctx.restore();

      ctx.beginPath();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      morocco.forEach((f: any) => gp(f));
      ctx.fillStyle = '#ffffff'; ctx.fill();

      ctx.beginPath();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      morocco.forEach((f: any) => gp(f));
      ctx.strokeStyle = 'rgba(255,255,255,0.38)'; ctx.lineWidth = 0.8; ctx.stroke();

      // City dots
      CITIES.forEach(city => {
        const pt = proj(city.coords);
        if (!pt) return;
        const [px, py] = pt;
        if (px < 0 || px > W || py < 0 || py > H) return;

        if (city.main) {
          const pulse = (Math.sin(t * 2.2) + 1) / 2;
          ctx.beginPath();
          ctx.arc(px, py, 7 + 6 * pulse, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255,255,255,${(0.55 * (1 - pulse)).toFixed(2)})`;
          ctx.lineWidth = 1; ctx.stroke();
          ctx.beginPath();
          ctx.arc(px, py, 7, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(255,255,255,0.2)'; ctx.lineWidth = 0.8; ctx.stroke();
          ctx.save();
          ctx.shadowBlur = 10 * shadowScale; ctx.shadowColor = 'rgba(27,31,107,0.9)';
          ctx.beginPath(); ctx.arc(px, py, 3.5, 0, Math.PI * 2);
          ctx.fillStyle = '#1B1F6B'; ctx.fill();
          ctx.restore();
        } else {
          ctx.save();
          ctx.beginPath(); ctx.arc(px, py, 6, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(255,255,255,0.12)'; ctx.lineWidth = 1; ctx.stroke();
          ctx.shadowBlur = 10 * shadowScale; ctx.shadowColor = 'rgba(255,255,255,0.8)';
          ctx.beginPath(); ctx.arc(px, py, 3, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255,255,255,0.9)'; ctx.fill();
          ctx.restore();
        }
      });

      rafRef.current = requestAnimationFrame(frame);
    }

    rafRef.current = requestAnimationFrame(frame);

    // Pause animation when section is off-screen
    const observer = new IntersectionObserver(entries => {
      const isVisible = entries[0].isIntersecting;
      pausedRef.current = !isVisible;
      if (isVisible && rafRef.current === 0) {
        rafRef.current = requestAnimationFrame(frame);
      }
    }, { threshold: 0.05 });
    observer.observe(canvas);

    return () => {
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
    };
  }, []);

  return (
    <section style={{ position: 'relative', height: '100vh', overflow: 'hidden', background: '#05061a' }}>
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />

      {/* Live clock — HUD targeting frame */}
      <div style={{
        position: 'absolute',
        top: 'clamp(72px, 9vh, 110px)',
        right: 'clamp(24px, 5vw, 72px)',
        zIndex: 10,
        pointerEvents: 'none',
        animation: `locClockIn 0.6s ${FLY_DURATION}ms both`,
      }}>
        {/* Inner frame — corner brackets + scan */}
        <div style={{
          position: 'relative',
          padding: '18px 22px 20px',
          background: 'rgba(6,8,32,0.42)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          overflow: 'hidden',
        }}>
          {/* Corner brackets */}
          {[
            { top: 0, left: 0,   borderTop: '1px solid rgba(255,255,255,0.5)', borderLeft:  '1px solid rgba(255,255,255,0.5)' },
            { top: 0, right: 0,  borderTop: '1px solid rgba(255,255,255,0.5)', borderRight: '1px solid rgba(255,255,255,0.5)' },
            { bottom: 0, left: 0,  borderBottom: '1px solid rgba(255,255,255,0.5)', borderLeft:  '1px solid rgba(255,255,255,0.5)' },
            { bottom: 0, right: 0, borderBottom: '1px solid rgba(255,255,255,0.5)', borderRight: '1px solid rgba(255,255,255,0.5)' },
          ].map((s, i) => (
            <div key={i} style={{
              position: 'absolute', width: 13, height: 13,
              animation: `locCornerIn 0.4s ${FLY_DURATION + 200}ms both`,
              ...s,
            }} />
          ))}

          {/* Scan line */}
          <div style={{
            position: 'absolute', left: 0, right: 0, height: 1,
            background: 'linear-gradient(to right, transparent, rgba(140,175,255,0.45), transparent)',
            animation: `locScan 2.8s ${FLY_DURATION + 1200}ms linear infinite`,
          }} />

          {/* Label row */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
            gap: '8px', marginBottom: '10px',
          }}>
            <span style={{
              fontFamily: 'Outfit, sans-serif', fontSize: '8px',
              letterSpacing: '4px', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.5)',
            }}>
              Casablanca
            </span>
            <div style={{
              width: '5px', height: '5px', borderRadius: '50%',
              background: '#3dff7a', flexShrink: 0,
              animation: 'locDotPulse 2s ease-in-out infinite',
            }} />
          </div>

          {/* Time */}
          <div style={{
            fontFamily: 'Courier New, monospace',
            fontSize: 'clamp(22px, 2.4vw, 30px)',
            fontWeight: 400,
            color: '#ffffff',
            letterSpacing: '5px',
            lineHeight: 1,
            textAlign: 'right',
            textShadow: '0 0 22px rgba(170,200,255,0.5), 0 0 60px rgba(120,160,255,0.2)',
          }}>
            {clock}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 5,
        padding: 'clamp(28px, 4.5vw, 60px) clamp(32px, 6vw, 80px)',
        background: 'linear-gradient(to top, rgba(5,6,26,0.95) 0%, rgba(5,6,26,0.6) 50%, transparent 100%)',
        display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
        gap: '20px', flexWrap: 'wrap',
      }}>
        <div>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            marginBottom: '16px',
          }}>
            <div style={{ width: '20px', height: '1px', background: 'rgba(255,255,255,0.4)' }} />
            <p style={{
              fontFamily: 'Outfit, sans-serif', fontSize: '11px',
              letterSpacing: '5px', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.65)',
            }}>
              Production Base
            </p>
            <div style={{ width: '20px', height: '1px', background: 'rgba(255,255,255,0.4)' }} />
          </div>
          <h2 style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: 'clamp(60px, 10vw, 128px)',
            fontWeight: 800, lineHeight: 0.88, letterSpacing: '-4px', color: 'white',
            marginBottom: '16px',
          }}>
            Morocco.
          </h2>
          <p style={{
            fontFamily: 'Outfit, sans-serif', fontSize: '15px',
            fontWeight: 300, letterSpacing: '0.04em',
            color: 'rgba(255,255,255,0.55)',
            marginTop: '8px',
          }}>
            Serving clients across Morocco and beyond.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '9px', marginTop: '18px' }}>
            <div style={{
              width: '7px', height: '7px', borderRadius: '50%',
              background: '#3dff7a', flexShrink: 0,
              animation: 'locDotPulse 2s ease-in-out infinite',
            }} />
            <span style={{
              fontFamily: 'Outfit, sans-serif', fontSize: '9px',
              letterSpacing: '3px', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.3)',
            }}>
              Available Worldwide
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes locDotPulse {
          0%, 100% { box-shadow: 0 0 6px #3dff7a; }
          50%       { box-shadow: 0 0 20px #3dff7a, 0 0 40px rgba(61,255,122,0.18); }
        }
        @keyframes locClockIn {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes locCornerIn {
          from { width: 0; height: 0; opacity: 0; }
          to   { width: 13px; height: 13px; opacity: 1; }
        }
        @keyframes locScan {
          0%   { top: 0%;   opacity: 0; }
          8%   { opacity: 1; }
          92%  { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </section>
  );
}
