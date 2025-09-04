import { BooleanInput } from '@angular/cdk/coercion';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { seed } from '@seed/utils';
import { ClassValue } from 'clsx';

@Component({
  selector: 'seed-menu-label',
  template: ` <ng-content /> `,
  host: {
    '[class]': '_computedClass()',
    '[attr.data-inset]': 'inset() ? "" : null',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeedMenuLabel {
  public readonly inset = input<boolean, BooleanInput>(false, {
    transform: booleanAttribute,
  });

  public readonly userClass = input<ClassValue>('', { alias: 'class' });
  protected _computedClass = computed(() =>
    seed(
      'block px-2 py-1.5 text-sm font-medium data-[inset]:pl-8',
      this.userClass()
    )
  );
}
