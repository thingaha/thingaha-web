export const fontSource =
  'https://fonts.googleapis.com/css?family=Heebo:700|Muli:400,700,800&display=swap'

export const fontFamily = {
  base: 'Muli, Helvetica, Arial, sans-serif',
  headings: 'Heebo, Helvetica, Arial, sans-serif',
}

// These are all the font weights loaded from Google Fonts. Using others also requires updating
// index.html with the new weights
export const fontWeight = {
  normal: 400,
  bold: 700,
  extraBold: 800,

  headingsBold: 700,
}

export const fontSize = {
  root: '16px',
  xxxlarge: '2rem',
  xxlarge: '1.75rem',
  xlarge: '1.25rem',
  large: '1.125rem',
  small: '0.875rem',
  xsmall: '0.75rem',
  xxsmall: '0.675rem',
}

export const borderRadius = {
  base: '0.25rem',
  large: '0.5rem',
  round: '10rem',
}

export const transition = {
  base: 'all 0.2s',
}

export const size = {
  containerMaxWidth: '72rem',
  containerNarrowMaxWidth: '36rem',

  navHeight: '2.75rem',
  footerHeight: '3.5rem',
  footerHeightMobile: '13.3rem',

  gameWidthPortrait: '36rem',
  gameWidthLandscape: '56rem',
  relatedCranesHeightMobile: '4rem',
}

export const pxBreakpoints = {
  mobile: 0,
  tabletPortrait: 600,
  tabletLandscape: 1024,
  desktop: 1200,
}

export const media = {
  mobileOnly: `@media (max-width: ${pxBreakpoints.tabletPortrait - 1}px)`,
  tabletPortraitUp: `@media (min-width: ${pxBreakpoints.tabletPortrait - 1}px)`,
  tabletLandscapeUp: `@media (min-width: ${
    pxBreakpoints.tabletLandscape - 1
  }px)`,
  desktopUp: `@media (min-width: ${pxBreakpoints.desktop - 1}px)`,
}

export const zIndex = {
  modalOverlay: 10000,
  slidingModal: 1000,
  mobileFooterMenu: 999,
}
