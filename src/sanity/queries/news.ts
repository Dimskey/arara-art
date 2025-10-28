// 🔹 Ambil semua berita (list/grid)
export const allNewsQuery = `
  *[_type == "news" && language == $lang] | order(date desc) {
    _id,
    title,
    "slug": slug.current,
    date,
    excerpt,
    category,
    "imageUrl": image.asset->url
  }
`;

// 🔹 Ambil 1 berita berdasarkan slug
export const singleNewsQuery = `
  *[_type == "news" && slug.current == $slug && language == $lang][0] {
    _id,
    title,
    "slug": slug.current,
    "imageUrl": mainImage.asset->url,
    excerpt,
    date,
    body
  }
`;
