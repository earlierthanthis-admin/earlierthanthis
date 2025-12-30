'use client';

import { Box, Button, Group, Text, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconArrowLeft, IconArrowRight, IconX } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useState } from 'react';

import { useOnboarding } from '@/src/providers';
import {
  ONBOARDING_STEPS,
  type OnboardingStep,
} from '@/src/types/onboarding.types';

import { OnboardingIcons } from './onboarding-icons';
import { ParticleScene } from './particle-scene';
import { SpotlightOverlay } from './spotlight-overlay';
import { SpotlightTooltip } from './spotlight-tooltip';

type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

interface StepConfig {
  icon: 'scroll' | 'globe' | 'timeline' | 'quill' | 'compass';
  targetSelector: string | null;
  mobileTargetSelector?: string | null; // Override for mobile
  tooltipPosition: TooltipPosition;
}

const STEP_CONFIGS: Record<OnboardingStep, StepConfig> = {
  welcome: {
    icon: 'scroll',
    targetSelector: null, // Full screen welcome
    tooltipPosition: 'bottom',
  },
  globe: {
    icon: 'globe',
    targetSelector: '__OVERLAY__', // Special: semi-transparent overlay showing landing page
    tooltipPosition: 'bottom',
  },
  timeline: {
    icon: 'timeline',
    targetSelector: 'nav a[href="/timeline"]', // Timeline link in navbar (desktop)
    mobileTargetSelector: '__OVERLAY__', // Use overlay on mobile (nav links hidden in burger)
    tooltipPosition: 'bottom',
  },
  contributions: {
    icon: 'quill',
    targetSelector: 'nav a[href="/contribution"]', // Contributions link (desktop)
    mobileTargetSelector: '__OVERLAY__', // Use overlay on mobile (nav links hidden in burger)
    tooltipPosition: 'bottom',
  },
  getStarted: {
    icon: 'compass',
    targetSelector: null, // Full screen finale
    tooltipPosition: 'bottom',
  },
};

export const OnboardingFlow = () => {
  const t = useTranslations('onboarding');
  const isMobile = useMediaQuery('(max-width: 768px)');
  const {
    isOnboardingActive,
    currentStep,
    isHydrated,
    nextStep,
    prevStep,
    skipOnboarding,
    completeOnboarding,
  } = useOnboarding();

  const [isExiting, setIsExiting] = useState(false);
  const [isEntering, setIsEntering] = useState(true);

  const currentStepIndex = ONBOARDING_STEPS.indexOf(currentStep);
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === ONBOARDING_STEPS.length - 1;
  const stepConfig = STEP_CONFIGS[currentStep];

  // Use mobile target selector if on mobile and one is defined
  const effectiveTargetSelector =
    isMobile && stepConfig.mobileTargetSelector !== undefined
      ? stepConfig.mobileTargetSelector
      : stepConfig.targetSelector;

  const isSpotlightStep =
    effectiveTargetSelector !== null &&
    effectiveTargetSelector !== '__OVERLAY__';
  const isOverlayStep = effectiveTargetSelector === '__OVERLAY__';

  useEffect(() => {
    if (isOnboardingActive) {
      setIsEntering(true);
      const timer = setTimeout(() => setIsEntering(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isOnboardingActive]);

  const handleComplete = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      completeOnboarding();
      setIsExiting(false);
    }, 500);
  }, [completeOnboarding]);

  const handleSkip = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      skipOnboarding();
      setIsExiting(false);
    }, 500);
  }, [skipOnboarding]);

  const handleNext = useCallback(() => {
    if (isLastStep) {
      handleComplete();
    } else {
      nextStep();
    }
  }, [isLastStep, nextStep, handleComplete]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOnboardingActive) return;

      if (event.key === 'ArrowRight' || event.key === 'Enter') {
        handleNext();
      } else if (event.key === 'ArrowLeft' && !isFirstStep) {
        prevStep();
      } else if (event.key === 'Escape') {
        handleSkip();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOnboardingActive, isFirstStep, handleNext, prevStep, handleSkip]);

  if (!isHydrated || !isOnboardingActive) {
    return null;
  }

  const IconComponent = OnboardingIcons[stepConfig.icon];

  // For overlay steps (semi-transparent overlay showing landing page with floating tooltip)
  if (isOverlayStep) {
    return (
      <Box
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 9999,
          background: 'rgba(0, 5, 16, 0.75)',
          backdropFilter: 'blur(2px)',
          opacity: isExiting ? 0 : isEntering ? 0 : 1,
          transition: 'opacity 0.5s ease-in-out',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-end',
          paddingBottom: '120px',
          overflow: 'hidden',
        }}
      >
        {/* Skip Button */}
        <Button
          variant='subtle'
          color='gray'
          size='sm'
          leftSection={<IconX size={16} />}
          onClick={handleSkip}
          style={{
            position: 'absolute',
            top: '1.5rem',
            right: '1.5rem',
            zIndex: 10,
            color: 'rgba(255, 255, 255, 0.5)',
          }}
          styles={{
            root: {
              '&:hover': {
                color: '#fff',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            },
          }}
        >
          {t('skip')}
        </Button>

        {/* Floating Card Tooltip */}
        <Box
          style={{
            background:
              'linear-gradient(135deg, rgba(15, 15, 35, 0.95) 0%, rgba(5, 5, 20, 0.98) 100%)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 215, 0, 0.2)',
            borderRadius: '16px',
            padding: '1.5rem 2rem',
            maxWidth: '450px',
            textAlign: 'center',
            boxShadow: `
              0 25px 50px -12px rgba(0, 0, 0, 0.5),
              0 0 40px rgba(255, 215, 0, 0.15)
            `,
            animation: 'slideUp 0.5s ease-out',
          }}
        >
          {/* Icon */}
          <Box
            style={{
              width: '64px',
              height: '64px',
              margin: '0 auto 1rem',
              filter: 'drop-shadow(0 0 20px rgba(255, 215, 0, 0.3))',
            }}
          >
            <IconComponent />
          </Box>

          {/* Title */}
          <Title
            order={2}
            style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              color: '#fff',
              marginBottom: '0.5rem',
              textShadow: '0 0 30px rgba(255, 215, 0, 0.2)',
            }}
          >
            {t(`steps.${currentStep}.title`)}
          </Title>

          {/* Subtitle */}
          <Text
            size='md'
            style={{
              color: 'rgba(255, 215, 0, 0.9)',
              marginBottom: '1rem',
              fontWeight: 500,
            }}
          >
            {t(`steps.${currentStep}.subtitle`)}
          </Text>

          {/* Description */}
          <Text
            size='sm'
            style={{
              color: 'rgba(255, 255, 255, 0.7)',
              lineHeight: 1.7,
              marginBottom: '1.5rem',
            }}
          >
            {t(`steps.${currentStep}.description`)}
          </Text>

          {/* Progress dots */}
          <Group gap='xs' mb='md' justify='center'>
            {ONBOARDING_STEPS.map((step, index) => (
              <Box
                key={step}
                style={{
                  width: index === currentStepIndex ? '20px' : '6px',
                  height: '6px',
                  borderRadius: '3px',
                  background:
                    index === currentStepIndex
                      ? 'linear-gradient(90deg, #ffd700, #c9a959)'
                      : index < currentStepIndex
                        ? 'rgba(255, 215, 0, 0.5)'
                        : 'rgba(255, 255, 255, 0.2)',
                  transition: 'all 0.3s ease',
                }}
              />
            ))}
          </Group>

          {/* Navigation */}
          <Group gap='sm' justify='center'>
            <Button
              variant='subtle'
              color='gray'
              size='sm'
              leftSection={<IconArrowLeft size={16} />}
              onClick={prevStep}
              disabled={isFirstStep}
              style={{
                opacity: isFirstStep ? 0.3 : 1,
                color: 'rgba(255, 255, 255, 0.7)',
              }}
            >
              {t('back')}
            </Button>

            <Button
              variant='filled'
              size='sm'
              rightSection={!isLastStep && <IconArrowRight size={16} />}
              onClick={handleNext}
              style={{
                background: 'linear-gradient(135deg, #ffd700 0%, #c9a959 100%)',
                color: '#000',
                fontWeight: 600,
                boxShadow: '0 0 20px rgba(255, 215, 0, 0.3)',
              }}
            >
              {isLastStep ? t('getStarted') : t('next')}
            </Button>
          </Group>
        </Box>

        {/* Hint pointing to feature */}
        {currentStep === 'globe' ? (
          <Text
            size='xs'
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: 'rgba(255, 215, 0, 0.6)',
              textAlign: 'center',
              pointerEvents: 'none',
            }}
          >
            ↑ The Interactive Globe ↑
          </Text>
        ) : currentStep === 'timeline' ? (
          <Text
            size='xs'
            style={{
              position: 'absolute',
              top: '80px',
              right: '1.5rem',
              color: 'rgba(255, 215, 0, 0.6)',
              textAlign: 'center',
              pointerEvents: 'none',
            }}
          >
            ☰ Find "Timeline" in the menu
          </Text>
        ) : currentStep === 'contributions' ? (
          <Text
            size='xs'
            style={{
              position: 'absolute',
              top: '80px',
              right: '1.5rem',
              color: 'rgba(255, 215, 0, 0.6)',
              textAlign: 'center',
              pointerEvents: 'none',
            }}
          >
            ☰ Find "Contributions" in the menu
          </Text>
        ) : null}

        {/* Animation keyframes */}
        <style>{`
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </Box>
    );
  }

  // For spotlight steps (highlighting actual elements)
  if (isSpotlightStep) {
    return (
      <>
        <SpotlightOverlay
          targetElement={effectiveTargetSelector}
          isActive={!isExiting && !isEntering}
        />
        <SpotlightTooltip
          step={currentStep}
          title={t(`steps.${currentStep}.title`)}
          subtitle={t(`steps.${currentStep}.subtitle`)}
          description={t(`steps.${currentStep}.description`)}
          icon={stepConfig.icon}
          targetSelector={effectiveTargetSelector as string}
          position={stepConfig.tooltipPosition}
          isActive={!isExiting && !isEntering}
          isFirstStep={isFirstStep}
          isLastStep={isLastStep}
          currentStepIndex={currentStepIndex}
          totalSteps={ONBOARDING_STEPS.length}
          onNext={handleNext}
          onPrev={prevStep}
          onSkip={handleSkip}
          nextLabel={t('next')}
          backLabel={t('back')}
          skipLabel={t('skip')}
          finishLabel={t('getStarted')}
        />
      </>
    );
  }

  // For full-screen steps (welcome and finale)
  return (
    <Box
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        background:
          'linear-gradient(135deg, #000510 0%, #0a0a1a 50%, #050510 100%)',
        opacity: isExiting ? 0 : isEntering ? 0 : 1,
        transition: 'opacity 0.5s ease-in-out',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Three.js Particle Background */}
      <ParticleScene intensity={1} />

      {/* Skip Button */}
      <Button
        variant='subtle'
        color='gray'
        size='sm'
        leftSection={<IconX size={16} />}
        onClick={handleSkip}
        style={{
          position: 'absolute',
          top: '1.5rem',
          right: '1.5rem',
          zIndex: 10,
          color: 'rgba(255, 255, 255, 0.5)',
          transition: 'color 0.3s ease',
        }}
        styles={{
          root: {
            '&:hover': {
              color: '#fff',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
          },
        }}
      >
        {t('skip')}
      </Button>

      {/* Main Content */}
      <Box
        style={{
          position: 'relative',
          zIndex: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '2rem',
          maxWidth: '600px',
        }}
      >
        {/* Animated Icon */}
        <Box
          style={{
            width: '120px',
            height: '120px',
            marginBottom: '2rem',
            filter: 'drop-shadow(0 0 30px rgba(255, 215, 0, 0.4))',
            animation: 'float 3s ease-in-out infinite',
          }}
        >
          <IconComponent />
        </Box>

        {/* Title */}
        <Title
          order={1}
          style={{
            fontSize: 'clamp(1.8rem, 5vw, 2.5rem)',
            fontWeight: 700,
            color: '#fff',
            marginBottom: '0.5rem',
            textShadow: '0 0 40px rgba(255, 215, 0, 0.3)',
            letterSpacing: '-0.02em',
          }}
        >
          {t(`steps.${currentStep}.title`)}
        </Title>

        {/* Subtitle */}
        <Text
          size='lg'
          style={{
            color: 'rgba(255, 215, 0, 0.9)',
            marginBottom: '1.5rem',
            fontWeight: 500,
          }}
        >
          {t(`steps.${currentStep}.subtitle`)}
        </Text>

        {/* Description */}
        <Text
          size='md'
          style={{
            color: 'rgba(255, 255, 255, 0.7)',
            lineHeight: 1.8,
            maxWidth: '500px',
            marginBottom: '2rem',
          }}
        >
          {t(`steps.${currentStep}.description`)}
        </Text>

        {/* Decorative line */}
        <Box
          style={{
            width: '100px',
            height: '2px',
            background:
              'linear-gradient(90deg, transparent, #ffd700, transparent)',
            marginBottom: '2rem',
          }}
        />
      </Box>

      {/* Progress Indicators */}
      <Group
        gap='sm'
        style={{
          position: 'absolute',
          bottom: '6rem',
          zIndex: 10,
        }}
      >
        {ONBOARDING_STEPS.map((step, index) => (
          <Box
            key={step}
            style={{
              width: index === currentStepIndex ? '24px' : '8px',
              height: '8px',
              borderRadius: '4px',
              background:
                index === currentStepIndex
                  ? 'linear-gradient(90deg, #ffd700, #c9a959)'
                  : index < currentStepIndex
                    ? 'rgba(255, 215, 0, 0.5)'
                    : 'rgba(255, 255, 255, 0.2)',
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              cursor: 'pointer',
            }}
          />
        ))}
      </Group>

      {/* Navigation Button */}
      <Group
        gap='md'
        style={{
          position: 'absolute',
          bottom: '2rem',
          zIndex: 10,
        }}
      >
        <Button
          variant='filled'
          size='md'
          rightSection={<IconArrowRight size={18} />}
          onClick={handleNext}
          style={{
            background: 'linear-gradient(135deg, #ffd700 0%, #c9a959 100%)',
            color: '#000',
            fontWeight: 600,
            padding: '0 2rem',
            transition: 'all 0.3s ease',
            boxShadow: '0 0 30px rgba(255, 215, 0, 0.3)',
          }}
          styles={{
            root: {
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 0 40px rgba(255, 215, 0, 0.5)',
              },
            },
          }}
        >
          {currentStep === 'welcome' ? t('beginTour') : t('getStarted')}
        </Button>
      </Group>

      {/* Keyboard hint - only show on desktop */}
      {!isMobile ? (
        <Text
          size='xs'
          style={{
            position: 'absolute',
            bottom: '0.5rem',
            color: 'rgba(255, 255, 255, 0.3)',
            zIndex: 10,
          }}
        >
          {t('keyboardHint')}
        </Text>
      ) : null}

      {/* Float animation keyframes */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </Box>
  );
};
