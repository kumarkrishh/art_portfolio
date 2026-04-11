import type { Metadata } from "next";
// Import your fonts (Inter/Playfair/etc) as you had them before...
import "./globals.css";

// Import our new components
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Sree Art | Original Artwork",
  description: "A premium portfolio showcasing original paintings.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* We use flex, flex-col, and min-h-screen here.
        This guarantees the page is at least 100vh tall, allowing the 
        footer to be pushed to the absolute bottom perfectly.
      */}
      <body className="antialiased flex flex-col min-h-screen bg-white">
        
        {/* 1. The Navbar stays at the top */}
        <Navbar />
        
        {/* 2. The main content (your gallery, details page, etc.) expands to fill space */}
        <main className="flex-1 flex flex-col">
          {children}
        </main>
        
        {/* 3. The Footer anchors to the bottom */}
        <Footer />
        
      </body>
    </html>
  );
}