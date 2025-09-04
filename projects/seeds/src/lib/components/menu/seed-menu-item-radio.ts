import { Directive, computed, input } from '@angular/core';
import { seed } from '@seed/utils';
import type { ClassValue } from 'clsx';
import { SeedCdkMenuItemRadio } from './seed-cdk-menu-item-radio';

@Directive({
  selector: '[seedMenuItemRadio]',
  hostDirectives: [
    {
      directive: SeedCdkMenuItemRadio,
      inputs: ['disabled: disabled', 'checked: checked'],
      outputs: ['triggered: triggered'],
    },
  ],
  host: {
    '[class]': '_computedClass()',
  },
})
export class SeedMenuItemRadio {
  public readonly userClass = input<ClassValue>('', { alias: 'class' });
  protected readonly _computedClass = computed(() =>
    seed(
      'hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground group relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors disabled:pointer-events-none disabled:opacity-50',
      this.userClass()
    )
  );
}
