import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCheck } from '@ng-icons/lucide';
import { SeedIcon } from '@seed/icon';
import { seed } from '@seed/utils';
import type { ClassValue } from 'clsx';

@Component({
  selector: 'seed-menu-item-check',
  providers: [provideIcons({ lucideCheck })],
  imports: [NgIcon, SeedIcon],
  template: `
    <!-- Using 1rem for size to mimick h-4 w-4 -->
    <ng-icon seedIcon size="1rem" name="lucideCheck" />
  `,
  host: {
    '[class]': '_computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeedMenuItemCheck {
  public readonly userClass = input<ClassValue>('', { alias: 'class' });
  protected _computedClass = computed(() =>
    seed(
      'absolute left-2 flex h-3.5 w-3.5 items-center justify-center opacity-0 group-[.checked]:opacity-100',
      this.userClass()
    )
  );
}
