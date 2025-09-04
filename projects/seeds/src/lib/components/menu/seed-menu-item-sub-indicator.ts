import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChevronRight } from '@ng-icons/lucide';
import { SeedIcon } from '@seed/icon';
import { seed } from '@seed/utils';
import { ClassValue } from 'clsx';

@Component({
  selector: 'seed-menu-item-sub-indicator',
  providers: [provideIcons({ lucideChevronRight })],
  imports: [NgIcon, SeedIcon],
  template: `
    <ng-icon
      seedIcon
      size="sm"
      name="lucideChevronRight"
      class="text-popover-foreground"
    />
  `,
  host: {
    '[class]': '_computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeedMenuItemSubIndicator {
  public readonly userClass = input<ClassValue>('', { alias: 'class' });
  protected readonly _computedClass = computed(() =>
    seed('ml-auto size-4', this.userClass())
  );
}
