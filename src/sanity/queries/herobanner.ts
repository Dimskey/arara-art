export const heroBannerQuery = `
*[_type == "heroBanner"]{
  _id,
  title_id,
  title_en,
  description_id,
  description_en,
  link,
  image{
    asset->{
      url
    }
  }
}
`;
