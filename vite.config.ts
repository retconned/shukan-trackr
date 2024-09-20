import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        globPatterns: [
          "**/*.{js,ts,jsx,tsx,css,html,ico,png,svg,json,txt,woff2}",
        ],
      },
      manifest: {
        name: "Habit Tracker!",
        short_name: "HabitTracker",
        description: "Track your habits and maintain streaks!",
        theme_color: "#191615",
        icons: [
          {
            src: "/icons/16.png",
            sizes: "16x16",
            type: "image/png",
          },
          {
            src: "/icons/32.png",
            sizes: "32x32",
            type: "image/png",
          },
          {
            src: "/icons/180.png",
            sizes: "180x180",
            type: "image/png",
          },
          {
            src: "/icons/192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icons/512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        display: "standalone",
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
