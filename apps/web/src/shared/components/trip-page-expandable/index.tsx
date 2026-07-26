'use client';

import Image from 'next/image';
import { type FunctionComponent, type ReactElement, useState } from 'react';

import {
  tripPagePlanItineraryItemContentBaseStyles,
  tripPagePlanItineraryItemContentImageStyle,
  tripPagePlanItineraryItemContentTextBaseStyles,
  tripPagePlanItineraryItemStyle,
  tripPagePlanItineraryItemToggleIconStyles,
  tripPagePlanItineraryItemToggleStyles,
  tripPagePlanItineraryItemToggleTitleStyle,
} from './styles.css';

type TripPageExpandableProps = {
  title: string;
  subject: string;
  content: ReactElement;
  imageSrc: string;
};

export const TripPageExpandable: FunctionComponent<TripPageExpandableProps> = ({
  title,
  subject,
  content,
  imageSrc,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const state = isExpanded ? 'expanded' : 'collapsed';

  return (
    <div className={tripPagePlanItineraryItemStyle}>
      <button
        type="button"
        className={tripPagePlanItineraryItemToggleStyles[state]}
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
        aria-controls={`trip-page-expandable-${title}`}
        data-state-expanded={isExpanded}
        data-state-collapsed={!isExpanded}
      >
        <span>{title}</span>{' '}
        <span className={tripPagePlanItineraryItemToggleTitleStyle}>{subject}</span>
        <svg
          className={tripPagePlanItineraryItemToggleIconStyles[state]}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 640"
          aria-hidden="true"
        >
          <path d="M297.4 470.6C309.9 483.1 330.2 483.1 342.7 470.6L534.7 278.6C547.2 266.1 547.2 245.8 534.7 233.3C522.2 220.8 501.9 220.8 489.4 233.3L320 402.7L150.6 233.4C138.1 220.9 117.8 220.9 105.3 233.4C92.8 245.9 92.8 266.2 105.3 278.7L297.3 470.7z" />
        </svg>
      </button>
      <div className={tripPagePlanItineraryItemContentBaseStyles[state]}>
        <span className={tripPagePlanItineraryItemContentTextBaseStyles[state]}>
          <Image
            className={tripPagePlanItineraryItemContentImageStyle}
            src={imageSrc}
            alt={title}
            width={125}
            height={125}
          />
          <span>{content}</span>
        </span>
      </div>
    </div>
  );
};
