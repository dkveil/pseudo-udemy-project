import React from 'react';
import GlobalStyles from '../styles/global';
import { theme } from '../styles/muiTheme';
import { ThemeProvider } from 'styled-components';
import StoreProvider from '../context/StoreProvider';
import Header from './../components/Header/Header';
import ShoppingCart from '../components/ShoppingCart';
import ShoppingCartProvider from '../context/ShopingCartProvider';

interface IMainTemplateProps {
    children: React.ReactNode;
}

const MainTemplate = ({ children }: IMainTemplateProps) => {
    return (
        <>
            <StoreProvider>
                <ShoppingCartProvider>
                    <GlobalStyles />
                    <ThemeProvider theme={theme}>
                        <Header />
                        <ShoppingCart />
                        <main>{children}</main>
                    </ThemeProvider>
                </ShoppingCartProvider>
            </StoreProvider>
        </>
    );
};

export default MainTemplate;
