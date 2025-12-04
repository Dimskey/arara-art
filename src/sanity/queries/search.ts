export const searchProductsQuery = `
  *[_type == "product" && language == $lang && title match $search] {
    _id,
    "slug": slug.current,
    title,
    "imageUrl": images[0].asset->url
  }[0...10]
`;