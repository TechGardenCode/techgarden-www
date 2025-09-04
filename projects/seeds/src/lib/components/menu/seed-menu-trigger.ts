import { CdkMenuTrigger } from '@angular/cdk/menu';
import { Directive, effect, inject, input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { getSeedMenuAlign, SeedMenuAlign } from './seed-menu-align';

@Directive({
	selector: '[seedMenuTriggerFor]',
	hostDirectives: [
		{
			directive: CdkMenuTrigger,
			inputs: ['cdkMenuTriggerFor: seedMenuTriggerFor', 'cdkMenuTriggerData: seedMenuTriggerData'],
			outputs: ['cdkMenuOpened: seedMenuOpened', 'cdkMenuClosed: seedMenuClosed'],
		},
	],
})
export class SeedMenuTrigger {
	private readonly _cdkTrigger = inject(CdkMenuTrigger, { host: true });
	public readonly align = input<SeedMenuAlign>(undefined);

	constructor() {
		// once the trigger opens we wait until the next tick and then grab the last position
		// used to position the menu. we store this in our trigger which the seedMenu directive has
		// access to through DI
		this._cdkTrigger.opened.pipe(takeUntilDestroyed()).subscribe(() =>
			setTimeout(
				() =>
					// eslint-disable-next-line
					((this._cdkTrigger as any)._spartanLastPosition = // eslint-disable-next-line
						(this._cdkTrigger as any).overlayRef._positionStrategy._lastPosition),
			),
		);

		effect(() => {
			const align = this.align();
			if (!align) return;
			this._cdkTrigger.menuPosition = getSeedMenuAlign(align);
		});
	}
}
