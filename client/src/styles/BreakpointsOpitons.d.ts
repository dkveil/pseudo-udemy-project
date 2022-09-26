import React from 'react';

declare module '@mui/material/styles' {
    interface BreakpointOverrides {
        xs: true;
        sm: true;
        md: true;
        lg: true;
        xl: true;
        mobile: true;
        tablet: true;
        desktop: true;
        large: true
    }

    interface Theme {
        appDrawer: {
            width: React.CSSProperties['width']
            breakpoint: BreakpointOverrides
        }
    }

    interface ThemeOptions {
        appDrawer?: {
            width?: React.CSSProperties['width']
            breakpoint?: BreakpointOverrides
        }
    }
}
