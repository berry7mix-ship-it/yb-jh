import React from 'react';
import { ArrowUp, Heart } from 'lucide-react';
import { WEDDING_DATA } from '../data/weddingData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#F4F0E8] py-14 px-6 text-center text-[#8C7E70] font-serif-kr border-t border-[#E8E1D6]">
      <div className="max-w-md mx-auto space-y-4">
        {/* Back to top button */}
        <button
          id="btn-scroll-to-top"
          onClick={scrollToTop}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/80 border border-[#E3DCD1] text-xs text-[#6B5E53] hover:bg-white transition-colors shadow-2xs mb-2"
        >
          <ArrowUp className="w-3.5 h-3.5" />
          <span>맨 위로 이동</span>
        </button>

        <div className="pt-2">
          <p className="font-serif-kr text-base sm:text-lg text-[#4A4036] tracking-[0.2em] font-medium flex items-center justify-center gap-2">
            <span>{WEDDING_DATA.couple.groom.name}</span>
            <Heart className="w-3 h-3 text-[#C5A880] fill-[#C5A880]" />
            <span>{WEDDING_DATA.couple.bride.name}</span>
          </p>
        </div>

        <p className="text-[11.5px] text-[#998B7D] leading-relaxed pt-2">
          저희 두 사람의 새로운 시작을 축복해 주신<br />
          모든 분들의 따뜻한 마음에 깊이 감사드립니다.
        </p>

        {/* Brand Mark */}
        <div className="pt-6 border-t border-[#E3DCD1]/60">
          <p className="font-montserrat tracking-[0.2em] text-[10px] text-[#A89886] uppercase">
            GAME VIOLET • VIOLET HOLDINGS
          </p>
          <p className="text-[9px] text-[#B5A898] font-sans mt-0.5">
            © 2026 VIOLET HOLDINGS. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
