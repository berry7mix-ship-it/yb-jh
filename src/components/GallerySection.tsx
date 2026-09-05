import React, { useState, useEffect, useCallback } from 'react';
import { WEDDING_DATA } from '../data/weddingData';
import { X, ChevronLeft, ChevronRight, LayoutGrid, SlidersHorizontal, ZoomIn } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const photos = WEDDING_DATA.photos;
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'slide'>('grid');
  const [slideCurrent, setSlideCurrent] = useState(0);

  const openLightbox = (index: number) => {
    setActivePhotoIndex(index);
  };

  const closeLightbox = () => {
    setActivePhotoIndex(null);
  };

  const showNext = useCallback(() => {
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((activePhotoIndex + 1) % photos.length);
    }
  }, [activePhotoIndex, photos.length]);

  const showPrev = useCallback(() => {
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((activePhotoIndex - 1 + photos.length) % photos.length);
    }
  }, [activePhotoIndex, photos.length]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activePhotoIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhotoIndex, showNext, showPrev]);

  // Split photos into two alternating columns for natural-aspect masonry layout
  const col1Photos = photos.filter((_, idx) => idx % 2 === 0);
  const col2Photos = photos.filter((_, idx) => idx % 2 === 1);

  return (
    <section id="section-gallery" className="w-full bg-[#FAF8F5] py-16 px-5 text-center border-b border-[#EFEBE4]">
      <div className="max-w-md mx-auto">
        <span className="font-montserrat tracking-[0.25em] text-[11px] text-[#A6998A] uppercase font-medium">
          Gallery
        </span>
        <h2 className="font-serif-kr text-xl text-[#3A332C] mt-2 mb-2 font-normal tracking-wide">
          웨딩 갤러리
        </h2>
        <p className="font-serif-kr text-xs text-[#8C7F72] mb-6">
          사진을 누르시면 크게 보실 수 있습니다
        </p>

        {/* View Mode Switcher (Grid vs Slider) */}
        <div className="flex items-center justify-center gap-1.5 mb-6">
          <button
            id="btn-gallery-grid-mode"
            onClick={() => setViewMode('grid')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-serif-kr transition-colors ${
              viewMode === 'grid'
                ? 'bg-[#8A7B70] text-white shadow-xs'
                : 'bg-white text-[#8A7B70] border border-[#E5DFD5]'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>바둑판형</span>
          </button>
          <button
            id="btn-gallery-slide-mode"
            onClick={() => setViewMode('slide')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-serif-kr transition-colors ${
              viewMode === 'slide'
                ? 'bg-[#8A7B70] text-white shadow-xs'
                : 'bg-white text-[#8A7B70] border border-[#E5DFD5]'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>슬라이드형</span>
          </button>
        </div>

        {/* 1. Natural Proportions Masonry Grid View (No Cropping) */}
        {viewMode === 'grid' && (
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
                    className="relative group overflow-hidden rounded-xl bg-white shadow-xs cursor-pointer border border-[#ECE6DD] transition-shadow hover:shadow-md"
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
                      className="w-full h-auto block object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors flex items-center justify-center pointer-events-none">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity w-8 h-8 rounded-full bg-black/40 backdrop-blur-xs flex items-center justify-center text-white">
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
                    className="relative group overflow-hidden rounded-xl bg-white shadow-xs cursor-pointer border border-[#ECE6DD] transition-shadow hover:shadow-md"
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
                      className="w-full h-auto block object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors flex items-center justify-center pointer-events-none">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity w-8 h-8 rounded-full bg-black/40 backdrop-blur-xs flex items-center justify-center text-white">
                        <ZoomIn className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 2. Slide View (Full Aspect Display, No Cropping) */}
        {viewMode === 'slide' && (
          <div className="relative mx-auto max-w-[360px]">
            <div
              id="gallery-slide-card"
              className="relative min-h-[380px] sm:min-h-[440px] max-h-[520px] flex items-center justify-center rounded-2xl overflow-hidden shadow-xs bg-[#F5F0E8] border border-[#E8E2D8] p-3 cursor-pointer"
              onClick={() => openLightbox(slideCurrent)}
            >
              <img
                src={photos[slideCurrent].src}
                alt={photos[slideCurrent].alt}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  if (photos[slideCurrent].fallback && e.currentTarget.src !== photos[slideCurrent].fallback) {
                    e.currentTarget.src = photos[slideCurrent].fallback;
                  }
                }}
                className="max-h-[460px] w-auto max-w-full object-contain rounded-xl shadow-xs transition-transform duration-300"
              />
              <div className="absolute bottom-3 left-0 right-0 text-center pointer-events-none">
                <span className="inline-block px-3 py-1 rounded-full bg-black/45 backdrop-blur-xs text-white text-[11px] font-montserrat tracking-wider">
                  {slideCurrent + 1} / {photos.length}
                </span>
              </div>
            </div>

            {/* Slide Navigation Buttons */}
            <div className="flex items-center justify-between mt-3 px-2">
              <button
                id="btn-slide-prev"
                onClick={() => setSlideCurrent((prev) => (prev - 1 + photos.length) % photos.length)}
                className="p-2 rounded-full bg-white border border-[#E5DFD5] text-[#554B43] hover:bg-[#F2ECE3] transition-colors"
                aria-label="이전 사진"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <span className="font-serif-kr text-xs text-[#7A6E63] truncate max-w-[200px]">
                {photos[slideCurrent].caption}
              </span>

              <button
                id="btn-slide-next"
                onClick={() => setSlideCurrent((prev) => (prev + 1) % photos.length)}
                className="p-2 rounded-full bg-white border border-[#E5DFD5] text-[#554B43] hover:bg-[#F2ECE3] transition-colors"
                aria-label="다음 사진"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {activePhotoIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 backdrop-blur-sm animate-in fade-in duration-200">
          {/* Header */}
          <div className="flex items-center justify-between text-white/80 px-2 pt-2">
            <span className="font-montserrat text-xs tracking-wider">
              {activePhotoIndex + 1} / {photos.length}
            </span>
            <button
              id="btn-close-lightbox"
              onClick={closeLightbox}
              className="p-2 rounded-full hover:bg-white/10 text-white transition-colors"
              aria-label="갤러리 닫기"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Main Image in Lightbox */}
          <div className="relative flex-1 flex items-center justify-center my-auto overflow-hidden p-2">
            <img
              src={photos[activePhotoIndex].src}
              alt={photos[activePhotoIndex].alt}
              referrerPolicy="no-referrer"
              onError={(e) => {
                if (photos[activePhotoIndex].fallback && e.currentTarget.src !== photos[activePhotoIndex].fallback) {
                  e.currentTarget.src = photos[activePhotoIndex].fallback;
                }
              }}
              className="max-h-[80vh] max-w-[95vw] object-contain select-none rounded-lg shadow-2xl"
            />

            {/* Prev button */}
            <button
              id="btn-lightbox-prev"
              onClick={(e) => {
                e.stopPropagation();
                showPrev();
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 text-white/90 hover:bg-black/70 hover:text-white transition-all backdrop-blur-xs"
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
              className="absolute right-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 text-white/90 hover:bg-black/70 hover:text-white transition-all backdrop-blur-xs"
              aria-label="다음 사진"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Caption footer */}
          <div className="text-center pb-3">
            <p className="font-serif-kr text-xs sm:text-sm text-white/90">
              {photos[activePhotoIndex].caption}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
