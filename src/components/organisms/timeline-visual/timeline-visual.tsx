'use client';

import { Box, Stack, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useTranslations } from 'next-intl';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

import { TimelineConnector } from '@/src/components/atoms';
import { TimelineCard } from '@/src/components/molecules';
import type { TimelineEvent } from '@/src/types';

interface TimelineVisualProps {
  events: TimelineEvent[];
  countryId: string;
}

const SIDEBAR_WIDTH = 280;
const TABLET_SIDEBAR_WIDTH = 240;

export const TimelineVisual = ({ events, countryId }: TimelineVisualProps) => {
  const t = useTranslations('timeline.page');
  const canvasReference = useRef<HTMLDivElement>(null);
  const rendererReference = useRef<THREE.WebGLRenderer | null>(null);
  const animationIdReference = useRef<number>(0);

  // Responsive breakpoints
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)');
  const sidebarOffset = isMobile
    ? 0
    : isTablet
      ? TABLET_SIDEBAR_WIDTH
      : SIDEBAR_WIDTH;

  // Three.js background effect
  useEffect(() => {
    if (!canvasReference.current) return;

    const container = canvasReference.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 30;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    rendererReference.current = renderer;

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 200;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let index = 0; index < particleCount * 3; index += 3) {
      positions[index] = (Math.random() - 0.5) * 100;
      positions[index + 1] = (Math.random() - 0.5) * 100;
      positions[index + 2] = (Math.random() - 0.5) * 50;

      // Blue-ish colors
      colors[index] = 0.3 + Math.random() * 0.2;
      colors[index + 1] = 0.5 + Math.random() * 0.3;
      colors[index + 2] = 0.9 + Math.random() * 0.1;
    }

    particlesGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3),
    );
    particlesGeometry.setAttribute(
      'color',
      new THREE.BufferAttribute(colors, 3),
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Create glowing line (timeline spine)
    const spineGeometry = new THREE.BufferGeometry();
    const spinePoints = [
      new THREE.Vector3(0, 50, 0),
      new THREE.Vector3(0, -50, 0),
    ];
    spineGeometry.setFromPoints(spinePoints);

    const spineMaterial = new THREE.LineBasicMaterial({
      color: 0x4a9eff,
      transparent: true,
      opacity: 0.3,
    });

    const spine = new THREE.Line(spineGeometry, spineMaterial);
    scene.add(spine);

    // Animation
    let scrollY = 0;
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const animate = () => {
      animationIdReference.current = requestAnimationFrame(animate);

      // Rotate particles slowly
      particles.rotation.y += 0.0003;
      particles.rotation.x += 0.0001;

      // Parallax effect based on scroll
      particles.position.y = scrollY * 0.01;
      camera.position.y = -scrollY * 0.005;

      renderer.render(scene, camera);
    };
    animate();

    // Resize handler
    const handleResize = () => {
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationIdReference.current);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  if (events.length === 0) {
    return (
      <Box py='xl' ta='center'>
        <Text size='lg' c='dimmed'>
          {t('noEvents')}
        </Text>
      </Box>
    );
  }

  return (
    <Box style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Three.js canvas background - hidden on mobile for performance */}
      {!isMobile ? (
        <Box
          ref={canvasReference}
          style={{
            position: 'fixed',
            top: 0,
            left: sidebarOffset,
            right: 0,
            bottom: 0,
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
      ) : null}

      {/* Timeline cards */}
      <Stack
        gap={0}
        style={{
          position: 'relative',
          zIndex: 1,
          paddingTop: '2rem',
          paddingBottom: '4rem',
        }}
      >
        {events.map((event, index) => (
          <Box key={event.year}>
            <TimelineCard
              year={event.year}
              essays={event.essays}
              countryId={countryId}
              era={event.era}
              isMajorEvent={event.isMajorEvent}
            />
            {index < events.length - 1 && (
              <Box pl={11}>
                <TimelineConnector height={40} />
              </Box>
            )}
          </Box>
        ))}
      </Stack>
    </Box>
  );
};
