/**
 * Generates a side-by-side visual comparison of all email outputs.
 * Each bench writes its own HTML; this script reads them all and computes
 * pairwise conformance for the visual viewer.
 */
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { render as jsxRender } from 'jsx-email';
import { render } from 'react-email';
import { createJsxMarketingEmail } from './jsx-email/template';
import { createMjmlMarketingEmail } from './mjml-react/template';
import { createReactMarketingEmail } from './react-email/template';
import { marketingProps } from './shared/fixture-data';
import { checkConformance, saveSideBySide } from './shared/validate';

const __dirname = dirname(fileURLToPath(import.meta.url));
const RESULTS_DIR = join(__dirname, 'results');

function readHtml(filename: string): string {
  return readFileSync(join(RESULTS_DIR, filename), 'utf-8');
}

async function main() {
  // React Email — use the same render path as the benchmark
  const reactHtml = await render(createReactMarketingEmail(marketingProps));

  // JSX Email — use the same render path as the benchmark
  const jsxHtml = await jsxRender(createJsxMarketingEmail(marketingProps));

  // MJML-React
  const mjml = (await import('mjml')).default;
  const { renderToMjml } = await import('@faire/mjml-react/utils/renderToMjml');
  const mjmlString = renderToMjml(createMjmlMarketingEmail(marketingProps));
  const { html: mjmlHtml } = await mjml(mjmlString, {
    validationLevel: 'soft',
  });

  // Solid Email — read from disk (written by solid bench)
  const solidHtml = readHtml('solid.html');

  // Compare each output against the solid-email target shown in the viewer.
  const pairs: [string, string][] = [
    ['solid', solidHtml],
    ['jsx-email', jsxHtml],
    ['react-email', reactHtml],
    ['mjml-react', mjmlHtml],
  ];

  const outputs = pairs.map(([name, html]) => ({
    name,
    html,
    conformance: checkConformance(solidHtml, html),
  }));
  const comparisonPath = saveSideBySide(solidHtml, outputs);
  console.log(`Visual comparison saved to ${comparisonPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
