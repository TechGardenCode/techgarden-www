import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { seed } from '@seed/utils';
import { type VariantProps, cva } from 'class-variance-authority';
import type { ClassValue } from 'clsx';
import { SeedCdkMenu } from './seed-cdk-menu';

export const menuVariants = cva(
  'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-top overflow-y-auto overflow-x-hidden rounded-md border border-border p-1 shadow-md',
  {
    variants: {
      variant: {
        default: 'my-0.5',
        menubar: 'my-2',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);
type MenuVariants = VariantProps<typeof menuVariants>;

@Component({
  selector: 'seed-menu',
  host: {
    '[class]': '_computedClass()',
  },
  hostDirectives: [SeedCdkMenu],
  template: ` <ng-content /> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeedMenu {
  public readonly userClass = input<ClassValue>('', { alias: 'class' });
  protected readonly _computedClass = computed(() =>
    seed(menuVariants({ variant: this.variant() }), this.userClass())
  );

  public readonly variant = input<MenuVariants['variant']>('default');
}
