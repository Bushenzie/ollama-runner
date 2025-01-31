import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  build: {
    outDir: "dist-ui",
  },
  base: "./",
  plugins: [tailwindcss(), react()],
  server: {
    port: 3232,
    strictPort: true,
  },
});
