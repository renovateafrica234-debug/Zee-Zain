import React, { useState } from 'react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  fallbackLabel?: string;
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  className = 'w-full h-full object-cover',
  style,
  fallbackLabel,
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className="w-full h-full flex flex-col items-center justify-center gap-1.5 bg-gradient-to-br from-pastel-mint via-pastel-blush to-pastel-oat p-3 text-center"
      >
        <span className="material-symbols-outlined text-[28px] text-light-primary" aria-hidden="true">
          spa
        </span>
        {fallbackLabel && (
          <span className="font-label text-[12px] font-bold text-light-on-surface-variant line-clamp-2">
            {fallbackLabel}
          </span>
        )}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      className={className}
      style={style}
      onError={() => setHasError(true)}
    />
  );
};
