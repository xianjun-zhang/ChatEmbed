import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import { babel } from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import { uglify } from 'rollup-plugin-uglify';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import copy from 'rollup-plugin-copy';
import url from '@rollup/plugin-url';
import alias from '@rollup/plugin-alias';
import path from 'path';

const extensions = ['.ts', '.tsx', '.svg', '.png', '.jpg', '.mp3'];

const isDevelopment = !!process.env.ROLLUP_WATCH;

const indexConfig = {
  plugins: [
    alias({
      entries: [{ find: '@', replacement: path.resolve(process.cwd(), 'src') }],
    }),
    url({
      include: ['**/*.svg', '**/*.png', '**/*.jpg', '**/*.mp3'],
      limit: 0, // Always emit files, never inline as data URLs
      emitFiles: true,
      fileName: 'assets/[name].[hash][extname]',
    }),
    resolve({
      extensions,
      browser: true,
      preferBuiltins: false,
      dedupe: ['solid-js'],
    }),
    commonjs(),
    uglify(),
    json(),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      presets: ['solid', '@babel/preset-typescript'],
      extensions,
    }),
    postcss({
      plugins: [autoprefixer(), tailwindcss()],
      extract: false,
      modules: false,
      autoModules: false,
      minimize: true,
      inject: false,
    }),
    typescript(),
    copy({
      targets: [
        {
          src: 'src/assets/**/*',
          dest: 'dist/assets',
        },
      ],
      hook: 'writeBundle',
    }),
    terser({ output: { comments: false } }),

    // Development-only plugins (only included during --watch mode)
    ...(isDevelopment
      ? [
          serve({
            open: false,
            onListening(server) {
              console.log(`🚀 Dev server: http://localhost:${server.address().port}`);
              console.log(`📄 Demo page: http://localhost:${server.address().port}/`);
              console.log(`📦 Library: http://localhost:${server.address().port}/web.js`);
            },
            verbose: true,
            contentBase: ['dist', 'demo'],
            host: 'localhost',
            port: 5678,
            strictPort: false, // Allow rollup to find next available port
          }),
          livereload({
            watch: ['dist', 'demo'],
            clientUrl: 'http://localhost:35729/livereload.js?snipver=1',
            verbose: true,
          }),
        ]
      : []),
  ],
};

const configs = [
  {
    ...indexConfig,
    input: './src/web.ts',
    output: {
      file: 'dist/web.js',
      format: 'es',
      assetFileNames: 'assets/[name][extname]',
    },
  },
];

export default configs;
