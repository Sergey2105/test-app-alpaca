import { defineConfig } from "vite";

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {},
    },
  },
  server: {
    host: true,
  },
});
