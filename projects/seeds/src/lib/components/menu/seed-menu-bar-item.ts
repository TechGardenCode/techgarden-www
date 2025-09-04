import { Directive, computed, input } from '@angular/core';
import { seed } from '@seed/utils';
import type { ClassValue } from 'clsx';
import { SeedMenuItem } from './seed-menu-item';

@Directive({
	selector: '[seedMenuBarItem]',
	host: {
		'[class]': '_computedClass()',
	},
	hostDirectives: [SeedMenuItem],
})
export class SeedMenuBarItem {
	public readonly userClass = input<ClassValue>('', { alias: 'class' });
	protected readonly _computedClass = computed(() =>
		seed(
			'focus:bg-accent focus:text-accent-foreground aria-expanded:bg-accent aria-expanded:text-accent-foreground flex select-none items-center rounded-sm px-2 py-1 text-sm font-medium outline-none',
			this.userClass(),
		),
	);
}
