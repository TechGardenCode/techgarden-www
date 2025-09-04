import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCircle } from '@ng-icons/lucide';
import { SeedIcon } from '@seed/icon';
import { seed } from '@seed/utils';
import type { ClassValue } from 'clsx';

@Component({
  selector: 'seed-menu-item-radio',
  providers: [provideIcons({ lucideCircle })],
  imports: [NgIcon, SeedIcon],
  template: `
    <!-- Using 0.5rem for size to mimick h-2 w-2 -->
    <ng-icon seedIcon size="0.5rem" class="*:*:fill-current" name="lucideCircle" />
  `,
  host: {
    '[class]': '_computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeedMenuItemRadioIndicator {
  public readonly userClass = input<ClassValue>('', { alias: 'class' });
  protected readonly _computedClass = computed(() =>
    seed(
      'absolute left-2 flex h-3.5 w-3.5 items-center justify-center opacity-0 group-[.checked]:opacity-100',
      this.userClass()
    )
  );
}
