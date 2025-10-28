export interface Collection {
  id: string;
  image: string;
  slug: string;
}

export interface Category {
  id: string;
  label: string;
  icon: string;
  href: string;
}

export interface HeroBanner {
  id: string;
  image: string;

}
export interface AboutBanner {
  id: string;
  image: string;
  title?: string;
  description?: string;
}