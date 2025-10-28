import { defineConfig } from 'vite'
import { config } from 'dotenv'

// Load environment variables
config()

export default defineConfig({
  define: {
    'process.env.NEXT_PUBLIC_SANITY_PROJECT_ID': JSON.stringify(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '095h3h0d'),
    'process.env.NEXT_PUBLIC_SANITY_DATASET': JSON.stringify(process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'),
    'process.env.NEXT_PUBLIC_SANITY_API_VERSION': JSON.stringify(process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-10-06'),
  },
})
