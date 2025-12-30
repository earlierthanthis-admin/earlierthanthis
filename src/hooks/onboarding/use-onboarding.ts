'use client';

import { useCallback, useEffect, useState } from 'react';

import {
  ONBOARDING_STEPS,
  ONBOARDING_STORAGE_KEY,
  ONBOARDING_VERSION,
  type OnboardingState,
  type OnboardingStep,
} from '@/src/types/onboarding.types';

const getInitialState = (): OnboardingState => {
  // Check localStorage only on client side
  if (typeof window === 'undefined') {
    return {
      isOnboardingActive: false,
      currentStep: 'welcome',
      hasCompletedOnboarding: false,
    };
  }

  // Version-based check: show onboarding if user hasn't seen current version
  const storedVersion = localStorage.getItem(ONBOARDING_STORAGE_KEY);
  const completedVersion = storedVersion ? parseInt(storedVersion, 10) : 0;
  const hasCompletedCurrentVersion = completedVersion >= ONBOARDING_VERSION;

  return {
    isOnboardingActive: !hasCompletedCurrentVersion,
    currentStep: 'welcome',
    hasCompletedOnboarding: hasCompletedCurrentVersion,
  };
};

export const useOnboardingState = () => {
  const [state, setState] = useState<OnboardingState>({
    isOnboardingActive: false,
    currentStep: 'welcome',
    hasCompletedOnboarding: true, // Default to true to prevent flash
  });

  const [isHydrated, setIsHydrated] = useState(false);

  // Initialize state on client side
  useEffect(() => {
    const initialState = getInitialState();
    setState(initialState);
    setIsHydrated(true);
  }, []);

  const startOnboarding = useCallback(() => {
    setState((previous) => ({
      ...previous,
      isOnboardingActive: true,
      currentStep: 'welcome',
    }));
  }, []);

  const nextStep = useCallback(() => {
    setState((previous) => {
      const currentIndex = ONBOARDING_STEPS.indexOf(previous.currentStep);
      const nextIndex = Math.min(currentIndex + 1, ONBOARDING_STEPS.length - 1);
      return {
        ...previous,
        currentStep: ONBOARDING_STEPS[nextIndex],
      };
    });
  }, []);

  const previousStep = useCallback(() => {
    setState((previous) => {
      const currentIndex = ONBOARDING_STEPS.indexOf(previous.currentStep);
      const previousIndex = Math.max(currentIndex - 1, 0);
      return {
        ...previous,
        currentStep: ONBOARDING_STEPS[previousIndex],
      };
    });
  }, []);

  const goToStep = useCallback((step: OnboardingStep) => {
    setState((previous) => ({
      ...previous,
      currentStep: step,
    }));
  }, []);

  const completeOnboarding = useCallback(() => {
    if (typeof window !== 'undefined') {
      // Store the current version number to track which version was completed
      localStorage.setItem(
        ONBOARDING_STORAGE_KEY,
        ONBOARDING_VERSION.toString(),
      );
    }
    setState((previous) => ({
      ...previous,
      isOnboardingActive: false,
      hasCompletedOnboarding: true,
    }));
  }, []);

  const skipOnboarding = useCallback(() => {
    completeOnboarding();
  }, [completeOnboarding]);

  const resetOnboarding = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(ONBOARDING_STORAGE_KEY);
    }
    setState({
      isOnboardingActive: true,
      currentStep: 'welcome',
      hasCompletedOnboarding: false,
    });
  }, []);

  return {
    ...state,
    isHydrated,
    startOnboarding,
    nextStep,
    prevStep: previousStep,
    goToStep,
    skipOnboarding,
    completeOnboarding,
    resetOnboarding,
  };
};
