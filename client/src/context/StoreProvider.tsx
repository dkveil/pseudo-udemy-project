import React from 'react'
import request from './../helpers/request';

interface IStoreContext {
    user: boolean | null,
    courses: any,
    setCourses: any,
    setUser: any,
}

const StoreContext = React.createContext({} as IStoreContext)

export const useStoreContext = () => React.useContext(StoreContext)

interface IStoreProvider { children: React.ReactNode }

const StoreProvider = ({children}: IStoreProvider) => {
    const [courses, setCourses] = React.useState([])
    const [user, setUser] = React.useState(true)

    const fetchData = async () => {
        const { data } = await request.get('./courses');

        setCourses(data.courses)
    }

    React.useEffect(() => {
        fetchData()

    }, [])

    return (
        <StoreContext.Provider value={{
            courses,
            setCourses,
            user,
            setUser
        }}>
            {children}
        </StoreContext.Provider>
    )
}

export default StoreProvider;