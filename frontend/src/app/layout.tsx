import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'JalRakshak (জলরক্ষক) — National Urban Flood Nowcasting & Safe Navigation',
  description: 'AI-Powered Hyper-Local Flood Prediction, Live GPS Inundation Navigation & Citizen Emergency Assistant | Smart India Hackathon',
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-stone-50 text-stone-900 antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
