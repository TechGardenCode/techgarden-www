import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideEllipsis } from '@ng-icons/lucide';
import type { ClassValue } from 'clsx';
import { SeedIcon } from '@seed/components/icon/seed-icon';
import { seed } from '@seed/utils/seed';

@Component({
	selector: 'seed-pagination-ellipsis',
	imports: [NgIcon, SeedIcon],
	providers: [provideIcons({ lucideEllipsis })],
	template: `
		<span [class]="_computedClass()">
			<ng-icon seedIcon size="sm" name="lucideEllipsis" />
			<span class="sr-only">{{ srOnlyText() }}</span>
		</span>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeedPaginationEllipsis {
	public readonly userClass = input<ClassValue>('', { alias: 'class' });
	/** Screen reader only text for the ellipsis */
	public readonly srOnlyText = input<string>('More pages');

	protected readonly _computedClass = computed(() => seed('flex size-9 items-center justify-center', this.userClass()));
}
