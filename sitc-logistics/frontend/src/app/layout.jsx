import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import SRTCPreloader from '../components/common/SRTCPreloader';
import FloatingWhatsApp from '../components/common/FloatingWhatsApp';
import './globals.css';

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'SRTC – Logistics & Transportation | Fastest, Secured, Trustable',
  description:
    'SRTC delivers premier FTL & PTL transportation, port-to-plant container haulage, warehousing, and dedicated freight supply chain solutions with guaranteed transit integrity.',
  keywords: [
    'SRTC logistics',
    'SITC logistics',
    'freight forwarding',
    'transportation',
    'container haulage',
    'FTL transport',
    'PTL transport',
    'intermodal logistics',
    'supply chain management',
    'warehousing Gujarat',
  ],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  manifest: '/manifest.json',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Service Worker Cleanup Script: Guarantees 0 lingering SW on localhost */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
                navigator.serviceWorker.getRegistrations().then(function(registrations) {
                  for (var i = 0; i < registrations.length; i++) {
                    registrations[i].unregister();
                  }
                }).catch(function(e) {});
              }
            `,
          }}
        />
      </head>
      <body>
        <SRTCPreloader />
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
