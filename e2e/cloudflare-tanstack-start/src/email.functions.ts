import { createServerFn } from '@tanstack/solid-start';
import { renderCloudflareEmailReport } from './email.server';

export const renderCloudflareEmailReportFn = createServerFn({
  method: 'GET',
}).handler(() => renderCloudflareEmailReport());
