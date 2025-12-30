// Admin role types
export type AdminRole = 'admin' | 'super_admin';

// Admin user data
export interface AdminUser {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  profilePicture?: string;
  role: AdminRole;
  createdAt: string;
  updatedAt: string;
}

// Admin login request
export interface AdminLoginRequest {
  email: string;
  password: string;
}

// Admin login response
export interface AdminLoginResponse {
  token: string;
  role: AdminRole;
  userId: string;
}

// Admin signup request (email only)
export interface AdminSignupRequest {
  email: string;
}

// Admin signup response
export interface AdminSignupResponse {
  message: string;
}

// Admin profile update request
export interface AdminProfileUpdateRequest {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  profilePicture?: string;
}

// Admin password change request
export interface AdminPasswordChangeRequest {
  currentPassword: string;
  newPassword: string;
}

// Dashboard analytics types
export interface DashboardStats {
  countriesWithHistory: number;
  totalEssays: number;
  activeVisitors: number;
  totalContributions: number;
}

export interface CountryVisitData {
  countryId: string;
  countryName: string;
  isoA2: string;
  visits: number;
  percentage: number;
}

export interface TimelineVisitData {
  year: number;
  visits: number;
}

export interface AnalyticsData {
  stats: DashboardStats;
  countryVisits: CountryVisitData[];
  recentActivity: ActivityItem[];
}

export interface ActivityItem {
  id: string;
  type: 'essay_view' | 'contribution' | 'signup' | 'essay_edit';
  description: string;
  timestamp: string;
  metadata?: {
    countryId?: string;
    countryName?: string;
    essayId?: string;
    essayTitle?: string;
    userId?: string;
    userName?: string;
  };
}

// Country management types
export interface AdminCountry {
  id: string;
  slug: string;
  name: string;
  isoA2: string;
  region: string;
  latitude: number;
  longitude: number;
  historicalEras: string[];
  subRegions: AdminSubRegion[];
  essayCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface AdminSubRegion {
  id: string;
  name: string;
  type: 'province' | 'state' | 'territory' | 'region';
}

export interface UpdateCountryRequest {
  name?: string;
  region?: string;
}

export interface CreateSubRegionRequest {
  name: string;
  type: 'province' | 'state' | 'territory' | 'region';
}

export interface UpdateSubRegionRequest {
  name?: string;
  type?: 'province' | 'state' | 'territory' | 'region';
}

// Essay management types
export interface AdminEssay {
  id: string;
  countryId: string;
  countryName: string;
  year: number;
  title: string;
  subtitle?: string;
  summary: string;
  coverImageUrl?: string;
  contentBlocks: AdminContentBlock[];
  tags: string[];
  era: string;
  readingTimeMinutes: number;
  createdAt: string;
  updatedAt: string;
}

export interface AdminContentBlock {
  id: string;
  type: 'paragraph' | 'heading' | 'image' | 'quote' | 'list' | 'video';
  content: string;
  metadata?: {
    level?: 1 | 2 | 3 | 4;
    imageUrl?: string;
    imageCaption?: string;
    author?: string;
    listType?: 'ordered' | 'unordered';
    listItems?: string[];
    videoUrl?: string;
    videoProvider?: 'youtube' | 'vimeo';
  };
}

export interface CreateEssayRequest {
  countryId: string;
  year: number;
  title: string;
  subtitle?: string;
  summary: string;
  coverImageUrl?: string;
  contentBlocks: AdminContentBlock[];
  tags: string[];
  era: string;
}

export interface UpdateEssayRequest {
  year?: number;
  title?: string;
  subtitle?: string;
  summary?: string;
  coverImageUrl?: string;
  contentBlocks?: AdminContentBlock[];
  tags?: string[];
  era?: string;
}

// Timeline management types
export interface AdminTimelineEvent {
  id: string;
  year: number;
  countryId: string;
  essays: {
    id: string;
    title: string;
  }[];
  era: string;
  isMajorEvent: boolean;
}

export interface UpdateTimelineEventRequest {
  year?: number;
  isMajorEvent?: boolean;
}

// Contribution settings types
export interface ContributionSettings {
  id: string;
  showEmail: boolean;
  showName: boolean;
  showCountry: boolean;
  showDescription: boolean;
  showFile: boolean;
  showYear: boolean;
  showTags: boolean;
  customFields: CustomContributionField[];
  updatedAt: string;
}

export interface CustomContributionField {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'checkbox';
  isRequired: boolean;
  options?: string[]; // For select type
}

export interface UpdateContributionSettingsRequest {
  showEmail?: boolean;
  showName?: boolean;
  showCountry?: boolean;
  showDescription?: boolean;
  showFile?: boolean;
  showYear?: boolean;
  showTags?: boolean;
  customFields?: CustomContributionField[];
}

// Admin management types (super admin only)
export interface AdminListItem {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: AdminRole;
  createdAt: string;
}

export interface PendingAdminRequest {
  id: string;
  email: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export interface PromoteAdminRequest {
  adminId: string;
  makeSuper: boolean;
}

// Upload types
export interface UploadResponse {
  url: string;
  filename: string;
  size: number;
  mimeType: string;
}

// Sidebar navigation item
export interface AdminNavItem {
  label: string;
  href: string;
  icon: string;
  isSuperAdminOnly?: boolean;
}
