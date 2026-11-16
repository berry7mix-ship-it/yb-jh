import React, { useState } from 'react';
import { WEDDING_DATA } from '../data/weddingData';
import { PhoneCall } from 'lucide-react';
import { ContactModal } from './ContactModal';
import { ScrollReveal } from './ScrollReveal';

export const InvitationMessage: React.FC = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const { groom, bride } = WEDDING_DATA.couple;

  return (
    <section id="section-invitation" className="w-full bg-[#FAF8F5] py-16 px-6 text-center border-b border-[#EFEBE4]">
      <div className="max-w-md mx-auto">
        <ScrollReveal>
          {/* Section title */}
          <span className="font-montserrat tracking-[0.26em] text-[11px] text-[#A6998A] uppercase font-medium">
            Invitation
          </span>
          <h2 className="font-serif-kr text-xl text-[#3A332C] mt-2 mb-8 font-normal tracking-wide">
            소중한 분들을 초대합니다
          </h2>

          {/* Heartfelt Poem / Letter */}
          <div className="font-serif-kr text-[14.5px] leading-[2.15] text-[#554D46] space-y-5 px-2 tracking-normal font-light">
            <p>
              서로의 따스한 온기로 채워온 시간 끝에<br />
              저희 두 사람, 평생의 약속을 맺으려 합니다.
            </p>
            <p>
              처음 서로를 마주했던 그 설렘을 기억하며<br />
              늘 같은 곳을 바라보는 단단한 사랑으로<br />
              지혜롭고 화목하게 살아가겠습니다.
            </p>
            <p className="pt-1 text-[#7A6F64]">
              저희의 새로운 발걸음을 축복해 주시는<br />
              소중한 분들의 마음을 가슴 깊이 간직하겠습니다.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={120}>
          {/* Delicate botanical/star divider */}
          <div className="flex items-center justify-center my-10">
            <div className="w-14 h-[1px] bg-gradient-to-r from-transparent to-[#D4C8B8]" />
            <span className="mx-3.5 text-[#C5A880] text-xs font-serif-kr">✦</span>
            <div className="w-14 h-[1px] bg-gradient-to-l from-transparent to-[#D4C8B8]" />
          </div>

          {/* Family names and relations */}
          <div className="font-serif-kr text-[15px] text-[#3E3835] space-y-3.5 inline-block text-left py-2">
            <div className="flex items-center justify-between gap-4">
              <span className="font-medium text-[#4D453E] tracking-wide">
                {groom.father.name} <span className="text-[#B8AA9A] mx-0.5">·</span> {groom.mother.name}
              </span>
              <span className="text-xs text-[#8F8377] font-light min-w-[42px] text-center">
                의 {groom.relation}
              </span>
              <span className="font-semibold text-[#2D2621] tracking-wider">{groom.name}</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="font-medium text-[#4D453E] tracking-wide">
                {bride.father.name} <span className="text-[#B8AA9A] mx-0.5">·</span> {bride.mother.name}
              </span>
              <span className="text-xs text-[#8F8377] font-light min-w-[42px] text-center">
                의 {bride.relation}
              </span>
              <span className="font-semibold text-[#2D2621] tracking-wider">{bride.name}</span>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="mt-10">
            <button
              id="btn-open-contact-modal"
              onClick={() => setIsContactOpen(true)}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] rounded-full bg-white border border-[#DDD4C7] shadow-2xs text-xs font-serif-kr text-[#5C5045] hover:bg-[#F5EFE6] active:scale-[0.98] transition-all duration-200 cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#A89886]" />
              <span>신랑 · 신부에게 연락하기</span>
            </button>
          </div>
        </ScrollReveal>
      </div>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </section>
  );
};
