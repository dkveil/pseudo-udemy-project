import { createTheme } from '@mui/material';
import { size } from '../utils/media';

export const theme = createTheme({
    palette: {
        secondary: {
            main: '#a435f0',
        },
        text: {
            secondary: 'rgba(90,70,70,0.54)',
        },
        divider: '#ffffff',
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536,
            mobile: 0,
            tablet: size.TABLET,
            desktop: size.DESKTOP,
            large: size.LARGE
        },
        unit: 'px'
    }
})

