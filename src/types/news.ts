import { PortableTextBlock } from '@portabletext/types';

export interface NewsItem {
  _id: string;
  title: string;
  excerpt?: string;
  slug: string;
  date?: string;
  imageUrl?: string;
  body?: PortableTextBlock[];
}
