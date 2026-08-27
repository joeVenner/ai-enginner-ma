'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

export default function TopLoader() {
  return (
    <ProgressBar
      height="3px"
      color="var(--primary)"
      options={{ showSpinner: false }}
      shallowRouting
    />
  );
}
