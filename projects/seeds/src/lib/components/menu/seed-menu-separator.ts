import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { seed } from '@seed/utils';
import { ClassValue } from 'clsx';

@Component({
  selector: 'seed-menu-separator',
  template: '',
  host: {
    '[class]': '_computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeedMenuSeparator {
  public readonly userClass = input<ClassValue>('', { alias: 'class' });
  protected readonly _computedClass = computed(() =>
    seed('bg-border -mx-1 my-1 block h-px', this.userClass())
  );
}
