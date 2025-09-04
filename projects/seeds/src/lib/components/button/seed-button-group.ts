import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { seed } from '@seed/utils';
import { ClassValue } from 'class-variance-authority/types';

@Component({
  selector: 'seed-button-group',
  template: `<ng-content></ng-content>`,
  host: {
    '[class]': '_computedClass()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeedButtonGroup {
  public readonly userClass = input<ClassValue>('', { alias: 'class' });

  protected readonly _computedClass = computed(() =>
    seed('relative flex gap-2 items-center rounded-md hover:text-accent-foreground hover:bg-accent/50', this.userClass())
  );
}
