import { type SchemaTypeDefinition } from 'sanity'
import { news } from './news'
import heroBanner from './herobanner'
import product from './product'

export const schemaTypes: SchemaTypeDefinition[] = [
  news,
  heroBanner,
  product
]
