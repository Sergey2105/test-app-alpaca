import { defineConfig } from "vite";

export default defineConfig({
  css: {
    devSourcemap: false,
  },
  base: "/test-app-alpaca/",
  server: {
    host: true,
  },
});
