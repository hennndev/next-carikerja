import Cookies from "js-cookie"
import { useRouter } from "next/router"
import { createContext, useContext, useState, useEffect } from "react"

const Context = createContext()

const AuthProvider = ({children}) => {
    const [userLogin, setUserLogin] = useState(null) 
    const cookies = Cookies.get('userLogin') 
    const router = useRouter()

    const handleUserLogin = ({data}) => {
        setUserLogin(data)
        Cookies.set('userLogin', JSON.stringify(data), { expires: 1 })
    }
    const handleLogout = () => {
        setUserLogin(null)
        Cookies.remove('userLogin')
        router.replace('/')
    }

    useEffect(() => {
        if(cookies) {
            setUserLogin(JSON.parse(cookies))
        }
     }, [cookies]);
    
    const value = {
        userLogin,
        handleUserLogin,
        handleLogout
    }

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}

const useAuth = () => useContext(Context)
export { AuthProvider, useAuth}