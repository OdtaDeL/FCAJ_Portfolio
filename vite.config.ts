import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/FCAJ_Portfolio/",
  build: {
    // This project intentionally bundles markdown content and rich diagram libs.
    chunkSizeWarningLimit: 1800,
  },
  define: {
    global: "globalThis",
    __BUILD_DATE__: JSON.stringify(new Date().toISOString()),
  },
});
