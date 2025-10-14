"use client";
import React from "react";
import { APP_TITLE } from "@/lib/constants";

// PUBLIC_INTERFACE
export default function Header() {
  /** Gradient header with app title and subtle branding. */
  return (
    <header className="header-gradient">
      <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex items-center justify-between">
          <h1 className="header-title">{APP_TITLE}</h1>
          <span className="pill">Ocean Professional</span>
        </div>
      </div>
    </header>
  );
}
