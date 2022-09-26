import React from 'react';
import GlobalStyles from '../styles/global'
import { muiTheme }from '../styles/muiTheme'
import { theme } from '../styles/theme'
import { ThemeProvider } from 'styled-components'

interface IMainTemplateProps {
    children: React.ReactNode
}

const MainTemplate = ({children}: IMainTemplateProps ) => {
    return (
        <>
            <GlobalStyles />
            <ThemeProvider theme={theme}>
                <ThemeProvider theme={muiTheme}>
                <main>
                    {children}
                </main>
                </ThemeProvider>
            </ThemeProvider>
        </>
    );
}

export default MainTemplate;