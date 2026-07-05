import { createFileRoute } from '@tanstack/solid-router';
import { renderCloudflareEmailReportFn } from '../email.functions';

export const Route = createFileRoute('/')({
  loader: () => renderCloudflareEmailReportFn(),
  component: Home,
});

function Home() {
  const report = Route.useLoaderData();
  return (
    <main data-email-status={report().status}>
      <h1>Cloudflare TanStack Start Solid route loaded</h1>
      <p>{report().plainText}</p>
      <pre data-email-html={report().status}>{report().html}</pre>
    </main>
  );
}
