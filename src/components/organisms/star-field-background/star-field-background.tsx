'use client';

import { useMediaQuery } from '@mantine/hooks';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface StarFieldBackgroundProps {
  intensity?: number;
  hasScrollParallax?: boolean;
}

export const StarFieldBackground = ({
  intensity = 0.5,
  hasScrollParallax = true,
}: StarFieldBackgroundProps) => {
  const containerReference = useRef<HTMLDivElement>(null);
  const sceneReference = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    particles: THREE.Points;
    glowParticles: THREE.Points;
    constellationLines: THREE.LineSegments;
    animationId: number;
  } | null>(null);

  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    // Disable on mobile for performance per claude.md guidelines
    if (isMobile || !containerReference.current) return;

    const container = containerReference.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000510, 0.001);

    // Camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 2000);
    camera.position.z = 500;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Create star field particles
    const particleCount = Math.floor(2000 * intensity);
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    const colorPalette = [
      new THREE.Color(0xffd700), // Gold
      new THREE.Color(0xc9a959), // Ancient gold
      new THREE.Color(0x8b7355), // Parchment
      new THREE.Color(0x4a9eff), // Blue accent
      new THREE.Color(0xffffff), // White
    ];

    for (let index = 0; index < particleCount; index++) {
      const index3 = index * 3;
      positions[index3] = (Math.random() - 0.5) * 2000;
      positions[index3 + 1] = (Math.random() - 0.5) * 2000;
      positions[index3 + 2] = (Math.random() - 0.5) * 2000;

      const color =
        colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[index3] = color.r;
      colors[index3 + 1] = color.g;
      colors[index3 + 2] = color.b;

      sizes[index] = Math.random() * 2.5 + 0.5;
    }

    particleGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3),
    );
    particleGeometry.setAttribute(
      'color',
      new THREE.BufferAttribute(colors, 3),
    );
    particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    // Custom shader material for particles
    const particleMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        pixelRatio: { value: renderer.getPixelRatio() },
      },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        uniform float time;
        uniform float pixelRatio;
        
        void main() {
          vColor = color;
          vec3 pos = position;
          
          // Subtle floating motion
          pos.x += sin(time * 0.2 + position.y * 0.008) * 1.5;
          pos.y += cos(time * 0.15 + position.x * 0.008) * 1.5;
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = size * pixelRatio * (280.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        
        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;
          
          float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
          alpha *= 0.7;
          
          gl_FragColor = vec4(vColor, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Create glowing orbs (larger, more prominent particles)
    const glowCount = Math.floor(30 * intensity);
    const glowGeometry = new THREE.BufferGeometry();
    const glowPositions = new Float32Array(glowCount * 3);
    const glowColors = new Float32Array(glowCount * 3);
    const glowSizes = new Float32Array(glowCount);

    for (let index = 0; index < glowCount; index++) {
      const index3 = index * 3;
      glowPositions[index3] = (Math.random() - 0.5) * 1500;
      glowPositions[index3 + 1] = (Math.random() - 0.5) * 1500;
      glowPositions[index3 + 2] = (Math.random() - 0.5) * 1000;

      const color =
        Math.random() > 0.5
          ? new THREE.Color(0xffd700)
          : new THREE.Color(0x4a9eff);
      glowColors[index3] = color.r;
      glowColors[index3 + 1] = color.g;
      glowColors[index3 + 2] = color.b;

      glowSizes[index] = Math.random() * 12 + 6;
    }

    glowGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(glowPositions, 3),
    );
    glowGeometry.setAttribute(
      'color',
      new THREE.BufferAttribute(glowColors, 3),
    );
    glowGeometry.setAttribute('size', new THREE.BufferAttribute(glowSizes, 1));

    const glowMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        pixelRatio: { value: renderer.getPixelRatio() },
      },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        uniform float time;
        uniform float pixelRatio;
        
        void main() {
          vColor = color;
          vec3 pos = position;
          
          // Pulsing and floating motion
          float pulse = sin(time * 1.2 + position.x * 0.008) * 0.25 + 1.0;
          pos.x += sin(time * 0.4 + position.y * 0.015) * 8.0;
          pos.y += cos(time * 0.3 + position.z * 0.015) * 8.0;
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = size * pulse * pixelRatio * (350.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        
        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;
          
          // Soft glow effect
          float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
          alpha = pow(alpha, 2.0) * 0.5;
          
          // Inner bright core
          float core = 1.0 - smoothstep(0.0, 0.15, dist);
          vec3 finalColor = mix(vColor, vec3(1.0), core * 0.4);
          
          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const glowParticles = new THREE.Points(glowGeometry, glowMaterial);
    scene.add(glowParticles);

    // Create constellation-like lines
    const lineCount = 20;
    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(lineCount * 6);
    const lineColors = new Float32Array(lineCount * 6);

    for (let index = 0; index < lineCount; index++) {
      const index6 = index * 6;
      const startX = (Math.random() - 0.5) * 1500;
      const startY = (Math.random() - 0.5) * 1500;
      const startZ = (Math.random() - 0.5) * 800 - 200;

      linePositions[index6] = startX;
      linePositions[index6 + 1] = startY;
      linePositions[index6 + 2] = startZ;
      linePositions[index6 + 3] = startX + (Math.random() - 0.5) * 180;
      linePositions[index6 + 4] = startY + (Math.random() - 0.5) * 180;
      linePositions[index6 + 5] = startZ + (Math.random() - 0.5) * 80;

      const alpha = Math.random() * 0.25 + 0.1;
      lineColors[index6] = 0.8;
      lineColors[index6 + 1] = 0.7;
      lineColors[index6 + 2] = 0.4;
      lineColors[index6 + 3] = 0.8 * alpha;
      lineColors[index6 + 4] = 0.7 * alpha;
      lineColors[index6 + 5] = 0.4 * alpha;
    }

    lineGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(linePositions, 3),
    );
    lineGeometry.setAttribute(
      'color',
      new THREE.BufferAttribute(lineColors, 3),
    );

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending,
    });

    const constellationLines = new THREE.LineSegments(
      lineGeometry,
      lineMaterial,
    );
    scene.add(constellationLines);

    // Animation
    let time = 0;
    let scrollY = 0;

    const handleScroll = () => {
      if (hasScrollParallax) {
        scrollY = window.scrollY;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const animate = () => {
      time += 0.012;

      (particleMaterial.uniforms.time as { value: number }).value = time;
      (glowMaterial.uniforms.time as { value: number }).value = time;

      // Slow rotation
      particles.rotation.y += 0.00015;
      particles.rotation.x += 0.00008;
      glowParticles.rotation.y -= 0.00008;
      constellationLines.rotation.y += 0.00008;

      // Scroll parallax effect
      if (hasScrollParallax) {
        particles.position.y = scrollY * 0.08;
        glowParticles.position.y = scrollY * 0.05;
        camera.position.y = -scrollY * 0.03;
      }

      // Camera subtle movement
      camera.position.x = Math.sin(time * 0.08) * 15;
      camera.position.y += Math.cos(time * 0.06) * 0.1;

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
      glowParticles,
      constellationLines,
      animationId: 0,
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerReference.current || !sceneReference.current) return;

      const newWidth = containerReference.current.clientWidth;
      const newHeight = containerReference.current.clientHeight;

      sceneReference.current.camera.aspect = newWidth / newHeight;
      sceneReference.current.camera.updateProjectionMatrix();
      sceneReference.current.renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      if (sceneReference.current) {
        cancelAnimationFrame(sceneReference.current.animationId);
        sceneReference.current.renderer.dispose();
        if (container.contains(sceneReference.current.renderer.domElement)) {
          container.removeChild(sceneReference.current.renderer.domElement);
        }
      }
    };
  }, [intensity, isMobile, hasScrollParallax]);

  // Don't render on mobile for performance
  if (isMobile) {
    return null;
  }

  return (
    <div
      ref={containerReference}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
};
