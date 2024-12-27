import type { Configuration } from 'webpack';

import { rules } from './webpack.rules';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import { plugins } from './webpack.plugins';
import path from "path";

export const mainConfig: Configuration = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: './src/index.ts',
  // Put your normal webpack config below here
  module: {
    rules,
  },
  plugins:[
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/assets/logo.ico'),
          to: path.resolve(__dirname, '.webpack/main/assets/'),
        },
      ],
    }),
  ],
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json'],
  },
};
