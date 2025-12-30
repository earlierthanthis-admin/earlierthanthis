'use client';

import { Box, Text, Title } from '@mantine/core';
import { useEffect, useState } from 'react';

import type { OnboardingStep as OnboardingStepType } from '@/src/types/onboarding.types';

import { OnboardingIcons } from './onboarding-icons';

interface OnboardingStepProps {
  step: OnboardingStepType;
  title: string;
  subtitle: string;
  description: string;
  icon: 'scroll' | 'globe' | 'timeline' | 'quill' | 'compass';
  isActive: boolean;
}

export const OnboardingStepContent = ({
  title,
  subtitle,
  description,
  icon,
  isActive,
}: OnboardingStepProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isIconVisible, setIsIconVisible] = useState(false);
  const [isTextVisible, setIsTextVisible] = useState(false);

  const IconComponent = OnboardingIcons[icon];

  useEffect(() => {
    if (isActive) {
      // Staggered animation
      const timer1 = setTimeout(() => setIsVisible(true), 100);
      const timer2 = setTimeout(() => setIsIconVisible(true), 300);
      const timer3 = setTimeout(() => setIsTextVisible(true), 600);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    } else {
      setIsVisible(false);
      setIsIconVisible(false);
      setIsTextVisible(false);
    }
  }, [isActive]);

  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '2rem',
        maxWidth: '600px',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Animated Icon */}
      <Box
        style={{
          width: '120px',
          height: '120px',
          marginBottom: '2rem',
          opacity: isIconVisible ? 1 : 0,
          transform: isIconVisible
            ? 'scale(1) rotate(0deg)'
            : 'scale(0.5) rotate(-10deg)',
          transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
          filter: isIconVisible
            ? 'drop-shadow(0 0 30px rgba(255, 215, 0, 0.4))'
            : 'none',
        }}
      >
        <IconComponent />
      </Box>

      {/* Title with glow effect */}
      <Title
        order={1}
        style={{
          fontSize: 'clamp(1.8rem, 5vw, 2.5rem)',
          fontWeight: 700,
          color: '#fff',
          marginBottom: '0.5rem',
          opacity: isTextVisible ? 1 : 0,
          transform: isTextVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          transitionDelay: '0.1s',
          textShadow: '0 0 40px rgba(255, 215, 0, 0.3)',
          letterSpacing: '-0.02em',
        }}
      >
        {title}
      </Title>

      {/* Subtitle */}
      <Text
        size='lg'
        style={{
          color: 'rgba(255, 215, 0, 0.9)',
          marginBottom: '1.5rem',
          fontWeight: 500,
          opacity: isTextVisible ? 1 : 0,
          transform: isTextVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          transitionDelay: '0.2s',
        }}
      >
        {subtitle}
      </Text>

      {/* Description */}
      <Text
        size='md'
        style={{
          color: 'rgba(255, 255, 255, 0.7)',
          lineHeight: 1.8,
          maxWidth: '500px',
          opacity: isTextVisible ? 1 : 0,
          transform: isTextVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          transitionDelay: '0.3s',
        }}
      >
        {description}
      </Text>

      {/* Decorative line */}
      <Box
        style={{
          width: isTextVisible ? '100px' : '0px',
          height: '2px',
          background:
            'linear-gradient(90deg, transparent, #ffd700, transparent)',
          marginTop: '2rem',
          transition: 'width 1s cubic-bezier(0.16, 1, 0.3, 1)',
          transitionDelay: '0.5s',
        }}
      />
    </Box>
  );
};
