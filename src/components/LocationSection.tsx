import React, { useState } from 'react';
import { WEDDING_DATA } from '../data/weddingData';
import { Copy, Check, Car, Train, Bus, Phone, MapPin } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const LocationSection: React.FC = () => {
  const { venue } = WEDDING_DATA.ceremony;
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(venue.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
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
        <ScrollReveal>
          <span className="font-montserrat tracking-[0.26em] text-[11px] text-[#A6998A] uppercase font-medium">
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
              className="inline-flex items-center gap-1.5 px-4 py-2 min-h-[40px] rounded-full bg-[#FAF8F5] border border-[#E0D7CC] text-xs font-serif-kr text-[#594E44] hover:bg-[#F2ECE3] active:scale-[0.98] transition-all shadow-2xs cursor-pointer"
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
              className="inline-flex items-center gap-1.5 px-4 py-2 min-h-[40px] rounded-full bg-[#FAF8F5] border border-[#E0D7CC] text-xs font-serif-kr text-[#594E44] hover:bg-[#F2ECE3] active:scale-[0.98] transition-all shadow-2xs"
            >
              <Phone className="w-3.5 h-3.5 text-[#8A7B70]" />
              <span>웨딩홀 전화</span>
            </a>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          {/* Official Venue Roadmap (Precision Vector Reconstruction of Lotus 101 Map) */}
          <div className="relative rounded-2xl overflow-hidden border border-[#DCD5C9] bg-white shadow-2xs mb-5">
            <div className="p-3 sm:p-4">
              <div className="w-full bg-white select-none">
                <svg
                  viewBox="0 0 1000 650"
                  className="w-full h-auto"
                  role="img"
                  aria-label="로터스 101 오시는 길 약도"
                >
                  {/* 1. Main Straight Diagonal Road: 시지방면/수성IC -> 영남대역 4번출구 -> 압량네거리 -> 진량방면/경산IC */}
                  <line
                    x1="130"
                    y1="460"
                    x2="632"
                    y2="69"
                    stroke="#111111"
                    strokeWidth="12"
                    strokeLinecap="round"
                  />

                  {/* 2. Intersecting Road from 압량면 -> 압량네거리 -> bend -> fork -> bottom branch */}
                  <polyline
                    points="460,66 617,234 663,376 640,570"
                    fill="none"
                    stroke="#111111"
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* 3. Fork Branch to 로터스101 */}
                  <polyline
                    points="663,376 886,463 882,532"
                    fill="none"
                    stroke="#111111"
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* 4. 감못 (Lake Oval) */}
                  <ellipse
                    cx="757"
                    cy="483"
                    rx="90"
                    ry="42"
                    fill="#FFFFFF"
                    stroke="#111111"
                    strokeWidth="2.2"
                  />
                  <text
                    x="757"
                    y="490"
                    textAnchor="middle"
                    fontSize="20"
                    fontWeight="500"
                    fill="#111111"
                    fontFamily="'Noto Sans KR', -apple-system, BlinkMacSystemFont, sans-serif"
                  >
                    감못
                  </text>

                  {/* 5. 로터스101 Destination Bullseye & Label */}
                  <circle
                    cx="882"
                    cy="558"
                    r="26"
                    fill="#FFFFFF"
                    stroke="#111111"
                    strokeWidth="3.5"
                  />
                  <circle cx="882" cy="558" r="19" fill="#111111" />
                  <text
                    x="886"
                    y="622"
                    textAnchor="middle"
                    fontSize="30"
                    fontWeight="600"
                    fill="#111111"
                    letterSpacing="-0.02em"
                    fontFamily="'Noto Sans KR', -apple-system, BlinkMacSystemFont, sans-serif"
                  >
                    로터스101
                  </text>

                  {/* 6. 압량네거리 Box */}
                  <rect
                    x="481"
                    y="125"
                    width="108"
                    height="38"
                    fill="#FFFFFF"
                    stroke="#111111"
                    strokeWidth="2"
                  />
                  <text
                    x="535"
                    y="151"
                    textAnchor="middle"
                    fontSize="20"
                    fontWeight="400"
                    fill="#111111"
                    letterSpacing="-0.03em"
                    fontFamily="'Noto Sans KR', -apple-system, BlinkMacSystemFont, sans-serif"
                  >
                    압량네거리
                  </text>

                  {/* 7. 영남대역 4번 출구 Box & Shuttle Label */}
                  <rect
                    x="202"
                    y="327"
                    width="102"
                    height="74"
                    fill="#FFFFFF"
                    stroke="#111111"
                    strokeWidth="2.4"
                  />
                  <text
                    x="253"
                    y="357"
                    textAnchor="middle"
                    fontSize="20"
                    fontWeight="400"
                    fill="#111111"
                    letterSpacing="-0.03em"
                    fontFamily="'Noto Sans KR', -apple-system, BlinkMacSystemFont, sans-serif"
                  >
                    영남대역
                  </text>
                  <text
                    x="253"
                    y="383"
                    textAnchor="middle"
                    fontSize="20"
                    fontWeight="400"
                    fill="#111111"
                    letterSpacing="-0.03em"
                    fontFamily="'Noto Sans KR', -apple-system, BlinkMacSystemFont, sans-serif"
                  >
                    4번 출구
                  </text>

                  <text
                    x="255"
                    y="427"
                    textAnchor="middle"
                    fontSize="19"
                    fontWeight="500"
                    fill="#111111"
                    letterSpacing="-0.02em"
                    fontFamily="'Noto Sans KR', -apple-system, BlinkMacSystemFont, sans-serif"
                  >
                    로터스101
                  </text>
                  <text
                    x="255"
                    y="451"
                    textAnchor="middle"
                    fontSize="19"
                    fontWeight="500"
                    fill="#111111"
                    letterSpacing="-0.02em"
                    fontFamily="'Noto Sans KR', -apple-system, BlinkMacSystemFont, sans-serif"
                  >
                    셔틀버스 탑승장
                  </text>

                  {/* 8. Direction Labels at Road Termini */}
                  {/* 시지방면 / 수성IC */}
                  <text
                    x="91"
                    y="491"
                    textAnchor="middle"
                    fontSize="19"
                    fontWeight="300"
                    fill="#111111"
                    letterSpacing="-0.03em"
                    fontFamily="'Noto Sans KR', -apple-system, BlinkMacSystemFont, sans-serif"
                  >
                    시지방면
                  </text>
                  <text
                    x="91"
                    y="515"
                    textAnchor="middle"
                    fontSize="19"
                    fontWeight="300"
                    fill="#111111"
                    letterSpacing="-0.02em"
                    fontFamily="'Noto Sans KR', -apple-system, BlinkMacSystemFont, sans-serif"
                  >
                    수성IC
                  </text>

                  {/* 압량면 */}
                  <text
                    x="441"
                    y="51"
                    textAnchor="middle"
                    fontSize="20"
                    fontWeight="300"
                    fill="#111111"
                    letterSpacing="-0.03em"
                    fontFamily="'Noto Sans KR', -apple-system, BlinkMacSystemFont, sans-serif"
                  >
                    압량면
                  </text>

                  {/* 진량방면 / 경산IC */}
                  <text
                    x="674"
                    y="48"
                    textAnchor="middle"
                    fontSize="19"
                    fontWeight="300"
                    fill="#111111"
                    letterSpacing="-0.03em"
                    fontFamily="'Noto Sans KR', -apple-system, BlinkMacSystemFont, sans-serif"
                  >
                    진량방면
                  </text>
                  <text
                    x="674"
                    y="72"
                    textAnchor="middle"
                    fontSize="19"
                    fontWeight="300"
                    fill="#111111"
                    letterSpacing="-0.02em"
                    fontFamily="'Noto Sans KR', -apple-system, BlinkMacSystemFont, sans-serif"
                  >
                    경산IC
                  </text>

                  {/* 9. Landmark Squares & Labels */}
                  {/* 압량농협 */}
                  <rect x="452" y="136" width="12" height="12" fill="#111111" />
                  <text
                    x="430"
                    y="170"
                    textAnchor="middle"
                    fontSize="19"
                    fontWeight="500"
                    fill="#111111"
                    letterSpacing="-0.03em"
                    fontFamily="'Noto Sans KR', -apple-system, BlinkMacSystemFont, sans-serif"
                  >
                    압량농협
                  </text>

                  {/* 박물관 */}
                  <rect x="364" y="354" width="12" height="12" fill="#111111" />
                  <text
                    x="369"
                    y="390"
                    textAnchor="middle"
                    fontSize="19"
                    fontWeight="500"
                    fill="#111111"
                    letterSpacing="-0.03em"
                    fontFamily="'Noto Sans KR', -apple-system, BlinkMacSystemFont, sans-serif"
                  >
                    박물관
                  </text>

                  {/* 음악대학 */}
                  <rect x="532" y="424" width="12" height="12" fill="#111111" />
                  <text
                    x="538"
                    y="459"
                    textAnchor="middle"
                    fontSize="19"
                    fontWeight="500"
                    fill="#111111"
                    letterSpacing="-0.03em"
                    fontFamily="'Noto Sans KR', -apple-system, BlinkMacSystemFont, sans-serif"
                  >
                    음악대학
                  </text>

                  {/* 영남대학교 */}
                  <rect x="407" y="520" width="12" height="12" fill="#111111" />
                  <text
                    x="413"
                    y="556"
                    textAnchor="middle"
                    fontSize="19"
                    fontWeight="500"
                    fill="#111111"
                    letterSpacing="-0.03em"
                    fontFamily="'Noto Sans KR', -apple-system, BlinkMacSystemFont, sans-serif"
                  >
                    영남대학교
                  </text>

                  {/* 경산압량 초등학교 */}
                  <rect x="713" y="190" width="12" height="12" fill="#111111" />
                  <text
                    x="719"
                    y="227"
                    textAnchor="middle"
                    fontSize="19"
                    fontWeight="500"
                    fill="#111111"
                    letterSpacing="-0.03em"
                    fontFamily="'Noto Sans KR', -apple-system, BlinkMacSystemFont, sans-serif"
                  >
                    경산압량
                  </text>
                  <text
                    x="719"
                    y="250"
                    textAnchor="middle"
                    fontSize="19"
                    fontWeight="500"
                    fill="#111111"
                    letterSpacing="-0.03em"
                    fontFamily="'Noto Sans KR', -apple-system, BlinkMacSystemFont, sans-serif"
                  >
                    초등학교
                  </text>

                  {/* 경산소방서 */}
                  <rect x="821" y="269" width="12" height="12" fill="#111111" />
                  <text
                    x="827"
                    y="306"
                    textAnchor="middle"
                    fontSize="19"
                    fontWeight="500"
                    fill="#111111"
                    letterSpacing="-0.03em"
                    fontFamily="'Noto Sans KR', -apple-system, BlinkMacSystemFont, sans-serif"
                  >
                    경산소방서
                  </text>
                </svg>
              </div>

              {/* Address and Contact info as in official map */}
              <div className="mt-3 pt-4 border-t border-[#EAE4DC] text-center space-y-3">
                <div>
                  <p className="font-serif-kr text-[13.5px] sm:text-[14.5px] text-[#2A2421] font-semibold tracking-tight">
                    로터스101 : 경북 경산시 화랑로 8길 200
                  </p>
                  <p className="font-montserrat text-xs text-[#7A6E63] tabular-nums mt-0.5">
                    Tel. 053 817 1234
                  </p>
                </div>

                {/* Notice Style Box */}
                <div className="mx-auto py-3 px-4 rounded-xl bg-[#F7F3EC] border border-[#E5DDD0] text-center shadow-2xs">
                  <p className="text-[11px] font-serif-kr font-semibold text-[#7A6A58] tracking-widest mb-1.5">
                    셔틀 및 주차 안내
                  </p>
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
              className="flex items-center justify-center gap-1.5 py-3 px-3 min-h-[44px] rounded-xl bg-[#03C75A] text-white text-xs font-medium hover:bg-[#02b350] active:scale-[0.98] transition-all shadow-2xs whitespace-nowrap"
            >
              <MapPin className="w-3.5 h-3.5 opacity-90 shrink-0" />
              <span>네이버 지도</span>
            </a>
            <a
              id="link-kakao-map"
              href={venue.kakaoMapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-3 px-3 min-h-[44px] rounded-xl bg-[#FEE500] text-[#191919] text-xs font-medium hover:bg-[#ebd300] active:scale-[0.98] transition-all shadow-2xs whitespace-nowrap"
            >
              <MapPin className="w-3.5 h-3.5 opacity-80 shrink-0" />
              <span>카카오맵</span>
            </a>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={160}>
          {/* Detailed Transit Information matching the uploaded map card */}
          <div className="bg-white rounded-2xl p-5 border border-[#E8E2D7] text-left shadow-2xs space-y-4">
            <div className="border-b border-[#F0EBE3] pb-2.5">
              <h3 className="font-serif-kr text-sm font-semibold text-[#3A332C]">
                교통편 상세 안내
              </h3>
            </div>

            <div className="space-y-3.5 font-serif-kr text-xs text-[#4A4036] leading-relaxed">
              {/* Subway */}
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#FAF7F2] border border-[#E8E1D5] flex items-center justify-center shrink-0 mt-0.5 text-[#8C7E70]">
                  <Train className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="font-semibold text-[#2A2421] block text-[13px]">지하철</span>
                  <p className="text-[#5C5045] mt-0.5 leading-relaxed">
                    대구 2호선 영남대역 4번출구 셔틀버스<br />
                    (5분 소요)
                  </p>
                </div>
              </div>

              {/* Highway */}
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#FAF7F2] border border-[#E8E1D5] flex items-center justify-center shrink-0 mt-0.5 text-[#8C7E70]">
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
                <div className="w-7 h-7 rounded-lg bg-[#FAF7F2] border border-[#E8E1D5] flex items-center justify-center shrink-0 mt-0.5 text-[#8C7E70]">
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
                <div className="w-7 h-7 rounded-lg bg-[#FAF7F2] border border-[#E8E1D5] flex items-center justify-center shrink-0 mt-0.5 text-[#8C7E70]">
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
        </ScrollReveal>
      </div>
    </section>
  );
};
