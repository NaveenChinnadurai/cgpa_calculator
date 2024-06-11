import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CGPA Calculator",
  description: "Calculate Your CGPA within minutes easily",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="/src/app/icon.png" type="image/png" />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
