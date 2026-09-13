import { globalStyle, style } from '@vanilla-extract/css';

import { inComponentsLayer } from '@/shared/styles/layers/layers';
import { vars } from '@/shared/styles/themes/theme.contract.css';
import { breakpoints } from '@/shared/styles/tokens/breakpoints';

const { border, color, font, spacing, transition } = vars;

/**
 * Hidden until there is a margin wide enough to hold it. Below `xl` the guide
 * keeps the collapsible table of contents that sits inline in the article.
 */
export const sidebarStyle = style(
  inComponentsLayer({
    display: 'none',

    '@media': {
      [`screen and (min-width: ${breakpoints.xl})`]: {
        display: 'block',
        position: 'sticky',
        top: spacing[10],
        maxHeight: `calc(100vh - ${spacing[20]})`,
        overflowY: 'auto',
        paddingRight: spacing[2],
      },
    },
  }),
);

export const titleStyle = style(
  inComponentsLayer({
    margin: 0,
    marginBottom: spacing[3],
    fontSize: font.size.xs,
    fontWeight: font.weight.semibold,
    letterSpacing: font.letterSpacing.wider,
    textTransform: 'uppercase',
    color: color.secondaryForeground,
  }),
);

export const listStyle = style(
  inComponentsLayer({
    listStyle: 'none',
    margin: 0,
    padding: 0,
    borderLeft: `1px solid ${color.border}`,
  }),
);

export const linkStyle = style(
  inComponentsLayer({
    display: 'flex',
    gap: spacing[2],
    paddingBlock: spacing[2],
    paddingInline: spacing[4],
    marginLeft: '-1px',
    borderLeft: '1px solid transparent',
    fontSize: font.size.sm,
    lineHeight: font.lineHeight.snug,
    color: color.foreground,
    transition: `color ${transition.duration.faster} ${transition.easing.easeInOut}`,

    // Opt out of the sitewide link treatment: the coral bar swiping over a
    // dense list of 18 entries is noise. The active entry is marked with the
    // accent rule on its left edge instead.
    '::after': {
      content: 'none',
    },
    ':hover': {
      color: color.accent,
    },

    selectors: {
      '&[aria-current="true"]': {
        color: color.accent,
        borderLeftColor: color.accent,
        fontWeight: font.weight.medium,
      },
    },

    '@media': {
      '(prefers-reduced-motion: reduce)': {
        transition: 'none',
      },
    },
  }),
);

globalStyle(`${listStyle} li`, inComponentsLayer({ margin: 0 }));

export const counterStyle = style(
  inComponentsLayer({
    flexShrink: 0,
    minWidth: '1.5em',
    color: color.secondaryForeground,
    fontVariantNumeric: 'tabular-nums',
    textAlign: 'right',
  }),
);

/** The collapsible in-article table of contents, replaced by the sidebar at `xl`. */
export const inlineTocHiddenStyle = style(
  inComponentsLayer({
    '@media': {
      [`screen and (min-width: ${breakpoints.xl})`]: {
        display: 'none',
      },
    },
  }),
);

export const shellStyle = style(
  inComponentsLayer({
    '@media': {
      [`screen and (min-width: ${breakpoints.xl})`]: {
        // The site caps the body at 64rem here, which leaves only 8rem of
        // margin on each side of the 48rem article. The guide widens its own
        // shell so the sidebar has somewhere to live, staying centred on the
        // same axis. The text column itself never changes width.
        width: `min(70rem, calc(100vw - ${spacing[16]}))`,
        marginInline: `calc((100% - min(70rem, calc(100vw - ${spacing[16]}))) / 2)`,
        display: 'grid',
        gridTemplateColumns: `15rem minmax(0, 1fr)`,
        columnGap: spacing[12],
        alignItems: 'start',
      },
    },
  }),
);

export const shellMainStyle = style(
  inComponentsLayer({
    minWidth: 0,
  }),
);

globalStyle(`${sidebarStyle}::-webkit-scrollbar`, inComponentsLayer({ width: '6px' }));
globalStyle(
  `${sidebarStyle}::-webkit-scrollbar-thumb`,
  inComponentsLayer({ backgroundColor: color.border, borderRadius: border.radius.small }),
);
