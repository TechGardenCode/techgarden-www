import { BooleanInput } from '@angular/cdk/coercion';
import { Directive, booleanAttribute, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { type VariantProps, cva } from 'class-variance-authority';
import type { ClassValue } from 'clsx';
import { buttonVariants, ButtonVariants } from '@seed/button';
import { seed } from '@seed/utils';

export const paginationLinkVariants = cva('', {
	variants: {},
	defaultVariants: {},
});
export type PaginationLinkVariants = VariantProps<typeof paginationLinkVariants>;

@Directive({
	selector: '[seedPaginationLink]',
	hostDirectives: [
		{
			directive: RouterLink,
			inputs: [
				'target',
				'queryParams',
				'fragment',
				'queryParamsHandling',
				'state',
				'info',
				'relativeTo',
				'preserveFragment',
				'skipLocationChange',
				'replaceUrl',
				'routerLink: link',
			],
		},
	],
	host: {
		'[class]': '_computedClass()',
		'[attr.aria-current]': 'isActive() ? "page" : null',
	},
})
export class SeedPaginationLink {
	public readonly userClass = input<ClassValue>('', { alias: 'class' });
	/** Whether the link is active (i.e., the current page). */
	public readonly isActive = input<boolean, BooleanInput>(false, { transform: booleanAttribute });
	/** The size of the button. */
	public readonly size = input<ButtonVariants['size']>('icon');
	/** The link to navigate to the page. */
	public readonly link = input<RouterLink['routerLink']>();

	protected readonly _computedClass = computed(() =>
		seed(
			paginationLinkVariants(),
			this.link() === undefined ? 'cursor-pointer' : '',
			buttonVariants({
				variant: this.isActive() ? 'outline' : 'ghost',
				size: this.size(),
			}),
			this.userClass(),
		),
	);
}
