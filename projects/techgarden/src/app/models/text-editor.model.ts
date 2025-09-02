export type TextBlockType = 'paragraph' | 'header';

export type TextBlock = {
  id: string;
  type: TextBlockType;
  content: string;
  data: {
    level?: number;
  };
};
