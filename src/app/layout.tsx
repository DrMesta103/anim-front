import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";

const modam = localFont({
  src: "../../public/fonts/ModamWeb-Bold.woff2",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Robin Clinic",
  description: "an application for managing clinic systems",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa-ir" dir="rtl">
      <body className={`${modam.className}`}>
        <main className="w-full overflow-x-hidden mx-auto min-h-screen flex flex-col">{children}</main>
      </body>
    </html>
  );
}
