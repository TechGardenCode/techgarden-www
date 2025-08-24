import {
  Component,
  computed,
  effect,
  inject,
  OnInit,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Anchor } from '../../components/anchor/anchor';
import { PostsService } from '../../services/posts.service';
import { DomSanitizer } from '@angular/platform-browser';
import { PostGroup } from '../../components/post/post-group/post-group';
import { Post } from '../../types/post.type';
import { SeedH1 } from '@seed/typography/seed-h1';

@Component({
  selector: 'app-posts',
  imports: [Header, Footer, RouterModule, Anchor, PostGroup, SeedH1],
  templateUrl: './posts.html',
  styleUrl: './posts.css',
  encapsulation: ViewEncapsulation.None,
})
export class Posts implements OnInit {
  postsService = inject(PostsService);
  sanitizer = inject(DomSanitizer);
  activatedRoute = inject(ActivatedRoute);
  postContents = signal<{ fragment: string; title: string, tag: string }[]>([]);

  post = signal<Post | undefined>(undefined);

  breadcrumbItems = [{ url: '/', label: 'Home' }];

  mdPost = signal<string>('');

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const postId = params['postId'];
      this.getPostById(postId);
    });
  }

  getPostById(postId: string) {
    this.postsService.getPostById(postId).subscribe((post) => {
      if (!post) {
        return;
      }
      this.post.set(post);
      this.getPostMdByFileName(post.fileName);
      this.breadcrumbItems.push({ url: `/posts/${postId}`, label: post.title });
    });
  }

  getPostMdByFileName(fileName: string) {
    this.postsService.getPostMdByFileName(fileName).subscribe((content) => {
      this.mdPost.set(content);
    });
  }

  parseFragment(fragment: string) {
    return fragment.trim().toLowerCase().split(' ').join('-');
  }
}
