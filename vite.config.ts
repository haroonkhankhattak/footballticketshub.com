import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      // Optional: Proxy server-side API calls (if using Express or other server-side framework)
      "/api": "http://localhost:5000", // Adjust based on your server setup
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@server": path.resolve(__dirname, "./server"), // Optional, for using server-side code in the client
    },
  },
});
