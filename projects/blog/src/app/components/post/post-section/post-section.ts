import { Component, computed, input, ViewEncapsulation } from '@angular/core';
import { PostSectionType } from '../../../types/post.type';
import { SeedButton } from '@seed/components/button/seed-button';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { SeedIcon } from '@seed/components/icon/seed-icon';
import { lucideCodeXml } from '@ng-icons/lucide';

@Component({
  selector: 'app-post-section',
  imports: [SeedButton, NgIcon, SeedIcon],
  providers: [provideIcons({ lucideCodeXml })],
  templateUrl: './post-section.html',
  styleUrl: './post-section.css',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'block mb-4',
  },
})
export class PostSection {
  section = input<PostSectionType>();

  copyContent() {
    const section = this.section();
    const content = typeof section?.content === 'string' ? section.content : '';
    navigator.clipboard.writeText(content);
  }

  calcLineNos(content?: string | string[]) {
    if (!content) {
      return '';
    }
    const lines = Array.isArray(content) ? content : content.split('\n');
    return lines.map((line, index) => `${index + 1}`).join('\n');
  }
}
