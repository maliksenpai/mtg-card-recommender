import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte()],
  base: "/mtg-card-recommender/",
  define: {
    "process.env.ANCHOR_BROWSER": true,
  },
});
