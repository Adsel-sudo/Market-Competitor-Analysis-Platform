import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Market Competitor Analysis",
  description: "Market competitor analysis platform (MVP).",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">{children}</body>
    </html>
  );
}
