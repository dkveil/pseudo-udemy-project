import React from 'react';
import GlobalStyles from '../styles/global'
import { theme } from '../styles/muiTheme'
import { ThemeProvider } from 'styled-components'
import StoreProvider from '../context/StoreProvider'
import Header from './../components/Header/Header';

interface IMainTemplateProps {
    children: React.ReactNode
}

const MainTemplate = ({children}: IMainTemplateProps ) => {
    return (
        <>
            <StoreProvider>
                <GlobalStyles />
                <ThemeProvider theme={theme}>
                    <Header />
                    <main>
                        {children}
                    </main>
                </ThemeProvider>
            </StoreProvider>
        </>
    );
}

export default MainTemplate;