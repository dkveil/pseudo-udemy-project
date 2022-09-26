import React from 'react'

interface IStoreContext {
    // user: boolean | null
}

export const StoreContext = React.createContext({} as IStoreContext)

export const useStoreContext = () => React.useContext(StoreContext)

interface IStoreProvider { children: React.ReactNode }

const StoreProvider = ({children}: IStoreProvider) => {
    const [courses, setCourses] = React.useState([])
    const [user, setUser] = React.useState(null)

    const fetchData = async () => {

    }

    React.useEffect(() => {
        fetchData()
    }, [])

    return (
        <StoreContext.Provider value={{}}>
            {children}
        </StoreContext.Provider>
    )
}
