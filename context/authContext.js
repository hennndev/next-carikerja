import Cookies from "js-cookie"
import { parseCookies, setCookie, destroyCookie } from "nookies"
import { useRouter } from "next/router"
import { createContext, useContext, useState, useEffect } from "react"

const Context = createContext()

const AuthProvider = ({children}) => {
    const [userLogin, setUserLogin] = useState(null) 
    // const cookies = Cookies.get('userLogin') 
    const cookies = parseCookies()
    const router = useRouter()

    const handleUserLogin = ({data}) => {
        setUserLogin(data)
        setCookie({}, 'userLogin', JSON.stringify(data))
        // Cookies.set('userLogin', JSON.stringify(data), { expires: 1 })
    }
    const handleLogout = () => {
        setUserLogin(null)
        destroyCookie({}, 'userLogin')
        // Cookies.remove('userLogin')
        router.replace('/')
    }

    useEffect(() => {
        if(cookies.userLogin) {
            setUserLogin(JSON.parse(cookies.userLogin))
        }
     }, [cookies.userLogin]);
    
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