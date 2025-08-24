import { Component, computed, effect, inject, linkedSignal, OnInit, ViewEncapsulation } from '@angular/core';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { PostsService } from '../../services/posts.service';
import { RouterLink } from '@angular/router';
import { Anchor } from '../../components/anchor/anchor';

@Component({
  selector: 'app-home',
  imports: [Header, Footer, RouterLink, Anchor],
  templateUrl: './home.html',
  styleUrl: './home.css',
  encapsulation: ViewEncapsulation.None,
})
export class Home implements OnInit {
  postsService = inject(PostsService);

  posts = this.postsService.markdownPosts;
  postsApiState = computed(() => this.postsService.postsApiState());
  breadcrumbItems = [{ url: '/', label: 'Home' }];

  ngOnInit() {
    this.postsService.getPosts();
    this.postsService.fetchMarkdownPosts();
  }
}
