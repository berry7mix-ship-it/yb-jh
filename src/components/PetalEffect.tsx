import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

interface Petal {
  id: number;
  left: number;
  size: number;
  fallDuration: number;
  swayDuration: number;
  delay: number;
  initialRotate: number;
  swayAmount: number;
  variant: 0 | 1 | 2;
  opacity: number;
}

export const PetalEffect: React.FC = () => {
  const [enabled, setEnabled] = useState(true);
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    if (!enabled) {
      setPetals([]);
      return;
    }

    // Respect prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPetals([]);
      return;
    }

    const items: Petal[] = Array.from({ length: 16 }).map((_, i) => ({
      id: i,
      left: (i * 6.2 + Math.random() * 4) % 98,
      size: Math.random() * 7 + 10, // 10px to 17px
      fallDuration: Math.random() * 6 + 9, // 9s to 15s
      swayDuration: Math.random() * 2.5 + 3, // 3s to 5.5s
      delay: Math.random() * 8,
      initialRotate: Math.random() * 360,
      swayAmount: (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 24 + 16),
      variant: (i % 3) as 0 | 1 | 2,
      opacity: Math.random() * 0.25 + 0.55,
    }));

    setPetals(items);
  }, [enabled]);

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        id="btn-petal-toggle"
        onClick={() => setEnabled((prev) => !prev)}
        title={enabled ? '꽃잎 효과 끄기' : '꽃잎 효과 켜기'}
        aria-label={enabled ? '꽃잎 효과 끄기' : '꽃잎 효과 켜기'}
        className={`fixed top-3.5 right-3.5 z-40 w-9 h-9 flex items-center justify-center rounded-full backdrop-blur-md transition-all duration-300 shadow-xs border active:scale-95 ${
          enabled
            ? 'bg-white/90 text-[#C48283] border-[#F0D9D4] hover:bg-white'
            : 'bg-white/65 text-[#A89F91] border-[#E8E2D9] hover:bg-white/85'
        }`}
      >
        <Sparkles className="w-4 h-4" />
      </button>

      {/* Petals Canvas Overlay */}
      {enabled && petals.length > 0 && (
        <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden" aria-hidden="true">
          {petals.map((petal) => (
            <div
              key={petal.id}
              className="absolute top-[-32px] will-change-transform"
              style={{
                left: `${petal.left}%`,
                animation: `petalFall ${petal.fallDuration}s linear ${petal.delay}s infinite`,
              }}
            >
              <div
                className="will-change-transform"
                style={{
                  animation: `petalSway ${petal.swayDuration}s ease-in-out ${petal.delay}s infinite alternate`,
                  ['--sway-x' as string]: `${petal.swayAmount}px`,
                }}
              >
                <svg
                  width={petal.size}
                  height={petal.size * 1.25}
                  viewBox="0 0 24 30"
                  fill="none"
                  style={{
                    opacity: petal.opacity,
                    transform: `rotate(${petal.initialRotate}deg)`,
                    filter: 'drop-shadow(0 2px 3px rgba(180, 130, 130, 0.12))',
                  }}
                >
                  <defs>
                    <linearGradient id={`petal-grad-${petal.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      {petal.variant === 0 && (
                        <>
                          <stop offset="0%" stopColor="#FFF0F2" />
                          <stop offset="55%" stopColor="#FAD2D8" />
                          <stop offset="100%" stopColor="#F2B8C2" />
                        </>
                      )}
                      {petal.variant === 1 && (
                        <>
                          <stop offset="0%" stopColor="#FFF7F5" />
                          <stop offset="60%" stopColor="#F8DCE0" />
                          <stop offset="100%" stopColor="#EFC3CA" />
                        </>
                      )}
                      {petal.variant === 2 && (
                        <>
                          <stop offset="0%" stopColor="#FFFDF9" />
                          <stop offset="65%" stopColor="#F7E5E2" />
                          <stop offset="100%" stopColor="#EBD0CC" />
                        </>
                      )}
                    </linearGradient>
                  </defs>
                  {/* Delicate notched cherry/rose petal silhouette */}
                  <path
                    d="M12 29C6 25.5 1.5 18.5 2 10.5C2.4 4.5 6.8 1 10.2 2.8C11.1 3.3 11.6 4.2 12 5C12.4 4.2 12.9 3.3 13.8 2.8C17.2 1 21.6 4.5 22 10.5C22.5 18.5 18 25.5 12 29Z"
                    fill={`url(#petal-grad-${petal.id})`}
                  />
                </svg>
              </div>
            </div>
          ))}

          <style>{`
            @keyframes petalFall {
              0% {
                transform: translate3d(0, -30px, 0) rotate(0deg);
                opacity: 0;
              }
              12% {
                opacity: 1;
              }
              88% {
                opacity: 0.9;
              }
              100% {
                transform: translate3d(28px, 106vh, 0) rotate(320deg);
                opacity: 0;
              }
            }
            @keyframes petalSway {
              0% {
                transform: translateX(calc(var(--sway-x, 20px) * -0.6)) rotateX(10deg) rotateY(-15deg);
              }
              100% {
                transform: translateX(var(--sway-x, 20px)) rotateX(-15deg) rotateY(20deg);
              }
            }
          `}</style>
        </div>
      )}
    </>
  );
};
