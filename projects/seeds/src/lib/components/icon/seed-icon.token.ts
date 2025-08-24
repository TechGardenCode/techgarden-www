import { InjectionToken, ValueProvider, inject } from '@angular/core';
import type { IconSize } from './seed-icon';

export interface SeedIconConfig {
  size: IconSize;
}

const defaultConfig: SeedIconConfig = {
  size: 'base',
};

const SeedIconConfigToken = new InjectionToken<SeedIconConfig>(
  'SeedIconConfig'
);

export function provideSeedIconConfig(
  config: Partial<SeedIconConfig>
): ValueProvider {
  return {
    provide: SeedIconConfigToken,
    useValue: { ...defaultConfig, ...config },
  };
}

export function injectSeedIconConfig(): SeedIconConfig {
  return inject(SeedIconConfigToken, { optional: true }) ?? defaultConfig;
}
