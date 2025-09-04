import { Component, input } from '@angular/core';
import { PostBodyJson } from '@seed/models';
import { PostSection2 } from "../post-section-2/post-section";

@Component({
  selector: 'app-post-group-2',
  imports: [PostSection2],
  templateUrl: './post-group.html',
  styleUrl: './post-group.css',
})
export class PostGroup2 {
  postBodyJson = input<PostBodyJson[]>([]);
}
