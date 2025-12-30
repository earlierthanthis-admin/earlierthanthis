// Admin authentication hooks
export { ADMIN_AUTH_QUERY_KEY, useAdminAuth } from './use-admin-auth';
export { useAdminLogin } from './use-admin-login';
export { useAdminLogout } from './use-admin-logout';
export { useAdminSignup } from './use-admin-signup';

// Admin analytics hooks
export {
  ADMIN_ANALYTICS_QUERY_KEY,
  ADMIN_STATS_QUERY_KEY,
  useAdminAnalytics,
  useAdminStats,
} from './use-admin-analytics';

// Admin countries hooks
export {
  ADMIN_COUNTRIES_QUERY_KEY,
  useAddSubRegion,
  useAdminCountries,
  useAdminCountry,
  useDeleteSubRegion,
  useUpdateCountry,
  useUpdateSubRegion,
} from './use-admin-countries';

// Admin essays hooks
export {
  ADMIN_ESSAYS_QUERY_KEY,
  useAdminEssay,
  useAdminEssays,
  useCreateEssay,
  useDeleteEssay,
  useUpdateEssay,
} from './use-admin-essays';

// Admin contributions hooks
export {
  ADMIN_CONTRIBUTION_SETTINGS_QUERY_KEY,
  useContributionSettings,
  useUpdateContributionSettings,
} from './use-admin-contributions';

// Admin profile hooks
export {
  ADMIN_PROFILE_QUERY_KEY,
  useAdminProfile,
  useUpdateAdminProfile,
} from './use-admin-profile';

// Admin management hooks (super admin only)
export {
  ADMIN_LIST_QUERY_KEY,
  ADMIN_PENDING_QUERY_KEY,
  useAdminList,
  useDemoteAdmin,
  usePendingAdminRequests,
  usePromoteAdmin,
  useRevokeAdmin,
} from './use-admin-management';

// Image upload hook
export { useImageUpload } from './use-image-upload';
