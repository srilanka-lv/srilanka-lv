import type { Metadata } from 'next';

import { AUTHOR_NAME } from '@/shared/constants/author-name';

export const metadata: Metadata = {
  title: 'Image License',
  description: `Licensing and usage terms for photographs by ${AUTHOR_NAME} on srilanka.lv.`,
};

export default function LicensePage() {
  return (
    <main>
      <h1>Image License</h1>
      <p>
        All photographs published on this website are © {AUTHOR_NAME}. They are protected by
        copyright and may not be reproduced, redistributed, or used commercially without prior
        written permission.
      </p>
      <h2>Personal &amp; editorial use</h2>
      <p>
        You may share or embed images linking back to the original page on srilanka.lv for
        non-commercial editorial purposes, with credit to {AUTHOR_NAME}.
      </p>
      <h2>Commercial licensing</h2>
      <p>
        For commercial use, prints, or any other licensing inquiries please contact us via the{' '}
        <a href="/contact">contact page</a>.
      </p>
    </main>
  );
}
