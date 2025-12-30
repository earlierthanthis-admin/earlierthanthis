'use client';

import { Box } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { scaleSequentialSqrt } from 'd3-scale';
import { interpolateYlOrRd } from 'd3-scale-chromatic';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { GlobeMethods } from 'react-globe.gl';

import { GLOBE_IMAGE_URL, NIGHT_SKY_IMAGE_URL } from '@/src/constants';
import { getCountryByIso } from '@/src/data/mock/countries';

const GlobeGL = dynamic(() => import('react-globe.gl'), { ssr: false });

type CountryFeature = {
  properties: {
    ISO_A2: string;
    ADMIN: string;
    POP_EST: number;
    GDP_MD_EST: number;
  };
  geometry: {
    type: string;
    coordinates: number[][][] | number[][][][];
  };
};

type GeoJson = {
  features: CountryFeature[];
};

// Convert country name to URL slug
function createCountrySlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-');
}

// Calculate centroid of country geometry
function getCountryCentroid(feature: CountryFeature): {
  lat: number;
  lng: number;
} {
  const { geometry } = feature;
  let totalLat = 0;
  let totalLng = 0;
  let count = 0;

  const processCoords = (coords: number[][]) => {
    for (const [lng, lat] of coords) {
      totalLng += lng;
      totalLat += lat;
      count++;
    }
  };

  if (geometry.type === 'Polygon') {
    for (const ring of geometry.coordinates as number[][][]) {
      processCoords(ring);
    }
  } else if (geometry.type === 'MultiPolygon') {
    for (const polygon of geometry.coordinates as number[][][][]) {
      for (const ring of polygon) {
        processCoords(ring);
      }
    }
  }

  return {
    lat: count > 0 ? totalLat / count : 0,
    lng: count > 0 ? totalLng / count : 0,
  };
}

export const Globe = () => {
  const router = useRouter();
  const t = useTranslations('globe');
  const isMobile = useMediaQuery('(max-width: 768px)');

  const [countries, setCountries] = useState<GeoJson>({ features: [] });
  const [hovered, setHovered] = useState<object | null>(null);
  const [isZooming, setIsZooming] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  useEffect(() => {
    fetch('/datasets/ne_110m_admin_0_countries.geojson')
      .then((response) => response.json())
      .then((data) => setCountries(data))
      .catch(() => {
        // Failed to load country data - silently fail for now
      });
  }, []);

  const colorScale = scaleSequentialSqrt(interpolateYlOrRd);

  const getValue = (feat: CountryFeature) =>
    feat.properties.GDP_MD_EST / Math.max(1e5, feat.properties.POP_EST);

  const maxValue = useMemo(
    () =>
      countries.features.length
        ? Math.max(...countries.features.map(getValue))
        : 0,
    [countries],
  );

  colorScale.domain([0, maxValue || 1]);

  const globeReference = useRef<GlobeMethods | undefined>(undefined);
  const [isGlobeReady, setIsGlobeReady] = useState(false);

  // Set camera altitude based on screen size
  const updateCameraAltitude = useCallback(() => {
    if (globeReference.current && !isZooming) {
      const altitude = isMobile ? 4.8 : 2.5;
      globeReference.current.pointOfView({ altitude });
    }
  }, [isMobile, isZooming]);

  // When globe becomes ready, set initial altitude
  useEffect(() => {
    if (isGlobeReady) {
      updateCameraAltitude();
    }
  }, [isGlobeReady, updateCameraAltitude]);

  // Update altitude when isMobile changes (after globe is ready)
  useEffect(() => {
    if (isGlobeReady) {
      updateCameraAltitude();
    }
  }, [isMobile, isGlobeReady, updateCameraAltitude]);

  const handleGlobeReady = useCallback(() => {
    setIsGlobeReady(true);
  }, []);

  // Handle country click - zoom and navigate
  const handleCountryClick = useCallback(
    (polygon: object | null) => {
      if (isZooming || !polygon || !globeReference.current) return;

      const feature = polygon as CountryFeature;
      const { ADMIN: countryName, ISO_A2: isoCode } = feature.properties;

      // Skip Antarctica
      if (isoCode === 'AQ') return;

      setIsZooming(true);
      setSelectedCountry(isoCode);

      // Get country centroid for camera position
      const centroid = getCountryCentroid(feature);

      // Zoom into the country with smooth animation
      globeReference.current.pointOfView(
        {
          lat: centroid.lat,
          lng: centroid.lng,
          altitude: 0.8, // Zoomed in altitude
        },
        1500, // 1.5 second transition
      );

      // Navigate after zoom animation completes
      // Use ISO code to get our mock country ID, fallback to slug from name
      const mockCountry = getCountryByIso(isoCode);
      const countrySlug = mockCountry?.id ?? createCountrySlug(countryName);
      setTimeout(() => {
        router.push(`/timeline/${countrySlug}`);
      }, 1600); // Slightly after zoom completes
    },
    [isZooming, router],
  );

  // Get polygon color based on state
  const getPolygonColor = useCallback(
    (d: object) => {
      const feature = d as CountryFeature;
      const { ISO_A2: isoCode } = feature.properties;

      // Highlight selected country
      if (selectedCountry === isoCode) {
        return '#4a9eff';
      }

      // Highlight hovered country
      if (d === hovered) {
        return 'steelblue';
      }

      return colorScale(getValue(feature));
    },
    [hovered, selectedCountry, colorScale],
  );

  return (
    <Box
      style={{
        flex: 1,
        position: 'relative',
        cursor: isZooming ? 'wait' : 'pointer',
      }}
    >
      <GlobeGL
        ref={globeReference}
        onGlobeReady={handleGlobeReady}
        globeImageUrl={GLOBE_IMAGE_URL}
        backgroundImageUrl={NIGHT_SKY_IMAGE_URL}
        lineHoverPrecision={0}
        polygonsData={countries.features.filter(
          (d) => d.properties.ISO_A2 !== 'AQ',
        )}
        polygonAltitude={(d) => {
          const feature = d as CountryFeature;
          if (selectedCountry === feature.properties.ISO_A2) return 0.15;
          if (d === hovered) return 0.12;
          return 0.06;
        }}
        polygonCapColor={getPolygonColor}
        polygonSideColor={() => 'rgba(0, 100, 0, 0.15)'}
        polygonStrokeColor={() => '#111'}
        polygonLabel={(d) => {
          const { properties } = d as CountryFeature;
          return `<div style="padding: 8px; background: rgba(0,0,0,0.8); border-radius: 4px;">
            <b>${properties.ADMIN} (${properties.ISO_A2})</b>
            <div>${t('gdp')}: ${properties.GDP_MD_EST} M$</div>
            <div>${t('population')}: ${properties.POP_EST}</div>
            <div style="margin-top: 4px; color: #4a9eff; font-size: 12px;">${t('clickToExplore')}</div>
          </div>`;
        }}
        onPolygonHover={setHovered}
        onPolygonClick={handleCountryClick}
        polygonsTransitionDuration={300}
      />
    </Box>
  );
};
