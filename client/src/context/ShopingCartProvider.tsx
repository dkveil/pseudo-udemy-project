import React from 'react';

interface IShoppingCartContext {
    products: string[];
    isOpen: boolean;
    addProduct: (id: string) => void;
    removeProduct: (id: string) => void;
    openCart: () => void;
    closeCart: () => void;
}

const ShoppingCartContext = React.createContext({} as IShoppingCartContext);

interface IShoppingCartProvider {
    children: React.ReactNode;
}

export const useShoppingCartContext = () => React.useContext(ShoppingCartContext);

const ShoppingCartProvider = ({ children }: IShoppingCartProvider) => {
    const [products, setProducts] = React.useState<string[]>([]);
    const [isOpen, setIsOpen] = React.useState<boolean>(false);

    const addProduct = (id: string) => {
        if (products.find((product) => product === id) === undefined) {
            setProducts((prev) => [...prev, id]);
        }
    };

    const removeProduct = (id: string) => {
        setProducts(products.filter((product) => product !== id));
    };

    const openCart = () => setIsOpen(true);
    const closeCart = () => setIsOpen(false);

    return (
        <ShoppingCartContext.Provider value={{ products, isOpen, addProduct, removeProduct, openCart, closeCart }}>
            {children}
        </ShoppingCartContext.Provider>
    );
};

export default ShoppingCartProvider;
