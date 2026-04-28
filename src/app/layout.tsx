import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Rishi Vidyalaya – Best School in Dharmavaram | IIT-NEET Foundation School | Top CBSE School",
  description: "Recognized as the best school in Dharmavaram for IIT-NEET foundation, CBSE academics, and holistic development. Features AC campus, 2-acre playground, AI & Robotics, and green hostel.",
  keywords: "Best school in Dharmavaram, Top schools in Dharmavaram, Schools in Dharmavaram Andhra Pradesh, Best CBSE school in Dharmavaram, Best English medium school in Dharmavaram, Best school for IIT foundation in Dharmavaram, IIT foundation schools in Andhra Pradesh, NEET foundation school in Dharmavaram, Residential schools in Dharmavaram, Best hostel school in Dharmavaram, AI & Robotics school in Dharmavaram, Top international style school in Dharmavaram, Best school with sports facilities in Dharmavaram",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
