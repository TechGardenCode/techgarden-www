import {
  Component,
  effect,
  HostListener,
  input,
  model,
  OnInit,
  output,
} from '@angular/core';
import { TextBlock } from '../../../../models/text-editor.model';
import { SeedH1, SeedH2, SeedH3 } from '@seed/typography';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-text-editor-block',
  imports: [SeedH1, SeedH2, SeedH3, FormsModule],
  templateUrl: './text-editor-block.html',
  styleUrl: './text-editor-block.css',
  host: {
    class: '*:outline-0',
  },
})
export class TextEditorBlock {
  block = model<TextBlock>();
  onEnter = output();
  onVerticalNav = output<'down' | 'up'>();

  constructor() {
    effect(() => {
      if (!this.block()) {
        console.error('Block input must be defined!');
      }
    });
  }

  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.onEnter.emit();
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.onVerticalNav.emit('down');
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.onVerticalNav.emit('up');
    }
    if (event.metaKey) {
      switch (event.key) {
        case 'b':
          event.preventDefault();
          break;
        case 'i':
          event.preventDefault();
          break;
        case 'u':
          event.preventDefault();
          break;
        case '0':
          event.preventDefault();
          this.block.update((block) => {
            if (!block) {
              return block;
            }
            return {
              ...block,
              type: 'paragraph',
              data: { ...block.data, level: undefined },
            };
          });
          break;
        case '1':
          event.preventDefault();
          this.block.update((block) => {
            if (!block) {
              return block;
            }
            return {
              ...block,
              type: 'header',
              data: { ...block.data, level: 1 },
            };
          });
          break;
        case '2':
          event.preventDefault();
          this.block.update((block) => {
            if (!block) {
              return block;
            }
            return {
              ...block,
              type: 'header',
              data: { ...block.data, level: 2 },
            };
          });
          break;
        case '3':
          event.preventDefault();
          this.block.update((block) => {
            if (!block) {
              return block;
            }
            return {
              ...block,
              type: 'header',
              data: { ...block.data, level: 3 },
            };
          });
          break;
      }
    }
  }

  setContent(content: any) {
    const textContent: string = content.target.textContent;
    this.block.update((block) => {
      if (!block) {
        return block;
      }
      return {
        ...block,
        textContent,
      };
    });
  }
}
