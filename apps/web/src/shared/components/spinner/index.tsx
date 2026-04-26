import clsx from 'clsx';

import { spinnerStyles } from './styles.css';

type SpinnerProps = {
  size?: 'small' | 'medium' | 'large';
  className?: string;
};

export function Spinner({ size, className }: SpinnerProps) {
  return (
    <span role="status" aria-label="Loading" className={clsx(spinnerStyles({ size }), className)} />
  );
}
