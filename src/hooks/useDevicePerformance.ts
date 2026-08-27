'use client';

import { useEffect, useState } from 'react';

export type PerformanceTier = 'high' | 'medium' | 'low';

export function useDevicePerformance(): PerformanceTier {
  const [tier, setTier] = useState<PerformanceTier>('high');

  useEffect(() => {
    const width = window.innerWidth;

    // Check device memory (if available)
    const nav = navigator as Navigator & { deviceMemory?: number };
    const memory = nav.deviceMemory ?? 8;

    // Check hardware concurrency
    const cores = navigator.hardwareConcurrency ?? 4;

    if (width < 768 || memory <= 2 || cores <= 2) {
      setTier('low');
    } else if (width < 1024 || memory <= 4 || cores <= 4) {
      setTier('medium');
    } else {
      setTier('high');
    }
  }, []);

  return tier;
}

export function getParticleCount(tier: PerformanceTier): number {
  switch (tier) {
    case 'high':
      return 3000;
    case 'medium':
      return 1200;
    case 'low':
      return 500;
  }
}
