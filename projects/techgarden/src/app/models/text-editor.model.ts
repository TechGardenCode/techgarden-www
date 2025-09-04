export type TextBlockType = 'paragraph' | 'header';

export interface TextBlock {
  id: string;
  type: TextBlockType;
  content: string;
  data: {
    level?: number;
  };
}
