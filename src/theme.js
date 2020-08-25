import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { blue, red } from '@material-ui/core/colors'

export const Version = 1;
const colors = {
  primaryColor: blue[500],
  secondaryColor: red[500]
};

let baseTheme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: {
      main: colors.primaryColor
    },
    secondary: {
      main: colors.secondaryColor
    }
  },
  colors: {
    ...colors
  }
});
baseTheme = responsiveFontSizes(baseTheme);
export const muiTheme = {
  ...baseTheme,
  overrides: {
    MuiTypography: {
      root: {
        overflowWrap: 'break-word'
      },
      colorInherit: {
        color: 'white'
      }
    }
  }
};
