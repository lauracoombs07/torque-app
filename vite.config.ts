import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/training-application",
  server: {
    open: "/training-application/team",
    port: 5173,
    proxy: {
      "/training-application/api": {
        target: "http://localhost:8089",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/training-application/, "")
      }
    }
  }
})
