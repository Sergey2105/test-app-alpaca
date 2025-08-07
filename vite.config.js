import { defineConfig } from "vite";

export default defineConfig({
  base: "/test-app-alpaca/",
  server: {
    host: true,
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
      },
    },
  },
});
