import React, { useState } from 'react';
import { WEDDING_DATA } from '../data/weddingData';
import { Share2, Link as LinkIcon, QrCode, Check, X, MessageSquare } from 'lucide-react';

export const ShareSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [isKakaoModalOpen, setIsKakaoModalOpen] = useState(false);

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://letterb.barunsoncard.com/jhoon-jyeon';

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = currentUrl;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const handleShareNative = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${WEDDING_DATA.couple.groom.name} & ${WEDDING_DATA.couple.bride.name}의 모바일 청첩장`,
          text: `${WEDDING_DATA.ceremony.displayDate}, 저희 두 사람의 결혼식에 초대합니다.`,
          url: currentUrl,
        });
        return;
      } catch {
        // Fallback to copy link
      }
    }
    handleCopyLink();
  };

  return (
    <section id="section-share" className="w-full bg-[#FAF8F5] py-16 px-6 text-center border-b border-[#EFEBE4]">
      <div className="max-w-md mx-auto">
        <span className="font-montserrat tracking-[0.25em] text-[11px] text-[#A6998A] uppercase font-medium">
          Share
        </span>
        <h2 className="font-serif-kr text-xl text-[#3A332C] mt-2 mb-2 font-normal tracking-wide">
          청첩장 전달하기
        </h2>
        <p className="font-serif-kr text-xs text-[#7A6F64] mb-8">
          소중한 지인분들께 청첩장을 공유해보세요
        </p>

        {/* Share buttons */}
        <div className="grid grid-cols-3 gap-2.5 max-w-[360px] mx-auto">
          {/* Kakao Talk Share */}
          <button
            id="btn-share-kakao"
            onClick={() => setIsKakaoModalOpen(true)}
            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-[#FEE500] text-[#191919] hover:bg-[#ebd300] transition-colors shadow-2xs"
          >
            <MessageSquare className="w-5 h-5 mb-1.5 fill-current" />
            <span className="text-[11px] font-medium font-serif-kr">카카오톡 공유</span>
          </button>

          {/* Copy Link */}
          <button
            id="btn-share-copy"
            onClick={handleCopyLink}
            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white border border-[#E3DCD1] text-[#4A423B] hover:bg-[#F4EFE6] transition-colors shadow-2xs"
          >
            {copied ? (
              <>
                <Check className="w-5 h-5 mb-1.5 text-emerald-600" />
                <span className="text-[11px] font-medium font-serif-kr text-emerald-700">복사 완료</span>
              </>
            ) : (
              <>
                <LinkIcon className="w-5 h-5 mb-1.5 text-[#8A7B70]" />
                <span className="text-[11px] font-medium font-serif-kr">링크 복사</span>
              </>
            )}
          </button>

          {/* QR Code */}
          <button
            id="btn-share-qrcode"
            onClick={() => setIsQrModalOpen(true)}
            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white border border-[#E3DCD1] text-[#4A423B] hover:bg-[#F4EFE6] transition-colors shadow-2xs"
          >
            <QrCode className="w-5 h-5 mb-1.5 text-[#8A7B70]" />
            <span className="text-[11px] font-medium font-serif-kr">QR코드 보기</span>
          </button>
        </div>
      </div>

      {/* QR Code Modal */}
      {isQrModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div
            className="relative w-full max-w-[320px] bg-white rounded-2xl p-6 text-center shadow-xl border border-[#E8E2D7]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              id="btn-close-qr-modal"
              onClick={() => setIsQrModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-[#8C7F72] hover:bg-[#F5F2EC]"
              aria-label="닫기"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="font-serif-kr text-base font-semibold text-[#3E3835] mb-1">모바일 청첩장 QR</h3>
            <p className="text-[11px] text-[#8C7F72] font-serif-kr mb-5">
              스마트폰 카메라로 스캔하시면 바로 연결됩니다
            </p>

            {/* Generated QR Code Vector Representation */}
            <div className="w-48 h-48 mx-auto p-3 bg-white border border-[#ECE6DD] rounded-xl shadow-xs flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* Outer corners */}
                <rect x="5" y="5" width="28" height="28" fill="none" stroke="#3E3835" strokeWidth="4" rx="2" />
                <rect x="11" y="11" width="16" height="16" fill="#3E3835" />

                <rect x="67" y="5" width="28" height="28" fill="none" stroke="#3E3835" strokeWidth="4" rx="2" />
                <rect x="73" y="11" width="16" height="16" fill="#3E3835" />

                <rect x="5" y="67" width="28" height="28" fill="none" stroke="#3E3835" strokeWidth="4" rx="2" />
                <rect x="11" y="73" width="16" height="16" fill="#3E3835" />

                {/* Decorative Matrix blocks */}
                <rect x="40" y="8" width="8" height="8" fill="#8A7B70" />
                <rect x="52" y="8" width="8" height="8" fill="#3E3835" />
                <rect x="40" y="24" width="8" height="8" fill="#3E3835" />
                <rect x="52" y="24" width="8" height="8" fill="#8A7B70" />

                <rect x="8" y="42" width="8" height="8" fill="#3E3835" />
                <rect x="22" y="42" width="8" height="8" fill="#8A7B70" />
                <rect x="36" y="40" width="12" height="12" fill="#3E3835" />
                <rect x="52" y="40" width="12" height="12" fill="#3E3835" />
                <rect x="68" y="42" width="8" height="8" fill="#8A7B70" />
                <rect x="82" y="42" width="8" height="8" fill="#3E3835" />

                <rect x="40" y="56" width="8" height="8" fill="#8A7B70" />
                <rect x="52" y="56" width="8" height="8" fill="#3E3835" />

                <rect x="40" y="72" width="8" height="8" fill="#3E3835" />
                <rect x="52" y="72" width="8" height="8" fill="#8A7B70" />
                <rect x="68" y="68" width="12" height="12" fill="#3E3835" />
                <rect x="82" y="82" width="10" height="10" fill="#8A7B70" />
              </svg>
            </div>

            <p className="mt-4 text-[11px] font-montserrat text-[#8C7F72]">
              letterb.barunsoncard.com/youngbin-jihong
            </p>

            <button
              onClick={() => setIsQrModalOpen(false)}
              className="mt-5 w-full py-2.5 rounded-xl bg-[#8A7B70] text-white text-xs font-serif-kr hover:bg-[#786A60] transition-colors"
            >
              닫기
            </button>
          </div>
        </div>
      )}

      {/* KakaoTalk Share Card Preview Modal */}
      {isKakaoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div
            className="relative w-full max-w-[340px] bg-white rounded-2xl p-5 text-center shadow-xl border border-[#E8E2D7]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              id="btn-close-kakao-modal"
              onClick={() => setIsKakaoModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-[#8C7F72] hover:bg-[#F5F2EC]"
              aria-label="닫기"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="font-serif-kr text-sm font-semibold text-[#3E3835] mb-1">
              카카오톡 공유 미리보기
            </h3>
            <p className="text-[11px] text-[#8C7F72] font-serif-kr mb-4">
              메신저에 전송될 청첩장 카드입니다
            </p>

            {/* Kakao Card Mockup */}
            <div className="rounded-xl overflow-hidden border border-[#EBE5DC] bg-[#FAF8F5] text-left shadow-xs">
              <img
                src={WEDDING_DATA.mainPhoto.src}
                onError={(e) => {
                  e.currentTarget.src = WEDDING_DATA.mainPhoto.fallback;
                }}
                alt="웨딩 사진 미리보기"
                referrerPolicy="no-referrer"
                className="w-full h-40 object-cover"
              />
              <div className="p-3.5 space-y-1 font-serif-kr">
                <p className="text-xs font-semibold text-[#3E3835]">
                  {WEDDING_DATA.couple.groom.name} ♥ {WEDDING_DATA.couple.bride.name} 결혼식에 초대합니다
                </p>
                <p className="text-[11px] text-[#7A6E63]">
                  2027.10.16 토요일 오후 2:20 | {WEDDING_DATA.ceremony.venue.name}
                </p>
                <div className="pt-2">
                  <span className="inline-block w-full py-1.5 text-center text-xs font-medium rounded-md bg-[#FEE500] text-[#191919]">
                    모바일 청첩장 보기
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <button
                onClick={handleShareNative}
                className="flex-1 py-2.5 rounded-xl bg-[#FEE500] text-[#191919] text-xs font-medium font-serif-kr hover:bg-[#ebd300] transition-colors"
              >
                카카오톡으로 전송
              </button>
              <button
                onClick={() => setIsKakaoModalOpen(false)}
                className="px-4 py-2.5 rounded-xl bg-[#EFECE6] text-[#5C5045] text-xs font-serif-kr hover:bg-[#E4DFD6] transition-colors"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
