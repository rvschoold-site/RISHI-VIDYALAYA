import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import Script from "next/script";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://www.rishividyalaya.in'),
  title: {
    default: "Rishi Vidyalaya – Best School in Dharmavaram | IIT-NEET Foundation School",
    template: "%s | Rishi Vidyalaya"
  },
  description: "Recognized as the best school in Dharmavaram for IIT-NEET foundation, CBSE academics, and holistic development. Features AC campus, 2-acre playground, AI & Robotics, and green hostel.",
  keywords: "Best school in Dharmavaram, Top schools in Dharmavaram, Schools in Dharmavaram Andhra Pradesh, Best CBSE school in Dharmavaram, Best English medium school in Dharmavaram, Best school for IIT foundation in Dharmavaram, IIT foundation schools in Andhra Pradesh, NEET foundation school in Dharmavaram, Residential schools in Dharmavaram, Best hostel school in Dharmavaram, AI & Robotics school in Dharmavaram, Top international style school in Dharmavaram, Best school with sports facilities in Dharmavaram",
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.rishividyalaya.in',
    siteName: 'Rishi Vidyalaya',
    title: 'Rishi Vidyalaya – Best School in Dharmavaram | IIT-NEET Foundation',
    description: 'Premier IIT-NEET Foundation school in Dharmavaram with AI & Robotics and world-class infrastructure.',
    images: [{
      url: '/logo.png',
      width: 800,
      height: 600,
      alt: 'Rishi Vidyalaya Logo'
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rishi Vidyalaya – Best School in Dharmavaram',
    description: 'Premier IIT-NEET Foundation school in Dharmavaram.',
    images: ['/logo.png'],
  },
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
      <head>
        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-WTG8P9K7');`}
        </Script>
        {/* End Google Tag Manager */}
        <link rel="preconnect" href="https://www.facebook.com" />
        <link rel="preconnect" href="https://connect.facebook.net" />
        <link rel="preconnect" href="https://www.instagram.com" />
        <link rel="preconnect" href="https://www.youtube.com" />  
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="preconnect" href="https://rishividalaya.s3.ap-southeast-2.amazonaws.com" />
        <link rel="preconnect" href="https://wa.me" />
        <link rel="dns-prefetch" href="https://www.facebook.com" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />
        <link rel="dns-prefetch" href="https://www.instagram.com" />
        <link rel="dns-prefetch" href="https://www.youtube.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://rishividalaya.s3.ap-southeast-2.amazonaws.com" />
        <link rel="dns-prefetch" href="https://wa.me" />
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-WTG8P9K7"
            height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <ClientLayout>
          {children}
        </ClientLayout>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
