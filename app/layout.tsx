import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Nav from './components/Nav';
import Head from 'next/head';
import { AuthProvider } from './context/authContext';
import { ChatProvider } from "./hooks/useChat";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'RealityPlus',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
        <ChatProvider>
      <html lang="en">
        <Head>
          <title>RealityPlus</title>
          <link rel="icon" sizes="any" href="/favicon.ico" />
        </Head>
        <body className={inter.className}>
          <div className="bg-[url('/BG-main.png')] bg-cover bg-center min-h-screen flex flex-col">
            <Nav />
            {children}
          </div>
        </body>
      </html>
      </ChatProvider>
    </AuthProvider>
  );
}
