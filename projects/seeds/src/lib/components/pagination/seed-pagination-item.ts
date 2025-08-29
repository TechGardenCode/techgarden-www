import { Directive, computed, input } from '@angular/core';
import { seed } from '@seed/utils/seed';
import { type VariantProps, cva } from 'class-variance-authority';
import type { ClassValue } from 'clsx';

export const paginationItemVariants = cva('', {
	variants: {},
	defaultVariants: {},
});

export type PaginationItemVariants = VariantProps<typeof paginationItemVariants>;

@Directive({
	selector: '[seedPaginationItem]',
	host: {
		'[class]': '_computedClass()',
	},
})
export class SeedPaginationItem {
	public readonly userClass = input<ClassValue>('', { alias: 'class' });
	protected readonly _computedClass = computed(() => seed(paginationItemVariants(), this.userClass()));
}
