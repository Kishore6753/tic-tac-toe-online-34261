import "./../styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tic-Tac-Toe | Ocean Professional",
  description: "Play Tic-Tac-Toe in a modern, dark-themed UI.",
  icons: {
    icon: [
      { url: "/favicon.ico" }
    ]
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
