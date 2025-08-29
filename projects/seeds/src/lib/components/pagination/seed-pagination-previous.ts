import { BooleanInput } from '@angular/cdk/coercion';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChevronLeft } from '@ng-icons/lucide';
import { ClassValue } from 'clsx';
import { SeedPaginationLink } from './seed-pagination-link';
import { ButtonVariants } from '@seed/button';
import { SeedIcon } from '@seed/icon';
import { seed } from '@seed/utils';

@Component({
	selector: 'seed-pagination-previous',
	imports: [SeedPaginationLink, NgIcon, SeedIcon],
	providers: [provideIcons({ lucideChevronLeft })],
	template: `
		<a
			[class]="_computedClass()"
			seedPaginationLink
			[link]="link()"
			[queryParams]="queryParams()"
			[queryParamsHandling]="queryParamsHandling()"
			[size]="_size()"
			[attr.aria-label]="ariaLabel()"
		>
			<ng-icon seedIcon size="sm" name="lucideChevronLeft" />
			<span [class]="_labelClass()">{{ text() }}</span>
		</a>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeedPaginationPrevious {
	public readonly userClass = input<ClassValue>('', { alias: 'class' });
	/** The link to navigate to the previous page. */
	public readonly link = input<RouterLink['routerLink']>();
	/** The query parameters to pass to the previous page. */
	public readonly queryParams = input<RouterLink['queryParams']>();
	/** How to handle query parameters when navigating to the previous page. */
	public readonly queryParamsHandling = input<RouterLink['queryParamsHandling']>();

	/** The aria-label for the previous page link. */
	public readonly ariaLabel = input<string>('Go to previous page', { alias: 'aria-label' });
	/** The text to display for the previous page link. */
	public readonly text = input<string>('Previous');
	/** Whether the button should only display the icon. */
	public readonly iconOnly = input<boolean, BooleanInput>(false, {
		transform: booleanAttribute,
	});
	protected readonly _labelClass = computed(() => (this.iconOnly() ? 'sr-only' : 'hidden sm:block'));

	protected readonly _size = computed<ButtonVariants['size']>(() => (this.iconOnly() ? 'icon' : 'default'));

	protected readonly _computedClass = computed(() =>
		seed('gap-1', !this.iconOnly() ? 'sm:pl-2.5' : '', this.userClass()),
	);
}
