import { Component, effect, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { Posts } from '../../services/posts';
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
  postsService = inject(Posts);
  posts = this.postsService.markdownPosts;
  breadcrumbItems = [{ url: '/', label: 'Home' }];

  constructor() {
    effect(() => {
      console.log(this.posts());
    });
  }

  ngOnInit() {
    this.postsService.fetchMarkdownPosts();
  }
}
