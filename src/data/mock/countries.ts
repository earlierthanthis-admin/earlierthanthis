import type { Country } from '@/src/types';

export const mockCountries: Country[] = [
  // North America
  {
    id: 'united-states',
    isoA2: 'US',
    name: 'United States',
    region: 'NorthAmerica',
    subRegions: [
      {
        id: 'california',
        name: 'California',
        countryId: 'united-states',
        type: 'state',
      },
      { id: 'texas', name: 'Texas', countryId: 'united-states', type: 'state' },
      {
        id: 'new-york',
        name: 'New York',
        countryId: 'united-states',
        type: 'state',
      },
      {
        id: 'florida',
        name: 'Florida',
        countryId: 'united-states',
        type: 'state',
      },
      {
        id: 'massachusetts',
        name: 'Massachusetts',
        countryId: 'united-states',
        type: 'state',
      },
    ],
    historicalEras: ['EarlyModern', 'Modern', 'Contemporary'],
    coordinates: { latitude: 38.8951, longitude: -77.0364 },
  },
  {
    id: 'canada',
    isoA2: 'CA',
    name: 'Canada',
    region: 'NorthAmerica',
    subRegions: [
      { id: 'ontario', name: 'Ontario', countryId: 'canada', type: 'province' },
      { id: 'quebec', name: 'Quebec', countryId: 'canada', type: 'province' },
      {
        id: 'british-columbia',
        name: 'British Columbia',
        countryId: 'canada',
        type: 'province',
      },
    ],
    historicalEras: ['EarlyModern', 'Modern', 'Contemporary'],
    coordinates: { latitude: 45.4215, longitude: -75.6972 },
  },
  {
    id: 'mexico',
    isoA2: 'MX',
    name: 'Mexico',
    region: 'NorthAmerica',
    subRegions: [
      {
        id: 'mexico-city',
        name: 'Mexico City',
        countryId: 'mexico',
        type: 'state',
      },
      { id: 'jalisco', name: 'Jalisco', countryId: 'mexico', type: 'state' },
      { id: 'yucatan', name: 'Yucatan', countryId: 'mexico', type: 'state' },
    ],
    historicalEras: [
      'Ancient',
      'Medieval',
      'EarlyModern',
      'Modern',
      'Contemporary',
    ],
    coordinates: { latitude: 19.4326, longitude: -99.1332 },
  },

  // Europe
  {
    id: 'united-kingdom',
    isoA2: 'GB',
    name: 'United Kingdom',
    region: 'Europe',
    subRegions: [
      {
        id: 'england',
        name: 'England',
        countryId: 'united-kingdom',
        type: 'region',
      },
      {
        id: 'scotland',
        name: 'Scotland',
        countryId: 'united-kingdom',
        type: 'region',
      },
      {
        id: 'wales',
        name: 'Wales',
        countryId: 'united-kingdom',
        type: 'region',
      },
      {
        id: 'northern-ireland',
        name: 'Northern Ireland',
        countryId: 'united-kingdom',
        type: 'region',
      },
    ],
    historicalEras: [
      'Ancient',
      'Medieval',
      'EarlyModern',
      'Modern',
      'Contemporary',
    ],
    coordinates: { latitude: 51.5074, longitude: -0.1278 },
  },
  {
    id: 'france',
    isoA2: 'FR',
    name: 'France',
    region: 'Europe',
    subRegions: [
      {
        id: 'ile-de-france',
        name: 'Ile-de-France',
        countryId: 'france',
        type: 'region',
      },
      {
        id: 'provence',
        name: 'Provence',
        countryId: 'france',
        type: 'region',
      },
      {
        id: 'normandy',
        name: 'Normandy',
        countryId: 'france',
        type: 'region',
      },
    ],
    historicalEras: [
      'Ancient',
      'Medieval',
      'EarlyModern',
      'Modern',
      'Contemporary',
    ],
    coordinates: { latitude: 48.8566, longitude: 2.3522 },
  },
  {
    id: 'germany',
    isoA2: 'DE',
    name: 'Germany',
    region: 'Europe',
    subRegions: [
      { id: 'bavaria', name: 'Bavaria', countryId: 'germany', type: 'state' },
      { id: 'berlin', name: 'Berlin', countryId: 'germany', type: 'state' },
      {
        id: 'north-rhine-westphalia',
        name: 'North Rhine-Westphalia',
        countryId: 'germany',
        type: 'state',
      },
    ],
    historicalEras: ['Medieval', 'EarlyModern', 'Modern', 'Contemporary'],
    coordinates: { latitude: 52.52, longitude: 13.405 },
  },
  {
    id: 'italy',
    isoA2: 'IT',
    name: 'Italy',
    region: 'Europe',
    subRegions: [
      { id: 'lazio', name: 'Lazio', countryId: 'italy', type: 'region' },
      { id: 'tuscany', name: 'Tuscany', countryId: 'italy', type: 'region' },
      { id: 'lombardy', name: 'Lombardy', countryId: 'italy', type: 'region' },
    ],
    historicalEras: [
      'Ancient',
      'Medieval',
      'EarlyModern',
      'Modern',
      'Contemporary',
    ],
    coordinates: { latitude: 41.9028, longitude: 12.4964 },
  },
  {
    id: 'spain',
    isoA2: 'ES',
    name: 'Spain',
    region: 'Europe',
    subRegions: [
      { id: 'madrid', name: 'Madrid', countryId: 'spain', type: 'region' },
      {
        id: 'catalonia',
        name: 'Catalonia',
        countryId: 'spain',
        type: 'region',
      },
      {
        id: 'andalusia',
        name: 'Andalusia',
        countryId: 'spain',
        type: 'region',
      },
    ],
    historicalEras: [
      'Ancient',
      'Medieval',
      'EarlyModern',
      'Modern',
      'Contemporary',
    ],
    coordinates: { latitude: 40.4168, longitude: -3.7038 },
  },

  // Asia
  {
    id: 'china',
    isoA2: 'CN',
    name: 'China',
    region: 'Asia',
    subRegions: [
      { id: 'beijing', name: 'Beijing', countryId: 'china', type: 'province' },
      {
        id: 'shanghai',
        name: 'Shanghai',
        countryId: 'china',
        type: 'province',
      },
      {
        id: 'guangdong',
        name: 'Guangdong',
        countryId: 'china',
        type: 'province',
      },
    ],
    historicalEras: [
      'Ancient',
      'Medieval',
      'EarlyModern',
      'Modern',
      'Contemporary',
    ],
    coordinates: { latitude: 39.9042, longitude: 116.4074 },
  },
  {
    id: 'japan',
    isoA2: 'JP',
    name: 'Japan',
    region: 'Asia',
    subRegions: [
      { id: 'tokyo', name: 'Tokyo', countryId: 'japan', type: 'region' },
      { id: 'osaka', name: 'Osaka', countryId: 'japan', type: 'region' },
      { id: 'kyoto', name: 'Kyoto', countryId: 'japan', type: 'region' },
    ],
    historicalEras: [
      'Ancient',
      'Medieval',
      'EarlyModern',
      'Modern',
      'Contemporary',
    ],
    coordinates: { latitude: 35.6762, longitude: 139.6503 },
  },
  {
    id: 'india',
    isoA2: 'IN',
    name: 'India',
    region: 'Asia',
    subRegions: [
      {
        id: 'maharashtra',
        name: 'Maharashtra',
        countryId: 'india',
        type: 'state',
      },
      { id: 'delhi', name: 'Delhi', countryId: 'india', type: 'territory' },
      {
        id: 'tamil-nadu',
        name: 'Tamil Nadu',
        countryId: 'india',
        type: 'state',
      },
    ],
    historicalEras: [
      'Ancient',
      'Medieval',
      'EarlyModern',
      'Modern',
      'Contemporary',
    ],
    coordinates: { latitude: 28.6139, longitude: 77.209 },
  },

  // Middle East
  {
    id: 'egypt',
    isoA2: 'EG',
    name: 'Egypt',
    region: 'MiddleEast',
    subRegions: [
      { id: 'cairo', name: 'Cairo', countryId: 'egypt', type: 'region' },
      {
        id: 'alexandria',
        name: 'Alexandria',
        countryId: 'egypt',
        type: 'region',
      },
      { id: 'luxor', name: 'Luxor', countryId: 'egypt', type: 'region' },
    ],
    historicalEras: [
      'Ancient',
      'Medieval',
      'EarlyModern',
      'Modern',
      'Contemporary',
    ],
    coordinates: { latitude: 30.0444, longitude: 31.2357 },
  },
  {
    id: 'turkey',
    isoA2: 'TR',
    name: 'Turkey',
    region: 'MiddleEast',
    subRegions: [
      { id: 'istanbul', name: 'Istanbul', countryId: 'turkey', type: 'region' },
      { id: 'ankara', name: 'Ankara', countryId: 'turkey', type: 'region' },
      { id: 'izmir', name: 'Izmir', countryId: 'turkey', type: 'region' },
    ],
    historicalEras: [
      'Ancient',
      'Medieval',
      'EarlyModern',
      'Modern',
      'Contemporary',
    ],
    coordinates: { latitude: 41.0082, longitude: 28.9784 },
  },

  // South America
  {
    id: 'brazil',
    isoA2: 'BR',
    name: 'Brazil',
    region: 'SouthAmerica',
    subRegions: [
      {
        id: 'sao-paulo',
        name: 'Sao Paulo',
        countryId: 'brazil',
        type: 'state',
      },
      {
        id: 'rio-de-janeiro',
        name: 'Rio de Janeiro',
        countryId: 'brazil',
        type: 'state',
      },
      { id: 'bahia', name: 'Bahia', countryId: 'brazil', type: 'state' },
    ],
    historicalEras: ['EarlyModern', 'Modern', 'Contemporary'],
    coordinates: { latitude: -15.7975, longitude: -47.8919 },
  },
  {
    id: 'argentina',
    isoA2: 'AR',
    name: 'Argentina',
    region: 'SouthAmerica',
    subRegions: [
      {
        id: 'buenos-aires',
        name: 'Buenos Aires',
        countryId: 'argentina',
        type: 'province',
      },
      {
        id: 'cordoba',
        name: 'Cordoba',
        countryId: 'argentina',
        type: 'province',
      },
    ],
    historicalEras: ['EarlyModern', 'Modern', 'Contemporary'],
    coordinates: { latitude: -34.6037, longitude: -58.3816 },
  },
  {
    id: 'peru',
    isoA2: 'PE',
    name: 'Peru',
    region: 'SouthAmerica',
    subRegions: [
      { id: 'lima', name: 'Lima', countryId: 'peru', type: 'region' },
      { id: 'cusco', name: 'Cusco', countryId: 'peru', type: 'region' },
    ],
    historicalEras: [
      'Ancient',
      'Medieval',
      'EarlyModern',
      'Modern',
      'Contemporary',
    ],
    coordinates: { latitude: -12.0464, longitude: -77.0428 },
  },

  // Africa
  {
    id: 'south-africa',
    isoA2: 'ZA',
    name: 'South Africa',
    region: 'Africa',
    subRegions: [
      {
        id: 'gauteng',
        name: 'Gauteng',
        countryId: 'south-africa',
        type: 'province',
      },
      {
        id: 'western-cape',
        name: 'Western Cape',
        countryId: 'south-africa',
        type: 'province',
      },
    ],
    historicalEras: ['EarlyModern', 'Modern', 'Contemporary'],
    coordinates: { latitude: -25.7479, longitude: 28.2293 },
  },
  {
    id: 'nigeria',
    isoA2: 'NG',
    name: 'Nigeria',
    region: 'Africa',
    subRegions: [
      { id: 'lagos', name: 'Lagos', countryId: 'nigeria', type: 'state' },
      { id: 'abuja', name: 'Abuja', countryId: 'nigeria', type: 'territory' },
    ],
    historicalEras: ['Medieval', 'EarlyModern', 'Modern', 'Contemporary'],
    coordinates: { latitude: 9.082, longitude: 8.6753 },
  },

  // Oceania
  {
    id: 'australia',
    isoA2: 'AU',
    name: 'Australia',
    region: 'Oceania',
    subRegions: [
      {
        id: 'new-south-wales',
        name: 'New South Wales',
        countryId: 'australia',
        type: 'state',
      },
      {
        id: 'victoria',
        name: 'Victoria',
        countryId: 'australia',
        type: 'state',
      },
      {
        id: 'queensland',
        name: 'Queensland',
        countryId: 'australia',
        type: 'state',
      },
    ],
    historicalEras: ['Ancient', 'EarlyModern', 'Modern', 'Contemporary'],
    coordinates: { latitude: -35.2809, longitude: 149.13 },
  },
];

// Helper function to get country by ID
export function getCountryById(countryId: string): Country | undefined {
  return mockCountries.find((country) => country.id === countryId);
}

// Helper function to get country by ISO code
export function getCountryByIso(isoA2: string): Country | undefined {
  return mockCountries.find((country) => country.isoA2 === isoA2);
}

// Helper function to get countries by region
export function getCountriesByRegion(region: Country['region']): Country[] {
  return mockCountries.filter((country) => country.region === region);
}
