import { ClerkProvider } from "@clerk/nextjs";
import { StoreProvider } from "@/store/store-provider";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';

import localFont from "next/font/local";
import "./globals.css";

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

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };

}) {
  const messages = await getMessages();




  return (
    <ClerkProvider>
      <StoreProvider>
        <html lang={locale}>
          <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
          </body>
        </html>
      </StoreProvider>
    </ClerkProvider>
  );
}
