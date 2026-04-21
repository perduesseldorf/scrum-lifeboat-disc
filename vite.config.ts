import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// GitHub Pages project URL: https://<user>.github.io/<repo>/
const repoName = "scrum-lifeboat-disc";

export default defineConfig(({ mode }) => ({
  base: mode === "production" ? `/${repoName}/` : "/",
  server: {
    host: "localhost",
    port: 3000,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
