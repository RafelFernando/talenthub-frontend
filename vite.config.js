import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/wilayah-api": {
        target: "https://wilayah.id",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/wilayah-api/, ""),
      },
    },
  },
})
