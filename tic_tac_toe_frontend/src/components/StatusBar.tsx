"use client";
import React from "react";

type Props = {
  text: string;
  liveRef: React.RefObject<HTMLDivElement | null>;
};

// PUBLIC_INTERFACE
export default function StatusBar({ text, liveRef }: Props) {
  /** Status text with polite aria-live and a visually hidden live region. */
  return (
    <div className="flex items-center justify-between">
      <div className="text-sm sm:text-base text-gray-700">
        {text}
      </div>
      <div
        aria-live="polite"
        aria-atomic="true"
        className="sr-live"
        ref={liveRef}
      />
    </div>
  );
}
