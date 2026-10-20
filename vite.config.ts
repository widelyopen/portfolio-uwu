import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Browser can't hit Discord / t.me directly (CORS); proxy in dev.
      "/api/discord": {
        target: "https://discord.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/discord/, "/api/v10"),
      },
      "/api/telegram": {
        target: "https://t.me",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/telegram/, ""),
      },
    },
  },
});
