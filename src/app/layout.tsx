
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppTopNavbar } from "@/comp/navs/app_top_nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Quizly",
  description: "GCSE Revision Platform",
};

const setInitialThemeScript = `
  (function() {
    try {
      var theme = localStorage.getItem('theme');
      var systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      var useDark = theme === 'dark' || (!theme && systemPrefersDark);
      if (useDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (_) {
      document.documentElement.classList.remove('dark');
    }
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en" className="h-full" suppressHydrationWarning> 
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: setInitialThemeScript }}
          // Important: avoid React warnings for script tags
          // You can add nonce or async if you want here
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}
      >
        {children}
      </body>
    </html>
  );
}
