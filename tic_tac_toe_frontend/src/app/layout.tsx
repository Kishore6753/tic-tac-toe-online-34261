import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tic-Tac-Toe — Ocean Pro",
  description:
    "Modern, accessible Tic-Tac-Toe with PvP and AI (minimax) modes using the Ocean Professional theme.",
  applicationName: "Tic-Tac-Toe",
  authors: [{ name: "Ocean Pro Suite" }],
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#2563EB",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="app-container" suppressHydrationWarning>
        <div className="min-h-screen flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
