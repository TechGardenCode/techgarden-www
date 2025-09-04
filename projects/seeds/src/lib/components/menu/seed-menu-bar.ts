import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { seed } from '@seed/utils';
import type { ClassValue } from 'clsx';
import { SeedCdkMenuBar } from './seed-cdk-menu-bar';

@Component({
  selector: 'seed-menu-bar',
  host: {
    '[class]': '_computedClass()',
  },
  hostDirectives: [SeedCdkMenuBar],
  template: '<ng-content/>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeedMenuBar {
  public readonly userClass = input<ClassValue>('', { alias: 'class' });
  protected _computedClass = computed(() =>
    seed(
      'bg-background shadow-xs flex h-9 items-center gap-1 rounded-md border p-1',
      this.userClass()
    )
  );
}
