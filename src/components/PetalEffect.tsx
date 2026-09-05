import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

interface Petal {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  rotate: number;
  drift: number;
}

export const PetalEffect: React.FC = () => {
  const [enabled, setEnabled] = useState(true);
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    if (!enabled) {
      setPetals([]);
      return;
    }

    const items: Petal[] = Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100, // percentage
      size: Math.random() * 8 + 8, // 8px to 16px
      duration: Math.random() * 6 + 7, // 7s to 13s
      delay: Math.random() * 5,
      rotate: Math.random() * 360,
      drift: (Math.random() - 0.5) * 60,
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
        className={`fixed top-4 left-4 z-40 p-2 rounded-full backdrop-blur-md transition-all duration-300 shadow-sm border ${
          enabled
            ? 'bg-white/85 text-[#c78283] border-[#f4dcd6] hover:bg-white'
            : 'bg-white/60 text-[#a89f91] border-[#e8e2d9] hover:bg-white/80'
        }`}
      >
        <Sparkles className="w-3.5 h-3.5" />
      </button>

      {/* Petals Canvas Overlay */}
      {enabled && (
        <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
          {petals.map((petal) => (
            <div
              key={petal.id}
              className="absolute top-[-20px] will-change-transform opacity-75"
              style={{
                left: `${petal.left}%`,
                animation: `fall ${petal.duration}s linear infinite`,
                animationDelay: `${petal.delay}s`,
              }}
            >
              <div
                className="w-3.5 h-4 bg-gradient-to-br from-[#ffd5d9] via-[#ffccd2] to-[#f8b6be] rounded-full shadow-xs"
                style={{
                  width: `${petal.size}px`,
                  height: `${petal.size * 1.25}px`,
                  borderRadius: '50% 0 50% 50%',
                  transform: `rotate(${petal.rotate}deg)`,
                  filter: 'blur(0.2px)',
                }}
              />
            </div>
          ))}

          <style>{`
            @keyframes fall {
              0% {
                transform: translateY(-20px) translateX(0px) rotate(0deg);
                opacity: 0;
              }
              15% {
                opacity: 0.85;
              }
              85% {
                opacity: 0.75;
              }
              100% {
                transform: translateY(105vh) translateX(45px) rotate(480deg);
                opacity: 0;
              }
            }
          `}</style>
        </div>
      )}
    </>
  );
};
