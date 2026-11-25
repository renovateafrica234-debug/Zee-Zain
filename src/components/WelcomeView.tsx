import React, { useState } from 'react';
import { TRYON_DEFAULT_FACE } from '../data/skincareData';
import { ResilientImage } from './ResilientImage';

interface WelcomeViewProps {
  onStartJourney: () => void;
  onStartSkinScan: () => void;
}

const ONBOARDING_SLIDES = [
  {
    kickerTop: 'Know Your Skin',
    kickerBottom: 'Own Your Glow',
    headline: 'Your Personal Skincare Companion',
    subcopy: 'Gentle Korean barrier formulas matched to your daily texture, tone goals, and budget.',
  },
  {
    kickerTop: 'AI Skin Scan',
    kickerBottom: 'Real-Time Clarity',
    headline: 'Understand What Your Skin Needs Today',
    subcopy: 'Measure hydration, dryness, and sensitivity in seconds before choosing a routine.',
  },
  {
    kickerTop: 'Direct From Seoul',
    kickerBottom: 'Batch Verified',
    headline: 'Calm Care With Zero Guesswork',
    subcopy: 'Freshness-dated essences, mineral-soft sunscreens, and soothing ceramide creams.',
  },
];

export const WelcomeView: React.FC<WelcomeViewProps> = ({
  onStartJourney,
  onStartSkinScan,
}) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const slide = ONBOARDING_SLIDES[activeSlide];

  return (
    <div className="min-h-screen bg-[#E8DCD0] flex items-center justify-center md:p-8">
      <div className="relative w-full md:max-w-5xl min-h-screen md:min-h-[680px] md:rounded-[32px] overflow-hidden bg-[#D9C7B4] md:border md:border-white/50 md:shadow-2xl grid grid-cols-1 md:grid-cols-12">
        {/* Portrait Backdrop (Full-bleed on mobile, left editorial panel on desktop) */}
        <div className="relative col-span-1 md:col-span-7 min-h-screen md:min-h-[680px]">
          <ResilientImage
            src={TRYON_DEFAULT_FACE}
            alt="Serene woman with glowing hydrated skin"
            className="absolute inset-0 w-full h-full object-cover object-center"
            fallbackLabel="Zee Zain Skincare"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/45 md:bg-gradient-to-t md:from-black/30 md:via-transparent md:to-black/15" />

          {/* Top Bar inside Portrait */}
          <div className="relative z-10 flex items-start justify-between p-6">
            <div className="px-4 py-2 rounded-[16px] bg-[#E8DCD0]/80 backdrop-blur-md border border-white/40 text-[#1F1B18]">
              <p className="font-label text-[11px] leading-[15px] font-bold">
                {slide.kickerTop}
              </p>
              <p className="font-label text-[11px] leading-[15px] font-bold text-[#6B6056]">
                {slide.kickerBottom}
              </p>
            </div>

            {/* Carousel Dashes */}
            <div className="flex items-center gap-1.5 pt-2" role="tablist" aria-label="Onboarding highlights">
              {ONBOARDING_SLIDES.map((item, idx) => {
                const isActive = idx === activeSlide;
                return (
                  <button
                    key={item.kickerTop}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`Highlight ${idx + 1}: ${item.kickerTop}`}
                    onClick={() => setActiveSlide(idx)}
                    className={`h-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                      isActive ? 'w-6 bg-[#E59A3C]' : 'w-2.5 bg-white/75 hover:bg-white'
                    }`}
                  />
                );
              })}
            </div>
          </div>

          {/* Mobile Bottom Frosted Glass Card */}
          <div className="md:hidden absolute inset-x-4 bottom-6 z-10 flex flex-col items-center gap-4 p-6 rounded-[28px] bg-[#5E493A]/45 backdrop-blur-md border border-white/25 text-center">
            <h1 className="font-display text-[26px] leading-[32px] font-bold text-white text-balance">
              {slide.headline}
            </h1>
            <button
              type="button"
              onClick={onStartJourney}
              className="w-full flex items-center justify-between gap-3 p-1.5 pl-6 rounded-full bg-white text-[#1F1B18] shadow-md hover:bg-[#FAF6F1] transition-colors cursor-pointer"
            >
              <span className="font-label text-[15px] font-bold">Start My Journey</span>
              <span className="w-11 h-11 rounded-full bg-[#E59A3C] text-[#1F1B18] inline-flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[22px]" aria-hidden="true">
                  arrow_forward
                </span>
              </span>
            </button>
            <button
              type="button"
              onClick={onStartSkinScan}
              className="font-label text-[13px] font-bold text-white/90 hover:text-white underline underline-offset-4"
            >
              Try AI Skin Scan First
            </button>
          </div>
        </div>

        {/* Desktop Right Editorial Companion Panel */}
        <div className="hidden md:flex md:col-span-5 flex-col justify-between p-10 bg-[#F7F2EC]">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-2 font-title text-[18px] font-bold text-[#1F1B18]">
              <span className="material-symbols-outlined text-[22px] text-[#E59A3C]" aria-hidden="true">
                spa
              </span>
              <span>Zee Zain</span>
            </span>
            <span className="font-mono text-[12px] text-[#6B6056] tabular-nums">
              0{activeSlide + 1} / 03
            </span>
          </div>

          <div className="flex flex-col gap-5">
            <span className="font-label text-[13px] font-bold text-[#E59A3C]">
              {slide.kickerTop} · {slide.kickerBottom}
            </span>
            <h1 className="font-display text-[36px] leading-[42px] font-bold text-[#1F1B18] text-balance">
              {slide.headline}
            </h1>
            <p className="font-body text-[16px] leading-[25px] text-[#6B6056]">
              {slide.subcopy}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={onStartJourney}
              className="w-full flex items-center justify-between gap-3 p-1.5 pl-6 rounded-full bg-white border border-[#E2D7CB] text-[#1F1B18] shadow-sm hover:border-[#E59A3C] transition-colors cursor-pointer"
            >
              <span className="font-label text-[15px] font-bold">Start My Journey</span>
              <span className="w-11 h-11 rounded-full bg-[#E59A3C] text-[#1F1B18] inline-flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[22px]" aria-hidden="true">
                  arrow_forward
                </span>
              </span>
            </button>
            <button
              type="button"
              onClick={onStartSkinScan}
              className="w-full min-h-[48px] px-5 rounded-full bg-[#EFE5D8] text-[#1F1B18] font-label text-[14px] font-bold hover:bg-[#E6D9CA] transition-colors cursor-pointer inline-flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[20px] text-[#E59A3C]" aria-hidden="true">
                center_focus_strong
              </span>
              <span>Open AI Skin Scan</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
