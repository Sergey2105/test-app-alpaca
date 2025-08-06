import { defineConfig } from "vite";

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {},
    },
  },
  base: "/test-app-alpaca/",
  server: {
    host: true,
  },
});
