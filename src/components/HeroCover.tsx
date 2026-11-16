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
  const [imageLoaded, setImageLoaded] = useState(false);

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
    <section
      id="section-hero"
      className="relative w-full bg-gradient-to-b from-[#FAF7F2] via-[#FAF8F5] to-[#F7F3EC] pt-14 pb-12 px-5 text-center overflow-hidden border-b border-[#EFEBE4]"
    >
      {/* Top Header Typography */}
      <div className="flex flex-col items-center mb-6 animate-hero-1">
        <div className="inline-flex items-center gap-3 mb-3">
          <span className="w-6 h-[1px] bg-gradient-to-r from-transparent to-[#C5A880]/70" />
          <span className="font-montserrat tracking-[0.3em] text-[10.5px] text-[#9E8E7E] uppercase font-light">
            Wedding Invitation
          </span>
          <span className="w-6 h-[1px] bg-gradient-to-l from-transparent to-[#C5A880]/70" />
        </div>

        {/* Couple Names in Classic Serif */}
        <h1 className="font-serif-kr text-[27px] sm:text-[31px] text-[#2C241E] font-normal tracking-[0.15em] flex items-center justify-center gap-3.5 my-1.5">
          <span>{couple.groom.name}</span>
          <span className="text-[#C4A47C] font-garamond text-2xl sm:text-[26px] italic font-light">&amp;</span>
          <span>{couple.bride.name}</span>
        </h1>

        {/* English Date */}
        <p className="font-montserrat tracking-[0.24em] text-[11px] text-[#8C7E70] uppercase mt-1 font-light">
          {ceremony.englishDate}
        </p>
      </div>

      {/* Main Hero Photo: Original 3:2 Landscape Ratio with Editorial Frame */}
      <div className="relative mx-auto max-w-[420px] my-4 px-1 sm:px-0 animate-hero-2">
        <div className="relative bg-white p-2.5 sm:p-3 rounded-2xl shadow-[0_16px_38px_rgba(65,50,38,0.09)] border border-[#ECE4D8]">
          <div className="relative aspect-[3/2] w-full rounded-xl overflow-hidden bg-[#F4EFE8]">
            <img
              src={photoCandidates[candidateIdx]}
              alt={mainPhoto.alt}
              onLoad={() => setImageLoaded(true)}
              onError={handleImgError}
              referrerPolicy="no-referrer"
              className={`w-full h-full object-cover object-center transform transition-all duration-1000 ease-out hover:scale-[1.02] ${
                imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.015]'
              }`}
            />
            {/* Subtle inner border frame */}
            <div className="absolute inset-0 rounded-xl border border-black/5 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Ceremony Details & Information */}
      <div className="mt-7 space-y-2.5 font-serif-kr animate-hero-3">
        {/* Clean Editorial Date Line */}
        <div className="inline-flex flex-col items-center">
          <div className="w-8 h-[1px] bg-[#D8CBB8] mb-2.5" />
          <p className="text-[#3A312A] text-[13.5px] sm:text-[14px] font-medium tracking-wide">
            {ceremony.displayDate}
          </p>
        </div>

        {/* Venue details */}
        <p className="text-sm sm:text-[15px] text-[#2E2721] font-medium tracking-wide pt-0.5">
          {ceremony.venue.name} <span className="text-[#C2B3A3] mx-1.5 font-light">·</span> {ceremony.venue.hall}
        </p>
        <p className="text-xs text-[#827467] font-light">
          {ceremony.venue.address}
        </p>

        {/* Poetic invitation line */}
        <div className="pt-4 max-w-xs mx-auto">
          <p className="font-serif-kr text-[12.5px] text-[#7A6D60] leading-[1.9] tracking-wide font-light">
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
        className="mt-8 inline-flex flex-col items-center gap-1.5 py-2 px-4 text-[#A89C8E] hover:text-[#5E5246] transition-colors focus:outline-none animate-hero-3"
      >
        <span className="font-montserrat text-[9.5px] tracking-[0.24em] uppercase text-[#A89C8E]">
          Scroll Down
        </span>
        <ChevronDown className="w-4 h-4 animate-bounce text-[#B8AA9A]" />
      </button>
    </section>
  );
};
