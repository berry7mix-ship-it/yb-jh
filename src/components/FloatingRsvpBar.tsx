import React, { useState } from 'react';
import { HeartHandshake } from 'lucide-react';
import { RsvpModal } from './RsvpModal';

export const FloatingRsvpBar: React.FC = () => {
  const [isRsvpOpen, setIsRsvpOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-5 left-0 right-0 z-40 flex justify-center pointer-events-none px-4">
        <button
          id="btn-floating-rsvp"
          onClick={() => setIsRsvpOpen(true)}
          className="pointer-events-auto flex items-center gap-2 px-5 py-3 rounded-full bg-[#8A7B70] text-white text-xs font-serif-kr shadow-lg hover:bg-[#786A60] hover:scale-105 active:scale-95 transition-all duration-200 border border-white/20 backdrop-blur-xs"
        >
          <HeartHandshake className="w-4 h-4 text-[#FFD6DD]" />
          <span className="font-medium tracking-wide">참석 의사 전달하기 (RSVP)</span>
        </button>
      </div>

      <RsvpModal isOpen={isRsvpOpen} onClose={() => setIsRsvpOpen(false)} />
    </>
  );
};
