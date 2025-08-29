import { Component, computed, inject } from '@angular/core';
import { HeaderService } from '../../services/header.service';
import { SeedButton } from '@seed/components/button/seed-button';
import { BlogService } from '../../services/api/blog.service';
import { TestService } from '../../services/test/test.service';
import { Anchor } from '../../components/tmp/anchor/anchor';
import { SeedH2 } from '@seed/typography/seed-h2';
import { SeedInput } from '@seed/components/input/seed-input';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test.page',
  imports: [SeedButton, Anchor, SeedH2, SeedInput, ReactiveFormsModule],
  templateUrl: './test.page.html',
  styleUrl: './test.page.css',
})
export class TestPage {
  protected readonly headerService = inject(HeaderService);
  protected readonly testService = inject(TestService);
  protected readonly router = inject(Router);

  blogForm = new FormGroup({
    metadata: new FormGroup({
      title: new FormControl('New Post'),
      description: new FormControl('This is a new post'),
      author: new FormControl('Kian Alikhani'),
      imageUrl: new FormControl('https://placehold.co/800x400'),
    }),
    body: new FormGroup({
      content: new FormControl(`## Section 1

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla volutpat eleifend tortor. Maecenas in tortor nisi. Praesent vitae mauris ut erat hendrerit tempus. Morbi ornare rutrum sapien in dictum. Vestibulum non dignissim nulla. Nunc vulputate a nisl vitae consequat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec sit amet scelerisque diam. Nunc malesuada quis risus ac lobortis. Vivamus sit amet efficitur dui. Vestibulum a rutrum diam. Integer eget leo urna.

## Section 2

Proin ac ipsum vitae augue vestibulum laoreet. Maecenas sed augue eu ipsum molestie varius. Sed at mi ac eros sodales mattis eget sit amet magna. Integer semper nunc urna, commodo imperdiet tortor iaculis quis. Integer ipsum ante, egestas blandit tempus ac, facilisis sit amet ipsum. Vivamus tellus ipsum, mollis et mauris ac, dictum varius nulla. Mauris pretium libero at elementum pharetra.

## Section 3

Sed ultrices libero vitae nibh lobortis, nec tempus mi scelerisque. Interdum et malesuada fames ac ante ipsum primis in faucibus. Curabitur suscipit ullamcorper urna, a blandit justo volutpat ut. Praesent nec odio commodo, semper massa at, feugiat libero. Suspendisse placerat at libero vitae congue. Suspendisse tristique quis eros venenatis euismod. Ut viverra ultrices augue vitae aliquam. Morbi id ligula velit. Nullam nec ex mollis est fermentum rhoncus. Quisque non eros diam.

## Section 4

Suspendisse ullamcorper pellentesque felis, ac pellentesque sapien ultrices et. Proin sed dolor quis mauris ultrices euismod. Nullam pulvinar augue eu libero ultricies pulvinar. Quisque vel erat sit amet nulla pretium suscipit quis non turpis. Sed blandit mauris id dignissim euismod. Fusce erat tortor, faucibus sed odio varius, malesuada porta purus. Cras eget nulla nulla. Morbi tincidunt id nibh id mollis. Sed malesuada quam tellus, sed faucibus purus lobortis quis. Pellentesque gravida, mi ut laoreet luctus, enim est vestibulum magna, sit amet lacinia urna elit non neque. Suspendisse potenti.

## Section 5

Nam varius fermentum lorem a pulvinar. Donec ut massa facilisis, suscipit arcu at, ultrices dolor. Sed eu ultrices felis. Phasellus consectetur augue ipsum, nec aliquet lacus finibus ut. Nam leo sapien, laoreet vel purus vitae, scelerisque aliquet mauris. Nulla porta ante sed nisi sagittis lacinia. Integer vitae consequat mauris. Fusce dictum, ipsum at sagittis eleifend, erat nunc sollicitudin ipsum, vel varius arcu tortor ac leo. Sed tellus eros, pulvinar nec condimentum eget, maximus eu velit. Pellentesque lacinia tortor at metus imperdiet, non commodo magna egestas. Proin ut ex lorem. Pellentesque justo libero, condimentum sit amet porta sit amet, finibus at diam. Phasellus a libero nec mauris lobortis vestibulum et ut purus. Cras condimentum pharetra lorem, vel hendrerit tellus suscipit id.`),
    }),
  });

  constructor() {
    this.headerService.setBreadcrumbs(
      [
        {
          label: 'Test',
          url: '/test',
        },
      ],
      {
        withDefaults: true,
      }
    );
  }

  createPost() {
    this.testService.createPost(this.blogForm.value).subscribe({
      next: (post: any) => {
        this.router.navigate(['/blog', post.id]);
      },
    });
  }
}
