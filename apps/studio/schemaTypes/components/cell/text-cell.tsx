import React from 'react';
import type { TextCellProps } from 'structured-table';

const TextCell = React.memo(({ data }: { data: TextCellProps }) => {
  if (!Array.isArray(data.value)) {
    return <>{data.value}</>;
  }
  return (
    <>
      {data.value.map((node) => {
        if (node.type === 'string') {
          return <React.Fragment key={node.uid}>{node.data}</React.Fragment>;
        }
        if (node.type === 'html' && node.tag === 'br') {
          return <br key={node.uid} />;
        }
        return null;
      })}
    </>
  );
});
TextCell.displayName = 'TextCell';

export { TextCell };
