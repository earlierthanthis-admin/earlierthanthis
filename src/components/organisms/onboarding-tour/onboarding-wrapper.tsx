'use client';

import type { ReactNode } from 'react';

import { OnboardingProvider } from '@/src/providers';

import { OnboardingFlow } from './onboarding-flow';

interface OnboardingWrapperProps {
  children: ReactNode;
}

export const OnboardingWrapper = ({ children }: OnboardingWrapperProps) => {
  return (
    <OnboardingProvider>
      <OnboardingFlow />
      {children}
    </OnboardingProvider>
  );
};
