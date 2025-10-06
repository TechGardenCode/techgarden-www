import {
  Component,
  inject,
  OnInit,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Anchor } from '../../../components/tmp/anchor/anchor';
import { HeaderService } from '../../../services/header.service';
import { BlogService } from '../../../services/api/blog.service';
import { ApiState, Post2 } from '@seed/models';
import { micromark } from 'micromark';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { PostHeader } from "../../../components/posts/post-header/post-header";

@Component({
  selector: 'app-posts.page',
  imports: [RouterModule, Anchor, PostHeader],
  templateUrl: './posts.page.html',
  styleUrl: './posts.page.css',
  encapsulation: ViewEncapsulation.None,
})
export class PostsPage implements OnInit {
  protected readonly headerService = inject(HeaderService);
  protected readonly blogService = inject(BlogService);
  protected readonly activatedRoute = inject(ActivatedRoute);
  protected readonly sanitizer = inject(DomSanitizer);

  postContents = signal<{ fragment: string; title: string; tag: string }[]>([]);
  breadcrumbItems = [{ url: '/', label: 'Home' }];

  post2 = signal<ApiState<Post2>>({
    loading: false,
    firstLoad: true,
  });

  micromarkedContent = signal<SafeHtml>('');

  constructor() {
    this.headerService.setBreadcrumbs(
      [
        {
          label: 'Blog',
          url: '/blog',
        },
      ],
      {
        withDefaults: true,
      }
    );
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const postId = params['postId'];
      this.getPostById(postId);
    });
  }

  getPostById(postId: string) {
    this.post2.set({
      loading: true,
      firstLoad: false,
    });
    this.blogService.getPostById(postId).subscribe({
      next: (post: Post2) => {
        this.post2.set({
          loading: false,
          firstLoad: false,
          data: post,
        });
        this.headerService.addBreadcrumb({
          label: post.metadata.title,
          url: `/${postId}`,
        });
        this.parseContentToMicromarked(post.body.content || '');
      },
      error: (error) => {
        this.post2.set({
          loading: false,
          firstLoad: false,
          error: error,
        });
      },
    });
  }

  parseContentToMicromarked(content: string) {
    const micromarkHtml = micromark(content);
    const withIds = this.addIdFragmentToHeadings(micromarkHtml);
    const headingInfo = this.getHeadingInfoFromHtml(withIds);
    this.postContents.set(
      headingInfo.map((info) => ({
        fragment: info.id,
        title: info.innerHtml,
        tag: info.tag,
      }))
    );
    const sanitizedHtml = this.sanitizer.bypassSecurityTrustHtml(withIds);
    this.micromarkedContent.set(sanitizedHtml);
  }

  getHeadingInfoFromHtml(headingHtml: string) {
    const matches = headingHtml.matchAll(/<(h[1-3]) id="(.*?)">(.*?)<\/\1>/g);
    if (matches) {
      return Array.from(matches).map((match) => ({
        tag: match[1],
        id: match[2],
        innerHtml: match[3],
      }));
    }
    return [];
  }

  addIdFragmentToHeadings(html: string) {
    return html.replace(/<(h[1-3])>(.*?)<\/\1>/g, (match, p1, p2) => {
      const id = this.parseFragment(p2);
      return `<${p1} id="${id}">${p2}</${p1}>`;
    });
  }

  parseFragment(fragment: string) {
    return `section-${fragment.replace(/\s+/g, '-').toLowerCase()}`;
  }
}
