import React, { useState, useEffect, useCallback, useRef } from 'react';
import { WEDDING_DATA } from '../data/weddingData';
import { X, ChevronLeft, ChevronRight, LayoutGrid, SlidersHorizontal, ZoomIn } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const GallerySection: React.FC = () => {
  const photos = WEDDING_DATA.photos;
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'slide'>('grid');
  const [slideCurrent, setSlideCurrent] = useState(0);

  // Touch swipe tracking
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const openLightbox = (index: number) => {
    setActivePhotoIndex(index);
  };

  const closeLightbox = () => {
    setActivePhotoIndex(null);
  };

  const showNext = useCallback(() => {
    setActivePhotoIndex((prev) => (prev !== null ? (prev + 1) % photos.length : null));
  }, [photos.length]);

  const showPrev = useCallback(() => {
    setActivePhotoIndex((prev) => (prev !== null ? (prev - 1 + photos.length) % photos.length : null));
  }, [photos.length]);

  const nextSlide = useCallback(() => {
    setSlideCurrent((prev) => (prev + 1) % photos.length);
  }, [photos.length]);

  const prevSlide = useCallback(() => {
    setSlideCurrent((prev) => (prev - 1 + photos.length) % photos.length);
  }, [photos.length]);

  // Keyboard navigation & body scroll lock for Lightbox
  useEffect(() => {
    if (activePhotoIndex === null) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activePhotoIndex, showNext, showPrev]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent, onSwipeLeft: () => void, onSwipeRight: () => void) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    // Trigger horizontal swipe only if horizontal movement dominates vertical
    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
      if (deltaX < 0) {
        onSwipeLeft();
      } else {
        onSwipeRight();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  // Split photos into two alternating columns for natural-aspect masonry layout
  const col1Photos = photos.filter((_, idx) => idx % 2 === 0);
  const col2Photos = photos.filter((_, idx) => idx % 2 === 1);

  return (
    <section id="section-gallery" className="w-full bg-[#FAF8F5] py-16 px-5 text-center border-b border-[#EFEBE4]">
      <div className="max-w-md mx-auto">
        <ScrollReveal>
          <span className="font-montserrat tracking-[0.26em] text-[11px] text-[#A6998A] uppercase font-medium">
            Gallery
          </span>
          <h2 className="font-serif-kr text-xl text-[#3A332C] mt-2 mb-2 font-normal tracking-wide">
            웨딩 갤러리
          </h2>
          <p className="font-serif-kr text-xs text-[#8C7F72] mb-6">
            사진을 누르시면 크게 보실 수 있습니다
          </p>

          {/* Segmented View Mode Switcher (Grid vs Slider) */}
          <div className="inline-flex items-center p-1 rounded-xl bg-[#EFEAE2] border border-[#E4DDD3] mb-6">
            <button
              id="btn-gallery-grid-mode"
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-serif-kr transition-all duration-200 cursor-pointer whitespace-nowrap ${
                viewMode === 'grid'
                  ? 'bg-white text-[#3A332C] font-medium shadow-2xs'
                  : 'text-[#8A7B70] hover:text-[#554B43]'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>바둑판형</span>
            </button>
            <button
              id="btn-gallery-slide-mode"
              onClick={() => setViewMode('slide')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-serif-kr transition-all duration-200 cursor-pointer whitespace-nowrap ${
                viewMode === 'slide'
                  ? 'bg-white text-[#3A332C] font-medium shadow-2xs'
                  : 'text-[#8A7B70] hover:text-[#554B43]'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>슬라이드형</span>
            </button>
          </div>
        </ScrollReveal>

        {/* 1. Natural Proportions Masonry Grid View (No Cropping) */}
        {viewMode === 'grid' && (
          <ScrollReveal delay={100}>
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3 items-start">
              {/* Left Column (Photos 1, 3, 5, 7, 9, 12) */}
              <div className="flex flex-col gap-2.5 sm:gap-3">
                {col1Photos.map((photo) => {
                  const originalIndex = photos.findIndex((p) => p.id === photo.id);
                  return (
                    <div
                      key={photo.id}
                      id={`gallery-item-${originalIndex + 1}`}
                      onClick={() => openLightbox(originalIndex)}
                      className="relative group overflow-hidden rounded-xl bg-white shadow-2xs cursor-pointer border border-[#ECE6DD] transition-all duration-300 hover:shadow-md active:scale-[0.99]"
                    >
                      <img
                        src={photo.src}
                        alt={photo.alt}
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          if (photo.fallback && e.currentTarget.src !== photo.fallback) {
                            e.currentTarget.src = photo.fallback;
                          }
                        }}
                        className="w-full h-auto block object-contain transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300 flex items-center justify-center pointer-events-none">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-8 h-8 rounded-full bg-black/45 backdrop-blur-xs flex items-center justify-center text-white">
                          <ZoomIn className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Right Column (Photos 2, 4, 6, 8, 10, 11) */}
              <div className="flex flex-col gap-2.5 sm:gap-3">
                {col2Photos.map((photo) => {
                  const originalIndex = photos.findIndex((p) => p.id === photo.id);
                  return (
                    <div
                      key={photo.id}
                      id={`gallery-item-${originalIndex + 1}`}
                      onClick={() => openLightbox(originalIndex)}
                      className="relative group overflow-hidden rounded-xl bg-white shadow-2xs cursor-pointer border border-[#ECE6DD] transition-all duration-300 hover:shadow-md active:scale-[0.99]"
                    >
                      <img
                        src={photo.src}
                        alt={photo.alt}
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          if (photo.fallback && e.currentTarget.src !== photo.fallback) {
                            e.currentTarget.src = photo.fallback;
                          }
                        }}
                        className="w-full h-auto block object-contain transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300 flex items-center justify-center pointer-events-none">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-8 h-8 rounded-full bg-black/45 backdrop-blur-xs flex items-center justify-center text-white">
                          <ZoomIn className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* 2. Slide View (Full Aspect Display, Touch Swipe Support) */}
        {viewMode === 'slide' && (
          <div className="relative mx-auto max-w-[360px] animate-[heroFadeUp_0.3s_ease-out]">
            <div
              id="gallery-slide-card"
              onTouchStart={handleTouchStart}
              onTouchEnd={(e) => handleTouchEnd(e, nextSlide, prevSlide)}
              className="relative min-h-[380px] sm:min-h-[440px] max-h-[520px] flex items-center justify-center rounded-2xl overflow-hidden shadow-2xs bg-[#F5F0E8] border border-[#E8E2D8] p-3 cursor-pointer select-none"
              onClick={() => openLightbox(slideCurrent)}
            >
              <img
                key={photos[slideCurrent].id}
                src={photos[slideCurrent].src}
                alt={photos[slideCurrent].alt}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  if (photos[slideCurrent].fallback && e.currentTarget.src !== photos[slideCurrent].fallback) {
                    e.currentTarget.src = photos[slideCurrent].fallback;
                  }
                }}
                className="max-h-[460px] w-auto max-w-full object-contain rounded-xl shadow-xs animate-[heroFadeUp_0.25s_ease-out]"
              />
              <div className="absolute bottom-3.5 left-0 right-0 text-center pointer-events-none">
                <span className="inline-block px-3 py-1 rounded-full bg-black/45 backdrop-blur-xs text-white text-[11px] font-montserrat tabular-nums tracking-wider">
                  {slideCurrent + 1} / {photos.length}
                </span>
              </div>
            </div>

            {/* Slide Navigation Buttons */}
            <div className="flex items-center justify-between mt-3.5 px-1">
              <button
                id="btn-slide-prev"
                onClick={prevSlide}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-[#E5DFD5] text-[#554B43] hover:bg-[#F2ECE3] active:scale-95 transition-all cursor-pointer"
                aria-label="이전 사진"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <span className="font-serif-kr text-xs text-[#7A6E63] truncate max-w-[200px]">
                {photos[slideCurrent].caption}
              </span>

              <button
                id="btn-slide-next"
                onClick={nextSlide}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-[#E5DFD5] text-[#554B43] hover:bg-[#F2ECE3] active:scale-95 transition-all cursor-pointer"
                aria-label="다음 사진"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Fullscreen Lightbox Modal with Swipe & Thumbnail Strip */}
      {activePhotoIndex !== null && (
        <div
          onClick={closeLightbox}
          onTouchStart={handleTouchStart}
          onTouchEnd={(e) => handleTouchEnd(e, showNext, showPrev)}
          className="fixed inset-0 z-50 bg-black/92 flex flex-col justify-between p-4 backdrop-blur-md transition-opacity duration-200"
        >
          {/* Header */}
          <div
            className="flex items-center justify-between text-white/85 px-2 pt-1"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="font-montserrat text-xs tracking-widest tabular-nums">
              {activePhotoIndex + 1} / {photos.length}
            </span>
            <button
              id="btn-close-lightbox"
              onClick={closeLightbox}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="갤러리 닫기"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Image in Lightbox */}
          <div
            className="relative flex-1 flex items-center justify-center my-auto overflow-hidden p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              key={photos[activePhotoIndex].id}
              src={photos[activePhotoIndex].src}
              alt={photos[activePhotoIndex].alt}
              referrerPolicy="no-referrer"
              onError={(e) => {
                if (
                  photos[activePhotoIndex].fallback &&
                  e.currentTarget.src !== photos[activePhotoIndex].fallback
                ) {
                  e.currentTarget.src = photos[activePhotoIndex].fallback;
                }
              }}
              className="max-h-[72vh] max-w-[92vw] object-contain select-none rounded-lg shadow-2xl animate-[heroFadeUp_0.22s_ease-out]"
            />

            {/* Prev button */}
            <button
              id="btn-lightbox-prev"
              onClick={(e) => {
                e.stopPropagation();
                showPrev();
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full bg-black/45 text-white/90 hover:bg-black/75 hover:text-white active:scale-95 transition-all backdrop-blur-xs cursor-pointer"
              aria-label="이전 사진"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next button */}
            <button
              id="btn-lightbox-next"
              onClick={(e) => {
                e.stopPropagation();
                showNext();
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full bg-black/45 text-white/90 hover:bg-black/75 hover:text-white active:scale-95 transition-all backdrop-blur-xs cursor-pointer"
              aria-label="다음 사진"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Caption & Thumbnail Indicator Footer */}
          <div className="text-center pb-2 space-y-3" onClick={(e) => e.stopPropagation()}>
            <p className="font-serif-kr text-xs sm:text-sm text-white/90">
              {photos[activePhotoIndex].caption}
            </p>
            <div className="flex items-center justify-center gap-1.5">
              {photos.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => setActivePhotoIndex(idx)}
                  aria-label={`${idx + 1}번 사진 보기`}
                  className={`h-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                    idx === activePhotoIndex ? 'w-5 bg-white' : 'w-1.5 bg-white/35 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
