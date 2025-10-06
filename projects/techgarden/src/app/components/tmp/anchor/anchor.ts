import { Component, computed, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Post } from '@seed/models';

export interface AnchorSection {
  fragment: string;
  title: string;
  tag: string;
  children?: AnchorSection[];
}

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
    const stack: AnchorSection[] = [];
    const parsedSections: AnchorSection[] = [];

    const tagLevel = (tag: string) => {
      if (tag === 'h1') return 1;
      if (tag === 'h2') return 2;
      if (tag === 'h3') return 3;
      return 99;
    };

    for (const section of sections) {
      const level = tagLevel(section.tag);

      console.log('Popping - START');
      // Pop stack until we find a parent with lower level
      while (stack.length && tagLevel(stack[stack.length - 1].tag) >= level) {
        console.log(JSON.stringify(stack));
        stack.pop();
      }
      console.log('Popping - END');

      if (stack.length) {
        console.log('ADDING CHILD - START');
        // Attach as child to the last item in stack
        if (!stack[stack.length - 1].children) {
          stack[stack.length - 1].children = [];
        }
        stack[stack.length - 1].children!.push(section);
        console.log('ADDING CHILD - END');
      } else {
        console.log('ADDING TOP-LEVEL - START');
        // Top-level section
        parsedSections.push(section);
        console.log('ADDING TOP-LEVEL - END');
      }

      // Push current section to stack
      stack.push(section);
      console.log(section);
      console.log(JSON.stringify(stack));
    }

    return parsedSections;
  }
}
