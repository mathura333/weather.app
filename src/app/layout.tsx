import type { Metadata } from "next";
import { Inter } from "next/font/google";
import QueryProvider from "./context/query-provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

declare global {
  var apiBasePath: string;
}

export const metadata: Metadata = {
  title: "Weather App",
  description: "Get current weather",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
