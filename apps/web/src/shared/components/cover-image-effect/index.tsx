import clsx from 'clsx';
import type { FunctionComponent, SVGProps } from 'react';

import { coverImageEffectStyles } from './styles.css';

type CoverImageEffectProps = {
  variant: keyof typeof coverImageEffectStyles;
  className?: string;
} & SVGProps<SVGSVGElement>;

export const CoverImageEffect: FunctionComponent<CoverImageEffectProps> = ({
  variant,
  className,
  ...props
}) => (
  <svg
    className={clsx(coverImageEffectStyles[variant], className)}
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    viewBox="0 0 1440 320"
    role="presentation"
    preserveAspectRatio="none"
    {...props}
  >
    <path d="M0,192L80,202.7C160,213,320,235,480,213.3C640,192,800,128,960,101.3C1120,75,1280,85,1360,90.7L1440,96L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z" />
  </svg>
);
