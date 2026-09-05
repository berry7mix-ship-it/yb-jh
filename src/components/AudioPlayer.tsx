import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { weddingAudio } from '../utils/audio';

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const handleToggle = () => {
    setHasInteracted(true);
    const playing = weddingAudio.toggle();
    setIsPlaying(playing);
  };

  useEffect(() => {
    // Check initial state
    setIsPlaying(weddingAudio.getPlayingState());
    return () => {
      weddingAudio.pause();
    };
  }, []);

  return (
    <div className="fixed top-4 right-4 z-40">
      <button
        id="btn-bgm-toggle"
        onClick={handleToggle}
        aria-label="배경음악 재생/정지"
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-md transition-all duration-300 shadow-sm border text-xs font-sans ${
          isPlaying
            ? 'bg-[#8A7B70]/80 text-white border-[#C5A880]/50 shadow-[#8A7B70]/20'
            : 'bg-white/80 text-[#6B5E55] border-[#E8E2D9] hover:bg-white'
        }`}
      >
        {isPlaying ? (
          <>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            <span className="flex items-end gap-0.5 h-3">
              <span className="w-0.5 bg-white animate-[bounce_1s_infinite_100ms] h-2"></span>
              <span className="w-0.5 bg-white animate-[bounce_1s_infinite_300ms] h-3"></span>
              <span className="w-0.5 bg-white animate-[bounce_1s_infinite_200ms] h-1.5"></span>
            </span>
            <span className="font-medium tracking-tight">BGM ON</span>
          </>
        ) : (
          <>
            <Music className="w-3.5 h-3.5 text-[#8A7B70]" />
            <span className="tracking-tight text-[#8A7B70]">BGM OFF</span>
          </>
        )}
      </button>

      {/* First-time gentle prompt */}
      {!hasInteracted && !isPlaying && (
        <div className="absolute top-10 right-0 bg-[#3E3835]/90 text-[#F5F2EB] text-[11px] px-2.5 py-1 rounded-md shadow-md whitespace-nowrap animate-pulse pointer-events-none">
          음악과 함께 감상해보세요 🎵
          <div className="absolute -top-1 right-5 w-2 h-2 bg-[#3E3835]/90 rotate-45"></div>
        </div>
      )}
    </div>
  );
};
