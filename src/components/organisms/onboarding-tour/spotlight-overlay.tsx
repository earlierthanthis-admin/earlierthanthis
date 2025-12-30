'use client';

import { Box } from '@mantine/core';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface SpotlightOverlayProps {
  targetElement: string | null; // CSS selector for the element to spotlight
  isActive: boolean;
}

export const SpotlightOverlay = ({
  targetElement,
  isActive,
}: SpotlightOverlayProps) => {
  const containerReference = useRef<HTMLDivElement>(null);
  const [spotlightPosition, setSpotlightPosition] = useState({
    x: 50,
    y: 50,
    width: 200,
    height: 200,
  });
  const sceneReference = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    particles: THREE.Points;
    animationId: number;
  } | null>(null);

  // Update spotlight position based on target element
  useEffect(() => {
    if (!targetElement || !isActive) return;

    const updatePosition = () => {
      const element = document.querySelector(targetElement);
      if (element) {
        const rect = element.getBoundingClientRect();
        const padding = 20;
        setSpotlightPosition({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
          width: rect.width + padding * 2,
          height: rect.height + padding * 2,
        });
      }
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, [targetElement, isActive]);

  // Three.js particle effects around spotlight
  useEffect(() => {
    if (!containerReference.current || !isActive) return;

    const container = containerReference.current;
    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 300;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Create ring particles around spotlight
    const particleCount = 200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    for (let index = 0; index < particleCount; index++) {
      const angle = (index / particleCount) * Math.PI * 2;
      const radius = 150 + Math.random() * 50;
      positions[index * 3] = Math.cos(angle) * radius;
      positions[index * 3 + 1] = Math.sin(angle) * radius;
      positions[index * 3 + 2] = (Math.random() - 0.5) * 50;

      // Golden color palette
      const isGolden = Math.random() > 0.3;
      colors[index * 3] = isGolden ? 1.0 : 0.29;
      colors[index * 3 + 1] = isGolden ? 0.84 : 0.62;
      colors[index * 3 + 2] = isGolden ? 0.0 : 1.0;

      sizes[index] = Math.random() * 4 + 2;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        centerX: { value: 0 },
        centerY: { value: 0 },
      },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        uniform float time;
        uniform float centerX;
        uniform float centerY;
        
        void main() {
          vColor = color;
          vec3 pos = position;
          
          // Orbit animation
          float angle = time * 0.5 + atan(position.y, position.x);
          float radius = length(position.xy);
          pos.x = cos(angle) * radius + centerX;
          pos.y = sin(angle) * radius + centerY;
          
          // Pulsing
          float pulse = sin(time * 2.0 + float(gl_VertexID) * 0.1) * 0.3 + 1.0;
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = size * pulse * (200.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        
        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;
          
          float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
          alpha *= 0.8;
          
          gl_FragColor = vec4(vColor, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    let time = 0;
    const animate = () => {
      time += 0.016;
      (material.uniforms.time as { value: number }).value = time;

      // Update center position based on spotlight
      const centerX = (spotlightPosition.x - width / 2) * 0.5;
      const centerY = -(spotlightPosition.y - height / 2) * 0.5;
      (material.uniforms.centerX as { value: number }).value = centerX;
      (material.uniforms.centerY as { value: number }).value = centerY;

      renderer.render(scene, camera);
      if (sceneReference.current) {
        sceneReference.current.animationId = requestAnimationFrame(animate);
      }
    };

    sceneReference.current = {
      scene,
      camera,
      renderer,
      particles,
      animationId: 0,
    };
    animate();

    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (sceneReference.current) {
        cancelAnimationFrame(sceneReference.current.animationId);
        renderer.dispose();
        container.removeChild(renderer.domElement);
      }
    };
  }, [isActive, spotlightPosition.x, spotlightPosition.y]);

  if (!isActive) return null;

  return (
    <>
      {/* Dark overlay with spotlight cutout */}
      <Box
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 9998,
          pointerEvents: 'none',
          background: `radial-gradient(
            ellipse ${spotlightPosition.width}px ${spotlightPosition.height}px 
            at ${spotlightPosition.x}px ${spotlightPosition.y}px,
            transparent 0%,
            transparent 70%,
            rgba(0, 0, 0, 0.85) 100%
          )`,
          transition: 'background 0.5s ease-in-out',
        }}
      />

      {/* Spotlight ring glow */}
      <Box
        style={{
          position: 'fixed',
          left: spotlightPosition.x - spotlightPosition.width / 2 - 4,
          top: spotlightPosition.y - spotlightPosition.height / 2 - 4,
          width: spotlightPosition.width + 8,
          height: spotlightPosition.height + 8,
          borderRadius: '16px',
          border: '2px solid rgba(255, 215, 0, 0.5)',
          boxShadow: `
            0 0 20px rgba(255, 215, 0, 0.3),
            0 0 40px rgba(255, 215, 0, 0.2),
            inset 0 0 20px rgba(255, 215, 0, 0.1)
          `,
          zIndex: 9999,
          pointerEvents: 'none',
          transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />

      {/* Three.js particle container */}
      <div
        ref={containerReference}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 9997,
          pointerEvents: 'none',
        }}
      />
    </>
  );
};
