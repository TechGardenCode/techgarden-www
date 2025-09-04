import { ConnectedPosition } from '@angular/cdk/overlay';

export type SeedMenuAlign = 'start' | 'center' | 'end' | undefined;
export const getSeedMenuAlign = (align: Exclude<SeedMenuAlign, undefined>): ConnectedPosition[] => [
	{
		originX: align,
		originY: 'bottom',
		overlayX: align,
		overlayY: 'top',
	},
	{
		originX: align,
		originY: 'top',
		overlayX: align,
		overlayY: 'bottom',
	},
];
