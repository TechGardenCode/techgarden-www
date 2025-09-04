import { CdkMenuItem } from '@angular/cdk/menu';
import { booleanAttribute, Directive, effect, inject, input } from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';

@Directive({
	selector: '[seedCdkMenuItem]',
	hostDirectives: [CdkMenuItem],
	host: {
		'[attr.disabled]': 'disabled() ? true : null',
		'[attr.data-disabled]': 'disabled() ? "" : null',
	},
})
export class SeedCdkMenuItem {
	private readonly _cdkMenuItem = inject(CdkMenuItem);
	public readonly disabled = input(this._cdkMenuItem.disabled, { transform: booleanAttribute });
	public readonly triggered = outputFromObservable(this._cdkMenuItem.triggered);

	constructor() {
		effect(() => (this._cdkMenuItem.disabled = this.disabled()));
	}
}
