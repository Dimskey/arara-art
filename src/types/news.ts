
export interface NewsItem {
  _id: string;
  title: string;
  slug: string | { current: string }; // Support both formats
  excerpt?: string;
  imageUrl?: string;
  date?: string;
  body?: any;
  language?: string;
}