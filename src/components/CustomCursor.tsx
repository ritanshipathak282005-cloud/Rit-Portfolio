import React, { useEffect, useRef, useState, memo } from 'react';

interface CustomCursorProps {
  hoverLabel?: string | null;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  birthTime: number;
  lifetime: number;
  size: number;
  type: 'star' | 'dot';
  rotation: number;
  rotationSpeed: number;
  opacity: number;
}

function drawFourPointStar(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
  rot: number
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rot);
  ctx.beginPath();
  const innerR = r * 0.22;
  for (let i = 0; i < 4; i++) {
    const angle = (i * Math.PI) / 2;
    const innerAngle = angle + Math.PI / 4;
    if (i === 0) {
      ctx.moveTo(Math.cos(angle) * r, Math.sin(angle) * r);
    } else {
      ctx.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
    }
    ctx.lineTo(Math.cos(innerAngle) * innerR, Math.sin(innerAngle) * innerR);
  }
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

export const CustomCursor: React.FC<CustomCursorProps> = memo(({ hoverLabel }) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const scissorRef = useRef<HTMLDivElement>(null);
  const halfARef = useRef<SVGGElement>(null);
  const halfBRef = useRef<SVGGElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastSnipTime = useRef<number>(0);

  const [isInteractive, setIsInteractive] = useState(false);
  const isInteractiveRef = useRef(false);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    isInteractiveRef.current = isInteractive;
  }, [isInteractive]);

  useEffect(() => {
    document.documentElement.classList.add('custom-cursor-active');

    let mouseX = -100;
    let mouseY = -100;
    let cursorX = -100;
    let cursorY = -100;
    let prevX = -100;
    let prevY = -100;
    let particleSeq = 0;

    const particles: Particle[] = [];
    const trailHistory: { x: number; y: number; time: number }[] = [];
    const MAX_PARTICLES = 28;
    const MAX_TRAIL = 16;
    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        cursorX = mouseX;
        cursorY = mouseY;
        prevX = mouseX;
        prevY = mouseY;
        trailHistory.length = 0;
        trailHistory.push({ x: mouseX, y: mouseY, time: performance.now() });
      }
    };

    const onMouseLeave = () => {
      isVisibleRef.current = false;
      particles.length = 0;
      trailHistory.length = 0;
      if (rootRef.current) rootRef.current.style.opacity = '0';
    };

    const onMouseEnter = () => {
      isVisibleRef.current = true;
      if (rootRef.current) rootRef.current.style.opacity = '1';
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = !!target.closest(
        'a, button, [role="button"], input, select, textarea, .cursor-pointer, [data-interactive], img, [onClick]'
      );
      isInteractiveRef.current = interactive;
      setIsInteractive(interactive);
    };

    const onMouseDown = () => {
      lastSnipTime.current = performance.now();
      const bladeAngleRad = (-7 * Math.PI) / 180;
      const tipX = cursorX + Math.sin(bladeAngleRad) * 16;
      const tipY = cursorY - Math.cos(bladeAngleRad) * 16;
      const burstCount = 5;

      for (let i = 0; i < burstCount; i++) {
        if (particles.length < MAX_PARTICLES) {
          const angle = Math.random() * Math.PI * 2;
          const speed = 0.28 + Math.random() * 0.45;
          const isStar = i % 2 === 0;
          particles.push({
            id: ++particleSeq,
            x: tipX + (Math.random() - 0.5) * 3,
            y: tipY + (Math.random() - 0.5) * 3,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed - 0.08,
            birthTime: performance.now(),
            lifetime: 260 + Math.random() * 60,
            size: isStar ? 3 + Math.random() * 1.4 : 1.2 + Math.random() * 0.9,
            type: isStar ? 'star' : 'dot',
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.08,
            opacity: 1,
          });
        }
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', onMouseOver, { passive: true });
    window.addEventListener('mousedown', onMouseDown, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    const onResize = () => {
      if (!canvasRef.current) return;
      const cvs = canvasRef.current;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      cvs.width = window.innerWidth * dpr;
      cvs.height = window.innerHeight * dpr;
      const ctx = cvs.getContext('2d');
      if (ctx) ctx.scale(dpr, dpr);
    };
    onResize();
    window.addEventListener('resize', onResize);

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const render = (time: number) => {
      if (Math.hypot(mouseX - cursorX, mouseY - cursorY) < 0.2) {
        cursorX = mouseX;
        cursorY = mouseY;
      } else {
        cursorX = lerp(cursorX, mouseX, 0.24);
        cursorY = lerp(cursorY, mouseY, 0.24);
      }

      const dx = cursorX - prevX;
      const dy = cursorY - prevY;
      const speed = Math.hypot(dx, dy);
      prevX = cursorX;
      prevY = cursorY;

      if (isVisibleRef.current) {
        trailHistory.unshift({ x: cursorX, y: cursorY, time });
        if (trailHistory.length > MAX_TRAIL) trailHistory.pop();
      }

      let snipAngle = 0;
      const snipElapsed = time - lastSnipTime.current;
      if (snipElapsed < 260) {
        if (snipElapsed < 70) {
          const t = snipElapsed / 70;
          snipAngle = (1 - Math.sin((t * Math.PI) / 2)) * 6.5;
        } else if (snipElapsed < 150) {
          snipAngle = 0;
        } else {
          const t = (snipElapsed - 150) / 110;
          snipAngle = Math.sin((t * Math.PI) / 2) * 2.5;
        }
      } else {
        const cycle = isInteractiveRef.current ? 1600 : 2800;
        const phase = (time % cycle) / cycle;
        const maxAng = isInteractiveRef.current ? 7.8 : 6.8;
        if (phase < 0.36) {
          const p = phase / 0.36;
          snipAngle = ((1 - Math.cos(p * Math.PI)) / 2) * maxAng;
        } else if (phase < 0.48) {
          snipAngle = maxAng;
        } else if (phase < 0.82) {
          const p = (phase - 0.48) / 0.34;
          snipAngle = ((1 + Math.cos(p * Math.PI)) / 2) * maxAng;
        } else {
          snipAngle = 0;
        }
      }

      if (halfARef.current) {
        halfARef.current.setAttribute('transform', `rotate(${-snipAngle.toFixed(2)}, 50, 50)`);
      }
      if (halfBRef.current) {
        halfBRef.current.setAttribute('transform', `rotate(${snipAngle.toFixed(2)}, 50, 50)`);
      }

      if (rootRef.current) {
        rootRef.current.style.transform = `translate3d(${cursorX.toFixed(2)}px, ${cursorY.toFixed(2)}px, 0)`;
        rootRef.current.style.opacity = isVisibleRef.current ? '1' : '0';
      }

      // Spawn movement particles
      if (isVisibleRef.current && speed > 0.5 && trailHistory.length >= 2) {
        const count = speed > 6 ? 2 : 1;
        const nx = dx / speed;
        const ny = dy / speed;
        const px = -ny;
        const py = nx;

        for (let i = 0; i < count; i++) {
          if (particles.length < MAX_PARTICLES) {
            const frac = (i + Math.random() * 0.4) / (count + 0.4);
            const p0 = trailHistory[0];
            const p1 = trailHistory[1];
            const rx = p0.x + (p1.x - p0.x) * frac;
            const ry = p0.y + (p1.y - p0.y) * frac;
            const offset = (Math.random() - 0.5) * 2.2;
            const isStar = Math.random() > 0.7;
            const size = isStar ? 3.2 + Math.random() * 1.8 : 1 + Math.random() * 1.4;
            const vel = 0.1 + Math.random() * 0.08;
            const vx = -nx * vel + (Math.random() - 0.5) * 0.05;
            const vy = -ny * vel - 0.03;

            particles.push({
              id: ++particleSeq,
              x: rx + px * offset,
              y: ry + py * offset,
              vx,
              vy,
              birthTime: time,
              lifetime: 380 + Math.random() * 90,
              size,
              type: isStar ? 'star' : 'dot',
              rotation: Math.random() * Math.PI * 2,
              rotationSpeed: (Math.random() - 0.5) * 0.04,
              opacity: 0.9 + Math.random() * 0.1,
            });
          }
        }
      }

      // Draw canvas sparkles
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

          for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            const age = time - p.birthTime;
            if (age >= p.lifetime) {
              particles.splice(i, 1);
              continue;
            }
            p.x += p.vx;
            p.y += p.vy;
            p.rotation += p.rotationSpeed;

            const dist = Math.hypot(p.x - cursorX, p.y - cursorY);
            const fadeNear = dist > 55 ? Math.max(0, 1 - (dist - 55) / 25) : 1;
            const normAge = age / p.lifetime;
            const fadeIn = Math.min(1, age / 30);
            const fadeOut = Math.pow(1 - normAge, 1.4);
            const flicker = 0.88 + 0.12 * Math.sin(p.birthTime + age * 0.024);
            const op = p.opacity * fadeIn * fadeOut * fadeNear * flicker;

            if (op > 0.015) {
              ctx.save();
              ctx.fillStyle = `rgba(255, 255, 255, ${op.toFixed(3)})`;
              if (p.type === 'star') {
                drawFourPointStar(ctx, p.x, p.y, p.size, p.rotation);
              } else {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2);
                ctx.fill();
              }
              ctx.restore();
            }
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      document.documentElement.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        id="custom-cursor-sparkle-canvas"
        className="pointer-events-none fixed inset-0 z-[9998] hidden md:block"
        aria-hidden="true"
      />
      <div
        ref={rootRef}
        id="custom-cursor-root"
        className="pointer-events-none fixed top-0 left-0 z-[9999] will-change-transform hidden md:block"
        aria-hidden="true"
      >
        <div className="relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2">
          <div
            ref={scissorRef}
            id="custom-cursor-scissor"
            className="relative w-[60px] h-[60px] flex items-center justify-center will-change-transform select-none pointer-events-none"
            style={{
              filter:
                'drop-shadow(0 3px 6px rgba(0,0,0,0.45)) drop-shadow(0 1px 2px rgba(0,0,0,0.30)) drop-shadow(0 0 1px rgba(255,255,255,0.75))',
            }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible" aria-hidden="true">
              <defs>
                <linearGradient id="scissorBladeGradA" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8E96A2" />
                  <stop offset="25%" stopColor="#B8C0CA" />
                  <stop offset="60%" stopColor="#E2E6EC" />
                  <stop offset="100%" stopColor="#FFFFFF" />
                </linearGradient>
                <linearGradient id="scissorBladeBevelA" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#C5CBD3" />
                  <stop offset="50%" stopColor="#EDF1F5" />
                  <stop offset="100%" stopColor="#FFFFFF" />
                </linearGradient>
                <linearGradient id="scissorBladeGradB" x1="100%" y1="0%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#828A96" />
                  <stop offset="25%" stopColor="#B0B8C2" />
                  <stop offset="60%" stopColor="#DCE1E7" />
                  <stop offset="100%" stopColor="#FFFFFF" />
                </linearGradient>
                <linearGradient id="scissorBladeBevelB" x1="100%" y1="0%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#C0C6CF" />
                  <stop offset="50%" stopColor="#E8ECEF" />
                  <stop offset="100%" stopColor="#FFFFFF" />
                </linearGradient>
                <linearGradient id="scissorHandleGradA" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F2F5F8" />
                  <stop offset="20%" stopColor="#D4DAE2" />
                  <stop offset="60%" stopColor="#9BA3AF" />
                  <stop offset="90%" stopColor="#697280" />
                  <stop offset="100%" stopColor="#4E5561" />
                </linearGradient>
                <linearGradient id="scissorHandleGradB" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#F2F5F8" />
                  <stop offset="20%" stopColor="#D4DAE2" />
                  <stop offset="60%" stopColor="#9BA3AF" />
                  <stop offset="90%" stopColor="#697280" />
                  <stop offset="100%" stopColor="#4E5561" />
                </linearGradient>
                <radialGradient id="scissorWasherGrad" cx="40%" cy="38%" r="60%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="35%" stopColor="#D5DAE0" />
                  <stop offset="70%" stopColor="#88909D" />
                  <stop offset="100%" stopColor="#4D545F" />
                </radialGradient>
                <radialGradient id="scissorScrewHeadGrad" cx="36%" cy="35%" r="62%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="40%" stopColor="#CBD1D8" />
                  <stop offset="75%" stopColor="#737A86" />
                  <stop offset="100%" stopColor="#343942" />
                </radialGradient>
                <filter id="bladeShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="-0.4" dy="0.6" stdDeviation="0.6" floodColor="#000000" floodOpacity="0.45" />
                </filter>
              </defs>

              <g transform="rotate(-7, 50, 50)">
                <g ref={halfBRef} id="scissor-half-b" transform="rotate(0, 50, 50)">
                  <path
                    d="M 50 12 Q 53.5 24 54.5 36 Q 54.8 43 53.8 47.5 L 50 50 L 50 12 Z"
                    fill="url(#scissorBladeGradB)"
                    stroke="#525964"
                    strokeWidth="0.3"
                    strokeLinejoin="round"
                  />
                  <path d="M 50 12 L 50 50 L 52.0 47.5 Q 51.8 32 50 12 Z" fill="url(#scissorBladeBevelB)" />
                  <line x1="50" y1="12" x2="50" y2="49.5" stroke="#FFFFFF" strokeWidth="0.45" strokeLinecap="round" opacity="0.95" />
                  <path
                    d="M 48.5 50 C 47.2 54.5 44 59 40.5 63 C 36 68 32.5 73.5 32.5 80 C 32.5 86.8 36.8 89.8 42.8 89.8 C 47.5 89.8 50.5 85.5 50 79.5 C 49.5 74 48.2 68 49 57 Z M 42.2 73.8 C 45.2 73.8 46.5 76.8 46.5 79.8 C 46.5 83.5 44.2 85.8 41.5 85.8 C 38.2 85.8 36.8 83 36.8 79.8 C 36.8 76.5 38.8 73.8 42.2 73.8 Z"
                    fill="url(#scissorHandleGradB)"
                    fillRule="evenodd"
                    stroke="#444B56"
                    strokeWidth="0.35"
                    strokeLinejoin="round"
                  />
                  <path d="M 33 80 C 33 73.8 36.5 68.5 40.5 63.5" fill="none" stroke="#FFFFFF" strokeWidth="0.5" strokeLinecap="round" opacity="0.85" />
                  <rect x="48.5" y="73.5" width="1.6" height="2.2" rx="0.5" fill="#3D434D" stroke="#2B3037" strokeWidth="0.25" />
                </g>

                <g ref={halfARef} id="scissor-half-a" filter="url(#bladeShadow)" transform="rotate(0, 50, 50)">
                  <path
                    d="M 50 12 Q 46.5 24 45.5 36 Q 45.2 43 46.2 47.5 L 50 50 L 50 12 Z"
                    fill="url(#scissorBladeGradA)"
                    stroke="#525964"
                    strokeWidth="0.3"
                    strokeLinejoin="round"
                  />
                  <path d="M 50 12 L 50 50 L 48.0 47.5 Q 48.2 32 50 12 Z" fill="url(#scissorBladeBevelA)" />
                  <line x1="50" y1="12" x2="50" y2="49.5" stroke="#FFFFFF" strokeWidth="0.45" strokeLinecap="round" opacity="0.95" />
                  <path
                    d="M 50.5 50 C 51.8 54.5 54 59 57.5 63.5 C 61.5 68.5 65.5 74.2 65.5 81.5 C 65.5 89 61.2 93 53.8 93 C 48.2 93 46.8 88.2 47.8 82 C 48.8 75.8 50.5 69 49.5 57 Z M 54.2 69.5 C 58.2 69.5 60.8 73.8 60.8 81.2 C 60.8 86.5 58.5 89.2 54.8 89.2 C 51.5 89.2 51.2 85.2 51.5 81.2 C 51.8 76 52.2 69.5 54.2 69.5 Z"
                    fill="url(#scissorHandleGradA)"
                    fillRule="evenodd"
                    stroke="#444B56"
                    strokeWidth="0.35"
                    strokeLinejoin="round"
                  />
                  <path d="M 65 81.5 C 65 74.5 61.5 68.8 57.5 64" fill="none" stroke="#FFFFFF" strokeWidth="0.5" strokeLinecap="round" opacity="0.85" />
                </g>

                <g id="scissor-pivot">
                  <circle cx="50" cy="50" r="4.8" fill="url(#scissorWasherGrad)" stroke="#363C45" strokeWidth="0.4" />
                  <circle cx="50" cy="50" r="4.1" fill="none" stroke="#FFFFFF" strokeWidth="0.35" opacity="0.65" />
                  <circle cx="50" cy="50" r="3.2" fill="url(#scissorScrewHeadGrad)" stroke="#22262D" strokeWidth="0.35" />
                  <circle cx="50" cy="50" r="1.3" fill="#1C1F25" />
                  <rect x="49.3" y="49.1" width="1.4" height="1.8" rx="0.3" fill="#111317" />
                  <circle cx="48.8" cy="48.8" r="0.8" fill="#FFFFFF" opacity="0.95" />
                </g>
              </g>
            </svg>
          </div>

          {hoverLabel && (
            <div className="absolute left-8 top-1/2 -translate-y-1/2 whitespace-nowrap bg-[#821713] text-[#F3E7DB] text-[9.5px] font-medium tracking-[0.2em] uppercase px-2.5 py-0.5 shadow-md border border-[#992511]/30 select-none">
              {hoverLabel}
            </div>
          )}
        </div>
      </div>
    </>
  );
});
