import React from 'react';
import request from './../helpers/request';
import { useLocalStorage } from '../hooks/useLocalStorage';

export interface ICourse {
    id: string;
    title: string;
    authors: string[];
    dateAdded: string;
    description: string;
    duration: number;
    img: string;
    price: number;
    usePromotionPrice: boolean;
    promotionPrice: number | null;
    rate: number;
    opinions: number;
    benefits: string[];
}

export interface IUser {
    accessLevel: number;
    budget: number;
    courses: string[];
    wishlist: string[];
    login: string;
    password: string;
    avatar: string;
}

interface IStoreContext {
    user: IUser | null;
    courses: ICourse[];
    setCourses: any;
    setUser: any;
}

const StoreContext = React.createContext({} as IStoreContext);

export const useStoreContext = () => React.useContext(StoreContext);

interface IStoreProvider {
    children: React.ReactNode;
}

const StoreProvider = ({ children }: IStoreProvider) => {
    const [courses, setCourses] = React.useState([]);
    const [user, setUser] = useLocalStorage<IUser | null>('user', null);

    const fetchData = async () => {
        const { data } = await request.get('/courses');

        setCourses(data.courses);
    };

    React.useEffect(() => {
        fetchData();
    }, []);

    return (
        <StoreContext.Provider
            value={{
                courses,
                setCourses,
                user,
                setUser,
            }}
        >
            {children}
        </StoreContext.Provider>
    );
};

export default StoreProvider;
