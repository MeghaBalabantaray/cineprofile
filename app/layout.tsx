import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Actor Profile",
    template: "%s | Actor Profile"
  },
  description: "A production-shaped actor profile with RSC, ISR, signed media, and virtual filmography."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
