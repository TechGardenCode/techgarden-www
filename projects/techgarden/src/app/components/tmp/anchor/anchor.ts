import { Component, computed, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Post } from '@seed/models/post.model';

export type AnchorSection = { fragment: string; title: string, tag: string, children?: AnchorSection[] };

@Component({
  selector: 'app-anchor',
  imports: [RouterModule],
  templateUrl: './anchor.html',
  styleUrl: './anchor.css',
})
export class Anchor {
  recentlyUpdated = input<Post[]>([]);
  trending = input<Post[]>([]);
  sections = input<AnchorSection[][]>([]);
  parsedSections = computed(() => this.parseSections(this.sections()[0]));

  parseFragment(fragment: string) {
    return fragment.trim().toLowerCase().split(' ').join('-');
  }

  parseSections(sections: AnchorSection[]) {
    const parsedSections: AnchorSection[] = [];
    for (let i = 0; i < sections.length; i++) {
      if (sections[i].tag === 'h3') {
        const parentIndex = i-1;
        const children: AnchorSection[] = [];
        while (sections[i] && sections[i].tag === 'h3') {
          children.push(sections[i]);
          i++;
        }
        if (sections[parentIndex]) {
          sections[parentIndex].children = children;
        }
        i--;
      } else {
        parsedSections.push(sections[i]);
      }
    }
    return parsedSections;
  }
}
