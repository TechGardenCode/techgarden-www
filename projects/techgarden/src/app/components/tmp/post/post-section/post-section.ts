import { Component, computed, input, ViewEncapsulation } from '@angular/core';
import { SeedButton } from '@seed/components/button/seed-button';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { SeedIcon } from '@seed/components/icon/seed-icon';
import { lucideCodeXml } from '@ng-icons/lucide';
import { PostSectionType } from '@seed/models/post.model';
import { SeedH1 } from "@seed/typography/seed-h1";
import { SeedH2 } from '@seed/typography/seed-h2';
import { SeedH3 } from '@seed/typography/seed-h3';

@Component({
  selector: 'app-post-section',
  imports: [SeedButton, NgIcon, SeedIcon, SeedH1, SeedH2, SeedH3],
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
