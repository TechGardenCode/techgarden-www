import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { PostMetadata } from '@seed/models';
import { SeedH1 } from "@seed/typography";

@Component({
  selector: 'app-post-header',
  imports: [DatePipe, SeedH1],
  templateUrl: './post-header.html',
  styleUrl: './post-header.css',
})
export class PostHeader {
  postMetadata = input<PostMetadata>();
}
