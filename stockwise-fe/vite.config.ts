import * as path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [svgr(), react(), eslint()],
    server: {
      port: Number(process.env.VITE_PORT),
    },
    resolve: {
      alias: {
        src: path.resolve(__dirname, 'src'),
      },
    },
  });
};
