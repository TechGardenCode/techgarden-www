import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { seed } from '@seed/utils';
import type { ClassValue } from 'clsx';

@Component({
  selector: 'seed-menu-shortcut',
  template: ` <ng-content /> `,
  host: {
    '[class]': '_computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeedMenuShortcut {
  public readonly userClass = input<ClassValue>('', { alias: 'class' });
  protected _computedClass = computed(() =>
    seed(
      'text-muted-foreground ml-auto text-xs tracking-widest',
      this.userClass()
    )
  );
}
