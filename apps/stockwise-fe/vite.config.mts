import * as path from 'path';
import {defineConfig, loadEnv} from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

const root = import.meta.dirname;

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  const env = loadEnv(mode, root);
  const port = env.VITE_PORT ? Number(env.VITE_PORT) : undefined;

  return {
    root,
    cacheDir: '../../node_modules/.vite/apps/stockwise-fe',
    plugins: [svgr(), react()],
    server: {host: '0.0.0.0', port},
    preview: {host: '0.0.0.0', port},
    build: {outDir: '../../dist/apps/stockwise-fe', emptyOutDir: true},
    resolve: {
      alias: {
        src: path.resolve(root, 'src'),
      },
    },
  };
});