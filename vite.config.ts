import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  build: {
    outDir: "build",
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom", "react-router-dom"],
          mui: [
            "@mui/material",
            "@mui/icons-material",
            "@mui/lab",
            "@emotion/react",
            "@emotion/styled",
          ],
          markdown: [
            "react-markdown",
            "remark-gfm",
            "remark-breaks",
            "rehype-raw",
          ],
        },
      },
    },
  },
});
