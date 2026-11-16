import Header from '../components/layout/Header';
import CruiseVelocityHUD from '../components/common/CruiseVelocityHUD';
import './globals.css';

export const metadata = {
  title: 'SRTC – Logistics & Transportation | Fastest, Secured, Trustable',
  description:
    'SRTC delivers premier international ocean freight, air cargo, intermodal trucking, and global supply chain solutions with real-time tracking.',
  keywords: [
    'SRTC logistics',
    'SITC logistics',
    'freight forwarding',
    'transportation',
    'ocean freight',
    'air cargo',
    'intermodal logistics',
    'cargo tracking',
    'supply chain management',
  ],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <CruiseVelocityHUD />
        <main id="main-content">{children}</main>
      </body>
    </html>
  );
}
