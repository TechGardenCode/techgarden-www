import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { RouterModule } from '@angular/router';
import { Anchor } from '../../components/anchor/anchor';

@Component({
  selector: 'app-posts',
  imports: [Header, Footer, RouterModule, Anchor],
  templateUrl: './posts.html',
  styleUrl: './posts.css',
})
export class Posts {
  post = {
    id: '',
    title: 'Lorem Ipsum',
    categories: ['lipsum'],
    tags: ['lorem', 'ipsum', 'dolor', 'sit', 'amet'],
    sections: [
      {
        title: 'Section 1',
        content:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nisi lorem, imperdiet non ipsum sed, suscipit varius sapien. Duis efficitur mi nec fermentum vulputate. Duis eget nisl mi. Nunc in libero vel purus pretium faucibus at quis enim. Aliquam id sodales sapien. Nulla facilisi. Cras in tincidunt dui, scelerisque lacinia tellus. Nulla sapien augue, commodo eu interdum vitae, efficitur et elit. Proin malesuada lobortis dui sed ullamcorper. Aenean purus metus, dictum at leo et, iaculis accumsan ligula. Nullam hendrerit dignissim tortor, a congue lectus molestie sit amet. Sed et aliquet dolor. Aenean dapibus nulla non dolor viverra porta.',
      },
      {
        title: 'Section 2',
        content:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nisi lorem, imperdiet non ipsum sed, suscipit varius sapien. Duis efficitur mi nec fermentum vulputate. Duis eget nisl mi. Nunc in libero vel purus pretium faucibus at quis enim. Aliquam id sodales sapien. Nulla facilisi. Cras in tincidunt dui, scelerisque lacinia tellus. Nulla sapien augue, commodo eu interdum vitae, efficitur et elit. Proin malesuada lobortis dui sed ullamcorper. Aenean purus metus, dictum at leo et, iaculis accumsan ligula. Nullam hendrerit dignissim tortor, a congue lectus molestie sit amet. Sed et aliquet dolor. Aenean dapibus nulla non dolor viverra porta.',
      },
      {
        title: 'Section 3',
        content:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nisi lorem, imperdiet non ipsum sed, suscipit varius sapien. Duis efficitur mi nec fermentum vulputate. Duis eget nisl mi. Nunc in libero vel purus pretium faucibus at quis enim. Aliquam id sodales sapien. Nulla facilisi. Cras in tincidunt dui, scelerisque lacinia tellus. Nulla sapien augue, commodo eu interdum vitae, efficitur et elit. Proin malesuada lobortis dui sed ullamcorper. Aenean purus metus, dictum at leo et, iaculis accumsan ligula. Nullam hendrerit dignissim tortor, a congue lectus molestie sit amet. Sed et aliquet dolor. Aenean dapibus nulla non dolor viverra porta.',
      },
      {
        title: 'Section 4',
        content:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nisi lorem, imperdiet non ipsum sed, suscipit varius sapien. Duis efficitur mi nec fermentum vulputate. Duis eget nisl mi. Nunc in libero vel purus pretium faucibus at quis enim. Aliquam id sodales sapien. Nulla facilisi. Cras in tincidunt dui, scelerisque lacinia tellus. Nulla sapien augue, commodo eu interdum vitae, efficitur et elit. Proin malesuada lobortis dui sed ullamcorper. Aenean purus metus, dictum at leo et, iaculis accumsan ligula. Nullam hendrerit dignissim tortor, a congue lectus molestie sit amet. Sed et aliquet dolor. Aenean dapibus nulla non dolor viverra porta.',
      },
    ],
  };

  breadcrumbItems = [
    { url: '/', label: 'Home' },
    { url: '/posts', label: this.post.title },
  ];

  parseFragment(fragment: string) {
    return fragment.trim().toLowerCase().split(' ').join('-');
  }
}
