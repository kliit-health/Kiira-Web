import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import macrosPlugin from 'vite-plugin-babel-macros';
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  esbuild: {
    jsxFactory: 'jsx',
    jsxInject: `
    import { jsx } from '@emotion/react';
  `
  },
  plugins: [macrosPlugin(), react(), svgr()],
  server: {
    port: 3000
  },
  resolve: {
    alias: {
      src: '/src'
    }
  }
});
