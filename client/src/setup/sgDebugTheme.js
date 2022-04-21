import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        fontFamily: 'Helvetica Neue LT W1G'
    },
    palette: {
        background: {
            default: '#f6f6f6'
        },
        primary: {
            light: '#C5281C',
            main: '#AF2219',
            dark: '#851714',
            contrastText: '#ffffff'
        },
        generali: {
            primaryText: '#090e15',
            secondaryGrayText: '#6f7072'
        },
        error: {
            light: '#AF2219',
            main: '#F94144',
            contrastText: '#ffffff'
        },
        green: {
            light: '#C5281C',
            main: '#85EA2D',
            contrastText: '#FFFFFF'
        }
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 375,
            md: 768,
            lg: 992,
            xl: 1600
        }
    }
});

export default theme;
