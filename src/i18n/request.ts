import { getRequestConfig } from 'next-intl/server';

import { defaultLocale } from './config';

// Non-routing i18n setup - uses default locale
// Locale can be changed via user preference stored in cookies/localStorage
export default getRequestConfig(async () => {
  // For now, use default locale. Can be extended to read from:
  // - Cookie (user preference)
  // - Accept-Language header (browser preference)
  const locale = defaultLocale;

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
