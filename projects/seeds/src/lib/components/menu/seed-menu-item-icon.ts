import { Directive, computed, input } from '@angular/core';
import { provideSeedIconConfig } from '@seed/icon';
import { seed } from '@seed/utils';
import type { ClassValue } from 'clsx';

@Directive({
  selector: '[seedMenuIcon]',
  providers: [provideSeedIconConfig({ size: 'sm' })],
  host: {
    '[class]': '_computedClass()',
  },
})
export class SeedMenuItemIcon {
  public readonly userClass = input<ClassValue>('', { alias: 'class' });
  protected _computedClass = computed(() => seed('mr-2', this.userClass()));
}
