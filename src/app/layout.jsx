import { Archivo_Narrow, Work_Sans } from 'next/font/google';
import { seo } from '@/data/content';
import { DrawerProvider } from '@/context/DrawerContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingCTA from '@/components/ui/FloatingCTA';
import CursorFollower from '@/components/ui/CursorFollower';
import FormDrawer from '@/components/ui/FormDrawer';
import '@/styles/globals.scss';

const archivoNarrow = Archivo_Narrow({
  subsets: ['latin'],
  weight: ['500'],
  variable: '--font-heading',
  display: 'swap',
});

const workSans = Work_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata = {
  title: seo.home.title,
  description: seo.home.description,
  keywords: seo.home.keywords.join(', '),
  icons: {
    icon: '/images/site_favicon.ico',
  },
  openGraph: {
    title: seo.home.title,
    description: seo.home.description,
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${archivoNarrow.variable} ${workSans.variable}`}>
      <body>
        <DrawerProvider>
          <Header />
          <main id="main-content">
            {children}
          </main>
          <Footer />
          <FloatingCTA />
          <CursorFollower />
          <FormDrawer />
        </DrawerProvider>
      </body>
    </html>
  );
}
