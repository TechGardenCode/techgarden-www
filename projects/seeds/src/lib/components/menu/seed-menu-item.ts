import { BooleanInput } from '@angular/cdk/coercion';
import { CdkMenuItem } from '@angular/cdk/menu';
import {
  booleanAttribute,
  computed,
  Directive,
  effect,
  inject,
  input,
} from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { seed } from '@seed/utils';
import { ClassValue } from 'clsx';
import { SeedCdkMenuItem } from './seed-cdk-menu-item';

@Directive({
  selector: '[seedMenuItem]',
  host: {
    '[class]': '_computedClass()',
    '[attr.data-variant]': 'variant()',
    '[attr.data-inset]': 'inset() ? "" : null',
  },
  hostDirectives: [
    {
      directive: SeedCdkMenuItem,
      inputs: ['disabled: disabled'],
      outputs: ['triggered: triggered'],
    },
  ],
})
export class SeedMenuItem {
  public readonly variant = input<'default' | 'destructive'>('default');
  private readonly _cdkMenuItem = inject(CdkMenuItem);
  public readonly disabled = input(this._cdkMenuItem.disabled, {
    transform: booleanAttribute,
  });
  public readonly triggered = outputFromObservable(this._cdkMenuItem.triggered);

  public readonly inset = input<boolean, BooleanInput>(false, {
    transform: booleanAttribute,
  });

  public readonly userClass = input<ClassValue>('', { alias: 'class' });
  protected readonly _computedClass = computed(() =>
    seed(
      `hover:bg-accent focus-visible:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[ng-icon]:!text-destructive [&_ng-icon]:text-muted-foreground relative flex w-full cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none data-[inset]:pl-8 data-[disabled]:opacity-50 [&_ng-icon]:pointer-events-none [&_ng-icon]:shrink-0`,
      this.userClass()
    )
  );

  constructor() {
    effect(() => (this._cdkMenuItem.disabled = this.disabled()));
  }
}
