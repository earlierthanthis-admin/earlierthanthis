// Region and Geographic Types
export type Region =
  | 'Africa'
  | 'Asia'
  | 'Europe'
  | 'NorthAmerica'
  | 'SouthAmerica'
  | 'Oceania'
  | 'MiddleEast';

export type HistoricalEra =
  | 'Ancient' // Before 500 CE
  | 'Medieval' // 500 - 1500 CE
  | 'EarlyModern' // 1500 - 1800 CE
  | 'Modern' // 1800 - 1945 CE
  | 'Contemporary'; // 1945 - Present

// Province/State/Area within a country
export interface SubRegion {
  id: string;
  name: string;
  countryId: string;
  type: 'province' | 'state' | 'territory' | 'region';
}

// Country definition
export interface Country {
  id: string; // Slug: 'united-states', 'united-kingdom'
  isoA2: string; // ISO 3166-1 alpha-2: 'US', 'GB'
  name: string; // Display name: 'United States'
  region: Region;
  subRegions: SubRegion[];
  historicalEras: HistoricalEra[];
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

// Essay content block types
export type ContentBlockType =
  | 'paragraph'
  | 'heading'
  | 'image'
  | 'quote'
  | 'list';

export interface ContentBlock {
  id: string;
  type: ContentBlockType;
  content: string;
  metadata?: {
    level?: 1 | 2 | 3 | 4; // For headings
    imageUrl?: string; // For images
    imageCaption?: string;
    author?: string; // For quotes
    listType?: 'ordered' | 'unordered';
    listItems?: string[];
  };
}

// Essay/Lesson for a specific year
export interface Essay {
  id: string;
  countryId: string;
  year: number;
  title: string;
  subtitle?: string;
  summary: string;
  coverImageUrl?: string;
  contentBlocks: ContentBlock[];
  tags: string[];
  era: HistoricalEra;
  readingTimeMinutes: number;
  createdAt: string;
  updatedAt: string;
}

// Timeline event (represents a year with essays)
export interface TimelineEvent {
  year: number;
  countryId: string;
  essays: Essay[];
  era: HistoricalEra;
  isMajorEvent: boolean;
}

// Timeline data for a country
export interface CountryTimeline {
  country: Country;
  events: TimelineEvent[];
  totalEssays: number;
}

// Sidebar navigation item
export interface SidebarCountryItem {
  country: Country;
  isExpanded: boolean;
  hasContent: boolean;
}

// Sort options for sidebar
export type SidebarSortOption = 'alphabetical' | 'byRegion' | 'byHistoricalEra';

// Table of contents entry for essay reader
export interface TableOfContentsEntry {
  id: string;
  title: string;
  level: number;
}

// Era display configuration
export interface EraConfig {
  label: string;
  color: string;
  startYear: number;
  endYear: number;
}

// Region display configuration
export interface RegionConfig {
  label: string;
  color: string;
}
