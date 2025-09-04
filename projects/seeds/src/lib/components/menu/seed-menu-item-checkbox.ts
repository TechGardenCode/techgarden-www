import { CdkMenuItemCheckbox } from '@angular/cdk/menu';
import {
  Directive,
  booleanAttribute,
  computed,
  effect,
  inject,
  input,
} from '@angular/core';
import { seed } from '@seed/utils';
import type { ClassValue } from 'clsx';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { SeedCdkMenuItemCheckbox } from './seed-cdk-menu-item-checkbox';

@Directive({
  selector: '[seedMenuItemCheckbox]',
  host: {
    '[class]': '_computedClass()',
  },
  hostDirectives: [
    {
      directive: SeedCdkMenuItemCheckbox,
      inputs: ['disabled: disabled', 'checked: checked'],
      outputs: ['triggered: triggered'],
    },
  ],
})
export class SeedMenuItemCheckbox {
  public readonly userClass = input<ClassValue>('', { alias: 'class' });
  protected readonly _computedClass = computed(() =>
    seed(
      'hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground group relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors disabled:pointer-events-none disabled:opacity-50',
      this.userClass()
    )
  );

  private readonly _cdkMenuItem = inject(CdkMenuItemCheckbox);
  public readonly checked = input(this._cdkMenuItem.checked, {
    transform: booleanAttribute,
  });
  public readonly disabled = input(this._cdkMenuItem.disabled, {
    transform: booleanAttribute,
  });
  public readonly triggered = outputFromObservable(this._cdkMenuItem.triggered);

  constructor() {
    effect(() => (this._cdkMenuItem.disabled = this.disabled()));
    effect(() => (this._cdkMenuItem.checked = this.checked()));
  }
}
