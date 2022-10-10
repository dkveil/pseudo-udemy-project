import React from 'react';
import request from './../helpers/request';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface ICourses {
    id: string;
}

export interface ICourse {
    id: string;
    title: string;
    authors: Array<string>;
    description: string;
    img: string;
    price: number;
    rate: number;
    opinions: number;
}

export interface IUser {
    accessLevel: number;
    budget: number;
    courses: Array<ICourses>;
    login: string;
    password: string;
    avatar: string;
}

interface IStoreContext {
    user: IUser | null;
    courses: Array<ICourse>;
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
