import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Suppress the chunk size warning — we have Firebase + React + Lucide bundled
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // Split vendor libraries into separate cacheable chunks
        manualChunks: {
          'react-vendor':    ['react', 'react-dom'],
          'firebase-app':    ['firebase/app'],
          'firebase-auth':   ['firebase/auth'],
          'firebase-store':  ['firebase/firestore'],
          'firebase-storage':['firebase/storage'],
          'lucide':          ['lucide-react'],
        },
      },
    },
  },
})
