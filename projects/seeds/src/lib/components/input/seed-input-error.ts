import { Directive, computed, input } from '@angular/core';
import { seed } from '@seed/utils';
import { type VariantProps, cva } from 'class-variance-authority';
import type { ClassValue } from 'clsx';

export const inputErrorVariants = cva('text-destructive text-sm font-medium', {
  variants: {},
  defaultVariants: {},
});
export type InputErrorVariants = VariantProps<typeof inputErrorVariants>;

@Directive({
  selector: '[seedInputError]',
  host: {
    '[class]': '_computedClass()',
  },
})
export class SeedInputError {
  public readonly userClass = input<ClassValue>('', { alias: 'class' });
  protected _computedClass = computed(() =>
    seed(inputErrorVariants(), this.userClass())
  );
}
