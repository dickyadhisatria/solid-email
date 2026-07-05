import { defineConfig, type UserConfig } from 'tsdown';
import solid, { type Options as SolidPluginOptions } from 'vite-plugin-solid';

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

type SolidCompilerOptions = NonNullable<SolidPluginOptions['solid']> & {
  validate?: boolean;
};

const emailSolidCompilerOptions = {
  // Solid's template validator assumes fragments will be parsed through
  // innerHTML. Email components intentionally expose document-level
  // <html>, <head>, and <body> roots, which browsers normalize when parsed
  // as fragments even though Solid's SSR output is the desired final HTML.
  validate: false,
} satisfies SolidCompilerOptions;

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
          ...emailSolidCompilerOptions,
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
          ...emailSolidCompilerOptions,
          generate: 'dom',
          hydratable: false,
        },
      }),
    ],
  },
]);
