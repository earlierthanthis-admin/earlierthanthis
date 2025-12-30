import {
  getCountryById,
  getEssayById,
  getEssaysByCountry,
  getEssaysByYear,
  getYearsForCountry,
  mockCountries,
} from '@/src/data/mock';
import type {
  Country,
  CountryTimeline,
  Essay,
  HistoricalEra,
  TimelineEvent,
} from '@/src/types';

// Simulated API delay for realistic loading states
const simulateDelay = (ms: number = 300): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Era order for sorting
const eraOrder: HistoricalEra[] = [
  'Ancient',
  'Medieval',
  'EarlyModern',
  'Modern',
  'Contemporary',
];

// Determine era based on year
function getEraForYear(year: number): HistoricalEra {
  if (year < 500) return 'Ancient';
  if (year < 1500) return 'Medieval';
  if (year < 1800) return 'EarlyModern';
  if (year < 1945) return 'Modern';
  return 'Contemporary';
}

// Get all countries
export async function getAllCountries(): Promise<Country[]> {
  await simulateDelay();
  return mockCountries;
}

// Get a single country by ID
export async function getCountry(countryId: string): Promise<Country | null> {
  await simulateDelay();
  return getCountryById(countryId) ?? null;
}

// Get timeline for a country
export async function getCountryTimeline(
  countryId: string,
): Promise<CountryTimeline | null> {
  await simulateDelay();

  const country = getCountryById(countryId);
  if (!country) return null;

  const essays = getEssaysByCountry(countryId);
  const years = getYearsForCountry(countryId);

  // Group essays by year and create timeline events
  const events: TimelineEvent[] = years.map((year) => {
    const yearEssays = essays.filter((essay) => essay.year === year);
    const era = getEraForYear(year);
    const isMajorEvent =
      yearEssays.length > 1 ||
      yearEssays.some((essay) => essay.readingTimeMinutes > 8);

    return {
      year,
      countryId,
      essays: yearEssays,
      era,
      isMajorEvent,
    };
  });

  return {
    country,
    events,
    totalEssays: essays.length,
  };
}

// Get essays for a specific year
export async function getEssaysForYear(
  countryId: string,
  year: number,
): Promise<Essay[]> {
  await simulateDelay();
  return getEssaysByYear(countryId, year);
}

// Get a single essay
export async function getEssay(essayId: string): Promise<Essay | null> {
  await simulateDelay();
  return getEssayById(essayId) ?? null;
}

// Get first essay for a year (for direct navigation)
export async function getFirstEssayForYear(
  countryId: string,
  year: number,
): Promise<Essay | null> {
  await simulateDelay();
  const essays = getEssaysByYear(countryId, year);
  return essays[0] ?? null;
}

// Search countries by name
export async function searchCountries(query: string): Promise<Country[]> {
  await simulateDelay(150);
  const lowerQuery = query.toLowerCase();
  return mockCountries.filter((country) =>
    country.name.toLowerCase().includes(lowerQuery),
  );
}

// Get countries grouped by region
export async function getCountriesByRegionGrouped(): Promise<
  Record<string, Country[]>
> {
  await simulateDelay();
  const grouped: Record<string, Country[]> = {};

  for (const country of mockCountries) {
    if (!grouped[country.region]) {
      grouped[country.region] = [];
    }
    grouped[country.region].push(country);
  }

  // Sort countries within each region
  for (const region of Object.keys(grouped)) {
    grouped[region].sort((a, b) => a.name.localeCompare(b.name));
  }

  return grouped;
}

// Get countries grouped by historical era
export async function getCountriesByEraGrouped(): Promise<
  Record<string, Country[]>
> {
  await simulateDelay();
  const grouped: Record<string, Country[]> = {};

  for (const era of eraOrder) {
    grouped[era] = mockCountries.filter((country) =>
      country.historicalEras.includes(era),
    );
  }

  return grouped;
}

// Convert country name to URL slug
export function createCountrySlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-');
}

// Find country by slug
export async function getCountryBySlug(slug: string): Promise<Country | null> {
  await simulateDelay();
  return (
    mockCountries.find(
      (country) =>
        createCountrySlug(country.name) === slug || country.id === slug,
    ) ?? null
  );
}

const timelineService = {
  getAllCountries,
  getCountry,
  getCountryTimeline,
  getEssaysForYear,
  getEssay,
  getFirstEssayForYear,
  searchCountries,
  getCountriesByRegionGrouped,
  getCountriesByEraGrouped,
  createCountrySlug,
  getCountryBySlug,
};

export default timelineService;
