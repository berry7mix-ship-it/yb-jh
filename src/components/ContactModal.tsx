import React from 'react';
import { WEDDING_DATA } from '../data/weddingData';
import { Phone, MessageCircle, X } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const { groom, bride } = WEDDING_DATA.couple;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-[380px] bg-[#FAF8F5] rounded-2xl shadow-xl overflow-hidden border border-[#E9E4DC]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#EBE5DC] bg-white/70">
          <div className="text-left">
            <h3 className="font-serif-kr text-base font-semibold text-[#3E3835]">연락하기</h3>
            <p className="text-[11px] text-[#8C7F72]">축하의 마음을 직접 전해보세요</p>
          </div>
          <button
            id="btn-close-contact-modal"
            onClick={onClose}
            className="p-1.5 rounded-full text-[#8C7F72] hover:bg-[#EFECE6] transition-colors"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto no-scrollbar text-left font-serif-kr text-sm">
          {/* Groom & Bridge direct contact */}
          <div className="space-y-3">
            <h4 className="font-montserrat text-xs font-semibold text-[#A89886] tracking-wider uppercase">
              신랑 & 신부
            </h4>

            {/* Groom */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-[#EBE5DC] shadow-xs">
              <div>
                <span className="text-xs text-[#8A7B70] mr-2">신랑</span>
                <span className="font-medium text-[#3E3835]">{groom.name}</span>
                <p className="text-[11px] text-[#A69B8F] font-montserrat mt-0.5">{groom.phone}</p>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={`tel:${groom.phone}`}
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-[#EBF1ED] text-[#4A7C59] hover:bg-[#DEE7E1] transition-colors"
                  title="전화 걸기"
                >
                  <Phone className="w-4 h-4" />
                </a>
                <a
                  href={`sms:${groom.phone}`}
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-[#F5ECE8] text-[#9E6554] hover:bg-[#EEDFD9] transition-colors"
                  title="문자 보내기"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Bride */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-[#EBE5DC] shadow-xs">
              <div>
                <span className="text-xs text-[#8A7B70] mr-2">신부</span>
                <span className="font-medium text-[#3E3835]">{bride.name}</span>
                <p className="text-[11px] text-[#A69B8F] font-montserrat mt-0.5">{bride.phone}</p>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={`tel:${bride.phone}`}
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-[#EBF1ED] text-[#4A7C59] hover:bg-[#DEE7E1] transition-colors"
                  title="전화 걸기"
                >
                  <Phone className="w-4 h-4" />
                </a>
                <a
                  href={`sms:${bride.phone}`}
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-[#F5ECE8] text-[#9E6554] hover:bg-[#EEDFD9] transition-colors"
                  title="문자 보내기"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Groom Parents contact */}
          <div className="space-y-3">
            <h4 className="font-montserrat text-xs font-semibold text-[#A89886] tracking-wider uppercase">
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
                  className="p-2 rounded-full bg-[#F5F2EC] text-[#6B5F54] hover:bg-[#E8E2D7] transition-colors"
                  title="전화 걸기"
                >
                  <Phone className="w-3.5 h-3.5" />
                </a>
                <a
                  href={`sms:${groom.father.phone}`}
                  className="p-2 rounded-full bg-[#F5F2EC] text-[#6B5F54] hover:bg-[#E8E2D7] transition-colors"
                  title="문자 보내기"
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
                  className="p-2 rounded-full bg-[#F5F2EC] text-[#6B5F54] hover:bg-[#E8E2D7] transition-colors"
                  title="전화 걸기"
                >
                  <Phone className="w-3.5 h-3.5" />
                </a>
                <a
                  href={`sms:${groom.mother.phone}`}
                  className="p-2 rounded-full bg-[#F5F2EC] text-[#6B5F54] hover:bg-[#E8E2D7] transition-colors"
                  title="문자 보내기"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Bride Parents contact */}
          <div className="space-y-3">
            <h4 className="font-montserrat text-xs font-semibold text-[#A89886] tracking-wider uppercase">
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
                  className="p-2 rounded-full bg-[#F5F2EC] text-[#6B5F54] hover:bg-[#E8E2D7] transition-colors"
                  title="전화 걸기"
                >
                  <Phone className="w-3.5 h-3.5" />
                </a>
                <a
                  href={`sms:${bride.father.phone}`}
                  className="p-2 rounded-full bg-[#F5F2EC] text-[#6B5F54] hover:bg-[#E8E2D7] transition-colors"
                  title="문자 보내기"
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
                  className="p-2 rounded-full bg-[#F5F2EC] text-[#6B5F54] hover:bg-[#E8E2D7] transition-colors"
                  title="전화 걸기"
                >
                  <Phone className="w-3.5 h-3.5" />
                </a>
                <a
                  href={`sms:${bride.mother.phone}`}
                  className="p-2 rounded-full bg-[#F5F2EC] text-[#6B5F54] hover:bg-[#E8E2D7] transition-colors"
                  title="문자 보내기"
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
            className="w-full py-2.5 rounded-xl bg-[#6B5E55] text-white text-xs font-medium hover:bg-[#584D45] transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
