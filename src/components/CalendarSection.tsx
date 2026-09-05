import React, { useState, useEffect } from 'react';
import { Heart, Clock } from 'lucide-react';
import { WEDDING_DATA } from '../data/weddingData';

export const CalendarSection: React.FC = () => {
  const weddingDate = new Date(WEDDING_DATA.ceremony.date);
  
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPassed: false,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const diff = weddingDate.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPassed: true });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds, isPassed: false });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, [weddingDate]);

  // October 2027 calendar days: Oct 1 is Friday (5 empty spots Sun, Mon, Tue, Wed, Thu)
  // Days 1 to 31
  const calendarDays = [
    null, null, null, null, null, 1, 2,
    3, 4, 5, 6, 7, 8, 9,
    10, 11, 12, 13, 14, 15, 16,
    17, 18, 19, 20, 21, 22, 23,
    24, 25, 26, 27, 28, 29, 30,
    31,
  ];

  return (
    <section id="section-calendar" className="w-full bg-white py-16 px-6 text-center border-b border-[#EFEBE4]">
      <div className="max-w-md mx-auto">
        <span className="font-montserrat tracking-[0.25em] text-[11px] text-[#A6998A] uppercase font-medium">
          Wedding Day
        </span>
        <h2 className="font-serif-kr text-xl text-[#3A332C] mt-2 mb-2 font-normal tracking-wide">
          예식 일시
        </h2>
        <p className="font-serif-kr text-sm text-[#7D7267] mb-8">
          {WEDDING_DATA.ceremony.displayDate}
        </p>

        {/* Minimalist Calendar Card */}
        <div className="bg-[#FAF8F5] rounded-2xl p-6 border border-[#ECE6DE] shadow-xs mx-auto max-w-[340px]">
          <div className="flex items-center justify-between border-b border-[#E8E1D7] pb-3 mb-4">
            <span className="font-garamond text-2xl font-medium text-[#3A332C]">2027. 10</span>
            <span className="font-montserrat text-xs tracking-wider text-[#998B7D] uppercase">OCTOBER</span>
          </div>

          {/* Days of week */}
          <div className="grid grid-cols-7 text-center text-xs font-serif-kr mb-2 text-[#8C7E70]">
            <span className="text-[#C45E5E]">일</span>
            <span>월</span>
            <span>화</span>
            <span>수</span>
            <span>목</span>
            <span>금</span>
            <span className="text-[#597B96]">토</span>
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-y-2 text-center text-xs font-montserrat">
            {calendarDays.map((day, idx) => {
              if (day === null) {
                return <div key={`empty-${idx}`} className="h-8" />;
              }
              const isWeddingDay = day === 16;
              const isSunday = idx % 7 === 0;
              const isSaturday = idx % 7 === 6;

              return (
                <div key={`day-${day}`} className="h-8 flex items-center justify-center relative">
                  {isWeddingDay ? (
                    <div className="w-8 h-8 rounded-full bg-[#8A7B70] text-white flex flex-col items-center justify-center font-medium shadow-xs relative">
                      <span className="text-[11px] leading-none">{day}</span>
                      <Heart className="w-2.5 h-2.5 text-[#FAD2E1] fill-[#FAD2E1] -mt-0.5" />
                    </div>
                  ) : (
                    <span
                      className={`text-xs ${
                        isSunday
                          ? 'text-[#C45E5E]'
                          : isSaturday
                          ? 'text-[#597B96]'
                          : 'text-[#4A423B]'
                      }`}
                    >
                      {day}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Countdown Timer */}
        <div className="mt-8 bg-[#FAF8F5] rounded-2xl p-5 border border-[#ECE6DE] max-w-[340px] mx-auto shadow-xs">
          <div className="flex items-center justify-center gap-1.5 text-xs text-[#8A7B70] font-serif-kr mb-3">
            <Clock className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>
              {timeLeft.isPassed
                ? '축복 속에 예식이 진행되었습니다'
                : `${WEDDING_DATA.couple.groom.name} ♥ ${WEDDING_DATA.couple.bride.name}의 예식까지`}
            </span>
          </div>

          {!timeLeft.isPassed && (
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="bg-white rounded-xl py-2 px-1 border border-[#EFEBE4]">
                <div className="font-garamond text-xl sm:text-2xl font-semibold text-[#3A332C]">
                  {timeLeft.days}
                </div>
                <div className="font-montserrat text-[10px] text-[#A6998A] uppercase">Days</div>
              </div>
              <div className="bg-white rounded-xl py-2 px-1 border border-[#EFEBE4]">
                <div className="font-garamond text-xl sm:text-2xl font-semibold text-[#3A332C]">
                  {String(timeLeft.hours).padStart(2, '0')}
                </div>
                <div className="font-montserrat text-[10px] text-[#A6998A] uppercase">Hours</div>
              </div>
              <div className="bg-white rounded-xl py-2 px-1 border border-[#EFEBE4]">
                <div className="font-garamond text-xl sm:text-2xl font-semibold text-[#3A332C]">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </div>
                <div className="font-montserrat text-[10px] text-[#A6998A] uppercase">Mins</div>
              </div>
              <div className="bg-white rounded-xl py-2 px-1 border border-[#EFEBE4]">
                <div className="font-garamond text-xl sm:text-2xl font-semibold text-[#8A7B70]">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </div>
                <div className="font-montserrat text-[10px] text-[#A6998A] uppercase">Secs</div>
              </div>
            </div>
          )}

          <p className="mt-3 text-[12px] font-serif-kr text-[#7D7267]">
            소중한 시간 내어 발걸음 해주시는 모든 분께 감사드립니다.
          </p>
        </div>
      </div>
    </section>
  );
};
