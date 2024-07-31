import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Navbar from "@/components/Navbar";
import LayoutClient from "@/components/LayoutClient";

export const metadata: Metadata = {
  title: "Taner Engin",
  description: "Frontend developer at Primetek.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <LayoutClient>
        <body className={GeistSans.className} style={GeistSans.style}>
          <div className="max-w-lg lg:max-w-[1080px] mx-auto px-5">
            <main className="relative flex flex-col lg:grid lg:grid-cols-[200px_1fr_200px] mx-auto pt-16 sm:pt-20 lg:pt-40 pb-28 gap-x-16">
              <div className="w-full lg:sticky lg:top-40 lg:mb-0 mb-8" style={{gridColumn:1}}>
                <Navbar />
              </div>
              {children}
            </main>
          </div>
          <div className="fixed top-0 w-full h-[60px] lg:h-[80px] backdrop-blur-sm z-50 [mask-image:linear-gradient(to_top,rgba(255,255,255,0)_0%,rgba(255,255,255,1)_75%)]" />
        </body>
      </LayoutClient>
    </html>
  );
}
