import { createGlobalStyle } from 'styled-components'
import palette from './palette'
import typography from './typography'

const GlobalStyles = createGlobalStyle({
  '*': {
    '-webkit-font-smoothing': 'antialiased',
    '-moz-osx-font-smoothing': 'grayscale',
    textRendering: 'optimizeLegibility',
    boxSizing: 'border-box',
  },

  html: {
    height: '100%',
    fontSize: typography.body1,
    fontFamily: typography.fontFamily,
  },

  body: {
    height: '100%',
    backgroundColor: palette.background.default,
    color: palette.text.primary,
  },

  a: {
    textDecoration: 'none',
    color: palette.text.link,
    ':hover': {
      textDecoration: 'none',
      color: palette.text.link,
    },
    cursor: 'pointer',
  },

  '#root': {
    height: '100%',
  },

  button: {
    font: 'inherit',

    '&:hover': {
      cursor: 'pointer',
    },
  },

  'h1, h2, h3, h4, h5, h6': {
    fontFamily: typography.fontFamily,
    fontWeight: 400,
  },

  '.thingaha-name': {
    fontSize: '1rem',
    fontWeight: 'bold',
    lineHeight: '2rem',
  },
})

export default GlobalStyles
