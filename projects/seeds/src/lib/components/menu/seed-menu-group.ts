import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SeedCdkMenuGroup } from './seed-cdk-menu-group';

@Component({
	selector: 'seed-menu-group',
	host: {
		class: 'block',
	},
	hostDirectives: [SeedCdkMenuGroup],
	template: `
		<ng-content />
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeedMenuGroup {}
