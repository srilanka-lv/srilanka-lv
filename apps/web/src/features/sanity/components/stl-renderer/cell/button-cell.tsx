'use client';

import { type MouseEvent, useId } from 'react';
import type { ButtonCellProps } from 'structured-table';

import { isExternalHref } from '@/shared/utils/is-external-href';

const ButtonCell = ({ data }: { data: ButtonCellProps }) => {
  const stableId = useId();

  const handleBtnClick = (e: MouseEvent<HTMLButtonElement>) => {
    try {
      // 1. If URL is present, it opens the url in new tab
      if (data.url) {
        window.open(data.url, '_blank');
        return;
      }

      // 2. If action is present, it dispatches a custom event
      if (data.action) {
        const event = new CustomEvent('st-action', {
          detail: {
            action: data.action,
            targetId: data.targetId,
            text: data.text,
            originalEvent: e,
          },
          bubbles: true,
        });
        e.currentTarget.dispatchEvent(event);
        console.log(`[StructuredTable] Action triggered: ${data.action}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const external = Boolean(data.url && isExternalHref(data.url));

  return (
    <button
      type="button"
      onClick={handleBtnClick}
      id={data.targetId ?? stableId}
      className="st-button"
      data-action={data.action}
      data-variant={data.variant}
      data-umami-event={external ? 'outbound-link' : undefined}
      data-umami-event-url={external ? data.url : undefined}
    >
      {data.text}
    </button>
  );
};

export { ButtonCell };
