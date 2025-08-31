import { Directive, computed, input } from '@angular/core';
import { seed } from '@seed/utils';
import { type VariantProps, cva } from 'class-variance-authority';
import type { ClassValue } from 'clsx';

export const paginationVariants = cva('mx-auto flex w-full justify-center', {
  variants: {},
  defaultVariants: {},
});
export type PaginationVariants = VariantProps<typeof paginationVariants>;

@Directive({
  selector: '[seedPagination]',
  host: {
    role: 'navigation',
    '[class]': '_computedClass()',
    '[attr.aria-label]': 'ariaLabel()',
  },
})
export class SeedPagination {
  public readonly userClass = input<ClassValue>('', { alias: 'class' });

  /** The aria-label for the pagination component. */
  public readonly ariaLabel = input<string>('pagination', {
    alias: 'aria-label',
  });

  protected readonly _computedClass = computed(() =>
    seed(paginationVariants(), this.userClass())
  );
}
