'use client';

import { Box } from '@mantine/core';
import type { CSSProperties } from 'react';

const iconStyle: CSSProperties = {
  width: '100%',
  height: '100%',
};

export const ScrollIcon = () => (
  <Box component='svg' viewBox='0 0 64 64' style={iconStyle}>
    <defs>
      <linearGradient id='scrollGrad' x1='0%' y1='0%' x2='100%' y2='100%'>
        <stop offset='0%' stopColor='#ffd700' />
        <stop offset='100%' stopColor='#c9a959' />
      </linearGradient>
    </defs>
    <path
      d='M12 8c0-2.2 1.8-4 4-4h8v56h-8c-2.2 0-4-1.8-4-4V8z'
      fill='url(#scrollGrad)'
      opacity='0.8'
    />
    <path
      d='M24 4h24c2.2 0 4 1.8 4 4v48c0 2.2-1.8 4-4 4H24V4z'
      fill='#f5e6c8'
    />
    <path
      d='M28 16h16M28 24h16M28 32h12M28 40h14M28 48h10'
      stroke='#8b7355'
      strokeWidth='2'
      strokeLinecap='round'
    />
    <circle cx='48' cy='8' r='6' fill='url(#scrollGrad)' />
    <circle cx='48' cy='56' r='6' fill='url(#scrollGrad)' />
  </Box>
);

export const GlobeIcon = () => (
  <Box component='svg' viewBox='0 0 64 64' style={iconStyle}>
    <defs>
      <linearGradient id='globeGrad' x1='0%' y1='0%' x2='100%' y2='100%'>
        <stop offset='0%' stopColor='#4a9eff' />
        <stop offset='50%' stopColor='#2d5a87' />
        <stop offset='100%' stopColor='#1a3a5c' />
      </linearGradient>
      <radialGradient id='globeGlow' cx='30%' cy='30%' r='70%'>
        <stop offset='0%' stopColor='rgba(74, 158, 255, 0.4)' />
        <stop offset='100%' stopColor='rgba(74, 158, 255, 0)' />
      </radialGradient>
    </defs>
    <circle cx='32' cy='32' r='28' fill='url(#globeGrad)' />
    <circle cx='32' cy='32' r='28' fill='url(#globeGlow)' />
    <ellipse
      cx='32'
      cy='32'
      rx='28'
      ry='10'
      fill='none'
      stroke='rgba(255,255,255,0.3)'
      strokeWidth='1'
    />
    <ellipse
      cx='32'
      cy='32'
      rx='14'
      ry='28'
      fill='none'
      stroke='rgba(255,255,255,0.3)'
      strokeWidth='1'
    />
    <path d='M4 32 h56' stroke='rgba(255,255,255,0.2)' strokeWidth='1' />
    <path d='M32 4 v56' stroke='rgba(255,255,255,0.2)' strokeWidth='1' />
    {/* Landmasses */}
    <path
      d='M18 20c4-2 8 1 12 0s6-3 10-1c2 1 4 4 2 6s-4 2-6 4c-2 2-1 5-4 6s-8-1-10-3c-2-2-1-5-4-6s-2-4 0-6z'
      fill='#3d8b40'
      opacity='0.7'
    />
    <path
      d='M24 38c3-1 6 2 9 1s4-2 7 0c2 1 3 4 1 5s-5 1-7 2c-2 1-4 3-7 2s-4-3-6-4c-1-1 0-4 3-6z'
      fill='#3d8b40'
      opacity='0.7'
    />
  </Box>
);

export const TimelineIcon = () => (
  <Box component='svg' viewBox='0 0 64 64' style={iconStyle}>
    <defs>
      <linearGradient id='timeGrad' x1='0%' y1='0%' x2='0%' y2='100%'>
        <stop offset='0%' stopColor='#ffd700' />
        <stop offset='100%' stopColor='#c9a959' />
      </linearGradient>
    </defs>
    {/* Main timeline line */}
    <path
      d='M12 8 L12 56'
      stroke='url(#timeGrad)'
      strokeWidth='3'
      strokeLinecap='round'
    />
    {/* Timeline nodes */}
    <circle cx='12' cy='12' r='5' fill='#ffd700'>
      <animate
        attributeName='r'
        values='5;6;5'
        dur='2s'
        repeatCount='indefinite'
      />
    </circle>
    <circle cx='12' cy='28' r='4' fill='#c9a959' />
    <circle cx='12' cy='44' r='4' fill='#8b7355' />
    <circle cx='12' cy='56' r='3' fill='#666' />
    {/* Era cards */}
    <rect
      x='20'
      y='6'
      width='36'
      height='12'
      rx='2'
      fill='rgba(255,215,0,0.2)'
      stroke='#ffd700'
      strokeWidth='1'
    />
    <rect
      x='20'
      y='22'
      width='32'
      height='12'
      rx='2'
      fill='rgba(201,169,89,0.2)'
      stroke='#c9a959'
      strokeWidth='1'
    />
    <rect
      x='20'
      y='38'
      width='28'
      height='12'
      rx='2'
      fill='rgba(139,115,85,0.2)'
      stroke='#8b7355'
      strokeWidth='1'
    />
    {/* Text lines */}
    <path d='M24 12 h28' stroke='rgba(255,255,255,0.5)' strokeWidth='1.5' />
    <path d='M24 28 h24' stroke='rgba(255,255,255,0.4)' strokeWidth='1.5' />
    <path d='M24 44 h20' stroke='rgba(255,255,255,0.3)' strokeWidth='1.5' />
  </Box>
);

export const QuillIcon = () => (
  <Box component='svg' viewBox='0 0 64 64' style={iconStyle}>
    <defs>
      <linearGradient id='quillGrad' x1='0%' y1='0%' x2='100%' y2='100%'>
        <stop offset='0%' stopColor='#fff' />
        <stop offset='50%' stopColor='#e8e0d0' />
        <stop offset='100%' stopColor='#c9a959' />
      </linearGradient>
      <linearGradient id='inkGrad' x1='0%' y1='0%' x2='100%' y2='100%'>
        <stop offset='0%' stopColor='#4a9eff' />
        <stop offset='100%' stopColor='#1a3a5c' />
      </linearGradient>
    </defs>
    {/* Feather */}
    <path
      d='M48 4 C40 12 35 20 30 30 C25 40 20 50 16 56 L14 54 C18 48 22 38 26 28 C30 18 36 10 44 4 C46 2 50 2 48 4 Z'
      fill='url(#quillGrad)'
    />
    {/* Feather details */}
    <path
      d='M46 8 C38 16 32 26 26 38'
      stroke='rgba(139,115,85,0.4)'
      strokeWidth='1'
      fill='none'
    />
    <path
      d='M44 12 C36 20 30 30 24 42'
      stroke='rgba(139,115,85,0.3)'
      strokeWidth='1'
      fill='none'
    />
    {/* Quill tip */}
    <path d='M16 56 L12 60 L14 54 Z' fill='#333' />
    {/* Ink trail */}
    <path
      d='M12 60 Q14 58 16 60 T20 58 T24 60'
      stroke='url(#inkGrad)'
      strokeWidth='2'
      fill='none'
      strokeLinecap='round'
    >
      <animate
        attributeName='stroke-dasharray'
        values='0,100;100,0'
        dur='2s'
        repeatCount='indefinite'
      />
    </path>
  </Box>
);

export const CompassIcon = () => (
  <Box component='svg' viewBox='0 0 64 64' style={iconStyle}>
    <defs>
      <linearGradient id='compassGrad' x1='0%' y1='0%' x2='100%' y2='100%'>
        <stop offset='0%' stopColor='#ffd700' />
        <stop offset='100%' stopColor='#c9a959' />
      </linearGradient>
      <linearGradient id='needleGrad' x1='0%' y1='0%' x2='0%' y2='100%'>
        <stop offset='0%' stopColor='#ff4444' />
        <stop offset='50%' stopColor='#cc0000' />
        <stop offset='50%' stopColor='#ffffff' />
        <stop offset='100%' stopColor='#cccccc' />
      </linearGradient>
    </defs>
    {/* Outer ring */}
    <circle
      cx='32'
      cy='32'
      r='28'
      fill='none'
      stroke='url(#compassGrad)'
      strokeWidth='3'
    />
    <circle
      cx='32'
      cy='32'
      r='24'
      fill='rgba(0,0,0,0.5)'
      stroke='rgba(255,215,0,0.3)'
      strokeWidth='1'
    />
    {/* Direction markers */}
    <text
      x='32'
      y='14'
      textAnchor='middle'
      fill='#ffd700'
      fontSize='8'
      fontWeight='bold'
    >
      N
    </text>
    <text
      x='32'
      y='56'
      textAnchor='middle'
      fill='rgba(255,255,255,0.5)'
      fontSize='7'
    >
      S
    </text>
    <text
      x='10'
      y='35'
      textAnchor='middle'
      fill='rgba(255,255,255,0.5)'
      fontSize='7'
    >
      W
    </text>
    <text
      x='54'
      y='35'
      textAnchor='middle'
      fill='rgba(255,255,255,0.5)'
      fontSize='7'
    >
      E
    </text>
    {/* Compass needle */}
    <g transform='rotate(0, 32, 32)'>
      <path d='M32 12 L36 32 L32 36 L28 32 Z' fill='#ff4444' />
      <path d='M32 52 L36 32 L32 28 L28 32 Z' fill='#cccccc' />
      <animateTransform
        attributeName='transform'
        type='rotate'
        from='0 32 32'
        to='-15 32 32'
        dur='3s'
        repeatCount='indefinite'
        values='0 32 32;-15 32 32;0 32 32;10 32 32;0 32 32'
        keyTimes='0;0.25;0.5;0.75;1'
      />
    </g>
    {/* Center pin */}
    <circle cx='32' cy='32' r='4' fill='url(#compassGrad)' />
    <circle cx='32' cy='32' r='2' fill='#333' />
  </Box>
);

export const OnboardingIcons = {
  scroll: ScrollIcon,
  globe: GlobeIcon,
  timeline: TimelineIcon,
  quill: QuillIcon,
  compass: CompassIcon,
};
