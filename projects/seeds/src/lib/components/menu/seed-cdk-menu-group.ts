import { CdkMenuGroup } from '@angular/cdk/menu';
import { Directive } from '@angular/core';

@Directive({
	selector: '[seedCdkMenuGroup]',
	hostDirectives: [CdkMenuGroup],
})
export class SeedCdkMenuGroup {}
