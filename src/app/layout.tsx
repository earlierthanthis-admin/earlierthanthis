import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import './globals.css';

import { ColorSchemeScript } from '@mantine/core';
import type { Metadata } from 'next';
import { DM_Sans, Poppins } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

import { OnboardingWrapper } from '@/src/components/organisms';
import {
  GoogleOAuthProviderWrapper,
  MantineProviderWrapper,
  QueryProvider,
} from '@/src/providers';

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
});

export const metadata: Metadata = {
  title: 'Earlier Than This',
  description: 'Explore the history of our world',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();

  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <ColorSchemeScript defaultColorScheme='dark' />
      </head>
      <body className={`${poppins.variable} ${dmSans.variable}`}>
        <NextIntlClientProvider messages={messages}>
          <MantineProviderWrapper>
            <QueryProvider>
              <GoogleOAuthProviderWrapper>
                <OnboardingWrapper>{children}</OnboardingWrapper>
              </GoogleOAuthProviderWrapper>
            </QueryProvider>
          </MantineProviderWrapper>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
