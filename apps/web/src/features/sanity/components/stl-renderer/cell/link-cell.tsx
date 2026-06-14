import type { LinkCellProps } from 'structured-table';

const LinkCell = ({ data }: { data: LinkCellProps }) => {
  return (
    <a href={data.href} target={data.newTab ? '_blank' : '_self'} rel="noopener noreferrer">
      {data.text}
    </a>
  );
};

export { LinkCell };
