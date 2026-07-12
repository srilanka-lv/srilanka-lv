'use client';

import { type FunctionComponent, type ReactElement, useState } from 'react';

import {
  tripPagePlanItineraryItemContentBaseStyles,
  tripPagePlanItineraryItemContentTextBaseStyles,
  tripPagePlanItineraryItemStyle,
  tripPagePlanItineraryItemToggleStyles,
} from './styles.css';

type TripPageExpandableProps = {
  title: string;
  subject: string;
  content: ReactElement;
};

export const TripPageExpandable: FunctionComponent<TripPageExpandableProps> = ({
  title,
  subject,
  content,
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
        aria-label={`Toggle ${title}`}
        aria-describedby={`trip-page-expandable-${title}`}
        data-state-expanded={isExpanded}
        data-state-collapsed={!isExpanded}
      >
        {title} • {subject}
      </button>
      <div className={tripPagePlanItineraryItemContentBaseStyles[state]}>
        <span className={tripPagePlanItineraryItemContentTextBaseStyles[state]}>{content}</span>
      </div>
    </div>
  );
};
