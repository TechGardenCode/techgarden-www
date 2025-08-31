import {
  computed,
  Directive,
  type DoCheck,
  effect,
  forwardRef,
  inject,
  Injector,
  input,
  linkedSignal,
  untracked,
} from '@angular/core';
import { FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { seed } from '@seed/utils';
import { cva, VariantProps } from 'class-variance-authority';
import type { ClassValue } from 'clsx';
import { SeedFormFieldControl } from '../form-field/seed-form-field-control';
import { ErrorStateTracker } from './error-state-tracker';
import { ErrorStateMatcher } from './error-options';

export const inputVariants = cva(
  'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
  {
    variants: {
      error: {
        auto: '[&.ng-invalid.ng-touched]:text-destructive/20 dark:[&.ng-invalid.ng-touched]:text-destructive/40 [&.ng-invalid.ng-touched]:border-destructive [&.ng-invalid.ng-touched]:focus-visible:ring-destructive',
        true: 'text-destructive/20 dark:text-destructive/40 border-destructive focus-visible:ring-destructive',
      },
    },
    defaultVariants: {
      error: 'auto',
    },
  }
);
type InputVariants = VariantProps<typeof inputVariants>;

@Directive({
  selector: '[seedInput]',
  host: {
    '[class]': '_computedClass()',
  },
  providers: [
    {
      provide: SeedFormFieldControl,
      useExisting: forwardRef(() => SeedInput),
    },
  ],
})
export class SeedInput implements SeedFormFieldControl, DoCheck {
  public readonly error = input<InputVariants['error']>('auto');

  protected readonly _state = linkedSignal(() => ({ error: this.error() }));

  public readonly userClass = input<ClassValue>('', { alias: 'class' });
  protected readonly _computedClass = computed(() =>
    seed(inputVariants({ error: this._state().error }), this.userClass())
  );

  private readonly _injector = inject(Injector);

  public readonly ngControl: NgControl | null = this._injector.get(
    NgControl,
    null
  );

  private readonly _errorStateTracker: ErrorStateTracker;

  private readonly _defaultErrorStateMatcher = inject(ErrorStateMatcher);
  private readonly _parentForm = inject(NgForm, { optional: true });
  private readonly _parentFormGroup = inject(FormGroupDirective, {
    optional: true,
  });

  public readonly errorState = computed(() =>
    this._errorStateTracker.errorState()
  );

  constructor() {
    this._errorStateTracker = new ErrorStateTracker(
      this._defaultErrorStateMatcher,
      this.ngControl,
      this._parentFormGroup,
      this._parentForm
    );

    effect(() => {
      const error = this._errorStateTracker.errorState();
      untracked(() => {
        if (this.ngControl) {
          const shouldShowError =
            error &&
            this.ngControl.invalid &&
            (this.ngControl.touched || this.ngControl.dirty);
          this._errorStateTracker.errorState.set(
            shouldShowError ? true : false
          );
          this.setError(shouldShowError ? true : 'auto');
        }
      });
    });
  }

  ngDoCheck() {
    this._errorStateTracker.updateErrorState();
  }

  setError(error: InputVariants['error']) {
    this._state.set({ error });
  }
}
