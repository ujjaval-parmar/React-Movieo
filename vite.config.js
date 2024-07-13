import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": {
      VITE_APP_ACCESS_TOKEN: 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiN2ZkNjU4MWMzZWQ5NWU4NzJiMGYxMGRhYzIzMDk2NCIsIm5iZiI6MTcyMDY2NDY3MC44Njk4MTYsInN1YiI6IjY1YTAzM2MxNWNhNzA0MDEyZWE5NmYwMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rBUPfvC4ynjya1GWFF1-QMZANeeqR5De8hMpe1hxqTQ'
    },
  },
})
