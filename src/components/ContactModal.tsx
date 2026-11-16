import React, { useEffect } from 'react';
import { WEDDING_DATA } from '../data/weddingData';
import { Phone, MessageCircle, X } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  const { groom, bride } = WEDDING_DATA.couple;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 backdrop-blur-xs transition-opacity duration-200"
    >
      <div
        className="relative w-full max-w-[380px] bg-[#FAF8F5] rounded-2xl shadow-2xl overflow-hidden border border-[#E9E4DC] animate-[heroFadeUp_0.25s_cubic-bezier(0.22,1,0.36,1)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#EBE5DC] bg-white/80">
          <div className="text-left">
            <h3 className="font-serif-kr text-base font-semibold text-[#3E3835]">연락하기</h3>
            <p className="text-[11px] text-[#8C7F72] mt-0.5">축하의 마음을 직접 전해보세요</p>
          </div>
          <button
            id="btn-close-contact-modal"
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full text-[#8C7F72] hover:bg-[#EFECE6] transition-colors cursor-pointer"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[72vh] overflow-y-auto no-scrollbar text-left font-serif-kr text-sm">
          {/* Groom & Bride direct contact */}
          <div className="space-y-3">
            <h4 className="font-serif-kr text-xs font-semibold text-[#8C7E70] tracking-wide">
              신랑 · 신부
            </h4>

            {/* Groom */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-[#EBE5DC] shadow-2xs">
              <div>
                <span className="text-xs text-[#8A7B70] mr-2">신랑</span>
                <span className="font-medium text-[#3E3835]">{groom.name}</span>
                <p className="text-[11px] text-[#A69B8F] font-montserrat tabular-nums mt-0.5">{groom.phone}</p>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={`tel:${groom.phone}`}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-[#EBF1ED] text-[#4A7C59] hover:bg-[#DEE7E1] active:scale-95 transition-all"
                  title="전화 걸기"
                  aria-label={`신랑 ${groom.name}에게 전화 걸기`}
                >
                  <Phone className="w-4 h-4" />
                </a>
                <a
                  href={`sms:${groom.phone}`}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-[#F5ECE8] text-[#9E6554] hover:bg-[#EEDFD9] active:scale-95 transition-all"
                  title="문자 보내기"
                  aria-label={`신랑 ${groom.name}에게 문자 보내기`}
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Bride */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-[#EBE5DC] shadow-2xs">
              <div>
                <span className="text-xs text-[#8A7B70] mr-2">신부</span>
                <span className="font-medium text-[#3E3835]">{bride.name}</span>
                <p className="text-[11px] text-[#A69B8F] font-montserrat tabular-nums mt-0.5">{bride.phone}</p>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={`tel:${bride.phone}`}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-[#EBF1ED] text-[#4A7C59] hover:bg-[#DEE7E1] active:scale-95 transition-all"
                  title="전화 걸기"
                  aria-label={`신부 ${bride.name}에게 전화 걸기`}
                >
                  <Phone className="w-4 h-4" />
                </a>
                <a
                  href={`sms:${bride.phone}`}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-[#F5ECE8] text-[#9E6554] hover:bg-[#EEDFD9] active:scale-95 transition-all"
                  title="문자 보내기"
                  aria-label={`신부 ${bride.name}에게 문자 보내기`}
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Groom Parents contact */}
          <div className="space-y-2.5">
            <h4 className="font-serif-kr text-xs font-semibold text-[#8C7E70] tracking-wide">
              신랑측 혼주
            </h4>

            {/* Father */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#EBE5DC]">
              <div>
                <span className="text-xs text-[#8A7B70] mr-2">아버지</span>
                <span className="font-medium text-[#3E3835]">{groom.father.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={`tel:${groom.father.phone}`}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-[#F5F2EC] text-[#6B5F54] hover:bg-[#E8E2D7] active:scale-95 transition-all"
                  title="전화 걸기"
                  aria-label={`신랑 아버지 ${groom.father.name}에게 전화 걸기`}
                >
                  <Phone className="w-3.5 h-3.5" />
                </a>
                <a
                  href={`sms:${groom.father.phone}`}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-[#F5F2EC] text-[#6B5F54] hover:bg-[#E8E2D7] active:scale-95 transition-all"
                  title="문자 보내기"
                  aria-label={`신랑 아버지 ${groom.father.name}에게 문자 보내기`}
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Mother */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#EBE5DC]">
              <div>
                <span className="text-xs text-[#8A7B70] mr-2">어머니</span>
                <span className="font-medium text-[#3E3835]">{groom.mother.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={`tel:${groom.mother.phone}`}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-[#F5F2EC] text-[#6B5F54] hover:bg-[#E8E2D7] active:scale-95 transition-all"
                  title="전화 걸기"
                  aria-label={`신랑 어머니 ${groom.mother.name}에게 전화 걸기`}
                >
                  <Phone className="w-3.5 h-3.5" />
                </a>
                <a
                  href={`sms:${groom.mother.phone}`}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-[#F5F2EC] text-[#6B5F54] hover:bg-[#E8E2D7] active:scale-95 transition-all"
                  title="문자 보내기"
                  aria-label={`신랑 어머니 ${groom.mother.name}에게 문자 보내기`}
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Bride Parents contact */}
          <div className="space-y-2.5">
            <h4 className="font-serif-kr text-xs font-semibold text-[#8C7E70] tracking-wide">
              신부측 혼주
            </h4>

            {/* Father */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#EBE5DC]">
              <div>
                <span className="text-xs text-[#8A7B70] mr-2">아버지</span>
                <span className="font-medium text-[#3E3835]">{bride.father.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={`tel:${bride.father.phone}`}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-[#F5F2EC] text-[#6B5F54] hover:bg-[#E8E2D7] active:scale-95 transition-all"
                  title="전화 걸기"
                  aria-label={`신부 아버지 ${bride.father.name}에게 전화 걸기`}
                >
                  <Phone className="w-3.5 h-3.5" />
                </a>
                <a
                  href={`sms:${bride.father.phone}`}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-[#F5F2EC] text-[#6B5F54] hover:bg-[#E8E2D7] active:scale-95 transition-all"
                  title="문자 보내기"
                  aria-label={`신부 아버지 ${bride.father.name}에게 문자 보내기`}
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Mother */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#EBE5DC]">
              <div>
                <span className="text-xs text-[#8A7B70] mr-2">어머니</span>
                <span className="font-medium text-[#3E3835]">{bride.mother.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={`tel:${bride.mother.phone}`}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-[#F5F2EC] text-[#6B5F54] hover:bg-[#E8E2D7] active:scale-95 transition-all"
                  title="전화 걸기"
                  aria-label={`신부 어머니 ${bride.mother.name}에게 전화 걸기`}
                >
                  <Phone className="w-3.5 h-3.5" />
                </a>
                <a
                  href={`sms:${bride.mother.phone}`}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-[#F5F2EC] text-[#6B5F54] hover:bg-[#E8E2D7] active:scale-95 transition-all"
                  title="문자 보내기"
                  aria-label={`신부 어머니 ${bride.mother.name}에게 문자 보내기`}
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#EBE5DC] bg-white text-center">
          <button
            id="btn-close-contact-modal-bottom"
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-[#6B5E55] text-white text-xs font-medium hover:bg-[#584D45] active:scale-[0.99] transition-all cursor-pointer"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
