import createImageUrlBuilder from '@sanity/image-url'
import { client } from "./client";

const builder = createImageUrlBuilder(client);

export function urlFor(source: { asset?: { _ref?: string; _type?: string } }) {
  return builder.image(source);
}