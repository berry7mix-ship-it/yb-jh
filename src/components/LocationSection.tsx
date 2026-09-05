import React, { useState } from 'react';
import { WEDDING_DATA } from '../data/weddingData';
import { Copy, Check, Car, Train, Bus, Phone } from 'lucide-react';

export const LocationSection: React.FC = () => {
  const { venue } = WEDDING_DATA.ceremony;
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(venue.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = venue.address;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  return (
    <section id="section-location" className="w-full bg-white py-16 px-6 text-center border-b border-[#EFEBE4]">
      <div className="max-w-md mx-auto">
        <span className="font-montserrat tracking-[0.25em] text-[11px] text-[#A6998A] uppercase font-medium">
          Location
        </span>
        <h2 className="font-serif-kr text-xl text-[#3A332C] mt-2 mb-2 font-normal tracking-wide">
          오시는 길
        </h2>
        <p className="font-serif-kr text-sm font-medium text-[#3E3835]">
          {venue.name} <span className="text-[#8A7B70]">{venue.hall}</span>
        </p>
        <p className="font-serif-kr text-xs text-[#7A6E63] mt-1 mb-5">
          {venue.address}
        </p>

        {/* Address Copy & Phone Buttons */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <button
            id="btn-copy-address"
            onClick={handleCopyAddress}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FAF8F5] border border-[#E0D7CC] text-xs font-serif-kr text-[#594E44] hover:bg-[#F2ECE3] transition-colors shadow-2xs"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-medium">주소 복사됨</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#8A7B70]" />
                <span>주소 복사</span>
              </>
            )}
          </button>
          <a
            id="btn-call-venue"
            href={`tel:${venue.tel}`}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FAF8F5] border border-[#E0D7CC] text-xs font-serif-kr text-[#594E44] hover:bg-[#F2ECE3] transition-colors shadow-2xs"
          >
            <Phone className="w-3.5 h-3.5 text-[#8A7B70]" />
            <span>웨딩홀 전화</span>
          </a>
        </div>

        {/* Official Venue Illustrated Roadmap (Matching Wedding Invitation Map) */}
        <div className="relative rounded-2xl overflow-hidden border border-[#DCD5C9] bg-white shadow-xs mb-6">
          <div className="p-4 sm:p-5">
            {/* SVG Roadmap Graphic */}
            <div className="w-full bg-white select-none">
              <svg viewBox="0 0 620 450" className="w-full h-auto">
                {/* Roads */}
                {/* Slanted Road: Siji / Suseong IC -> Yangnyang 4-way */}
                <line x1="90" y1="335" x2="330" y2="110" stroke="#1A1A1A" strokeWidth="9" strokeLinecap="round" />
                
                {/* Branch to Allyang-myeon */}
                <line x1="330" y1="110" x2="285" y2="45" stroke="#1A1A1A" strokeWidth="9" strokeLinecap="round" />
                
                {/* Branch to Jinryang / Gyeongsan IC */}
                <line x1="330" y1="110" x2="395" y2="45" stroke="#1A1A1A" strokeWidth="9" strokeLinecap="round" />
                
                {/* Road from Allyang 4-way down-right */}
                <line x1="330" y1="110" x2="425" y2="215" stroke="#1A1A1A" strokeWidth="9" strokeLinecap="round" />
                <line x1="425" y1="215" x2="435" y2="255" stroke="#1A1A1A" strokeWidth="9" strokeLinecap="round" />
                
                {/* Fork: straight down */}
                <line x1="435" y1="255" x2="420" y2="385" stroke="#1A1A1A" strokeWidth="9" strokeLinecap="round" />
                
                {/* Fork: curve to Lotus 101 */}
                <path d="M 435 255 Q 480 280 565 315 L 575 350" fill="none" stroke="#1A1A1A" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />

                {/* Lake Gammot */}
                <ellipse cx="495" cy="335" rx="62" ry="26" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="2.2" />
                <text x="495" y="340" textAnchor="middle" fontSize="14" fontWeight="600" fill="#1A1A1A" fontFamily="sans-serif">감못</text>

                {/* Lotus 101 Destination Target */}
                <circle cx="575" cy="380" r="19" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="4.5" />
                <circle cx="575" cy="380" r="10.5" fill="#1A1A1A" />
                <text x="575" y="420" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#1A1A1A" fontFamily="sans-serif">로터스101</text>

                {/* Allyang 4-way box */}
                <rect x="290" y="92" width="80" height="30" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="2" rx="2" />
                <text x="330" y="112" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1A1A1A" fontFamily="sans-serif">압량네거리</text>

                {/* Yeungnam Univ Station Box */}
                <rect x="135" y="235" width="76" height="52" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="2" rx="2" />
                <text x="173" y="257" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1A1A1A" fontFamily="sans-serif">영남대역</text>
                <text x="173" y="276" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1A1A1A" fontFamily="sans-serif">4번 출구</text>

                {/* Shuttle bus stop label below station */}
                <text x="173" y="306" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1A1A1A" fontFamily="sans-serif">로터스101</text>
                <text x="173" y="323" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1A1A1A" fontFamily="sans-serif">셔틀버스 탑승장</text>

                {/* Siji / Suseong IC text */}
                <text x="45" y="348" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1A1A1A" fontFamily="sans-serif">시지방면</text>
                <text x="45" y="366" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1A1A1A" fontFamily="sans-serif">수성IC</text>

                {/* Allyang-myeon text */}
                <text x="280" y="30" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1A1A1A" fontFamily="sans-serif">압량면</text>

                {/* Jinryang / Gyeongsan IC text */}
                <text x="410" y="26" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1A1A1A" fontFamily="sans-serif">진량방면</text>
                <text x="410" y="44" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1A1A1A" fontFamily="sans-serif">경산IC</text>

                {/* Landmark Squares and Labels */}
                {/* Allyang Nonghyup */}
                <rect x="260" y="94" width="8" height="8" fill="#1A1A1A" />
                <text x="250" y="117" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1A1A1A" fontFamily="sans-serif">압량농협</text>

                {/* Museum */}
                <rect x="245" y="250" width="8" height="8" fill="#1A1A1A" />
                <text x="249" y="275" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1A1A1A" fontFamily="sans-serif">박물관</text>

                {/* Music College */}
                <rect x="345" y="300" width="8" height="8" fill="#1A1A1A" />
                <text x="349" y="324" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1A1A1A" fontFamily="sans-serif">음악대학</text>

                {/* Yeungnam University */}
                <rect x="275" y="360" width="8" height="8" fill="#1A1A1A" />
                <text x="279" y="384" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1A1A1A" fontFamily="sans-serif">영남대학교</text>

                {/* Gyeongsan Allyang Elementary School */}
                <rect x="470" y="132" width="8" height="8" fill="#1A1A1A" />
                <text x="474" y="154" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1A1A1A" fontFamily="sans-serif">경산압량</text>
                <text x="474" y="170" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1A1A1A" fontFamily="sans-serif">초등학교</text>

                {/* Gyeongsan Fire Station */}
                <rect x="535" y="185" width="8" height="8" fill="#1A1A1A" />
                <text x="539" y="210" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1A1A1A" fontFamily="sans-serif">경산소방서</text>
              </svg>
            </div>

            {/* Address and Contact info as in official map */}
            <div className="mt-4 pt-4 border-t border-[#EAE4DC] text-center space-y-3">
              <div>
                <p className="font-serif-kr text-[13.5px] sm:text-[14.5px] text-[#2A2421] font-semibold tracking-tight">
                  로터스101 : 경북 경산시 화랑로 8길 200
                </p>
                <p className="font-montserrat text-xs text-[#7A6E63] mt-0.5">
                  Tel. 053 817 1234
                </p>
              </div>

              {/* Notice Style Box */}
              <div className="mx-auto py-3 px-4 rounded-xl bg-[#F7F3EC] border border-[#E5DDD0] text-center shadow-2xs">
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#EAE2D5] text-[#6E6052] text-[10.5px] font-medium tracking-wider mb-2">
                  <span>안내</span>
                </div>
                <p className="font-serif-kr text-xs sm:text-[12.5px] text-[#3E342B] font-medium leading-relaxed">
                  영남대역 4번출구 전용 셔틀버스 운행<br />
                  (15분 간격)
                </p>
                <p className="font-serif-kr text-xs sm:text-[12.5px] text-[#3E342B] font-medium leading-relaxed mt-1">
                  대형 전용 무료 주차장 구비
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Map Navigation Apps */}
        <div className="grid grid-cols-2 gap-2.5 mb-8">
          <a
            id="link-naver-map"
            href={venue.naverMapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#03C75A] text-white text-xs font-medium hover:bg-[#02b350] transition-colors shadow-2xs"
          >
            <span className="font-bold text-xs">N</span>
            <span>네이버 지도</span>
          </a>
          <a
            id="link-kakao-map"
            href={venue.kakaoMapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#FEE500] text-[#191919] text-xs font-medium hover:bg-[#ebd300] transition-colors shadow-2xs"
          >
            <span className="font-bold text-xs">K</span>
            <span>카카오맵</span>
          </a>
        </div>

        {/* Detailed Transit Information matching the uploaded map card */}
        <div className="bg-white rounded-2xl p-5 border border-[#E8E2D7] text-left shadow-2xs space-y-4">
          <div className="border-b border-[#F0EBE3] pb-2">
            <h3 className="font-serif-kr text-sm font-semibold text-[#3A332C]">
              교통편 상세 안내
            </h3>
          </div>

          <div className="space-y-3.5 font-serif-kr text-xs text-[#4A4036] leading-relaxed">
            {/* Subway */}
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-lg bg-[#FAF7F2] border border-[#E8E1D5] flex items-center justify-center shrink-0 mt-0.5 text-[#8C7E70]">
                <Train className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="font-semibold text-[#2A2421] block text-[13px]">지하철</span>
                <p className="text-[#5C5045] mt-0.5">
                  대구 2호선 영남대역 4번출구 셔틀버스 (5분 소요)
                </p>
              </div>
            </div>

            {/* Highway */}
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-lg bg-[#FAF7F2] border border-[#E8E1D5] flex items-center justify-center shrink-0 mt-0.5 text-[#8C7E70]">
                <Car className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="font-semibold text-[#2A2421] block text-[13px]">고속도로</span>
                <p className="text-[#5C5045] mt-0.5">
                  경산 IC에서 경산 방향 10분 소요
                </p>
              </div>
            </div>

            {/* Bus */}
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-lg bg-[#FAF7F2] border border-[#E8E1D5] flex items-center justify-center shrink-0 mt-0.5 text-[#8C7E70]">
                <Bus className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="font-semibold text-[#2A2421] block text-[13px]">버스</span>
                <p className="text-[#5C5045] mt-0.5 leading-relaxed">
                  영남대앞 정류장에서 109번 탑승 후 감못 하차<br />
                  <span className="text-[#8C7E70]">(배차간격 15분)</span>
                </p>
              </div>
            </div>

            {/* Car & Parking */}
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-lg bg-[#FAF7F2] border border-[#E8E1D5] flex items-center justify-center shrink-0 mt-0.5 text-[#8C7E70]">
                <Car className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="font-semibold text-[#2A2421] block text-[13px]">자가용</span>
                <p className="text-[#5C5045] mt-0.5">
                  내비게이션 이용 시 &ldquo;로터스 101&rdquo; 입력
                </p>
                <p className="text-[#5C5045] text-xs mt-1">
                  대형 전용 무료 주차장 구비
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
