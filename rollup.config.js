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

const extensions = ['.ts', '.tsx'];

const isDevelopment = !!process.env.ROLLUP_WATCH;

// Custom plugin to handle CDN asset resolution
const cdnAssetResolver = () => ({
  name: 'cdn-asset-resolver',
  generateBundle(options, bundle) {
    for (const [fileName, chunk] of Object.entries(bundle)) {
      if (chunk.type === 'chunk' && chunk.isEntry) {
        // Add runtime asset resolution at the beginning of the entry chunk
        const runtimeCode = `
// CDN Asset Resolver - Dynamically resolve asset paths relative to script location
(function() {
  var scriptElement = document.currentScript || (function() {
    var scripts = document.getElementsByTagName('script');
    return scripts[scripts.length - 1];
  })();
  
  if (scriptElement && scriptElement.src) {
    var scriptUrl = new URL(scriptElement.src);
    var baseUrl = scriptUrl.href.substring(0, scriptUrl.href.lastIndexOf('/') + 1);
    
    // Create a global asset resolver
    window.__resolveAsset = function(assetPath) {
      return assetPath.startsWith('assets/') ? baseUrl + assetPath : assetPath;
    };
  } else {
    // Fallback for when script detection fails
    window.__resolveAsset = function(assetPath) { return assetPath; };
  }
})();
`;

        // Prepend the runtime code
        chunk.code = runtimeCode + chunk.code;

        // Replace all asset references with dynamic resolution calls
        chunk.code = chunk.code.replace(/"assets\/([^"]+)"/g, 'window.__resolveAsset("assets/$1")');
      }
    }
  },
});

const indexConfig = {
  plugins: [
    alias({
      entries: [{ find: '@', replacement: path.resolve(process.cwd(), 'src') }],
    }),
    url({
      include: ['**/*.svg', '**/*.png', '**/*.jpg', '**/*.mp3'],
      limit: 0, // Always emit files, never inline as data URLs
      emitFiles: true,
      fileName: 'assets/[name][extname]',
      publicPath: '',
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
      exclude: ['node_modules/**', '**/*.svg', '**/*.png', '**/*.jpg', '**/*.mp3'],
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
    cdnAssetResolver(),
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
