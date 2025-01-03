import type { Metadata } from "next";
import { Inter, Rubik } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";


// Load Google Fonts
const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter" 
});

const rubik = Rubik({
   subsets: ["latin"], 
   variable: "--font-rubik" 
});

// Load Custom Font (Asgard Trial)
const asgard = localFont({
  src: "../public/fonts/asgard/AsgardTrial-FitBold.ttf", 
  variable: "--font-asgard", 
});

const asgardRegular = localFont({
  src: "../public/fonts/asgard/AsgardTrial-FitRegular.ttf", 
  variable: "--font-asgard", 
});

 // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//  className={`${inter.variable} ${rubik.variable} ${asgard} antialiased`}

export const metadata: Metadata = {
  title: "Monnify Wrap 2024",
  description: "Monnify End Of Year Review Details To Merchant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
       
    
        {children}
      </body>
    </html>
  );
}

