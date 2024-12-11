import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  title: "USDC Transfer | Avalanche Fuji",
  description: "Transfer USDC tokens on the Avalanche Fuji testnet",
  keywords: ["crypto", "USDC", "transfer", "Avalanche", "Fuji", "Web3"],
  openGraph: {
    title: "USDC Transfer | Avalanche Fuji",
    description: "Transfer USDC tokens on the Avalanche Fuji testnet",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "USDC Transfer | Avalanche Fuji",
    description: "Transfer USDC tokens on the Avalanche Fuji testnet",
  },
};

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
