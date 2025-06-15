// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import SessionProviderComponent from "@/components/SeesionProvider";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "The Obnoxious Twins",
  description: "Your app description",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Toaster position="top-right" />
        <SessionProviderComponent>
          <Navbar />
          <div className="mt-16 bg-gray-950">
            {children}
          </div>
        </SessionProviderComponent>
      </body>
    </html>
  );
}