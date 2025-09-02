import { BooleanInput } from '@angular/cdk/coercion';
import {
  booleanAttribute,
  Component,
  computed,
  effect,
  inject,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SeedButton } from '@seed/button';
import { SeedInput } from '@seed/input';
import { Post, Post2 } from '@seed/models';

@Component({
  selector: 'app-blog-editor',
  imports: [SeedInput, SeedButton, ReactiveFormsModule],
  templateUrl: './blog-editor.html',
  styleUrl: './blog-editor.css',
  encapsulation: ViewEncapsulation.None,
})
export class BlogEditor {
  fb = inject(FormBuilder);
  post = input<Post2>();
  blogPostFormGroup = this.fb.group({
    title: this.fb.control('', { nonNullable: true }),
    description: this.fb.control('', { nonNullable: true }),
    imageUrl: this.fb.control('', { nonNullable: true }),
    content: this.fb.control('', { nonNullable: true }),
  });
  update = input<boolean, BooleanInput>(false, {
    transform: booleanAttribute,
  });
  onSubmit = output<{
    title: string;
    description: string;
    imageUrl: string;
    content: string;
  }>();

  constructor() {
    effect(() => {
      const post = this.post();
      if (!post) {
        return;
      }

      this.blogPostFormGroup.patchValue({
        title: post.metadata.title,
        description: post.metadata.description,
        imageUrl: post.metadata.imageUrl,
        content: post.body.content,
      });
    });
  }

  submitForm() {
    if (
      !this.blogPostFormGroup.valid ||
      Object.values(this.blogPostFormGroup.controls).some(
        (control) => !control.valid
      )
    ) {
      return;
    }
    this.onSubmit.emit(this.blogPostFormGroup.getRawValue());
  }
}
