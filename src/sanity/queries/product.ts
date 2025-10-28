// 🔹 Ambil semua produk (misal untuk list atau grid)
export const allProductsQuery = `
  *[_type == "product" && language == $lang] | order(_createdAt desc) {
    title,
    "slug": slug.current,
    images[]{ "url": asset->url },
    price,
    discountPrice,
    category
  }
`;

// 🔹 Ambil semua kategori unik (hanya dari produk sesuai bahasa)
export const allCategoriesQuery = `
  array::unique(*[_type == "product" && language == $lang].category)
`;

// 🔹 Ambil 1 produk berdasarkan slug (untuk halaman detail)
export const productBySlugQuery = `
  *[_type == "product" && slug.current == $slug && language == $lang][0] {
    title,
    "slug": slug.current,
    images[]{ "url": asset->url },
    price,
    discountPrice,
    description,
    shopeeLink,
    tokopediaLink,
    category
  }
`;
