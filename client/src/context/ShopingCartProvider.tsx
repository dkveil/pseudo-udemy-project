import React from 'react';
import { useSessionStorage } from '../hooks/useSessionStorage';
import { useStoreContext } from './StoreProvider';

interface IShoppingCartContext {
    products: string[];
    isOpen: boolean;
    addProduct: (id: string) => void;
    removeProduct: (id: string) => void;
    openCart: () => void;
    closeCart: () => void;
    clearShoppingCart: () => void;
}

const ShoppingCartContext = React.createContext({} as IShoppingCartContext);

interface IShoppingCartProvider {
    children: React.ReactNode;
}

export const useShoppingCartContext = () => React.useContext(ShoppingCartContext);

const ShoppingCartProvider = ({ children }: IShoppingCartProvider) => {
    const { user } = useStoreContext();
    const [products, setProducts] = useSessionStorage<string[]>('shopping cart', []);
    const [isOpen, setIsOpen] = React.useState<boolean>(false);

    React.useEffect(() => {
        products.forEach((product) => (user?.courses.find((item) => item === product) ? null : product));
    }, [user, products]);

    const addProduct = (id: string) => {
        if (products.find((product) => product === id) === undefined) {
            setProducts((prev) => [...prev, id]);
        }
    };

    const removeProduct = (id: string) => {
        setProducts(products.filter((product) => product !== id));
    };

    const clearShoppingCart = () => setProducts([]);

    const openCart = () => setIsOpen(true);
    const closeCart = () => setIsOpen(false);

    return (
        <ShoppingCartContext.Provider value={{ products, isOpen, addProduct, removeProduct, openCart, closeCart, clearShoppingCart }}>
            {children}
        </ShoppingCartContext.Provider>
    );
};

export default ShoppingCartProvider;
