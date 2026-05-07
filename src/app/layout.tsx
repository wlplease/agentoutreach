import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AgentOutreach — AI Sales Agents for Solana Projects",
  description: "Autonomous AI agents that find, qualify, and convert customers for your Solana project. Replace your $10k/mo marketing spend with an AI agent that works 24/7.",
  openGraph: {
    title: "AgentOutreach — AI Sales Agents for Solana Projects",
    description: "Autonomous outbound sales agents. $199/mo. 24/7 lead generation across Moltbook, Farcaster, X, and Discord.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
