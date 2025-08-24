import { InjectionToken, ValueProvider, inject } from '@angular/core';
import type { ButtonVariants } from './seed-button';

export interface SeedButtonConfig {
	variant: ButtonVariants['variant'];
	size: ButtonVariants['size'];
}

const defaultConfig: SeedButtonConfig = {
	variant: 'default',
	size: 'default',
};

const SeedButtonConfigToken = new InjectionToken<SeedButtonConfig>('SeedButtonConfig');

export function provideSeedButtonConfig(config: Partial<SeedButtonConfig>): ValueProvider {
	return { provide: SeedButtonConfigToken, useValue: { ...defaultConfig, ...config } };
}

export function injectSeedButtonConfig(): SeedButtonConfig {
	return inject(SeedButtonConfigToken, { optional: true }) ?? defaultConfig;
}
