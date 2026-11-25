import React, { useEffect, useState } from 'react';
import {
  GOAL_OPTIONS,
  Product,
  SKIN_TEXTURE_OPTIONS,
  TARGETED_CONCERN_OPTIONS,
  TONE_SWATCHES,
  TRYON_DEFAULT_FACE,
  TRYON_PRODUCTS,
  computeScanMetrics,
  recommendRoutine,
} from '../data/skincareData';
import { ResilientImage } from './ResilientImage';

interface SkinAssessmentViewProps {
  onBackToHome: () => void;
  onAddRoutineToCartAndCheckout: (products: Product[]) => void;
}

type AssessmentMode = 'scan' | 'questionnaire' | 'tryon' | 'recommendation';

export const SkinAssessmentView: React.FC<SkinAssessmentViewProps> = ({
  onBackToHome,
  onAddRoutineToCartAndCheckout,
}) => {
  const [mode, setMode] = useState<AssessmentMode>('scan');
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [hasCustomizedAssessment, setHasCustomizedAssessment] = useState(false);

  // Step 1-4 Assessment state
  const [selectedTextureId, setSelectedTextureId] = useState<string>('dry-flaky');
  const [selectedConcerns, setSelectedConcerns] = useState<string[]>([
    'dark-knuckles',
    'stretch-marks',
  ]);
  const [currentToneName, setCurrentToneName] = useState<string>('Caramel');
  const [goalToneName, setGoalToneName] = useState<string>('Golden Tan');
  const [toneSliderPct, setToneSliderPct] = useState<number>(50);
  const [selectedGoalId, setSelectedGoalId] = useState<string>('brightening');

  // Photo & Try-On state
  const [facePreviewUrl, setFacePreviewUrl] = useState<string>(TRYON_DEFAULT_FACE);
  const [uploadedObjectUrl, setUploadedObjectUrl] = useState<string | null>(null);
  const [tryOnSliderPct, setTryOnSliderPct] = useState<number>(50);
  const [selectedTryOnId, setSelectedTryOnId] = useState<string>('tryon-mucin');

  useEffect(() => {
    return () => {
      if (uploadedObjectUrl) {
        URL.revokeObjectURL(uploadedObjectUrl);
      }
    };
  }, [uploadedObjectUrl]);

  const computedMetrics = hasCustomizedAssessment
    ? computeScanMetrics(selectedTextureId, selectedConcerns, selectedGoalId)
    : { skinAge: 24, acne: 36, dryness: 72, moisture: 21 };

  const currentToneHex =
    TONE_SWATCHES.find((t) => t.name === currentToneName)?.hex || '#A6724D';
  const goalToneHex =
    TONE_SWATCHES.find((t) => t.name === goalToneName)?.hex || '#C99872';
  const activeTryOn =
    TRYON_PRODUCTS.find((p) => p.id === selectedTryOnId) || TRYON_PRODUCTS[0];

  const toggleConcern = (id: string) => {
    setHasCustomizedAssessment(true);
    setSelectedConcerns((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (uploadedObjectUrl) {
      URL.revokeObjectURL(uploadedObjectUrl);
    }
    const nextUrl = URL.createObjectURL(file);
    setUploadedObjectUrl(nextUrl);
    setFacePreviewUrl(nextUrl);
  };

  const recommendedProducts = recommendRoutine({
    textureId: selectedTextureId,
    concernIds: selectedConcerns,
    goalId: selectedGoalId,
    tryOnId: selectedTryOnId,
  });

  const routineTotal = recommendedProducts.reduce((sum, p) => sum + p.price, 0);
  const selectedTextureTitle =
    SKIN_TEXTURE_OPTIONS.find((t) => t.id === selectedTextureId)?.title || '';
  const selectedGoalTitle =
    GOAL_OPTIONS.find((g) => g.id === selectedGoalId)?.title || '';

  const metricRows = [
    { label: 'Acne', value: computedMetrics.acne },
    { label: 'Dryness', value: computedMetrics.dryness },
    { label: 'Moisture', value: computedMetrics.moisture },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#E8DCD0] text-[#1F1B18]">
      {/* Top Bar matching Right Screen in UI */}
      <header className="sticky top-0 z-20 bg-[#E8DCD0]/95 backdrop-blur-md">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4 px-5 py-4">
          <button
            type="button"
            onClick={onBackToHome}
            aria-label="Back to Home"
            className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-white/80 text-[#1F1B18] border border-white hover:bg-white transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
              chevron_left
            </span>
          </button>

          <div className="px-5 py-2 rounded-full bg-white border border-white/80 shadow-2xs">
            <span className="font-title text-[14px] font-bold text-[#1F1B18] tabular-nums whitespace-nowrap">
              Skin Age: {computedMetrics.skinAge}
            </span>
          </div>

          <label
            title="Upload or capture your face photo"
            className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-[#EFE5D8] text-[#1F1B18] border border-white hover:bg-white transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
              photo_camera
            </span>
            <input
              type="file"
              accept="image/*"
              capture="user"
              onChange={handlePhotoSelect}
              className="sr-only"
              aria-label="Capture or upload face photo for AI scan"
            />
          </label>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-5xl mx-auto flex flex-col lg:grid lg:grid-cols-12 lg:gap-8 lg:px-6 lg:py-4 lg:items-start">
        {/* Left / Top Face Scan Visual */}
        <section
          aria-label="Facial skin scan preview"
          className="lg:col-span-5 flex flex-col items-center justify-center px-6 pt-2 pb-6 lg:p-6 lg:rounded-[28px] lg:bg-[#EFE5D8]/80 lg:border lg:border-white/70"
        >
          {mode === 'tryon' ? (
            <div className="w-full flex flex-col gap-3">
              <div className="relative w-full max-w-sm mx-auto aspect-square rounded-[24px] overflow-hidden border-[3px] border-white shadow-lg bg-[#D9C7B4]">
                <ResilientImage
                  src={facePreviewUrl}
                  alt="Simulated after Korean skincare routine"
                  className="w-full h-full object-cover"
                  style={{ filter: activeTryOn.cssFilter }}
                  fallbackLabel="After Routine Preview"
                />
                <div
                  className="absolute inset-0 overflow-hidden pointer-events-none"
                  style={{ clipPath: `inset(0 ${100 - tryOnSliderPct}% 0 0)` }}
                >
                  <ResilientImage
                    src={facePreviewUrl}
                    alt="Original face photo before routine"
                    className="w-full h-full object-cover"
                    fallbackLabel="Before Routine"
                  />
                </div>
                <div
                  className="absolute inset-y-0 w-0.5 bg-[#E59A3C] pointer-events-none"
                  style={{ left: `${tryOnSliderPct}%` }}
                />
                <span className="absolute bottom-3 left-3 font-label text-[11px] font-bold px-2.5 py-1 rounded-full bg-white/90 text-[#1F1B18]">
                  Before
                </span>
                <span className="absolute bottom-3 right-3 font-label text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#E59A3C] text-[#1F1B18]">
                  After 4 Wks
                </span>
              </div>

              <div className="w-full max-w-sm mx-auto flex flex-col gap-1">
                <div className="flex items-center justify-between text-[12px] font-label font-bold text-[#6B6056]">
                  <span>Compare Before &amp; After</span>
                  <span className="font-mono tabular-nums">{tryOnSliderPct}%</span>
                </div>
                <input
                  type="range"
                  min={15}
                  max={85}
                  value={tryOnSliderPct}
                  onChange={(e) => setTryOnSliderPct(Number(e.target.value))}
                  aria-label="Compare before and after skincare try-on"
                  className="w-full accent-[#C27419] cursor-pointer"
                />
              </div>
            </div>
          ) : (
            <div className="relative flex flex-col items-center gap-3">
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-full overflow-hidden border-[3px] border-white shadow-xl bg-[#D9C7B4]">
                <ResilientImage
                  src={facePreviewUrl}
                  alt="AI facial scan portrait"
                  className="w-full h-full object-cover object-center"
                  fallbackLabel="Face Scan"
                />
                {/* Inner Crisp White Facial Scan Ring */}
                <div
                  className="absolute inset-4 rounded-full border-2 border-white/90 pointer-events-none"
                  aria-hidden="true"
                />
              </div>
              <label className="inline-flex items-center gap-1.5 min-h-[38px] px-4 rounded-full bg-white/85 text-[#1F1B18] border border-white font-label text-[12px] font-bold hover:bg-white transition-colors cursor-pointer shadow-2xs">
                <span className="material-symbols-outlined text-[16px] text-[#C27419]" aria-hidden="true">
                  upload
                </span>
                <span>Upload Your Photo</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoSelect}
                  className="sr-only"
                />
              </label>
            </div>
          )}
        </section>

        {/* Right / Bottom Sheet Panel */}
        <section className="flex-1 w-full lg:col-span-7 rounded-t-[32px] lg:rounded-[32px] bg-[#EFE5D8] border-t lg:border border-white/70 p-6 flex flex-col gap-5 shadow-lg">
          {/* Drag Handle on Mobile */}
          <div className="lg:hidden w-12 h-1 rounded-full bg-[#C9B9A7] mx-auto -mt-2" aria-hidden="true" />

          {/* Mode Tabs */}
          <div
            className="grid grid-cols-3 gap-1.5 p-1 rounded-full bg-[#E2D5C7]"
            role="tablist"
            aria-label="Analysis modes"
          >
            {(
              [
                { id: 'scan', label: 'Section Details' },
                { id: 'questionnaire', label: 'Assessment' },
                { id: 'tryon', label: 'Virtual Try-On' },
              ] as const
            ).map((tab) => {
              const isActive =
                mode === tab.id || (mode === 'recommendation' && tab.id === 'scan');
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setMode(tab.id)}
                  className={`min-h-[40px] px-3 rounded-full font-label text-[12px] sm:text-[13px] font-bold transition-colors whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-white text-[#1F1B18] shadow-xs'
                      : 'text-[#6B6056] hover:text-[#1F1B18]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* VIEW 1: Section Details (Matches Right Screen in Uploaded UI) */}
          {mode === 'scan' && (
            <div className="flex flex-col gap-4">
              <div className="flex items-baseline justify-between gap-2">
                <h2 className="font-headline text-[20px] font-bold text-[#1F1B18]">
                  Section details
                </h2>
                <button
                  type="button"
                  onClick={() => setMode('questionnaire')}
                  className="font-label text-[12px] font-bold text-[#C27419] hover:underline cursor-pointer"
                >
                  Refine Profile →
                </button>
              </div>

              <div className="flex flex-col gap-3">
                {metricRows.map((metric) => (
                  <div
                    key={metric.label}
                    className="relative overflow-hidden rounded-full bg-white p-2 pl-5 flex items-center justify-between gap-3 border border-[#E2D7CB]/60"
                  >
                    {/* Subtle warm progress bar fill */}
                    <div
                      className="absolute inset-y-0 left-0 bg-[#F7EFE6] transition-all duration-300 pointer-events-none"
                      style={{ width: `${metric.value}%` }}
                      aria-hidden="true"
                    />
                    <span className="relative z-10 font-title text-[15px] font-bold text-[#1F1B18]">
                      {metric.label}
                    </span>
                    <div className="relative z-10 w-10 h-10 rounded-full border-2 border-[#E59A3C] bg-white flex items-center justify-center shrink-0">
                      <span className="font-mono text-[12px] font-medium text-[#1F1B18] tabular-nums">
                        {metric.value}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* AI Recommendation Action Bar */}
              <button
                type="button"
                onClick={() => setMode('recommendation')}
                className="mt-2 w-full rounded-full bg-white p-2 pr-5 flex items-center justify-between gap-3 border border-[#E2D7CB] shadow-xs hover:border-[#E59A3C] transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-[#E59A3C] text-[#1F1B18] inline-flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                      smart_toy
                    </span>
                  </span>
                  <span className="font-title text-[15px] font-bold text-[#1F1B18]">
                    AI Recommendation
                  </span>
                </div>
                <span className="material-symbols-outlined text-[20px] text-[#1F1B18]" aria-hidden="true">
                  play_arrow
                </span>
              </button>
            </div>
          )}

          {/* VIEW 2: 4-Step Skin Assessment Questionnaire */}
          {mode === 'questionnaire' && (
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between gap-2">
                <h2 className="font-headline text-[18px] font-bold text-[#1F1B18]">
                  {currentStep === 1 && '1. Skin Type & Texture'}
                  {currentStep === 2 && '2. Targeted Concerns'}
                  {currentStep === 3 && '3. Tone & Routine Goals'}
                </h2>
                <span className="font-mono text-[13px] font-medium text-[#6B6056] tabular-nums">
                  Step {currentStep} of 3
                </span>
              </div>

              {currentStep === 1 && (
                <div className="flex flex-col gap-2.5" role="radiogroup" aria-label="Skin texture options">
                  {SKIN_TEXTURE_OPTIONS.map((opt) => {
                    const isSelected = selectedTextureId === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => {
                          setHasCustomizedAssessment(true);
                          setSelectedTextureId(opt.id);
                        }}
                        aria-pressed={isSelected}
                        className={`w-full text-left flex items-center justify-between gap-3 p-4 rounded-[18px] border transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-white border-[#E59A3C] shadow-xs'
                            : 'bg-[#FAF6F1] border-[#E2D7CB] hover:bg-white'
                        }`}
                      >
                        <div className="flex flex-col gap-0.5">
                          <span className="font-title text-[15px] font-bold text-[#1F1B18]">
                            {opt.title}
                          </span>
                          <span className="font-body text-[13px] text-[#6B6056]">
                            {opt.description}
                          </span>
                        </div>
                        <span
                          className={`material-symbols-outlined text-[22px] shrink-0 ${
                            isSelected ? 'text-[#E59A3C] material-symbols-filled' : 'text-[#9A8D80]'
                          }`}
                          aria-hidden="true"
                        >
                          {isSelected ? 'check_circle' : 'radio_button_unchecked'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              {currentStep === 2 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5" role="group" aria-label="Targeted concerns">
                  {TARGETED_CONCERN_OPTIONS.map((opt) => {
                    const isSelected = selectedConcerns.includes(opt.id);
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => toggleConcern(opt.id)}
                        aria-pressed={isSelected}
                        className={`w-full text-left flex items-center justify-between gap-3 p-3.5 rounded-[18px] border transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-white border-[#E59A3C] shadow-xs'
                            : 'bg-[#FAF6F1] border-[#E2D7CB] hover:bg-white'
                        }`}
                      >
                        <div className="flex flex-col gap-0.5">
                          <span className="font-title text-[14px] font-bold text-[#1F1B18]">
                            {opt.title}
                          </span>
                          <span className="font-body text-[12px] text-[#6B6056]">
                            {opt.description}
                          </span>
                        </div>
                        <span
                          className={`material-symbols-outlined text-[20px] shrink-0 ${
                            isSelected ? 'text-[#E59A3C] material-symbols-filled' : 'text-[#9A8D80]'
                          }`}
                          aria-hidden="true"
                        >
                          {isSelected ? 'check_circle' : 'radio_button_unchecked'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              {currentStep === 3 && (
                <div className="flex flex-col gap-4">
                  {/* Tone Visualizer */}
                  <div className="flex flex-col gap-3 p-4 rounded-[20px] bg-white border border-[#E2D7CB]">
                    <div className="flex items-center justify-between">
                      <span className="font-title text-[14px] font-bold text-[#1F1B18]">
                        Tone Preview
                      </span>
                      <span className="font-label text-[12px] font-bold text-[#C27419]">
                        {currentToneName} → {goalToneName}
                      </span>
                    </div>
                    <div className="relative w-full h-20 rounded-[14px] overflow-hidden border border-[#E2D7CB]">
                      <div
                        className="absolute inset-0 flex items-end justify-end p-2"
                        style={{ backgroundColor: goalToneHex }}
                      >
                        <span className="font-label text-[11px] font-bold px-2 py-0.5 rounded-full bg-white text-[#1F1B18]">
                          Goal
                        </span>
                      </div>
                      <div
                        className="absolute inset-y-0 left-0 overflow-hidden flex items-end justify-start p-2 border-r-2 border-white"
                        style={{ width: `${toneSliderPct}%`, backgroundColor: currentToneHex }}
                      >
                        <span className="font-label text-[11px] font-bold px-2 py-0.5 rounded-full bg-white text-[#1F1B18]">
                          Current
                        </span>
                      </div>
                    </div>
                    <input
                      type="range"
                      min={15}
                      max={85}
                      value={toneSliderPct}
                      onChange={(e) => setToneSliderPct(Number(e.target.value))}
                      aria-label="Compare current tone and desired goal tone"
                      className="w-full accent-[#C27419] cursor-pointer"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1">
                        <span className="font-label text-[11px] font-bold text-[#6B6056]">
                          Current Tone
                        </span>
                        <div className="grid grid-cols-6 gap-1">
                          {TONE_SWATCHES.map((swatch) => (
                            <button
                              key={`c-${swatch.name}`}
                              type="button"
                              aria-label={`Current ${swatch.name}`}
                              onClick={() => setCurrentToneName(swatch.name)}
                              className={`h-8 rounded-[6px] cursor-pointer ${
                                currentToneName === swatch.name
                                  ? 'ring-2 ring-[#C27419] ring-offset-1'
                                  : 'border border-[#E2D7CB]'
                              }`}
                              style={{ backgroundColor: swatch.hex }}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="font-label text-[11px] font-bold text-[#6B6056]">
                          Goal Tone
                        </span>
                        <div className="grid grid-cols-6 gap-1">
                          {TONE_SWATCHES.map((swatch) => (
                            <button
                              key={`g-${swatch.name}`}
                              type="button"
                              aria-label={`Goal ${swatch.name}`}
                              onClick={() => setGoalToneName(swatch.name)}
                              className={`h-8 rounded-[6px] cursor-pointer ${
                                goalToneName === swatch.name
                                  ? 'ring-2 ring-[#C27419] ring-offset-1'
                                  : 'border border-[#E2D7CB]'
                              }`}
                              style={{ backgroundColor: swatch.hex }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Goal Options */}
                  <div className="flex flex-col gap-2" role="radiogroup" aria-label="Skin goals">
                    {GOAL_OPTIONS.map((opt) => {
                      const isSelected = selectedGoalId === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => {
                            setHasCustomizedAssessment(true);
                            setSelectedGoalId(opt.id);
                          }}
                          aria-pressed={isSelected}
                          className={`w-full text-left flex items-center justify-between gap-3 p-3.5 rounded-[16px] border transition-colors cursor-pointer ${
                            isSelected
                              ? 'bg-white border-[#E59A3C] shadow-xs'
                              : 'bg-[#FAF6F1] border-[#E2D7CB] hover:bg-white'
                          }`}
                        >
                          <div className="flex flex-col gap-0.5">
                            <span className="font-title text-[14px] font-bold text-[#1F1B18]">
                              {opt.title}
                            </span>
                            <span className="font-body text-[12px] text-[#6B6056]">
                              {opt.description}
                            </span>
                          </div>
                          <span
                            className={`material-symbols-outlined text-[20px] shrink-0 ${
                              isSelected ? 'text-[#E59A3C] material-symbols-filled' : 'text-[#9A8D80]'
                            }`}
                            aria-hidden="true"
                          >
                            {isSelected ? 'check_circle' : 'radio_button_unchecked'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3 pt-2">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={() => setCurrentStep((s) => s - 1)}
                    className="flex-1 min-h-[48px] px-5 rounded-full bg-white text-[#1F1B18] border border-[#E2D7CB] font-label text-[14px] font-bold hover:bg-[#FAF6F1] transition-colors cursor-pointer"
                  >
                    Back
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    if (currentStep < 3) {
                      setCurrentStep((s) => s + 1);
                    } else {
                      setMode('scan');
                    }
                  }}
                  className="flex-1 min-h-[48px] px-5 rounded-full bg-[#C27419] text-white font-label text-[14px] font-bold hover:bg-[#A66010] transition-colors cursor-pointer"
                >
                  {currentStep < 3 ? 'Continue' : 'Update Skin Scan'}
                </button>
              </div>
            </div>
          )}

          {/* VIEW 3: Virtual Skin Try-On Controls */}
          {mode === 'tryon' && (
            <div className="flex flex-col gap-4">
              <div className="flex items-baseline justify-between">
                <h2 className="font-headline text-[18px] font-bold text-[#1F1B18]">
                  Virtual Skin Try-On
                </h2>
                <span className="font-label text-[12px] font-bold text-[#C27419]">
                  {activeTryOn.effectLabel}
                </span>
              </div>
              <p className="font-body text-[14px] text-[#6B6056]">
                Toggle Korean skincare formulas below to preview 4-week radiance and barrier balance on the portrait.
              </p>

              <div className="flex flex-col gap-2.5">
                {TRYON_PRODUCTS.map((item) => {
                  const isSelected = selectedTryOnId === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedTryOnId(item.id)}
                      aria-pressed={isSelected}
                      className={`w-full text-left flex items-center justify-between gap-3 p-4 rounded-[18px] border transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-white border-[#E59A3C] shadow-xs'
                          : 'bg-[#FAF6F1] border-[#E2D7CB] hover:bg-white'
                      }`}
                    >
                      <div className="flex flex-col gap-0.5">
                        <span className="font-title text-[15px] font-bold text-[#1F1B18]">
                          {item.name}
                        </span>
                        <span className="font-body text-[13px] text-[#6B6056]">
                          {item.effectLabel}
                        </span>
                      </div>
                      <span
                        className={`material-symbols-outlined text-[22px] shrink-0 ${
                          isSelected ? 'text-[#E59A3C] material-symbols-filled' : 'text-[#9A8D80]'
                        }`}
                        aria-hidden="true"
                      >
                        {isSelected ? 'check_circle' : 'radio_button_unchecked'}
                      </span>
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => setMode('recommendation')}
                className="w-full min-h-[48px] px-5 rounded-full bg-[#C27419] text-white font-label text-[14px] font-bold hover:bg-[#A66010] transition-colors cursor-pointer"
              >
                View AI Recommendation
              </button>
            </div>
          )}

          {/* VIEW 4: AI Recommendation Output */}
          {mode === 'recommendation' && (
            <div className="flex flex-col gap-4">
              <div className="flex items-baseline justify-between gap-2">
                <div>
                  <span className="font-label text-[12px] font-bold text-[#C27419]">
                    {selectedTextureTitle} · {selectedGoalTitle}
                  </span>
                  <h2 className="font-headline text-[20px] font-bold text-[#1F1B18]">
                    Your AI Recommended Routine
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setMode('scan')}
                  className="font-label text-[12px] font-bold text-[#6B6056] hover:text-[#1F1B18] cursor-pointer"
                >
                  Back to Scan
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {recommendedProducts.map((product) => (
                  <article
                    key={product.id}
                    className="flex items-center gap-3 p-3 rounded-[18px] bg-white border border-[#E2D7CB]"
                  >
                    <div className="w-16 h-16 shrink-0 rounded-[12px] overflow-hidden bg-[#F7F2EC]">
                      <ResilientImage
                        src={product.image}
                        alt={product.imageAlt}
                        fallbackLabel={product.name}
                      />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                      <div className="flex items-baseline justify-between gap-2">
                        <h3 className="font-title text-[14px] font-bold text-[#1F1B18] truncate">
                          {product.name}
                        </h3>
                        <span className="font-mono text-[13px] font-medium text-[#1F1B18] tabular-nums">
                          ${product.price}
                        </span>
                      </div>
                      <p className="font-body text-[12px] text-[#6B6056] line-clamp-2">
                        {product.description}
                      </p>
                    </div>
                  </article>
                ))}
              </div>

              <button
                type="button"
                onClick={() => onAddRoutineToCartAndCheckout(recommendedProducts)}
                className="w-full inline-flex items-center justify-center gap-2 min-h-[52px] px-6 rounded-full bg-[#C27419] text-white font-label text-[15px] font-bold hover:bg-[#A66010] transition-colors cursor-pointer"
              >
                <span className="tabular-nums">
                  Add Routine to Bag &amp; Checkout (${routineTotal.toFixed(2)})
                </span>
                <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                  arrow_forward
                </span>
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};
