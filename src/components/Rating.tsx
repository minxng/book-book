"use client";

import { useRef, useState } from "react";

interface RatingProps {
  value: number;
  onChange?: (value: number) => void;
}

export default function Rating({ value, onChange }: RatingProps) {
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isTouchingRef = useRef(false);

  const calculateValue = (clientX: number) => {
    const container = containerRef.current;
    if (!container) return 0;
    const { left, width } = container.getBoundingClientRect();
    const relativeX = clientX - left;
    const ratio = Math.min(Math.max(relativeX / width, 0), 1);
    return Math.round(ratio * 10) / 2;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const val = calculateValue(e.clientX);
    setHoverValue(val);
  };

  const handleMouseLeave = () => {
    setHoverValue(null);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const val = calculateValue(e.clientX);
    onChange?.(val);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    isTouchingRef.current = true;
    const val = calculateValue(e.touches[0].clientX);
    onChange?.(val);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isTouchingRef.current) return;
    const val = calculateValue(e.touches[0].clientX);
    onChange?.(val);
  };

  const handleTouchEnd = () => {
    isTouchingRef.current = false;
  };

  const displayValue = hoverValue !== null ? hoverValue : value;

  return (
    <div
      ref={containerRef}
      className="flex cursor-pointer touch-none select-none w-fit"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {[1, 2, 3, 4, 5].map((i) => {
        const full = i <= displayValue;
        const half = !full && i - 0.5 === displayValue;

        return (
          <span key={i} className="w-6 h-6 relative">
            <StarIcon filled={full} half={half} />
          </span>
        );
      })}
    </div>
  );
}

function StarIcon({ filled, half }: { filled?: boolean; half?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={filled || half ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      className="text-yellow-400 w-full h-full"
    >
      {half ? (
        <defs>
          <linearGradient id="half">
            <stop offset="50%" stopColor="currentColor" />
            <stop offset="50%" stopColor="white" stopOpacity="1" />
          </linearGradient>
        </defs>
      ) : null}
      <path
        d="M12 17.27L18.18 21l-1.64-7.03
           L22 9.24l-7.19-.61L12 2 9.19 8.63
           2 9.24l5.46 4.73L5.82 21z"
        fill={half ? "url(#half)" : filled ? "currentColor" : "none"}
      />
    </svg>
  );
}
