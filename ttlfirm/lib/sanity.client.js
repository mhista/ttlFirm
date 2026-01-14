import { createClient } from 'next-sanity'
import { createImageUrlBuilder } from '@sanity/image-url'

export const client = createClient({
  projectId: '5lgtr8bc',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true, // Change to true for public dataset
  perspective: 'published',
})

// Image URL builder
const builder = createImageUrlBuilder(client)

export function urlFor(source) {
  return builder.image(source)
}
// Preview client (for draft content)
export const previewClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
  perspective: 'previewDrafts',
})

export function getClient(preview = false) {
  return preview ? previewClient : client
}