import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "./footer";
import NavBar  from "./header";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Water Treatment",
  description: "Created By MJM",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
     
      <body className={inter.className}>
        <NavBar/>
        {children}
      <Footer/>
      </body>
     
    </html>
  );
}
