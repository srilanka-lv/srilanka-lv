import { globalStyle, style } from '@vanilla-extract/css';

import { inComponentsLayer } from '@/shared/styles/layers/layers';
import { vars } from '@/shared/styles/themes/theme.contract.css';
import { breakpoints } from '@/shared/styles/tokens/breakpoints';

const { spacing, font, color, border, focus, transition } = vars;

// Field vocabulary shared by every control in the form: a lifted surface on
// the paper background, a hairline that darkens on hover, the site's lime
// focus ring, and the error colour for invalid fields.
const hairline = `color-mix(in oklch, ${color.primary} 16%, transparent)`;
const hairlineStrong = `color-mix(in oklch, ${color.primary} 32%, transparent)`;
const ease = `${transition.duration.fast} ${transition.easing.easeInOut}`;
const focusRing = `0 0 0 ${focus.width} ${focus.color}`;
const errorRing = `0 0 0 ${focus.width} ${color.error}`;

const fieldSurface = {
  backgroundColor: color.surface,
  border: `1px solid ${hairline}`,
  borderRadius: border.radius.medium,
  color: color.foreground,
  transition: `border-color ${ease}, box-shadow ${ease}, background-color ${ease}`,
} as const;

export const formStyle = style(
  inComponentsLayer({
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[5],
  }),
);

// Visually hidden without leaving the layout box (no off-screen scroll).
export const honeypotStyle = style(
  inComponentsLayer({
    position: 'absolute',
    width: '1px',
    height: '1px',
    overflow: 'hidden',
    clipPath: 'inset(50%)',
    whiteSpace: 'nowrap',
    opacity: 0,
    pointerEvents: 'none',
  }),
);

export const fieldStyle = style(
  inComponentsLayer({
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[2],
    border: 0,
    margin: 0,
    padding: 0,
    minWidth: 0,
    selectors: {
      '&[data-disabled]': { opacity: 0.55 },
    },
  }),
);

// The product question leads the form: a step above the field labels, with a
// quiet divider before the contact details start.
export const productGroupStyle = style(
  inComponentsLayer({
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[3],
    paddingBottom: spacing[5],
    borderBottom: `1px solid color-mix(in oklch, ${color.primary} 8%, transparent)`,
  }),
);

export const questionStyle = style(
  inComponentsLayer({
    fontSize: font.size.base,
    fontWeight: font.weight.semibold,
    lineHeight: font.lineHeight.tight,
  }),
);

export const labelStyle = style(
  inComponentsLayer({
    fontWeight: font.weight.medium,
    fontSize: font.size.sm,
    lineHeight: font.lineHeight.tight,
  }),
);

export const optionalStyle = style(
  inComponentsLayer({
    fontWeight: font.weight.normal,
    opacity: 0.6,
  }),
);

export const chipsStyle = style(
  inComponentsLayer({
    display: 'flex',
    flexWrap: 'wrap',
    gap: spacing[2],
  }),
);

export const chipStyle = style(
  inComponentsLayer({
    ...fieldSurface,
    display: 'inline-flex',
    alignItems: 'center',
    gap: spacing[2],
    // 44px tap target (WCAG 2.5.5 / Apple HIG).
    minHeight: '2.75rem',
    padding: `${spacing[2]} ${spacing[4]} ${spacing[2]} ${spacing[3]}`,
    borderRadius: '999px',
    fontSize: font.size.sm,
    fontWeight: font.weight.medium,
    lineHeight: 1.2,
    textAlign: 'left',
    cursor: 'pointer',
    userSelect: 'none',
    selectors: {
      '&[data-hover]:not([data-state="checked"])': {
        borderColor: hairlineStrong,
      },
      '&[data-state="checked"]': {
        backgroundColor: color.accent,
        borderColor: color.accent,
        color: color.accentForeground,
      },
      '&[data-focus-visible]': {
        boxShadow: focusRing,
        borderColor: focus.color,
      },
    },
  }),
);

export const chipIconStyle = style(
  inComponentsLayer({
    flexShrink: 0,
    width: '1rem',
    height: '1rem',
    opacity: 0.75,
    selectors: {
      '[data-state="checked"] > &': { opacity: 1 },
    },
  }),
);

// 1rem text everywhere keeps iOS Safari from zooming in on focus.
export const textInputStyle = style(
  inComponentsLayer({
    ...fieldSurface,
    width: '100%',
    minWidth: 0,
    minHeight: '3rem',
    padding: `${spacing[3]} ${spacing[4]}`,
    fontFamily: 'inherit',
    fontSize: font.size.base,
    outline: 'none',
    selectors: {
      '&::placeholder': { color: color.foreground, opacity: 0.42 },
      '&:hover:not(:focus):not([data-invalid])': { borderColor: hairlineStrong },
      '&:focus': { borderColor: focus.color, boxShadow: focusRing },
      '&[data-invalid]': { borderColor: color.error },
      '&[data-invalid]:focus': { boxShadow: errorRing },
    },
  }),
);

export const phoneRowStyle = style(
  inComponentsLayer({
    ...fieldSurface,
    display: 'flex',
    alignItems: 'stretch',
    selectors: {
      '&:hover:not(:focus-within)': { borderColor: hairlineStrong },
      '&:focus-within': { borderColor: focus.color, boxShadow: focusRing },
    },
  }),
);

globalStyle(`${phoneRowStyle}:has([data-invalid])`, {
  '@layer': { components: { borderColor: color.error } },
});

globalStyle(`${phoneRowStyle}:has([data-invalid]):focus-within`, {
  '@layer': { components: { boxShadow: errorRing } },
});

// The combobox sits in the phone row as a compact "🇱🇻 +371" field.
export const countryControlStyle = style(
  inComponentsLayer({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
    width: '7.5rem',
    borderRight: `1px solid ${hairline}`,
  }),
);

export const countryInputStyle = style(
  inComponentsLayer({
    width: '100%',
    minWidth: 0,
    minHeight: '3rem',
    padding: `0 ${spacing[8]} 0 ${spacing[3]}`,
    border: 0,
    borderRadius: `${border.radius.medium} 0 0 ${border.radius.medium}`,
    background: 'transparent',
    color: color.foreground,
    fontFamily: 'inherit',
    // 1rem keeps iOS Safari from zooming in on focus.
    fontSize: font.size.base,
    fontVariantNumeric: 'tabular-nums',
    textOverflow: 'ellipsis',
    outline: 'none',
    selectors: {
      '&:focus': {
        backgroundColor: color.secondary,
      },
    },
  }),
);

export const countryTriggerStyle = style(
  inComponentsLayer({
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    display: 'grid',
    placeItems: 'center',
    width: spacing[8],
    padding: 0,
    border: 0,
    background: 'transparent',
    color: color.foreground,
    cursor: 'pointer',
    opacity: 0.7,
  }),
);

// Ark's positioner takes its z-index from `--z-index`, which it copies from the
// list's computed z-index. Without one it is `auto`, and the fields after the
// picker (positioned for their spinners and focus rings) paint over the list.
export const countryPositionerStyle = style(
  inComponentsLayer({
    vars: { '--z-index': '60' },
    zIndex: 60,
  }),
);

export const countryListStyle = style(
  inComponentsLayer({
    position: 'relative',
    zIndex: 60,
    isolation: 'isolate',
    width: 'min(20rem, calc(100vw - 2.5rem))',
    maxHeight: 'min(18rem, var(--available-height, 18rem))',
    overflowY: 'auto',
    padding: spacing[1],
    borderRadius: border.radius.large,
    border: `1px solid ${hairline}`,
    // Opaque in both themes; the shadow is the one exception to the whisper
    // rule, because a floating list over form fields needs a clear edge.
    backgroundColor: color.surface,
    boxShadow: '0 12px 32px -8px rgb(0 0 0 / 0.25), 0 2px 6px rgb(0 0 0 / 0.08)',
    outline: 'none',
    overscrollBehavior: 'contain',
    selectors: {
      '&[hidden]': { display: 'none' },
    },
  }),
);

export const countryItemStyle = style(
  inComponentsLayer({
    display: 'flex',
    alignItems: 'center',
    gap: spacing[2],
    minHeight: '2.75rem',
    padding: `${spacing[2]} ${spacing[3]}`,
    borderRadius: border.radius.medium,
    fontSize: font.size.sm,
    cursor: 'pointer',
    selectors: {
      '&[data-highlighted]': {
        backgroundColor: color.secondary,
      },
      '&[data-state="checked"]': {
        fontWeight: font.weight.semibold,
      },
    },
  }),
);

export const countryItemNameStyle = style(
  inComponentsLayer({
    flex: 1,
    minWidth: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  }),
);

export const countryItemDialStyle = style(
  inComponentsLayer({
    flexShrink: 0,
    fontVariantNumeric: 'tabular-nums',
    opacity: 0.65,
  }),
);

export const countryDividerStyle = style(
  inComponentsLayer({
    height: '1px',
    margin: `${spacing[1]} ${spacing[2]}`,
    backgroundColor: hairline,
  }),
);

export const countryEmptyStyle = style(
  inComponentsLayer({
    padding: `${spacing[3]} ${spacing[3]}`,
    fontSize: font.size.sm,
    lineHeight: font.lineHeight.snug,
    opacity: 0.75,
  }),
);

export const phoneInputStyle = style(
  inComponentsLayer({
    flex: 1,
    minWidth: 0,
    minHeight: '3rem',
    padding: `${spacing[3]} ${spacing[4]}`,
    border: 0,
    borderRadius: `0 ${border.radius.medium} ${border.radius.medium} 0`,
    background: 'transparent',
    color: color.foreground,
    fontFamily: 'inherit',
    fontSize: font.size.base,
    fontVariantNumeric: 'tabular-nums',
    letterSpacing: '0.01em',
    outline: 'none',
    selectors: {
      '&::placeholder': { color: color.foreground, opacity: 0.42 },
    },
  }),
);

export const textareaStyle = style(
  inComponentsLayer({
    ...fieldSurface,
    width: '100%',
    minHeight: '5rem',
    padding: `${spacing[3]} ${spacing[4]}`,
    fontFamily: 'inherit',
    fontSize: font.size.base,
    lineHeight: font.lineHeight.normal,
    resize: 'none',
    outline: 'none',
    selectors: {
      '&::placeholder': { color: color.foreground, opacity: 0.42 },
      '&:hover:not(:focus):not([data-invalid])': { borderColor: hairlineStrong },
      '&:focus': { borderColor: focus.color, boxShadow: focusRing },
      '&[data-invalid]': { borderColor: color.error },
      '&[data-invalid]:focus': { boxShadow: errorRing },
    },
  }),
);

export const helperTextStyle = style(
  inComponentsLayer({
    fontSize: font.size.xs,
    lineHeight: font.lineHeight.snug,
    opacity: 0.7,
  }),
);

export const errorTextStyle = style(
  inComponentsLayer({
    display: 'flex',
    alignItems: 'flex-start',
    gap: spacing[1],
    fontSize: font.size.xs,
    lineHeight: font.lineHeight.snug,
    color: color.error,
  }),
);

export const errorIconStyle = style(
  inComponentsLayer({
    flexShrink: 0,
    width: '0.875rem',
    height: '0.875rem',
    marginTop: '0.05rem',
  }),
);

// Sticky, so the submit button stays reachable at every snap point. The bottom
// offset is the part of the sheet below the screen at the current snap point
// (`--drawer-snap-point-offset-y`, set by Ark on the content).
export const submitBarStyle = style(
  inComponentsLayer({
    position: 'sticky',
    bottom: 'var(--drawer-snap-point-offset-y, 0px)',
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[2],
    margin: `${spacing[1]} calc(${spacing[5]} * -1) 0`,
    padding: `${spacing[3]} ${spacing[5]}`,
    backgroundColor: color.background,
    borderTop: `1px solid ${hairline}`,
    '@media': {
      [`screen and (min-width: ${breakpoints.md})`]: {
        margin: `${spacing[1]} calc(${spacing[6]} * -1) 0`,
        padding: `${spacing[3]} ${spacing[6]} ${spacing[4]}`,
      },
    },
  }),
);

export const submitStyle = style(
  inComponentsLayer({
    width: '100%',
    minHeight: '3.25rem',
    fontWeight: font.weight.semibold,
    transition: `transform 100ms ${transition.easing.easeInOut}, opacity ${ease}`,
    selectors: {
      '&:active:not(:disabled)': { transform: 'translateY(1px)' },
      // Busy, not disabled: it keeps its colour while sending.
      '&[aria-busy="true"]:disabled': { opacity: 1, cursor: 'progress' },
    },
  }),
);

export const submitIconStyle = style(
  inComponentsLayer({
    width: '1.05rem',
    height: '1.05rem',
  }),
);

export const submitSpinnerStyle = style(
  inComponentsLayer({
    color: 'currentColor',
  }),
);

export const submitHintStyle = style(
  inComponentsLayer({
    margin: 0,
    fontSize: font.size.xs,
    lineHeight: font.lineHeight.snug,
    textAlign: 'center',
    opacity: 0.65,
  }),
);

// Failure sits right above the button the visitor just pressed.
export const submitErrorStyle = style(
  inComponentsLayer({
    display: 'flex',
    alignItems: 'flex-start',
    gap: spacing[2],
    margin: 0,
    padding: `${spacing[2]} ${spacing[3]}`,
    borderRadius: border.radius.medium,
    backgroundColor: `color-mix(in oklch, ${color.error} 10%, ${color.background})`,
    color: color.foreground,
    fontSize: font.size.sm,
    lineHeight: font.lineHeight.snug,
  }),
);

globalStyle(`${submitErrorStyle} svg`, {
  '@layer': { components: { color: color.error } },
});
