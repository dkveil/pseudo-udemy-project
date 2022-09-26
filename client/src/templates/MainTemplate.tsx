import React from 'react';
import GlobalStyles from '../styles/global'
import { muiTheme }from '../styles/muiTheme'
import { theme } from '../styles/theme'
import { ThemeProvider } from 'styled-components'
import StoreProvider from '../context/StoreProvider'

interface IMainTemplateProps {
    children: React.ReactNode
}

const MainTemplate = ({children}: IMainTemplateProps ) => {
    return (
        <>
            <StoreProvider>
                <GlobalStyles />
                <ThemeProvider theme={theme}>
                    <ThemeProvider theme={muiTheme}>
                    <main>
                        {children}
                    </main>
                    </ThemeProvider>
                </ThemeProvider>
            </StoreProvider>
        </>
    );
}

export default MainTemplate;