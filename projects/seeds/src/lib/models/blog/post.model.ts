export type Post = {
  id: string;
  title: string;
  description: string;
  date: string;
  fileName: string;
  imageUrl: string;
};

export type PostSectionType = {
  tag: 'h1' | 'h2' | 'h3' | 'code' | 'li' | 'blockquote' | 'p' | 'a' | 'img';
  content: string | string[];
  meta?: {
    language?: string;
    alt?: string;
    href?: string;
    id?: string;
  };
};

export type Post2 = {
  id: string;
  metadata: PostMetadata;
  body: PostBody;
  createdAt: string;
  updatedAt: string;
};
export type PostMetadata = {
  id: string;
  title: string;
  description: string;
  author: string;
  tags?: null;
  categories?: null;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
};
export type PostBody = {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};
