export type OnboardingStep =
  | 'welcome'
  | 'globe'
  | 'timeline'
  | 'contributions'
  | 'getStarted';

export interface OnboardingState {
  isOnboardingActive: boolean;
  currentStep: OnboardingStep;
  hasCompletedOnboarding: boolean;
}

export interface OnboardingContextValue extends OnboardingState {
  isHydrated: boolean;
  startOnboarding: () => void;
  nextStep: () => void;
  prevStep: () => void;
  skipOnboarding: () => void;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
  goToStep: (step: OnboardingStep) => void;
}

export interface OnboardingStepConfig {
  id: OnboardingStep;
  title: string;
  subtitle: string;
  description: string;
  icon: 'scroll' | 'globe' | 'timeline' | 'quill' | 'compass';
}

export const ONBOARDING_STEPS: OnboardingStep[] = [
  'welcome',
  'globe',
  'timeline',
  'contributions',
  'getStarted',
];

export const ONBOARDING_STORAGE_KEY = 'ett_onboarding_version';

// Increment this version to force all users to see onboarding again after deployment
// Current version: 1 - Initial onboarding release
export const ONBOARDING_VERSION = 1;
