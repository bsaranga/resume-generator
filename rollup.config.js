import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import mdx from '@mdx-js/rollup';
import postcss from 'rollup-plugin-postcss';
import tailwind from '@tailwindcss/postcss';
import image from '@rollup/plugin-image'

const isProduction = false;

export default {
  input: 'src/index.jsx',
  output: {
    file: 'dist/bundle.js',
    format: 'iife', // Suitable for browsers
    sourcemap: true,
  },
  plugins: [
    image(),
    postcss({
      plugins: [tailwind],
      extensions: ['.css']
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(isProduction ? 'production' : 'development'),
      preventAssignment: true, // Prevents accidental assignment to process.env
    }),
    nodeResolve({
      extensions: ['.js', '.jsx'],
    }),
    commonjs(),
    mdx(),
    babel({
      babelHelpers: 'bundled',
      include: ['src/**/*'],
      extensions: ['.js', '.jsx', '.md', '.mdx'],
      presets: [
        [
          '@babel/preset-react',
          { runtime: 'automatic' }
        ]
      ]
    }),
  ],
};