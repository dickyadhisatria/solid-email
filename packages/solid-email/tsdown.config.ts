import { defineConfig, type UserConfig } from 'tsdown';
import solid from 'vite-plugin-solid';

const base: Pick<UserConfig, 'deps' | 'dts' | 'fixedExtension' | 'format'> = {
  dts: true,
  deps: {
    neverBundle: [
      'solid-js',
      'solid-js/web',
      'solid-js/web/dist/server.js',
      '@solid-email/render',
    ],
  },
  format: ['cjs', 'esm'],
  fixedExtension: true,
};

export default defineConfig([
  {
    ...base,
    // Package root stays SSR/email-rendering oriented. Workerd/Worker package
    // conditions point at this same ESM build instead of a second server bundle.
    entry: ['./src/index.ts'],
    outDir: './dist',
    platform: 'browser',
    plugins: [
      solid({
        solid: {
          generate: 'ssr',
          hydratable: false,
          moduleName: 'solid-js/web/dist/server.js',
        },
      }),
    ],
  },
  {
    ...base,
    // Browser condition uses this DOM/CSR build for previews. It excludes
    // render/compile and Tailwind while keeping the public import specifier at
    // the package root.
    entry: ['./src/client/index.ts'],
    outDir: './dist/client',
    platform: 'browser',
    plugins: [
      solid({
        solid: {
          generate: 'dom',
          hydratable: false,
        },
      }),
    ],
  },
]);
