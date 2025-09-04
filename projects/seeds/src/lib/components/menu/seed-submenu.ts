import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import type { ClassValue } from 'clsx';
import { seed } from '@seed/utils';
import { SeedCdkMenu } from './seed-cdk-menu';

@Component({
  selector: 'seed-sub-menu',
  host: {
    '[class]': '_computedClass()',
  },
  hostDirectives: [SeedCdkMenu],
  template: ` <ng-content /> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeedSubMenu {
  public readonly userClass = input<ClassValue>('', { alias: 'class' });
  protected readonly _computedClass = computed(() =>
    seed(
      'border-border bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 min-w-[8rem] overflow-hidden rounded-md border p-1 shadow-lg',
      this.userClass()
    )
  );
}
