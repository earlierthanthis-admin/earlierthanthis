'use client';

import { Box, Button, Group, Text, Title } from '@mantine/core';
import { IconArrowLeft, IconArrowRight, IconX } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

import type { OnboardingStep } from '@/src/types/onboarding.types';

import { OnboardingIcons } from './onboarding-icons';

type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

interface SpotlightTooltipProps {
  step: OnboardingStep;
  title: string;
  subtitle: string;
  description: string;
  icon: 'scroll' | 'globe' | 'timeline' | 'quill' | 'compass';
  targetSelector: string;
  position: TooltipPosition;
  isActive: boolean;
  isFirstStep: boolean;
  isLastStep: boolean;
  currentStepIndex: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
  onSkip: () => void;
  nextLabel: string;
  backLabel: string;
  skipLabel: string;
  finishLabel: string;
}

const getTooltipStyles = (
  position: TooltipPosition,
  targetRect: DOMRect | null,
) => {
  if (!targetRect) {
    return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
  }

  const tooltipWidth = 380;
  const tooltipHeight = 320;
  const minOffset = 100; // Minimum distance from target to avoid overlap

  // For elements near the top of the screen (like navbar), position tooltip in center-bottom area
  const isNearTop = targetRect.top < 150;

  if (isNearTop) {
    // Position tooltip in the center of the viewport, below the target
    return {
      top: Math.max(targetRect.bottom + minOffset, 180),
      left: Math.max(
        20,
        Math.min(
          window.innerWidth / 2 - tooltipWidth / 2,
          window.innerWidth - tooltipWidth - 20,
        ),
      ),
      transform: 'none',
    };
  }

  const offset = 24;

  switch (position) {
    case 'bottom':
      return {
        top: targetRect.bottom + offset,
        left: Math.max(
          20,
          Math.min(
            targetRect.left + targetRect.width / 2 - tooltipWidth / 2,
            window.innerWidth - tooltipWidth - 20,
          ),
        ),
        transform: 'none',
      };
    case 'top':
      return {
        top: targetRect.top - tooltipHeight - offset,
        left: Math.max(
          20,
          Math.min(
            targetRect.left + targetRect.width / 2 - tooltipWidth / 2,
            window.innerWidth - tooltipWidth - 20,
          ),
        ),
        transform: 'none',
      };
    case 'right':
      return {
        top: Math.max(
          20,
          Math.min(
            targetRect.top + targetRect.height / 2 - tooltipHeight / 2,
            window.innerHeight - tooltipHeight - 20,
          ),
        ),
        left: targetRect.right + offset,
        transform: 'none',
      };
    case 'left':
      return {
        top: Math.max(
          20,
          Math.min(
            targetRect.top + targetRect.height / 2 - tooltipHeight / 2,
            window.innerHeight - tooltipHeight - 20,
          ),
        ),
        left: targetRect.left - tooltipWidth - offset,
        transform: 'none',
      };
    default:
      return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
  }
};

export const SpotlightTooltip = ({
  title,
  subtitle,
  description,
  icon,
  targetSelector,
  position,
  isActive,
  isFirstStep,
  isLastStep,
  currentStepIndex,
  totalSteps,
  onNext,
  onPrev,
  onSkip,
  nextLabel,
  backLabel,
  skipLabel,
  finishLabel,
}: SpotlightTooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

  const IconComponent = OnboardingIcons[icon];

  // Check if target is near top of screen (navbar items)
  const isNearTop = targetRect ? targetRect.top < 150 : false;

  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => setIsVisible(true), 300);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [isActive]);

  useEffect(() => {
    if (!targetSelector || !isActive) return;

    const updateRect = () => {
      const element = document.querySelector(targetSelector);
      if (element) {
        setTargetRect(element.getBoundingClientRect());
      }
    };

    updateRect();
    window.addEventListener('resize', updateRect);
    window.addEventListener('scroll', updateRect);

    return () => {
      window.removeEventListener('resize', updateRect);
      window.removeEventListener('scroll', updateRect);
    };
  }, [targetSelector, isActive]);

  if (!isActive) return null;

  const tooltipStyles = getTooltipStyles(position, targetRect);

  return (
    <Box
      style={{
        position: 'fixed',
        ...tooltipStyles,
        width: '380px',
        zIndex: 10000,
        opacity: isVisible ? 1 : 0,
        transform:
          `${tooltipStyles.transform || ''} ${isVisible ? 'translateY(0)' : 'translateY(10px)'}`.trim(),
        transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Glass card */}
      <Box
        style={{
          background:
            'linear-gradient(135deg, rgba(15, 15, 35, 0.95) 0%, rgba(5, 5, 20, 0.98) 100%)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 215, 0, 0.2)',
          borderRadius: '16px',
          padding: '1.5rem',
          boxShadow: `
            0 25px 50px -12px rgba(0, 0, 0, 0.5),
            0 0 40px rgba(255, 215, 0, 0.1)
          `,
        }}
      >
        {/* Skip button */}
        <Button
          variant='subtle'
          color='gray'
          size='xs'
          leftSection={<IconX size={14} />}
          onClick={onSkip}
          style={{
            position: 'absolute',
            top: '0.75rem',
            right: '0.75rem',
            color: 'rgba(255, 255, 255, 0.4)',
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
          {skipLabel}
        </Button>

        {/* Icon */}
        <Box
          style={{
            width: '56px',
            height: '56px',
            marginBottom: '1rem',
            filter: 'drop-shadow(0 0 20px rgba(255, 215, 0, 0.3))',
          }}
        >
          <IconComponent />
        </Box>

        {/* Content */}
        <Title
          order={3}
          style={{
            fontSize: '1.25rem',
            fontWeight: 700,
            color: '#fff',
            marginBottom: '0.25rem',
            textShadow: '0 0 20px rgba(255, 215, 0, 0.2)',
          }}
        >
          {title}
        </Title>

        <Text
          size='sm'
          style={{
            color: 'rgba(255, 215, 0, 0.9)',
            marginBottom: '0.75rem',
            fontWeight: 500,
          }}
        >
          {subtitle}
        </Text>

        <Text
          size='sm'
          style={{
            color: 'rgba(255, 255, 255, 0.7)',
            lineHeight: 1.7,
            marginBottom: '1.25rem',
          }}
        >
          {description}
        </Text>

        {/* Progress dots */}
        <Group gap='xs' mb='md' justify='center'>
          {Array.from(
            { length: totalSteps },
            (unused, stepIndex) => `progress-dot-${stepIndex}`,
          ).map((dotId, stepIndex) => (
            <Box
              key={dotId}
              style={{
                width: stepIndex === currentStepIndex ? '20px' : '6px',
                height: '6px',
                borderRadius: '3px',
                background:
                  stepIndex === currentStepIndex
                    ? 'linear-gradient(90deg, #ffd700, #c9a959)'
                    : stepIndex < currentStepIndex
                      ? 'rgba(255, 215, 0, 0.5)'
                      : 'rgba(255, 255, 255, 0.2)',
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </Group>

        {/* Navigation buttons */}
        <Group gap='sm' justify='space-between'>
          <Button
            variant='subtle'
            color='gray'
            size='sm'
            leftSection={<IconArrowLeft size={16} />}
            onClick={onPrev}
            disabled={isFirstStep}
            style={{
              opacity: isFirstStep ? 0.3 : 1,
              color: 'rgba(255, 255, 255, 0.7)',
            }}
            styles={{
              root: {
                '&:hover:not(:disabled)': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: '#fff',
                },
              },
            }}
          >
            {backLabel}
          </Button>

          <Button
            variant='filled'
            size='sm'
            rightSection={!isLastStep && <IconArrowRight size={16} />}
            onClick={onNext}
            style={{
              background: 'linear-gradient(135deg, #ffd700 0%, #c9a959 100%)',
              color: '#000',
              fontWeight: 600,
              boxShadow: '0 0 20px rgba(255, 215, 0, 0.3)',
            }}
            styles={{
              root: {
                '&:hover': {
                  transform: 'translateY(-1px)',
                  boxShadow: '0 0 30px rgba(255, 215, 0, 0.4)',
                },
              },
            }}
          >
            {isLastStep ? finishLabel : nextLabel}
          </Button>
        </Group>
      </Box>

      {/* Arrow pointer - hidden for navbar items since tooltip is positioned away */}
      {!isNearTop && (
        <Box
          style={{
            position: 'absolute',
            width: '16px',
            height: '16px',
            background:
              'linear-gradient(135deg, rgba(15, 15, 35, 0.95) 0%, rgba(5, 5, 20, 0.98) 100%)',
            border: '1px solid rgba(255, 215, 0, 0.2)',
            transform: 'rotate(45deg)',
            ...(position === 'bottom' && {
              top: '-8px',
              left: '50%',
              marginLeft: '-8px',
              borderRight: 'none',
              borderBottom: 'none',
            }),
            ...(position === 'top' && {
              bottom: '-8px',
              left: '50%',
              marginLeft: '-8px',
              borderLeft: 'none',
              borderTop: 'none',
            }),
            ...(position === 'left' && {
              right: '-8px',
              top: '50%',
              marginTop: '-8px',
              borderLeft: 'none',
              borderBottom: 'none',
            }),
            ...(position === 'right' && {
              left: '-8px',
              top: '50%',
              marginTop: '-8px',
              borderRight: 'none',
              borderTop: 'none',
            }),
          }}
        />
      )}
    </Box>
  );
};
