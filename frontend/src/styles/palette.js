const textBlack = 'rgba(0, 0, 0, 0.64)'

export default {
  common: {
    black: textBlack,
    white: '#fff',
    grey: '#888',
    lightgrey: '#e0e0e0',
  },
  background: {
    paper: 'rgba(242, 252, 242, 0.92)',
    default: '#fafafa',
  },
  primary: {
    light: 'rgba(43, 195, 28, 1)',
    main: 'rgba(0, 185, 0, 1)',
    dark: 'rgba(3, 169, 3, 1)',
    contrastText: '#fff',
  },
  secondary: {
    light: 'rgba(239, 111, 175, 1)',
    main: 'rgba(252, 164, 208, 1)',
    dark: 'rgba(212, 77, 144, 1)',
    contrastText: '#fff',
  },
  error: {
    light: 'rgba(250, 0, 114, 1)',
    main: 'rgba(217, 11, 104, 1)',
    dark: 'rgba(182, 6, 68, 1)',
    contrastText: '#fff',
  },
  success: {
    light: 'rgb(143,240,132)',
    main: 'rgb(31, 225, 8)',
    dark: '#0aaf00',
    contrastText: textBlack,
  },
  warning: {
    light: '#fdd835',
    main: '#f9a825',
    dark: '#f57f17',
    contrastText: textBlack,
  },
  text: {
    primary: '#424242',
    secondary: '#616161',
    tertiary: '#757575',
    disabled: '#bdbdbd',
    hint: 'rgba(66, 47, 59, 0.69)',
  },
}
