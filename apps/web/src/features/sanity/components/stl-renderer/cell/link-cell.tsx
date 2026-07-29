import type { LinkCellProps } from 'structured-table';

import { isExternalHref } from '@/shared/utils/is-external-href';

const LinkCell = ({ data }: { data: LinkCellProps }) => {
  const external = isExternalHref(data.href);

  return (
    <a
      href={data.href}
      target={data.newTab ? '_blank' : '_self'}
      rel="noopener noreferrer"
      data-umami-event={external ? 'outbound-link' : undefined}
      data-umami-event-url={external ? data.href : undefined}
    >
      {data.text}
    </a>
  );
};

export { LinkCell };
