import React, { useState } from 'react';
import { WEDDING_DATA } from '../data/weddingData';
import { ChevronDown } from 'lucide-react';

export const HeroCover: React.FC = () => {
  const { couple, ceremony, mainPhoto } = WEDDING_DATA;

  // Candidates for user's uploaded image with graceful fallbacks
  const photoCandidates = [
    mainPhoto.src,
    '/main_photo.jpg',
    mainPhoto.fallback,
    '/src/assets/images/wedding_spring_hero_1788510924980.jpg',
  ];
  const [candidateIdx, setCandidateIdx] = useState(0);

  const handleImgError = () => {
    if (candidateIdx < photoCandidates.length - 1) {
      setCandidateIdx((prev) => prev + 1);
    }
  };

  const handleScrollDown = () => {
    const nextSection = document.getElementById('section-invitation');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="section-hero" className="relative w-full bg-[#FAF7F2] pt-14 pb-12 px-5 text-center overflow-hidden border-b border-[#EFEBE4]">
      {/* Top Header Typography */}
      <div className="flex flex-col items-center mb-5">
        <div className="inline-flex items-center gap-2.5 mb-2.5">
          <span className="w-5 h-[1px] bg-[#C5A880]/50" />
          <span className="font-montserrat tracking-[0.28em] text-[10.5px] text-[#9E8E7E] uppercase font-light">
            Wedding Invitation
          </span>
          <span className="w-5 h-[1px] bg-[#C5A880]/50" />
        </div>

        {/* Couple Names in Classic Serif */}
        <h1 className="font-serif-kr text-[26px] sm:text-[30px] text-[#2C241E] font-normal tracking-[0.14em] flex items-center justify-center gap-3 my-1.5">
          <span>{couple.groom.name}</span>
          <span className="text-[#C4A47C] font-serif text-lg sm:text-xl italic font-light">&</span>
          <span>{couple.bride.name}</span>
        </h1>

        {/* English Date */}
        <p className="font-montserrat tracking-[0.22em] text-[11px] text-[#8C7E70] uppercase mt-0.5 font-light">
          {ceremony.englishDate}
        </p>
      </div>

      {/* Main Hero Photo: Original 3:2 Landscape Ratio without arch cropping */}
      <div className="relative mx-auto max-w-[420px] my-4 px-1 sm:px-0">
        <div className="relative bg-white p-2.5 sm:p-3 rounded-2xl shadow-[0_12px_32px_rgba(65,50,38,0.08)] border border-[#ECE4D8]">
          <div className="relative aspect-[3/2] w-full rounded-xl overflow-hidden bg-[#F4EFE8]">
            <img
              src={photoCandidates[candidateIdx]}
              alt={mainPhoto.alt}
              onError={handleImgError}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center transform transition-transform duration-700 hover:scale-[1.02]"
            />
            {/* Subtle inner border line */}
            <div className="absolute inset-0 rounded-xl border border-black/5 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Ceremony Details & Information */}
      <div className="mt-6 space-y-2 font-serif-kr">
        {/* Date Pill Badge */}
        <div className="inline-block py-1.5 px-4 rounded-full bg-white/80 border border-[#E6DDD2] text-[#4A3F35] text-xs sm:text-[13px] font-medium tracking-wide shadow-2xs">
          {ceremony.displayDate}
        </div>

        {/* Venue details */}
        <p className="text-sm sm:text-[14.5px] text-[#2E2721] font-medium tracking-wide pt-1">
          {ceremony.venue.name} <span className="text-[#B8A898] mx-1">|</span> {ceremony.venue.hall}
        </p>
        <p className="text-xs text-[#827467] font-light">
          {ceremony.venue.address}
        </p>

        {/* Poetic invitation line */}
        <div className="pt-4 max-w-xs mx-auto">
          <p className="font-serif-kr text-[12px] text-[#7A6D60] leading-relaxed tracking-wide font-light">
            서로를 마주 보며 걸어갈 첫걸음에<br />
            소중한 분들을 모시고 사랑의 약속을 나누고자 합니다.
          </p>
        </div>
      </div>

      {/* Scroll Down Cue */}
      <button
        id="btn-scroll-down"
        onClick={handleScrollDown}
        aria-label="아래로 스크롤하여 초대장 읽기"
        className="mt-8 inline-flex flex-col items-center gap-1.5 text-[#A89C8E] hover:text-[#5E5246] transition-colors focus:outline-none"
      >
        <span className="font-montserrat text-[9.5px] tracking-[0.22em] uppercase text-[#A89C8E]">
          Scroll Down
        </span>
        <ChevronDown className="w-4 h-4 animate-bounce text-[#B8AA9A]" />
      </button>
    </section>
  );
};

