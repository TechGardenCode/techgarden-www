import { Component, inject, ViewEncapsulation } from '@angular/core';
import { BlogEditor } from '../../../../../components/shared/blog-editor/blog-editor';
import { DeepPartial, Post2 } from '@seed/models';
import { Router } from '@angular/router';
import { BlogService } from '../../../../../services/api/blog.service';
import { HeaderService } from '../../../../../services/header.service';

@Component({
  selector: 'app-blog-post-create.page',
  imports: [BlogEditor],
  templateUrl: './blog-post-create.page.html',
  styleUrl: './blog-post-create.page.css',
  encapsulation: ViewEncapsulation.None,
})
export class BlogPostCreatePage {
  router = inject(Router);
  blogService = inject(BlogService);
  headerService = inject(HeaderService);

  samplePost: DeepPartial<Post2> = {
    metadata: {
      title: 'Sample Post',
      description: 'This is a sample post',
      imageUrl: 'https://placehold.co/800x400',
    },
    body: {
      content: `---
__Advertisement 😀__

- __[pica](https://nodeca.github.io/pica/demo/)__ - high quality and fast image resize in browser.
- __[babelfish](https://github.com/nodeca/babelfish/)__ - developer friendly i18n with plurals support and easy syntax.

You will like those projects!

---

# h1 Heading 😎
## h2 Heading
### h3 Heading
#### h4 Heading
##### h5 Heading
###### h6 Heading


## Horizontal Rules

___

---

***


## Emphasis

**This is bold text**

__This is bold text__

*This is italic text*

_This is italic text_

~~Strikethrough~~


## Blockquotes


> Blockquotes can also be nested...
>> ...by using additional greater-than signs right next to each other...
> > > ...or with spaces between arrows.


## Lists

Unordered

+ Create a list by starting a line with \`+\`, \`-\`, or \`*\`
+ Sub-lists are made by indenting 2 spaces:
  - Marker character change forces new list start:
    * Ac tristique libero volutpat at
    + Facilisis in pretium nisl aliquet
    - Nulla volutpat aliquam velit
+ Very easy!

Ordered

1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa


1. You can use sequential numbers...
1. ...or keep all the numbers as \`1.\`

Start numbering with offset:

57. foo
1. bar


## Code

Inline \`code\`

Block code "fences"

\`\`\`
Sample text here...
\`\`\`

Syntax highlighting

\`\`\` js
var foo = function (bar) {
  return bar++;
};

console.log(foo(5));
\`\`\`

## Links

[link text](http://dev.nodeca.com)

[link with title](http://nodeca.github.io/pica/demo/ "title text!")


## Images

![Minion](https://octodex.github.com/images/minion.png)
![Inflatocat](https://octodex.github.com/images/inflatocat.png "Inflatocat")
`,
    },
  };

  constructor() {
    this.headerService.setBreadcrumbs(
      [
        {
          label: 'Admin',
          url: '/admin',
        },
        {
          label: 'Blog',
          url: '/admin/blog',
        },
        {
          label: 'Create post',
          url: '/admin/blog/create',
        },
      ],
      {
        withDefaults: true,
      }
    );
  }

  postSubmit({
    title,
    description,
    imageUrl,
    content,
  }: {
    title: string;
    description: string;
    imageUrl: string;
    content: string;
  }) {
    const post: DeepPartial<Post2> = {
      metadata: {
        title,
        description,
        imageUrl,
      },
      body: {
        content,
      },
    };
    this.blogService.createPost(post).subscribe({
      next: (post) => {
        this.router.navigate(['/blog/', post.id]);
      },
    });
  }
}
