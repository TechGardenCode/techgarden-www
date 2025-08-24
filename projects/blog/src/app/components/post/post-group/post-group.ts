import { Component, computed, input, output } from '@angular/core';
import { PostSectionType } from '../../../types/post.type';
import { PostSection } from '../post-section/post-section';

@Component({
  selector: 'app-post-group',
  imports: [PostSection],
  templateUrl: './post-group.html',
  styleUrl: './post-group.css',
})
export class PostGroup {
  postMarkdown = input<string>();

  postSections = computed(() => {
    const postMarkdown = this.postMarkdown();
    if (!postMarkdown) {
      return [];
    }
    return this.parsePostSections(postMarkdown);
  });

  postContents = output<{ fragment: string; title: string, tag: string }[]>();

  parsePostSections(content: string) {
    const sections = content
      .split('\n')
      .filter((section) => section.trim() !== '');
    const out: PostSectionType[] = [];
    for (let i = 0; i < sections.length; i++) {
      if (sections[i].startsWith('###')) {
        const content = sections[i].replace(/^###\s*/, '');
        out.push({
          tag: 'h3',
          content,
          meta: {
            id: this.generateId(content),
          },
        });
      } else if (sections[i].startsWith('##')) {
        const content = sections[i].replace(/^##\s*/, '');
        out.push({
          tag: 'h2',
          content,
          meta: {
            id: this.generateId(content),
          },
        });
      } else if (sections[i].startsWith('#')) {
        const content = sections[i].replace(/^#\s*/, '');
        out.push({
          tag: 'h1',
          content,
          meta: {
            id: this.generateId(content),
          },
        });
      } else if (sections[i].startsWith('```')) {
        const codeBlock = [];
        const language = sections[i].replace(/^```/, '').trim();
        i++;
        while (i < sections.length && !sections[i].startsWith('```')) {
          codeBlock.push(sections[i]);
          i++;
        }
        out.push({
          tag: 'code',
          meta: {
            language,
          },
          content: codeBlock.join('\n'),
        });
      } else if (sections[i].startsWith('<!--')) {
        while (i < sections.length && !sections[i].includes('-->')) {
          i++;
        }
      } else if (
        sections[i].startsWith('-') ||
        sections[i].startsWith('*') ||
        sections[i].startsWith('+')
      ) {
        const listItems = [];
        while (
          i < sections.length &&
          (sections[i].startsWith('-') ||
            sections[i].startsWith('*') ||
            sections[i].startsWith('+'))
        ) {
          listItems.push(sections[i].replace(/^[-*+]\s*/, '').trim());
          i++;
        }
        i--; // Adjust index since the outer loop will increment it
        out.push({
          tag: 'li',
          content: listItems,
        });
      } else if (sections[i].startsWith('>')) {
        out.push({
          tag: 'blockquote',
          content: sections[i].replace(/^>\s*/, ''),
        });
      } else {
        out.push({
          tag: 'p',
          content: sections[i],
        });
      }
    }
    this.postContents.emit(
      out
        .filter((section) => section.meta?.id)
        .map((section) => ({
          fragment: section.meta?.id as string,
          title: section.content as string,
          tag: section.tag,
        }))
    );
    return out;
  }

  generateId(text: string) {
    return text.toLowerCase().replace(/\s+/g, '-');
  }
}
