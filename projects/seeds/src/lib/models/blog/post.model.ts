import { Profile } from '../profile.model';

export interface Post {
  id: string;
  title: string;
  description: string;
  date: string;
  fileName: string;
  imageUrl: string;
}

export interface PostSectionType {
  tag: 'h1' | 'h2' | 'h3' | 'code' | 'li' | 'blockquote' | 'p' | 'a' | 'img';
  content: string | string[];
  meta?: {
    language?: string;
    alt?: string;
    href?: string;
    id?: string;
  };
}

export interface Post2 {
  id: string;
  metadata: PostMetadata;
  body: PostBody;
  createdAt: string;
  updatedAt: string;
}

export interface PostMetadata {
  id: string;
  title: string;
  description: string;
  author: Profile;
  publicPost: boolean;
  tags?: null;
  categories?: null;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}
export interface PostBody {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface PostFormSubmit {
  action: 'submit' | 'delete';
  postForm?: PostForm;
}

export interface PostForm {
  title: string;
  description: string;
  imageUrl: string;
  content: string;
  publicPost: boolean;
}

export interface Reaction {
  id: string;
  parentId: string;
  parentType: 'post' | 'comment';
  user: Profile;
  content: string;
  reactionType: string;
  createdAt: string;
  updatedAt: string;
}

export interface PostCommentModel {
  id: string;
  content: string;
  author: Partial<Profile>;
  createdAt: string;
  updatedAt: string;
}
