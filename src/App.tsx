import React from 'react';
import { HeroCover } from './components/HeroCover';
import { InvitationMessage } from './components/InvitationMessage';
import { CalendarSection } from './components/CalendarSection';
import { GallerySection } from './components/GallerySection';
import { LocationSection } from './components/LocationSection';
import { AccountSection } from './components/AccountSection';
import { Footer } from './components/Footer';
import { PetalEffect } from './components/PetalEffect';

export default function App() {
  return (
    <div className="min-h-screen bg-[#F0ECE4] text-[#3E3835] flex justify-center selection:bg-[#d8c7b5] selection:text-[#3e3835]">
      {/* Background Petal Effect */}
      <PetalEffect />

      {/* Main Container Wrapper */}
      <div className="w-full flex justify-center items-start lg:py-10 lg:px-6">
        {/* Mobile Wedding Card Viewport */}
        <main className="w-full max-w-[430px] bg-[#FAF8F5] text-[#3E3835] min-h-screen relative overflow-hidden lg:rounded-[36px] lg:border-[8px] lg:border-[#38332F] lg:shadow-[0_25px_70px_rgba(0,0,0,0.18)]">
          {/* Smartphone Speaker notch detail on desktop */}
          <div className="hidden lg:flex justify-center pt-2 pb-1 bg-[#FAF7F2] border-b border-[#EFEBE4]">
            <div className="w-20 h-3 bg-[#E5DFD5] rounded-full flex items-center justify-center">
              <div className="w-10 h-1 bg-[#C9BFB2] rounded-full"></div>
            </div>
          </div>

          {/* 1. Hero Cover */}
          <HeroCover />

          {/* 2. Invitation Message & Family Tree */}
          <InvitationMessage />

          {/* 3. Calendar & Live D-Day */}
          <CalendarSection />

          {/* 4. Wedding Gallery */}
          <GallerySection />

          {/* 5. Location & Maps */}
          <LocationSection />

          {/* 6. Account & Congratulatory Gifts */}
          <AccountSection />

          {/* 7. Footer */}
          <Footer />
        </main>
      </div>
    </div>
  );
}
