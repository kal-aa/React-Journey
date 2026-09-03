import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        // "https://super-duper-sniffle-r4pwxp6g56grhxgxx-3000.app.github.dev",
      },
      "/images": {
        target: "http://localhost:3000",
        // "https://super-duper-sniffle-r4pwxp6g56grhxgxx-3000.app.github.dev",
      },
    },
  },
});
