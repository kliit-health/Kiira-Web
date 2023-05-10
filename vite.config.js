import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import macrosPlugin from "vite-plugin-babel-macros";

// https://vitejs.dev/config/
export default defineConfig({
  esbuild: {
    jsxFactory: "jsx",
    jsxInject: `
      import { jsx } from '@emotion/react';
    `,
  },
  plugins: [macrosPlugin(), react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      src: "/src",
    },
  },
});
