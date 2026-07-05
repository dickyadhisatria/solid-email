import * as PrismImport from 'prismjs';
import 'prismjs/components/prism-python.js';
import 'prismjs/components/prism-typescript.js';

type PrismModule = typeof PrismImport;

// Prism ships as CommonJS. Depending on the bundler/runtime, the module can
// appear either as a namespace object or under `default`; normalize that once
// so the rest of CodeBlock can use the Prism API directly.
const PrismImportWithDefault = PrismImport as PrismModule & {
  default?: PrismModule;
};
const Prism: PrismModule = PrismImportWithDefault.default ?? PrismImport;

// Register the grammars covered by CodeBlock's e2e/test surface without using
// prismjs/components/index.js. That loader calls require.resolve at runtime,
// which is not available in Workerd.

export { Prism };
