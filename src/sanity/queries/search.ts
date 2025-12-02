export const searchProductsQuery = `
  *[_type == "product" && language == $lang && title match $search]{
    _id,
    title,
    "slug": slug.current,
    "imageUrl": image.asset->url
  }
`;