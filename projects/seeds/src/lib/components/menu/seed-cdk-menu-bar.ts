import { CdkMenuBar } from '@angular/cdk/menu';
import { Directive } from '@angular/core';

@Directive({
	selector: '[seedCdkMenuBar]',
	hostDirectives: [CdkMenuBar],
})
export class SeedCdkMenuBar {}
