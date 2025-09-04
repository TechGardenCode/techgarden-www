export interface PostMetadata {
  id: string;
  title: string;
  description: string;
  author: string;
  tags: string[];
  categories: string[];
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}
