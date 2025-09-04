import {
  Component,
  computed,
  inject,
  input,
  SecurityContext,
  ViewEncapsulation,
} from '@angular/core';
import { SeedButton } from '@seed/button';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { SeedIcon } from '@seed/icon';
import { lucideCodeXml } from '@ng-icons/lucide';
import { PostBodyJson } from '@seed/models';
import { SeedH1, SeedH2, SeedH3 } from '@seed/typography';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-post-section-2',
  imports: [SeedButton, NgIcon, SeedIcon, SeedH1, SeedH2, SeedH3],
  providers: [provideIcons({ lucideCodeXml })],
  templateUrl: './post-section.html',
  styleUrl: './post-section.css',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'block mb-4',
  },
})
export class PostSection2 {
  domSanitizer = inject(DomSanitizer);
  section = input<PostBodyJson>();
  sectionId = computed(() => {
    const rawText = this.section()?.text;
    return rawText
      ? `section-${rawText.replace(/\s+/g, '-').toLowerCase()}`
      : '';
  });
  sectionHtml = computed(() => {
    const rawText = this.section()?.text;
    if (!rawText) return '';
    // Bold: **TEXT**
    let html = this.domSanitizer.sanitize(SecurityContext.HTML, rawText) || '';
    html = html.replaceAll(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    html = html.replaceAll(/__(.+?)__/g, '<strong>$1</strong>');
    // Italic: _TEXT_
    html = html.replaceAll(/_(.+?)_/g, '<em>$1</em>');
    html = html.replaceAll(/\*(.+?)\*/g, '<em>$1</em>');
    // Underline: <u>TEXT</u>
    html = html.replaceAll(/<u>(.+?)<\/u>/g, '<u>$1</u>');
    // Strikethrough: ~~TEXT~~
    html = html.replaceAll(/~~(.+?)~~/g, '<del>$1</del>');
    // Image: ![TEXT](URL)
    html = html.replaceAll(
      /!\[(.+?)\]\((\S+?)(?:\s+&#34;(.*?)&#34;)?\)/g,
      `<img src="$2" alt="$1" title="$3" class="w-[80%] mx-auto max-w-[640px]" />`
    );
    // Link: [TEXT](URL)
    html = html.replaceAll(
      /\[(.+?)\]\((\S+?)(?:\s+&#34;(.*?)&#34;)?\)/g,
      `<a class="underline" href="$2" target="_blank" title="$3">$1</a>`
    );
    // Block quote
    html = html.replaceAll(
      /&gt;&gt;/g,
      '<blockquote class="border-l-4 border-accent pl-4 py-2 mt-2 mb-4">'
    );
    html = html.replaceAll(/&lt;&lt;/g, '</blockquote>');
    // List item
    html = html.replaceAll(/\+i/g, '<li>');
    html = html.replaceAll(/-i/g, '</li>');
    // Unordered lists
    html = html.replaceAll(
      /\+u/g,
      '<ul class="list-disc list-inside [&_ul]:ml-4">'
    );
    html = html.replaceAll(/-u/g, '</ul>');
    // Ordered lists
    html = html.replaceAll(
      /\+o/g,
      `<ol class="list-decimal list-inside [&_ol]:ml-4" start=${
        this.section()?.subtype
      }>`
    );
    html = html.replaceAll(/-o/g, '</ol>');
    // html = html.replaceAll(/<li>/g, '<li class="ml-4">');
    // Code: `TEXT`
    html = html.replaceAll(
      /`(.+?)`/g,
      '<code class="bg-accent py-0.5 px-1 rounded h-6 text-sm">$1</code>'
    );
    return this.domSanitizer.bypassSecurityTrustHtml(html);
  });

  copyContent() {
    navigator.clipboard.writeText(this.section()?.text || '');
  }

  calcLineNos(content?: string | string[]) {
    if (!content) {
      return '';
    }
    const lines = Array.isArray(content) ? content : content.trim().split('\n');
    return lines.map((_, index) => `${index + 1}`).join('\n');
  }
}
