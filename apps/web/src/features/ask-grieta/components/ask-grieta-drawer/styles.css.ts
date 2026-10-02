import { globalStyle, keyframes, style } from '@vanilla-extract/css';

import { inComponentsLayer } from '@/shared/styles/layers/layers';
import { vars } from '@/shared/styles/themes/theme.contract.css';
import { breakpoints } from '@/shared/styles/tokens/breakpoints';

const { spacing, font, color, border, focus } = vars;

const desktop = `screen and (min-width: ${breakpoints.md})`;
const sheetEasing = 'cubic-bezier(0.32, 0.72, 0, 1)';
const hairline = `color-mix(in oklch, ${color.primary} 14%, transparent)`;

// Enter/exit animate `translate`, which composes with the `transform` Ark sets
// for snap points and dragging, so the two never fight.
const slideUp = keyframes({ from: { translate: '0 100%' }, to: { translate: '0 0' } });
const slideDown = keyframes({ from: { translate: '0 0' }, to: { translate: '0 100%' } });
const slideInRight = keyframes({ from: { translate: '100% 0' }, to: { translate: '0 0' } });
const slideOutRight = keyframes({ from: { translate: '0 0' }, to: { translate: '100% 0' } });
const fadeIn = keyframes({ from: { opacity: 0 }, to: { opacity: 1 } });
const fadeOut = keyframes({ from: { opacity: 1 }, to: { opacity: 0 } });

export const backdropStyle = style(
  inComponentsLayer({
    position: 'fixed',
    inset: 0,
    zIndex: 49,
    backgroundColor: 'rgb(14 10 9 / 0.4)',
    selectors: {
      '&[data-state="open"]': { animation: `${fadeIn} 300ms ease-out` },
      '&[data-state="closed"]': { animation: `${fadeOut} 250ms ease-in` },
    },
  }),
);

export const positionerStyle = style(
  inComponentsLayer({
    position: 'fixed',
    left: 0,
    right: 0,
    top: 'var(--ask-viewport-top, 0px)',
    height: 'var(--ask-viewport-height, 100dvh)',
    zIndex: 50,
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    pointerEvents: 'none',
    selectors: {
      // Ark hides closed parts with [hidden]; `display: flex` would override it.
      '&[hidden]': { display: 'none' },
    },
    '@media': {
      [desktop]: {
        top: 0,
        height: '100dvh',
        alignItems: 'stretch',
        justifyContent: 'flex-end',
      },
    },
  }),
);

export const contentStyle = style(
  inComponentsLayer({
    position: 'relative',
    pointerEvents: 'auto',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: `calc(var(--ask-viewport-height, 100dvh) - ${spacing[3]})`,
    backgroundColor: color.background,
    color: color.foreground,
    borderRadius: `${border.radius.large} ${border.radius.large} 0 0`,
    boxShadow: '0 -8px 30px -12px rgb(0 0 0 / 0.25)',
    outline: 'none',
    transitionProperty: 'transform',
    transitionDuration: '450ms',
    transitionTimingFunction: sheetEasing,
    selectors: {
      '&[hidden]': { display: 'none' },
      // Bleed below the sheet, so an over-drag upwards never shows a gap.
      '&::after': {
        content: '""',
        position: 'absolute',
        left: 0,
        right: 0,
        top: '100%',
        height: '3rem',
        backgroundColor: 'inherit',
      },
      '&[data-state="open"]': { animation: `${slideUp} 450ms ${sheetEasing}` },
      '&[data-state="closed"]': { animation: `${slideDown} 300ms ${sheetEasing}` },
    },
    '@media': {
      [desktop]: {
        width: 'min(30rem, 100vw)',
        height: '100%',
        borderRadius: `${border.radius.large} 0 0 ${border.radius.large}`,
        boxShadow: '-8px 0 30px -12px rgb(0 0 0 / 0.25)',
        selectors: {
          '&::after': { display: 'none' },
          '&[data-state="open"]': { animation: `${slideInRight} 450ms ${sheetEasing}` },
          '&[data-state="closed"]': { animation: `${slideOutRight} 300ms ${sheetEasing}` },
        },
      },
      '(prefers-reduced-motion: reduce)': {
        animationDuration: '1ms',
        transitionDuration: '1ms',
      },
    },
  }),
);

// Mobile: the grabber wraps the indicator and the header, the only places a
// drag starts.
export const grabberStyle = style(
  inComponentsLayer({
    flexShrink: 0,
    paddingTop: spacing[3],
    cursor: 'grab',
    touchAction: 'none',
    userSelect: 'none',
    WebkitUserSelect: 'none',
  }),
);

export const grabberIndicatorStyle = style(
  inComponentsLayer({
    margin: `0 auto ${spacing[1]}`,
    width: '2.5rem',
    height: '0.3rem',
    borderRadius: '999px',
    backgroundColor: `color-mix(in oklch, ${color.foreground} 20%, transparent)`,
  }),
);

export const headerStyle = style(
  inComponentsLayer({
    display: 'flex',
    alignItems: 'center',
    gap: spacing[3],
    flexShrink: 0,
    padding: `${spacing[2]} ${spacing[5]} ${spacing[4]}`,
    borderBottom: `1px solid ${hairline}`,
    '@media': {
      [desktop]: {
        padding: `${spacing[6]} ${spacing[6]} ${spacing[4]}`,
      },
    },
  }),
);

export const avatarStyle = style(
  inComponentsLayer({
    width: '3rem',
    height: '3rem',
    flexShrink: 0,
    borderRadius: '999px',
    objectFit: 'cover',
    boxShadow: `0 0 0 2px ${color.background}, 0 0 0 3px ${hairline}`,
  }),
);

export const headerTextStyle = style(
  inComponentsLayer({
    flex: 1,
    minWidth: 0,
  }),
);

export const titleStyle = style(
  inComponentsLayer({
    margin: 0,
    fontSize: font.size.lg,
    fontWeight: font.weight.semibold,
    lineHeight: font.lineHeight.tight,
  }),
);

export const descriptionStyle = style(
  inComponentsLayer({
    margin: `${spacing[1]} 0 0`,
    fontSize: font.size.sm,
    lineHeight: font.lineHeight.snug,
    opacity: 0.75,
  }),
);

export const closeTriggerStyle = style(
  inComponentsLayer({
    display: 'grid',
    placeItems: 'center',
    alignSelf: 'flex-start',
    width: '2.75rem',
    height: '2.75rem',
    flexShrink: 0,
    border: 0,
    borderRadius: '999px',
    background: color.secondary,
    color: color.foreground,
    cursor: 'pointer',
    selectors: {
      '&:focus-visible': {
        outline: `${focus.width} solid ${focus.color}`,
        outlineOffset: '0.15rem',
      },
    },
  }),
);

// Scrolls on its own; Ark only starts a sheet drag when this cannot scroll
// further in the drag direction, so scrolling and swipe-to-dismiss never fight.
export const bodyStyle = style(
  inComponentsLayer({
    flex: 1,
    minHeight: 0,
    overflowY: 'auto',
    overscrollBehavior: 'contain',
    WebkitOverflowScrolling: 'touch',
    // Keep focused fields clear of the sticky submit bar.
    scrollPaddingBottom: 'calc(var(--drawer-snap-point-offset-y, 0px) + 7rem)',
  }),
);

// At the 60% peek the lower part of the sheet is below the screen. Padding by
// exactly that offset lets everything scroll into view at every snap point.
export const bodyInnerStyle = style(
  inComponentsLayer({
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[8],
    padding: `${spacing[5]} ${spacing[5]} calc(var(--drawer-snap-point-offset-y, 0px) + ${spacing[8]} + env(safe-area-inset-bottom))`,
    '@media': {
      [desktop]: {
        padding: `${spacing[6]} ${spacing[6]} ${spacing[8]}`,
      },
    },
  }),
);

export const directRoutesStyle = style(
  inComponentsLayer({
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[3],
    paddingTop: spacing[6],
    borderTop: `1px solid ${hairline}`,
  }),
);

export const directRoutesTitleStyle = style(
  inComponentsLayer({
    margin: 0,
    fontSize: font.size.sm,
    fontWeight: font.weight.medium,
    opacity: 0.75,
  }),
);

export const successStyle = style(
  inComponentsLayer({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: spacing[4],
    paddingTop: spacing[4],
    textAlign: 'center',
  }),
);

export const successAvatarStyle = style(
  inComponentsLayer({
    position: 'relative',
    width: '5.5rem',
    height: '5.5rem',
  }),
);

globalStyle(`${successAvatarStyle} img`, {
  width: '100%',
  height: '100%',
  borderRadius: '999px',
  objectFit: 'cover',
});

globalStyle(`${successAvatarStyle} svg`, {
  position: 'absolute',
  right: 0,
  bottom: 0,
  width: '1.75rem',
  height: '1.75rem',
  padding: '0.3rem',
  borderRadius: '999px',
  backgroundColor: '#25D366',
  color: '#ffffff',
  boxShadow: `0 0 0 3px ${color.background}`,
});

export const successTitleStyle = style(
  inComponentsLayer({
    margin: 0,
    fontSize: font.size['2xl'],
    fontWeight: font.weight.semibold,
  }),
);

export const successTextStyle = style(
  inComponentsLayer({
    margin: 0,
    maxWidth: '22rem',
    fontSize: font.size.base,
    lineHeight: font.lineHeight.normal,
  }),
);

// Deliberately loud: the reply time is not decided yet.
export const placeholderStyle = style(
  inComponentsLayer({
    padding: '0 0.4em',
    border: `1.5px dashed ${color.accent}`,
    borderRadius: border.radius.small,
    backgroundColor: `color-mix(in oklch, ${color.accent} 12%, transparent)`,
    color: color.accent,
    fontWeight: font.weight.bold,
  }),
);

export const successButtonStyle = {
  button: style(inComponentsLayer({ minHeight: '2.75rem', marginTop: spacing[2] })),
  nowrap: style(inComponentsLayer({ whiteSpace: 'nowrap' })),
};

export const directIconStyle = style(
  inComponentsLayer({
    flexShrink: 0,
    width: '1.25rem',
    height: '1.25rem',
  }),
);

export const directPhoneStyle = style(
  inComponentsLayer({
    minWidth: 0,
  }),
);

// Desktop phone tile: not a button, so the number can be selected; copy is
// a small button in the corner.
export const directStaticStyle = style(
  inComponentsLayer({
    cursor: 'auto',
    userSelect: 'text',
    selectors: {
      '&:hover': {
        backgroundColor: 'transparent',
      },
    },
  }),
);

export const directCopyCornerStyle = style(
  inComponentsLayer({
    position: 'absolute',
    top: spacing[1],
    right: spacing[1],
    display: 'grid',
    placeItems: 'center',
    width: '2rem',
    height: '2rem',
    padding: 0,
    border: 0,
    borderRadius: border.radius.small,
    background: 'transparent',
    color: color.foreground,
    cursor: 'pointer',
    opacity: 0.7,
    selectors: {
      '&:hover': {
        opacity: 1,
        backgroundColor: color.secondary,
      },
      '&[data-copied]': {
        color: color.accent,
        opacity: 1,
      },
      '&:focus-visible': {
        outline: `${focus.width} solid ${focus.color}`,
        outlineOffset: '0.1rem',
        opacity: 1,
      },
    },
  }),
);

// Phones: one grouped list (rows divided by hairlines, value on the right),
// compact and within thumb reach. Desktop: three equal tiles in a row.
export const directGridStyle = style(
  inComponentsLayer({
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1fr)',
    margin: 0,
    padding: 0,
    listStyle: 'none',
    border: `1px solid ${hairline}`,
    borderRadius: border.radius.large,
    backgroundColor: color.surface,
    overflow: 'hidden',
    '@media': {
      [desktop]: {
        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
        gap: spacing[2],
        border: 0,
        borderRadius: 0,
        backgroundColor: 'transparent',
        overflow: 'visible',
      },
    },
  }),
);

globalStyle(`${directGridStyle} > li + li`, {
  '@layer': {
    components: {
      borderTop: `1px solid ${hairline}`,
      '@media': { [desktop]: { borderTop: 0 } },
    },
  },
});

export const directItemStyle = style(
  inComponentsLayer({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    gap: spacing[3],
    width: '100%',
    height: '100%',
    minHeight: '3.25rem',
    padding: `${spacing[2]} ${spacing[4]}`,
    border: 0,
    borderRadius: 0,
    background: 'transparent',
    color: color.foreground,
    fontFamily: 'inherit',
    fontSize: font.size.sm,
    textAlign: 'left',
    textDecoration: 'none',
    cursor: 'pointer',
    WebkitTapHighlightColor: 'transparent',
    transition: 'background-color 150ms',
    selectors: {
      // Keep the site's coral link bar and colour off these link rows.
      'body &:link, body &:visited, body &:hover, body &:active, body &:focus-visible': {
        color: color.foreground,
        backgroundImage: 'none',
      },
      '&:hover': {
        backgroundColor: color.secondary,
      },
      '&:focus-visible': {
        outline: `${focus.width} solid ${focus.color}`,
        outlineOffset: '-0.15rem',
      },
    },
    '@media': {
      [desktop]: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: spacing[2],
        minHeight: '5.75rem',
        padding: spacing[3],
        border: `1px solid ${hairline}`,
        borderRadius: border.radius.medium,
        backgroundColor: color.surface,
      },
    },
  }),
);

export const directTextStyle = style(
  inComponentsLayer({
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    gap: spacing[3],
    flex: 1,
    minWidth: 0,
    '@media': {
      [desktop]: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        gap: '0.125rem',
        flex: 'none',
      },
    },
  }),
);

export const directTitleStyle = style(
  inComponentsLayer({
    fontWeight: font.weight.semibold,
    lineHeight: font.lineHeight.tight,
  }),
);

export const directValueStyle = style(
  inComponentsLayer({
    fontSize: font.size.xs,
    lineHeight: font.lineHeight.snug,
    fontVariantNumeric: 'tabular-nums',
    opacity: 0.7,
    whiteSpace: 'nowrap',
  }),
);

export const directPhoneClipboardStyle = style(
  inComponentsLayer({
    display: 'flex',
    height: '100%',
  }),
);

// Phones: copy is part of the phone row, behind a hairline divider.
export const directCopyButtonStyle = style(
  inComponentsLayer({
    display: 'grid',
    placeItems: 'center',
    flexShrink: 0,
    width: '3.25rem',
    border: 0,
    borderLeft: `1px solid ${hairline}`,
    background: 'transparent',
    color: color.foreground,
    cursor: 'pointer',
    selectors: {
      '&:hover': { backgroundColor: color.secondary },
      '&[data-copied]': { color: color.accent },
      '&:focus-visible': {
        outline: `${focus.width} solid ${focus.color}`,
        outlineOffset: '-0.15rem',
      },
    },
  }),
);
