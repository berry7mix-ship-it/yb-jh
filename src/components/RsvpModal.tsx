import React, { useState } from 'react';
import { X, CheckCircle2, Users } from 'lucide-react';
import confetti from 'canvas-confetti';
import { RsvpEntry } from '../types';

interface RsvpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RsvpModal: React.FC<RsvpModalProps> = ({ isOpen, onClose }) => {
  const [side, setSide] = useState<'groom' | 'bride'>('groom');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [attendeesCount, setAttendeesCount] = useState(1);
  const [dining, setDining] = useState<'yes' | 'no' | 'undecided'>('yes');
  const [memo, setMemo] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newRsvp: RsvpEntry = {
      id: `rsvp-${Date.now()}`,
      side,
      name: name.trim(),
      phone: phone.trim(),
      attendeesCount,
      dining,
      memo: memo.trim(),
      createdAt: new Date().toISOString(),
    };

    // Save to local storage
    try {
      const existingStr = localStorage.getItem('wedding_rsvps');
      const list: RsvpEntry[] = existingStr ? JSON.parse(existingStr) : [];
      list.push(newRsvp);
      localStorage.setItem('wedding_rsvps', JSON.stringify(list));
    } catch {
      // Local storage full or private mode
    }

    // Confetti celebration
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#8A7B70', '#C5A880', '#FAD2E1', '#E8D5C4'],
      });
    } catch {
      // Ignore if canvas not supported
    }

    setIsSubmitted(true);
    setTimeout(() => {
      // Reset form
      setName('');
      setPhone('');
      setMemo('');
      setAttendeesCount(1);
    }, 500);
  };

  const handleClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-[390px] bg-[#FAF8F5] rounded-2xl shadow-xl overflow-hidden border border-[#E9E4DC]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#EBE5DC] bg-white/70">
          <div className="text-left">
            <h3 className="font-serif-kr text-base font-semibold text-[#3E3835]">참석 의사 전달</h3>
            <p className="text-[11px] text-[#8C7F72]">원활한 예식 준비를 위해 소중한 응답을 부탁드립니다</p>
          </div>
          <button
            id="btn-close-rsvp-modal"
            onClick={handleClose}
            className="p-1.5 rounded-full text-[#8C7F72] hover:bg-[#EFECE6] transition-colors"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[80vh] overflow-y-auto no-scrollbar font-serif-kr">
          {isSubmitted ? (
            <div className="py-10 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h4 className="text-lg font-medium text-[#3E3835]">참석 의사가 전달되었습니다</h4>
              <p className="text-xs text-[#7A6E63] leading-relaxed">
                소중한 발걸음으로 두 사람의 앞날을 축복해 주셔서 감사드립니다.<br />
                예식날 반갑게 맞이하겠습니다.
              </p>
              <button
                id="btn-rsvp-success-close"
                onClick={handleClose}
                className="mt-4 px-6 py-2.5 rounded-xl bg-[#8A7B70] text-white text-xs font-medium hover:bg-[#786A60] transition-colors"
              >
                확인
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              {/* Side selector (Groom / Bride) */}
              <div>
                <label className="block text-xs font-medium text-[#5E5246] mb-1.5">
                  구분 <span className="text-[#B35959]">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSide('groom')}
                    className={`py-2 text-xs rounded-xl border transition-all ${
                      side === 'groom'
                        ? 'bg-[#8A7B70] text-white border-[#8A7B70] font-medium shadow-2xs'
                        : 'bg-white text-[#6B5F54] border-[#E2DDD4] hover:bg-[#F5F2EB]'
                    }`}
                  >
                    신랑측 하객
                  </button>
                  <button
                    type="button"
                    onClick={() => setSide('bride')}
                    className={`py-2 text-xs rounded-xl border transition-all ${
                      side === 'bride'
                        ? 'bg-[#8A7B70] text-white border-[#8A7B70] font-medium shadow-2xs'
                        : 'bg-white text-[#6B5F54] border-[#E2DDD4] hover:bg-[#F5F2EB]'
                    }`}
                  >
                    신부측 하객
                  </button>
                </div>
              </div>

              {/* Guest Name */}
              <div>
                <label className="block text-xs font-medium text-[#5E5246] mb-1">
                  참석자 성함 <span className="text-[#B35959]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="성함을 입력해주세요"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E2DDD4] text-xs text-[#3E3835] focus:outline-none focus:border-[#8A7B70]"
                />
              </div>

              {/* Contact Phone */}
              <div>
                <label className="block text-xs font-medium text-[#5E5246] mb-1">
                  연락처
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="010-0000-0000"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E2DDD4] text-xs text-[#3E3835] focus:outline-none focus:border-[#8A7B70]"
                />
              </div>

              {/* Attendees Count */}
              <div>
                <label className="block text-xs font-medium text-[#5E5246] mb-1">
                  참석 인원 (본인 포함)
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setAttendeesCount(num)}
                      className={`flex-1 py-1.5 text-xs rounded-lg border transition-colors ${
                        attendeesCount === num
                          ? 'bg-[#8A7B70] text-white border-[#8A7B70] font-medium'
                          : 'bg-white text-[#6B5F54] border-[#E2DDD4] hover:bg-[#F5F2EB]'
                      }`}
                    >
                      {num}명{num === 5 && '+'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dining Option */}
              <div>
                <label className="block text-xs font-medium text-[#5E5246] mb-1">
                  식사 여부
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setDining('yes')}
                    className={`py-2 text-xs rounded-lg border transition-all ${
                      dining === 'yes'
                        ? 'bg-[#8A7B70] text-white border-[#8A7B70] font-medium shadow-2xs'
                        : 'bg-white text-[#6B5F54] border-[#E2DDD4] hover:bg-[#F5F2EB]'
                    }`}
                  >
                    식사 예정
                  </button>
                  <button
                    type="button"
                    onClick={() => setDining('no')}
                    className={`py-2 text-xs rounded-lg border transition-all ${
                      dining === 'no'
                        ? 'bg-[#8A7B70] text-white border-[#8A7B70] font-medium shadow-2xs'
                        : 'bg-white text-[#6B5F54] border-[#E2DDD4] hover:bg-[#F5F2EB]'
                    }`}
                  >
                    식사 안함
                  </button>
                  <button
                    type="button"
                    onClick={() => setDining('undecided')}
                    className={`py-2 text-xs rounded-lg border transition-all ${
                      dining === 'undecided'
                        ? 'bg-[#8A7B70] text-white border-[#8A7B70] font-medium shadow-2xs'
                        : 'bg-white text-[#6B5F54] border-[#E2DDD4] hover:bg-[#F5F2EB]'
                    }`}
                  >
                    미정
                  </button>
                </div>
              </div>

              {/* Message Memo */}
              <div>
                <label className="block text-xs font-medium text-[#5E5246] mb-1">
                  신랑·신부에게 전할 말
                </label>
                <textarea
                  rows={2}
                  value={memo}
                  onChange={(e) => setMemo(e.target.value)}
                  placeholder="축하의 한마디를 남겨주세요"
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#E2DDD4] text-xs text-[#3E3835] focus:outline-none focus:border-[#8A7B70] resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#8A7B70] text-white text-xs font-medium hover:bg-[#786A60] transition-colors shadow-xs"
                >
                  참석 의사 전달하기
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
