const {NxAppWebpackPlugin} = require('@nx/webpack/app-plugin');
const {join} = require('path');

module.exports = {
  output: {
    path: join(__dirname, '../../dist/apps/stockwise-be'),
    clean: true,
  },
  // The app compares NODE_ENV against 'dev'/'prod' at runtime, so webpack must not inline it.
  optimization: {nodeEnv: false},
  plugins: [
    new NxAppWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: './src/main.ts',
      tsConfig: './tsconfig.app.json',
      // Loaded at runtime via worker_threads, so it cannot be bundled.
      assets: [{input: './src/modules/stockPrice', glob: 'stockPrice.worker.js', output: '.'}],
      optimization: false,
      outputHashing: 'none',
      generatePackageJson: true,
      sourceMap: true,
    }),
  ],
};
